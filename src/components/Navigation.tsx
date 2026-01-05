"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Home, Clipboard, FileText, Heart, Users, Map, ClipboardList, Gamepad2, Wrench, ChevronDown, Activity, Brain, Search, MessageSquare } from "lucide-react";
import { useState } from "react";

interface NavItem {
    href?: string;
    label: string;
    icon: any;
    children?: NavItem[];
}

const navItems: NavItem[] = [
    { href: "/simulaatio", label: "Simulaatio", icon: Gamepad2 },

    {
        label: "Tutki",
        icon: Search,
        children: [
            { href: "/quiz", label: "Tunnista riskit", icon: Clipboard },
            { href: "/feeling-quiz", label: "Uhrin tuntemukset", icon: Activity },
            { href: "/tietovisa", label: "Tietovisa (Faktat)", icon: FileText },
            { href: "/neuromoninaisuus", label: "Neuromoninaisuus", icon: Brain },
            { href: "/nuoret", label: "Nuoret työelämässä", icon: Users }, // Using Users for now as generic match
        ]
    },
    {
        label: "Välineet",
        icon: Wrench,
        children: [
            { href: "/timeline", label: "Dokumentointi", icon: ClipboardList },
            { href: "/raportti", label: "Asiakirjat", icon: FileText },
        ]
    },
    {
        label: "Apua",
        icon: Heart,
        children: [
            { href: "/tuki", label: "Tukipalvelut", icon: Heart },
            { href: "/yhteiso", label: "Yhteisö", icon: Users },
            // { href: "/kartta", label: "Totuuskartta", icon: Map }, // Hidden for now
            { href: "/tarinat", label: "Tarinat", icon: MessageSquare },
        ]
    },
];

export function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex items-center gap-6">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
                {navItems.map((item, index) => {
                    if (item.children) {
                        const isActive = item.children.some(child => child.href === pathname);
                        return (
                            <DropdownMenu key={index}>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant={isActive ? "secondary" : "ghost"}
                                        className={cn("gap-2", isActive && "bg-secondary text-secondary-foreground font-medium")}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.label}
                                        <ChevronDown className="w-3 h-3 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {item.children.map((child) => (
                                        <DropdownMenuItem key={child.href} asChild>
                                            <Link href={child.href!} className="flex items-center gap-2 cursor-pointer">
                                                <child.icon className="w-4 h-4" />
                                                {child.label}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        );
                    }

                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href!}>
                            <Button
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn("gap-2", isActive && "bg-secondary text-secondary-foreground font-medium")}
                            >
                                <item.icon className="w-4 h-4" />
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
                    <div className="flex flex-col gap-2 mt-8">
                        {navItems.map((item, index) => {
                            if (item.children) {
                                return (
                                    <div key={index} className="flex flex-col gap-2">
                                        <div className="flex items-center gap-4 px-4 py-2 text-lg font-medium text-muted-foreground">
                                            <item.icon className="w-5 h-5" />
                                            {item.label}
                                        </div>
                                        <div className="pl-8 flex flex-col gap-2 border-l-2 border-muted ml-6">
                                            {item.children.map((child) => {
                                                const isActive = pathname === child.href;
                                                return (
                                                    <Link key={child.href} href={child.href!} onClick={() => setIsOpen(false)}>
                                                        <Button
                                                            variant={isActive ? "secondary" : "ghost"}
                                                            className="w-full justify-start gap-4 h-10"
                                                        >
                                                            <child.icon className="w-4 h-4" />
                                                            {child.label}
                                                        </Button>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            }

                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href!} onClick={() => setIsOpen(false)}>
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
