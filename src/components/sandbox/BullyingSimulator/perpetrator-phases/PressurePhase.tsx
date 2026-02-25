'use client';

import React from 'react';
import { TrendingUp, Clock, Zap } from 'lucide-react';
import type {
    PressurePhaseData,
    StressLevel,
    StressFactor,
} from '../perpetrator-types';
import { STRESS_LABELS } from '../perpetrator-types';

interface Props {
    data: PressurePhaseData;
    onComplete: (stressLevel: StressLevel, selectedFactors: string[]) => void;
}

function StressMeter({ level }: { level: StressLevel }) {
    const info = STRESS_LABELS[level];
    return (
        <div className="rounded-2xl border-2 p-4" style={{ borderColor: info.color }}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Stressitaso</span>
                <span className="text-lg font-bold" style={{ color: info.color }}>{info.label}</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(level / 5) * 100}%`, backgroundColor: info.color }}
                />
            </div>
            <p className="text-xs text-slate-500 italic">{info.body}</p>
        </div>
    );
}

function PressureTimeline({ events }: { events: PressurePhaseData['timeline'] }) {
    return (
        <div className="space-y-2">
            {events.map((event, i) => (
                <div key={i} className="flex gap-3 items-start">
                    <div className="flex flex-col items-center">
                        <span className="text-lg">{event.icon}</span>
                        {i < events.length - 1 && <div className="w-0.5 h-4 bg-slate-200 mt-1" />}
                    </div>
                    <div className="flex-1 pb-1">
                        <span className="text-[10px] font-mono text-slate-400">{event.time}</span>
                        <p className="text-sm text-slate-700">{event.text}</p>
                        <span className={`text-[10px] font-bold ${event.stressImpact === 2 ? 'text-orange-500' : 'text-yellow-600'}`}>
                            {event.stressImpact === 2 ? '+++ stressi' : '+ stressi'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function PressurePhase({ data, onComplete }: Props) {
    const [selectedFactors, setSelectedFactors] = React.useState<string[]>([]);
    const [showTimeline, setShowTimeline] = React.useState(false);
    const [showFactors, setShowFactors] = React.useState(false);

    const currentStress = React.useMemo<StressLevel>(() => {
        const base = data.stressStartLevel;
        const extra = data.stressFactors
            .filter(f => selectedFactors.includes(f.id))
            .reduce((sum, f) => sum + f.stressImpact, 0);
        return Math.min(5, base + extra) as StressLevel;
    }, [data.stressStartLevel, data.stressFactors, selectedFactors]);

    const toggleFactor = (id: string) => {
        setSelectedFactors(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-6 px-1">
            {/* Intro */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-amber-600">Osa 1 — Tunnista paine</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{data.intro}</p>
            </div>

            {/* Timeline */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <button
                    onClick={() => setShowTimeline(!showTimeline)}
                    className="w-full flex items-center justify-between text-left"
                >
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span className="font-semibold text-slate-800 text-sm">Päivän tapahtumat ennen tätä hetkeä</span>
                    </div>
                    <span className="text-slate-400">{showTimeline ? '▲' : '▼'}</span>
                </button>
                {showTimeline && (
                    <div className="mt-4">
                        <PressureTimeline events={data.timeline} />
                    </div>
                )}
            </div>

            {/* Internal monologue */}
            <div className="bg-slate-800 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 text-6xl flex items-center justify-center select-none">💭</div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-3">Sisäinen ääni</p>
                <p className="text-white text-base italic leading-relaxed">"{data.internalMonologue}"</p>
            </div>

            {/* Stress meter */}
            <StressMeter level={currentStress} />

            {/* Body signal */}
            <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-700 flex items-start gap-2">
                <span className="text-base mt-0.5">🫀</span>
                <span>{data.bodySignalAtStart}</span>
            </div>

            {/* Factor selection */}
            <div className="space-y-3">
                <button
                    onClick={() => setShowFactors(!showFactors)}
                    className="w-full flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 text-left"
                >
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">{data.question}</span>
                    </div>
                    <span className="text-slate-400">{showFactors ? '▲' : '▼'}</span>
                </button>

                {showFactors && (
                    <div className="grid grid-cols-1 gap-2">
                        {data.stressFactors.map(factor => (
                            <button
                                key={factor.id}
                                onClick={() => toggleFactor(factor.id)}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left border-2 transition-all ${selectedFactors.includes(factor.id)
                                        ? 'bg-orange-50 border-orange-300'
                                        : 'bg-white border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                <span className="text-xl">{factor.icon}</span>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-800">{factor.label}</p>
                                    <p className="text-xs text-slate-500">{factor.description}</p>
                                </div>
                                {selectedFactors.includes(factor.id) && (
                                    <span className="text-orange-500 font-bold text-sm">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* CTA */}
            <button
                onClick={() => onComplete(currentStress, selectedFactors)}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-4 rounded-2xl transition-colors text-sm"
            >
                Jatka → Siirry tilanteeseen
            </button>

            <p className="text-center text-xs text-slate-400 italic">
                Tämä on oppimisympäristö — havainnot ovat vain sinun.
            </p>
        </div>
    );
}
