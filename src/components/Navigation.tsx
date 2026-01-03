"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Clipboard, FileText, Heart, Users, Map, ClipboardList } from "lucide-react";
import { useState } from "react";

const navItems = [
    { href: "/", label: "Etusivu", icon: Home },
    { href: "/quiz", label: "Tunnista", icon: Clipboard },
    { href: "/feeling-quiz", label: "Itsearviointi", icon: Heart },
    { href: "/timeline", label: "Logikirja", icon: ClipboardList },
    { href: "/raportti", label: "Raportti", icon: FileText },
    { href: "/tuki", label: "Tuki", icon: Heart },
    { href: "/yhteiso", label: "Yhteisö", icon: Users },
    { href: "/kartta", label: "Totuuskartta", icon: Map },
];

export function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex items-center gap-6">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn("gap-2", isActive && "bg-secondary text-secondary-foreground font-medium")}
                            >
                                {item.label}
                            </Button>
                        </Link>
                    );
                })}
            </div>

            {/* Mobile Nav */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon">
                        <Menu className="w-5 h-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                    <div className="flex flex-col gap-4 mt-8">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                                    <Button
                                        variant={isActive ? "secondary" : "ghost"}
                                        className="w-full justify-start gap-4 text-lg h-12"
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.label}
                                    </Button>
                                </Link>
                            );
                        })}
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    );
}
