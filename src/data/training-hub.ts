import { LucideIcon, BookOpen, RefreshCw, Heart, Gamepad2, GraduationCap, Building2, Award, Users, Siren, Activity, Compass, ShieldAlert } from "lucide-react";

export interface TrainingModule {
    id: string;
    title: string;
    description: string;
    isNew?: boolean;
    isLocked?: boolean;
    points?: number;
    isCertificationModule?: boolean;
}

export interface TrainingCategory {
    id: string;
    title: string;
    icon: LucideIcon;
    description: string;
    color: string;
    type: 'skill' | 'process';
    modules: TrainingModule[];
}

export const trainingHubData: TrainingCategory[] = [
    {
        id: 'acute',
        title: 'AKUUTTI APU 🆘',
        icon: Siren,
        description: 'Tarvitsen apua NYT. Ensiapua kriisitilanteeseen.',
        color: 'rose',
        type: 'process',
        modules: [
            { id: 'action_protocols', title: 'Konkreettiset Toimintamallit', description: 'Akuutit skriptit ja turvasuunnitelmat.', isNew: true, points: 150 },
            { id: 'conversations', title: 'Vaikeat Keskustelut', description: 'Rajanveto ja itsensä suojaaminen.', isNew: true, points: 200 },
            { id: 'safety', title: 'Turvallisuuden Palauttaminen', description: 'Miten tuntea olonsa turvalliseksi taas.', isNew: true, points: 150 },
            { id: 'exit_strategy', title: 'Exit-Strategia', description: 'Milloin on aika lähteä? Tunnista merkit.', isNew: true, points: 100 }
        ]
    },
    {
        id: 'understand',
        title: 'YMMÄRRÄ ILMIÖ 🧠',
        icon: BookOpen,
        description: 'Mitä minulle tapahtuu? Tietoa ja tunnistamista.',
        color: 'indigo',
        type: 'skill',
        modules: [
            { id: 'basic', title: 'Kiusaamisen Lukutaito (Sertifikaatti)', description: 'Peruskurssi: Tunnista peruskuviot ja dynamiikka.', isCertificationModule: true, points: 300 },
            { id: 'ostrakismi_toolkit', title: 'Ostrakismi-työkalupakki', description: 'Tunnista ja puutu hiljaiseen ulossulkemiseen.', isNew: true, points: 200 },
            { id: 'bystander_effect', title: 'Bystander-efekti', description: 'Miksi muut eivät puutu? Vastuun hajautuminen.', points: 100 },
            { id: 'pluralistic_ignorance', title: 'Pluralistinen Ignoranssi', description: 'Miksi vaikenemme, vaikka tiedämme tilanteen olevan väärä.', isCertificationModule: true, points: 150 },
            { id: 'gaslighting_mechanisms', title: 'Gaslightingin Mekanismit', description: 'Miten todellisuutta manipuloidaan.', points: 150 }
        ]
    },
    {
        id: 'recovery',
        title: 'KEHON & MIELEN TOIPUMINEN 💚',
        icon: Heart,
        description: 'Kuinka selvitä päivästä toiseen? Trauma ja hyvinvointi.',
        color: 'emerald',
        type: 'process',
        modules: [
            { id: 'recovery_main', title: 'Toipuminen & Hyvinvointi', description: 'Hermoston rauhoittaminen ja traumatiedon soveltaminen.', isNew: true, points: 200 },
            { id: 'somatic', title: 'Somaattinen Vapautus', description: '5 harjoitusta kehon jännitykseen.', points: 150 },
            { id: 'trauma_brain', title: 'Trauma-Aivot: Parantaminen', description: 'Miten mieli toipuu vauriosta.', points: 200 },
            { id: 'dmn', title: 'Default Mode Network', description: 'Katkaise märehtimisen kierre.', points: 100 },
            { id: 'mindfulness', title: 'Mindfulness & Grounding', description: 'Ankkuroitumisharjoitukset arkeen.', points: 50 }
        ]
    },
    {
        id: 'return',
        title: 'PALUU & UUDELLEENORIENTOITUMINEN 🔄',
        icon: Compass,
        description: 'Mitä teen seuraavaksi? Paluu työhön tai uusi alku.',
        color: 'blue',
        type: 'process',
        modules: [
            { id: 'path_12_week', title: '12 Viikon Paluupolku', description: 'Vaiheittainen suunnitelma paluuseen.', points: 500 },
            { id: 'boundaries', title: 'Rajojen Asettaminen', description: 'Uudet pelisäännöt omalle työlle.', points: 150 },
            { id: 'identity', title: 'Identiteetin Rakentaminen', description: 'Kuka olen kiusaamisen jälkeen.', points: 200 }
        ]
    },
    {
        id: 'interactive',
        title: 'INTERAKTIIVISET TAIDOT 🎯',
        icon: Gamepad2,
        description: 'Harjoittele turvallisesti. Simulaatiot ja pelit.',
        color: 'purple',
        type: 'skill',
        modules: [
            { id: 'empathy', title: 'Peilisolu-Pelastus (Sertifikaatti)', description: 'Empatia-peli toisen asemaan astumiseen.', isCertificationModule: true, points: 250 },
            { id: 'bystander', title: 'Bystander-Herättäjä (Sertifikaatti)', description: 'Psykologisesti turvallinen puuttuminen.', isCertificationModule: true, points: 250 },
            { id: 'labyrinth', title: 'Moraalinen Labyrintti', description: 'Eettiset valinnat paineen alla.', isNew: true, points: 200 }
        ]
    },
    {
        id: 'organization',
        title: 'ORGANISAATIOILLE 🏢',
        icon: Building2,
        description: 'Kuinka muuttaa kulttuuria? Ratkaisuja työyhteisölle.',
        color: 'slate',
        type: 'process',
        modules: [
            { id: 'org_knowledge', title: 'Tietopankki: Työhyvinvointi', description: 'Rakenteelliset riskit ja johdon vastuu.', isNew: true, points: 150 },
            { id: 'meter', title: 'Kulttuuri-Lämpömittari', description: 'Mittaa työyhteisön todellinen tila.', isLocked: true, points: 100 },
            { id: 'audit', title: 'Empatia-Audit', description: 'Arvioi organisaation empatiakykyä.', isLocked: true, points: 200 },
            { id: 'manager', title: 'Esimiesten Koulutus', description: 'Johtamisvastuu ja puuttumisen kynnys.', isLocked: true, points: 300 },
            { id: 'hr', title: 'HR & Johdon Masterclass', description: 'Strateginen vastaaminen ja kulttuurimuutos.', isLocked: true, points: 400 },
            { id: 'b2b', title: 'Tilaa Koulutus (B2B)', description: 'Räätälöityä koulutusta yrityksellesi.', isLocked: true, points: 0 },
            { id: 'dna', title: 'Kiusaamisen DNA', description: 'Analysoi juurisyitä ja rakenteita.', isLocked: true, points: 150 }
        ]
    },
    {
        id: 'special',
        title: 'ERITYISYMPÄRISTÖT 🎭',
        icon: Users,
        description: 'Tunnistan tämän omasta elämästäni. Vapaa-aika ja yhteisöt.',
        color: 'pink',
        type: 'skill',
        modules: [
            { id: 'association_basics', title: 'Yhdistystoiminnan Varjopuolet', description: 'Vallankäyttö ja klikit hallitustyöskentelyssä.', isCertificationModule: true, points: 200 },
            { id: 'hobby_boundaries', title: 'Harrastuksen Rajat', description: 'Miten pitää hauskaa ja asettaa rajat samaan aikaan.', points: 100 }
        ]
    },
    {
        id: 'progress',
        title: 'OMA EDISTYMINEN 📊',
        icon: Award,
        description: 'Mitä olen saavuttanut? Todistukset ja seuranta.',
        color: 'amber',
        type: 'skill',
        modules: [
            { id: 'cert_view', title: 'Omat Sertifikaatit', description: 'Tarkastele ja lataa todistuksia.', isNew: true, points: 50 },
            { id: 'download', title: 'Lataa Työnantajalle', description: 'Kaikki todisteet yhdessä paketissa.', isLocked: true, points: 50 }
        ]
    }
];
