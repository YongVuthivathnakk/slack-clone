"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "@/components/ui/resizable";
import { Sidebar } from "./component/sidebar";
import { Toolbar } from "./component/toolbar";
import { WorkspaceSidebar } from "./component/workspace-sidebar";

interface WorksapceIdLayoutProps {
    children: React.ReactNode;
};


const WorkspaceLayout = ({ children }: WorksapceIdLayoutProps) => {
    return (
        <div className="">
            <Toolbar />
            <div className="flex h-[calc(100vh-40px)]">
                <Sidebar />
                <ResizablePanelGroup
                    direction="horizontal"
                    autoSaveId="ca-workspace-layout" // this save the last size of the panel when refresh
                >
                    <ResizablePanel
                        defaultSize={20}
                        minSize={19}
                        className="bg-[#5e2c5f] "
                    >

                        <WorkspaceSidebar />
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    <ResizablePanel
                        minSize={20}
                    >
                        {children}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    )
}

export default WorkspaceLayout;