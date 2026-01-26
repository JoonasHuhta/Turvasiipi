"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { NavigationProps } from "./types";

interface DesktopNavProps extends NavigationProps { }

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

export function DesktopNav({ pathname, t, expertise }: DesktopNavProps) {
    return (
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
                        <Link href="/faktapankki" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.quiz_facts')}</Link>
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
    );
}
