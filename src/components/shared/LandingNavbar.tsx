'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/features/auth/store';

export const LandingNavbar = () => {
    const [open, setOpen] = useState(false);
    const { token, clearToken } = useAuthStore();

    return (
        <header className="w-full px-4 py-3 border-b shadow-sm bg-background">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold tracking-tight text-foreground">
                    AdminDashboard
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    {token ? (
                        <Button variant="outline" size="sm" onClick={clearToken}>Logout</Button>
                    ) : (
                        <Link to="/login">
                            <Button variant="outline" size="sm">Login</Button>
                        </Link>
                    )}
                </nav>

                {/* Mobile nav */}
                <div className="md:hidden flex items-center gap-2">
                    <ThemeToggle />
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-48">
                            <nav className="mt-8 flex flex-col gap-4">
                                <Link
                                    to="/login"
                                    onClick={() => setOpen(false)}
                                    className="text-sm font-medium text-foreground hover:text-foreground/80"
                                >
                                    Login
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};
