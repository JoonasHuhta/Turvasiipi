"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Home, Clipboard, FileText, Heart, Users, ClipboardList, Gamepad2, Wrench, ChevronDown, Activity, Brain, Search, MessageSquare, Zap, Trophy, LucideIcon, UserCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { Globe } from "lucide-react";

interface NavItem {
    href?: string;
    labelKey: string;
    icon: LucideIcon;
    children?: NavItem[];
}

const getNavItems = (): NavItem[] => [
    { href: "/dashboard", labelKey: "nav.dashboard", icon: Trophy },
    { href: "/simulaatio", labelKey: "nav.simulation", icon: Gamepad2 },
    {
        labelKey: "nav.explore",
        icon: Search,
        children: [
            { href: "/quiz", labelKey: "nav.identify_risks", icon: Clipboard },
            { href: "/taktiikat", labelKey: "nav.tactics", icon: Zap },
            { href: "/feeling-quiz", labelKey: "nav.victim_feelings", icon: Activity },
            { href: "/empatia-testi", labelKey: "nav.empathy_spectrum", icon: Heart },
            { href: "/lukutaito-testi", labelKey: "nav.literacy_test", icon: ClipboardList },
            { href: "/tietovisa", labelKey: "nav.quiz_facts", icon: FileText },
            { href: "/neuromoninaisuus", labelKey: "nav.neuromoninaisuus", icon: Brain },
            { href: "/nuoret", labelKey: "nav.youth_work", icon: Users },
        ]
    },
    { href: "/valmennus", labelKey: "nav.training", icon: UserCheck },
    {
        labelKey: "nav.tools",
        icon: Wrench,
        children: [
            { href: "/timeline", labelKey: "nav.documentation", icon: ClipboardList },
            { href: "/raportti", labelKey: "nav.documents", icon: FileText },
        ]
    },
    {
        labelKey: "nav.help",
        icon: Heart,
        children: [
            { href: "/tuki", labelKey: "nav.support_services", icon: Heart },
            { href: "/yhteiso", labelKey: "nav.community", icon: Users },
            { href: "/tarinat", labelKey: "nav.stories", icon: MessageSquare },
        ]
    },
];

export function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const navItems = getNavItems();

    const LanguageToggle = ({ className }: { className?: string }) => (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'fi' ? 'en' : 'fi')}
            className={cn("gap-2 text-xs font-bold uppercase tracking-wider", className)}
        >
            <Globe className="w-3.5 h-3.5" />
            {language === 'fi' ? 'EN' : 'FI'}
        </Button>
    );

    return (
        <div className="flex items-center gap-2 md:gap-4">
            <LanguageToggle className="hidden md:flex" />

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
                                            {t(item.labelKey)}
                                            <ChevronDown className="w-3 h-3 opacity-50" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        {item.children.map((child) => (
                                            <DropdownMenuItem key={child.href} asChild>
                                                <Link href={child.href!} className="flex items-center gap-2 cursor-pointer">
                                                    <child.icon className="w-4 h-4" />
                                                    {t(child.labelKey)}
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
                                    {item.href !== "/dashboard" && t(item.labelKey)}
                                </Button>
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Nav */}
                <div className="flex items-center gap-2 md:hidden">
                    <LanguageToggle />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[240px] sm:w-[300px] overflow-y-auto">
                            <SheetHeader className="sr-only">
                                <SheetTitle>Navigaatio</SheetTitle>
                                <SheetDescription>Päävalikko mobiililaitteille</SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col gap-2 mt-4 pb-12">
                                {navItems.map((item, index) => {
                                    if (item.children) {
                                        return (
                                            <div key={index} className="flex flex-col gap-2">
                                                <div className="flex items-center gap-4 px-4 py-2 text-lg font-medium text-muted-foreground">
                                                    <item.icon className="w-5 h-5" />
                                                    {t(item.labelKey)}
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
                                                                    {t(child.labelKey)}
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
                                                {t(item.labelKey)}
                                            </Button>
                                        </Link>
                                    );
                                })}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </div>
    );
}
