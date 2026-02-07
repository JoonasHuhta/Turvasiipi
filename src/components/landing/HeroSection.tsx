"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface HeroSectionProps {
    t: (key: string) => string;
}

export function HeroSection({ t }: HeroSectionProps) {
    return (
        <header className="space-y-12">
            {/* Bird Logo */}
            <div className="flex justify-start mb-8">
                <img
                    src="/bird-logo-new.png"
                    alt="Turvasiipi logo"
                    className="w-24 h-24 md:w-32 md:h-32 object-contain opacity-90"
                />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-[#2B2B2B] break-words">
                {t('landing.hero.title_main')} <br />
                <span className="text-[#4A4A4A] font-normal italic">{t('landing.hero.title_span')}</span>
            </h1>

            <div className="space-y-8 max-w-2xl">
                <h2 className="text-2xl font-serif text-[#4A4A4A] leading-relaxed">
                    {t('landing.hero.subtitle')}
                </h2>

                <div className="space-y-6">
                    <p className="text-lg text-[#4A4A4A] leading-relaxed">
                        {t('landing.hero.text_1')}
                    </p>
                    <p className="text-lg text-[#4A4A4A] leading-relaxed">
                        {t('landing.hero.text_2')}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 pt-4 items-start sm:items-center">
                    <Link
                        href="/aloita"
                        className="px-8 py-4 bg-[#2B2B2B] text-white hover:bg-[#5B4B8A] transition-colors rounded-sm font-medium tracking-wide flex items-center gap-3 shadow-lg shadow-black/5"
                    >
                        {t('landing.hero.cta_start')} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/quiz"
                        className="px-6 py-4 text-[#4A4A4A] border-2 border-[#E8DDD0] hover:border-[#5B4B8A] hover:bg-[#5B4B8A]/5 transition-all rounded-sm font-medium tracking-wide flex items-center gap-3"
                    >
                        {t('landing.hero.cta_main')} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                className="px-6 py-4 text-[#5B4B8A] hover:bg-[#5B4B8A]/5 rounded-sm font-medium transition-colors cursor-pointer"
                            >
                                {t('landing.hero.cta_how')}
                            </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FDFBF7] border-[#E8DDD0]">
                            <DialogHeader className="mb-8">
                                <DialogTitle className="text-3xl font-serif font-bold text-[#2B2B2B] mb-2">{t('landing.hero.dialog.title')}</DialogTitle>
                                <DialogDescription className="text-lg text-[#4A4A4A]">{t('landing.hero.dialog.desc')}</DialogDescription>
                            </DialogHeader>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Step 1 */}
                                <div className="space-y-4">
                                    <div className="w-10 h-10 rounded-full bg-[#5B4B8A] text-white flex items-center justify-center font-bold text-lg">1</div>
                                    <h3 className="text-xl font-bold text-[#2B2B2B]">{t('landing.hero.dialog.step1_title')}</h3>
                                    <p className="text-[#4A4A4A]">{t('landing.hero.dialog.step1_text')}</p>
                                    <div className="bg-white p-4 border border-[#E8DDD0] rounded-sm">
                                        <h4 className="font-bold text-xs uppercase tracking-widest text-[#5B4B8A] mb-1">{t('landing.hero.dialog.step1_sub')}</h4>
                                        <p className="text-sm text-[#4A4A4A]">{t('landing.hero.dialog.step1_sub_text')}</p>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="space-y-4">
                                    <div className="w-10 h-10 rounded-full bg-[#5B4B8A] text-white flex items-center justify-center font-bold text-lg">2</div>
                                    <h3 className="text-xl font-bold text-[#2B2B2B]">{t('landing.hero.dialog.step2_title')}</h3>
                                    <p className="text-[#4A4A4A]">{t('landing.hero.dialog.step2_text')}</p>
                                    <div className="bg-white p-4 border border-[#E8DDD0] rounded-sm">
                                        <h4 className="font-bold text-xs uppercase tracking-widest text-[#5B4B8A] mb-1">{t('landing.hero.dialog.step2_sub')}</h4>
                                        <p className="text-sm text-[#4A4A4A]">{t('landing.hero.dialog.step2_sub_text')}</p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="space-y-4">
                                    <div className="w-10 h-10 rounded-full bg-[#5B4B8A] text-white flex items-center justify-center font-bold text-lg">3</div>
                                    <h3 className="text-xl font-bold text-[#2B2B2B]">{t('landing.hero.dialog.step3_title')}</h3>
                                    <p className="text-[#4A4A4A]">{t('landing.hero.dialog.step3_text')}</p>
                                    <div className="bg-white p-4 border border-[#E8DDD0] rounded-sm">
                                        <h4 className="font-bold text-xs uppercase tracking-widest text-[#5B4B8A] mb-1">{t('landing.hero.dialog.step3_sub')}</h4>
                                        <p className="text-sm text-[#4A4A4A]">{t('landing.hero.dialog.step3_sub_text')}</p>
                                    </div>
                                </div>

                                {/* Step 4 */}
                                <div className="space-y-4">
                                    <div className="w-10 h-10 rounded-full bg-[#5B4B8A] text-white flex items-center justify-center font-bold text-lg">4</div>
                                    <h3 className="text-xl font-bold text-[#2B2B2B]">{t('landing.hero.dialog.step4_title')}</h3>
                                    <p className="text-[#4A4A4A]">{t('landing.hero.dialog.step4_text')}</p>
                                    <div className="bg-white p-4 border border-[#E8DDD0] rounded-sm">
                                        <h4 className="font-bold text-xs uppercase tracking-widest text-[#5B4B8A] mb-1">{t('landing.hero.dialog.step4_sub')}</h4>
                                        <p className="text-sm text-[#4A4A4A]">{t('landing.hero.dialog.step4_sub_text')}</p>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="text-[11px] font-mono text-[#4A4A4A] uppercase tracking-wider space-y-1 border-l-2 border-[#E8DDD0] pl-4">
                    <p>{t('landing.hero.read_first')}</p>
                    <p>{t('landing.hero.quit_anytime')}</p>
                </div>
            </div>
        </header>
    );
}
