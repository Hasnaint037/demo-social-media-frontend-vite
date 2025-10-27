import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarMenuItem } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const items = [
  { title: "Homes", url: "/", icon: Home },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Search", url: "/search", icon: Search },
];

export function AppSidebar() {
  const location = useLocation();
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <Sidebar>
      <div className="h-full flex flex-col justify-between">
        <div className="h-full overflow-auto mb-2">
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
                <NavLink
                  to={item.url}
                  className="flex items-center gap-2 w-full"
                >
                  <item.icon />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuItem>
            );
          })}
        </div>
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
          <PopoverTrigger asChild>
            <SidebarMenuItem className="flex items-center gap-2 rounded-md mb-2 cursor-pointer transition-colors duration-300 py-3 border border-blue-100 hover:bg-blue-100 hover:text-blue-500">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h5 className="font-medium text-sm">Hasnain Tariq</h5>
                  <span className="text-sm">hasnain@gmail.com</span>
                </div>
              </div>
            </SidebarMenuItem>
          </PopoverTrigger>
          <PopoverContent className="w-63 bg-gray-100 p-2">
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="text-left px-3 py-2 rounded hover:bg-blue-100 hover:text-blue-500"
                onClick={() => setOpenPopover(false)}
              >
                View Profile
              </Button>
              <Button
                variant="outline"
                className="text-left px-3 py-2 rounded hover:bg-blue-100 hover:text-blue-500"
                onClick={() => setOpenPopover(false)}
              >
                Edit Profile
              </Button>
              <Button
                variant="outline"
                className="text-left px-3 py-2 rounded hover:bg-blue-100 hover:text-blue-500"
                onClick={() => setOpenPopover(false)}
              >
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </Sidebar>
  );
}
