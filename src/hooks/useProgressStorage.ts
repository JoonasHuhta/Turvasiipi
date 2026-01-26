import { useState, useEffect } from 'react';
import { UserProgress } from '@/types/domain';

const STORAGE_KEY = 'suojasiipi_progress';

const DEFAULT_PROGRESS: UserProgress = {
    completedModuleIds: [],
    earnedBadgeIds: [],
    points: 0,
    simulationScores: {},
    streak: 0,
    lastVisit: null,
};

export const useProgressStorage = () => {
    const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from Local Storage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setProgress(prev => ({
                    ...prev,
                    ...parsed,
                    simulationScores: parsed.simulationScores || {}
                }));
            } catch (e) {
                console.error("Failed to parse progress", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to Local Storage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        }
    }, [progress, isLoaded]);

    return { progress, setProgress, isLoaded };
};
