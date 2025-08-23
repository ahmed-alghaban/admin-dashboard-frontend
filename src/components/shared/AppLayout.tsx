import { AppSidebar } from "../app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/navigation/breadcrumb";
import { Separator } from "@/components/ui/separator/separator";
import { ThemeToggle } from "@/components/theme-toggle";

const AppLayout = () => {
  const location = useLocation();

  // Dynamic breadcrumb generation based on current route
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    // Start after 'app' segment
    const segments = pathSegments.slice(1); // Remove 'app' from breadcrumbs

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const isLast = i === segments.length - 1;
      const url = `/app/${segments.slice(0, i + 1).join("/")}`;
      const title = segment.charAt(0).toUpperCase() + segment.slice(1);

      if (isLast) {
        breadcrumbs.push(
          <BreadcrumbItem key={url}>
            <BreadcrumbPage className="text-slate-700 dark:text-slate-300">
              {title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        );
      } else {
        breadcrumbs.push(
          <BreadcrumbItem key={url}>
            <BreadcrumbLink
              href={url}
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {title}
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
        );
      }
    }

    return breadcrumbs;
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-white/20 dark:border-slate-700/50 shadow-lg">
          <div className="flex items-center gap-2 px-6">
            <SidebarTrigger className="-ml-1 hover:bg-white/20 dark:hover:bg-slate-800/50 rounded-lg p-1 transition-colors duration-200" />
            <Separator
              orientation="vertical"
              className="mr-4 data-[orientation=vertical]:h-6 bg-white/20 dark:bg-slate-700/50"
            />
            <Breadcrumb>
              <BreadcrumbList className="text-sm">
                {generateBreadcrumbs()}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center px-6">
            <ThemeToggle />
          </div>
        </header>
        <div className="routes-container flex flex-1 flex-col gap-6 p-6 pt-0 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <div
            key={location.pathname}
            className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300 ease-out"
          >
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
