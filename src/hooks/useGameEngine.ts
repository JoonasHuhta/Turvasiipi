import { useState, useEffect, useRef } from "react";
import { Phase, GameState, INITIAL_STATS, Choice, Profession } from "@/lib/simulator/types";
import { useProgress } from "@/context/ProgressContext";
import { useLanguage } from "@/context/LanguageContext";

export function useGameEngine(
    scenario: Record<string, Phase>,
    initialPhaseId: string,
    profession: Profession
) {
    const { t } = useLanguage();
    const { completeModule, saveSimulationScore } = useProgress();

    const [state, setState] = useState<GameState>({
        currentPhaseId: initialPhaseId,
        profession: profession,
        stats: { ...INITIAL_STATS },
        logEntries: [],
        allies: [],
        history: [],
        isGameOver: false,
        scoreSaved: false
    });

    const [notification, setNotification] = useState<string | null>(null);
    const [changedStat, setChangedStat] = useState<string | null>(null);

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    // Calculate dynamic scoring on game end
    useEffect(() => {
        if (state.currentPhaseId.startsWith('END_') && !state.scoreSaved) {
            const moduleId = `sim_${state.profession}`;

            // Calculate Performance Score (0-100)
            const finalStats = state.stats;
            const performanceScore = Math.round(
                (finalStats.selfEsteem * 0.4) +
                (finalStats.hope * 0.4) +
                (finalStats.teamAcceptance * 0.2)
            );

            completeModule(moduleId);
            saveSimulationScore(moduleId, performanceScore);

            setState(prev => ({ ...prev, scoreSaved: true }));
        }
    }, [state.currentPhaseId, state.profession, completeModule, saveSimulationScore, state.stats, state.scoreSaved]);

    const handleChoice = (choice: Choice) => {
        // 0. Check for Crossed Out (Blocked) Choices
        if (choice.variant === 'crossed-out') {
            showNotification(choice.blockedReason || t('game.notifications.choice_blocked'));
            return;
        }

        // 1. Update Stats
        const newStats = { ...state.stats };
        let statChangedKey: string | null = null;

        if (choice.effect?.stats) {
            Object.keys(choice.effect.stats).forEach((key) => {
                const k = key as keyof typeof newStats;
                const val = choice.effect!.stats![k] || 0;
                if (val !== 0) {
                    newStats[k] = Math.max(0, Math.min(100, newStats[k] + val));
                    statChangedKey = k;
                }
            });
        }

        // Trigger animation if stat changed
        if (statChangedKey) {
            setChangedStat(statChangedKey);
            setTimeout(() => setChangedStat(null), 1000); // Reset after 1s
        }

        // 2. Add Allies
        const newAllies = [...state.allies];
        if (choice.effect?.addAlly && !newAllies.includes(choice.effect.addAlly)) {
            newAllies.push(choice.effect.addAlly);
            showNotification(`${t('game.notifications.ally_found')}: ${choice.effect.addAlly}`);
        }

        // 3. Log Entry
        const newLogEntries = [...state.logEntries];
        const currentPhase = scenario[state.currentPhaseId];

        if (choice.effect?.logNote && currentPhase) {
            newLogEntries.push({
                day: currentPhase.day,
                timestamp: currentPhase.time || '12:00',
                note: choice.effect.logNote
            });
            showNotification(t('game.notifications.log_documented'));
        }

        // 4. Update State
        setState(prev => ({
            ...prev,
            stats: newStats,
            allies: newAllies,
            logEntries: newLogEntries,
            currentPhaseId: choice.nextPhaseId,
            history: [...prev.history, state.currentPhaseId]
        }));
    };

    return {
        state,
        notification,
        changedStat,
        handleChoice,
        currentPhase: scenario[state.currentPhaseId],
        isEnding: state.currentPhaseId.startsWith('END_')
    };
}
