"use client";

import { useState } from "react";
import { QuizView } from "@/components/faktapankki/QuizView";
import { CostOfSilence } from "@/components/faktapankki/CostOfSilence";
import { Brain, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = 'quiz' | 'costs';

export default function FaktapankkiPage() {
    const [activeTab, setActiveTab] = useState<Tab>('quiz');

    return (
        <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-32 space-y-24">

            {/* Header - Left Aligned "Human" Style */}
            <header className="space-y-12 max-w-2xl">
                <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1 inline-block">
                    Faktapankki
                </span>

                <h1 className="text-4xl md:text-5xl font-bold text-[#2B2B2B] leading-[1.1] tracking-tight">
                    Tieto on suojaa <br />
                    <span className="text-[#4A4A4A] font-normal italic">työelämän pelisäännöt</span>
                </h1>

                <div className="space-y-6 max-w-xl">
                    <p className="text-lg text-[#4A4A4A] leading-relaxed">
                        Tervetuloa Turvasiiven faktapankkiin. Täältä löydät tietoa työelämän pelisäännöistä, tunnistat riskit ja ymmärrät ilmiön laajemmat vaikutukset.
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
                        Tietovisa
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
                        Hiljaisuuden hinta
                    </button>
                </div>
            </header>

            {/* Content Area - No extra wrapper needed as main container handles it */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {activeTab === 'quiz' && <QuizView />}
                {activeTab === 'costs' && <CostOfSilence />}
            </div>
        </div>
    );
}
