'use client';

import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import type { RepairPhaseData, RepairAction } from '../perpetrator-types';

interface Props {
    data: RepairPhaseData;
    onComplete: (chosen: string[], learned: string, nextStep: string) => void;
}

const SHAME_STEPS = [
    { key: 'normalize', label: 'Normalisoi', icon: '🌊' },
    { key: 'separate', label: 'Erota teko', icon: '✂️' },
    { key: 'contrast', label: 'Kontrastoi', icon: '✨' },
    { key: 'action', label: 'Valitse teko', icon: '🌱' },
    { key: 'identity', label: 'Uusi minä', icon: '🦋' },
] as const;

const CATEGORY_LABELS: Record<RepairAction['category'], string> = {
    apology: 'Anteeksipyyntö',
    conversation: 'Keskustelu',
    self: 'Oma kasvu',
    systemic: 'Rakenteellinen',
};

export function RepairPhase({ data, onComplete }: Props) {
    const [shameStep, setShameStep] = React.useState(0);
    const [goodDeed, setGoodDeed] = React.useState('');
    const [selectedActions, setSelectedActions] = React.useState<string[]>([]);
    const [learned, setLearned] = React.useState('');
    const [nextStep, setNextStep] = React.useState('');
    const [showCard, setShowCard] = React.useState(false);

    const toggleAction = (id: string) => {
        setSelectedActions(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    if (showCard) {
        return (
            <div className="space-y-5 px-1">
                {/* The card */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl">
                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="w-5 h-5" />
                        <span className="text-[11px] font-mono uppercase tracking-widest opacity-80">Tekijäkortti</span>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white/10 rounded-2xl p-4">
                            <p className="text-[10px] font-mono opacity-60 uppercase mb-1">Tänään opin</p>
                            <p className="text-white text-sm font-medium">{learned || 'Jotain tärkeää itsestäni.'}</p>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-4">
                            <p className="text-[10px] font-mono opacity-60 uppercase mb-1">Seuraavaksi kokeilen</p>
                            <p className="text-white text-sm font-medium">{nextStep || 'Uutta tapaa reagoida.'}</p>
                        </div>
                        {selectedActions.length > 0 && (
                            <div className="bg-white/10 rounded-2xl p-4">
                                <p className="text-[10px] font-mono opacity-60 uppercase mb-2">Korjaavia liikkeitä</p>
                                <div className="space-y-1">
                                    {selectedActions.map((id, i) => (
                                        <p key={i} className="text-xs text-white/80">✓ {id}</p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/20">
                        <p className="text-[10px] text-white/50 italic text-center">
                            Ihmiset, jotka kiusaavat, eivät usein ole pahoja — he ovat stressaantuneita, peloissaan tai oppineet huonoja malleja. Vastuu teoista on silti heidän. Ja muutos on aina mahdollinen.
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => onComplete(selectedActions, learned, nextStep)}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-2xl text-sm font-semibold transition-colors"
                >
                    Valmis — sulje simulaattori
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-5 px-1">
            {/* Header */}
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-purple-600" />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-purple-600">Osa 5 — Korjaava liike</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{data.shameNormalization}</p>
            </div>

            {/* Shame processing steps */}
            <div className="flex gap-1 justify-between">
                {SHAME_STEPS.map((s, i) => (
                    <div
                        key={s.key}
                        className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg text-center transition-all ${i <= shameStep ? 'bg-purple-100' : 'bg-slate-100'
                            }`}
                    >
                        <span className="text-base">{s.icon}</span>
                        <span className="text-[9px] text-slate-500 hidden sm:block">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* Step 0: Normalize */}
            {shameStep === 0 && (
                <div className="space-y-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5">
                        <h3 className="font-semibold text-slate-800 mb-3">Häpeä on normaali — et ole yksin</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{data.shameNormalization}</p>
                    </div>
                    <button onClick={() => setShameStep(1)} className="w-full bg-slate-800 text-white py-3 rounded-xl text-sm font-medium">
                        Tunnistin tämän →
                    </button>
                </div>
            )}

            {/* Step 1: Separate */}
            {shameStep === 1 && (
                <div className="space-y-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5">
                        <h3 className="font-semibold text-slate-800 mb-3">Teko ≠ persoona</h3>
                        <p className="text-sm text-slate-600 mb-4">{data.seatTakingText}</p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-red-50 rounded-xl p-3 text-center">
                                <p className="text-[10px] font-mono text-red-400 uppercase mb-1">Vanha tarina</p>
                                <p className="text-sm text-red-800 font-medium">{data.identityContrast.old}</p>
                            </div>
                            <div className="bg-green-50 rounded-xl p-3 text-center">
                                <p className="text-[10px] font-mono text-green-400 uppercase mb-1">Uusi mahdollisuus</p>
                                <p className="text-sm text-green-800 font-medium">{data.identityContrast.new}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setShameStep(2)} className="w-full bg-slate-800 text-white py-3 rounded-xl text-sm font-medium">
                        Ymmärsin tämän →
                    </button>
                </div>
            )}

            {/* Step 2: Contrast / Good deed */}
            {shameStep === 2 && (
                <div className="space-y-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5">
                        <h3 className="font-semibold text-slate-800 mb-2">Häpeä kutistuu kontrastilla</h3>
                        <p className="text-sm text-slate-500 mb-4">Kirjoita yksi hyvä teko jonka olet tehnyt jollekin muulle.</p>
                        <textarea
                            value={goodDeed}
                            onChange={e => setGoodDeed(e.target.value)}
                            placeholder="Esim: Autoin kollegaa kiireessä, kuuntelin kaveria kun hänellä oli huono päivä..."
                            className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-400 min-h-[80px] resize-none"
                        />
                        {goodDeed && (
                            <div className="mt-3 bg-green-50 rounded-xl p-3">
                                <p className="text-xs text-green-700">✨ Tämä on myös sinä. Häpeä ei ole koko totuus.</p>
                            </div>
                        )}
                    </div>
                    <button
                        disabled={!goodDeed}
                        onClick={() => setShameStep(3)}
                        className="w-full bg-slate-800 text-white py-3 rounded-xl text-sm font-medium disabled:opacity-40"
                    >
                        Kirjoitin sen →
                    </button>
                </div>
            )}

            {/* Step 3: Repair actions */}
            {shameStep === 3 && (
                <div className="space-y-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5">
                        <h3 className="font-semibold text-slate-800 mb-2">Valitse korjaavia liikkeitä</h3>
                        <p className="text-xs text-slate-500 mb-4">Valitse 1–3 jotka tuntuvat mahdollisilta sinulle nyt.</p>
                        <div className="space-y-2">
                            {data.repairActions.map(action => (
                                <button
                                    key={action.id}
                                    onClick={() => toggleAction(action.id)}
                                    className={`w-full text-left rounded-xl border-2 p-4 transition-all ${selectedActions.includes(action.id)
                                            ? 'border-purple-300 bg-purple-50'
                                            : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">{CATEGORY_LABELS[action.category]}</span>
                                            <p className="text-sm text-slate-800 font-medium">{action.label}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{action.description}</p>
                                            {action.exampleText && selectedActions.includes(action.id) && (
                                                <div className="mt-2 bg-white border border-purple-200 rounded-lg p-2">
                                                    <p className="text-xs text-purple-700 italic">"{action.exampleText}"</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ml-3 mt-0.5 flex items-center justify-center ${selectedActions.includes(action.id) ? 'bg-purple-500 border-purple-500' : 'border-slate-300'
                                            }`}>
                                            {selectedActions.includes(action.id) && <span className="text-white text-xs">✓</span>}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Support resources */}
                    {data.supportResources.length > 0 && (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-xs font-semibold text-slate-600 mb-2">Jos haluat tukea stressin ja aggression säätelyyn:</p>
                            <div className="space-y-2">
                                {data.supportResources.map((r, i) => (
                                    <div key={i} className="text-xs text-slate-600">
                                        <span className="font-medium">{r.label}:</span> {r.description}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => setShameStep(4)}
                        className="w-full bg-slate-800 text-white py-3 rounded-xl text-sm font-medium"
                    >
                        Jatka → Loppukortti
                    </button>
                </div>
            )}

            {/* Step 4: Card content entry */}
            {shameStep === 4 && (
                <div className="space-y-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5">
                        <h3 className="font-semibold text-slate-800 mb-4">Rakenna loppukorttisi</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-slate-600">{data.cardPrompt}</label>
                                <textarea
                                    value={learned}
                                    onChange={e => setLearned(e.target.value)}
                                    placeholder="Esim: Oma stressini ei ole syy käyttää sitä muihin..."
                                    className="w-full mt-2 text-sm border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-400 min-h-[70px] resize-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-600">{data.nextStepPrompt}</label>
                                <textarea
                                    value={nextStep}
                                    onChange={e => setNextStep(e.target.value)}
                                    placeholder="Esim: Kun tunnen ärtyneisyyden nousevan, sanon..."
                                    className="w-full mt-2 text-sm border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-400 min-h-[70px] resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        disabled={!learned && !nextStep}
                        onClick={() => setShowCard(true)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl text-sm font-semibold disabled:opacity-40 transition-colors"
                    >
                        Luo korttini ✨
                    </button>
                </div>
            )}
        </div>
    );
}
