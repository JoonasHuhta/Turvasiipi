"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Globe, Heart, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { useState } from "react";

// Simplified Nav Items based on user's new categorization
// Koe -> /simulaatio
// Tutki -> Dropdown
// Valmennus -> /valmennus
// Välineet -> Dropdown (Tools)

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const LanguageToggle = ({ className }: { className?: string }) => {
    const { language, setLanguage } = useLanguage();
    return (
        <button
            onClick={() => setLanguage(language === 'fi' ? 'en' : 'fi')}
            className={cn("flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-suojasiipi-text-body hover:text-suojasiipi-primary transition-colors", className)}
        >
            <Globe className="w-3 h-3" />
            {language === 'fi' ? 'EN' : 'FI'}
        </button>
    );
};

export function Navigation() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const { getExpertiseLevel } = useProgress();
    const { level: expertise } = getExpertiseLevel(); // Fixed destructuring



    return (
        <>
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 text-[12px] font-medium tracking-wide text-suojasiipi-text-body">
                <Link href="/simulaatio" className={cn("hover:text-suojasiipi-primary transition-colors uppercase", pathname === '/simulaatio' && "text-suojasiipi-primary font-bold")}>
                    {t('nav.simulation')}
                </Link>

                <Link href="/aloita" className={cn("hover:text-suojasiipi-primary transition-colors uppercase", pathname === '/aloita' && "text-suojasiipi-primary font-bold")}>
                    {t('nav.start_here')}
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 hover:text-suojasiipi-primary transition-colors uppercase outline-none">
                        {t('nav.explore')} <ChevronDown className="w-3 h-3 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56 bg-white border-suojasiipi-secondary rounded-sm shadow-sm py-2">
                        <DropdownMenuItem asChild>
                            <Link href="/quiz" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.identify_risks')}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/lukutaito-testi" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.literacy_test')}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/taktiikat" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.tactics')}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/feeling-quiz" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.victim_feelings')}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/vaikutusprofiili" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.impact_profile')}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/empatia-testi" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.empathy_spectrum')}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/tietovisa" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.quiz_facts')}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/neuromoninaisuus" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.neuromoninaisuus')}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/nuoret" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.youth_work')}</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Link href="/valmennus" className={cn("hover:text-suojasiipi-primary transition-colors uppercase", pathname.startsWith('/valmennus') && "text-suojasiipi-primary font-bold")}>
                    {t('nav.training')}
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 hover:text-suojasiipi-primary transition-colors uppercase outline-none">
                        {t('nav.tools')} <ChevronDown className="w-3 h-3 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48 bg-white border-suojasiipi-secondary rounded-sm shadow-sm py-2">
                        <DropdownMenuItem asChild>
                            <Link href="/loki" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.log')}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/timeline" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.timeline')}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/dokumentointi-opas" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.guide')}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/raportti" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.reports')}</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <LanguageToggle />

                <Link
                    href="/profiili"
                    className={cn(
                        "flex items-center gap-1.5 hover:text-suojasiipi-primary transition-all hover:scale-110",
                        pathname === '/profiili' && "text-suojasiipi-primary scale-110"
                    )}
                    title={`Profiili - ${expertise.name}`}
                >
                    <span className="text-xl" aria-hidden="true">{expertise.icon}</span>
                    <span className="sr-only">Profiili - {expertise.name}</span>
                </Link>
            </nav>

            {/* Mobile Menu Trigger & Right Actions */}
            <div className="flex items-center gap-4">
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

                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                        <button
                            className="lg:hidden p-2 text-suojasiipi-text-main hover:bg-suojasiipi-secondary/50 rounded-md transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-suojasiipi-bg border-l border-suojasiipi-secondary overflow-y-auto w-[300px] sm:w-[400px]">
                        <SheetTitle className="sr-only">Valikko</SheetTitle>
                        <div className="flex flex-col gap-8 pb-12 mt-8 px-6">

                            {/* Profile Section (Moved to Top) */}
                            <div className="flex flex-col gap-6">
                                <Link
                                    href="/profiili"
                                    className="text-sm font-bold uppercase tracking-widest text-suojasiipi-text-main flex items-center gap-3 hover:text-suojasiipi-primary transition-colors p-2 -mx-2 rounded-sm hover:bg-suojasiipi-secondary/30"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="text-2xl shrink-0" aria-hidden="true">{expertise.icon}</span>
                                    <span className="whitespace-normal break-words leading-tight">Profiili — {expertise.name}</span>
                                </Link>
                                <LanguageToggle className="justify-start px-2" />
                            </div>

                            {/* Divider */}
                            <div className="h-px w-full bg-suojasiipi-secondary/50" />

                            {/* Main Direct Links */}
                            <div className="space-y-1">
                                <Link
                                    href="/simulaatio"
                                    className="block py-2 px-4 -mx-4 text-xl font-serif text-suojasiipi-text-main hover:bg-suojasiipi-secondary/30 transition-colors rounded-sm"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {t('nav.simulation')}
                                </Link>
                                <Link
                                    href="/valmennus"
                                    className="block py-2 px-4 -mx-4 text-xl font-serif text-suojasiipi-text-main hover:bg-suojasiipi-secondary/30 transition-colors rounded-sm"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {t('nav.training')}
                                </Link>
                            </div>

                            {/* Divider with subtle styling */}
                            <div className="h-px w-full bg-suojasiipi-secondary/50" />

                            {/* Dropdown Groups */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-suojasiipi-primary opacity-70">{t('nav.explore')}</span>
                                    <div className="pl-4 space-y-3 border-l-2 border-suojasiipi-secondary/50 ml-1">
                                        <Link href="/quiz" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>{t('nav.identify_risks')}</Link>
                                        <Link href="/lukutaito-testi" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>{t('nav.literacy_test')}</Link>
                                        <Link href="/taktiikat" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>{t('nav.tactics')}</Link>
                                        <Link href="/feeling-quiz" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>{t('nav.victim_feelings')}</Link>
                                        <Link href="/vaikutusprofiili" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>{t('nav.impact_profile')}</Link>
                                        <Link href="/empatia-testi" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>{t('nav.empathy_spectrum')}</Link>
                                        <Link href="/tietovisa" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>{t('nav.quiz_facts')}</Link>
                                        <Link href="/neuromoninaisuus" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>{t('nav.neuromoninaisuus')}</Link>
                                        <Link href="/nuoret" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>{t('nav.youth_work')}</Link>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-suojasiipi-primary opacity-70">{t('nav.tools')}</span>
                                    <div className="pl-4 space-y-3 border-l-2 border-suojasiipi-secondary/50 ml-1">
                                        <Link href="/loki" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>{t('nav.log')}</Link>
                                        <Link href="/timeline" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>{t('nav.timeline')}</Link>
                                        <Link href="/dokumentointi-opas" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>{t('nav.guide')}</Link>
                                        <Link href="/raportti" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>{t('nav.reports')}</Link>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-suojasiipi-primary opacity-70">{t('nav.help')}</span>
                                    <div className="pl-4 space-y-3 border-l-2 border-suojasiipi-secondary/50 ml-1">
                                        <Link href="/tuki" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>{t('nav.support_services')}</Link>
                                        <Link href="/yhteiso" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>{t('nav.community')}</Link>
                                        <Link href="/tarinat" className="block text-suojasiipi-text-body hover:text-suojasiipi-text-main transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>{t('nav.stories')}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}
