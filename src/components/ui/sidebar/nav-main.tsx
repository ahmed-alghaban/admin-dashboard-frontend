"use client";

import { type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    isMainPage?: boolean;
  }[];
}) {
  const { pathname } = useLocation();
  const isPathActive = (url: string) =>
    pathname === url || pathname.startsWith(`${url}/`);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center">
      <SidebarGroupLabel className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider px-2 mb-2">
        Platform
      </SidebarGroupLabel>
      <SidebarMenu className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:w-full">
        {items.map((item) => {
          const active = isPathActive(item.url);

          // Dashboard keeps its distinct styling
          if (item.isMainPage) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  tooltip={item.title}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link
                    to={item.url}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          // Single-level tabs for all other items
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={active}
                tooltip={item.title}
                className="hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-200 group"
              >
                <Link to={item.url} aria-current={active ? "page" : undefined}>
                  {item.icon && (
                    <item.icon className="text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
                  )}
                  <span className="text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 font-medium">
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
