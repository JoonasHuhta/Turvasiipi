'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { ArousalPhaseData, ArousalState } from './bystander-types';

interface ArousalPhaseProps {
    data: ArousalPhaseData;
    onArousalSelected: (state: ArousalState) => void;
    onGroundingComplete: () => void;
    onComplete: () => void;
}

export const ArousalPhase: React.FC<ArousalPhaseProps> = ({
    data,
    onArousalSelected,
    onGroundingComplete,
    onComplete,
}) => {
    const [selected, setSelected] = useState<ArousalState | null>(null);
    const [step, setStep] = useState<'select' | 'grounding' | 'check'>('select');
    const [breathCount, setBreathCount] = useState(0);
    const [breathPhase, setBreathPhase] = useState<'in' | 'out'>('in');
    const [afterCheck, setAfterCheck] = useState<boolean | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const TOTAL_BREATHS = 2; // 2 full cycles = ~20 seconds

    const handleSelect = (id: ArousalState) => {
        setSelected(id);
        onArousalSelected(id);
        setTimeout(() => setStep('grounding'), 800);
    };

    useEffect(() => {
        if (step !== 'grounding') return;

        let breathsDone = 0;
        let phase: 'in' | 'out' = 'in';

        intervalRef.current = setInterval(() => {
            if (phase === 'in') {
                phase = 'out';
                setBreathPhase('out');
            } else {
                breathsDone++;
                setBreathCount(breathsDone);
                if (breathsDone >= TOTAL_BREATHS) {
                    clearInterval(intervalRef.current!);
                    onGroundingComplete();
                    setTimeout(() => setStep('check'), 500);
                    return;
                }
                phase = 'in';
                setBreathPhase('in');
            }
        }, breathPhase === 'in' ? 4000 : 6000);

        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step]);

    const handleAfterCheck = (felt: boolean) => {
        setAfterCheck(felt);
        setTimeout(() => onComplete(), 1800);
    };

    const selectedOption = data.options.find(o => o.id === selected);

    return (
        <div className="p-6 space-y-6">
            {/* Phase header */}
            <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🌬</span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-teal-500">
                        Osa 2 / 5 — Säädä
                    </span>
                </div>
                <p className="text-base font-semibold text-slate-800">{data.question}</p>
            </div>

            {/* Step: select arousal */}
            {step === 'select' && (
                <div className="space-y-3">
                    {data.options.map(opt => (
                        <button
                            key={opt.id}
                            onClick={() => handleSelect(opt.id as ArousalState)}
                            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${selected === opt.id
                                    ? 'border-teal-400 bg-teal-50'
                                    : 'border-slate-200 hover:border-teal-300 hover:bg-teal-50/30'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{opt.icon}</span>
                                <div>
                                    <p className="text-sm font-medium text-slate-800">{opt.label}</p>
                                    <p className="text-xs text-slate-500">{opt.description}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Step: grounding exercise */}
            {step === 'grounding' && (
                <div className="space-y-6">
                    {selectedOption && (
                        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                            <p className="text-sm text-teal-800">
                                <strong>{selectedOption.icon} {selectedOption.label}.</strong> {selectedOption.description}
                            </p>
                        </div>
                    )}

                    {/* Breathing animation */}
                    <div className="text-center space-y-4">
                        <p className="text-sm text-slate-600">{data.groundingExercise.promptText}</p>
                        <div className="relative mx-auto w-28 h-28 flex items-center justify-center">
                            {/* Outer ring */}
                            <div className={`absolute inset-0 rounded-full border-4 transition-all duration-[4000ms] ${breathPhase === 'in'
                                    ? 'border-teal-300 scale-110 opacity-100'
                                    : 'border-teal-500 scale-90 opacity-70'
                                }`} />
                            {/* Inner circle */}
                            <div className={`rounded-full transition-all duration-[4000ms] flex items-center justify-center ${breathPhase === 'in'
                                    ? 'w-20 h-20 bg-teal-100'
                                    : 'w-16 h-16 bg-teal-200'
                                }`}>
                                <span className="text-2xl">
                                    {breathPhase === 'in' ? '↑' : '↓'}
                                </span>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-teal-700">
                            {breathPhase === 'in' ? 'Sisään... (4 sek)' : 'Ulos... (6 sek)'}
                        </p>
                        <p className="text-[11px] text-slate-400">
                            Kierros {breathCount + 1} / {TOTAL_BREATHS}
                        </p>
                    </div>
                </div>
            )}

            {/* Step: after check */}
            {step === 'check' && (
                <div className="space-y-5">
                    <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                        <p className="text-sm font-medium text-teal-800">{data.groundingExercise.afterwardQuestion}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => handleAfterCheck(true)}
                            className="py-3 rounded-xl border-2 border-teal-300 bg-teal-50 hover:bg-teal-100 text-sm font-medium text-teal-800 transition-colors"
                        >
                            Kyllä, hieman 🙂
                        </button>
                        <button
                            onClick={() => handleAfterCheck(false)}
                            className="py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 text-sm text-slate-600 transition-colors"
                        >
                            Ei oikeastaan 😶
                        </button>
                    </div>
                    {afterCheck !== null && (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-xs text-slate-600 leading-relaxed">{data.polyvagalNote}</p>
                        </div>
                    )}
                    {afterCheck !== null && (
                        <p className="text-center text-xs text-slate-400 animate-pulse">Siirrytään valintaan...</p>
                    )}
                </div>
            )}
        </div>
    );
};
