/**
 * Simulator Registry
 * Single source of truth for all simulator metadata.
 *
 * Architecture contract:
 * - When adding a new simulator: add entry here + create its page under /simulaatio/[id]/
 * - Never modify existing engine files (DialogueTreeEngine, ScenarioEngine)
 * - SimulatorType maps to which engine renders the simulator
 */

export type SimulatorType = 'dialogue-tree' | 'scenario' | 'text-only';

/** Learning arc progression level — defines the user's journey */
export type LearningArcLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** Whose shoes the user stands in */
export type Persona = 'victim' | 'bystander' | 'supervisor' | 'hr';

/** Work sector the scenario is set in */
export type Sector = 'yleinen' | 'it' | 'hoitaja' | 'opettaja' | 'esimies' | 'nuoret';

export interface SimulatorMeta {
    /** Must match the scenario's id field AND the URL segment: /simulaatio/[id] */
    id: string;
    title: string;
    /** 1–2 sentences shown on the card. No jargon. */
    description: string;
    type: SimulatorType;
    sector: Sector;
    persona: Persona;
    /** Position in the learning arc (1 = Tunnista ... 7 = Toivu) */
    learningArcLevel: LearningArcLevel;
    /** Human-readable arc stage shown on card */
    arcLabel: string;
    durationMinutes: number;
    isNew?: boolean;
}

// ---------------------------------------------------------------------------
// THE REGISTRY
// Add new simulators here. Do not modify existing entries unless the scenario
// itself has changed fundamentally.
// ---------------------------------------------------------------------------
export const simulatorRegistry: SimulatorMeta[] = [
    {
        id: 'isolation-dialogue-1',
        title: 'Hiljainen eristäminen',
        description:
            'Olet uusi IT-tiimissä. Kutsuja ei tule, huomioita ei saa. Milloin kyse on kiusaamisesta?',
        type: 'dialogue-tree',
        sector: 'it',
        persona: 'victim',
        learningArcLevel: 1,
        arcLabel: 'Tunnista',
        durationMinutes: 5,
    },
    {
        id: 'micromanagement-dialogue-1',
        title: 'Mikromanagerointi',
        description:
            'Uusi esimies vaatii mahdottomia ja muuttaa sääntöjä jälkikäteen. Miten reagoit?',
        type: 'dialogue-tree',
        sector: 'yleinen',
        persona: 'victim',
        learningArcLevel: 2,
        arcLabel: 'Reagoi',
        durationMinutes: 6,
    },
    {
        id: 'bystander-dialogue-1',
        title: 'Palaverin lasiseinä',
        description:
            'Kollega nöyryytetään julkisesti. Et ole kohde — olet todistaja. Mitä teet?',
        type: 'dialogue-tree',
        sector: 'yleinen',
        persona: 'bystander',
        learningArcLevel: 3,
        arcLabel: 'Puutu',
        durationMinutes: 7,
        isNew: true,
    },
    {
        id: 'biff-email-scenario',
        title: 'Sähköpostimyrsky',
        description:
            'Saat syyttävän sähköpostin koko tiimin nähden. Harjoittele BIFF-vastausta.',
        type: 'dialogue-tree',
        sector: 'yleinen',
        persona: 'victim',
        learningArcLevel: 4,
        arcLabel: 'Viesti',
        durationMinutes: 4,
    },
];

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

/** Returns the registry entry for a given scenario id, or undefined. */
export function getSimulatorMeta(id: string): SimulatorMeta | undefined {
    return simulatorRegistry.find((s) => s.id === id);
}

/** User-friendly label for the simulator type (not technical) */
export function getTypeLabel(type: SimulatorType): string {
    switch (type) {
        case 'dialogue-tree':
            return 'Simulaattori';
        case 'scenario':
            return 'Harjoitus';
        case 'text-only':
            return 'Reflektio';
    }
}

/** User-friendly label for persona */
export function getPersonaLabel(persona: Persona): string {
    switch (persona) {
        case 'victim':
            return 'Uhrin rooli';
        case 'bystander':
            return 'Sivustakatsojan rooli';
        case 'supervisor':
            return 'Esihenkilön rooli';
        case 'hr':
            return 'HR-rooli';
    }
}
