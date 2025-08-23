"use client";

import { BadgeCheck, Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar/sidebar";
import { useAuthStore } from "@/features/auth/store";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const navigate = useNavigate();
  const { clearToken } = useAuthStore();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-200 group"
            >
              <Avatar className="h-8 w-8 rounded-lg ring-2 ring-white/20 dark:ring-slate-700/50">
                <AvatarImage src={user.avatar} alt={user.name || "User"} />
                <AvatarFallback className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold">
                  {user.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {user.name || "User"}
                </span>
                <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {user.email || "user@example.com"}
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border border-white/20 dark:border-slate-700/50 shadow-xl"
            side="right"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-3 py-3 text-left text-sm">
                <Avatar className="h-10 w-10 rounded-lg ring-2 ring-white/20 dark:ring-slate-700/50">
                  <AvatarImage src={user.avatar} alt={user.name || "User"} />
                  <AvatarFallback className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold">
                    {user.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-slate-700 dark:text-slate-300">
                    {user.name || "User"}
                  </span>
                  <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {user.email || "user@example.com"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/20 dark:bg-slate-700/50" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors duration-200 rounded-lg mx-1">
                <BadgeCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-slate-700 dark:text-slate-300">
                  Account
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors duration-200 rounded-lg mx-1">
                <Bell className="w-4 h-4 text-orange-600 dark:text-orange-400 mr-2" />
                <span className="text-slate-700 dark:text-slate-300">
                  Notifications
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-white/20 dark:bg-slate-700/50" />
            <DropdownMenuItem
              onClick={() => {
                clearToken();
                navigate("/");
                toast.info("Logged out successfully");
              }}
              className="hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 rounded-lg mx-1 text-red-600 dark:text-red-400"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
