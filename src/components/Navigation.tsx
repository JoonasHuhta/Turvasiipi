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

export function Navigation() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const { getExpertiseLevel } = useProgress();
    const { level: expertise } = getExpertiseLevel();

    const LanguageToggle = ({ className }: { className?: string }) => (
        <button
            onClick={() => setLanguage(language === 'fi' ? 'en' : 'fi')}
            className={cn("flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#4A4A4A] hover:text-[#5B4B8A] transition-colors", className)}
        >
            <Globe className="w-3 h-3" />
            {language === 'fi' ? 'EN' : 'FI'}
        </button>
    );

    return (
        <>
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 text-[12px] font-medium tracking-wide text-[#4A4A4A]">
                <Link href="/simulaatio" className={cn("hover:text-[#5B4B8A] transition-colors uppercase", pathname === '/simulaatio' && "text-[#5B4B8A] font-bold")}>
                    Koe
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 hover:text-[#5B4B8A] transition-colors uppercase outline-none">
                        Tutki <ChevronDown className="w-3 h-3 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56 bg-white border-[#E8DDD0] rounded-sm shadow-sm py-2">
                        <DropdownMenuItem asChild>
                            <Link href="/quiz" className="cursor-pointer font-medium text-[#4A4A4A] hover:bg-[#FDFBF7] hover:text-[#5B4B8A]">Tunnista riskit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/lukutaito-testi" className="cursor-pointer font-medium text-[#4A4A4A] hover:bg-[#FDFBF7] hover:text-[#5B4B8A]">Työyhteisön tilanne</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/taktiikat" className="cursor-pointer font-medium text-[#4A4A4A] hover:bg-[#FDFBF7] hover:text-[#5B4B8A]">Kiusaamisen muodot</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/feeling-quiz" className="cursor-pointer font-medium text-[#4A4A4A] hover:bg-[#FDFBF7] hover:text-[#5B4B8A]">Uhrin tuntemukset</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/empatia-testi" className="cursor-pointer font-medium text-[#4A4A4A] hover:bg-[#FDFBF7] hover:text-[#5B4B8A]">Empatia-spektri</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/tietovisa" className="cursor-pointer font-medium text-[#4A4A4A] hover:bg-[#FDFBF7] hover:text-[#5B4B8A]">Tietovisa (Faktat)</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/neuromoninaisuus" className="cursor-pointer font-medium text-[#4A4A4A] hover:bg-[#FDFBF7] hover:text-[#5B4B8A]">Neuromoninaisuus</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/nuoret" className="cursor-pointer font-medium text-[#4A4A4A] hover:bg-[#FDFBF7] hover:text-[#5B4B8A]">Nuoret työelämässä</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Link href="/valmennus" className={cn("hover:text-[#5B4B8A] transition-colors uppercase", pathname.startsWith('/valmennus') && "text-[#5B4B8A] font-bold")}>
                    Valmennus
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 hover:text-[#5B4B8A] transition-colors uppercase outline-none">
                        Välineet <ChevronDown className="w-3 h-3 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48 bg-white border-[#E8DDD0] rounded-sm shadow-sm py-2">
                        <DropdownMenuItem asChild>
                            <Link href="/loki" className="cursor-pointer font-medium text-[#4A4A4A] hover:bg-[#FDFBF7] hover:text-[#5B4B8A]">Loki</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/timeline" className="cursor-pointer font-medium text-[#4A4A4A] hover:bg-[#FDFBF7] hover:text-[#5B4B8A]">Aikajana</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/raportti" className="cursor-pointer font-medium text-[#4A4A4A] hover:bg-[#FDFBF7] hover:text-[#5B4B8A]">Raportointi</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <LanguageToggle />

                <Link
                    href="/profiili"
                    className={cn(
                        "flex items-center gap-1.5 hover:text-[#5B4B8A] transition-all hover:scale-110",
                        pathname === '/profiili' && "text-[#5B4B8A] scale-110"
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
                    <DropdownMenuTrigger className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-[#E8DDD0] hover:border-[#5B4B8A]/30 rounded-full text-[11px] font-bold tracking-wide text-[#5B4B8A] transition-all cursor-pointer shadow-sm hover:shadow-md uppercase">
                        <Heart className="w-3.5 h-3.5" />
                        <span>Apua</span>
                        <ChevronDown className="w-3 h-3 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white border-[#E8DDD0] rounded-sm shadow-sm py-2">
                        <DropdownMenuItem asChild>
                            <Link href="/tuki" className="cursor-pointer font-medium text-[#4A4A4A] hover:bg-[#FDFBF7] hover:text-[#5B4B8A]">Tukipalvelut</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/yhteiso" className="cursor-pointer font-medium text-[#4A4A4A] hover:bg-[#FDFBF7] hover:text-[#5B4B8A]">Yhteisö</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/tarinat" className="cursor-pointer font-medium text-[#4A4A4A] hover:bg-[#FDFBF7] hover:text-[#5B4B8A]">Tarinat</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2 text-[#2B2B2B] hover:bg-[#E8DDD0]/50 rounded-md transition-colors"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 top-20 bg-[#FDFBF7] z-[60] p-8 border-t border-[#E8DDD0] animate-in fade-in slide-in-from-top-2 overflow-y-auto">
                    <div className="space-y-6 pb-12">
                        <Link href="/simulaatio" className="block py-3 text-lg font-serif border-b border-[#E8DDD0]" onClick={() => setIsMenuOpen(false)}>Koe Simulaatio</Link>

                        <div className="space-y-4 pt-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#5B4B8A]">Tutki</span>
                            <div className="pl-4 space-y-3 border-l border-[#E8DDD0]">
                                <Link href="/quiz" className="block text-[#4A4A4A]" onClick={() => setIsMenuOpen(false)}>Tunnista riskit</Link>
                                <Link href="/lukutaito-testi" className="block text-[#4A4A4A]" onClick={() => setIsMenuOpen(false)}>Työyhteisön tilanne</Link>
                                <Link href="/taktiikat" className="block text-[#4A4A4A]" onClick={() => setIsMenuOpen(false)}>Kiusaamisen muodot</Link>
                                <Link href="/feeling-quiz" className="block text-[#4A4A4A]" onClick={() => setIsMenuOpen(false)}>Uhrin tuntemukset</Link>
                                <Link href="/empatia-testi" className="block text-[#4A4A4A]" onClick={() => setIsMenuOpen(false)}>Empatia-spektri</Link>
                                <Link href="/tietovisa" className="block text-[#4A4A4A]" onClick={() => setIsMenuOpen(false)}>Tietovisa (Faktat)</Link>
                                <Link href="/neuromoninaisuus" className="block text-[#4A4A4A]" onClick={() => setIsMenuOpen(false)}>Neuromoninaisuus</Link>
                                <Link href="/nuoret" className="block text-[#4A4A4A]" onClick={() => setIsMenuOpen(false)}>Nuoret työelämässä</Link>
                            </div>
                        </div>

                        <Link href="/valmennus" className="block py-3 text-lg font-serif border-b border-[#E8DDD0]" onClick={() => setIsMenuOpen(false)}>Valmennus</Link>

                        <div className="space-y-4 pt-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#5B4B8A]">Välineet</span>
                            <div className="pl-4 space-y-3 border-l border-[#E8DDD0]">
                                <Link href="/loki" className="block text-[#4A4A4A]" onClick={() => setIsMenuOpen(false)}>Loki</Link>
                                <Link href="/timeline" className="block text-[#4A4A4A]" onClick={() => setIsMenuOpen(false)}>Aikajana</Link>
                                <Link href="/raportti" className="block text-[#4A4A4A]" onClick={() => setIsMenuOpen(false)}>Raportointi</Link>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#5B4B8A]">Apua</span>
                            <div className="pl-4 space-y-3 border-l border-[#E8DDD0]">
                                <Link href="/tuki" className="block text-[#4A4A4A]" onClick={() => setIsMenuOpen(false)}>Tukipalvelut</Link>
                                <Link href="/yhteiso" className="block text-[#4A4A4A]" onClick={() => setIsMenuOpen(false)}>Yhteisö</Link>
                                <Link href="/tarinat" className="block text-[#4A4A4A]" onClick={() => setIsMenuOpen(false)}>Tarinat</Link>
                            </div>
                        </div>

                        <div className="pt-8 flex flex-col gap-4">
                            <Link
                                href="/profiili"
                                className="text-sm font-bold uppercase tracking-widest text-[#2B2B2B] flex items-center gap-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="text-2xl" aria-hidden="true">{expertise.icon}</span>
                                <span>Profiili - {expertise.name}</span>
                            </Link>
                            <button onClick={() => setIsMenuOpen(false)} className="text-xs font-mono uppercase tracking-widest text-[#4A4A4A] text-left">
                                — Sulje valikko
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
