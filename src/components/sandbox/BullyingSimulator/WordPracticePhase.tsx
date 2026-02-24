'use client';

import React, { useState } from 'react';
import type { WordPracticePhaseData, InterventionType5D } from './bystander-types';

interface WordPracticePhaseProps {
    data: WordPracticePhaseData;
    chosen5D?: InterventionType5D;
    onPhraseSelected: (phrase: string) => void;
    onPhraseSaved: (phrase: string) => void;
}

type Step = 'choose' | 'edit' | 'saved';

export const WordPracticePhase: React.FC<WordPracticePhaseProps> = ({
    data,
    chosen5D,
    onPhraseSelected,
    onPhraseSaved,
}) => {
    const [step, setStep] = useState<Step>('choose');
    const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [showReaction, setShowReaction] = useState(false);
    const [editText, setEditText] = useState('');
    const [useCustom, setUseCustom] = useState(false);

    const relevantPhrases = chosen5D
        ? data.readyMadePhrases.filter(p => p.dModel === chosen5D)
        : data.readyMadePhrases;

    const displayPhrases = relevantPhrases.length > 0 ? relevantPhrases : data.readyMadePhrases;

    const handlePickPhrase = (phrase: string, index: number) => {
        setSelectedPhrase(phrase);
        setSelectedIndex(index);
        setEditText(phrase);
        onPhraseSelected(phrase);
        setShowReaction(true);
    };

    const handleGoToEdit = () => {
        setShowReaction(false);
        setStep('edit');
    };

    const handleSave = () => {
        const finalPhrase = useCustom
            ? editText.trim()
            : (selectedPhrase ?? editText.trim());
        if (!finalPhrase) return;
        setStep('saved');
        onPhraseSaved(finalPhrase);
    };

    const toneColor = (tone: string) =>
        tone === 'assertive'
            ? 'border-l-4 border-purple-400'
            : tone === 'gentle'
                ? 'border-l-4 border-teal-400'
                : 'border-l-4 border-slate-300';

    const toneBadge = (tone: string) =>
        tone === 'assertive'
            ? 'bg-purple-100 text-purple-700'
            : tone === 'gentle'
                ? 'bg-teal-100 text-teal-700'
                : 'bg-slate-100 text-slate-600';

    return (
        <div className="p-6 space-y-5">
            {/* Phase header */}
            <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">💬</span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-blue-500">
                        Osa 4 / 5 — Sano
                    </span>
                </div>
                <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 italic">{data.context}</p>
                <p className="text-sm font-semibold text-slate-800 mt-3">{data.phrasePrompt}</p>
            </div>

            {/* Step: choose ready-made phrase */}
            {step === 'choose' && (
                <div className="space-y-4">
                    <div className="space-y-3">
                        {displayPhrases.map((phrase, i) => (
                            <div key={i}>
                                <button
                                    onClick={() => handlePickPhrase(phrase.text, i)}
                                    disabled={selectedIndex !== null}
                                    className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-200 ${selectedIndex === i
                                            ? 'border-blue-400 bg-blue-50'
                                            : 'border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50/20'
                                        } ${toneColor(phrase.tone)}`}
                                >
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${toneBadge(phrase.tone)}`}>
                                            {phrase.tone === 'gentle' ? 'Lempeä' : phrase.tone === 'assertive' ? 'Jämäkkä' : 'Neutraali'}
                                        </span>
                                        <span className="text-[10px] text-slate-400">
                                            {phrase.dModel === 'distract' ? '🔀 Häiritse' :
                                                phrase.dModel === 'direct' ? '🗣 Suora' :
                                                    phrase.dModel === 'delay' ? '💙 Tue myöhemmin' :
                                                        phrase.dModel === 'delegate' ? '👋 Delegoi' : '📋 Dokumentoi'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-800 italic">&ldquo;{phrase.text}&rdquo;</p>
                                </button>

                                {/* Reaction reveal */}
                                {showReaction && selectedIndex === i && (
                                    <div className="mx-2 rounded-b-xl border-x border-b border-blue-200 bg-blue-50/60 p-4 space-y-2">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-white rounded-lg p-2">
                                                <p className="text-[10px] font-semibold text-slate-500 mb-1">Pekka:</p>
                                                <p className="text-xs text-slate-700">{phrase.sceneReaction.perpetratorReaction}</p>
                                            </div>
                                            <div className="bg-white rounded-lg p-2">
                                                <p className="text-[10px] font-semibold text-slate-500 mb-1">Meri:</p>
                                                <p className="text-xs text-slate-700">{phrase.sceneReaction.victimReaction}</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-blue-700 leading-relaxed">{phrase.analysis}</p>
                                        <button
                                            onClick={handleGoToEdit}
                                            className="mt-2 w-full py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg"
                                        >
                                            Muokkaa tai tallenna →
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => { setStep('edit'); setUseCustom(true); setEditText(''); }}
                        className="w-full text-sm text-slate-500 hover:text-slate-700 border border-dashed border-slate-300 rounded-xl py-2.5 hover:border-slate-400 transition-colors"
                    >
                        ✏️ Kirjoitan oman lauseen
                    </button>
                </div>
            )}

            {/* Step: edit */}
            {step === 'edit' && (
                <div className="space-y-4">
                    <p className="text-sm text-slate-600">
                        Muokkaa lausetta niin, että se tuntuu omalta. Ei täydellisyyttä — vain käyttökelpoinen.
                    </p>

                    {!useCustom && selectedPhrase && (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                            <p className="text-[10px] text-slate-400 mb-1">Alkuperäinen</p>
                            <p className="text-sm text-slate-700 italic">&ldquo;{selectedPhrase}&rdquo;</p>
                        </div>
                    )}

                    {/* Template helper */}
                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 space-y-2">
                        <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wide">Sisäinen rakennepohja</p>
                        <p className="text-xs text-indigo-700 font-mono">{data.editableTemplate.template}</p>
                        {data.editableTemplate.slots.map((slot, i) => (
                            <div key={i} className="text-xs text-indigo-600">
                                <span className="font-medium">{slot.placeholder}:</span> {slot.hint}
                            </div>
                        ))}
                    </div>

                    <textarea
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        placeholder={data.openTextHint}
                        className="w-full min-h-[80px] border-2 border-slate-200 focus:border-blue-400 rounded-xl p-3 text-sm text-slate-800 resize-none focus:outline-none"
                    />

                    <button
                        onClick={handleSave}
                        disabled={!editText.trim()}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-colors"
                    >
                        💾 {data.savedPhraseLabel}
                    </button>
                </div>
            )}

            {/* Step: saved */}
            {step === 'saved' && (
                <div className="text-center space-y-4 py-4">
                    <div className="text-4xl">✅</div>
                    <h3 className="text-base font-bold text-slate-800">Turvalausesi on tallennettu</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left">
                        <p className="text-xs font-semibold text-slate-500 mb-1">Oma lauseesi</p>
                        <p className="text-sm text-slate-800 italic">&ldquo;{editText || selectedPhrase}&rdquo;</p>
                    </div>
                    <p className="text-xs text-slate-500">Tämä lause tulee näkyviin lopputulos-kortillesi.</p>
                    <p className="text-xs text-slate-400 animate-pulse">Siirrytään viimeiseen osaan...</p>
                </div>
            )}
        </div>
    );
};
