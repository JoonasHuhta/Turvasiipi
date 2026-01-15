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

export function Navigation() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const { getExpertiseLevel } = useProgress();
    const { level: expertise } = getExpertiseLevel(); // Fixed destructuring

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

                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                        <button
                            className="lg:hidden p-2 text-[#2B2B2B] hover:bg-[#E8DDD0]/50 rounded-md transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-[#FDFBF7] border-l border-[#E8DDD0] overflow-y-auto w-[300px] sm:w-[400px]">
                        <SheetTitle className="sr-only">Valikko</SheetTitle>
                        <div className="flex flex-col gap-8 pb-12 mt-8">

                            {/* Main Direct Links */}
                            <div className="space-y-1">
                                <Link
                                    href="/simulaatio"
                                    className="block py-2 px-4 -mx-4 text-xl font-serif text-[#2B2B2B] hover:bg-[#E8DDD0]/30 transition-colors rounded-sm"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Koe Simulaatio
                                </Link>
                                <Link
                                    href="/valmennus"
                                    className="block py-2 px-4 -mx-4 text-xl font-serif text-[#2B2B2B] hover:bg-[#E8DDD0]/30 transition-colors rounded-sm"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Valmennus
                                </Link>
                            </div>

                            {/* Divider with subtle styling */}
                            <div className="h-px w-full bg-[#E8DDD0]/50" />

                            {/* Dropdown Groups */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B4B8A] opacity-70">Tutki</span>
                                    <div className="pl-4 space-y-3 border-l-2 border-[#E8DDD0]/50 ml-1">
                                        <Link href="/quiz" className="block text-[#4A4A4A] hover:text-[#2B2B2B] transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>Tunnista riskit</Link>
                                        <Link href="/lukutaito-testi" className="block text-[#4A4A4A] hover:text-[#2B2B2B] transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>Työyhteisön tilanne</Link>
                                        <Link href="/taktiikat" className="block text-[#4A4A4A] hover:text-[#2B2B2B] transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>Kiusaamisen muodot</Link>
                                        <Link href="/feeling-quiz" className="block text-[#4A4A4A] hover:text-[#2B2B2B] transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>Uhrin tuntemukset</Link>
                                        <Link href="/empatia-testi" className="block text-[#4A4A4A] hover:text-[#2B2B2B] transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>Empatia-spektri</Link>
                                        <Link href="/tietovisa" className="block text-[#4A4A4A] hover:text-[#2B2B2B] transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>Tietovisa (Faktat)</Link>
                                        <Link href="/neuromoninaisuus" className="block text-[#4A4A4A] hover:text-[#2B2B2B] transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>Neuromoninaisuus</Link>
                                        <Link href="/nuoret" className="block text-[#4A4A4A] hover:text-[#2B2B2B] transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>Nuoret työelämässä</Link>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B4B8A] opacity-70">Välineet</span>
                                    <div className="pl-4 space-y-3 border-l-2 border-[#E8DDD0]/50 ml-1">
                                        <Link href="/loki" className="block text-[#4A4A4A] hover:text-[#2B2B2B] transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>Loki</Link>
                                        <Link href="/timeline" className="block text-[#4A4A4A] hover:text-[#2B2B2B] transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>Aikajana</Link>
                                        <Link href="/raportti" className="block text-[#4A4A4A] hover:text-[#2B2B2B] transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>Raportointi</Link>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B4B8A] opacity-70">Apua</span>
                                    <div className="pl-4 space-y-3 border-l-2 border-[#E8DDD0]/50 ml-1">
                                        <Link href="/tuki" className="block text-[#4A4A4A] hover:text-[#2B2B2B] transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>Tukipalvelut</Link>
                                        <Link href="/yhteiso" className="block text-[#4A4A4A] hover:text-[#2B2B2B] transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>Yhteisö</Link>
                                        <Link href="/tarinat" className="block text-[#4A4A4A] hover:text-[#2B2B2B] transition-colors py-0.5" onClick={() => setIsMenuOpen(false)}>Tarinat</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[#E8DDD0]/50 flex flex-col gap-6">
                                <Link
                                    href="/profiili"
                                    className="text-sm font-bold uppercase tracking-widest text-[#2B2B2B] flex items-center gap-3 hover:text-[#5B4B8A] transition-colors p-2 -mx-2 rounded-sm hover:bg-[#E8DDD0]/30"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="text-2xl" aria-hidden="true">{expertise.icon}</span>
                                    <span>Profiili - {expertise.name}</span>
                                </Link>
                                <LanguageToggle className="justify-start px-2" />
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}
