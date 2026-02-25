/**
 * Tekijä-simulaattorin tyypit
 * 5-osainen oppimiskaari: Paine → Vaaravyöhyke → Teko → Rewind → Korjaus
 *
 * Pedagoginen periaate:
 * - Ei glorifioida kiusaamista
 * - Tekijä = stressaantunut ihminen, ei sarjakuvapahis
 * - Jokainen valinta näyttää todelliset seuraukset
 * - Häpeä normalisoidaan, korjaava toimijuus tarjotaan aina
 */

// ─── Vaiheen tyypit ──────────────────────────────────────────────────────────

export type PerpetratorPhase =
    | 'intro'
    | 'pressure'      // Osa 1: Tunnista paine
    | 'dangerzone'    // Osa 2: Vaaravyöhyke
    | 'consequence'   // Osa 3: Teko + seuraukset
    | 'rewind'        // Osa 4: Rewind + vaihtoehto
    | 'repair'        // Osa 5: Korjaava liike
    | 'card';         // Loppukortti

export type PerpetratorRole =
    | 'manager'       // Esihenkilö
    | 'colleague'     // Kollega
    | 'group_member'  // Ryhmän jäsen
    | 'helper';       // Auttaja-rooli (hoiva, opetus)

// ─── Stressijärjestelmä ───────────────────────────────────────────────────────

export type StressLevel = 1 | 2 | 3 | 4 | 5;
// 1 = Rauhallinen   → "Hengität normaalisti"
// 2 = Kohonnut      → "Olkapäät jännittyneet"
// 3 = Kireä         → "Leuka puristuu"
// 4 = Vaaravyöhyke  → "Ajatukset lyhyitä ja syyttäviä"
// 5 = Kriisi        → "Näet vain yhden asian kerrallaan"

export interface StressFactor {
    id: string;
    label: string;          // "Johdon kritiikki aamulla"
    description: string;    // Tarkempi kuvaus
    icon: string;
    stressImpact: 1 | 2;    // Kuinka paljon nostaa tasoa
}

// ─── Moraaliseen oikeuttamiseen liittyvät tyypit ─────────────────────────────

export type MoralJustification =
    | 'minimizing'     // "Ei tämä ole vakavaa"
    | 'blaming'        // "Se ansaitsi sen"
    | 'comparing'      // "On pahempiakin"
    | 'group_defense'  // "Teen tämän ryhmän parhaaksi"
    | 'honesty'        // "Tämä on vain rehellisyyttä"
    | 'authority';     // "Johtaminen vaatii kovuutta"

export interface JustificationThought {
    type: MoralJustification;
    text: string;       // "Sanon vain miten asiat ovat"
    insight: string;    // Mitä se oikeasti tarkoittaa
}

// ─── Hostiliteettitulkinta ────────────────────────────────────────────────────

export interface HostileInterpretation {
    id: string;
    text: string;           // "Se tekee tämän tahallaan"
    isHostile: boolean;     // Onko tämä vihamielinen tulkinta
    explanation: string;    // Mitä taustalla oikeasti voi olla
}

// ─── Hahmot ──────────────────────────────────────────────────────────────────

export interface PerpetratorCharacter {
    id: string;
    name: string;
    role: string;
    color: string;
    isPlayer?: boolean;
    isTarget?: boolean;
}

// ─── OSA 1: Paineenvaihe ─────────────────────────────────────────────────────

export interface PressureEvent {
    time: string;       // "Klo 8.15"
    text: string;       // "Esimies lähetti kirjeen: suoritukset laskeneet 12%"
    icon: string;
    stressImpact: 1 | 2;
}

export interface PressurePhaseData {
    intro: string;          // "Ennen kuin tilanne alkoi, sinulla oli jo taustalla:"
    timeline: PressureEvent[];
    internalMonologue: string;  // "Kaikki kaatuu niskaan. En kestä enää."
    stressStartLevel: StressLevel;
    bodySignalAtStart: string;  // "Hartiat kireänä, leuka puristuu"
    question: string;       // "Miltä sinulla on mennyt tänään ennen tätä hetkeä?"
    stressFactors: StressFactor[];
}

// ─── OSA 2: Vaaravyöhyke ─────────────────────────────────────────────────────

export interface DangerZonePhaseData {
    trigger: {
        characterId: string;
        text: string;       // Kollegan lause/teko joka laukaisee
        style: 'normal' | 'question' | 'neutral';
    };
    bodySignals: string[];  // Kehon merkit: ["Sydän lyö kovempaa", "Näkökenttä kapenee"]
    cognitiveNarrow: string; // "Huomaat ajattelevasi vain yhden asian kerrallaan"
    justificationOptions: JustificationThought[];
    interpretations: HostileInterpretation[];
    groundingPrompt: string; // "Ennen kuin valitset — hengitä kerran."
}

// ─── OSA 3: Teko + seuraukset ────────────────────────────────────────────────

export type ActionSeverity = 'aggressive' | 'passive_aggressive' | 'avoidant' | 'constructive';

export interface PerpetratorAction {
    id: string;
    text: string;               // Mitä sanot/teet
    severity: ActionSeverity;
    icon: string;
    shortTermSelfFeel: string;  // Oma tunne heti: "Hetkellinen helpotus"
    shortTermBenefit?: string;  // Koettu hyöty: "Tilanne eteni"
    consequences: ActionConsequences;
}

export interface ActionConsequences {
    // Kolme tasoa samanaikaisesti (split-screen)
    victimExperience: {
        immediateThought: string;    // "En uskalla enää kysyä"
        bodyReaction: string;        // "Vatsa kiristyi"
        longTermEffect: string;      // "Alkoi epäillä omaa osaamistaan"
    };
    groupAtmosphere: {
        immediate: string;           // "Hiljainen jännitys"
        longTerm: string;            // "Muut alkoivat pitää omaa profiilinsa matalana"
    };
    selfAftermath: {
        immediate: string;           // "Hetkellinen helpotus — sitten tyhjyys"
        physical: string;            // "Kireys hartioissa ei helpottunut"
        longTerm: string;            // "Alkoi vältellä silmäkontaktia"
    };
    // Aikaperusteiset seuraukset
    nextDay: string;
    nextWeek: string;
    // Mitä oikeasti saavutit vs. mitä luulit saavuttavasi
    intentVsImpact: {
        intent: string;     // "Halusin, että hän ottaa vastuun"
        impact: string;     // "Hän menetti luottamuksen itseensä"
    };
}

// ─── OSA 4: Rewind + vaihtoehto ──────────────────────────────────────────────

export interface AlternativePhrase {
    id: string;
    text: string;
    tone: 'boundary' | 'assertive' | 'self-aware' | 'help_seeking';
    toneLabel: string;
    explanation: string;    // Miksi tämä toimii
    sceneReaction: {
        targetReaction?: string;
        groupReaction?: string;
    };
    analysis: string;       // Mitä tämä opettaa
}

export interface RewindPhaseData {
    rewindExplanation: string;  // "Sama tilanne. Sama stressitaso. Mitä jos valitsisit toisin?"
    sameStressReminder: string; // "Et ole erilainen ihminen — vain erilainen valinta"
    alternatives: AlternativePhrase[];
    editableTemplate: {
        template: string;
        slots: Array<{ placeholder: string; suggestion: string; hint: string }>;
    };
    openTextPrompt: string;
}

// ─── OSA 5: Korjaava liike ───────────────────────────────────────────────────

export type ShameProcessingStage =
    | 'normalize'    // "Häpeä on normaali — et ole yksin"
    | 'separate'     // "Teko ≠ persoona"
    | 'contrast'     // "Listaa 1 hyvä teko"
    | 'action'       // "Valitse mikroteko"
    | 'identity';    // "Uusi identiteetti"

export interface RepairAction {
    id: string;
    label: string;
    category: 'apology' | 'conversation' | 'self' | 'systemic';
    description: string;
    exampleText?: string;       // Esimerkkilause anteeksipyytämiseen tms.
    difficulty: 1 | 2 | 3;     // Kuinka vaikea toteuttaa
}

export interface RepairPhaseData {
    shameNormalization: string; // "Moni on tässä tilanteessa..."
    seatTakingText: string;     // "Sinä ≠ kiusaaja ikuisesti"
    identityContrast: {
        old: string;   // "Ryhmän vartija"
        new: string;   // "Ihminen joka tunnistaa rajat"
    };
    repairActions: RepairAction[];
    supportResources: Array<{
        label: string;
        description: string;
    }>;
    cardPrompt: string;     // "Yksi asia jonka opit tänään:"
    nextStepPrompt: string; // "Yksi lause jonka koitat seuraavaksi:"
}

// ─── Koko skenaario ───────────────────────────────────────────────────────────

export interface PerpetratorScenario {
    id: string;
    title: string;
    context: string;
    role: PerpetratorRole;
    systemicPressure: string;   // Org-konteksti: "KPI-pohjainen suorituskulttuuri"
    difficulty: 1 | 2 | 3 | 4 | 5;
    difficultyLabel: string;
    durationMinutes: number;
    learningGoal: string;
    triggerWarning?: string;    // Varoitus sensitiivisestä sisällöstä

    characters: PerpetratorCharacter[];
    scene: {
        id: string;
        background: string;
        description: string;    // Lyhyt tilannekuvaus
    };

    pressurePhase: PressurePhaseData;
    dangerZonePhase: DangerZonePhaseData;
    consequencePhase: {
        prompt: string;
        actions: PerpetratorAction[];
    };
    rewindPhase: RewindPhaseData;
    repairPhase: RepairPhaseData;
}

// ─── Moottorin tila ──────────────────────────────────────────────────────────

export interface PerpetratorEngineState {
    phase: PerpetratorPhase;
    stressLevel: StressLevel;
    selectedStressFactors: string[];
    selectedJustification?: MoralJustification;
    selectedInterpretation?: string;
    chosenAction?: string;
    chosenActionSeverity?: ActionSeverity;
    alternativeChosen?: string;
    repairActionsChosen: string[];
    savedPhrase?: string;
    cardContent?: {
        learned: string;
        nextStep: string;
    };
    paused: boolean;
}

// ─── Profiili (localStorage) ─────────────────────────────────────────────────

export interface PerpetratorCard {
    scenarioId: string;
    scenarioTitle: string;
    chosenActionSeverity: ActionSeverity;
    alternativePhrase: string;
    repairActions: string[];
    learned: string;
    nextStep: string;
    completedAt: string;
}

export interface PerpetratorProgress {
    sessionsCompleted: number;
    scenariosAttempted: string[];
    constructiveChoices: number;      // Kuinka monta kertaa valitsi rakentavan
    repairActionsTotal: number;
    savedCards: PerpetratorCard[];
}

// ─── Stressitason otsikot ─────────────────────────────────────────────────────

export const STRESS_LABELS: Record<StressLevel, { label: string; body: string; color: string }> = {
    1: { label: 'Rauhallinen', body: 'Hengität normaalisti.', color: '#22c55e' },
    2: { label: 'Kohonnut', body: 'Olkapäät jännittyneet.', color: '#84cc16' },
    3: { label: 'Kireä', body: 'Leuka puristuu. Lyhyet lauseet.', color: '#f59e0b' },
    4: { label: 'Vaaravyöhyke', body: 'Ajatukset syyttäviä. Näkökenttä kapenee.', color: '#f97316' },
    5: { label: 'Kriisi', body: 'Näet vain yhden asian kerrallaan.', color: '#ef4444' },
};

export const ACTION_SEVERITY_LABELS: Record<ActionSeverity, { label: string; color: string }> = {
    aggressive: { label: 'Suora aggressio', color: '#ef4444' },
    passive_aggressive: { label: 'Passiivis-aggressiivinen', color: '#f97316' },
    avoidant: { label: 'Ohittaminen / jäätyminen', color: '#94a3b8' },
    constructive: { label: 'Rakentava', color: '#22c55e' },
};
