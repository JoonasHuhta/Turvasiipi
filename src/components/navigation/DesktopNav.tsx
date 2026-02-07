"use client";


import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
            className={cn("flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white hover:text-suojasiipi-secondary transition-colors", className)}
        >
            <Globe className="w-3 h-3" />
            {language === 'fi' ? 'EN' : 'FI'}
        </button>
    );
};

export function DesktopNav({ pathname, t, expertise }: DesktopNavProps) {
    console.log('🔍 DesktopNav rendering, t("nav.thinking"):', t('nav.thinking'));
    console.log('🔍 pathname:', pathname);

    return (
        <nav className="hidden lg:flex items-center gap-8 text-[12px] font-medium tracking-wide text-white">
            <Link href="/simulaatio" className={cn("hover:text-suojasiipi-secondary transition-colors uppercase", pathname === '/simulaatio' && "text-suojasiipi-secondary font-bold")}>
                {t('nav.simulation')}
            </Link>

            <Link href="/ajattelu" className={cn("hover:text-suojasiipi-secondary transition-colors uppercase", pathname.startsWith('/ajattelu') && "text-suojasiipi-secondary font-bold")}>
                {t('nav.thinking')}
            </Link>

            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-suojasiipi-secondary transition-colors uppercase outline-none">
                    {t('nav.explore')} <ChevronDown className="w-3 h-3 opacity-50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-white border-suojasiipi-secondary rounded-sm shadow-sm py-2">
                    <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-suojasiipi-primary/70 font-bold">Kohderyhmät</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href="/neuromoninaisuus" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">🧠 {t('nav.neuromoninaisuus')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/nuoret" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">🌱 {t('nav.youth_work')}</Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-suojasiipi-secondary/50" />

                    <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-suojasiipi-primary/70 font-bold">Testit</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href="/quiz" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.quiz')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/vaikutusprofiili" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.impact_profile')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/empatiatesti" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.empathy_test')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/lukutaito-testi" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.literacy_test')}</Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-suojasiipi-secondary/50" />

                    <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-suojasiipi-primary/70 font-bold">Oppimateriaali</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href="/taktiikat" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.tactics')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/faktapankki" className="cursor-pointer font-medium text-suojasiipi-text-body hover:bg-suojasiipi-bg hover:text-suojasiipi-primary">{t('nav.quiz_facts')}</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/valmennus" className={cn("hover:text-suojasiipi-secondary transition-colors uppercase", pathname.startsWith('/valmennus') && "text-suojasiipi-secondary font-bold")}>
                {t('nav.training')}
            </Link>

            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-suojasiipi-secondary transition-colors uppercase outline-none">
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
                    "flex items-center gap-1.5 text-white hover:text-suojasiipi-secondary transition-all hover:scale-110",
                    pathname === '/profiili' && "text-suojasiipi-secondary scale-110"
                )}
                title={`Profiili - ${expertise.name}`}
            >
                <span className="text-xl" aria-hidden="true">{expertise.icon}</span>
                <span className="sr-only">Profiili - {expertise.name}</span>
            </Link>
        </nav>
    );
}
