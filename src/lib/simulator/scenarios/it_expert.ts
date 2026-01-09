import { Phase } from "../types";

export const IT_EXPERT_SCENARIO: Record<string, Phase> = {
    // --- PÄIVÄ 1: ALKU ---
    'start': {
        id: 'start',
        day: 1,
        time: '09:00',
        location: 'Toimisto',
        title: 'Uusi projekti',
        content: `Aloitat uuden projektin senior-kehittäjänä. Tiimi on innostunut, mutta projektipäällikkö Kari pudottaa uutisen.

KARI: "Asiakas haluaa tämän valmiiksi kolmessa kuukaudessa. Tiedän, se on tiukka, mutta me ollaan huipputiimi. Meiltä odotetaan nyt sankaritekoja."

Lasket mielessäsi, että se vaatisi 12-tuntisia päiviä joka päivä.`,
        choices: [
            {
                id: 'express_concern',
                text: 'Ilmaise huolesi aikataulusta heti',
                nextPhaseId: 'day10_technical_debt',
                effect: {
                    stats: { hope: 80, teamAcceptance: 60 },
                    logNote: 'Päivä 1: Ilmaisin huoleni mahdottomasta aikataulusta. Kari sanoi että "asenne ratkaisee".'
                }
            },
            {
                id: 'accept_challenge',
                text: '"Selvä, kääritään hihat!" (Hero mode)',
                nextPhaseId: 'day10_technical_debt',
                effect: {
                    stats: { selfEsteem: 90, teamAcceptance: 80, hope: 95 },
                    logNote: 'Päivä 1: Päätin ottaa haasteen vastaan. Tuntuu hyvältä olla tärkeä.'
                }
            }
        ]
    },

    // --- PÄIVÄ 10: TEKNINEN VELKA ---
    'day10_technical_debt': {
        id: 'day10_technical_debt',
        day: 10,
        time: '14:00',
        location: 'Koodikatselmointi',
        title: 'Oikopolut',
        content: `Ehdotat projektipalaverissa, että arkkitehtuuri pitää tehdä kunnolla, jotta vältetään tekninen velka. Kari keskeyttää.

KARI: "Meillä ei ole aikaa hienosteluun. Tee se nyt vain niin että se toimii. Me siivotaan jäljet sitten myöhemmin (joskus)."

Tiedät, että "myöhemmin" tarkoittaa ettei koskaan.`,
        choices: [
            {
                id: 'insist_quality',
                text: 'Väitä vastaan laadun puolesta',
                nextPhaseId: 'day25_extra_hours',
                effect: {
                    stats: { teamAcceptance: -10, selfEsteem: 10 },
                    logNote: 'Päivä 10: Kari vähätteli teknistä laatua. Hänen mukaansa nopeus on ainoa mikä merkitsee.'
                }
            },
            {
                id: 'just_do_it',
                text: 'Tee kuten käsketään, vaikka hävettää',
                nextPhaseId: 'day25_extra_hours',
                effect: {
                    stats: { selfEsteem: -15, shame: 20 },
                    logNote: 'Päivä 10: Tein huonoa koodia paineen alla. Ammattitaitoni tuntuu kärsivän.'
                }
            }
        ]
    },

    // --- PÄIVÄ 25: YLITYÖT ---
    'day25_extra_hours': {
        id: 'day25_extra_hours',
        day: 25,
        time: '20:30',
        location: 'Toimisto (yksin)',
        title: 'Iltavuoro',
        content: `Olet taas kerran toimistolla ilta-kahdeksalta. Kari tulee käymään ja katsoo hartioidesi yli.

KARI: "Hyvältä näyttää. Hei, huomasitko että Liisa on jo lähtenyt kotiin? Häneltä tuntuu puuttuvan se kuuluisa 'extra mile'. Onneksi sinuun voi luottaa."

Hän asettaa sinut ja kollegasi vastakkain.`,
        choices: [
            {
                id: 'defend_liisa',
                text: 'Puolusta Liisan työajan noudattamista',
                nextPhaseId: 'day40_gaslighting',
                effect: {
                    stats: { isolation: 10, hope: -5 },
                    logNote: 'Päivä 25: Kari yritti saada minut kilpailemaan Liisan kanssa ylitöistä. Kieltäydyin leikistä.'
                }
            },
            {
                id: 'stay_silent_hero',
                text: 'Hymyile väsyneenä ja jatka koodaamista',
                nextPhaseId: 'day40_gaslighting',
                effect: {
                    stats: { physicalHealth: -10, teamAcceptance: 10, selfEsteem: -5 },
                    logNote: 'Päivä 25: Otin "luottopelaajan" roolin vastaan. Selkään särkee jo.'
                }
            }
        ]
    },

    // --- PÄIVÄ 40: GASLIGHTING ---
    'day40_gaslighting': {
        id: 'day40_gaslighting',
        day: 40,
        time: '10:00',
        location: 'Neuvotteluhuone',
        title: 'Mielikuvitusmääräaika',
        content: `Kerrot Karille, että tiimi on uupumassa ja tilausmäärä on epärealistinen.

KARI: "Ehei, sä nyt vaan suurentelet asioita. Teit viime viikollakin tosi hyvää tahtia. Ehkä sulla on nyt vaan vähän huono päivä? Älä hätäile, mulla on kaikki hallinnassa."

Tunnet, että olet kadottamassa todellisuudentajusi.`,
        choices: [
            {
                id: 'show_metrics',
                text: 'Näytä data ja tehdyt tunnit',
                nextPhaseId: 'day55_physical_symptoms',
                effect: {
                    stats: { teamAcceptance: -20, selfEsteem: 5 },
                    logNote: 'Päivä 40: Kari kielsi uupumuksen olemassaolon. Hän sanoi minun "kuvittelevan" ongelmia.'
                }
            },
            {
                id: 'question_self',
                text: 'Mieti, oletko todellakin vain hidas?',
                nextPhaseId: 'day55_physical_symptoms',
                effect: {
                    stats: { selfEsteem: -30, shame: 40 },
                    logNote: 'Päivä 40: Aloin miettiä, onko vika minussa. Miksi en muka ehdi?'
                }
            }
        ]
    },

    // --- PÄIVÄ 55: OIREET ---
    'day55_physical_symptoms': {
        id: 'day55_physical_symptoms',
        day: 55,
        time: '04:00',
        location: 'Koti',
        isCrisis: true,
        title: 'Koodia unissa',
        content: `Heräät aamuyöllä. Päässäsi pyörii JavaScript-looppi, jota et saa katkaistua. Silmät ovat kuivat ja olet lihonut 5 kiloa, koska syöt vain noutoruokaa koneen ääressä.

Rintaa puristaa. Pelkäät, että huominen demo epäonnistuu.`,
        choices: [
            {
                id: 'work_from_bed',
                text: 'Avaa läppäri sängyssä varmistaaksesi korjaukset',
                nextPhaseId: 'day70_scapegoat',
                effect: {
                    stats: { physicalHealth: -30, hope: -20 },
                    logNote: 'Päivä 55: Työ valui sänkyyn asti. En pysty enää erottamaan työtä ja vapaata.'
                }
            },
            {
                id: 'try_to_breathe',
                text: 'Yritä hengittää ja jätä kone kiinni',
                nextPhaseId: 'day70_scapegoat',
                effect: {
                    stats: { selfEsteem: -10, hope: 5 },
                    logNote: 'Päivä 55: Olin lähellä paniikkikohtausta koodin takia. Päätin olla avaamatta konetta.'
                }
            }
        ]
    },

    // --- PÄIVÄ 70: SYYLLINEN ---
    'day70_scapegoat': {
        id: 'day70_scapegoat',
        day: 70,
        time: '15:00',
        location: 'Zoom-palaveri',
        title: 'Syntipukki',
        content: `Asiakkaan demo takkuilee, koska Kari pakotti julkaisemaan keskeneräistä koodia. Rehtori (tai toimitusjohtaja) vaatii vastauksia.

KARI: "Niin, asiantuntija tässä vastasi tästä osiosta. Mä kyllä sanoin että laatuun pitää panostaa, mutta tässä on lopputulos."

Kari heittää sinut bussin alle koko tiimin edessä.`,
        choices: [
            {
                id: 'call_out_lie',
                text: 'Kerro miten asiat oikeasti menivät',
                nextPhaseId: 'day85_isolation',
                effect: {
                    stats: { hope: 10, teamAcceptance: -40, isolation: 40 },
                    logNote: 'Päivä 70: Kari valehteli ja syytti minua epäonnistumisesta. Puolustauduin, mutta ilmapiiri myrkyttyi.'
                }
            },
            {
                id: 'take_the_heat',
                text: 'Pyydä anteeksi ja lupaa korjata (Uupumus syvenee)',
                nextPhaseId: 'day85_isolation',
                effect: {
                    stats: { selfEsteem: -50, shame: 80, hope: -30 },
                    logNote: 'Päivä 70: Otin syyn niskoilleni Karalta tulleen paineen vuoksi. En jaksa enää taistella.'
                }
            }
        ]
    },

    // --- PÄIVÄ 85: ERISTÄMINEN ---
    'day85_isolation': {
        id: 'day85_isolation',
        day: 85,
        time: '10:00',
        location: 'Slack',
        title: 'Hiljaiset kanavat',
        content: `Huomaat, että tärkeistä asioista päätetään Slack-kanavilla, joilla et ole mukana. Kari on alkanut antaa uusia tehtäviä suoraan sinun alapuolesi kehittäjille, ohittaen sinut täysin.

Kukaan ei vastaa viesteihisi "General"-kanavalla.`,
        choices: [
            {
                id: 'confront_kari',
                text: 'Kysy suoraan Karilta miksi sinut on sivuutettu',
                nextPhaseId: 'day90_peak_crisis',
                effect: {
                    stats: { isolation: 60, hope: -20 },
                    logNote: 'Päivä 85: Koulukiusaamisen aikuinen versio: sosiaalinen eristäminen ja gatekeeping.'
                }
            },
            {
                id: 'ignore_slack',
                text: 'Pysy vain omassa koodissasi (Näkymättömyys)',
                nextPhaseId: 'day90_peak_crisis',
                effect: {
                    stats: { isolation: 80, selfEsteem: -20 },
                    logNote: 'Päivä 85: Tunnen itseni haamuksi toimistolla.'
                }
            }
        ]
    },

    // --- PÄIVÄ 90: HUIPENNUS ---
    'day90_peak_crisis': {
        id: 'day90_peak_crisis',
        day: 90,
        time: '08:55',
        location: 'Parkkihalli',
        isCrisis: true,
        title: 'Kynnys',
        content: `Istut autossa toimiston parkkihallissa. Kätesi tärisevät ratilla. Tiedät, että tänään on taas uusi "hätätila", joka on itse aiheutettu.

IT-alalla 42 % harkitsee irtisanoutumista uupumuksen vuoksi. Psykologinen turvallisuus on kadonnut unohduksiin.

Astutko ulos autosta?`,
        choices: [
            {
                id: 'end_suffer',
                text: 'Pyyhi kyyneleet ja mene sisään (Burnout)',
                nextPhaseId: 'END_A',
                effect: {
                    stats: { physicalHealth: 0, hope: 0, shame: 100 },
                    logNote: 'Päivä 90: Menin sisään, mutta tiedän etten kestä enää viikkoakaan.'
                }
            },
            {
                id: 'end_quit',
                text: 'Laita viesti: "En tule enää koskaan." (Pelastus)',
                nextPhaseId: 'END_B',
                effect: {
                    stats: { hope: 50, selfEsteem: 60, isolation: -20 },
                    logNote: 'Päivä 90: Valitsin oman terveyteni koodirivien sijaan.'
                }
            },
            {
                id: 'end_fight_turvasiipi',
                text: 'Aktivoi Turvasiipi-raportti ja viestitä johdolle',
                nextPhaseId: 'END_C',
                effect: {
                    stats: { hope: 100, selfEsteem: 80 },
                    logNote: 'Päivä 90: Raportoin rakenteellisesta kiusaamisesta ja crunch-kulttuurista.'
                }
            }
        ]
    }
};
