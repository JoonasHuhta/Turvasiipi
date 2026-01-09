"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

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
    streak: number;
    lastVisit: string | null;
}

interface ProgressContextType {
    progress: UserProgress;
    completeModule: (moduleId: string) => void;
    awardBadge: (badgeId: string) => void;
    addPoints: (amount: number) => void;
    getLevel: () => number;
    getProgressPercentage: () => number;
    isModuleCompleted: (moduleId: string) => boolean;
}

// --- CONFIGURATION ---

export const MODULES: Module[] = [
    // CORE
    { id: 'landing', categoryId: 'CORE', title: 'Etusivu', points: 50, path: '/' },
    { id: 'sim_nurse', categoryId: 'CORE', title: 'Koe: Hoitaja', points: 200, path: '/simulaatio/hoitaja' },
    { id: 'sim_teacher', categoryId: 'CORE', title: 'Koe: Opettaja', points: 200, path: '/simulaatio/opettaja' },
    { id: 'sim_manager', categoryId: 'CORE', title: 'Koe: Esimies', points: 200, path: '/simulaatio/esimies' },
    { id: 'sim_youth', categoryId: 'CORE', title: 'Koe: Nuoret', points: 200, path: '/simulaatio/nuoret' },
    { id: 'sim_neuro', categoryId: 'CORE', title: 'Koe: Neuromoninaisuus', points: 200, path: '/simulaatio/neuro' },

    // AWARENESS
    { id: 'tietovisa', categoryId: 'AWARENESS', title: 'Tietovisa', points: 150, path: '/tietovisa' },
    { id: 'quiz_risks', categoryId: 'AWARENESS', title: 'Tunnista Riskit', points: 100, path: '/quiz' },
    { id: 'feeling_quiz', categoryId: 'AWARENESS', title: 'Uhrin Tuntemukset', points: 100, path: '/feeling-quiz' },
    { id: 'neuro_info', categoryId: 'AWARENESS', title: 'Neuromoninaisuus-info', points: 75, path: '/neuromoninaisuus' },
    { id: 'youth_info', categoryId: 'AWARENESS', title: 'Nuoret-info', points: 75, path: '/nuoret' },
    { id: 'empathy_test', categoryId: 'AWARENESS', title: 'Empatia-Spektri Testi', points: 150, path: '/empatia-testi' },
    { id: 'literacy_test', categoryId: 'AWARENESS', title: 'Kiusaamisen Lukutaito', points: 150, path: '/lukutaito-testi' },

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

    // INTERACTIVE
    { id: 'empathy_game', categoryId: 'INTERACTIVE', title: 'Peilisolu-Pelastus', points: 200, path: '/empatia-peli' },
    { id: 'bystander_game', categoryId: 'INTERACTIVE', title: 'Bystander-Herättäjä', points: 200, path: '/bystander-peli' },
    { id: 'somatic', categoryId: 'INTERACTIVE', title: 'Somaattinen Vapautus', points: 150, path: '/somaattinen' },
    { id: 'art_therapy', categoryId: 'INTERACTIVE', title: 'Taideterapeuttinen Arkisto', points: 150, path: '/taide' },

    // ORGANIZATION
    { id: 'culture_meter', categoryId: 'ORGANIZATION', title: 'Kulttuuri-Lämpömittari', points: 100, path: '/lampomittari' },
    { id: 'dna_analysis', categoryId: 'ORGANIZATION', title: 'Kiusaamisen DNA', points: 200, path: '/dna-analyysi' },
    { id: 'empathy_audit', categoryId: 'ORGANIZATION', title: 'Empatia-Audit', points: 150, path: '/empatia-audit' },

    // LEARNING
    { id: 'neuroscience', categoryId: 'LEARNING', title: 'Neurotiede Selittää', points: 100, path: '/neurotiede' },
    { id: 'lessons', categoryId: 'LEARNING', title: 'Lukutaidon Oppitunnit', points: 200, path: '/oppitunnit' },
    { id: 'valmennus_easy', categoryId: 'LEARNING', title: 'Valmennus: Helppo', points: 100, path: '/valmennus' },
    { id: 'valmennus_medium', categoryId: 'LEARNING', title: 'Valmennus: Keskitaso', points: 150, path: '/valmennus' },
    { id: 'valmennus_master', categoryId: 'LEARNING', title: 'Valmennus: Mestari', points: 200, path: '/valmennus' },
    { id: 'valmennus_return_rtw', categoryId: 'LEARNING', title: '12 Viikon Paluupolku', points: 300, path: '/valmennus' },
    { id: 'valmennus_leisure_assoc', categoryId: 'LEARNING', title: 'Yhdistystoiminnan Varjopuolet', points: 200, path: '/valmennus' },
    { id: 'valmennus_bystander_sim', categoryId: 'LEARNING', title: 'Bystander-Herättäjä', points: 250, path: '/valmennus' },
    { id: 'pluralistic_ignorance', categoryId: 'LEARNING', title: 'Pluralistinen Ignoranssi', points: 100, path: '/valmennus' },
    { id: 'bystander_effect', categoryId: 'LEARNING', title: 'Bystander-efekti Syväluotaus', points: 100, path: '/valmennus' },
    { id: 'return_path', categoryId: 'LEARNING', title: 'Paluupolku', points: 300, path: '/paluupolku' },

    // SPECIAL
    { id: 'theater', categoryId: 'SPECIAL', title: 'Etnoteatteri', points: 100, path: '/teatteri' },
    { id: 'silent_disco', categoryId: 'SPECIAL', title: 'Silent Disco Terapia', points: 100, path: '/silent-disco' },
    { id: 'reverse_mentoring', categoryId: 'SPECIAL', title: 'Reverse Mentoring', points: 100, path: '/reverse-mentoring' },
];

export const BADGES: Badge[] = [
    { id: 'welcome', title: 'Tervetuloa Turvasiipeen', icon: '🏠', description: 'Kävit ensimmäistä kertaa etusivulla.' },
    { id: 'nurse_complete', title: 'Hoitajan Silmin', icon: '🩺', description: 'Suoritit hoitajan kokemuksen.' },
    { id: 'teacher_complete', title: 'Opettajan Taakka', icon: '📚', description: 'Suoritit opettajan kokemuksen.' },
    { id: 'manager_complete', title: 'Asiantuntijan Kriisi', icon: '💼', description: 'Suoritit esimiehen kokemuksen.' },
    { id: 'youth_complete', title: 'Nuoren Kokemus', icon: '🌱', description: 'Suoritit nuorten kokemuksen.' },
    { id: 'neuro_complete', title: 'Neuromoninaisuuden Ymmärrys', icon: '🧩', description: 'Suoritit neuromoninaisuus-kokemuksen.' },
    { id: 'empathy_master', title: 'Empatian Mestari', icon: '⭐', description: 'Suoritit kaikki 5 kokemusta.', isMastery: true },
    { id: 'legal_expert', title: 'Lakitiedon Tuntija', icon: '🎓', description: 'Läpäisit tietovisan vähintään 80% oikein.' },
    { id: 'risk_finder', title: 'Riskin Tunnistaja', icon: '🔍', description: 'Suoritit työyhteisön riskikyselyn.' },
    { id: 'valid_feelings', title: 'Tunteeni Ovat Oikeutettuja', icon: '💚', description: 'Suoritit tunnetestin ja sait validoinnin.' },
    { id: 'doc_start', title: 'Dokumentoinnin Aloittaja', icon: '📝', description: 'Teit ensimmäisen aikajanamerkinnän.' },
    { id: 'training_easy', title: 'Tunnistamisen Alkeet', icon: '⚡', description: 'Suoritit Helppo-tason valmennuksen.' },
    { id: 'training_medium', title: 'Tunnistamisen Edistynyt', icon: '🔥', description: 'Suoritit Keskitaso-valmennuksen.' },
    { id: 'training_master', title: 'Tunnistamisen Mestari', icon: '🏆', description: 'Suoritit Mestari-tason valmennuksen.' },
    { id: 'training_rtw', title: 'Työhönpaluun Arkkitehti', icon: '🏗️', description: 'Rakensit kattavan paluusuunnitelman työhön.' },
    { id: 'leisure_hero', title: 'Harrastuksen Turvamies', icon: '🛡️', description: 'Suojelit harrastusyhdistyksen psykologista turvallisuutta.' },
    { id: 'bystander_hero', title: 'Bystander-Sankari', icon: '🤝', description: 'Olet aktiivinen todistaja ja murtat bystander-efektin.' },
    { id: 'literacy_master', title: 'Lukutaidon Mestari', icon: '📖', description: 'Sait vähintään 85% oikein lukutaito-testissä.' },
    { id: 'empathy_profile_known', title: 'Empatiaprofiili Tunnettu', icon: '🧠', description: 'Suoritit empatia-spektri testin.' },
];

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [progress, setProgress] = useState<UserProgress>({
        completedModuleIds: [],
        earnedBadgeIds: [],
        points: 0,
        streak: 0,
        lastVisit: null,
    });

    // Load from Local Storage
    useEffect(() => {
        const saved = localStorage.getItem('suojasiipi_progress');
        if (saved) {
            try {
                setProgress(JSON.parse(saved));
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

            if (changed) return { ...prev, earnedBadgeIds: newEarnedBadges };
            return prev;
        });
    };

    const getLevel = () => {
        const { points } = progress;
        if (points < 500) return 1;
        if (points < 2500) return 5;
        if (points < 7500) return 10;
        if (points < 15000) return 15;
        if (points < 30000) return 20;
        if (points < 50000) return 25;
        return 30;
    };

    const getProgressPercentage = () => {
        const total = MODULES.length;
        const completed = progress.completedModuleIds.length;
        return Math.round((completed / total) * 100);
    };

    const isModuleCompleted = (moduleId: string) => progress.completedModuleIds.includes(moduleId);

    return (
        <ProgressContext.Provider value={{ progress, completeModule, awardBadge, addPoints, getLevel, getProgressPercentage, isModuleCompleted }}>
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
