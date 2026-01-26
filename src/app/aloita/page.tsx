"use client";

import { useEffect } from "react";


import { useState } from "react";
import { StartHereHero } from "@/components/safety/intro/StartHereHero";
import { IntensitySelector } from "@/components/safety/intro/IntensitySelector";
import { PersonalContract } from "@/components/safety/intro/PersonalContract";
import { SafetyRecommendations } from "@/components/safety/intro/SafetyRecommendations";
import { useLanguage } from "@/context/LanguageContext";

type Level = "facts" | "exercises" | "reflection" | "simulation";

export default function StartHerePage() {
    const { loadNamespace } = useLanguage();

    useEffect(() => {
        loadNamespace('start_here');
    }, [loadNamespace]);

    const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
    const [isContractLocked, setIsContractLocked] = useState(false);

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* 1. Hero / Intro (Full Screen initially) */}
            <StartHereHero />

            {/* Main Content Area */}
            <main className="max-w-4xl mx-auto px-6 pb-32 pt-20 space-y-24">

                {/* 2. Intensity Selector */}
                <section>
                    <IntensitySelector
                        selectedLevel={selectedLevel}
                        onSelect={setSelectedLevel}
                    />
                </section>

                {/* 3. Personal Contract - Only show if level selected (progressive disclosure?) 
            Or always show but require level? Let's show it always as Step 2.
        */}
                <div className={`transition-all duration-700 ${selectedLevel ? "opacity-100 translate-y-0" : "opacity-30 blur-sm pointer-events-none translate-y-8"}`}>
                    <PersonalContract onLock={() => setIsContractLocked(true)} />
                </div>

                {/* 4. Recommendations */}
                <SafetyRecommendations
                    selectedLevel={selectedLevel}
                    isContractLocked={isContractLocked}
                />

            </main>
        </div>
    );
}
