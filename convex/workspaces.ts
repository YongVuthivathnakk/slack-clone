import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";


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
    const userId = await getAuthUserId(ctx);
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

    return workspaceId;
  }
})

// Get workspace using get and return it in the list of workspace in the side menu
export const get = query({
    args: {},
    handler: async (ctx) => {

      const userId = await getAuthUserId(ctx);

      if(!userId) {
        return [];
      }

      const members = await ctx.db
        .query("members")
        .withIndex("by_user_id", (q) => q.eq("userId", userId))
        .collect();
      const workspaceIds = members.map((member) => member.workspaceId);
      const workspaces = [];

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
    const userId = await getAuthUserId(ctx);
    if(!userId) {
      return null;
      // throw new Error("Unauthorized");
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

