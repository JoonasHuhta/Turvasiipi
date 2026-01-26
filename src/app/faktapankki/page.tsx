"use client";

import { useState, useEffect } from "react";
import { QuizView } from "@/components/faktapankki/QuizView";
import { CostOfSilence } from "@/components/faktapankki/CostOfSilence";
import { CostSimulation } from "@/components/faktapankki/CostSimulation";
import { Brain, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

type Tab = 'quiz' | 'costs' | 'simulation';

export default function FaktapankkiPage() {
    const { t, loadNamespace } = useLanguage();
    const [activeTab, setActiveTab] = useState<Tab>('quiz');

    useEffect(() => {
        loadNamespace('faktapankki');
    }, [loadNamespace]);


    return (
        <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-32 space-y-24">

            {/* Header - Left Aligned "Human" Style */}
            <header className="space-y-12 max-w-2xl">
                <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1 inline-block">
                    {t('faktapankki.header.title_mini')}
                </span>

                <h1 className="text-4xl md:text-5xl font-bold text-[#2B2B2B] leading-[1.1] tracking-tight">
                    {t('faktapankki.header.title_main')} <br />
                    <span className="text-[#4A4A4A] font-normal italic">{t('faktapankki.header.title_main_suffix')}</span>
                </h1>

                <div className="space-y-6 max-w-xl">
                    <p className="text-lg text-[#4A4A4A] leading-relaxed">
                        {t('faktapankki.header.description')}
                    </p>
                </div>

                <div className="flex flex-wrap gap-8 pt-4 border-b border-[#E8DDD0]">
                    <button
                        onClick={() => setActiveTab('quiz')}
                        className={cn(
                            "flex items-center gap-3 pb-4 border-b-2 transition-all text-sm font-bold uppercase tracking-widest",
                            activeTab === 'quiz'
                                ? "border-[#5B4B8A] text-[#5B4B8A]"
                                : "border-transparent text-[#4A4A4A] hover:text-[#2B2B2B]"
                        )}
                    >
                        {t('faktapankki.tabs.quiz')}
                    </button>
                    <button
                        onClick={() => setActiveTab('costs')}
                        className={cn(
                            "flex items-center gap-3 pb-4 border-b-2 transition-all text-sm font-bold uppercase tracking-widest",
                            activeTab === 'costs'
                                ? "border-[#5B4B8A] text-[#5B4B8A]"
                                : "border-transparent text-[#4A4A4A] hover:text-[#2B2B2B]"
                        )}
                    >
                        {t('faktapankki.tabs.costs')}
                    </button>
                    <button
                        onClick={() => setActiveTab('simulation')}
                        className={cn(
                            "flex items-center gap-3 pb-4 border-b-2 transition-all text-sm font-bold uppercase tracking-widest",
                            activeTab === 'simulation'
                                ? "border-[#5B4B8A] text-[#5B4B8A]"
                                : "border-transparent text-[#4A4A4A] hover:text-[#2B2B2B]"
                        )}
                    >
                        {t('faktapankki.tabs.simulation')}
                    </button>
                </div>
            </header>

            {/* Content Area - No extra wrapper needed as main container handles it */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {activeTab === 'quiz' && <QuizView />}
                {activeTab === 'costs' && <CostOfSilence />}
                {activeTab === 'simulation' && <CostSimulation />}
            </div>
        </div>
    );
}
