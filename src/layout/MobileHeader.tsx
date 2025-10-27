import { SidebarTrigger } from "@/components/ui/sidebar";
import { PanelLeftIcon } from "lucide-react";

export function MobileHeader() {
  return (
    <header className="flex items-center gap-3 p-4 bg-white shadow md:hidden">
      <SidebarTrigger>
        <PanelLeftIcon />
      </SidebarTrigger>
      <h1 className="text-lg font-bold">My App</h1>
    </header>
  );
}
