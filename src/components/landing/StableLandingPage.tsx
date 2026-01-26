"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FAQSection } from "@/components/landing/FAQSection";
import { ArrowRight } from "lucide-react";

// 🔒 LOCKED COMPONENT: STABLE LANDING PAGE
// DO NOT MODIFY WITHOUT EXPLICIT USER REQUEST
// Last Verified: 2024-01-25

export function StableLandingPage() {
    const { t, loadNamespace, language } = useLanguage();

    useEffect(() => {
        loadNamespace('landing');
    }, [loadNamespace]);

    // Helper to safely get array from translations
    // Since we know landing.json has arrays for lists, we can cast the result
    const getList = (key: string): string[] => {
        const result = t(key, { returnObjects: true });
        return Array.isArray(result) ? result : [];
    };

    return (
        <div className="px-6 sm:px-8 max-w-screen-md mx-auto space-y-32 pb-32 pt-20 overflow-x-hidden">

            {/* 1. HERO SECTION */}
            <header className="space-y-12 text-left">
                {/* Logo left */}
                <div className="flex justify-start mb-8">
                    <img
                        src="/bird-logo.png"
                        alt="Turvasiipi"
                        className="w-24 h-24 md:w-32 md:h-32 object-contain opacity-90"
                    />
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-[#2B2B2B] tracking-tight leading-[1.1] sm:leading-none">
                        {language === 'fi' ? (
                            <>
                                {/* Mobile: Split hyphenated */}
                                <span className="block sm:hidden">
                                    Työpaikka-<br />kiusaamisen <span className="text-[#4A4A4A]/80 italic font-medium">{t('landing.hero.title_end')}</span>
                                </span>
                                {/* Desktop: Normal */}
                                <span className="hidden sm:block">
                                    {t('landing.hero.title_start')} <span className="text-[#4A4A4A]/80 italic font-medium">{t('landing.hero.title_end')}</span>
                                </span>
                            </>
                        ) : (
                            <>
                                {t('landing.hero.title_start')} <span className="text-[#4A4A4A]/80 italic font-medium">{t('landing.hero.title_end')}</span>
                            </>
                        )}
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#4A4A4A]">
                        {t('landing.hero.subtitle')}
                    </p>
                </div>

                <div className="space-y-6 max-w-2xl text-lg leading-relaxed text-[#4A4A4A]">
                    <p>{t('landing.hero.p1')}</p>
                    <p>{t('landing.hero.p2')}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 pt-8 justify-start items-center sm:items-stretch">
                    <Link
                        href="/aloita"
                        className="px-8 py-4 bg-[#2B2B2B] text-white hover:bg-[#5B4B8A] transition-colors rounded-sm font-medium tracking-wide flex items-center gap-3 shadow-lg shadow-black/5"
                    >
                        {t('landing.hero.cta_start')} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/lukutaito-testi"
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

                            <div className="grid md:grid-cols-2 gap-8 text-left">
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
            </header>

            {/* 2. WHY THIS EXISTS */}
            <section className="space-y-12 pt-12 border-t border-transparent">
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2B2B2B] text-center md:text-left">
                    {t('landing.why.title')}
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="text-lg text-[#4A4A4A] leading-relaxed">
                        <p>{t('landing.why.text')}</p>
                    </div>

                    <div className="bg-[#FDFBF7] border border-[#E8DDD0] p-8 rounded-sm">
                        <h3 className="font-bold text-xs uppercase tracking-widest text-[#2B2B2B] mb-6">
                            {t('landing.why.box_title')}
                        </h3>
                        <ul className="space-y-4 text-[#4A4A4A]">
                            {getList('landing.why.list').map((item, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="text-[#E8DDD0] font-bold">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 3. IS THIS BULLYING? */}
            <section className="space-y-12 pt-12">
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2B2B2B] text-center md:text-left">
                    {t('landing.comparison.title')}
                </h2>

                <div className="grid md:grid-cols-2 gap-12 text-[#4A4A4A] leading-relaxed">
                    <div className="space-y-6">
                        <p>{t('landing.comparison.col1_p1')}</p>
                        <p>{t('landing.comparison.col1_p2')}</p>
                        <p>{t('landing.comparison.col1_p3')}</p>
                    </div>

                    <div className="space-y-6">
                        <p>{t('landing.comparison.col2_p1')}</p>
                        <p>{t('landing.comparison.col2_p2')}</p>
                        <p>{t('landing.comparison.col2_p3')}</p>

                        <div className="pt-8 flex justify-end">
                            <div className="bg-white border border-[#E8DDD0] p-6 max-w-xs shadow-sm">
                                <p className="text-[#5B4B8A] italic font-serif text-lg">
                                    {t('landing.comparison.quote')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. PRIVATE LOG */}
            <section className="space-y-8 pt-12">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2B2B2B]">
                        {t('landing.log.title')}
                    </h2>
                    <p className="text-xl text-[#4A4A4A]">
                        {t('landing.log.subtitle')}
                    </p>
                </div>

                <div className="bg-[#FDFBF7] border border-[#E8DDD0] p-8 md:p-12 rounded-sm space-y-12">

                    <div className="space-y-4 relative">
                        <div className="absolute -top-14 right-0 bg-[#FDFBF7] px-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#5B4B8A] border border-[#E8DDD0] py-1">
                            YKSITYINEN & SALATTU
                        </div>
                        <p className="text-lg text-[#2B2B2B] leading-relaxed max-w-2xl">
                            {t('landing.log.box_text')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-y-8 md:gap-x-12">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 border-2 border-[#E8DDD0] rounded-sm"></div>
                            <span className="text-[#4A4A4A] font-medium">{t('landing.log.questions.what')}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 border-2 border-[#E8DDD0] rounded-sm"></div>
                            <span className="text-[#4A4A4A] font-medium">{t('landing.log.questions.when')}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 border-2 border-[#E8DDD0] rounded-sm"></div>
                            <span className="text-[#4A4A4A] font-medium">{t('landing.log.questions.who')}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 border-2 border-[#E8DDD0] rounded-sm"></div>
                            <span className="text-[#4A4A4A] font-medium">{t('landing.log.questions.how')}</span>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 text-xs font-mono text-[#4A4A4A] pt-4">
                    <p>{t('landing.log.privacy.local')}</p>
                    <p className="font-bold text-[#2B2B2B]">{t('landing.log.privacy.pdf')}</p>
                </div>

                <div className="pt-4">
                    <Link
                        href="/loki"
                        className="inline-flex items-center gap-3 bg-[#5B4B8A] text-white px-8 py-4 rounded-sm font-bold tracking-wide hover:bg-[#483B6F] transition-colors shadow-lg shadow-[#5B4B8A]/20"
                    >
                        {t('landing.log.cta')} <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* 5. IMPORTANCE OF DOCUMENTATION (Early) */}
            <section className="space-y-12 pt-12">
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2B2B2B]">
                    {t('landing.importance.title')}
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="text-lg text-[#4A4A4A] leading-relaxed space-y-6">
                        <p>{t('landing.importance.p1')}</p>
                        <p>{t('landing.importance.p2')}</p>
                    </div>

                    <div className="bg-white border border-[#E8DDD0] p-8 rounded-sm">
                        <h3 className="font-bold text-xs uppercase tracking-widest text-[#5B4B8A] mb-6">
                            {t('landing.importance.box_title')}
                        </h3>
                        <ul className="space-y-4 text-[#4A4A4A]">
                            {getList('landing.importance.list').map((item, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="text-[#E8DDD0] font-bold">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 6. YOU HAVE THE POWER (Freedom) */}
            <section className="space-y-12 pt-12 pb-24 border-t border-transparent">
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2B2B2B]">
                    {t('landing.power.title')}
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <p className="text-lg text-[#4A4A4A] leading-relaxed">
                            {t('landing.power.text')}
                        </p>

                        <div className="bg-[#FDFBF7] p-8 border-l-4 border-[#E8DDD0]">
                            <p className="text-[#5B4B8A] italic font-serif text-lg leading-relaxed">
                                {t('landing.power.quote')}
                            </p>
                        </div>

                        <p className="font-bold text-xl text-[#2B2B2B]">
                            {t('landing.power.text_bold')}
                        </p>
                    </div>

                    <div className="bg-white border border-[#E8DDD0] p-8 rounded-sm h-fit">
                        <h3 className="font-bold text-xs uppercase tracking-widest text-[#2B2B2B] mb-6">
                            {t('landing.power.box_title')}
                        </h3>
                        <ul className="space-y-4 text-[#4A4A4A] font-mono text-sm">
                            {getList('landing.power.list').map((item, i) => (
                                <li key={i} className="flex gap-3 items-center">
                                    <div className="w-1.5 h-1.5 bg-[#4A4A4A] rounded-full" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 7. FOOTER SLOGAN / CTA (Final) */}
            <section className="text-center space-y-12 pt-12 pb-24 border-t border-transparent">
                <div className="w-16 h-px bg-[#5B4B8A] mx-auto mb-8" />

                <div className="space-y-6">
                    <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#2B2B2B] leading-tight max-w-2xl mx-auto">
                        {t('landing.footer_slogan.title')}
                    </h2>
                    <p className="text-2xl font-serif italic text-[#4A4A4A]">
                        {t('landing.footer_slogan.subtitle')}
                    </p>
                </div>

                <div className="pt-8 flex flex-col items-center gap-8">
                    <Link
                        href="/lukutaito-testi"
                        className="text-xl font-bold text-[#2B2B2B] border-b-2 border-[#2B2B2B] pb-1 hover:text-[#5B4B8A] hover:border-[#5B4B8A] transition-all flex items-center gap-3"
                    >
                        {t('landing.footer_slogan.cta')} <ArrowRight className="w-5 h-5" />
                    </Link>

                    <div className="text-[10px] uppercase tracking-widest text-[#4A4A4A] space-y-1 opacity-60">
                        <p>{t('landing.footer_slogan.disclaimer_1')}</p>
                        <p>{t('landing.footer_slogan.disclaimer_2')}</p>
                    </div>
                </div>
            </section>

            <FAQSection t={t} />

        </div>
    );
}
