"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/features/auth/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useAuthActions } from "@convex-dev/auth/react";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();


  const [open, setOpen] = useCreateWorkspaceModal(); // we can use useState(false) but it is a local state since useCreateWorkspaceModal is a global state which is better

  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`)
    } else if (!open){
      setOpen(true);
    };

  }, [workspaceId, isLoading, open, setOpen]);
   
  return (
    <div className="h-full">
      <UserButton />
    </div>    
  );
}
