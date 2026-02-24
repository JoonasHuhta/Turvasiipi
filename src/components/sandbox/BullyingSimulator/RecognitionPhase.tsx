'use client';

import React, { useState } from 'react';
import type { RecognitionPhaseData } from './bystander-types';

interface RecognitionPhaseProps {
    data: RecognitionPhaseData;
    onComplete: (answerId: string, certainty: number) => void;
}

export const RecognitionPhase: React.FC<RecognitionPhaseProps> = ({ data, onComplete }) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [certainty, setCertainty] = useState(50);
    const [showFeedback, setShowFeedback] = useState(false);

    const selectedOption = data.options.find(o => o.id === selected);

    const handleSelect = (id: string) => {
        if (showFeedback) return;
        setSelected(id);
    };

    const handleConfirm = () => {
        if (!selected) return;
        setShowFeedback(true);
    };

    const handleContinue = () => {
        if (selected) onComplete(selected, certainty);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Phase header */}
            <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🔍</span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-500">
                        Osa 1 / 5 — Tunnista
                    </span>
                </div>
                <p className="text-base font-semibold text-slate-800">{data.question}</p>
            </div>

            {/* Options */}
            <div className="space-y-2">
                {data.options.map(opt => {
                    const isSelected = selected === opt.id;
                    const isRevealed = showFeedback;
                    const isCorrect = opt.isCorrect;
                    return (
                        <button
                            key={opt.id}
                            onClick={() => handleSelect(opt.id)}
                            disabled={showFeedback}
                            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${isRevealed && isSelected && isCorrect
                                ? 'border-green-400 bg-green-50'
                                : isRevealed && isSelected && !isCorrect
                                    ? 'border-amber-400 bg-amber-50'
                                    : isRevealed && isCorrect
                                        ? 'border-green-300 bg-green-50/50'
                                        : isSelected
                                            ? 'border-indigo-400 bg-indigo-50'
                                            : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center text-xs ${isRevealed && isCorrect
                                    ? 'border-green-500 bg-green-500 text-white'
                                    : isSelected
                                        ? 'border-indigo-500 bg-indigo-500 text-white'
                                        : 'border-slate-300'
                                    }`}>
                                    {isRevealed && isCorrect ? '✓' : isSelected ? '●' : ''}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-700">{opt.label}</p>
                                    {isRevealed && isSelected && (
                                        <p className={`text-xs mt-1 ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
                                            {opt.explanation}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Certainty slider */}
            {selected && !showFeedback && (
                <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-200">
                    <p className="text-sm font-medium text-slate-700">{data.certaintyQuestion}</p>
                    <div className="space-y-1">
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={certainty}
                            onChange={e => setCertainty(Number(e.target.value))}
                            className="w-full accent-indigo-500"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400">
                            <span>En lainkaan varma</span>
                            <span className="text-indigo-600 font-semibold">{certainty}%</span>
                            <span>Täysin varma</span>
                        </div>
                    </div>
                    <button
                        onClick={handleConfirm}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                        Vahvista valinta →
                    </button>
                </div>
            )}

            {/* Feedback after reveal */}
            {showFeedback && (
                <div className="space-y-3">
                    <div className={`rounded-xl p-4 border ${selectedOption?.isCorrect
                        ? 'bg-green-50 border-green-200'
                        : 'bg-amber-50 border-amber-200'
                        }`}>
                        <p className="text-sm font-medium text-slate-800">
                            {selectedOption?.isCorrect ? data.feedback.correct : data.feedback.partial}
                        </p>
                    </div>
                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                        <p className="text-xs text-indigo-700 leading-relaxed">{data.feedback.normalize}</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <p className="text-xs text-slate-600 leading-relaxed">{data.educationalNote}</p>
                    </div>
                    <button
                        onClick={handleContinue}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                        Jatka seuraavaan osaan →
                    </button>
                </div>
            )}
        </div>
    );
};
