import { Home, Search, PlusSquare, FileText } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, SidebarMenuItem } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Profile from "@/pages/user/Profile";
import { PROTECTED_PATHS } from "@/routes/paths/protectedPaths";
import { showConfirmAlert } from "@/assets/alerts/sweetalert";
import { useStore } from "@/store";
import { AUTH_PATHS } from "@/routes/paths/authPaths";
import { useShallow } from "zustand/shallow";

const items = [
  { title: "Home", url: "/", icon: Home },
  {
    title: "Search Users",
    url: PROTECTED_PATHS.USERS.SEARCH,
    icon: Search,
    PATHLISTS: ["/users"],
  },
  { title: "New Post", url: PROTECTED_PATHS.POSTS.CREATE, icon: PlusSquare },
  {
    title: "My Posts",
    url: PROTECTED_PATHS.POSTS.MY_POSTS,
    icon: FileText,
  },
];

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useStore(
    useShallow((store) => ({
      logout: store.logout,
      user: store.user,
    }))
  );
  const [openPopover, setOpenPopover] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  const handleLogout = async () => {
    const confirmed = await showConfirmAlert({
      title: "Are you sure",
      text: "Do you want to logout?",
      confirmButtonText: "Logout",
    });
    if (confirmed) {
      logout(() => {
        navigate(AUTH_PATHS.LOGIN);
      });
      console.log("logout");
    }
  };

  const handleOpenProfileDialog = () => {
    setOpenProfileDialog(!openProfileDialog);
    setOpenPopover(false);
  };

  return (
    <Sidebar>
      <div className="h-full flex flex-col justify-between">
        <div className="h-full overflow-auto mb-2">
          {items.map((item) => {
            const isActive =
              location.pathname === item.url ||
              item.PATHLISTS?.some((path) => location.pathname.includes(path));
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
                  <h5
                    title={user?.name}
                    className="font-medium text-sm max-w-[185px] truncate"
                  >
                    {user?.name}
                  </h5>
                  <span
                    title={user?.email}
                    className="block text-sm truncate max-w-[185px]"
                  >
                    {user?.email}
                  </span>
                </div>
              </div>
            </SidebarMenuItem>
          </PopoverTrigger>
          <PopoverContent className="w-63 bg-gray-100 p-2">
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="text-left px-3 py-2 rounded hover:bg-blue-100 hover:text-blue-500"
                onClick={() => {
                  setIsViewMode(true);
                  handleOpenProfileDialog();
                }}
              >
                View Profile
              </Button>
              <Button
                variant="outline"
                className="text-left px-3 py-2 rounded hover:bg-blue-100 hover:text-blue-500"
                onClick={() => {
                  setIsViewMode(false);
                  handleOpenProfileDialog();
                }}
              >
                Edit Profile
              </Button>
              <Button
                variant="outline"
                className="text-left px-3 py-2 rounded hover:bg-blue-100 hover:text-blue-500"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {openProfileDialog && (
        <Profile
          open={openProfileDialog}
          setOpen={setOpenProfileDialog}
          isViewMode={isViewMode}
        />
      )}
    </Sidebar>
  );
};

export default AppSidebar;
