import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { auth } from "./auth";


// Use for generate random code for the join code
const generateCode = () => {
  const code = Array.from(
    { length: 6 },
    () => 
      "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
    ).join("");

  return code;
}

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if(!userId) {
      throw new Error("Unauthorized");
    }

    const joinCode = generateCode();

    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });

    // when user create a workspace they will become admin automactically
    await ctx.db.insert("members", {
      userId,
      workspaceId,
      role: "admin"
    }); 

    await ctx.db.insert("channels", {
      name: "general",
      workspaceId,
    })

    return workspaceId;
  }
})

// Get workspace using get and return it in the list of workspace in the side menu
export const get = query({
    args: {},
    handler: async (ctx) => {

      const userId = await auth.getUserId(ctx);

      if(!userId) {
        return [];
      }

      const members = await ctx.db
        .query("members")
        .withIndex("by_user_id", (q) => q.eq("userId", userId))
        .collect();
      const workspaceIds = members.map((member) => member.workspaceId);
      const workspaces: any[] | PromiseLike<any[]> = [];

      for (const workspaceId of workspaceIds) {
        const workspace = await ctx.db.get(workspaceId)
        
        if (workspace) {
          workspaces.push(workspace)
        }
      }

      return workspaces;
    },
})

export const getById = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if(!userId) {
      throw new Error("Unauthorized");
    }

    // Make sure the only member that have the specific workspace Id and user Id can access the worksapce
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId),
      )
      .unique();
    if(!member) {
      return null;
    }

    return await ctx.db.get(args.id);
  },
});

export const update = mutation  ({
  args: {
    id: v.id("workspaces"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if(!userId) {
      throw new Error("Unauthorized");
    }
  
    // Find the member who has the admin role
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId),
      )
      .unique();
    if(!member || member.role !== "admin" ) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch(args.id, {
      name: args.name,
    });

    return args.id;
  },
});


export const remove = mutation  ({
  args: {
    id: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if(!userId) {
      throw new Error("Unauthorized");
    }
  
    // Find the member who has the admin role
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId),
      )
      .unique();
    if(!member || member.role !== "admin" ) {
      throw new Error("Unauthorized");
    }

    // Make sure to delete the member that associate with the workspace_id
    const [members] = await Promise.all([ 
      ctx.db
        .query("members")
        .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.id))
        .collect()
      ]); // Find all members that is inside of this workspace_id

    for(const member of members) {
      await ctx.db.delete(member._id);
    }

    await ctx.db.delete(args.id);

    return args.id;
  },
});