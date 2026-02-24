'use client';

import React, { useState } from 'react';
import type { SafetyPhaseData, InterventionType5D } from './bystander-types';

interface SafetyPlanPhaseProps {
    data: SafetyPhaseData;
    chosen5D?: InterventionType5D;
    savedPhrase?: string;
    onComplete: (protections: string[]) => void;
}

const D_LABELS: Record<InterventionType5D, string> = {
    distract: '🔀 Häiritse',
    delegate: '👋 Delegoi',
    document: '📋 Dokumentoi',
    delay: '💙 Tue myöhemmin',
    direct: '🗣 Suora',
};

const CATEGORY_LABELS: Record<string, string> = {
    self: '🛡 Suojaa itseäsi',
    victim: '💙 Tuki uhrille',
    systemic: '🏢 Systeeminen teko',
};

export const SafetyPlanPhase: React.FC<SafetyPlanPhaseProps> = ({
    data,
    chosen5D,
    savedPhrase,
    onComplete,
}) => {
    const [step, setStep] = useState<'costs' | 'protect'>('costs');
    const [selectedCosts, setSelectedCosts] = useState<string[]>([]);
    const [selectedProtections, setSelectedProtections] = useState<string[]>([]);

    const toggleCost = (id: string) => {
        setSelectedCosts(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const toggleProtection = (id: string) => {
        setSelectedProtections(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const byCategory = data.protectionActions.reduce<Record<string, typeof data.protectionActions>>((acc, a) => {
        if (!acc[a.category]) acc[a.category] = [];
        acc[a.category].push(a);
        return acc;
    }, {});

    const canFinish = selectedProtections.length >= 1;

    return (
        <div className="p-6 space-y-5">
            {/* Phase header */}
            <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🛡</span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-500">
                        Osa 5 / 5 — Suojaa
                    </span>
                </div>
                <p className="text-sm font-semibold text-slate-800">{data.intro}</p>
            </div>

            {/* STEP 1: Costs */}
            {step === 'costs' && (
                <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <p className="text-sm font-medium text-amber-800">
                            {data.costScenario.description}
                        </p>
                    </div>

                    <div className="space-y-2">
                        {data.costScenario.options.map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => toggleCost(opt.id)}
                                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${selectedCosts.includes(opt.id)
                                        ? opt.isCost
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-emerald-300 bg-emerald-50'
                                        : 'border-slate-200 hover:border-slate-300 bg-white'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center text-xs ${selectedCosts.includes(opt.id)
                                            ? 'bg-current border-current'
                                            : 'border-slate-300'
                                        }`}>
                                        {selectedCosts.includes(opt.id) && '✓'}
                                    </div>
                                    <p className="text-sm text-slate-700">{opt.label}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <p className="text-xs text-slate-600 italic">{data.costScenario.note}</p>
                    </div>

                    <button
                        onClick={() => setStep('protect')}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl"
                    >
                        Mitä teenkin sitten? →
                    </button>
                </div>
            )}

            {/* STEP 2: Protection actions */}
            {step === 'protect' && (
                <div className="space-y-5">
                    <p className="text-sm text-slate-600">
                        Valitse vähintään yksi teko. Nämä muodostavat turvasuunnitelmasi.
                    </p>

                    {Object.entries(byCategory).map(([cat, actions]) => (
                        <div key={cat}>
                            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                {CATEGORY_LABELS[cat] ?? cat}
                            </p>
                            <div className="space-y-2">
                                {actions.map(action => (
                                    <button
                                        key={action.id}
                                        onClick={() => toggleProtection(action.id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${selectedProtections.includes(action.id)
                                                ? 'border-emerald-400 bg-emerald-50'
                                                : 'border-slate-200 hover:border-emerald-300 bg-white'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center text-xs ${selectedProtections.includes(action.id)
                                                    ? 'border-emerald-500 bg-emerald-500 text-white'
                                                    : 'border-slate-300'
                                                }`}>
                                                {selectedProtections.includes(action.id) && '✓'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-800">{action.label}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">{action.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Upstander note */}
                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                        <p className="text-xs text-indigo-700 leading-relaxed">{data.upstanderNote}</p>
                    </div>

                    {/* Summary preview */}
                    {selectedProtections.length > 0 && chosen5D && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
                            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Sinun suunnitelmasi</p>
                            <p className="text-sm text-slate-700">
                                <strong>Strategia:</strong> {D_LABELS[chosen5D]}
                            </p>
                            {savedPhrase && (
                                <p className="text-sm text-slate-700">
                                    <strong>Lauseesi:</strong> &ldquo;{savedPhrase}&rdquo;
                                </p>
                            )}
                            <p className="text-sm text-slate-700">
                                <strong>Tekosi:</strong> {selectedProtections.length} valittu
                            </p>
                        </div>
                    )}

                    <button
                        onClick={() => onComplete(selectedProtections)}
                        disabled={!canFinish}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold text-sm rounded-xl transition-colors"
                    >
                        Valmis — näytä korttini 🎉
                    </button>
                </div>
            )}
        </div>
    );
};
