
import { Phase } from "../types";

// NEUROSCENARIO: Päivä Neuroepätyypillisenä
// Focus: Energy Management, Sensory Overload, Misunderstandings
export const NEURO_SCENARIO: Record<string, Phase> = {
    START: {
        id: 'START',
        day: 1,
        time: '08:00',
        title: "Aamupala: Aistien hyökkäys",
        content: `
Saavut toimistolle. Avokonttori on jo täynnä ihmisiä. Kahvinkeitin sihisee, kollegat juttelevat, puhelin soi, joku kuuntelee musiikkia liian kovaa. Valot ovat kirkkaat loisteputkilamput. Tunnet jo aistien ylikuormituksen alkavan.

**Ajatuksesi:**
"Päänsärky alkaa jo. Miten jaksan tämän päivän? Pitäisikö sanoa jotain vai yrittää vain kestää?"

*(Tämä simulaatio havainnollistaa neuroepätyypillisen, kuten autismikirjon ja ADHD-henkilön (AuDHD), arkea työelämässä. Tavoitteesi on selvitä päivästä ilman loppuunpalamista ("burnout").)*
`,
        choices: [
            {
                id: 'masking',
                text: "Hymyile ja tervehdi kaikkia (Masking)",
                nextPhaseId: 'MEETING',
                effect: {
                    stats: {
                        physicalHealth: -15, // Energy loss
                        selfEsteem: -10, // Focus loss
                        teamAcceptance: 0 // Colleagues like it
                    },
                    logNote: "Maskasin aamulla sosiaalisesti, vaikka olin kuormittunut. Energia laski heti.",
                    customFeedback: "Työkaverit pitävät sinua mukavana, mutta energiasi romahti heti."
                }
            },
            {
                id: 'protect',
                text: "Mene suoraan työpisteelle ja laita kuulokkeet",
                nextPhaseId: 'MEETING',
                effect: {
                    stats: {
                        physicalHealth: +5, // Energy saved
                        selfEsteem: +10, // Focus gain
                        teamAcceptance: -10 // Misunderstood
                    },
                    logNote: "Suojasin itseäni kuulokkeilla. Kollegat vaikuttivat nyrpeiltä.",
                    customFeedback: "Säästit energiaa, mutta kollegat pitävät sinua etäisenä."
                }
            },
            {
                id: 'ask_quiet',
                text: "Pyydä hiljaista työtilaa: 'Päänsärkyä, voisinko vetäytyä?'",
                nextPhaseId: 'MEETING',
                effect: {
                    stats: {
                        physicalHealth: +10,
                        teamAcceptance: -5 // Some might think you complain
                    },
                    logNote: "Pyysin hiljaista tilaa päänsäryn varjolla.",
                    customFeedback: "Sait rauhan, mutta joku saattoi ajatella sinun valittavan."
                }
            },
            {
                id: 'truth',
                text: "Kerro sensorisista haasteista avoimesti",
                nextPhaseId: 'MEETING',
                effect: {
                    stats: {
                        physicalHealth: +20,
                        teamAcceptance: +15, // Initial respect for honesty (if lucky)
                        hope: +10
                    },
                    logNote: "Kerroin avoimesti sensorisista haasteistani.",
                    customFeedback: "Rohkea veto! Osa ymmärsi, ja olosi keveni."
                }
            }
        ]
    },

    MEETING: {
        id: 'MEETING',
        day: 1,
        time: '09:30',
        title: "Aamupäivän palaveri: Yllätys!",
        content: `
Projektipäällikkö kutsuu spontaanin palaverin. Et saanut agendaa etukäteen. Palaverissa pomo kysyy *"mitä mieltä olet kampanjasta?"* mutta et ole ehtinyt prosessoida tietoa. Tarvitsisit aikaa ajatella, mutta kaikki katsovat sinua.

**Ajatuksesi:**
"En ole valmis. Tarvitsisin sen agendan etukäteen. Miksi he eivät voi vain lähettää sähköpostia?"

**Työkaverin väärinkäsitys:**
"Alex ei osallistu. Ehkä hänellä ei ole mielipiteitä. Ehkä hän ei välitä työstä."
`,
        choices: [
            {
                id: 'honest_delay',
                text: "Sano: 'Tarvitsen hetken ajatella. Voinko vastata sähköpostilla?'",
                nextPhaseId: 'LUNCH',
                effect: {
                    stats: {
                        hope: +10,
                        selfEsteem: +5, // Focus
                        teamAcceptance: -10 // Misunderstood
                    },
                    logNote: "Pyysin vastausaikaa sähköpostitse. Pomo näytti hämmentyneeltä.",
                    customFeedback: "Suojelit itseäsi, mutta pomo saattoi tulkita sen valmistautumattomuudeksi."
                }
            },
            {
                id: 'masking_fake',
                text: "Yritä keksiä jotain älykästä heti (Masking)",
                nextPhaseId: 'LUNCH',
                effect: {
                    stats: {
                        teamAcceptance: +5,
                        physicalHealth: -10, // Stress
                        hope: -5 // Fake feeling
                    },
                    logNote: "Pakotin itseni puhumaan palaverissa ilman valmistautumista.",
                    customFeedback: "Selvisit tilanteesta, mutta tunnet itsesi huijariksi ja olet stressaantunut."
                }
            },
            {
                id: 'ask_agenda',
                text: "Vaadi muutosta: 'Voisitteko lähettää agendan etukäteen jatkossa?'",
                nextPhaseId: 'LUNCH',
                effect: {
                    stats: {
                        teamAcceptance: +10, // Professional request actually
                        hope: +10 // Taking control
                    },
                    logNote: "Pyysin agendoja etukäteen prosessoinnin tueksi.",
                    customFeedback: "Hyvä pyyntö! Moni muukin huokaisi helpotuksesta."
                }
            }
        ]
    },

    LUNCH: {
        id: 'LUNCH',
        day: 1,
        time: '12:00',
        title: "Lounasaika: Sosiaalinen miinakenttä",
        content: `
Kollegat pyytävät sinua lounaalle. Ruokala on meluisa ja täynnä ihmisiä. Tiedät että **sosiaalinen tilanne + sensorinen ylikuormitus = täydellinen resepti loppupäivän romahdukseen.**

**Ajatuksesi:**
"Haluan olla mukava työkaveri, mutta tiedän että burnout on tulossa jos menen."

**Työkaverin väärinkäsitys:**
"Alex ei halua viettää aikaa meidän kanssa. Ehkä hän ei pidä meistä."
`,
        choices: [
            {
                id: 'masking_lunch',
                text: "Mene mukaan ja yritä hymyillä (Masking)",
                nextPhaseId: 'DEADLINE',
                effect: {
                    stats: {
                        teamAcceptance: +10,
                        physicalHealth: -25, // HUGE DROP
                        selfEsteem: -20 // Focus ruined for afternoon
                    },
                    logNote: "Menin meluisaan lounaaseen miellyttääkseni muita.",
                    customFeedback: "Kollegat tykkäsivät, mutta olet aivan poikki. Iltapäivä on vaarassa."
                }
            },
            {
                id: 'refuse',
                text: "Kieltäydy suoraan: 'Kiitos, syön yksin.'",
                nextPhaseId: 'DEADLINE',
                effect: {
                    stats: {
                        physicalHealth: +15, // Recovery
                        selfEsteem: +10,
                        teamAcceptance: -15
                    },
                    logNote: "Kieltäydyin lounaasta palautuakseni.",
                    customFeedback: "Sait levätä, mutta kollegat pitävät sinua nyt erakoituneena."
                }
            },
            {
                id: 'explain_quiet',
                text: "Selitä: 'Tarvitsen hiljaisen hetken palautuakseni.'",
                nextPhaseId: 'DEADLINE',
                effect: {
                    stats: {
                        physicalHealth: +15,
                        teamAcceptance: +5 // Understanding slightly up
                    },
                    logNote: "Selitin tarpeeni hiljaiselle hetkelle.",
                    customFeedback: "Rehellisyys kannatti. Osa ymmärsi, ja saat levätä."
                }
            }
        ]
    },

    DEADLINE: {
        id: 'DEADLINE',
        day: 1,
        time: '14:00',
        title: "Iltapäivän Deadline: Hyperfokus vaarassa",
        content: `
Sinulla on deadline klo 16. Olet **hyperfokuksessa** ja teet parasta työtäsi. Yhtäkkiä kollega tulee kysymään "hetkeksi" jotain "pientä".

Tiedät että keskeytys tuhoaa fokuksesi ja vie 20 minuuttia päästä takaisin samaan tilaan.

**Ajatuksesi:**
"Ei nyt! Olin juuri flow-tilassa."
`,
        choices: [
            {
                id: 'allow_interrupt',
                text: "Ota kuulokkeet pois ja auta (Masking)",
                nextPhaseId: 'FEEDBACK',
                effect: {
                    stats: {
                        teamAcceptance: +10,
                        selfEsteem: -30, // Focus destroyed
                        hope: -15 // Stress about deadline
                    },
                    logNote: "Annoin keskeyttää itseni flow-tilassa.",
                    customFeedback: "Autoit kaveria, mutta oma työsi kärsii pahasti. Deadline pelottaa."
                }
            },
            {
                id: 'block',
                text: "Sano: 'Minulla on deadline, en voi nyt.'",
                nextPhaseId: 'FEEDBACK',
                effect: {
                    stats: {
                        selfEsteem: +10, // Focus kept
                        hope: +5,
                        teamAcceptance: -20
                    },
                    logNote: "Kieltäydyin avusta deadlinen takia.",
                    customFeedback: "Työsi etenee loistavasti, mutta kollega loukkaantui töykeydestäsi."
                }
            },
            {
                id: 'negotiate',
                text: "Neuvottele: 'Olen fokuksessa, tulen klo 16 jälkeen.'",
                nextPhaseId: 'FEEDBACK',
                effect: {
                    stats: {
                        selfEsteem: +10,
                        teamAcceptance: +5,
                        hope: +5
                    },
                    logNote: "Siirsin avunannon deadline-ajan jälkeiseksi.",
                    customFeedback: "Täydellinen ratkaisu! Säilytit fokuksen etkä polttanut siltoja."
                }
            }
        ]
    },

    FEEDBACK: {
        id: 'FEEDBACK',
        day: 1,
        time: '15:30',
        title: "Palautekeskustelu",
        content: `
Esimies sanoo: *"Alex, sinä olet lahjakas, mutta joskus vaikutat... etäiseltä. Ehkä voisit olla enemmän 'osa tiimiä'."*

**Esimiehen väärinkäsitys:**
"Alex ei hymyile tarpeeksi. Hän ei osallistu small talkiin. Ehkä hänellä on asenneongelmia."

**Totuus:**
Keskityt työhön, et sosiaalisiin rituaaleihin. Tämä on neurologiaa, ei asennetta.
`,
        choices: [
            {
                id: 'apologize',
                text: "Pyydä anteeksi ja lupaa tsempata (Masking)",
                nextPhaseId: 'EVENING',
                effect: {
                    stats: {
                        physicalHealth: -20,
                        hope: -20 // Not authentic
                    },
                    logNote: "Lupasin olla sosiaalisempi, vaikka se uuvuttaa minua.",
                    customFeedback: "Esimies on tyytyväinen, mutta olet matkalla kohti burnoutia."
                }
            },
            {
                id: 'defend',
                text: "Puolustaudu: 'Teen työni hyvin, sosiaalisuus on toissijaista.'",
                nextPhaseId: 'EVENING',
                effect: {
                    stats: {
                        hope: +10, // Authentic
                        teamAcceptance: -20 // Conflict
                    },
                    logNote: "Puolustin työsuoritustani, mutta vaikutin hyökkäävältä.",
                    customFeedback: "Olit rehellinen, mutta esimies saattoi leimata sinut 'hankalaksi'."
                }
            },
            {
                id: 'reveal',
                text: "Kerro totuus: 'Olen neuroerilainen. Sosiaalisuus kuormittaa.'",
                nextPhaseId: 'EVENING',
                effect: {
                    stats: {
                        teamAcceptance: +20, // If understood (simulating success here mostly)
                        hope: +20,
                        physicalHealth: +10
                    },
                    logNote: "Kerroin esimiehelle neuroerilaisuudestani.",
                    customFeedback: "Riskialtis veto, mutta nyt esimies ymmärtää miksi olet 'etäinen'. Käännekohta!"
                }
            }
        ]
    },

    EVENING: {
        id: 'EVENING',
        day: 1,
        time: '17:00',
        title: "Päivän Ehtoo",
        content: `
Olet selvinnyt päivästä. Tarkista mittarisi.

Jos **Energiasi** (Patteri) on alhainen, olet vaarassa palaa loppuun.
Jos **Työkaverien Ymmärrys** on alhainen, olet vaarassa tulla syrjityksi.

Miten jatkat tästä?

**Totuus:**
Masking ja sensoriset ärsykkeet kuluttavat neuromoninaista työntekijää 2-3x enemmän.

Valitse tiesi tulevaisuuteen:
`,
        choices: [
            {
                id: 'continue',
                text: "Jatka samaa rataa ('Kyllä minä pärjään')",
                nextPhaseId: 'END_BURNOUT',
                effect: {
                    stats: { physicalHealth: -100 } // Total crash
                }
            },
            {
                id: 'occupational_health',
                text: "Hakeudu Työterveyshuoltoon ja pyydä mukautuksia",
                nextPhaseId: 'END_SUCCESS',
                effect: {
                    stats: { physicalHealth: +50, hope: +50 }
                }
            },
            {
                id: 'quit',
                text: "Etsi uusi, parempi työpaikka",
                nextPhaseId: 'END_NEWJOB',
                effect: {
                    stats: { hope: +20 }
                }
            }
        ]
    },

    // ENDINGS
    END_BURNOUT: {
        id: 'END_A', // Mapping to GameEngine types
        day: 30,
        title: "Lopputulos: Burnout",
        content: "Burnout", // Placeholder, content rendered by GameEngine special handling
        choices: []
    },
    END_SUCCESS: {
        id: 'END_C',
        day: 30,
        title: "Lopputulos: Tasapaino",
        content: "Success",
        choices: []
    },
    END_NEWJOB: {
        id: 'END_B',
        day: 30,
        title: "Lopputulos: Uusi alku",
        content: "New Job",
        choices: []
    }
};
