import { Phase } from "../types";

export const INFORMATION_SHADOW_SCENARIO: Record<string, Phase> = {
    START: {
        id: 'START',
        day: 1,
        time: '10:00',
        title: "Pudonnut langanpää",
        content: `
Olet tiimin jäsen ja vastuullasi on projektin X osuus A. Huomaat aamulla, että muut puhuvat jostain "uudesta suunnasta", josta sinulla ei ole aavistustakaan.

**Ajatuksesi:**
"Mistä he puhuvat? Tarkistin sähköpostit ja Slackin, ei mitään. Onko taas pidetty 'epävirallinen' palaveri keittiössä?"

**Tilanne:**
Olet joutunut **informaatiovarjoon**. Sinulta ei kielletä tietoa suoraan, mutta sitä ei myöskään aktiivisesti jaeta sinulle.
`,
        choices: [
            {
                id: 'ask_politely',
                text: "Kysy suoraan: 'Huomasin että suunnitelma on muuttunut, voitteko päivittää minut?'",
                nextPhaseId: 'THE_SOCIAL_GATE',
                effect: {
                    stats: {
                        selfEsteem: +5,
                        teamAcceptance: +5
                    },
                    logNote: "Pyysin päivitystä muuttuneeseen suunnitelmaan. Kollega sanoi: 'Ai niin, unohdettiin sanoa...'",
                    customFeedback: "Hyvä aktiivisuus. Sait tiedon, mutta huomasit ettei se tullut automaattisesti."
                }
            },
            {
                id: 'ignore_and_wait',
                text: "Oleta että joku kertoo myöhemmin ja jatka omaa työtäsi",
                nextPhaseId: 'THE_SOCIAL_GATE',
                effect: {
                    stats: {
                        selfEsteem: -10,
                        hope: -5
                    },
                    logNote: "Huomasin tiedotuskatkoksen, mutta en reagoinut siihen heti.",
                    customFeedback: "Odottaessasi kuilu sinun ja muun tiimin välillä kasvaa. Information Shadow syvenee."
                }
            }
        ]
    },

    THE_SOCIAL_GATE: {
        id: 'THE_SOCIAL_GATE',
        day: 20,
        time: '12:30',
        title: "Kahvihuoneen valtarakenteet",
        content: `
Kaksi kollegaa puhuu projektista lounaalla. Kun astut huoneeseen, he hiljenevät ja vaihtavat puheenaihetta sääksi.

**Tunne:**
Tämä on klassinen **ostrakismin** merkki. Sinut on suljettu sosiaalisen piirin ulkopuolelle.

**Ajatuksesi:**
"Teinkö jotain väärin? Miksi he lopettivat puhumisen?"
`,
        choices: [
            {
                id: 'forced_entry',
                text: "Yritä väkisin mukaan keskusteluun: 'Oliko puhetta projektista?'",
                nextPhaseId: 'THE_MISSING_INVITE',
                effect: {
                    stats: {
                        teamAcceptance: -10,
                        selfEsteem: -5
                    },
                    logNote: "Yritin liittyä suljettuun keskusteluun. Vastaanotto oli kylmä.",
                    customFeedback: "Tunkeutuminen saattaa tuntua heistä hyökkäävältä, jos he haluavat pitää piirinsä suljettuna."
                }
            },
            {
                id: 'document_pattern',
                text: "Huomioi tilanne ja kirjaa se ylös havaintona",
                nextPhaseId: 'THE_MISSING_INVITE',
                effect: {
                    stats: {
                        selfEsteem: +10,
                        hope: +5
                    },
                    logNote: "Havaitsin sosiaalista ulossulkemista kahvihuoneessa. Kollegat X ja Y hiljenivät tullessani.",
                    customFeedback: "Tämä on tärkeää. Et ota syytä itseesi, vaan tarkkailet patternia ulkopuolisena."
                }
            }
        ]
    },

    THE_MISSING_INVITE: {
        id: 'THE_MISSING_INVITE',
        day: 50,
        time: '15:00',
        title: "Palaveri jota ei ollut",
        content: `
Kävelet neuvotteluhuoneen ohi ja näet koko tiimisi siellä - paitsi sinut. Myöhemmin selviää, että he pitivät "brainstormauksen", johon sinua "ei haluttu vaivata, koska olet niin keskittynyt työhösi".

**Viesti:**
He käyttävät neuromoninaisuuttasi (keskittymiskykyäsi) perusteluna sille, että sinut jätetään päätöksenteon ulkopuolelle. 

**Väite:** "Suojelimme vain sinun hyperfokus-tilaasi!"
`,
        choices: [
            {
                id: 'accept_protection',
                text: "Kiitä 'suojelusta' ja hyväksy selitys",
                nextPhaseId: 'END_ISOLATION',
                effect: {
                    stats: {
                        teamAcceptance: +5,
                        selfEsteem: -30,
                        hope: -20
                    },
                    logNote: "Hyväksyin selityksen ulossulkemiselle 'suojeluna'. Tunnen itseni hyödyttömäksi.",
                    customFeedback: "He saivat mitä halusivat: sinut pois päätöksenteosta ja sinun 'hyväksyntäsi' asialle."
                }
            },
            {
                id: 'assert_inclusion',
                text: "Ilmoita: 'Päätän itse milloin fokukseni tarvitsee suojelua. Haluan kutsun kaikkiin palavereihin.'",
                nextPhaseId: 'THE_FINAL_SHOWDOWN',
                effect: {
                    stats: {
                        selfEsteem: +20,
                        teamAcceptance: 0,
                        hope: +10
                    },
                    logNote: "Asetin rajan informaation saamiselle. Vaadin osallisuutta.",
                    customFeedback: "Vahva rajanveto! Palautit toimijuuden itsellesi."
                }
            }
        ]
    },

    THE_FINAL_SHOWDOWN: {
        id: 'THE_FINAL_SHOWDOWN',
        day: 80,
        time: '09:00',
        title: "Eristyksen murtaminen",
        content: `
Olet vaatinut informaatiota ja se tuntuu ärsyttävän muita. Sinuun aletaan suhtautua "vaativana" ja "hankalana".

**Sari (Pomo):** "Alex, tuntuu että olet kovin hyökkäävä tästä tiedon saamisesta. Miksi et voisi vain luottaa tiimiin?"

**Valinta:**
Nyt on aika esittää logi ja näyttää, kuinka monta kertaa olet jäänyt kriittisen tiedon ulkopuolelle.
`,
        choices: [
            {
                id: 'show_log',
                text: "Esitä logi: 'Tässä on 12 kertaa 3kk aikana, jolloin en saanut tietoa. Tämä ei ole luottamuspula, vaan järjestelmävirhe.'",
                nextPhaseId: 'END_NEW_START',
                effect: {
                    stats: {
                        hope: +40,
                        selfEsteem: +30
                    },
                    logNote: "Esitin lokin tiedonkulun katkoista. Pomo ei voinut enää sivuuttaa asiaa 'tunteena'.",
                    customFeedback: "Bingo! Faktoja vastaan on mahdotonta kiistellä tunteilla."
                }
            },
            {
                id: 'soften_stance',
                text: "Peräänny: 'Ehkä olen ollut vähän herkkä, anteeksi.'",
                nextPhaseId: 'END_SHADOW',
                effect: {
                    stats: {
                        selfEsteem: -40,
                        teamAcceptance: +20
                    },
                    logNote: "Peräännyin ja pyysin anteeksi olevani 'herkkä'. Information Shadow pysyy.",
                    customFeedback: "Sait sosiaalista rauhaa, mutta menetit oikeutesi tietoon ja ammatillisen uskottavuutesi."
                }
            }
        ]
    },

    // ENDINGS
    END_BURNOUT: {
        id: 'END_BURNOUT',
        day: 90,
        title: "Täydellinen eristys",
        content: "Burnout",
        choices: []
    },
    END_NEW_START: {
        id: 'END_NEW_START',
        day: 90,
        title: "Valo varjossa",
        content: "Success",
        choices: []
    },
    END_CONFLICT: {
        id: 'END_CONFLICT',
        day: 90,
        title: "Näkymätön työntekijä",
        content: "Conflict",
        choices: []
    }
};
