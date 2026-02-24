'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { InterventionPhaseData, InterventionType5D } from './bystander-types';

interface InterventionPhaseProps {
    data: InterventionPhaseData;
    timeWindowSeconds: number;
    silenceOutcome: { text: string; learningPoint: string };
    onComplete: (type: InterventionType5D | null) => void;
}

const RISK_COLORS: Record<number, string> = {
    1: 'text-green-600',
    2: 'text-amber-600',
    3: 'text-red-600',
};
const RISK_BG: Record<number, string> = {
    1: 'bg-green-50 border-green-200',
    2: 'bg-amber-50 border-amber-200',
    3: 'bg-red-50 border-red-200',
};

export const InterventionPhase: React.FC<InterventionPhaseProps> = ({
    data,
    timeWindowSeconds,
    silenceOutcome,
    onComplete,
}) => {
    const [timeLeft, setTimeLeft] = useState(timeWindowSeconds);
    const [timedOut, setTimedOut] = useState(false);
    const [chosen, setChosen] = useState<InterventionType5D | null>(null);
    const [expanded, setExpanded] = useState<InterventionType5D | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (timeWindowSeconds <= 0) return;
        timerRef.current = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timerRef.current!);
                    setTimedOut(true);
                    setShowFeedback(true);
                    setTimeout(() => onComplete(null), 2500);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [timeWindowSeconds, onComplete]);

    const handleChoose = (type: InterventionType5D) => {
        if (timerRef.current) clearInterval(timerRef.current);
        setChosen(type);
        setExpanded(type);
        setShowFeedback(true);
        setTimeout(() => onComplete(type), 2800);
    };

    const chosenIntervention = data.interventions.find(i => i.type === chosen);

    const timerPct = timeWindowSeconds > 0 ? (timeLeft / timeWindowSeconds) * 100 : 100;

    return (
        <div className="p-6 space-y-5">
            {/* Phase header */}
            <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🎯</span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-purple-500">
                        Osa 3 / 5 — Valitse
                    </span>
                </div>
                <p className="text-sm text-slate-700">{data.prompt}</p>
            </div>

            {/* Timer bar */}
            {timeWindowSeconds > 0 && !showFeedback && (
                <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-500">
                        <span>⏱ Hetki menee...</span>
                        <span className={timeLeft <= 3 ? 'text-red-500 font-bold' : ''}>{timeLeft}s</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${timerPct > 50 ? 'bg-green-400' : timerPct > 25 ? 'bg-amber-400' : 'bg-red-400'
                                }`}
                            style={{ width: `${timerPct}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Timed out message */}
            {timedOut && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-sm text-amber-800 font-medium mb-1">{silenceOutcome.text}</p>
                    <p className="text-xs text-amber-700">{silenceOutcome.learningPoint}</p>
                </div>
            )}

            {/* 5D buttons */}
            {!timedOut && (
                <div className="space-y-2">
                    {data.interventions.map(intervention => {
                        const isChosen = chosen === intervention.type;
                        const isExpanded = expanded === intervention.type;
                        const risk = intervention.riskLevel;

                        return (
                            <div key={intervention.type}>
                                <button
                                    disabled={!!chosen}
                                    onClick={() => !chosen && setExpanded(
                                        expanded === intervention.type ? null : intervention.type
                                    )}
                                    className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${isChosen
                                            ? 'border-indigo-400 bg-indigo-50'
                                            : 'border-slate-200 hover:border-indigo-300 bg-white'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{intervention.icon}</span>
                                            <div>
                                                <span className="text-sm font-bold text-slate-800">
                                                    {intervention.label}
                                                </span>
                                                <span className="ml-2 text-xs text-slate-500">
                                                    — {intervention.tagline}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className={`text-xs font-medium ${RISK_COLORS[risk]}`}>
                                                {'●'.repeat(risk)}{'○'.repeat(3 - risk)} {intervention.riskLabel}
                                            </span>
                                            <span className="text-slate-300 text-sm">{isExpanded ? '▲' : '▼'}</span>
                                        </div>
                                    </div>
                                </button>

                                {/* Expanded detail */}
                                {isExpanded && !chosen && (
                                    <div className={`mx-2 rounded-b-xl border-x-2 border-b-2 p-4 space-y-3 ${RISK_BG[risk]}`}>
                                        <div>
                                            <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide mb-1">Esimerkkejä</p>
                                            {intervention.examples.map((ex, i) => (
                                                <p key={i} className="text-sm text-slate-700 border-l-2 border-slate-300 pl-2 mb-1 italic">
                                                    &ldquo;{ex.text}&rdquo;
                                                </p>
                                            ))}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            <span className="font-medium">Parhaiten kun: </span>{intervention.whenBestUsed}
                                        </div>
                                        <button
                                            onClick={() => handleChoose(intervention.type)}
                                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg"
                                        >
                                            Tätä tekisin →
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* No choice option */}
                    {!chosen && (
                        <button
                            onClick={() => handleChoose('document')}
                            className="w-full py-2 text-xs text-slate-400 hover:text-slate-600 underline"
                        >
                            {data.noChoiceText}
                        </button>
                    )}
                </div>
            )}

            {/* Feedback after choice */}
            {showFeedback && chosenIntervention && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                    <p className="text-sm text-indigo-800 font-medium mb-1">
                        {chosenIntervention.icon} Valitsit: {chosenIntervention.label}
                    </p>
                    <p className="text-sm text-indigo-700">{chosenIntervention.feedback}</p>
                    <p className="text-center text-xs text-slate-400 mt-3 animate-pulse">Siirrytään harjoittelemaan sanomista...</p>
                </div>
            )}
        </div>
    );
};
