'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, UserCheck, Clock, ChevronRight } from 'lucide-react';
import { BystanderEngine } from '@/components/sandbox/BullyingSimulator/BystanderEngine';
import { bystanderScenario1Meeting } from '@/components/sandbox/BullyingSimulator/bystander-scenarios/bystander-scenario1-meeting';
import { bystanderScenario2Social } from '@/components/sandbox/BullyingSimulator/bystander-scenarios/bystander-scenario2-social';
import { bystanderScenario3Remote } from '@/components/sandbox/BullyingSimulator/bystander-scenarios/bystander-scenario3-remote';
import { bystanderScenario4Nepsy } from '@/components/sandbox/BullyingSimulator/bystander-scenarios/bystander-scenario4-nepsy';
import { bystanderScenario5Star } from '@/components/sandbox/BullyingSimulator/bystander-scenarios/bystander-scenario5-star';
import type { BystanderScenario } from '@/components/sandbox/BullyingSimulator/bystander-types';
import { getConfidenceLevel, type BystanderProgress } from '@/components/sandbox/BullyingSimulator/bystander-types';

const ALL_SCENARIOS: BystanderScenario[] = [
    bystanderScenario1Meeting,
    bystanderScenario2Social,
    bystanderScenario3Remote,
    bystanderScenario4Nepsy,
    bystanderScenario5Star,
];


function getProgress(): BystanderProgress | null {
    try {
        const raw = localStorage.getItem('bystanderProgress');
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
}

function DifficultyDots({ level }: { level: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${i < level ? 'bg-indigo-500' : 'bg-slate-200'}`}
                />
            ))}
        </div>
    );
}

export default function BystanderPage() {
    const [activeScenario, setActiveScenario] = useState<BystanderScenario | null>(null);
    const [completedIds, setCompletedIds] = useState<string[]>(() => {
        const p = getProgress();
        return p?.scenariosAttempted ?? [];
    });

    const progress = getProgress();
    const confidenceScore = progress?.confidenceScore ?? 0;
    const confidenceLabel = getConfidenceLevel(confidenceScore);

    const handleComplete = () => {
        if (activeScenario) {
            setCompletedIds(prev =>
                prev.includes(activeScenario.id) ? prev : [...prev, activeScenario.id]
            );
        }
        setActiveScenario(null);
    };

    if (activeScenario) {
        return (
            <div className="fixed inset-0 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="max-w-3xl mx-auto">
                    <div className="p-3 flex-shrink-0">
                        <button
                            onClick={handleComplete}
                            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Keskeytä ja palaa
                        </button>
                    </div>
                    <BystanderEngine scenario={activeScenario} onComplete={handleComplete} />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-24 space-y-16">
            {/* Back nav */}
            <Link
                href="/simulaatio"
                className="flex items-center gap-2 text-[12px] font-mono text-slate-500 hover:text-indigo-600 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Takaisin simulaattoreihin
            </Link>

            {/* Header */}
            <header className="space-y-6 max-w-2xl">
                <span className="text-[11px] font-mono text-indigo-500 uppercase tracking-widest border-b border-indigo-300 pb-1">
                    Sivullisen rooli
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                    Bystander-treeni{' '}
                    <span className="text-slate-400 font-normal italic">— 5 osaa</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                    Opettele puuttumaan — turvallisesti, realistisesti ja omalla tavallasi.
                    Jokainen harjoitus kulkee saman kaaren:
                </p>
                <div className="flex flex-wrap gap-2">
                    {['🔍 Tunnista', '🌬 Säädä', '🎯 Valitse', '💬 Sano', '🛡 Suojaa'].map((step, i) => (
                        <React.Fragment key={step}>
                            <span className="text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
                                {step}
                            </span>
                            {i < 4 && <span className="text-slate-300 self-center">→</span>}
                        </React.Fragment>
                    ))}
                </div>
            </header>

            {/* Confidence bar */}
            {progress && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-indigo-400">Taitotasosi</p>
                            <p className="text-lg font-bold text-indigo-800">{confidenceLabel}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-indigo-600">{confidenceScore}</p>
                            <p className="text-[10px] text-indigo-400">/ 100</p>
                        </div>
                    </div>
                    <div className="h-2 bg-indigo-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                            style={{ width: `${confidenceScore}%` }}
                        />
                    </div>
                    <p className="text-xs text-indigo-500 mt-2">
                        {completedIds.length} skenaario suoritettu · {progress.savedPhrases.length} tallennettua lausetta
                    </p>
                </div>
            )}

            {/* Scenario cards */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-indigo-500" />
                    Harjoitusskenaariot
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                    {ALL_SCENARIOS.map(scenario => {
                        const isCompleted = completedIds.includes(scenario.id);
                        return (
                            <button
                                key={scenario.id}
                                onClick={() => setActiveScenario(scenario)}
                                className="group text-left bg-white border-2 border-slate-200 hover:border-indigo-400 rounded-2xl p-5 transition-all duration-200 hover:shadow-md"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-sm border border-indigo-200">
                                            🎮 Simulaattori
                                        </span>
                                        {isCompleted && (
                                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                                ✓ Suoritettu
                                            </span>
                                        )}
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                                </div>

                                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-indigo-700 transition-colors">
                                    {scenario.title}
                                </h3>
                                <p className="text-sm text-slate-500 mb-3">{scenario.context}</p>

                                <div className="flex items-center gap-4 text-[11px] text-slate-400">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        ~{scenario.durationMinutes} min
                                    </span>
                                    <span>⚡ {scenario.powerDynamic}</span>
                                    <DifficultyDots level={scenario.difficulty} />
                                    <span>{scenario.difficultyLabel}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* 5D model explainer */}
            <section className="border-t border-slate-200 pt-12 space-y-6">
                <h2 className="text-lg font-bold text-slate-700">5D-malli: viisi tapaa puuttua</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                        { icon: '🔀', label: 'Häiritse', desc: 'Keskeytä tilanne epäsuorasti', risk: 1 },
                        { icon: '👋', label: 'Delegoi', desc: 'Vie asia eteenpäin', risk: 1 },
                        { icon: '📋', label: 'Dokumentoi', desc: 'Kirjaa ylös mitä näit', risk: 1 },
                        { icon: '💙', label: 'Tue myöhemmin', desc: 'Tavoita uhri erikseen', risk: 1 },
                        { icon: '🗣', label: 'Suora', desc: 'Puutu välittömästi', risk: 3 },
                    ].map(d => (
                        <div key={d.label} className="bg-white border border-slate-200 rounded-xl p-3 text-center">
                            <div className="text-2xl mb-1">{d.icon}</div>
                            <p className="text-xs font-bold text-slate-800">{d.label}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{d.desc}</p>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-slate-400 italic">
                    Perusta: Hollaback! 5D-bystander-malli. Ei ole olemassa vääriä valintoja — vain taktisesti erilaisia.
                </p>
            </section>
        </div>
    );
}
