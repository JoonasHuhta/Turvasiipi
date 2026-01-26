"use client";

import React, { createContext, useContext } from 'react';
import { MODULES, BADGES, ExpertLevel, SubLevel } from '@/lib/gamification-data';
import { UserProgress, Badge, Module, CategoryId } from '@/types/domain';
import { useProgressStorage } from '@/hooks/useProgressStorage';
import { useGamification } from '@/hooks/useGamification';

// Re-export constants and types for backwards compatibility
export { MODULES, BADGES, type UserProgress, type Badge, type Module, type CategoryId };

interface ProgressContextType {
    progress: UserProgress;
    completeModule: (moduleId: string) => void;
    saveSimulationScore: (moduleId: string, score: number) => void;
    awardBadge: (badgeId: string) => void;
    addPoints: (amount: number) => void;
    getLevel: () => number;
    getExpertiseLevel: () => {
        totalScore: number;
        level: ExpertLevel;
        subLevel: SubLevel;
    };
    getProgressPercentage: () => number;
    isModuleCompleted: (moduleId: string) => boolean;
    getCertificationProgress: () => { completed: number; total: number; percentage: number };
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { progress, setProgress, isLoaded } = useProgressStorage();

    // Delegate business logic to the hook
    const gamification = useGamification({ progress, setProgress });

    // Don't render children until loaded to prevent hydration mismatch
    if (!isLoaded) return null;

    return (
        <ProgressContext.Provider value={{
            progress,
            ...gamification
        }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};
