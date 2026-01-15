import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import ThemeToggle from "@/components/common/ThemeToggle";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";

const ProtectedLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <ScrollToTopButton />
      <div className="absolute top-4 right-6 z-50">
        <ThemeToggle />
      </div>
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
