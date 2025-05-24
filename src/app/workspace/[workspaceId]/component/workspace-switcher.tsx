import { Button } from "@/components/ui/button"
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useWorkspaceId } from "@/hooks/useWorkspaceId"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const WorkspaceSwitcher = () => {
    const router = useRouter();

    const workspaceId = useWorkspaceId();
    const [_open, setOpen] = useCreateWorkspaceModal();



    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({id: workspaceId});
    const { data: workspaces, isLoading: workspascesLoading } = useGetWorkspaces(); 

    const filterWorkspaces = workspaces?.filter(
        (workspace) => workspace?._id !== workspaceId
    )
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="size-9 relative overflow-hiden bg-[#ABABAB] hover:bg-[#ABABAB]/80 text-slate-800 font-semibold text-xl">
                    {workspaceLoading ? (
                        <Loader className="size-5 animate-spin shrink-0" />
                    ) : (
                        workspace?.name.charAt(0).toUpperCase()
                    )
                }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start" className="w-64">
                <DropdownMenuItem
                    onClick={() => router.push(`/workspace/${workspaceId}`)}
                    className="cursor-pointer items-start flex-col font-semibold capitalize text-md">
                    {workspace?.name}
                    <span className="text-xs text-muted-foreground">
                        Active Workspace
                    </span>

                </DropdownMenuItem>

                {filterWorkspaces?.map((workspace) => (
                    <DropdownMenuItem
                        key={workspace._id}
                        className="cursor-pointer capitaliz overflow-hidden"
                        onClick={() => router.push(`/workspace/${workspace._id}`)}
                    >
                        <div className="shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                            {workspace.name.charAt(0).toUpperCase()}
                        </div>
                        <p className="truncate">
                            {workspace.name}
                        </p>

                    </DropdownMenuItem>
                ))}
                <DropdownMenuItem 
                    className="cursor-ponter"
                    onClick={() => setOpen(true)}
                    >
                    <div className="size-9 relative overflow-hidden bg-[#f2f2f2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                        <Plus />
                    </div>
                    <div>
                        Create a new workspace
                    </div>
                </DropdownMenuItem>


            </DropdownMenuContent>
        </DropdownMenu>
    )
}