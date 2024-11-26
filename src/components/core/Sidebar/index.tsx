import React, { Fragment } from "react";
import { cn } from "@/libs/cn";
import { ModuleListItem } from "@/components/core";
import { appRoutes, setupRoutes } from "@/constants/routes";
import "./sidebar.css";

interface SidebarProps {
    showSidebar: boolean;
    close: () => void;
}

const SidebarContent: React.FC<SidebarProps> = ({ showSidebar }) => {
    return (
        <Fragment>
            <nav className={cn("bg-accent-tertiary flex flex-col gap-8 px-5 pt-6 pb-[3.125rem] h-screen max-h-screen w-full max-w-60 lg:fixed inset-y-0 left-0 z-20", showSidebar ? "max-lg:absolute transition transform translate-x-0 ease-out duration-500" : "max-lg:hidden")}>
                <div className="flex items-center">
                    <img src="/cv_logo.svg" className="size-9 mix-blend-plus-lighter text-white" alt="christ_villa_logo" />
                    <h1 className="font-bold text-2xl text-white">CHRIST VILLA</h1>
                </div>
                <div className="pb-4 flex flex-1 flex-col overflow-y-auto scrollbar-hide [&>[data-slot=section]+[data-slot=section]]:mt-7">
                    <div data-slot="section" className="grid gap-1">
                        {
                            appRoutes.map((route) => {
                                return (
                                    <ModuleListItem key={route.to} close={close} {...route} />
                                )
                            })
                        }
                    </div>
                    <div data-slot="section" className="grid gap-2">
                        <span className="text-xs text-accent-secondary pl-3">SETUP</span>
                        {
                            setupRoutes.map((route) => {
                                return (
                                    <ModuleListItem key={route.to} close={close} {...route} />
                                )
                            })
                        }
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export const Sidebar: React.FC<SidebarProps> = ({ showSidebar }) => {
    return (
        <Fragment>
            <nav className={cn("bg-accent-tertiary hidden xl:flex flex-col gap-8 px-5 py-6 h-screen max-h-screen w-full max-w-60 xl:fixed inset-y-0 z-20 overflow-y-scroll scrollbar-hide justify-between left-0 border-r border-r-gray-200 transition transform ease-out duration-500")}>
                <SidebarContent showSidebar={showSidebar} close={close} />
            </nav>
            <nav className={cn("bg-accent-tertiary flex xl:hidden flex-col gap-8 px-5 py-6 h-screen max-h-screen w-full max-w-60 absolute xl:relative inset-y-0 z-20 overflow-y-scroll scrollbar-hide justify-between left-0 border-r border-r-gray-200 transition transform ease-out duration-500", showSidebar ? "translate-x-0" : "-translate-x-full")}>
                <SidebarContent showSidebar={showSidebar} close={close} />
            </nav>
        </Fragment>
    );
};