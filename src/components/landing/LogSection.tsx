"use client";

import Link from "next/link";

interface LogSectionProps {
    t: (key: string) => string;
}

export function LogSection({ t }: LogSectionProps) {
    return (
        <section className="space-y-12 border-t border-[#E8DDD0] pt-24 bg-white -mx-8 px-8 py-24 shadow-sm border-b">
            <div className="max-w-screen-md mx-auto space-y-12">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-[#2B2B2B]">{t('landing.log.title')}</h2>
                    <p className="text-xl text-[#4A4A4A] leading-relaxed">
                        {t('landing.log.subtitle')}
                    </p>
                </div>

                <div className="bg-[#FDFBF7] p-8 border border-[#E8DDD0] rounded-sm relative">
                    <span className="absolute top-4 right-4 text-xs font-mono text-[#5B4B8A] uppercase tracking-wider border border-[#5B4B8A]/20 px-2 py-1 rounded-sm">{t('landing.log.label')}</span>
                    <div className="space-y-6">
                        <p className="text-lg text-[#2B2B2B]">{t('landing.log.text')}</p>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {[t('landing.log.points.what'), t('landing.log.points.when'), t('landing.log.points.who'), t('landing.log.points.feeling')].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-[#4A4A4A]">
                                    <div className="w-4 h-4 border border-[#E8DDD0] bg-white flex items-center justify-center">
                                        <div className="w-2 h-2 text-[#5B4B8A]" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8 text-[13px] text-[#4A4A4A] font-mono leading-relaxed border-t border-[#E8DDD0] pt-8">
                    <p>{t('landing.log.footer_1')}</p>
                    <p>{t('landing.log.footer_2')}</p>
                    <p>{t('landing.log.footer_3')}</p>
                    <p className="font-bold text-[#2B2B2B]">{t('landing.log.footer_bold')}</p>
                </div>

                <Link href="/loki" className="bg-[#5B4B8A] text-white px-8 py-4 rounded-sm font-medium tracking-wide hover:bg-[#4A3A7A] transition-colors shadow-md inline-block">
                    {t('landing.log.cta')} →
                </Link>
            </div>
        </section>
    );
}
