import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarMenuItem } from "@/components/ui/sidebar";

const items = [
  { title: "Homes", url: "/", icon: Home },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      {items.map((item) => {
        const isActive = location.pathname === item.url;
        return (
          <SidebarMenuItem
            key={item.title}
            className={`
              flex items-center gap-2 rounded-md mb-2 cursor-pointer transition-colors duration-300 py-3
              ${
                isActive
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-100 hover:text-blue-500"
              }
            `}
          >
            <NavLink to={item.url} className="flex items-center gap-2 w-full">
              <item.icon />
              <span>{item.title}</span>
            </NavLink>
          </SidebarMenuItem>
        );
      })}
    </Sidebar>
  );
}
