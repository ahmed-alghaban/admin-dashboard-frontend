import * as React from "react"
import {
  BookOpen,
  Frame,
  Map,
  PieChart,
  Settings2,
  Users,
  Package,
  FolderOpen,
  BarChart3,
  FileText,
  Shield,
  LayoutDashboard,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  // Removed teams to disable dropdown/listing behavior
  navMain: [
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
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2 transition-all group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <Shield className="h-5 w-5 shrink-0 group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6" aria-hidden="true" />
          <span className="font-semibold truncate group-data-[collapsible=icon]:hidden">Admin Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
