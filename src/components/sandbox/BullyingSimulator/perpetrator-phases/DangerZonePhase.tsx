'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type {
    DangerZonePhaseData,
    StressLevel,
    MoralJustification,
} from '../perpetrator-types';
import { STRESS_LABELS } from '../perpetrator-types';

interface Props {
    data: DangerZonePhaseData;
    stressLevel: StressLevel;
    onComplete: (justification: MoralJustification, interpretationId: string) => void;
}

export function DangerZonePhase({ data, stressLevel, onComplete }: Props) {
    const [showBodySignals, setShowBodySignals] = React.useState(false);
    const [selectedJustification, setSelectedJustification] = React.useState<MoralJustification | null>(null);
    const [selectedInterpretation, setSelectedInterpretation] = React.useState<string | null>(null);
    const [showGrounding, setShowGrounding] = React.useState(false);
    const [step, setStep] = React.useState<'body' | 'justify' | 'interpret' | 'ground'>('body');

    const stressInfo = STRESS_LABELS[stressLevel];
    const isDangerZone = stressLevel >= 4;

    const handleNext = () => {
        if (step === 'body') setStep('justify');
        else if (step === 'justify' && selectedJustification) setStep('interpret');
        else if (step === 'interpret' && selectedInterpretation) setStep('ground');
        else if (step === 'ground' && selectedJustification && selectedInterpretation) {
            onComplete(selectedJustification, selectedInterpretation);
        }
    };

    return (
        <div className="space-y-5 px-1">
            {/* Header */}
            <div
                className="rounded-2xl border-2 p-5"
                style={{ borderColor: stressInfo.color, backgroundColor: `${stressInfo.color}10` }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4" style={{ color: stressInfo.color }} />
                    <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: stressInfo.color }}>
                        Osa 2 — Vaaravyöhyke
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-white/60 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${(stressLevel / 5) * 100}%`, backgroundColor: stressInfo.color }}
                        />
                    </div>
                    <span className="text-sm font-bold" style={{ color: stressInfo.color }}>{stressInfo.label}</span>
                </div>
            </div>

            {/* Trigger */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-3">Tilanne etenee</p>
                <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-slate-300">
                    <p className="text-slate-800 text-sm leading-relaxed italic">"{data.trigger.text}"</p>
                </div>
                {isDangerZone && (
                    <p className="mt-3 text-xs text-orange-600 bg-orange-50 rounded-lg px-3 py-2">
                        ⚡ Stressitasosi on korkea — huomaat reagoivasi nopeammin kuin normaalisti.
                    </p>
                )}
            </div>

            {/* STEP 1: Body signals */}
            {step === 'body' && (
                <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                        <p className="text-sm font-semibold text-red-800 mb-3">Mitä kehossasi tapahtuu nyt?</p>
                        <div className="space-y-2">
                            {data.bodySignals.map((signal, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-red-700">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                                    {signal}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-700 rounded-2xl p-4">
                        <p className="text-xs text-slate-300 italic">{data.cognitiveNarrow}</p>
                    </div>

                    <button
                        onClick={() => { setShowBodySignals(true); setStep('justify'); }}
                        className="w-full bg-slate-800 text-white py-3 rounded-xl text-sm font-medium"
                    >
                        Tunnistin nämä — jatka
                    </button>
                </div>
            )}

            {/* STEP 2: Moral justifications */}
            {step === 'justify' && (
                <div className="space-y-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5">
                        <p className="text-sm font-semibold text-slate-800 mb-1">Mikä ajatus on mielessäsi juuri nyt?</p>
                        <p className="text-xs text-slate-500 mb-4">Valitse se joka tuntuu lähimmältä — ei oikeaa tai väärää vastausta.</p>
                        <div className="space-y-2">
                            {data.justificationOptions.map(j => (
                                <button
                                    key={j.type}
                                    onClick={() => setSelectedJustification(j.type)}
                                    className={`w-full text-left rounded-xl px-4 py-3 border-2 transition-all text-sm ${selectedJustification === j.type
                                            ? 'border-slate-700 bg-slate-50'
                                            : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <span className="text-slate-800">{j.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedJustification && (() => {
                        const j = data.justificationOptions.find(x => x.type === selectedJustification);
                        return j ? (
                            <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 text-xs text-indigo-700">
                                🧠 <span className="font-semibold">Mitä tämä ajatus tekee:</span> {j.insight}
                            </div>
                        ) : null;
                    })()}

                    <button
                        disabled={!selectedJustification}
                        onClick={handleNext}
                        className="w-full bg-slate-800 text-white py-3 rounded-xl text-sm font-medium disabled:opacity-40"
                    >
                        Jatka →
                    </button>
                </div>
            )}

            {/* STEP 3: Hostile attribution */}
            {step === 'interpret' && (
                <div className="space-y-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5">
                        <p className="text-sm font-semibold text-slate-800 mb-1">Miten tulkitset tilanteen?</p>
                        <p className="text-xs text-slate-500 mb-4">Mikä tuntuu ensimmäiseltä ajatukselta?</p>
                        <div className="space-y-2">
                            {data.interpretations.map(interp => (
                                <button
                                    key={interp.id}
                                    onClick={() => setSelectedInterpretation(interp.id)}
                                    className={`w-full text-left rounded-xl px-4 py-3 border-2 transition-all text-sm ${selectedInterpretation === interp.id
                                            ? interp.isHostile
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-green-300 bg-green-50'
                                            : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    {interp.text}
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedInterpretation && (() => {
                        const interp = data.interpretations.find(x => x.id === selectedInterpretation);
                        return interp ? (
                            <div className={`rounded-xl px-4 py-3 text-xs ${interp.isHostile
                                    ? 'bg-orange-50 border border-orange-200 text-orange-700'
                                    : 'bg-green-50 border border-green-200 text-green-700'
                                }`}>
                                {interp.isHostile ? '⚠️' : '✓'} {interp.explanation}
                            </div>
                        ) : null;
                    })()}

                    <button
                        disabled={!selectedInterpretation}
                        onClick={handleNext}
                        className="w-full bg-slate-800 text-white py-3 rounded-xl text-sm font-medium disabled:opacity-40"
                    >
                        Jatka →
                    </button>
                </div>
            )}

            {/* STEP 4: Grounding before action */}
            {step === 'ground' && (
                <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
                        <p className="text-2xl mb-3">🌬</p>
                        <p className="text-sm font-semibold text-blue-800 mb-2">{data.groundingPrompt}</p>
                        <p className="text-xs text-blue-600">Sisään 4 sekuntia — ulos 6 sekuntia.</p>
                    </div>

                    <button
                        onClick={handleNext}
                        className="w-full bg-slate-800 text-white py-4 rounded-2xl text-sm font-semibold"
                    >
                        Valmis — Siirry valintaan
                    </button>
                </div>
            )}
        </div>
    );
}
