"use client";

import { Sidebar } from "./component/sidebar";
import { Toolbar } from "./component/toolbar";

interface WorksapceIdLayoutProps {
    children: React.ReactNode;
};


const WorkspaceLayout = ({ children }: WorksapceIdLayoutProps) => {
    return ( 
        <div className="">
            <Toolbar />
            <div className="flex h-[calc(100vh-40px)]">
                <Sidebar />
                {children}
            </div>
        </div>
    )
}

export default WorkspaceLayout;