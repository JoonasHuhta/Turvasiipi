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
            { id: 'safety', title: 'Turvallisuuden Palauttaminen', description: 'Miten tuntea olonsa turvalliseksi taas.', isLocked: true },
            { id: 'boundaries', title: 'Rajojen Asettaminen', description: 'Uudet pelisäännöt omalle työlle.', isLocked: true },
            { id: 'identity', title: 'Identiteetin Rakentaminen', description: 'Kuka olen kiusaamisen jälkeen.', isLocked: true }
        ]
    },
    {
        id: 'recovery',
        title: 'Toipuminen & Hyvinvointi',
        icon: Heart,
        description: 'Hermoston rauhoittaminen ja traumatiedon soveltaminen.',
        color: 'rose',
        isLocked: true,
        type: 'process',
        modules: [
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
            { id: 'conversations', title: 'Vaikeat Keskustelut', description: 'Harjoittele rajanvetoa keskustelussa.', isNew: true, isLocked: true },
            { id: 'labyrinth', title: 'Moraalinen Labyrintti', description: 'Eettiset valinnat paineen alla.', isLocked: true }
        ]
    },
    {
        id: 'lessons',
        title: 'Lukutaidon Oppitunnit',
        icon: GraduationCap,
        description: 'Lyhyitä videoita ja tekstejä päivittäiseen oppimiseen.',
        color: 'amber',
        isLocked: true,
        type: 'skill',
        modules: [
            { id: '20_modules', title: '20 Moduulia', description: '5-10 minuutin tietoiskuja.', isLocked: true },
            { id: 'patterns', title: 'Tunnista Kuviot', description: 'Yleisimmät kiusaamisen strategiat.', isLocked: true },
            { id: 'manager_reactions', title: 'Lue Esimiehen Reaktioita', description: 'Sanaton viestintä ja signaalit.', isLocked: true },
            { id: 'documentation', title: 'Dokumentoi Oikein', description: 'Lakiin perustuva näyttöaineisto.', isLocked: true }
        ]
    },
    {
        id: 'organization',
        title: 'Organisaatioille',
        icon: Building2,
        description: 'Ratkaisuja koko työyhteisön parantamiseen.',
        color: 'slate',
        isLocked: true,
        type: 'process',
        modules: [
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
        isLocked: true,
        type: 'skill',
        modules: [
            { id: 'cert_literacy', title: 'Lukutaito - Sertifikaatti', description: 'Todiste peruskurssin suorituksesta.', isLocked: true },
            { id: 'cert_bystander', title: 'Bystander - Koulutus', description: 'Virallinen todistus puuttumisesta.', isLocked: true },
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
            { id: 'bystander_effect', title: 'Bystander-efekti Syväluotaus', description: 'Vastuun hajautumisen mekanismit.', isCertificationModule: true },
            { id: 'gaslighting_mechanisms', title: 'Gaslightingin Mekanismit', description: 'Miten todellisuutta manipuloidaan.', isLocked: true }
        ]
    }
];
