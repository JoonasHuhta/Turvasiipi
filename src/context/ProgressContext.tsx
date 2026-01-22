"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { EXPERT_LEVELS } from '@/lib/gamification-data';

// --- TYPES ---

export type CategoryId = 'CORE' | 'AWARENESS' | 'TOOLS' | 'SUPPORT' | 'INTERACTIVE' | 'ORGANIZATION' | 'LEARNING' | 'SPECIAL';

export interface Module {
    id: string;
    categoryId: CategoryId;
    title: string;
    points: number;
    path: string;
}

export interface Badge {
    id: string;
    title: string;
    icon: string;
    description: string;
    moduleId?: string; // If linked to a specific module
    isMastery?: boolean;
}

export interface UserProgress {
    completedModuleIds: string[];
    earnedBadgeIds: string[];
    points: number;
    simulationScores: Record<string, number>; // moduleId -> score (0-100)
    streak: number;
    lastVisit: string | null;
}

interface ProgressContextType {
    progress: UserProgress;
    completeModule: (moduleId: string) => void;
    saveSimulationScore: (moduleId: string, score: number) => void;
    awardBadge: (badgeId: string) => void;
    addPoints: (amount: number) => void;
    getLevel: () => number;
    getExpertiseLevel: () => { totalScore: number; level: any; subLevel: any };
    getProgressPercentage: () => number;
    isModuleCompleted: (moduleId: string) => boolean;
    getCertificationProgress: () => { completed: number; total: number; percentage: number };
}

// --- CONFIGURATION ---

import { trainingHubData } from '@/data/training-hub';

// --- CONFIGURATION ---

// Static modules that are NOT part of the new Valmennus hub structure
const CORE_MODULES: Module[] = [
    // CORE
    { id: 'landing', categoryId: 'CORE', title: 'Etusivu', points: 50, path: '/' },
    { id: 'sim_nurse', categoryId: 'CORE', title: 'Koe: Hoitaja', points: 200, path: '/simulaatio/hoitaja' },
    { id: 'sim_teacher', categoryId: 'CORE', title: 'Koe: Opettaja', points: 200, path: '/simulaatio/opettaja' },
    { id: 'sim_manager', categoryId: 'CORE', title: 'Koe: Esimies', points: 200, path: '/simulaatio/esimies' },
    { id: 'sim_youth', categoryId: 'CORE', title: 'Koe: Nuoret', points: 200, path: '/simulaatio/nuoret' },
    { id: 'sim_neuro', categoryId: 'CORE', title: 'Koe: Neuromoninaisuus', points: 200, path: '/simulaatio/neuro' },

    // AWARENESS
    { id: 'tietovisa', categoryId: 'AWARENESS', title: 'Tietovisa', points: 150, path: '/faktapankki' },
    { id: 'cost_of_silence_info', categoryId: 'AWARENESS', title: 'Hiljaisuuden hinta (Teoria)', points: 100, path: '/faktapankki' },
    { id: 'cost_simulation_game', categoryId: 'AWARENESS', title: 'Hiljaisuuden hinta (Simulaatio)', points: 200, path: '/faktapankki' },
    { id: 'quiz_risks', categoryId: 'AWARENESS', title: 'Tunnista Riskit', points: 100, path: '/quiz' },
    { id: 'feeling_quiz', categoryId: 'AWARENESS', title: 'Uhrin Tuntemukset', points: 100, path: '/feeling-quiz' },
    { id: 'neuro_info', categoryId: 'AWARENESS', title: 'Neuromoninaisuus-info', points: 75, path: '/neuromoninaisuus' },
    { id: 'youth_info', categoryId: 'AWARENESS', title: 'Nuoret-info', points: 75, path: '/nuoret' },
    { id: 'impact_profile', categoryId: 'AWARENESS', title: 'Vaikutusprofiili', points: 150, path: '/vaikutusprofiili' },
    { id: 'literacy_test', categoryId: 'AWARENESS', title: 'Kiusaamisen Lukutaito', points: 150, path: '/lukutaito-testi' },
    { id: 'empathy_test', categoryId: 'AWARENESS', title: 'Empatia-Spektri', points: 150, path: '/empatia-testi' },

    // TOOLS
    { id: 'timeline', categoryId: 'TOOLS', title: 'Aikajana', points: 100, path: '/timeline' },
    { id: 'report', categoryId: 'TOOLS', title: 'Raporttigeneraattori', points: 150, path: '/raportti' },
    { id: 'templates', categoryId: 'TOOLS', title: 'Viestipohjat', points: 50, path: '/viestipohjat' },
    { id: 'vault', categoryId: 'TOOLS', title: 'Todistepankki', points: 100, path: '/todistepankki' },
    { id: 'rewrite', categoryId: 'TOOLS', title: 'Sanavaihto', points: 75, path: '/sanavaihto' },
    { id: 'neuro_feedback', categoryId: 'TOOLS', title: 'Neuro-Feedback', points: 150, path: '/neuro-feedback' },

    // SUPPORT
    { id: 'stories', categoryId: 'SUPPORT', title: 'Tarinat', points: 50, path: '/tarinat' },
    { id: 'support_list', categoryId: 'SUPPORT', title: 'Tukipalvelut', points: 50, path: '/tuki' },
    { id: 'community', categoryId: 'SUPPORT', title: 'Yhteisö', points: 50, path: '/yhteiso' },
    { id: 'ai_support', categoryId: 'SUPPORT', title: 'AI-Tukihenkilö', points: 100, path: '/ai-tuki' },
];

// Generate Valmennus modules from the SSOT (training-hub.ts)
const VALMENNUS_MODULES: Module[] = trainingHubData.flatMap(category =>
    category.modules.map(module => ({
        id: module.id,
        categoryId: 'LEARNING', // All training hub items fall under LEARNING/VALMENNUS context
        title: module.title,
        points: module.points || 0,
        path: `/valmennus/${category.id}/${module.id}`
    }))
);

export const MODULES: Module[] = [...CORE_MODULES, ...VALMENNUS_MODULES];

export const BADGES: Badge[] = [
    { id: 'welcome', title: 'Muna', icon: '🥚', description: 'Loit ensimmäisen lokimerkinnän tai aloitit matkan.' },
    { id: 'nurse_complete', title: 'Hoitajan Silmin', icon: '🩺', description: 'Suoritit hoitajan kokemuksen.' },
    { id: 'teacher_complete', title: 'Opettajan Taakka', icon: '📚', description: 'Suoritit opettajan kokemuksen.' },
    { id: 'manager_complete', title: 'Asiantuntijan Kriisi', icon: '💼', description: 'Suoritit esimiehen kokemuksen.' },
    { id: 'youth_complete', title: 'Nuoren Kokemus', icon: '🌱', description: 'Suoritit nuorten kokemuksen.' },
    { id: 'neuro_complete', title: 'Neuromoninaisuuden Ymmärrys', icon: '🧩', description: 'Suoritit neuromoninaisuus-kokemuksen.' },
    { id: 'empathy_master', title: 'Rohkeus', icon: '🪶', description: 'Suoritit kaikki simulaattorit.', isMastery: true },
    { id: 'legal_expert', title: 'Lakitiedon Tuntija', icon: '🎓', description: 'Läpäisit tietovisan vähintään 80% oikein.' },
    { id: 'risk_finder', title: 'Riskin Tunnistaja', icon: '🔍', description: 'Suoritit työyhteisön riskikyselyn.' },
    { id: 'valid_feelings', title: 'Tunteeni Ovat Oikeutettuja', icon: '💚', description: 'Suoritit tunnetestin ja sait validoinnin.' },
    { id: 'doc_start', title: 'Dokumentoinnin Aloittaja', icon: '📝', description: 'Teit ensimmäisen aikajanamerkinnän.' },
    { id: 'knowledge_hunger', title: 'Tiedon Janoisuus', icon: '📖', description: 'Luit kaikki 12 taktiikkaa.' },
    { id: 'self_awareness', title: 'Itsetuntemus', icon: '🔍', description: 'Teit kaikki itsearvioinnit.' },
    { id: 'empathy_profile_known', title: 'Itsetuntemus', icon: '🧬', description: 'Tunnistit oman empatiaprofiilisi.' },
    { id: 'voice_found', title: 'Äänen Löytäminen', icon: '💬', description: 'Jaoit ensimmäisen tarinasi.' },
    { id: 'persistence_7', title: 'Sinnikkyys', icon: '⏰', description: 'Käytit sovellusta 7 päivänä peräkkäin.' },
    { id: 'analyzer', title: 'Analysoija', icon: '📊', description: 'Loit ensimmäisen PDF-raportin.' },
    { id: 'trainee_path', title: 'Valmennettava', icon: '🌟', description: 'Suoritit koko valmennuspolun.' },
    { id: 'turvasiipi_master', title: 'Turvasiipi', icon: '🦅', description: 'Saavutit korkeimman tason.', isMastery: true },
    { id: 'night_owl', title: 'Yökyöpeli', icon: '🦉', description: 'Käytit sovellusta yöaikaan.' },
    { id: 'mallard', title: 'Sinisorsa', icon: '🦆', description: 'Palasit sovellukseen useita kertoja päivässä.' },
];

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [progress, setProgress] = useState<UserProgress>({
        completedModuleIds: [],
        earnedBadgeIds: [],
        points: 0,
        simulationScores: {},
        streak: 0,
        lastVisit: null,
    });

    // Load from Local Storage
    useEffect(() => {
        const saved = localStorage.getItem('suojasiipi_progress');
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
    }, []);

    // Save to Local Storage
    useEffect(() => {
        localStorage.setItem('suojasiipi_progress', JSON.stringify(progress));
    }, [progress]);

    const completeModule = (moduleId: string) => {
        if (progress.completedModuleIds.includes(moduleId)) return;

        const module = MODULES.find(m => m.id === moduleId);
        if (!module) return;

        setProgress(prev => ({
            ...prev,
            completedModuleIds: [...prev.completedModuleIds, moduleId],
            points: prev.points + module.points
        }));

        // Handle specific badges based on module completion
        if (moduleId === 'landing') awardBadge('welcome');
        if (moduleId === 'sim_nurse') awardBadge('nurse_complete');
        if (moduleId === 'sim_teacher') awardBadge('teacher_complete');
        if (moduleId === 'sim_manager') awardBadge('manager_complete');
        if (moduleId === 'sim_youth') awardBadge('youth_complete');
        if (moduleId === 'sim_neuro') awardBadge('neuro_complete');
        if (moduleId === 'quiz_risks') awardBadge('risk_finder');
        if (moduleId === 'feeling_quiz') awardBadge('valid_feelings');
        if (moduleId === 'empathy_test') awardBadge('empathy_profile_known');

        // Check for mastery badges
        checkMasteryBadges();
    };

    const awardBadge = (badgeId: string) => {
        if (progress.earnedBadgeIds.includes(badgeId)) return;
        setProgress(prev => ({
            ...prev,
            earnedBadgeIds: [...prev.earnedBadgeIds, badgeId]
        }));
    };

    const saveSimulationScore = (moduleId: string, score: number) => {
        setProgress(prev => {
            const currentScores = prev.simulationScores || {};
            const currentScore = currentScores[moduleId] || 0;
            // Only update if the new score is higher
            if (score <= currentScore) return prev;

            return {
                ...prev,
                simulationScores: {
                    ...currentScores,
                    [moduleId]: score
                }
            };
        });
    };

    const addPoints = (amount: number) => {
        setProgress(prev => ({
            ...prev,
            points: prev.points + amount
        }));
    };

    const checkMasteryBadges = () => {
        // Use a functional update to get current state
        setProgress(prev => {
            const newEarnedBadges = [...prev.earnedBadgeIds];
            let changed = false;

            const simBadges = ['nurse_complete', 'teacher_complete', 'manager_complete', 'youth_complete', 'neuro_complete'];
            if (simBadges.every(id => newEarnedBadges.includes(id)) && !newEarnedBadges.includes('empathy_master')) {
                newEarnedBadges.push('empathy_master');
                changed = true;
            }

            // Certification badge check
            const certModules = [
                'basic', // Kiusaamisen Lukutaito
                'empathy', // Peilisolu-Pelastus
                'bystander', // Bystander-Herättäjä
                'association_basics', // Yhdistystoiminnan Varjopuolet
                'pluralistic_ignorance',
                'bystander_effect'
            ];

            const isCertComplete = certModules.every(id => prev.completedModuleIds.includes(id));
            if (isCertComplete && !newEarnedBadges.includes('bullying_literacy_cert')) {
                newEarnedBadges.push('bullying_literacy_cert');
                changed = true;
            }

            if (changed) return { ...prev, earnedBadgeIds: newEarnedBadges };
            return prev;
        });
    };

    const getLevel = () => {
        const { points } = progress;
        if (points < 100) return 1;
        if (points < 300) return 2;
        if (points < 600) return 3;
        if (points < 1000) return 4;
        if (points < 1500) return 5;
        if (points < 2500) return 6;
        return 7;
    };

    const getExpertiseLevel = () => {
        const { points } = progress;
        const level = EXPERT_LEVELS.find(l => points >= l.minPoints && points <= l.maxPoints) || EXPERT_LEVELS[EXPERT_LEVELS.length - 1];
        const subLevel = level.subLevels[0]; // Simplified as we now use points for main level

        return { totalScore: points, level, subLevel };
    };

    const getProgressPercentage = () => {
        const total = MODULES.length;
        const completed = progress.completedModuleIds.length;
        return Math.round((completed / total) * 100);
    };

    const isModuleCompleted = (moduleId: string) => progress.completedModuleIds.includes(moduleId);

    const getCertificationProgress = () => {
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
    };

    return (
        <ProgressContext.Provider value={{
            progress,
            completeModule,
            saveSimulationScore,
            awardBadge,
            addPoints,
            getLevel,
            getExpertiseLevel,
            getProgressPercentage,
            isModuleCompleted,
            getCertificationProgress
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
