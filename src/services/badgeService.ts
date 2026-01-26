import { UserProgress } from '@/types/domain';

export const checkAutomaticBadges = (
    moduleId: string,
    currentBadges: string[]
): string | null => {
    // Return badge ID to award, or null if none
    if (moduleId === 'landing') return 'welcome';
    if (moduleId === 'sim_nurse') return 'nurse_complete';
    if (moduleId === 'sim_teacher') return 'teacher_complete';
    if (moduleId === 'sim_manager') return 'manager_complete';
    if (moduleId === 'sim_youth') return 'youth_complete';
    if (moduleId === 'sim_neuro') return 'neuro_complete';
    if (moduleId === 'quiz_risks') return 'risk_finder';
    if (moduleId === 'feeling_quiz') return 'valid_feelings';
    if (moduleId === 'empathy_test') return 'empathy_profile_known';
    return null;
};

export const checkMasteryBadges = (progress: UserProgress): string[] => {
    const newEarnedBadges: string[] = [];
    const earnedBadgeIds = progress.earnedBadgeIds;

    // 1. Empathy Master (Simulations)
    const simBadges = ['nurse_complete', 'teacher_complete', 'manager_complete', 'youth_complete', 'neuro_complete'];
    const hasAllSimBadges = simBadges.every(id => earnedBadgeIds.includes(id));

    if (hasAllSimBadges && !earnedBadgeIds.includes('empathy_master')) {
        newEarnedBadges.push('empathy_master');
    }

    // 2. Certification (Modules)
    const certModules = [
        'basic', // Kiusaamisen Lukutaito (NOTE: check ID match with MODULES)
        'empathy', // Peilisolu-Pelastus
        'bystander', // Bystander-Herättäjä
        'association_basics', // Yhdistystoiminnan Varjopuolet
        'pluralistic_ignorance',
        'bystander_effect'
    ];

    // Note: In original code, these IDs might need verification against real module IDs.
    // Based on original ProgressContext logic:
    const isCertComplete = certModules.every(id => progress.completedModuleIds.includes(id));

    if (isCertComplete && !earnedBadgeIds.includes('bullying_literacy_cert')) {
        newEarnedBadges.push('bullying_literacy_cert');
    }

    return newEarnedBadges;
};
