import * as React from "react";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

type SidebarContextProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  isMobile: boolean;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within SidebarProvider");
  return context;
}

export function SidebarProvider({
  defaultOpen = true,
  children,
}: {
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [open, setOpen] = React.useState(defaultOpen);

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) setOpenMobile((prev) => !prev);
    else setOpen((prev) => !prev);
  }, [isMobile]);

  return (
    <SidebarContext.Provider
      value={{
        open: isMobile ? openMobile : open,
        setOpen: isMobile ? setOpenMobile : setOpen,
        toggleSidebar,
        isMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { open, isMobile, setOpen } = useSidebar();

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-black/50 transition-opacity duration-300",
            open ? "opacity-100 pointer-events-auto" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />

        {/* Sidebar content */}
        <div
          className={cn(
            "fixed top-0 left-0 h-full w-[18rem] bg-white p-4 z-10 transform transition-transform duration-300 ease-in-out",
            open ? "translate-x-0" : "-translate-x-full",
            "pointer-events-auto"
          )}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        "bg-white h-screen p-4 transition-all duration-200 shadow-md border-r-2 dark:bg-gray-800",
        open ? "w-[18rem]" : "w-14"
      )}
    >
      {children}
    </aside>
  );
}

export function SidebarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      variant="blue"
      onClick={toggleSidebar}
      className={className}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export function SidebarMenuItem({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "px-4 py-2 rounded hover:bg-blue-400 hover:white",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
