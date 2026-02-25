export interface SubLevel {
    min: number;
    max: number;
    title: string;
    description: string;
    feedback: string;
    hints: string[];
}

export interface ExpertLevel {
    id: number;
    name: string;
    minPoints: number;
    maxPoints: number;
    color: string;
    bg: string;
    icon: string;
    subLevels: SubLevel[];
}

export const EXPERT_LEVELS: ExpertLevel[] = [
    {
        id: 1,
        name: "Muna",
        minPoints: 0,
        maxPoints: 150,
        color: "text-slate-500",
        bg: "bg-slate-100",
        icon: "🥚",
        subLevels: [
            {
                min: 0,
                max: 150,
                title: "Tarkkailija",
                description: "Jokainen matka alkaa tästä. Ota aikasi.",
                feedback: "Vasta opettelet tunnistamaan hienovaraisia vihjeitä. Kaikki on uutta.",
                hints: ["Kiinnitä huomiota siihen, kuka jää keskustelun ulkopuolelle.", "Lue lisää ostrakismista tutkimuspankista."]
            }
        ]
    },
    {
        id: 2,
        name: "Untuvikko",
        minPoints: 151,
        maxPoints: 400,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        icon: "🐣",
        subLevels: [
            {
                min: 151,
                max: 400,
                title: "Oppija",
                description: "Ei ole heikkoutta oppia. On viisautta.",
                feedback: "Olet tehnyt ensimmäiset askeleet. Tiedät nyt enemmän kuin eilen.",
                hints: ["Pienikin ele, kuten tervehtiminen sivuutettua, merkitsee paljon.", "Kokeile Bystander-simulaatiota."]
            }
        ]
    },
    {
        id: 3,
        name: "Keltanokka",
        minPoints: 401,
        maxPoints: 800,
        color: "text-amber-500",
        bg: "bg-amber-50",
        icon: "🐤",
        subLevels: [
            {
                min: 401,
                max: 800,
                title: "Harjoittelija",
                description: "Dokumentointi on voimaa. Jatka näin.",
                feedback: "Harjoittelet lentoa. Et ole vielä valmis, mutta opit joka päivä.",
                hints: ["Harjoittele vielä viestien lukutaitoa.", "Lue lisää itsetuntemuksesta itsearviointien kautta."]
            }
        ]
    },
    {
        id: 4,
        name: "Höyhenpuku",
        minPoints: 801,
        maxPoints: 1500,
        color: "text-blue-500",
        bg: "bg-blue-50",
        icon: "🐦",
        subLevels: [
            {
                min: 801,
                max: 1500,
                title: "Taitaja",
                description: "Sinulla on nyt työkalut. Käytä niitä viisaasti.",
                feedback: "Höyhenesi ovat kasvaneet. Olet valmis ensimmäisiin lyhyisiin lentoihin.",
                hints: ["Luomalla raportin saat työkalut viralliseen prosessiin.", "Käytä kaikkia simulaattoreita vahvistaaksesi osaamistasi."]
            }
        ]
    },
    {
        id: 5,
        name: "Lentokykyinen",
        minPoints: 1501,
        maxPoints: 2500,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        icon: "🕊️",
        subLevels: [
            {
                min: 1501,
                max: 2500,
                title: "Osaaja",
                description: "Et ole enää yksin. Tiedät mihin olet menossa.",
                feedback: "Lennät omilla siivilläsi. Tiedät mitä teet ja miksi.",
                hints: ["Jatkuva dokumentointi auttaa pysymään tilanteen päällä.", "Käy läpi valmennuspolku syventääksesi ymmärrystäsi."]
            }
        ]
    },
    {
        id: 6,
        name: "Parviopas",
        minPoints: 2501,
        maxPoints: 4000,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        icon: "🦜",
        subLevels: [
            {
                min: 2501,
                max: 4000,
                title: "Opastaja",
                description: "Sinun kokemuksesi voi auttaa toista untuvikkoa.",
                feedback: "Lennät parven kärjessä. Olet nähnyt paljon ja oppinut paljon. Voit nyt auttaa muita.",
                hints: ["Viisautesi voi olla ratkaisevaa toiselle.", "Aktiivisuutesi yhteisössä murentaa kiusaamisen rakenteita."]
            }
        ]
    },
    {
        id: 7,
        name: "Turvasiipi-Mestari",
        minPoints: 4001,
        maxPoints: 99999,
        color: "text-orange-600",
        bg: "bg-orange-50",
        icon: "🦅",
        subLevels: [
            {
                min: 4001,
                max: 99999,
                title: "Suojelija",
                description: "Sinä olet se, jota muut tarvitsevat. Kiitos että jaksat.",
                feedback: "Lennät korkealla ja näet kauas. Olet läpikäynyt myrskyn ja selvinnyt.",
                hints: ["Olet jo huipulla. Kiitos panoksestasi parempaan työelämään."]
            }
        ]
    }
];
import { trainingHubData } from '@/data/training-hub';
import { Module, Badge } from '@/types/domain';

// Static modules that are NOT part of the new Valmennus hub structure
const CORE_MODULES: Module[] = [
    // CORE — legacy simulators
    { id: 'landing', categoryId: 'CORE', title: 'Etusivu', points: 50, path: '/' },
    { id: 'sim_nurse', categoryId: 'CORE', title: 'Koe: Hoitaja', points: 200, path: '/simulaatio/hoitaja' },
    { id: 'sim_teacher', categoryId: 'CORE', title: 'Koe: Opettaja', points: 200, path: '/simulaatio/opettaja' },
    { id: 'sim_manager', categoryId: 'CORE', title: 'Koe: Esimies', points: 200, path: '/simulaatio/esimies' },
    { id: 'sim_youth', categoryId: 'CORE', title: 'Koe: Nuoret', points: 200, path: '/simulaatio/nuoret' },
    { id: 'sim_neuro', categoryId: 'CORE', title: 'Koe: Neuromoninaisuus', points: 200, path: '/simulaatio/neuro' },

    // CORE — kiusaamissimulaattorit (dialogue-tree)
    { id: 'sim_isolation', categoryId: 'CORE', title: 'Hiljainen eristäminen', points: 150, path: '/simulaatio/kiusaaminen/isolation-dialogue-1' },
    { id: 'sim_micromanage', categoryId: 'CORE', title: 'Mikromanagerointi', points: 150, path: '/simulaatio/kiusaaminen/micromanagement-dialogue-1' },
    { id: 'sim_bystander_dlg', categoryId: 'CORE', title: 'Palaverin lasiseinä', points: 150, path: '/simulaatio/kiusaaminen/bystander-dialogue-1' },
    { id: 'sim_biff_email', categoryId: 'CORE', title: 'Sähköpostimyrsky (BIFF)', points: 150, path: '/simulaatio/kiusaaminen/biff-email-scenario' },
    { id: 'sim_perf_trap', categoryId: 'CORE', title: 'Suoritusloukku', points: 150, path: '/simulaatio/performance-trap' },
    { id: 'sim_info_shadow', categoryId: 'CORE', title: 'Tietovarjo', points: 150, path: '/simulaatio/information-shadow' },

    // CORE — Bystander-treeni
    { id: 'sim_bystander_full', categoryId: 'CORE', title: 'Bystander-treeni', points: 300, path: '/simulaatio/bystander' },

    // CORE — Tekijä-treeni (yksi per skenaario)
    { id: 'sim_perpetrator_s1', categoryId: 'CORE', title: 'Tekijä: KPI-paine', points: 250, path: '/simulaatio/tekija' },
    { id: 'sim_perpetrator_s2', categoryId: 'CORE', title: 'Tekijä: Peritty malli', points: 250, path: '/simulaatio/tekija' },
    { id: 'sim_perpetrator_s3', categoryId: 'CORE', title: 'Tekijä: Nepsyn ärsytys', points: 250, path: '/simulaatio/tekija' },
    { id: 'sim_perpetrator_s4', categoryId: 'CORE', title: 'Tekijä: Ryhmäpaine', points: 250, path: '/simulaatio/tekija' },
    { id: 'sim_perpetrator_s5', categoryId: 'CORE', title: 'Tekijä: Uupunut auttaja', points: 250, path: '/simulaatio/tekija' },

    // AWARENESS
    { id: 'tietovisa', categoryId: 'AWARENESS', title: 'Tietovisa', points: 150, path: '/faktapankki' },
    { id: 'cost_of_silence_info', categoryId: 'AWARENESS', title: 'Hiljaisuuden hinta (Teoria)', points: 100, path: '/faktapankki' },
    { id: 'cost_simulation_game', categoryId: 'AWARENESS', title: 'Hiljaisuuden hinta (Simulaatio)', points: 200, path: '/faktapankki' },
    { id: 'quiz_risks', categoryId: 'AWARENESS', title: 'Tunnista Riskit', points: 100, path: '/quiz' },
    { id: 'feeling_quiz', categoryId: 'AWARENESS', title: 'Uhrin Tuntemukset', points: 100, path: '/feeling-quiz' },
    { id: 'neuro_info', categoryId: 'AWARENESS', title: 'Neuromoninaisuus-info', points: 75, path: '/neuromoninaisuus' },
    { id: 'rsd_intro', categoryId: 'AWARENESS', title: 'RSD Perusteet', points: 30, path: '/neuromoninaisuus/rsd' },
    { id: 'rsd_interpretation_tool', categoryId: 'AWARENESS', title: 'Tulkintasuodatin', points: 20, path: '/neuromoninaisuus/rsd/tulkinta' },
    { id: 'rsd_meltdown_tracker', categoryId: 'AWARENESS', title: 'Meltdown-seuranta', points: 20, path: '/neuromoninaisuus/rsd/meltdown' },
    { id: 'rsd_drama_filter', categoryId: 'AWARENESS', title: 'Dramasuodatin', points: 20, path: '/neuromoninaisuus/rsd/draama' },
    { id: 'rsd_survival_strategies', categoryId: 'AWARENESS', title: 'Selviytymisstrategiat', points: 20, path: '/neuromoninaisuus/rsd/strategiat' },
    { id: 'neuro_glimmer_first', categoryId: 'AWARENESS', title: 'Ensimmäinen kimaltelus', points: 10, path: '/neuromoninaisuus/glimmers' },
    { id: 'neuro_glimmer_10', categoryId: 'AWARENESS', title: '10 kimallusta', points: 50, path: '/neuromoninaisuus/glimmers' },
    { id: 'neuro_glimmer_streak', categoryId: 'AWARENESS', title: '7 päivän putki', points: 100, path: '/neuromoninaisuus/glimmers' },
    { id: 'neuro_prep_first', categoryId: 'AWARENESS', title: 'Ensimmäinen repliikki', points: 20, path: '/neuromoninaisuus/prep' },
    { id: 'neuro_prep_practiced', categoryId: 'AWARENESS', title: 'Repliikki harjoiteltu 3x', points: 30, path: '/neuromoninaisuus/prep' },
    { id: 'neuro_prep_copied', categoryId: 'AWARENESS', title: 'Repliikki kopioitu', points: 50, path: '/neuromoninaisuus/prep' },
    { id: 'neuro_sos_activated', categoryId: 'AWARENESS', title: 'SOS-tila aktivoitu', points: 10, path: '/' },
    { id: 'neuro_strength_first', categoryId: 'AWARENESS', title: 'Ensimmäinen vahvuus', points: 10, path: '/neuromoninaisuus/vahvuudet' },
    { id: 'neuro_strength_10', categoryId: 'AWARENESS', title: '10 vahvuutta', points: 50, path: '/neuromoninaisuus/vahvuudet' },
    { id: 'neuro_escalation_used', categoryId: 'AWARENESS', title: 'Eskalaatiomittari käytössä', points: 20, path: '/neuromoninaisuus/eskalaatio' },
    { id: 'neuro_escalation_action', categoryId: 'AWARENESS', title: 'Vakavan tilanteen tunnistaminen', points: 30, path: '/neuromoninaisuus/eskalaatio' },
    { id: 'youth_info', categoryId: 'AWARENESS', title: 'Nuoret-info', points: 75, path: '/nuoret' },
    { id: 'impact_profile', categoryId: 'AWARENESS', title: 'Vaikutusprofiili', points: 150, path: '/vaikutusprofiili' },
    { id: 'literacy_test', categoryId: 'AWARENESS', title: 'Kiusaamisen Lukutaito', points: 150, path: '/lukutaito-testi' },
    { id: 'empathy_test', categoryId: 'AWARENESS', title: 'Empatia-Spektri', points: 150, path: '/empatia-testi' },

    // TOOLS
    { id: 'timeline', categoryId: 'TOOLS', title: 'Aikajana', points: 100, path: '/timeline' },
    { id: 'report', categoryId: 'TOOLS', title: 'Raporttigeneraattori', points: 150, path: '/raportti' },
    { id: 'templates', categoryId: 'TOOLS', title: 'Viestipohjat', points: 50, path: '/viestipohjat' },
    { id: 'vault', categoryId: 'TOOLS', title: 'Todistepankki', points: 100, path: '/todistepankki' },
    { id: 'rewrite', categoryId: 'TOOLS', title: 'Sanavaihto', points: 75, path: '/sanavaihto' },
    { id: 'neuro_feedback', categoryId: 'TOOLS', title: 'Neuro-Feedback', points: 150, path: '/neuro-feedback' },

    // SUPPORT
    { id: 'stories', categoryId: 'SUPPORT', title: 'Tarinat', points: 50, path: '/tarinat' },
    { id: 'support_list', categoryId: 'SUPPORT', title: 'Tukipalvelut', points: 50, path: '/tuki' },
    { id: 'community', categoryId: 'SUPPORT', title: 'Yhteisö', points: 50, path: '/yhteiso' },
    { id: 'ai_support', categoryId: 'SUPPORT', title: 'AI-Tukihenkilö', points: 100, path: '/ai-tuki' },
];

// Generate Valmennus modules from the SSOT (training-hub.ts)
const VALMENNUS_MODULES: Module[] = trainingHubData.flatMap(category =>
    category.modules.map(module => ({
        id: module.id,
        categoryId: 'LEARNING', // All training hub items fall under LEARNING/VALMENNUS context
        title: module.title,
        points: module.points || 0,
        path: `/valmennus/${category.id}/${module.id}`
    }))
);

export const MODULES: Module[] = [...CORE_MODULES, ...VALMENNUS_MODULES];

export const BADGES: Badge[] = [
    // ── Ensiastkeleet ──────────────────────────────────────────────────────────
    { id: 'welcome', title: 'Muna', icon: '🥚', description: 'Aloitit matkan.' },
    { id: 'first_sim', title: 'Ensiaskel', icon: '🎮', description: 'Suoritit ensimmäisen simulaattorin.' },

    // ── Ammattikokemukset (legacy simulators) ──────────────────────────────────
    { id: 'nurse_complete', title: 'Hoitajan Silmin', icon: '🩺', description: 'Suoritit hoitajan kokemuksen.' },
    { id: 'teacher_complete', title: 'Opettajan Taakka', icon: '📚', description: 'Suoritit opettajan kokemuksen.' },
    { id: 'manager_complete', title: 'Asiantuntijan Kriisi', icon: '💼', description: 'Suoritit esimiehen kokemuksen.' },
    { id: 'youth_complete', title: 'Nuoren Kokemus', icon: '🌱', description: 'Suoritit nuorten kokemuksen.' },
    { id: 'neuro_complete', title: 'Neuromoninaisuuden Ymmärrys', icon: '🧩', description: 'Suoritit neuromoninaisuus-kokemuksen.' },
    { id: 'empathy_master', title: 'Rohkeus', icon: '🪶', description: 'Suoritit kaikki ammattikokemukset.', isMastery: true },

    // ── Kiusaamissimulaattorit ────────────────────────────────────────────────
    { id: 'bully_sim_complete', title: 'Kiusaamisen Lukija', icon: '👁', description: 'Suoritit vähintään yhden kiusaamissimulaattorin.' },
    { id: 'bully_sim_master', title: 'Kaikkien Roolien Tuntija', icon: '🎭', description: 'Suoritit kaikki 4 kiusaamissimulaattoria.', isMastery: true },

    // ── Bystander & Tekijä ───────────────────────────────────────────────────
    { id: 'bystander_complete', title: 'Bystander-Harjoittaja', icon: '🛡️', description: 'Suoritit Bystander-treenin.' },
    { id: 'perpetrator_started', title: 'Kierteen Tunnistaja', icon: '🔄', description: 'Suoritit ensimmäisen Tekijä-skenaarion.' },
    { id: 'perpetrator_master', title: 'Muutoksentekijä', icon: '🌱', description: 'Suoritit kaikki 5 Tekijä-skenaariota.', isMastery: true },

    // ── Tietoisuus ───────────────────────────────────────────────────────────
    { id: 'legal_expert', title: 'Lakitiedon Tuntija', icon: '🎓', description: 'Läpäisit tietovisan vähintään 80% oikein.' },
    { id: 'risk_finder', title: 'Riskin Tunnistaja', icon: '🔍', description: 'Suoritit työyhteisön riskikyselyn.' },
    { id: 'valid_feelings', title: 'Tunteeni Ovat Oikeutettuja', icon: '💚', description: 'Suoritit tunnetestin.' },
    { id: 'empathy_profile_known', title: 'Itsetuntemus', icon: '🧬', description: 'Tunnistit oman empatiaprofiilisi.' },
    { id: 'knowledge_hunger', title: 'Tiedon Janoisuus', icon: '📖', description: 'Luit kaikki 12 taktiikkaa.' },
    { id: 'self_awareness', title: 'Itsetuntemus', icon: '🔎', description: 'Teit kaikki itsearvioinnit.' },

    // ── Työkalut ─────────────────────────────────────────────────────────────
    { id: 'doc_start', title: 'Dokumentoinnin Aloittaja', icon: '📝', description: 'Teit ensimmäisen aikajanamerkinnän.' },
    { id: 'analyzer', title: 'Analysoija', icon: '📊', description: 'Loit ensimmäisen PDF-raportin.' },
    { id: 'voice_found', title: 'Äänen Löytäminen', icon: '💬', description: 'Jaoit ensimmäisen tarinasi.' },
    { id: 'tool_user', title: 'Työkalupakki', icon: '🛠️', description: 'Käytit kolmea eri työkalua.' },

    // ── Mestarit ─────────────────────────────────────────────────────────────
    { id: 'trainee_path', title: 'Valmennettava', icon: '🌟', description: 'Suoritit koko valmennuspolun.' },
    { id: 'cert_complete', title: 'Kiusaamislukutaito', icon: '🏅', description: 'Suoritit kaikki sertifikaattimoduulit.', isMastery: true },
    { id: 'turvasiipi_master', title: 'Turvasiipi', icon: '🦅', description: 'Saavutit korkeimman tason.', isMastery: true },
    { id: 'night_owl', title: 'Yökyöpeli', icon: '🦉', description: 'Käytit sovellusta yöaikaan.' },
];
