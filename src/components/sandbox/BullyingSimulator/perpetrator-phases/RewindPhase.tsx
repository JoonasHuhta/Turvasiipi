'use client';

import React from 'react';
import { RotateCcw, Pencil } from 'lucide-react';
import type { RewindPhaseData, AlternativePhrase } from '../perpetrator-types';

interface Props {
    data: RewindPhaseData;
    originalActionText: string;
    onComplete: (phraseText: string) => void;
}

export function RewindPhase({ data, originalActionText, onComplete }: Props) {
    const [step, setStep] = React.useState<'rewind' | 'choose' | 'edit'>('rewind');
    const [selectedPhrase, setSelectedPhrase] = React.useState<AlternativePhrase | null>(null);
    const [customText, setCustomText] = React.useState('');
    const [showEdit, setShowEdit] = React.useState(false);
    const [filledTemplate, setFilledTemplate] = React.useState(data.editableTemplate.template);

    const finalPhrase = selectedPhrase?.text ?? (customText || filledTemplate);

    return (
        <div className="space-y-5 px-1">
            {/* Header */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                    <RotateCcw className="w-4 h-4 text-indigo-600" />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-600">Osa 4 — Rewind</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{data.rewindExplanation}</p>
            </div>

            {/* STEP 1: The rewind moment */}
            {step === 'rewind' && (
                <div className="space-y-4">
                    {/* What actually happened */}
                    <div className="bg-slate-100 rounded-xl p-4 relative">
                        <p className="text-[10px] font-mono text-slate-400 uppercase mb-2">Mitä tapahtui</p>
                        <p className="text-sm text-slate-700 italic line-through opacity-60">"{originalActionText}"</p>
                    </div>

                    {/* Rewind animation indicator */}
                    <div className="bg-indigo-600 rounded-2xl p-5 text-center text-white">
                        <div className="text-3xl mb-2 animate-pulse">⏪</div>
                        <p className="text-base font-semibold">Kelaamme takaisin</p>
                        <p className="text-sm text-indigo-200 mt-1">
                            Sama tilanne. Sama stressi.
                        </p>
                        <p className="text-xs text-indigo-300 mt-1 italic">{data.sameStressReminder}</p>
                    </div>

                    <button
                        onClick={() => setStep('choose')}
                        className="w-full bg-slate-800 text-white py-4 rounded-2xl text-sm font-semibold"
                    >
                        Valitse vaihtoehto →
                    </button>
                </div>
            )}

            {/* STEP 2: Alternative phrase selection */}
            {step === 'choose' && (
                <div className="space-y-4">
                    <p className="text-sm font-medium text-slate-700">Mitä voisit sanoa toisin?</p>

                    <div className="space-y-3">
                        {data.alternatives.map(alt => (
                            <button
                                key={alt.id}
                                onClick={() => setSelectedPhrase(alt)}
                                className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${selectedPhrase?.id === alt.id
                                        ? 'border-indigo-400 bg-indigo-50'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                    }`}
                            >
                                <span className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded mb-2 ${alt.tone === 'boundary' ? 'bg-blue-100 text-blue-700' :
                                        alt.tone === 'assertive' ? 'bg-purple-100 text-purple-700' :
                                            alt.tone === 'self-aware' ? 'bg-green-100 text-green-700' :
                                                'bg-amber-100 text-amber-700'
                                    }`}>
                                    {alt.toneLabel}
                                </span>
                                <p className="text-sm text-slate-800">{alt.text}</p>
                                {selectedPhrase?.id === alt.id && (
                                    <div className="mt-3 pt-3 border-t border-indigo-200">
                                        <p className="text-xs text-indigo-700">{alt.explanation}</p>
                                        <div className="mt-2 space-y-1">
                                            <p className="text-[10px] text-slate-400 font-mono uppercase">Reaktio</p>
                                            <p className="text-xs text-slate-600">{alt.sceneReaction.targetReaction}</p>
                                            {alt.sceneReaction.groupReaction && (
                                                <p className="text-xs text-slate-500 italic">{alt.sceneReaction.groupReaction}</p>
                                            )}
                                            <div className="bg-green-50 rounded-lg p-2 mt-2">
                                                <p className="text-xs text-green-700">✓ {alt.analysis}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Edit own phrase */}
                    <button
                        onClick={() => setShowEdit(!showEdit)}
                        className="w-full flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 py-2"
                    >
                        <Pencil className="w-3 h-3" />
                        Muokkaa tai kirjoita oma lause
                    </button>

                    {showEdit && (
                        <div className="space-y-3">
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                <p className="text-xs text-slate-500 mb-2">Pohja:</p>
                                <p className="text-sm font-mono text-slate-700">{data.editableTemplate.template}</p>
                                <div className="mt-3 space-y-2">
                                    {data.editableTemplate.slots.map((slot, i) => (
                                        <div key={i}>
                                            <label className="text-[10px] text-slate-400 font-mono">{slot.placeholder}</label>
                                            <input
                                                type="text"
                                                placeholder={slot.suggestion}
                                                className="w-full mt-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-400"
                                            />
                                            <p className="text-[10px] text-slate-400 mt-0.5">{slot.hint}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <p className="text-xs text-slate-500">{data.openTextPrompt}</p>
                            <textarea
                                value={customText}
                                onChange={e => setCustomText(e.target.value)}
                                placeholder="Kirjoita oma lauseesi..."
                                className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-400 min-h-[80px] resize-none"
                            />
                        </div>
                    )}

                    <button
                        disabled={!selectedPhrase && !customText}
                        onClick={() => onComplete(selectedPhrase?.text ?? customText)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl text-sm font-semibold disabled:opacity-40 transition-colors"
                    >
                        Tallenna tämä lauseeksi → Siirry korjaukseen
                    </button>
                </div>
            )}
        </div>
    );
}
