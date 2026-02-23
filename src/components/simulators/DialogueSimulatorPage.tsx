'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { DialogueTreeScenario } from '@/components/sandbox/BullyingSimulator/dialogue-types';
import { DialogueTreeEngine } from '@/components/sandbox/BullyingSimulator/DialogueTreeEngine';
import { ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

interface DialogueSimulatorPageProps {
    scenario: DialogueTreeScenario;
    /** Where to go when user exits — defaults to /simulaatio */
    exitHref?: string;
}

/**
 * Shared wrapper for all DialogueTree-based simulator pages.
 * Handles the entry state (landing card) and the active engine state.
 *
 * Usage: create a minimal page.tsx that imports the right scenario and passes it here.
 */
export function DialogueSimulatorPage({
    scenario,
    exitHref = '/simulaatio',
}: DialogueSimulatorPageProps) {
    const [started, setStarted] = useState(false);

    if (started) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
                <div className="max-w-4xl mx-auto h-screen flex flex-col">
                    {/* Compact back button */}
                    <div className="p-2 flex-shrink-0">
                        <button
                            onClick={() => setStarted(false)}
                            className="text-gray-500 hover:text-gray-800 flex items-center gap-1.5 text-sm transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Takaisin
                        </button>
                    </div>

                    {/* Engine fills remaining space */}
                    <div className="flex-1 bg-white shadow-lg overflow-hidden flex flex-col min-h-0">
                        <DialogueTreeEngine
                            scenario={scenario}
                            onComplete={() => setStarted(false)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Landing card — shown before starting
    return (
        <div className="min-h-screen bg-[#FAF7F4] flex items-start justify-center">
            <div className="w-full max-w-2xl mx-auto px-6 py-20">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs font-mono text-[#78716C] mb-10 uppercase tracking-widest">
                    <Link href="/simulaatio" className="hover:text-[#5B4B8A] transition-colors">
                        Koe
                    </Link>
                    <span>/</span>
                    <span>Kiusaamissimulaattorit</span>
                </div>

                {/* Scenario card */}
                <div className="bg-white border border-[#E8DDD0] rounded-lg p-8 shadow-sm">
                    {/* Type + arc */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#5B4B8A] bg-[#5B4B8A]/8 border border-[#5B4B8A]/20 px-2 py-0.5 rounded-sm">
                            🎮 Simulaattori
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-[#2B2B2B] mb-3">
                        {scenario.title}
                    </h1>

                    {/* Context */}
                    <p className="text-[#4A4A4A] leading-relaxed mb-6">
                        {scenario.context}
                    </p>

                    {/* Learning goal */}
                    <div className="bg-[#5B4B8A]/5 border-l-4 border-[#5B4B8A]/40 rounded-r-lg p-4 mb-8">
                        <div className="text-xs font-semibold text-[#5B4B8A] mb-1 uppercase tracking-wider">
                            Tavoite
                        </div>
                        <div className="text-sm text-[#2B2B2B]">{scenario.learningGoal}</div>
                    </div>

                    {/* Safety note */}
                    <div className="flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg mb-8 text-xs text-amber-800">
                        <Shield className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                        <span>
                            Tämä on harjoitusympäristö. Kaikki tilanteet ovat kuvitteellisia.
                            Jos koet akuuttia kiusaamista, ota yhteyttä esihenkilöön tai työterveyshuoltoon.
                        </span>
                    </div>

                    {/* Start button */}
                    <button
                        onClick={() => setStarted(true)}
                        className="w-full py-3.5 bg-[#5B4B8A] hover:bg-[#4A3A79] text-white font-semibold rounded-lg transition-colors duration-200 text-base"
                    >
                        Aloita simulaattori →
                    </button>
                </div>

                {/* Back link */}
                <div className="mt-6 text-center">
                    <Link
                        href={exitHref}
                        className="text-xs font-mono text-[#78716C] hover:text-[#5B4B8A] transition-colors uppercase tracking-widest"
                    >
                        ← Takaisin Koe-osioon
                    </Link>
                </div>
            </div>
        </div>
    );
}
