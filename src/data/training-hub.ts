import { LucideIcon, BookOpen, RefreshCw, Heart, Gamepad2, GraduationCap, Building2, Award, Users } from "lucide-react";

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
    isLocked?: boolean;
    type: 'skill' | 'process';
    modules: TrainingModule[];
}

export const trainingHubData: TrainingCategory[] = [
    {
        id: 'literacy',
        title: 'Kiusaamisen Lukutaito',
        icon: BookOpen,
        description: 'Opi tunnistamaan hienovarainen manipulointi ja mikroaggressiot.',
        color: 'indigo',
        type: 'skill',
        modules: [
            { id: 'basic', title: 'Peruskurssi (Kaikille)', description: 'Tunnista peruskuviot ja dynamiikka.', isCertificationModule: true },
            { id: 'manager', title: 'Esimiesten Koulutus', description: 'Johtamisvastuu ja puuttumisen kynnys.', isLocked: true },
            { id: 'hr', title: 'HR & Johdon Masterclass', description: 'Strateginen vastaaminen ja kulttuurimuutos.', isLocked: true }
        ]
    },
    {
        id: 'return',
        title: 'Töihin Paluu',
        icon: RefreshCw,
        description: 'Tuettu polku takaisin työelämään pitkän poissaolon jälkeen.',
        color: 'emerald',
        type: 'process',
        modules: [
            { id: 'path_12_week', title: '12 Viikon Paluupolku', description: 'Vaiheittainen suunnitelma paluuseen.' },
            { id: 'safety', title: 'Turvallisuuden Palauttaminen', description: 'Miten tuntea olonsa turvalliseksi taas.', isNew: true },
            { id: 'boundaries', title: 'Rajojen Asettaminen', description: 'Uudet pelisäännöt omalle työlle.', isLocked: true },
            { id: 'identity', title: 'Identiteetin Rakentaminen', description: 'Kuka olen kiusaamisen jälkeen.', isLocked: true },
            { id: 'exit_strategy', title: 'Exit-Strategia', description: 'Milloin on aika lähteä? Tunnista merkit ja tee suunnitelma.', isNew: true }
        ]
    },
    {
        id: 'recovery',
        title: 'Toipuminen & Hyvinvointi',
        icon: Heart,
        description: 'Hermoston rauhoittaminen ja traumatiedon soveltaminen.',
        color: 'rose',
        type: 'process',
        modules: [
            { id: 'recovery_main', title: 'Toipuminen & Hyvinvointi', description: 'Hermoston rauhoittaminen ja traumatiedon soveltaminen.', isNew: true },
            { id: 'somatic', title: 'Somaattinen Vapautus', description: '5 harjoitusta kehon jännitykseen.', isLocked: true },
            { id: 'dmn', title: 'Default Mode Network', description: 'Katkaise märehtimisen kierre.', isLocked: true },
            { id: 'trauma_brain', title: 'Trauma-Aivot: Parantaminen', description: 'Miten mieli toipuu vauriosta.', isLocked: true },
            { id: 'mindfulness', title: 'Mindfulness & Grounding', description: 'Ankkuroitumisharjoitukset arkeen.', isLocked: true }
        ]
    },
    {
        id: 'interactive',
        title: 'Interaktiiviset Harjoitukset',
        icon: Gamepad2,
        description: 'Simulaatioita ja pelejä vaikeiden tilanteiden harjoitteluun.',
        color: 'cyan',
        type: 'skill',
        modules: [
            { id: 'empathy', title: 'Peilisolu-Pelastus', description: 'Empatia-peli toisen asemaan astumiseen.', isCertificationModule: true },
            { id: 'bystander', title: 'Bystander-Herättäjä', description: 'Psykologisesti turvallinen puuttuminen.', isCertificationModule: true },
            { id: 'action_protocols', title: 'Konkreettiset Toimintamallit', description: 'Akuutit skriptit ja turvasuunnitelmat.', isNew: true },
            { id: 'conversations', title: 'Vaikeat Keskustelut', description: 'Harjoittele rajanvetoa keskustelussa.', isNew: true },
            { id: 'labyrinth', title: 'Moraalinen Labyrintti', description: 'Eettiset valinnat paineen alla.', isNew: true }
        ]
    },

    {
        id: 'organization',
        title: 'Organisaatioille',
        icon: Building2,
        description: 'Ratkaisuja koko työyhteisön parantamiseen.',
        color: 'slate',
        type: 'process',
        modules: [
            { id: 'org_knowledge', title: 'Tietopankki: Työyhteisön Hyvinvointi', description: 'Rakenteelliset riskit ja johdon vastuu.', isNew: true },
            { id: 'b2b', title: 'Tilaa Koulutus (B2B)', description: 'Räätälöityä koulutusta yrityksellesi.', isLocked: true },
            { id: 'meter', title: 'Kulttuuri-Lämpömittari', description: 'Mittaa työyhteisön todellinen tila.', isLocked: true },
            { id: 'dna', title: 'Kiusaamisen DNA', description: 'Analysoi juurisyitä ja rakenteita.', isLocked: true },
            { id: 'audit', title: 'Empatia-Audit', description: 'Arvioi organisaation empatiakykyä.', isLocked: true }
        ]
    },
    {
        id: 'certificates',
        title: 'Sertifikaatit & Todistukset',
        icon: Award,
        description: 'Todisteet suoritetuista opinnoista ja taidoista.',
        color: 'blue',
        type: 'skill',
        modules: [
            { id: 'cert_view', title: 'Omat Sertifikaatit', description: 'Tarkastele ja lataa todistuksia.', isNew: true },
            { id: 'download', title: 'Lataa Työnantajalle', description: 'Kaikki todisteet yhdessä paketissa.', isLocked: true }
        ]
    },
    {
        id: 'leisure',
        title: 'Vapaa-aika & Yhdistykset',
        icon: Users,
        description: 'Kiusaamisen tunnistaminen ja ehkäisy harrastuksissa ja vapaaehtoistoiminnassa.',
        color: 'pink',
        type: 'skill',
        modules: [
            { id: 'association_basics', title: 'Yhdistystoiminnan Varjopuolet', description: 'Vallankäyttö ja klikit hallitustyöskentelyssä.', isCertificationModule: true },
            { id: 'hobby_boundaries', title: 'Harrastuksen Rajat', description: 'Miten pitää hauskaa ja asettaa rajat samaan aikaan.' },
            { id: 'transferable_skills', title: 'Siirrettävät Taidot', description: 'Dokumentointi ja puuttuminen vapaa-ajalla.' }
        ]
    },
    {
        id: 'research',
        title: 'Tutkimus & Käsitteet',
        icon: GraduationCap,
        description: 'Syvennä ymmärrystäsi kiusaamisen psykologiasta ja tutkimuslöydöksistä.',
        color: 'indigo',
        type: 'skill',
        modules: [
            { id: 'pluralistic_ignorance', title: 'Pluralistinen Ignoranssi', description: 'Miksi vaikenemme, vaikka tiedämme tilanteen olevan väärä.', isCertificationModule: true },
            { id: 'ostrakismi_toolkit', title: 'Ostrakismi-työkalupakki', description: 'Tunnista ja puutu hiljaiseen ulossulkemiseen.', isNew: true },
            { id: 'bystander_effect', title: 'Bystander-efekti Syväluotaus', description: 'Vastuun hajautumisen mekanismit.', isCertificationModule: true },
            { id: 'gaslighting_mechanisms', title: 'Gaslightingin Mekanismit', description: 'Miten todellisuutta manipuloidaan.', isLocked: true }
        ]
    }
];
