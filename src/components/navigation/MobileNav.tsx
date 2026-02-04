"use client";

import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Globe, Heart, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { MobileNavProps } from "./types";

const LanguageToggle = ({ className }: { className?: string }) => {
    const { language, setLanguage } = useLanguage();
    return (
        <button
            type="button"
            onClick={() => setLanguage(language === 'fi' ? 'en' : 'fi')}
            className={cn("flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-suojasiipi-text-body hover:text-suojasiipi-primary transition-colors", className)}
        >
            <Globe className="w-3 h-3" />
            {language === 'fi' ? 'EN' : 'FI'}
        </button>
    );
};

export function MobileNav({ pathname, t, expertise, isOpen, onClose, onOpenChange }: MobileNavProps) {
    return (
        <div className="flex items-center gap-4">
            {/* Help Dropdown (visible on tablet+) */}
            <DropdownMenu>
                <DropdownMenuTrigger className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-suojasiipi-secondary hover:border-suojasiipi-primary/30 rounded-full text-[11px] font-bold tracking-wide text-suojasiipi-primary transition-all cursor-pointer shadow-sm hover:shadow-md uppercase">
                    <Heart className="w-3.5 h-3.5" />
                    <span>{t('nav.help')}</span>
                    <ChevronDown className="w-3 h-3 opacity-50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white border-suojasiipi-secondary rounded-sm shadow-sm py-2">
                    <DropdownMenuItem asChild>
                        <Link href="/tuki" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.support_services')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/yhteiso" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.community')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/tarinat" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.stories')}</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Sheet */}
            <Sheet open={isOpen} onOpenChange={onOpenChange}>
                <SheetTrigger asChild>
                    <button className="lg:hidden p-2 text-suojasiipi-text-main hover:bg-suojasiipi-secondary/50 rounded-md transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-suojasiipi-bg border-l border-suojasiipi-secondary overflow-y-auto w-[300px] sm:w-[400px]">
                    <SheetTitle className="sr-only">Valikko</SheetTitle>
                    <div className="flex flex-col gap-8 pb-12 mt-8 px-6">
                        {/* Profile Section */}
                        <div className="flex flex-col gap-6">
                            <Link
                                href="/profiili"
                                className="text-sm font-bold uppercase tracking-widest text-suojasiipi-text-main flex items-center gap-3 hover:text-suojasiipi-primary transition-colors p-2 -mx-2 rounded-sm hover:bg-suojasiipi-secondary/30"
                                onClick={onClose}
                            >
                                <span className="text-2xl shrink-0" aria-hidden="true">{expertise.icon}</span>
                                <span className="whitespace-normal break-words leading-tight">Profiili — {expertise.name}</span>
                            </Link>
                            <LanguageToggle className="justify-start px-2" />
                        </div>

                        <div className="h-px w-full bg-suojasiipi-secondary/50" />

                        {/* Main Direct Links */}
                        <div className="space-y-1">
                            <Link
                                href="/simulaatio"
                                className="block py-2 px-4 -mx-4 text-xl font-serif text-suojasiipi-text-main hover:bg-suojasiipi-secondary/30 transition-colors rounded-sm"
                                onClick={onClose}
                            >
                                {t('nav.simulation')}
                            </Link>
                            <Link
                                href="/valmennus"
                                className="block py-2 px-4 -mx-4 text-xl font-serif text-suojasiipi-text-main hover:bg-suojasiipi-secondary/30 transition-colors rounded-sm"
                                onClick={onClose}
                            >
                                {t('nav.training')}
                            </Link>
                        </div>

                        <div className="h-px w-full bg-suojasiipi-secondary/50" />

                        {/* Dropdown Groups */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <span className="text-[11px] font-bold uppercase tracking-widest text-suojasiipi-primary opacity-70">{t('nav.explore')}</span>
                                <div className="pl-4 space-y-3 border-l-2 border-suojasiipi-secondary/50 ml-1">
                                    <Link href="/neuromoninaisuus" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={onClose}>🧠 {t('nav.neuromoninaisuus')}</Link>
                                    <Link href="/nuoret" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={onClose}>🌱 {t('nav.youth_work')}</Link>
                                    <Link href="/quiz" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={onClose}>{t('nav.identify_risks')}</Link>
                                    <Link href="/lukutaito-testi" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={onClose}>{t('nav.literacy_test')}</Link>
                                    <Link href="/taktiikat" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={onClose}>{t('nav.tactics')}</Link>
                                    <Link href="/feeling-quiz" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={onClose}>{t('nav.victim_feelings')}</Link>
                                    <Link href="/vaikutusprofiili" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={onClose}>{t('nav.impact_profile')}</Link>
                                    <Link href="/empatia-testi" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={onClose}>{t('nav.empathy_spectrum')}</Link>
                                    <Link href="/faktapankki" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={onClose}>{t('nav.quiz_facts')}</Link>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <span className="text-[11px] font-bold uppercase tracking-widest text-suojasiipi-primary opacity-70">{t('nav.tools')}</span>
                                <div className="pl-4 space-y-3 border-l-2 border-suojasiipi-secondary/50 ml-1">
                                    <Link href="/loki" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={onClose}>{t('nav.log')}</Link>
                                    <Link href="/timeline" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={onClose}>{t('nav.timeline')}</Link>
                                    <Link href="/dokumentointi-opas" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={onClose}>{t('nav.guide')}</Link>
                                    <Link href="/raportti" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={onClose}>{t('nav.reports')}</Link>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <span className="text-[11px] font-bold uppercase tracking-widest text-suojasiipi-primary opacity-70">{t('nav.help')}</span>
                                <div className="pl-4 space-y-3 border-l-2 border-suojasiipi-secondary/50 ml-1">
                                    <Link href="/tuki" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={onClose}>{t('nav.support_services')}</Link>
                                    <Link href="/yhteiso" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={onClose}>{t('nav.community')}</Link>
                                    <Link href="/tarinat" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={onClose}>{t('nav.stories')}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
