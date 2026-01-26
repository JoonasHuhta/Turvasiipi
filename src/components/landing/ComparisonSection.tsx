"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ComparisonSectionProps {
    t: (key: string) => string;
}

export function ComparisonSection({ t }: ComparisonSectionProps) {
    return (
        <section className="space-y-12 border-t border-[#E8DDD0] pt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2B2B] leading-tight max-w-2xl">
                {t('landing.comparison.title')}
            </h2>

            <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-6 text-lg leading-relaxed text-[#4A4A4A]">
                    <p>{t('landing.comparison.p1')}</p>
                    <p>{t('landing.comparison.p2')}</p>
                    <p>{t('landing.comparison.p3')}</p>
                </div>
                <div className="space-y-6 text-lg leading-relaxed text-[#4A4A4A]">
                    <p className="font-medium text-[#2B2B2B]">{t('landing.comparison.p4')}</p>
                    <p>{t('landing.comparison.p5')}</p>
                    <p>{t('landing.comparison.p6')}</p>
                    <div className="pt-4 p-6 bg-white border border-[#E8DDD0] rounded-sm">
                        <p className="italic text-[#5B4B8A]">{t('landing.comparison.quote')}</p>
                    </div>
                </div>
            </div>

            <div className="pt-8">
                <Link href="/taktiikat" className="text-[#5B4B8A] font-bold text-lg hover:underline decoration-2 underline-offset-4 flex items-center gap-2">
                    {t('landing.comparison.cta')} <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
    );
}
