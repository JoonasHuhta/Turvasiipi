
export type QuestionType = 'likert' | 'single-choice';

export interface Question {
    id: string;
    text: string;
    category: string;
    type?: QuestionType; // default 'likert'
    options?: { value: number | string; label: string }[]; // For non-likert
}

export interface Category {
    id: string;
    title: string;
    questions: Question[];
}

export const INDIVIDUAL_ASSESSMENT: Category[] = [
    {
        id: 'behavior',
        title: 'Käytös',
        questions: [
            { id: 'b1', text: 'Työkaverini vitsailevat toistuvasti minun kustannuksellani', category: 'behavior' },
            { id: 'b2', text: 'Saan julkista kritiikkiä virheistäni, kun muut eivät', category: 'behavior' },
            { id: 'b3', text: 'Asiantuntemustäni vähätellään tai mitätöidään', category: 'behavior' },
            { id: 'b4', text: 'Minulle sanotaan "älä ole niin herkkä" kun mainitsen loukkauksen', category: 'behavior' },
            // Tiedonkulku (grouped under behavior mostly for simplicity in this data structure, or separate?)
            // Let's separate as per spec if we want distinct scores, but spec grouped them in "Käytös (12 väittämää)" list with subheaders.
            // Let's keep them in one category 'behavior' but we can use tags if needed. 
            // Actually spec had "OSA 1: Käytös (12 väittämää)" with sub-sections.
            { id: 'b5', text: 'Jään säännöllisesti pois tärkeistä kokouksista ilman syytä', category: 'behavior' },
            { id: 'b6', text: 'En saa samaa tietoa kuin muut tiimin jäsenet', category: 'behavior' },
            { id: 'b7', text: 'Työtehtäviäni muutetaan ilman selitystä', category: 'behavior' },
            { id: 'b8', text: 'Palautetta minulle annetaan eri tavalla kuin muille', category: 'behavior' },
            { id: 'b9', text: 'Keskustelut hiljenevät kun tulen paikalle', category: 'behavior' },
            { id: 'b10', text: 'Minut jätetään systemaattisesti ulkopuolelle sosiaalisista tilanteista', category: 'behavior' },
            { id: 'b11', text: 'Kollegat välttelevät katsekontaktia kanssani', category: 'behavior' },
            { id: 'b12', text: 'Lounaille tai tauoille mennään ilman minua', category: 'behavior' },
        ]
    },
    {
        id: 'power',
        title: 'Valtasuhteet',
        questions: [
            { id: 'p1', text: 'Esimieheni kohtelee minua eri tavalla kuin muita', category: 'power' },
            { id: 'p2', text: 'Suoritevaatimukset muuttuvat jatkuvasti ilman selkeää perustetta', category: 'power' },
            { id: 'p3', text: 'Pelkään kostotoimia jos nostan huolen esiin', category: 'power' },
            { id: 'p4', text: 'Resursseja tai työvälineitä evätään minulta ilman syytä', category: 'power' },
            { id: 'p5', text: 'Päätökset minua koskien tehdään ilman perusteluja', category: 'power' },
            { id: 'p6', text: 'Minulla ei ole samanlaista pääsyä tietoon kuin muilla', category: 'power' },
        ]
    },
    {
        id: 'reaction',
        title: 'Omat reaktiot',
        questions: [
            { id: 'r1', text: 'Nukun huonosti tai näen painajaisia työstä', category: 'reaction' },
            { id: 'r2', text: 'Minulla on vatsavaivoja ennen töihin lähtöä', category: 'reaction' },
            { id: 'r3', text: 'Tunnen jatkuvaa väsymystä huolimatta levosta', category: 'reaction' },
            { id: 'r4', text: 'Sydämeni tykyttää ennen tiettyjä tapaamisia', category: 'reaction' },
            { id: 'r5', text: 'Mietin työtilanteitä vapaa-ajalla tai öisin', category: 'reaction' },
            { id: 'r6', text: 'Epäilen olevani itse ongelma', category: 'reaction' },
            { id: 'r7', text: 'Vältän tiettyjä ihmisiä tai tilanteita aktiivisesti', category: 'reaction' },
            { id: 'r8', text: 'Työmotivaationi on laskenut merkittävästi', category: 'reaction' },
        ]
    },
    {
        id: 'duration',
        title: 'Toistuvuus ja kesto',
        questions: [
            {
                id: 'd1',
                text: 'Kuinka kauan tilanne on jatkunut?',
                category: 'duration',
                type: 'single-choice',
                options: [
                    { value: 1, label: 'Alle viikko' },
                    { value: 2, label: '1-4 viikkoa' },
                    { value: 3, label: '1-3 kk' },
                    { value: 4, label: '3-6 kk' },
                    { value: 5, label: 'Yli 6 kk' }
                ]
            },
            {
                id: 'd2',
                text: 'Kuinka usein kokemuksesi toistuvat?',
                category: 'duration',
                type: 'single-choice',
                options: [
                    { value: 1, label: 'Kerran' },
                    { value: 2, label: 'Satunnaisesti' },
                    { value: 3, label: 'Viikoittain' },
                    { value: 4, label: 'Päivittäin' },
                    { value: 5, label: 'Useita kertoja päivässä' }
                ]
            },
            {
                id: 'd3',
                text: 'Onko tilanne pahentumassa?',
                category: 'duration',
                type: 'single-choice',
                options: [
                    { value: 1, label: 'Ei' },
                    { value: 2, label: 'Pysynyt samana' },
                    { value: 3, label: 'Kyllä, hitaasti' },
                    { value: 4, label: 'Kyllä, nopeasti' }
                ]
            },
        ]
    }
];

export const ORGANIZATIONAL_ASSESSMENT: Category[] = [
    {
        id: 'leadership',
        title: 'Johtaminen ja valtasuhteet',
        questions: [
            { id: 'o_l1', text: 'Esihenkilöni antaa palautetta tasapuolisesti kaikille', category: 'leadership' },
            { id: 'o_l2', text: 'Kritiikki annetaan rakentavasti ja kahden kesken', category: 'leadership' },
            { id: 'o_l3', text: 'Kehut annetaan julkisesti, moitteet yksityisesti', category: 'leadership' },
            { id: 'o_l4', text: 'Virheitä käsitellään oppimismahdollisuuksina', category: 'leadership' },
            { id: 'o_l5', text: 'Päätökset perustellaan läpinäkyvästi', category: 'leadership' },
            { id: 'o_l6', text: 'Alaisten mielipiteitä kuunnellaan ja otetaan huomioon', category: 'leadership' },
            { id: 'o_l7', text: 'Muutoksista tiedotetaan etukäteen', category: 'leadership' },
            { id: 'o_l8', text: 'Resurssit jaetaan tasapuolisesti', category: 'leadership' },
        ]
    },
    {
        id: 'interaction',
        title: 'Vuorovaikutus ja ilmapiiri',
        questions: [
            { id: 'o_i1', text: 'Kaikki saavat saman tiedon samaan aikaan', category: 'interaction' },
            { id: 'o_i2', text: 'Kokouskutsut lähetetään kaikille relevanteille', category: 'interaction' },
            { id: 'o_i3', text: 'Vitsit eivät kohdistu yhteen henkilöön toistuvasti', category: 'interaction' },
            { id: 'o_i4', text: 'Lounaita ja taukoja vietetään yhdessä', category: 'interaction' },
            { id: 'o_i5', text: 'Kukaan ei jää systemaattisesti ulkopuolelle', category: 'interaction' },
            { id: 'o_i6', text: 'Epäasiallisuuteen puututaan välittömästi', category: 'interaction' },
            { id: 'o_i7', text: 'Ilmapiiriongelmista voi puhua avoimesti', category: 'interaction' },
            { id: 'o_i8', text: 'Jos huomautan loukkaavasta käytöksestä, siihen reagoidaan', category: 'interaction' },
            { id: 'o_i9', text: 'Hiljainen hyväksyntä (sivustakatselu) ei ole hyväksyttävää', category: 'interaction' },
            { id: 'o_i10', text: 'Naljailu ei ole "vain vitsiä" -anteeksipyyntö', category: 'interaction' },
        ]
    },
    {
        id: 'support',
        title: 'Tukirakenteet ja prosessit',
        questions: [
            { id: 'o_s1', text: 'Tiedän mihin ilmoitan kiusaamishuolesta', category: 'support' },
            { id: 'o_s2', text: 'Työsuojeluvaltuutetun yhteystiedot ovat helposti saatavilla', category: 'support' },
            { id: 'o_s3', text: 'Prosessit kiusaamistapauksissa ovat selkeät', category: 'support' },
            { id: 'o_s4', text: 'Ilmoitukset käsitellään nopeasti (alle 7 päivää)', category: 'support' },
            { id: 'o_s5', text: 'Voin tuoda esiin huoleni ilman pelkoa seurauksista', category: 'support' },
            { id: 'o_s6', text: 'Ilmoittaminen on luottamuksellista', category: 'support' },
            { id: 'o_s7', text: 'Puuttujia tuetaan, ei rangaista', category: 'support' },
            { id: 'o_s8', text: 'Toistuviin tapauksiin puututaan tehokkaasti', category: 'support' },
        ]
    },
    {
        id: 'psych_safety',
        title: 'Psykologinen turvallisuus',
        questions: [
            { id: 'o_ps1', text: 'Voin olla oma itseni työpaikalla', category: 'psych_safety' },
            { id: 'o_ps2', text: 'Erimielisyydet ratkaistaan asiallisesti', category: 'psych_safety' },
            { id: 'o_ps3', text: 'Virheistä voi puhua ilman pelkoa', category: 'psych_safety' },
            { id: 'o_ps4', text: 'Apua pyydetään ja annetaan vapaasti', category: 'psych_safety' },
            { id: 'o_ps5', text: 'Tunnen kuuluvani yhteisöön', category: 'psych_safety' },
            { id: 'o_ps6', text: 'Tunnelma ei muutu kenenkään tullessa paikalle', category: 'psych_safety' },
        ]
    },
    {
        id: 'courage',
        title: 'Puuttumisen rohkeus',
        questions: [
            { id: 'o_c1', text: 'Puuttuisin havaitsemaani epäasiallisuuteen', category: 'courage' },
            { id: 'o_c2', text: 'Puuttuisin vaikka kohteena olisi vaikutusvaltainen henkilö', category: 'courage' },
            { id: 'o_c3', text: 'Kollegani tukisivat minua jos puuttuisin', category: 'courage' },
            { id: 'o_c4', text: 'Tiedän turvallisen tavan puuttua', category: 'courage' },
            { id: 'o_c5', text: 'Olen puuttunut viimeisen 3 kk aikana havaittuani epäasiallisuutta', category: 'courage' },
        ]
    },
    {
        id: 'monitoring',
        title: 'Seuranta ja kehitys',
        questions: [
            { id: 'o_m1', text: 'Ilmapiirikyselyjä tehdään säännöllisesti', category: 'monitoring' },
            { id: 'o_m2', text: 'Kyselyn tulokset johtavat konkreettisiin toimiin', category: 'monitoring' },
            { id: 'o_m3', text: 'Koulutusta kiusaamisen tunnistamisesta järjestetään', category: 'monitoring' },
        ]
    }
];

export const INDIVIDUAL_LABELS = {
    1: 'Ei koskaan',
    2: 'Harvoin',
    3: 'Joskus',
    4: 'Usein',
    5: 'Jatkuvasti'
};

export const ORGANIZATIONAL_LABELS = {
    1: 'Täysin eri mieltä',
    2: 'Jokseenkin eri mieltä',
    3: 'Ei samaa eikä eri mieltä',
    4: 'Jokseenkin samaa mieltä',
    5: 'Täysin samaa mieltä'
};
