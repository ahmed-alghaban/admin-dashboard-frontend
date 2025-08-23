import * as React from "react";
import {
  BookOpen,
  Settings2,
  Users,
  Package,
  FolderOpen,
  BarChart3,
  FileText,
  Shield,
  LayoutDashboard,
} from "lucide-react";

import { NavMain } from "@/components/ui/sidebar/nav-main";
import { NavUser } from "@/components/ui/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar/sidebar";
import { getUserFromToken } from "@/lib/getUserFromToken";

// Navigation data
const navMain = [
  {
    title: "Dashboard",
    url: "/app/dashboard",
    icon: LayoutDashboard,
    isActive: true,
    items: [],
    isMainPage: true, // Special flag for dashboard
  },
  {
    title: "Users",
    url: "/app/users",
    icon: Users,
    items: [],
  },
  {
    title: "Roles & Permissions",
    url: "/app/roles",
    icon: Shield,
    items: [
      {
        title: "All Roles",
        url: "/app/roles",
      },
    ],
  },
  {
    title: "Products",
    url: "/app/products",
    icon: Package,
    items: [],
  },
  {
    title: "Categories",
    url: "/app/categories",
    icon: FolderOpen,
    items: [],
  },
  {
    title: "Inventory",
    url: "/app/inventory",
    icon: BarChart3,
    items: [],
  },
  {
    title: "Orders",
    url: "/app/orders",
    icon: FileText,
    items: [],
  },
  {
    title: "Audit Logs",
    url: "/app/audit-logs",
    icon: BookOpen,
    items: [],
  },
  {
    title: "Settings",
    url: "/app/settings",
    icon: Settings2,
    items: [],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userData = getUserFromToken();

  // Fallback user data if token is not available
  const user = userData
    ? {
        name: userData.name || "User",
        email: userData.email || "user@example.com",
        avatar: "/avatars/default.jpg", // You can add a default avatar or use user initials
      }
    : {
        name: "Guest",
        email: "guest@example.com",
        avatar: "/avatars/default.jpg",
      };

  return (
    <Sidebar
      collapsible="icon"
      className="backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-r border-white/20 dark:border-slate-700/50 shadow-xl"
      {...props}
    >
      <SidebarHeader className="border-b border-white/20 dark:border-slate-700/50">
        <div className="flex items-center gap-3 px-4 py-4 transition-all group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg group-data-[collapsible=icon]:mx-auto">
            <Shield
              className="h-5 w-5 shrink-0 text-white"
              aria-hidden="true"
            />
          </div>
          <span className="font-bold text-base bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent truncate group-data-[collapsible=icon]:hidden">
            Admin Dashboard
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4 group-data-[collapsible=icon]:px-0">
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t border-white/20 dark:border-slate-700/50">
        <div className="flex flex-col gap-2 p-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
          <NavUser user={user} />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
