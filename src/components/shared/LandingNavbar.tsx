"use client";

import { Button } from "@/components/ui/button/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "react-router-dom";
import { Menu, Shield } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/features/auth/store";

export const LandingNavbar = () => {
  const [open, setOpen] = useState(false);
  const { token } = useAuthStore();

  return (
    <header className="w-full px-4 py-4 border-b border-white/10 shadow-lg backdrop-blur-md bg-white/80 dark:bg-slate-900/80 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-xl font-bold tracking-tight"
        >
          <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
            Admin Dashboard
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link to={token ? "/app/dashboard" : "/login"}>
            <Button
              variant="outline"
              className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              size="sm"
            >
              {token ? "Dashboard" : "Login"}
            </Button>
          </Link>
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/20 dark:hover:bg-slate-800/50"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-64 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-l border-white/20 dark:border-slate-700/50"
            >
              <nav className="mt-8 flex flex-col gap-4">
                <Link
                  to={token ? "/app/dashboard" : "/login"}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50"
                >
                  {token ? "Dashboard" : "Login"}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
