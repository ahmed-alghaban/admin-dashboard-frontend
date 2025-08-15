import { AppSidebar } from '../app-sidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar/sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/navigation/breadcrumb"
import { Separator } from "@/components/ui/separator/separator"
import { ThemeToggle } from "@/components/theme-toggle"

const AppLayout = () => {
    const location = useLocation();

    // Dynamic breadcrumb generation based on current route
    const generateBreadcrumbs = () => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const breadcrumbs = [];

        // Start after 'app' segment
        const segments = pathSegments.slice(1); // Remove 'app' from breadcrumbs

        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            const path = `/${pathSegments.slice(0, i + 2).join('/')}`; // Include 'app' in path
            const isLast = i === segments.length - 1;

            // Convert segment to readable format
            const readableSegment = segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            if (isLast) {
                breadcrumbs.push(
                    <BreadcrumbItem key={path}>
                        <BreadcrumbPage>{readableSegment}</BreadcrumbPage>
                    </BreadcrumbItem>
                );
            } else {
                breadcrumbs.push(
                    <BreadcrumbItem key={path} className="hidden md:block">
                        <BreadcrumbLink href={path}>
                            {readableSegment}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                );
                breadcrumbs.push(
                    <BreadcrumbSeparator key={`sep-${path}`} className="hidden md:block" />
                );
            }
        }

        return breadcrumbs;
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {generateBreadcrumbs()}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex items-center px-4">
                        <ThemeToggle />
                    </div>
                </header>
                <div className="routes-container flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div
                        key={location.pathname}
                        className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300 ease-out"
                    >
                        <Outlet />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default AppLayout
