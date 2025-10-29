import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";

const ProtectedLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <MobileHeader />
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-4 h-screen overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
