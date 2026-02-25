'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Star, Play } from 'lucide-react';
import type { PerpetratorScenario } from '@/components/sandbox/BullyingSimulator/perpetrator-types';
import { ACTION_SEVERITY_LABELS } from '@/components/sandbox/BullyingSimulator/perpetrator-types';
import { PerpetratorEngine } from '@/components/sandbox/BullyingSimulator/PerpetratorEngine';
import { perpetratorScenario1KPI } from '@/components/sandbox/BullyingSimulator/perpetrator-scenarios/perpetrator-scenario1-kpi';
import { perpetratorScenario2Inherited } from '@/components/sandbox/BullyingSimulator/perpetrator-scenarios/perpetrator-scenario2-inherited';
import { perpetratorScenario3Nepsy } from '@/components/sandbox/BullyingSimulator/perpetrator-scenarios/perpetrator-scenario3-nepsy';
import { perpetratorScenario4Group } from '@/components/sandbox/BullyingSimulator/perpetrator-scenarios/perpetrator-scenario4-group';
import { perpetratorScenario5Helper } from '@/components/sandbox/BullyingSimulator/perpetrator-scenarios/perpetrator-scenario5-helper';

// ─── All scenarios list ───────────────────────────────────────────────────────

const ALL_SCENARIOS: PerpetratorScenario[] = [
    perpetratorScenario1KPI,
    perpetratorScenario2Inherited,
    perpetratorScenario3Nepsy,
    perpetratorScenario4Group,
    perpetratorScenario5Helper,
];

// ─── Scenario card ────────────────────────────────────────────────────────────

function ScenarioCard({
    scenario,
    onStart,
}: {
    scenario: PerpetratorScenario;
    onStart: (s: PerpetratorScenario) => void;
}) {
    const roleLabel: Record<string, string> = {
        manager: '👔 Esihenkilö',
        colleague: '👥 Kollega',
        group_member: '🫂 Ryhmässä',
        helper: '🤝 Auttaja-роoli',
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all">
            <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wide">
                    {roleLabel[scenario.role]}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {scenario.durationMinutes} min
                </span>
            </div>

            <h3 className="font-bold text-slate-900 text-base mb-1">{scenario.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">{scenario.context}</p>

            <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className="w-3.5 h-3.5"
                        fill={i < scenario.difficulty ? '#f59e0b' : 'none'}
                        stroke={i < scenario.difficulty ? '#f59e0b' : '#d1d5db'}
                    />
                ))}
                <span className="text-xs text-slate-500 ml-1">{scenario.difficultyLabel}</span>
            </div>

            <div className="bg-slate-50 rounded-xl px-3 py-2 mb-4">
                <p className="text-[10px] font-mono text-slate-400 uppercase mb-0.5">Tavoite</p>
                <p className="text-xs text-slate-700">{scenario.learningGoal}</p>
            </div>

            <button
                onClick={() => onStart(scenario)}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl text-sm font-semibold transition-colors"
            >
                <Play className="w-4 h-4" />
                Aloita skenaario
            </button>
        </div>
    );
}

// ─── Coming soon placeholder ──────────────────────────────────────────────────

function ComingSoonCard({ title, emoji }: { title: string; emoji: string }) {
    return (
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-5 opacity-60">
            <div className="text-3xl mb-3">{emoji}</div>
            <h3 className="font-semibold text-slate-700 text-base mb-1">{title}</h3>
            <p className="text-xs text-slate-400">Tulossa pian</p>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TekijaPage() {
    const [activeScenario, setActiveScenario] = React.useState<PerpetratorScenario | null>(null);
    const [completedIds, setCompletedIds] = React.useState<string[]>(() => {
        try {
            const raw = localStorage.getItem('perpetratorProgress');
            if (!raw) return [];
            const p = JSON.parse(raw);
            return p.savedCards?.map((c: { scenarioId: string }) => c.scenarioId) ?? [];
        } catch {
            return [];
        }
    });

    const handleComplete = () => {
        if (activeScenario) {
            setCompletedIds(prev => [...prev, activeScenario.id]);
            setActiveScenario(null);
        }
    };

    if (activeScenario) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-lg mx-auto">
                    <PerpetratorEngine scenario={activeScenario} onComplete={handleComplete} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-2xl mx-auto px-4 py-8">
                {/* Navigation */}
                <Link
                    href="/simulaatio"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Simulaatiot
                </Link>

                {/* Hero section */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white mb-8">
                    <div className="text-4xl mb-4">🪞</div>
                    <h1 className="text-2xl font-bold mb-3">Tekijän rooli</h1>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        Oletko joskus sanonut tai tehnyt jotain, mikä on jäänyt kaihertamaan?
                        Tässä moodissa voit tutkia omia reaktioitasi turvallisesti.
                    </p>
                    <div className="bg-white/10 rounded-2xl p-4">
                        <p className="text-xs text-slate-300 italic">
                            Kiusaajat eivät usein ole pahoja ihmisiä — he ovat stressaantuneita,
                            peloissaan tai oppineet huonoja malleja. Tämä simulaattori ei glorifioi
                            kiusaamista — se tekee sen taustat näkyväksi.
                        </p>
                    </div>
                </div>

                {/* Role selection info */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-1">⚡</div>
                        <p className="text-xs font-semibold text-slate-700">Vaaravyöhyke</p>
                        <p className="text-xs text-slate-500">Tunnista hetki ennen tekoa</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-1">⏪</div>
                        <p className="text-xs font-semibold text-slate-700">Rewind</p>
                        <p className="text-xs text-slate-500">Sama stressi — eri valinta</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-1">👁</div>
                        <p className="text-xs font-semibold text-slate-700">Split-screen</p>
                        <p className="text-xs text-slate-500">Näe seuraukset kolmesta kulmasta</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-1">🌱</div>
                        <p className="text-xs font-semibold text-slate-700">Korjaava liike</p>
                        <p className="text-xs text-slate-500">Häpeästä toimijuuteen</p>
                    </div>
                </div>

                {/* Scenarios */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Skenaariot</h2>
                    <div className="space-y-4">
                        {ALL_SCENARIOS.map(s => (
                            <div key={s.id} className="relative">
                                {completedIds.includes(s.id) && (
                                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                                        ✓ Tehty
                                    </div>
                                )}
                                <ScenarioCard scenario={s} onStart={setActiveScenario} />
                            </div>
                        ))}

                        {/* Coming soon */}
                        <ComingSoonCard title="Peritty malli" emoji="🔄" />
                        <ComingSoonCard title="Nepsyn ärsytys" emoji="⚡" />
                        <ComingSoonCard title="Ryhmäpaine" emoji="🫂" />
                        <ComingSoonCard title="Uupunut auttaja" emoji="💔" />
                    </div>
                </div>

                {/* Footer note */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 text-center">
                    <p className="text-xs text-indigo-700">
                        Tämä moduuli on oppimisympäristö — havainnot ovat vain sinun.
                        Et voi epäonnistua. Jokainen valinta on materiaalia.
                    </p>
                    <p className="text-xs text-indigo-500 mt-2">
                        Katso myös:{' '}
                        <Link href="/simulaatio/bystander" className="underline">Sivulliset →</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
