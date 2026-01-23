import { NURSE_SCENARIO } from "./scenarios/nurse";
import { NURSE_SCENARIO_EN } from "./scenarios/nurse_en";
import { TEACHER_SCENARIO } from "./scenarios/teacher";
import { TEACHER_SCENARIO_EN } from "./scenarios/teacher_en";
import { IT_EXPERT_SCENARIO } from "./scenarios/it_expert";
import { IT_EXPERT_SCENARIO_EN } from "./scenarios/it_expert_en";
import { MANAGER_SCENARIO } from "./scenarios/manager";
import { MANAGER_SCENARIO_EN } from "./scenarios/manager_en";
import { NEURO_SCENARIO } from "./scenarios/neurodivergent";
import { NEURO_SCENARIO_EN } from "./scenarios/neurodivergent_en";
import { PERFORMANCE_TRAP_SCENARIO } from "./scenarios/performance_trap";
import { PERFORMANCE_TRAP_SCENARIO_EN } from "./scenarios/performance_trap_en";
import { INFORMATION_SHADOW_SCENARIO } from "./scenarios/information_shadow";
import { INFORMATION_SHADOW_SCENARIO_EN } from "./scenarios/information_shadow_en";
import { YOUTH_SCENARIO } from "./scenarios/youth";
import { YOUTH_SCENARIO_EN } from "./scenarios/youth_en";
import { Profession } from "./types";

// Explicit import for IT scenario which might be named differently in export


export interface SimulationConfig {
    id: string; // URL slug
    scenario: Scenario;
    profession: Profession;
    exitPath: string;
    statLabels?: {
        [key: string]: { label: string; description: string };
    };
}

const STAT_LABELS_FI = {
    physicalHealth: {
        label: 'Energia',
        description: 'Aloitus: 80/100. Masking ja aistiyliherkkyys kuluttavat tätä nopeasti.'
    },
    selfEsteem: {
        label: 'Keskittyminen',
        description: 'Aloitus: 80/100. Melu ja keskeytykset tuhoavat flow-tilan.'
    },
    hope: {
        label: 'Hyvinvointi',
        description: 'Aloitus: 80/100. Koetko olevasi oma itsesi vai esitätkö roolia?'
    },
    teamAcceptance: {
        label: 'Ymmärrys',
        description: 'Aloitus: 60/100. Miten kollegat tulkitsevat käytöksesi?'
    }
};

const STAT_LABELS_EN = {
    physicalHealth: {
        label: 'Energy',
        description: 'Start: 80/100. Masking and sensory overload consume this quickly.'
    },
    selfEsteem: {
        label: 'Focus',
        description: 'Start: 80/100. Noise and interruptions destroy flow state.'
    },
    hope: {
        label: 'Well-being',
        description: 'Start: 80/100. Are you being yourself or playing a role?'
    },
    teamAcceptance: {
        label: 'Understanding',
        description: 'Start: 60/100. How do colleagues interpret your behavior?'
    }
};

export const SimulationRegistry: Record<string, SimulationConfig> = {
    'hoitaja': {
        id: 'hoitaja',
        scenario: NURSE_SCENARIO,
        profession: 'nurse',
        exitPath: '/simulaatio'
    },
    'opettaja': {
        id: 'opettaja',
        scenario: TEACHER_SCENARIO,
        profession: 'teacher',
        exitPath: '/simulaatio'
    },
    'it': {
        id: 'it',
        scenario: IT_EXPERT_SCENARIO,
        profession: 'developer',
        exitPath: '/simulaatio'
    },
    'esimies': {
        id: 'esimies',
        scenario: MANAGER_SCENARIO,
        profession: 'manager',
        exitPath: '/simulaatio'
    },
    'neuro': {
        id: 'neuro',
        scenario: NEURO_SCENARIO,
        profession: 'neuro',
        exitPath: '/neuromoninaisuus',
        statLabels: STAT_LABELS_FI
    },
    'performance-trap': {
        id: 'performance-trap',
        scenario: PERFORMANCE_TRAP_SCENARIO,
        profession: 'performance_trap',
        exitPath: '/neuromoninaisuus'
    },
    'information-shadow': {
        id: 'information-shadow',
        scenario: INFORMATION_SHADOW_SCENARIO,
        profession: 'information_shadow',
        exitPath: '/neuromoninaisuus'
    },
    'nuoret': {
        id: 'nuoret',
        scenario: YOUTH_SCENARIO,
        profession: 'youth',
        exitPath: '/simulaatio'
    }
};

export function getSimulationConfig(id: string, lang: 'fi' | 'en' = 'fi'): SimulationConfig | null {
    const config = SimulationRegistry[id];
    if (!config) return null;

    // LOCALIZATION LOGIC
    if (id === 'neuro') {
        return {
            ...config,
            scenario: lang === 'en' ? NEURO_SCENARIO_EN : NEURO_SCENARIO,
            statLabels: lang === 'en' ? STAT_LABELS_EN : STAT_LABELS_FI
        };
    }
    if (id === 'hoitaja') {
        return {
            ...config,
            scenario: lang === 'en' ? NURSE_SCENARIO_EN : NURSE_SCENARIO
        };
    }
    if (id === 'opettaja') {
        return {
            ...config,
            scenario: lang === 'en' ? TEACHER_SCENARIO_EN : TEACHER_SCENARIO
        };
    }
    if (id === 'it') {
        return {
            ...config,
            scenario: lang === 'en' ? IT_EXPERT_SCENARIO_EN : IT_EXPERT_SCENARIO
        };
    }
    if (id === 'esimies') {
        return {
            ...config,
            scenario: lang === 'en' ? MANAGER_SCENARIO_EN : MANAGER_SCENARIO
        };
    }
    if (id === 'performance-trap') {
        return {
            ...config,
            scenario: lang === 'en' ? PERFORMANCE_TRAP_SCENARIO_EN : PERFORMANCE_TRAP_SCENARIO
        };
    }
    if (id === 'information-shadow') {
        return {
            ...config,
            scenario: lang === 'en' ? INFORMATION_SHADOW_SCENARIO_EN : INFORMATION_SHADOW_SCENARIO
        };
    }
    if (id === 'nuoret') {
        return {
            ...config,
            scenario: lang === 'en' ? YOUTH_SCENARIO_EN : YOUTH_SCENARIO
        };
    }

    return config;
}
