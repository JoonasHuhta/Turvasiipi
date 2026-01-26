import { Phase } from "../types";

export const PERFORMANCE_TRAP_SCENARIO: Record<string, Phase> = {
    'start': {
        id: 'start',
        day: 1,
        time: '09:00',
        title: "Keskustelu esimiehen kanssa",
        content: `
Olet aloittanut uudessa projektissa. Aistiyliherkkyytesi ja tarpeesi selkeisiin ohjeisiin ovat tärkeitä työkykysi kannalta. Päätät pyytää kohtuullisia mukautuksia, kuten oikeutta tehdä etätöitä tai käyttää melunvaimennuskuulokkeita.

**Esimies (Sari):** "Tottakai Alex, meillä on yhdenvertainen työyhteisö. Tee niin kuin sinulle on parasta, kunhan hommat hoituu."

**Ajatuksesi:**
"Tämä meni yllättävän helposti. Ehkä tämä onkin turvallinen paikka."
`,
        choices: [
            {
                id: 'log_agreement',
                text: "Kirjaa sopimus heti muistiin (Nepsy Log)",
                nextPhaseId: 'THE_ADJUSTMENT',
                effect: {
                    stats: {
                        selfEsteem: +10, // Confidence in process
                        hope: +5
                    },
                    logNote: "Kirjasin Sarin kanssa sovitut mukautukset (kuulokkeet, etätyö) muistiin 12.1. klo 9:05.",
                    customFeedback: "Hyvä! Dokumentointi on ensimmäinen puolustuslinjasi. Sait vahvistetun pohjan."
                }
            },
            {
                id: 'just_trust',
                text: "Luota sanaan ja jatka töitä",
                nextPhaseId: 'THE_ADJUSTMENT',
                effect: {
                    stats: {
                        selfEsteem: 0,
                        hope: +10
                    },
                    logNote: "Sari lupasi mukautukset suullisesti. Luotan että homma toimii.",
                    customFeedback: "Luottamus on hienoa, mutta työelämässä muisti on lyhyt ilman mustaa valkoisella."
                }
            }
        ]
    },

    THE_ADJUSTMENT: {
        id: 'THE_ADJUSTMENT',
        day: 15,
        time: '14:00',
        title: "Ensimmäinen särö",
        content: `
Olet tehnyt kaksi päivää viikossa etänä, kuten sovittiin. Tänään Sari kutsuu sinut palaveriin.

**Sari:** "Alex, tiimi on huomannut että olet paljon poissa. Vaikka sovittiin etätyöstä, tuntuu ettei informaatio kulje ja olet vähän 'eristyksissä'. Pitäisikö sinun olla enemmän paikalla näyttääksesi sitoutumistasi?"

**Tilanne:**
Olet tehnyt tulosta erinomaisesti, mutta Sari alkaa kyseenalaistaa sitoutumistasi sosiaalisten normien perusteella.
`,
        choices: [
            {
                id: 'give_in',
                text: "Luovu etätyöstä osoittaaksesi sitoutumista",
                nextPhaseId: 'CRUNCH_TIME',
                effect: {
                    stats: {
                        physicalHealth: -20, // Health suffers
                        selfEsteem: -10,
                        teamAcceptance: +10
                    },
                    logNote: "Luovuin etätyöstä Sarin paineen alla. Olo on jo nyt uupunut.",
                    customFeedback: "Säästit 'naamarasi' kollegoiden silmissä, mutta poltit omaa kynttilääsi molemmista päistä."
                }
            },
            {
                id: 'refer_agreement',
                text: "Viittaa aiempaan sopimukseen ja lakiin",
                nextPhaseId: 'CRUNCH_TIME',
                effect: {
                    stats: {
                        selfEsteem: +20,
                        teamAcceptance: -10, // Some tension
                        hope: +10
                    },
                    logNote: "Muistutin Saria sovitusta ja Yhdenvertaisuuslaista. Sari vaikutti nyrpeältä.",
                    customFeedback: "Rohkeaa! Asetit rajan. Sari ei ehkä tykännyt, mutta tiesi ettet ole 'helppo kohde'."
                }
            }
        ]
    },

    CRUNCH_TIME: {
        id: 'CRUNCH_TIME',
        day: 45,
        time: '10:00',
        title: "Suoritusarviointi ja 'Trap'",
        content: `
Projekti on loppusuoralla. Sari kutsuu sinut väliarviointiin. Hänellä on edessään lista.

**Sari:** "Alex, olet tehnyt teknisesti hyvää työtä, mutta olemme huolissamme 'tiimipelistäsi'. Koska käytät niitä kuulokkeita, et ole kuululla kun puhumme asioista. Ja ne etäpäivät... ne näyttävät siltä, ettet halua olla osa porukkaa. Olemme päättäneet asettaa sinut 'seurantaan' suorituskyvyn takia."

**Trap:**
Mukautukset, jotka Sari itse hyväksyi, on nyt käännetty "heikkouksiksi". Tästä alkaa 'Performance Trap'.
`,
        choices: [
            {
                id: 'ask_evidence',
                text: "Kysy konkreettisia todisteita heikosta tuloksesta",
                nextPhaseId: 'LEGAL_FIGHT',
                effect: {
                    stats: {
                        selfEsteem: +15,
                        hope: +5
                    },
                    logNote: "Vaadin konkretiaa suoritusarviointiin. Sari meni hiljaiseksi.",
                    customFeedback: "Loistava taktinen liike! Bully perääntyy, kun heidät pakotetaan faktoihin subjektivisuuden sijaan."
                }
            },
            {
                id: 'mask_harder',
                text: "Lupaa yrittää 'normaalimmin' (Masking)",
                nextPhaseId: 'END_BURNOUT',
                effect: {
                    stats: {
                        physicalHealth: -50,
                        selfEsteem: -30,
                        hope: -20
                    },
                    logNote: "Lupasin maskata enemmän säilyttääkseni työpaikan. En usko että jaksan.",
                    customFeedback: "Yrität mukautua mahdottomaan. Tämä tie johtaa uupumiseen."
                }
            }
        ]
    },

    LEGAL_FIGHT: {
        id: 'LEGAL_FIGHT',
        day: 60,
        time: '11:00',
        title: "Vastahyökkäys",
        content: `
Olet kerännyt logia kaikista keskusteluista. Sari lähettää virallisen varoituksen "kommunikaatio-ongelmista".

**Sinun siirtosi:**
Sinulla on näyttöä siitä, että ongelmat johtuvat Sarin epäselvistä ohjeista ja sovittujen mukautusten kieltämisestä.
`,
        choices: [
            {
                id: 'union_contact',
                text: "Ota yhteys liittoon ja esitä dokumentaatio",
                nextPhaseId: 'END_NEW_START',
                effect: {
                    stats: {
                        hope: +40,
                        selfEsteem: +30
                    },
                    logNote: "Vein asian liittoon. Dokumentointi oli ratkaisevassa roolissa.",
                    customFeedback: "Voitto! Kun faktoja on tarpeeksi, mielivaltainen kohtelu ei kestä tarkastelua."
                }
            },
            {
                id: 'informal_threat',
                text: "Uhkaili Saria suoraan oikeustoimilla",
                nextPhaseId: 'END_CONFLICT',
                effect: {
                    stats: {
                        selfEsteem: +10,
                        teamAcceptance: -50
                    },
                    logNote: "Uhkarohkea veto. Sari pelästyi, mutta ilmapiiri on nyt myrkkyä.",
                    customFeedback: "Sait Sarin perääntymään, mutta siltoja paloi matkalla."
                }
            }
        ]
    },

    // ENDINGS
    END_BURNOUT: {
        id: 'END_BURNOUT',
        day: 90,
        title: "Uupumuksen varjo",
        content: "Burnout",
        choices: []
    },
    END_NEW_START: {
        id: 'END_NEW_START',
        day: 90,
        title: "Oikeuden voitto",
        content: "Success",
        choices: []
    },
    END_CONFLICT: {
        id: 'END_CONFLICT',
        day: 90,
        title: "Yksinäinen taistelu",
        content: "Conflict",
        choices: []
    }
};
