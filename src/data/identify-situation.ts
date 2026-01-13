export interface Signal {
    id: string;
    text: string;
}

export interface LevelData {
    color: 'yellow' | 'orange' | 'red';
    title: string;
    subtitle: string;
    description: string;
    signs: {
        category: string;
        items: Signal[];
    }[];
    checkYourself: string; // The "Tarkista itsesi" question
    whatToDo: string[];
}

export const identifyLevels: LevelData[] = [
    {
        color: 'yellow',
        title: 'KELTAINEN - Varhaiset merkit',
        subtitle: 'Epämukavuus ja intuitio',
        description: 'Tilanteet tuntuvat oudoilta, mutta ne on helppo selittää pois "huumorilla" tai "kiireellä".',
        signs: [
            {
                category: 'Valtasuhdemerkit',
                items: [
                    { id: 'y_p1', text: 'Esihenkilö vitsailee toistuvasti sinun kustannuksellasi' },
                    { id: 'y_p2', text: 'Asiantuntijuuttasi vähätellään hienovaraisesti' },
                    { id: 'y_p3', text: 'Palautetta annetaan eri tavalla kuin muille' }
                ]
            },
            {
                category: 'Ilmapiirimerkit',
                items: [
                    { id: 'y_a1', text: 'Ihmiset hiljentyvät kun tulet paikalle' },
                    { id: 'y_a2', text: 'Katsekontaktia vältetään' },
                    { id: 'y_a3', text: '"Huumori" tuntuu epämukavalta mutta "älä nyt ole niin herkkä"' }
                ]
            },
            {
                category: 'Omat reaktiot',
                items: [
                    { id: 'y_r1', text: 'Alat kyseenalaistaa omaa havainnointikykyäsi' },
                    { id: 'y_r2', text: 'Valmistaudut kohtaamisiin etukäteen ("mitä sanon jos...")' },
                    { id: 'y_r3', text: 'Tunnet kevyttä ahdistusta tiettyjä tapaamisia ennen' }
                ]
            }
        ],
        checkYourself: 'Heräätkö öisin miettimään työtilanteita? Jos kyllä → seuraa tarkemmin',
        whatToDo: [
            'Aloita "tunnepäiväkirja" - kirjaa päivittäin: miltä tuntui, miksi, kuka oli läsnä',
            'Tee 60 sekunnin itsearviointi kerran viikossa',
            'Kirjoita faktat ylös heti kun jotain tapahtuu',
            'Älä jää pohtimaan yksin - puhu luotettavalle ystävälle'
        ]
    },
    {
        color: 'orange',
        title: 'ORANSSI - Toistuvat merkit',
        subtitle: 'Systemaattinen häirintä',
        description: 'Toiminta ei ole enää satunnaista. Se toistuu ja alkaa vaikuttaa työkykyysi.',
        signs: [
            {
                category: 'Valtasuhteen väärinkäyttö',
                items: [
                    { id: 'o_p1', text: 'Muuttuvat suoritevaatimukset ("tee paremmin" ilman selkeää kriteeriä)' },
                    { id: 'o_p2', text: '"Gotcha-taktiikka" - kun täytät odotukset, ne muuttuvat' },
                    { id: 'o_p3', text: 'Resurssit tai työvälineet evätään ilman perustelua' }
                ]
            },
            {
                category: 'Dokumentointikriteerit (Tärkeä!)',
                items: [
                    { id: 'o_d1', text: '✅ Toistuvuus: 3-5+ kertaa viikossa/kuukaudessa' },
                    { id: 'o_d2', text: '✅ Kohdentuminen: Vain sinuun, ei muihin' },
                    { id: 'o_d3', text: '✅ Vaikutus: Suorituksesi tai hyvinvointisi laskee' }
                ]
            },
            {
                category: 'Omat reaktiot',
                items: [
                    { id: 'o_r1', text: 'Poissaolot lisääntyvät (sairasloma, etätyöpäivät)' },
                    { id: 'o_r2', text: 'Vältät tiettyjä ihmisiä tai tilanteita aktiivisesti' },
                    { id: 'o_r3', text: 'Suorituksesi laskee huolimatta yrityksistä' }
                ]
            }
        ],
        checkYourself: 'Oletko kertonut jollekulle tilanteesta? Jos et → aika puhua luottamushenkilölle',
        whatToDo: [
            'Tallenna kaikki sähköpostit ja viestit erilliseen kansioon',
            'Tunnista todistajat - ketkä olivat paikalla?',
            'Ota yhteyttä ammattiliittoon TAI työsuojeluun (et tarvitse molempia heti)',
            'Varaa aika työterveyteen oireiden kirjaamiseksi'
        ]
    },
    {
        color: 'red',
        title: 'PUNAINEN - Vakavat vaarat',
        subtitle: 'Kriisi ja terveysvaara',
        description: 'Tilanne on terveydelle vaarallinen. Kyse ei ole enää "konfliktista" vaan väkivallasta.',
        signs: [
            {
                category: 'Pelko hallitsee',
                items: [
                    { id: 'r_p1', text: 'Pelkäät kostotoimia jos puhut' },
                    { id: 'r_p2', text: 'Et uskalla käyttää oikeuksiasi (esim. sairasloma)' },
                    { id: 'r_p3', text: 'Harkitset lopettamista ilman uutta työpaikkaa' }
                ]
            },
            {
                category: 'Fyysiset merkit',
                items: [
                    { id: 'r_f1', text: 'Unettomuus tai painajaiset työstä' },
                    { id: 'r_f2', text: 'Vatsavaivat ennen töihin lähtöä' },
                    { id: 'r_f3', text: 'Paniikkikohtaukset, sydämentykytys' },
                    { id: 'r_f4', text: 'Jatkuva väsymys huolimatta levosta' }
                ]
            },
            {
                category: 'Eristäytyminen laajenee',
                items: [
                    { id: 'r_e1', text: 'Et puhu kenellekään tilanteesta (häpeä/syyllisyys)' },
                    { id: 'r_e2', text: 'Olet lopettanut muut harrastukset/sosiaaliset suhteet' },
                    { id: 'r_e3', text: 'Perheesi tai ystäväsi ovat huolissaan' }
                ]
            }
        ],
        checkYourself: 'Tuntuuko että sinulla ei ole ulospääsyä? Jos kyllä → hae apua NYT',
        whatToDo: [
            'Soita kriisipuhelimeen NYT (ei "kohta" tai "huomenna")',
            'Harkitse välitöntä sairauslomaa - tämä ON sairaus',
            'Kerro jollekulle läheiselle - ÄLÄ ole yksin tämän kanssa',
            'Poistu tilanteesta fyysisesti jos mahdollista'
        ]
    }
];

export const powerScaleItems = [
    { id: 'ps1', text: 'Esimiehesi' },
    { id: 'ps2', text: 'Vanhempi kollega' },
    { id: 'ps3', text: 'Vaikutusvaltainen henkilö' },
    { id: 'ps4', text: 'Joku jolla on pääsy resursseihin/tietoon' }
];

export interface grayAreaScenario {
    id: number;
    text: string;
    options: {
        id: string;
        text: string;
        isCorrect?: boolean;
    }[];
    correctAnswer: string;
    explanation: string;
}

export const grayAreaScenarios: grayAreaScenario[] = [
    {
        id: 1,
        text: "Esihenkilösi sanoo palaverissa: 'No, eihän [sinun nimesi] tästä mitään ymmärrä' ja nauraa. Muut nauravat mukana. Kun sanot että se loukkasi, hän vastaa: 'Älä nyt ole noin herkkä, tämähän oli vaan vitsi!'",
        options: [
            { id: 'opt1', text: 'Normaalia työkulttuuria' },
            { id: 'opt2', text: 'Huono vitsi, ei kiusaamista' },
            { id: 'opt3', text: '🟡 Varhainen varoitusmerkki', isCorrect: true },
            { id: 'opt4', text: '🟠 Toistuva ongelma (jos näin käy usein)', isCorrect: true }
        ],
        correctAnswer: "🟡 tai 🟠 riippuen toistuvuudesta.",
        explanation: "Julkinen nöyryytys + DARVO (Deny, Attack, Reverse Victim & Offender). Tekijä kieltää loukkauksen ja syyttää uhria herkkyydestä."
    }
];
