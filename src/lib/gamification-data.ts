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
        maxPoints: 100,
        color: "text-slate-500",
        bg: "bg-slate-100",
        icon: "🥚",
        subLevels: [
            {
                min: 0,
                max: 100,
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
        minPoints: 101,
        maxPoints: 300,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        icon: "🐣",
        subLevels: [
            {
                min: 101,
                max: 300,
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
        minPoints: 301,
        maxPoints: 600,
        color: "text-amber-500",
        bg: "bg-amber-50",
        icon: "🐤",
        subLevels: [
            {
                min: 301,
                max: 600,
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
        minPoints: 601,
        maxPoints: 1000,
        color: "text-blue-500",
        bg: "bg-blue-50",
        icon: "🐦",
        subLevels: [
            {
                min: 601,
                max: 1000,
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
        minPoints: 1001,
        maxPoints: 1500,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        icon: "🕊️",
        subLevels: [
            {
                min: 1001,
                max: 1500,
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
        minPoints: 1501,
        maxPoints: 2500,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        icon: "🦜",
        subLevels: [
            {
                min: 1501,
                max: 2500,
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
        minPoints: 2501,
        maxPoints: 10000,
        color: "text-orange-600",
        bg: "bg-orange-50",
        icon: "🦅",
        subLevels: [
            {
                min: 2501,
                max: 10000,
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
    // CORE
    { id: 'landing', categoryId: 'CORE', title: 'Etusivu', points: 50, path: '/' },
    { id: 'sim_nurse', categoryId: 'CORE', title: 'Koe: Hoitaja', points: 200, path: '/simulaatio/hoitaja' },
    { id: 'sim_teacher', categoryId: 'CORE', title: 'Koe: Opettaja', points: 200, path: '/simulaatio/opettaja' },
    { id: 'sim_manager', categoryId: 'CORE', title: 'Koe: Esimies', points: 200, path: '/simulaatio/esimies' },
    { id: 'sim_youth', categoryId: 'CORE', title: 'Koe: Nuoret', points: 200, path: '/simulaatio/nuoret' },
    { id: 'sim_neuro', categoryId: 'CORE', title: 'Koe: Neuromoninaisuus', points: 200, path: '/simulaatio/neuro' },

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
    { id: 'welcome', title: 'Muna', icon: '🥚', description: 'Loit ensimmäisen lokimerkinnän tai aloitit matkan.' },
    { id: 'nurse_complete', title: 'Hoitajan Silmin', icon: '🩺', description: 'Suoritit hoitajan kokemuksen.' },
    { id: 'teacher_complete', title: 'Opettajan Taakka', icon: '📚', description: 'Suoritit opettajan kokemuksen.' },
    { id: 'manager_complete', title: 'Asiantuntijan Kriisi', icon: '💼', description: 'Suoritit esimiehen kokemuksen.' },
    { id: 'youth_complete', title: 'Nuoren Kokemus', icon: '🌱', description: 'Suoritit nuorten kokemuksen.' },
    { id: 'neuro_complete', title: 'Neuromoninaisuuden Ymmärrys', icon: '🧩', description: 'Suoritit neuromoninaisuus-kokemuksen.' },
    { id: 'empathy_master', title: 'Rohkeus', icon: '🪶', description: 'Suoritit kaikki simulaattorit.', isMastery: true },
    { id: 'legal_expert', title: 'Lakitiedon Tuntija', icon: '🎓', description: 'Läpäisit tietovisan vähintään 80% oikein.' },
    { id: 'risk_finder', title: 'Riskin Tunnistaja', icon: '🔍', description: 'Suoritit työyhteisön riskikyselyn.' },
    { id: 'valid_feelings', title: 'Tunteeni Ovat Oikeutettuja', icon: '💚', description: 'Suoritit tunnetestin ja sait validoinnin.' },
    { id: 'doc_start', title: 'Dokumentoinnin Aloittaja', icon: '📝', description: 'Teit ensimmäisen aikajanamerkinnän.' },
    { id: 'knowledge_hunger', title: 'Tiedon Janoisuus', icon: '📖', description: 'Luit kaikki 12 taktiikkaa.' },
    { id: 'self_awareness', title: 'Itsetuntemus', icon: '🔍', description: 'Teit kaikki itsearvioinnit.' },
    { id: 'empathy_profile_known', title: 'Itsetuntemus', icon: '🧬', description: 'Tunnistit oman empatiaprofiilisi.' },
    { id: 'voice_found', title: 'Äänen Löytäminen', icon: '💬', description: 'Jaoit ensimmäisen tarinasi.' },
    { id: 'persistence_7', title: 'Sinnikkyys', icon: '⏰', description: 'Käytit sovellusta 7 päivänä peräkkäin.' },
    { id: 'analyzer', title: 'Analysoija', icon: '📊', description: 'Loit ensimmäisen PDF-raportin.' },
    { id: 'trainee_path', title: 'Valmennettava', icon: '🌟', description: 'Suoritit koko valmennuspolun.' },
    { id: 'turvasiipi_master', title: 'Turvasiipi', icon: '🦅', description: 'Saavutit korkeimman tason.', isMastery: true },
    { id: 'night_owl', title: 'Yökyöpeli', icon: '🦉', description: 'Käytit sovellusta yöaikaan.' },
    { id: 'mallard', title: 'Sinisorsa', icon: '🦆', description: 'Palasit sovellukseen useita kertoja päivässä.' },
];
