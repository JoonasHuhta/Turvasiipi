"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface WhySectionProps {
    t: (key: string) => string;
}

export function WhySection({ t }: WhySectionProps) {
    return (
        <section id="miksi" className="space-y-12 border-t border-[#E8DDD0] pt-24 scroll-mt-24">
            <h2 className="text-3xl font-bold text-[#2B2B2B]">{t('landing.why.title')}</h2>

            <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-8 space-y-8">
                    <p className="text-xl leading-relaxed text-[#2B2B2B]">
                        {t('landing.why.p1')}
                    </p>

                    <div className="bg-white p-8 rounded-sm shadow-sm border border-[#E8DDD0] space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-[#4A4A4A]">{t('landing.why.list_title')}</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4 text-lg text-[#4A4A4A]">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8DDD0]" />
                                <span>{t('landing.why.list_1')}</span>
                            </li>
                            <li className="flex items-start gap-4 text-lg text-[#4A4A4A]">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8DDD0]" />
                                <span>{t('landing.why.list_2')}</span>
                            </li>
                            <li className="flex items-start gap-4 text-lg text-[#4A4A4A]">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8DDD0]" />
                                <span>{t('landing.why.list_3')}</span>
                            </li>
                            <li className="flex items-start gap-4 text-lg text-[#4A4A4A]">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8DDD0]" />
                                <span className="italic">{t('landing.why.list_4')}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4 pl-8 border-l-4 border-[#5B4B8A]/20">
                        <p className="text-lg font-medium text-[#2B2B2B]">{t('landing.why.conclusion_1')}</p>
                        <p className="text-lg text-[#4A4A4A]">{t('landing.why.conclusion_2')}</p>
                        <p className="text-lg text-[#4A4A4A]">{t('landing.why.conclusion_3')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
