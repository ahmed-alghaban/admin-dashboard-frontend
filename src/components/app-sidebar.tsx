import * as React from "react"
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
} from "lucide-react"

import { NavMain } from "@/components/ui/sidebar/nav-main"
import { NavUser } from "@/components/ui/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar/sidebar"
import { getUserFromToken } from "@/lib/getUserFromToken"
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
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userData = getUserFromToken();

  // Fallback user data if token is not available
  const user = userData ? {
    name: userData.name,
    email: userData.email,
    avatar: "/avatars/default.jpg", // You can add a default avatar or use user initials
  } : {
    name: "Guest",
    email: "guest@example.com",
    avatar: "/avatars/default.jpg",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2 transition-all group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <Shield className="h-5 w-5 shrink-0 group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6" aria-hidden="true" />
          <span className="font-semibold truncate group-data-[collapsible=icon]:hidden">Admin Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
