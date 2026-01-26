"use client";

import { useRef, useEffect } from "react";
import { Phase, GameStats } from "@/lib/simulator/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

// New Refactored Imports
import { useGameEngine } from "@/hooks/useGameEngine";
import { GameHeader } from "./GameHeader";
import { GameRenderer } from "./GameRenderer";

// Ending Components
import { NeuroEnding } from "@/components/simulator/endings/NeuroEnding";
import { YouthEnding } from "@/components/simulator/endings/YouthEnding";
import { ManagerEnding } from "@/components/simulator/endings/ManagerEnding";
import { GenericEnding } from "@/components/simulator/endings/GenericEnding";

interface StatLabel {
    label: string;
    description: string;
}

interface GameEngineProps {
    scenario: Record<string, Phase>;
    initialPhaseId: string;
    onExit: () => void;
    profession?: string;
    statLabels?: Partial<Record<keyof GameStats, StatLabel>>;
}

export function GameEngine({ scenario, initialPhaseId, onExit, profession = 'nurse', statLabels }: GameEngineProps) {
    const { t } = useLanguage();
    const mainContentRef = useRef<HTMLDivElement>(null);

    const {
        state,
        notification,
        handleChoice,
        currentPhase,
        isEnding
    } = useGameEngine(scenario, initialPhaseId, profession as any);

    // Reset scroll position when phase changes
    useEffect(() => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollTop = 0;
        }
    }, [state.currentPhaseId]);

    // Check for Endings
    if (isEnding) {
        // --- NEURO ENDING ---
        const isNeuroRelated = ['neuro', 'performance_trap', 'information_shadow'].includes(profession);
        if (isNeuroRelated) {
            return <NeuroEnding currentPhaseId={state.currentPhaseId} stats={state.stats} onExit={onExit} />
        }

        // --- YOUTH ENDING ---
        if (profession === 'youth') {
            return <YouthEnding currentPhaseId={state.currentPhaseId} onExit={onExit} />
        }

        // --- MANAGER ENDING ---
        if (profession === 'manager' || state.currentPhaseId === 'END_MANAGER') {
            return <ManagerEnding onExit={onExit} />
        }

        // --- GENERIC ENDING (Nurse/Teacher) ---
        return <GenericEnding
            currentPhaseId={state.currentPhaseId}
            stats={state.stats}
            logEntries={state.logEntries}
            allies={state.allies}
            onExit={onExit}
        />
    }

    if (!currentPhase) {
        return <div>{t('game.errors.phase_not_found', { phaseId: state.currentPhaseId })}</div>;
    }

    // Dynamic button text size
    const getButtonTextSize = (length: number) => {
        if (length > 100) return "text-xs";
        if (length > 60) return "text-[13px]";
        return "text-sm";
    };

    // Calculate theme based on Day and stats
    const getBgColor = (day: number) => {
        if (state.currentPhaseId.startsWith('END_')) return "bg-slate-950";
        if (day <= 10) return "bg-slate-50";
        if (day <= 30) return "bg-slate-100";
        return "bg-slate-200";
    };

    // Stress level calculation (0-1)
    const selfEsteem = state.stats.selfEsteem || 50;
    const stressLevel = Math.max(0, (100 - selfEsteem) / 100);

    return (
        <div className={cn("fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden font-sans transition-colors duration-1000", getBgColor(currentPhase.day))}>

            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-0 left-1/4 w-full h-full bg-indigo-500/5 rounded-full blur-[120px] transition-all duration-1000"
                    style={{ opacity: 0.1 + stressLevel * 0.2, transform: `scale(${1 + stressLevel})` }}
                />
                <div
                    className="absolute bottom-0 right-1/4 w-full h-full bg-rose-500/5 rounded-full blur-[120px] transition-all duration-1000"
                    style={{ opacity: stressLevel * 0.3 }}
                />

                {/* Stress Vignette */}
                <div
                    className="absolute inset-0 transition-opacity duration-1000 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.1)] md:shadow-[inset_0_0_300px_rgba(0,0,0,0.1)]"
                    style={{ opacity: stressLevel, boxShadow: `inset 0 0 ${100 + stressLevel * 200}px rgba(190, 18, 60, ${0.1 * stressLevel})` }}
                />
            </div>

            <GameHeader
                day={currentPhase.day}
                stats={state.stats}
                onExit={onExit}
                statLabels={statLabels}
            />

            {/* NOTIFICATION TOAST */}
            {notification && (
                <div className="absolute top-20 left-0 right-0 z-40 animate-in slide-in-from-top-4 fade-in duration-500 pointer-events-none flex justify-center px-4">
                    <div className="bg-slate-900/90 backdrop-blur text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-black uppercase tracking-widest border border-white/10">
                        <span className="text-indigo-400">⚡</span>
                        <span>{notification}</span>
                    </div>
                </div>
            )}

            {/* MAIN CONTENT */}
            <main
                ref={mainContentRef}
                className="flex-1 overflow-y-auto w-full max-w-lg mx-auto relative overscroll-contain no-scrollbar z-10"
            >
                <GameRenderer currentPhase={currentPhase} />
            </main>

            {/* FOOTER: Fixed Actions */}
            <footer className="shrink-0 bg-white/80 backdrop-blur-2xl border-t border-white/20 p-4 pb-8 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="max-w-lg mx-auto w-full flex flex-col gap-3">
                    {currentPhase.choices.map((choice) => (
                        <Button
                            key={choice.id}
                            onClick={() => handleChoice(choice)}
                            disabled={choice.variant === 'crossed-out'}
                            variant={choice.variant === 'crossed-out' ? "ghost" : "default"}
                            className={cn(
                                "w-full min-h-[64px] h-auto py-4 px-6 justify-between text-left transition-all active:scale-[0.98] group rounded-2xl relative overflow-hidden",
                                "whitespace-normal break-words items-center",
                                choice.variant === 'crossed-out'
                                    ? "bg-slate-50 border-2 border-dashed border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                                    : "bg-white border-2 border-slate-200 text-slate-900 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 active:translate-y-[2px] active:shadow-none"
                            )}
                        >
                            <span className={cn(
                                "font-black leading-tight tracking-tight flex-1 mr-4 uppercase",
                                getButtonTextSize(choice.text.length)
                            )}>
                                {choice.text}
                            </span>

                            {choice.variant === 'crossed-out' ? (
                                <span className="text-xl opacity-50 grayscale shrink-0">🔒</span>
                            ) : (
                                <ArrowRight className="w-5 h-5 text-indigo-500 shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            )}

                            {/* Subtle hover background highlight */}
                            <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors pointer-events-none" />
                        </Button>
                    ))}
                </div>
            </footer>

        </div>
    );
}
