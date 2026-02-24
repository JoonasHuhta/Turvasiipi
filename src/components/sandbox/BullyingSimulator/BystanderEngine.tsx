'use client';

import React, { useState, useCallback, useRef } from 'react';
import type {
    BystanderScenario,
    BystanderEngineState,
    BystanderPhase,
    InterventionType5D,
    ArousalState,
    BystanderCard,
    BystanderProgress,
} from './bystander-types';

import { BystanderSceneView } from './BystanderSceneView';
import { RecognitionPhase } from './RecognitionPhase';
import { ArousalPhase } from './ArousalPhase';
import { InterventionPhase } from './InterventionPhase';
import { WordPracticePhase } from './WordPracticePhase';
import { SafetyPlanPhase } from './SafetyPlanPhase';
import { BystanderCardView } from './BystanderCardView';

interface BystanderEngineProps {
    scenario: BystanderScenario;
    onComplete: () => void;
}

const PHASE_ORDER: BystanderPhase[] = [
    'recognition',
    'arousal',
    'intervention',
    'words',
    'safety',
    'card',
];

const PHASE_META: Record<BystanderPhase, { label: string; emoji: string; color: string }> = {
    intro: { label: 'Johdanto', emoji: '📖', color: 'text-slate-500' },
    recognition: { label: 'Tunnista', emoji: '🔍', color: 'text-indigo-500' },
    arousal: { label: 'Säädä', emoji: '🌬', color: 'text-teal-500' },
    intervention: { label: 'Valitse', emoji: '🎯', color: 'text-purple-500' },
    words: { label: 'Sano', emoji: '💬', color: 'text-blue-500' },
    safety: { label: 'Suojaa', emoji: '🛡', color: 'text-emerald-500' },
    card: { label: 'Korttisi', emoji: '🎉', color: 'text-amber-500' },
};

function saveProgress(card: BystanderCard, scenarioId: string) {
    try {
        const raw = localStorage.getItem('bystanderProgress');
        const data: BystanderProgress = raw ? JSON.parse(raw) : {
            sessionsCompleted: 0,
            scenariosAttempted: [],
            highestDifficulty: 0,
            confidenceScore: 0,
            savedPhrases: [],
            savedCards: [],
        };
        data.sessionsCompleted += 1;
        if (!data.scenariosAttempted.includes(scenarioId)) {
            data.scenariosAttempted.push(scenarioId);
        }
        data.confidenceScore = Math.min(100, data.confidenceScore + 15);
        if (card.savedPhrase && !data.savedPhrases.includes(card.savedPhrase)) {
            data.savedPhrases.push(card.savedPhrase);
        }
        data.savedCards.push(card);
        localStorage.setItem('bystanderProgress', JSON.stringify(data));
    } catch { /* localStorage unavailable */ }
}

export const BystanderEngine: React.FC<BystanderEngineProps> = ({ scenario, onComplete }) => {
    const [state, setState] = useState<BystanderEngineState>({
        phase: 'recognition',
        groundingCompleted: false,
        timedOut: false,
        selectedProtections: [],
    });
    const [dialogueDone, setDialogueDone] = useState(false);
    const phaseRef = useRef<HTMLDivElement>(null);

    const currentPhaseIndex = PHASE_ORDER.indexOf(state.phase);
    const meta = PHASE_META[state.phase];

    const advancePhase = useCallback(() => {
        setState(prev => {
            const nextIndex = PHASE_ORDER.indexOf(prev.phase) + 1;
            if (nextIndex >= PHASE_ORDER.length) return prev;
            return { ...prev, phase: PHASE_ORDER[nextIndex] };
        });
        // Scroll phase panel back to top
        setTimeout(() => phaseRef.current?.scrollTo({ top: 0, behavior: 'smooth' }), 80);
    }, []);

    const handleRecognition = (answerId: string, certainty: number) => {
        setState(prev => ({ ...prev, recognitionAnswer: answerId, certaintyScore: certainty }));
        setTimeout(advancePhase, 1200);
    };

    const handleArousal = (arousalState: ArousalState) => {
        setState(prev => ({ ...prev, arousalState }));
    };

    const handleGroundingComplete = () => {
        setState(prev => ({ ...prev, groundingCompleted: true }));
    };

    const handleIntervention = (type: InterventionType5D | null) => {
        setState(prev => ({ ...prev, chosen5D: type ?? undefined, timedOut: type === null }));
        setTimeout(advancePhase, 800);
    };

    const handleWordChoice = (phrase: string) => {
        setState(prev => ({ ...prev, chosenPhrase: phrase }));
    };

    const handlePhraseSaved = (phrase: string) => {
        setState(prev => ({ ...prev, savedPhrase: phrase }));
        setTimeout(advancePhase, 600);
    };

    const handleSafetyPlanDone = (protections: string[]) => {
        const card: BystanderCard = {
            chosenD: state.chosen5D ?? 'document',
            savedPhrase: state.savedPhrase ?? state.chosenPhrase ?? '',
            selfProtection: protections.filter(p =>
                scenario.safetyPlan.protectionActions.find(a => a.id === p && a.category === 'self')
            ),
            victimSupport: protections.filter(p =>
                scenario.safetyPlan.protectionActions.find(a => a.id === p && a.category !== 'self')
            ),
            scenarioId: scenario.id,
            completedAt: new Date().toISOString(),
        };
        setState(prev => ({ ...prev, selectedProtections: protections, card }));
        saveProgress(card, scenario.id);
        setTimeout(advancePhase, 600);
    };

    const isCardPhase = state.phase === 'card';

    return (
        <div className="flex flex-col" style={{ height: '100dvh', maxHeight: '100dvh' }}>

            {/* ─── TOP BAR ─────────────────────────────────────────────────── */}
            <div className="flex-shrink-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm px-4 py-2.5">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    {/* Title */}
                    <div>
                        <p className="text-[9px] font-mono uppercase tracking-widest text-indigo-400">
                            Sivullisen rooli
                        </p>
                        <p className="text-xs font-bold text-slate-800 leading-tight">{scenario.title}</p>
                    </div>

                    {/* Progress pills */}
                    <div className="flex items-center gap-1">
                        {PHASE_ORDER.map((phase, i) => {
                            const m = PHASE_META[phase];
                            const isDone = i < currentPhaseIndex;
                            const isActive = i === currentPhaseIndex;
                            return (
                                <div
                                    key={phase}
                                    className={[
                                        'flex items-center justify-center rounded-full transition-all duration-300 text-[10px]',
                                        isDone
                                            ? 'w-5 h-5 bg-indigo-500 text-white'
                                            : isActive
                                                ? 'w-6 h-6 bg-indigo-600 text-white ring-2 ring-indigo-200 ring-offset-1'
                                                : 'w-5 h-5 bg-slate-100 text-slate-400',
                                    ].join(' ')}
                                    title={m.label}
                                >
                                    {isDone ? '✓' : m.emoji}
                                </div>
                            );
                        })}
                        <span className={`ml-1.5 text-[10px] font-semibold ${meta.color}`}>
                            {meta.label}
                        </span>
                    </div>
                </div>
            </div>

            {/* ─── SCENE PANEL (fixed height, always visible) ──────────────── */}
            {!isCardPhase && (
                <div className="flex-shrink-0 px-3 pt-3 pb-0 max-w-2xl mx-auto w-full">
                    <BystanderSceneView
                        scene={scenario.scene}
                        characters={scenario.characters}
                        onDialogueComplete={() => setDialogueDone(true)}
                        showSilenceOutcome={state.timedOut}
                    />

                    {/* Nudge before dialogue is done */}
                    {!dialogueDone && state.phase === 'recognition' && (
                        <p className="text-center text-[10px] text-slate-400 mt-1.5 animate-pulse">
                            👆 Napauta kohtausta lukeaksesi dialogi läpi
                        </p>
                    )}
                </div>
            )}

            {/* ─── PHASE PANEL (scrollable, takes remaining space) ─────────── */}
            <div
                ref={phaseRef}
                className="flex-1 overflow-y-auto overscroll-contain"
                style={{ minHeight: 0 }}
            >
                <div className="max-w-2xl mx-auto px-3 pt-3 pb-6">
                    <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
                        {state.phase === 'recognition' && (
                            <RecognitionPhase
                                data={scenario.recognition}
                                onComplete={handleRecognition}
                            />
                        )}
                        {state.phase === 'arousal' && (
                            <ArousalPhase
                                data={scenario.arousal}
                                onArousalSelected={handleArousal}
                                onGroundingComplete={handleGroundingComplete}
                                onComplete={advancePhase}
                            />
                        )}
                        {state.phase === 'intervention' && (
                            <InterventionPhase
                                data={scenario.intervention}
                                timeWindowSeconds={scenario.scene.timeWindowSeconds}
                                silenceOutcome={scenario.scene.silenceOutcome}
                                onComplete={handleIntervention}
                            />
                        )}
                        {state.phase === 'words' && (
                            <WordPracticePhase
                                data={scenario.wordPractice}
                                chosen5D={state.chosen5D}
                                onPhraseSelected={handleWordChoice}
                                onPhraseSaved={handlePhraseSaved}
                            />
                        )}
                        {state.phase === 'safety' && (
                            <SafetyPlanPhase
                                data={scenario.safetyPlan}
                                chosen5D={state.chosen5D}
                                savedPhrase={state.savedPhrase}
                                onComplete={handleSafetyPlanDone}
                            />
                        )}
                        {state.phase === 'card' && state.card && (
                            <BystanderCardView
                                card={state.card}
                                scenario={scenario}
                                onClose={onComplete}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
