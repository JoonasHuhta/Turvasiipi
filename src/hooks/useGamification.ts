import { useCallback } from 'react';
import { UserProgress } from '@/types/domain';
import { MODULES, EXPERT_LEVELS } from '@/lib/gamification-data';
import { checkAutomaticBadges, checkMasteryBadges } from '@/services/badgeService';

interface UseGamificationProps {
    progress: UserProgress;
    setProgress: (update: (prev: UserProgress) => UserProgress) => void;
}

export function useGamification({ progress, setProgress }: UseGamificationProps) {

    const completeModule = useCallback((moduleId: string) => {
        if (progress.completedModuleIds.includes(moduleId)) return;

        const module = MODULES.find(m => m.id === moduleId);
        if (!module) return;

        // Calculate new state
        const newCompleted = [...progress.completedModuleIds, moduleId];
        const newPoints = progress.points + module.points;
        let newEarnedBadges = [...progress.earnedBadgeIds];

        // 1. Check for automatic single badges
        const autoBadge = checkAutomaticBadges(moduleId, newEarnedBadges);
        if (autoBadge && !newEarnedBadges.includes(autoBadge)) {
            newEarnedBadges.push(autoBadge);
        }

        // 2. Check for mastery badges (needs latest progress state simulation)
        const tempProgressState = { ...progress, completedModuleIds: newCompleted, earnedBadgeIds: newEarnedBadges };
        const masteryBadges = checkMasteryBadges(tempProgressState);

        masteryBadges.forEach(badgeId => {
            if (!newEarnedBadges.includes(badgeId)) {
                newEarnedBadges.push(badgeId);
            }
        });

        setProgress(prev => ({
            ...prev,
            completedModuleIds: newCompleted,
            points: newPoints,
            earnedBadgeIds: newEarnedBadges
        }));
    }, [progress, setProgress]);

    const awardBadge = useCallback((badgeId: string) => {
        if (progress.earnedBadgeIds.includes(badgeId)) return;
        setProgress(prev => ({
            ...prev,
            earnedBadgeIds: [...prev.earnedBadgeIds, badgeId]
        }));
    }, [progress, setProgress]);

    const saveSimulationScore = useCallback((moduleId: string, score: number) => {
        setProgress(prev => {
            const currentScores = prev.simulationScores || {};
            const currentScore = currentScores[moduleId] || 0;
            if (score <= currentScore) return prev;

            return {
                ...prev,
                simulationScores: {
                    ...currentScores,
                    [moduleId]: score
                }
            };
        });
    }, [setProgress]);

    const addPoints = useCallback((amount: number) => {
        setProgress(prev => ({
            ...prev,
            points: prev.points + amount
        }));
    }, [setProgress]);

    // Read-only helpers
    const getLevel = useCallback(() => {
        const { points } = progress;
        if (points < 100) return 1;
        if (points < 300) return 2;
        if (points < 600) return 3;
        if (points < 1000) return 4;
        if (points < 1500) return 5;
        if (points < 2500) return 6;
        return 7;
    }, [progress.points]);

    const getExpertiseLevel = useCallback(() => {
        const { points } = progress;
        const level = EXPERT_LEVELS.find(l => points >= l.minPoints && points <= l.maxPoints) || EXPERT_LEVELS[EXPERT_LEVELS.length - 1];
        const subLevel = level.subLevels[0]; // Simplified for now, as in original context

        return { totalScore: points, level, subLevel };
    }, [progress.points]);

    const getProgressPercentage = useCallback(() => {
        return Math.round((progress.completedModuleIds.length / MODULES.length) * 100);
    }, [progress.completedModuleIds]);

    const isModuleCompleted = useCallback((moduleId: string) => {
        return progress.completedModuleIds.includes(moduleId);
    }, [progress.completedModuleIds]);

    const getCertificationProgress = useCallback(() => {
        const certModules = [
            'valmennus_easy',
            'empathy_game',
            'valmennus_bystander_sim',
            'valmennus_leisure_assoc',
            'pluralistic_ignorance',
            'bystander_effect'
        ];
        const completedCount = certModules.filter(id => progress.completedModuleIds.includes(id)).length;
        const total = certModules.length;
        return {
            completed: completedCount,
            total,
            percentage: Math.round((completedCount / total) * 100)
        };
    }, [progress.completedModuleIds]);

    return {
        completeModule,
        awardBadge,
        saveSimulationScore,
        addPoints,
        getLevel,
        getExpertiseLevel,
        getProgressPercentage,
        isModuleCompleted,
        getCertificationProgress
    };
}
