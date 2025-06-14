import { Button } from "@/components/ui/button"

import { Doc } from "../../../../convex/_generated/dataModel"
import { ChevronDown, Filter, ListFilter, SquarePen } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Hint } from "@/components/hint";
import { PreferencesModal } from "./component/preferences-modal";
import { useState } from "react";

interface WorkspaceHeaderProps {
    workspace: Doc<"workspaces">;
    isAdmin: boolean;
};


export const WorkspaceHeader = ({ workspace, isAdmin }: WorkspaceHeaderProps) => {
    const [preferencesOpen, setPreferencesOpen] = useState(false);
    return (
        <> 
            <PreferencesModal open={preferencesOpen} setOpen={setPreferencesOpen} initialVaule={workspace.name} />
            <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={"ghost"}
                            className="font-semibold text-lg w-auto p-1.5 overflow-hidden text-white hover:text-white"
                            size={"sm"}
                        >
                            <span className="truncate">
                                {workspace.name}
                            </span>
                            <ChevronDown className="size-4 ml-1 shrink-0" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="start" className="w-64">
                        <DropdownMenuItem
                            className="cursor-pointer capitalize"
                        >
                            <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex itmes-center justify-center">
                                {workspace.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col items-start">
                                <p className="font-bold">{workspace.name}</p>
                                <p className="text-xs text-muted-foreground">Active workspace</p>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {isAdmin &&
                            <>
                                <DropdownMenuItem
                                    className="cursor-pointer py-2"
                                    onClick={() => { }}
                                >
                                    Invite people to {workspace.name}
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    className="cursor-pointer py-2"
                                    onClick={() => { setPreferencesOpen(true) }}
                                >
                                    Preferences
                                </DropdownMenuItem>
                            </>
                        }

                    </DropdownMenuContent>
                </DropdownMenu>
                <div>
                    <Hint label="Filter conversations" side="bottom">
                        <Button
                            variant={"ghost"}
                            className="bg-none text-white hover:text-white"
                        >
                            <ListFilter className="size-4" />
                        </Button>
                    </Hint>

                    <Hint label="New message" side="bottom">
                        <Button
                            variant={"ghost"}
                            className="bg-none text-white hover:text-white"
                        >
                            <SquarePen className="size-4" />
                        </Button>
                    </Hint>
                </div>
            </div>
        </>
    )
}