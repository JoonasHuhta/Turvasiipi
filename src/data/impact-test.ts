
export interface ImpactQuestion {
    id: number;
    text: string;
    // Positive weight means agreement points towards "A" (Constructive).
    // Negative weight means agreement points towards "B" or "C" (Destructive).
    // Specifically, we track 'constructive' vs 'destructive' score generally, 
    // and then specific 'pressure' (B) vs 'power' (C) markers.
    category: 'pressure' | 'power' | 'constructive';
    weight: number;
}

export const impactQuestions: ImpactQuestion[] = [
    {
        id: 1,
        text: "Koen, että minun on valvottava tiimiläisteni tekemisiä tarkasti, jotta virheitä ei tapahdu.",
        category: 'power',
        weight: 1
    },
    {
        id: 2,
        text: "Jos joku selittää asiaa liian hitaasti, keskeytän hänet säästääkseni aikaa.",
        category: 'pressure',
        weight: 1
    },
    {
        id: 3,
        text: "Kysyn usein kollegoiltani 'mitä sinulle kuuluu' ennen kuin menen työasioihin.",
        category: 'constructive',
        weight: 1
    },
    {
        id: 4,
        text: "Tieto on valtaa, ja sitä kannattaa jakaa harkiten vain harvoille.",
        category: 'power',
        weight: 1
    },
    {
        id: 5,
        text: "Uskon, että pieni pelko tai paine saa ihmiset suoriutumaan paremmin.",
        category: 'pressure',
        weight: 1
    },
    {
        id: 6,
        text: "Kun huomaan virheen, otan sen puheeksi kahden kesken enkä muiden kuullen.",
        category: 'constructive',
        weight: 1
    },
    {
        id: 7,
        text: "Käytän joskus sarkasmia tai teräviä huomautuksia herätelläkseni tiimiä.",
        category: 'pressure',
        weight: 1
    },
    {
        id: 8,
        text: "Koen, että on minun tehtäväni karsia tiimistä 'heikot lenkit'.",
        category: 'power',
        weight: 1
    },
    {
        id: 9,
        text: "Pyydän aktiivisesti palautetta omasta toiminnastani, vaikka se olisi kriittistä.",
        category: 'constructive',
        weight: 1
    },
    {
        id: 10,
        text: "Tavoitteet ja tulokset ovat tärkeämpiä kuin se, miltä ihmisistä tuntuu.",
        category: 'pressure',
        weight: 1
    },
    {
        id: 11,
        text: "Myönnän avoimesti omat virheeni tiimin edessä.",
        category: 'constructive',
        weight: 1
    }
];

export type ImpactProfileType = 'A' | 'B' | 'C';

export interface ImpactProfile {
    id: ImpactProfileType;
    title: string;
    subtitle: string;
    icon: string;
    description: string;
    impact: string;
    why: string;
    motivation: string;
    nextStep: string;
    color: string; // Tailwind class
}

// Logic to determine profile:
// Mostly 'constructive' -> A
// Mostly 'pressure' -> B
// Mostly 'power' -> C
export const getImpactProfile = (counts: { pressure: number, power: number, constructive: number }): ImpactProfileType => {
    // If constructive is dominant, it's A.
    if (counts.constructive > counts.pressure && counts.constructive > counts.power) {
        return 'A';
    }

    // If destructive side dominates, differentiate between B (Pressure) and C (Power/Control).
    // If equal, lean towards B as it's often the "lighter" version of toxic behavior before full C.
    if (counts.power > counts.pressure) {
        return 'C';
    }

    return 'B';
};
