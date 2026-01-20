import { Phase } from "./types";

export type Scenario = Record<string, Phase>;
import { NURSE_SCENARIO } from "./scenarios/nurse";
import { TEACHER_SCENARIO } from "./scenarios/teacher";
import { IT_EXPERT_SCENARIO } from "./scenarios/it_expert";
import { MANAGER_SCENARIO } from "./scenarios/manager";
import { NEURO_SCENARIO } from "./scenarios/neurodivergent";
import { PERFORMANCE_TRAP_SCENARIO } from "./scenarios/performance_trap";
import { INFORMATION_SHADOW_SCENARIO } from "./scenarios/information_shadow";
import { YOUTH_SCENARIO } from "./scenarios/youth";
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
        statLabels: {
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
        }
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

export function getSimulationConfig(id: string): SimulationConfig | null {
    return SimulationRegistry[id] || null;
}
