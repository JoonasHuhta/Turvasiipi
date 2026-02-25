import { UserProgress } from '@/types/domain';

/** Returns a single badge ID to award when a module is first completed, or null. */
export const checkAutomaticBadges = (
    moduleId: string,
    currentBadges: string[]
): string | null => {
    // Legacy professional simulators
    if (moduleId === 'landing') return 'welcome';
    if (moduleId === 'sim_nurse') return 'nurse_complete';
    if (moduleId === 'sim_teacher') return 'teacher_complete';
    if (moduleId === 'sim_manager') return 'manager_complete';
    if (moduleId === 'sim_youth') return 'youth_complete';
    if (moduleId === 'sim_neuro') return 'neuro_complete';

    // Awareness
    if (moduleId === 'quiz_risks') return 'risk_finder';
    if (moduleId === 'feeling_quiz') return 'valid_feelings';
    if (moduleId === 'empathy_test') return 'empathy_profile_known';

    // Kiusaamissimulaattorit — first one ever
    const kiusaamisSims = ['sim_isolation', 'sim_micromanage', 'sim_bystander_dlg', 'sim_biff_email', 'sim_perf_trap', 'sim_info_shadow'];
    if (kiusaamisSims.includes(moduleId) && !currentBadges.includes('bully_sim_complete')) {
        return 'bully_sim_complete';
    }

    // Bystander treeni
    if (moduleId === 'sim_bystander_full') return 'bystander_complete';

    // Tekijä-treeni — first scenario
    const perpetratorSims = ['sim_perpetrator_s1', 'sim_perpetrator_s2', 'sim_perpetrator_s3', 'sim_perpetrator_s4', 'sim_perpetrator_s5'];
    if (perpetratorSims.includes(moduleId) && !currentBadges.includes('perpetrator_started')) {
        return 'perpetrator_started';
    }

    // Tools
    if (moduleId === 'timeline') return 'doc_start';
    if (moduleId === 'report') return 'analyzer';

    return null;
};

/** Returns a list of mastery badge IDs earned based on the full progress state. */
export const checkMasteryBadges = (progress: UserProgress): string[] => {
    const newEarnedBadges: string[] = [];
    const earned = progress.earnedBadgeIds;
    const completed = progress.completedModuleIds;

    const maybeAdd = (id: string) => {
        if (!earned.includes(id) && !newEarnedBadges.includes(id)) {
            newEarnedBadges.push(id);
        }
    };

    // first_sim — any simulator completed
    const allSims = [
        'sim_nurse', 'sim_teacher', 'sim_manager', 'sim_youth', 'sim_neuro',
        'sim_isolation', 'sim_micromanage', 'sim_bystander_dlg', 'sim_biff_email',
        'sim_perf_trap', 'sim_info_shadow', 'sim_bystander_full',
        'sim_perpetrator_s1', 'sim_perpetrator_s2', 'sim_perpetrator_s3',
        'sim_perpetrator_s4', 'sim_perpetrator_s5',
    ];
    if (allSims.some(id => completed.includes(id))) {
        maybeAdd('first_sim');
    }

    // empathy_master — all legacy professional simulators
    const legacySims = ['sim_nurse', 'sim_teacher', 'sim_manager', 'sim_youth', 'sim_neuro'];
    if (legacySims.every(id => completed.includes(id))) {
        maybeAdd('empathy_master');
    }

    // bully_sim_master — all 4 dialogue-tree kiusaamissimulaattorit
    const kiusaamisSims = ['sim_isolation', 'sim_micromanage', 'sim_bystander_dlg', 'sim_biff_email'];
    if (kiusaamisSims.every(id => completed.includes(id))) {
        maybeAdd('bully_sim_master');
    }

    // perpetrator_master — all 5 tekijä-skenaariot
    const perpetratorSims = ['sim_perpetrator_s1', 'sim_perpetrator_s2', 'sim_perpetrator_s3', 'sim_perpetrator_s4', 'sim_perpetrator_s5'];
    if (perpetratorSims.every(id => completed.includes(id))) {
        maybeAdd('perpetrator_master');
    }

    // tool_user — used 3 different tools
    const toolModules = ['timeline', 'report', 'templates', 'vault', 'rewrite', 'neuro_feedback'];
    const toolsUsed = toolModules.filter(id => completed.includes(id)).length;
    if (toolsUsed >= 3) {
        maybeAdd('tool_user');
    }

    // cert_complete — full certification track
    const certModules = [
        'valmennus_easy',
        'empathy_game',
        'valmennus_bystander_sim',
        'valmennus_leisure_assoc',
        'pluralistic_ignorance',
        'bystander_effect',
    ];
    if (certModules.every(id => completed.includes(id))) {
        maybeAdd('cert_complete');
    }

    // turvasiipi_master — level 7 (4001+ pts)
    if (progress.points >= 4001) {
        maybeAdd('turvasiipi_master');
    }

    return newEarnedBadges;
};
