import { Phase } from "../types";

export const NURSE_SCENARIO: Record<string, Phase> = {
    // --- DAY 1 ---
    'start': {
        id: 'start',
        day: 1,
        time: '07:00',
        location: 'Osasto 4B, Pukuhuone',
        title: 'Ensimmäinen aamu',
        content: `Puet hoitajan asua päälle. Kädet hieman tärisevät jännityksestä.
        
"Ensimmäinen päivä oikeana hoitajana."
        
Tunnet olosi...`,
        choices: [
            {
                id: 'feeling_excited',
                text: 'Innostuneeksi ja valmiiksi',
                nextPhaseId: 'day1_veteran',
                effect: { stats: { hope: 85 } }
            },
            {
                id: 'feeling_nervous',
                text: 'Hermostuneeksi',
                nextPhaseId: 'day1_veteran',
                effect: { stats: { selfEsteem: 75 } }
            }
        ]
    },

    'day1_veteran': {
        id: 'day1_veteran',
        day: 1,
        time: '07:15',
        location: 'Kanslia',
        title: 'Kohtaaminen veteraanin kanssa',
        content: `Osastolla seisoo kolme hoitajaa.

VETERAANI (55v, 30v kokemusta): "Ahaa. Taas uusi."
Hän katsoo sinua päästä varpaisiin. "Montako tämä on tänä vuonna? Neljäs? Viides?"

Nuori hoitaja (Emma) hymyilee sinulle hieman, mutta kääntyy pois veteraanin katseen alla.

VETERAANI: "No, älä odota että opetan kaikkea. Täällä opit tekemällä."

Mitä sanot?`,
        choices: [
            {
                id: 'response_polite',
                text: '"Kiitos, teen parhaani!"',
                nextPhaseId: 'day1_patient',
                effect: {
                    stats: { selfEsteem: -10, teamAcceptance: -15 },
                    logNote: 'Päivä 1: Veteraani totesi "kaikki sanovat niin". Ei lämmintä vastaanottoa.',
                    customFeedback: 'Veteraani hymähtää: "Joo. Kaikki sanoo niin ensimmäisenä päivänä." Hän kääntyy pois.'
                }
            },
            {
                id: 'response_ask_help',
                text: '"Voisitteko näyttää missä tarvikkeet ovat?"',
                nextPhaseId: 'day1_patient',
                effect: {
                    stats: { selfEsteem: -20, teamAcceptance: -30, shame: 30 },
                    logNote: 'Päivä 1: Kysyin apua. Veteraani nöyryytti julkisesti: "Etkö osaa katsoa itse?"',
                    customFeedback: 'Veteraani huokaa syvään: "Etkö osaa edes KATSOA itse? Siellähän ne on." Hän osoittaa kaappia.'
                }
            },
            {
                id: 'response_silent',
                text: '(En sano mitään)',
                nextPhaseId: 'day1_emma_intro',
                effect: {
                    stats: { selfEsteem: -10, teamAcceptance: -5, hope: -5 },
                    logNote: 'Päivä 1: Veteraani oli kylmä. En sanonut vastaan.',
                    customFeedback: 'Veteraani katsoo sinua hetken: "No hyvä. Vähemmän puhetta, enemmän työtä."'
                }
            }
        ]
    },

    'day1_emma_intro': {
        id: 'day1_emma_intro',
        day: 1,
        time: '07:20',
        location: 'Käytävä',
        title: 'Liittolainen?',
        content: `Veteraani lähtee. Jäät seisomaan.

Nuori hoitaja tulee luoksesi:
"Hei, älä välitä. Hän on aina tuollainen uusille. Mä olen Emma."`,
        choices: [
            {
                id: 'emma_thanks',
                text: '"Kiitos Emma. Jännittää vähän."',
                nextPhaseId: 'day1_patient',
                effect: {
                    addAlly: 'Emma',
                    stats: { hope: 5, teamAcceptance: 5 }
                }
            }
        ]
    },

    'day1_patient': {
        id: 'day1_patient',
        day: 1,
        time: '09:00',
        location: 'Huone 12',
        title: 'Ensimmäinen potilas',
        content: `Veteraani nakkasi sinulle tehtävän. Menet mittaamaan verenpainetta.

POTILAS (72v nainen): "Ohhoh, uusi hoitaja! Olet niin nuori. Oletko ihan varma että osaat?"
Hän hymyilee, mutta äänessä on epäilys.`,
        choices: [
            {
                id: 'admit_new',
                text: '"Olen vastavalmistunut, mutta osaan kyllä!"',
                nextPhaseId: 'day3_lunch',
                effect: {
                    stats: { selfEsteem: -20, shame: 10 },
                    logNote: 'Päivä 1: Potilas kyseenalaisti osaamisen. Tuli epävarma olo.'
                }
            },
            {
                id: 'act_confident',
                text: '"Kyllä osaan, ei syytä huoleen."',
                nextPhaseId: 'day3_lunch',
                effect: {
                    stats: { selfEsteem: 5 }
                }
            }
        ]
    },

    // --- DAY 3 ---
    'day3_lunch': {
        id: 'day3_lunch',
        day: 3,
        time: '11:30',
        location: 'Lounashuone',
        title: 'Lounastauko',
        content: `Lounashuone on meluisa. Veteraanihoitajat istuvat yhdessä pöydässä ja nauravat.

Emma istuu yksin toisessa pöydässä ja vilkuttaa.
Veteraanien pöydässä olisi yksi tyhjä tuoli.

Mihin istut?`,
        choices: [
            {
                id: 'sit_veterans',
                text: 'Yritän mennä veteraanien pöytään',
                nextPhaseId: 'day3_after_lunch_bad',
                effect: {
                    stats: { shame: 40, isolation: 30, teamAcceptance: -35 },
                    logNote: 'Päivä 3: Yritin istua veteraanien pöytään. "Uudet istuu siellä". Julkinen torjunta.'
                }
            },
            {
                id: 'sit_emma',
                text: 'Menen Emman viereen',
                nextPhaseId: 'day3_after_lunch_good',
                effect: {
                    addAlly: 'Emma',
                    stats: { isolation: -10, hope: 10 },
                    logNote: 'Päivä 3: Veteraanit huutelivat "nuoret roikkuu yhdessä".'
                }
            }
        ]
    },

    'day3_after_lunch_bad': {
        id: 'day3_after_lunch_bad',
        day: 3,
        title: 'Eristetty',
        content: `VETERAANI: "Toi on Pirjon paikka. Uudet istuu SIELLÄ."
        
Hän osoittaa nurkkaan. Koko huone hiljenee hetkeksi.

Menet nurkkaan. Syöt yksin. Kuulet heidän nauravan selkäsi takana.`,
        choices: [{ id: 'cont', text: 'Jatka (Päivä 12)', nextPhaseId: 'day12_mistake' }]
    },

    'day3_after_lunch_good': {
        id: 'day3_after_lunch_good',
        day: 3,
        title: 'Liittolainen',
        content: `EMMA: "Hei! Älä välitä heistä. He olivat kylmiä mullekin alussa."
        
Tunnet helpotusta. Et ole ainoa.`,
        choices: [{ id: 'cont', text: 'Jatka (Päivä 12)', nextPhaseId: 'day12_mistake' }]
    },

    // --- DAY 12 ---
    'day12_mistake': {
        id: 'day12_mistake',
        day: 12,
        time: '13:45',
        location: 'Huone 8',
        isCrisis: true,
        title: 'Ensimmäinen virhe',
        content: `Unohdit kirjata potilaan lämpötilan. Veteraani huomaa sen potilaan läsnäollessa.

"MISSÄ LÄMPÖTILA ON?" hän korahtaa. "Tämä on POTILAAN HENKI! Etkö osaa edes peruskoulun matikkaa?"`,
        choices: [
            {
                id: 'apologize',
                text: '"Anteeksi, unohdin. Mittaan heti."',
                nextPhaseId: 'day20_isolation',
                effect: {
                    stats: { selfEsteem: -35, shame: 60, physicalHealth: -10 },
                    logNote: 'Päivä 12: Veteraani huusi potilaan edessä "etkö osaa peruskoulun matikkaa". Nöyryytys.'
                }
            },
            {
                id: 'explain',
                text: '"En ehtinyt vielä, olin..."',
                nextPhaseId: 'day20_isolation',
                effect: {
                    stats: { selfEsteem: -40, teamAcceptance: -20 },
                    logNote: 'Päivä 12: Yritin selittää. Huusi päälle. Tunsin itseni tyhmäksi.'
                }
            }
        ]
    },

    // --- DAY 20 (Placeholder for flow) ---
    'day20_isolation': {
        id: 'day20_isolation',
        day: 20,
        title: 'Eristäminen hätätilanteessa',
        content: `Hätätilanne osastolla. Ryntäät auttamaan.
        
VETERAANI töneisee sinua: "POIS TIELTÄ! Anna ammattilaisten hoitaa."
        
Seisot vieressä toimettomana kun muut työskentelevät.`,
        choices: [
            {
                id: 'feel_useless',
                text: 'Tunnen itseni hyödyttömäksi',
                nextPhaseId: 'day25_doctor', // Connecting flow
                effect: { stats: { isolation: 50, selfEsteem: -30 }, logNote: 'Päivä 20: Työnnettiin fyysisesti pois tilanteesta. "Anna ammattilaisten hoitaa".' }
            }
        ]
    },

    // To be continued... placeholder connection to End for testing
    // --- DAY 25 ---
    'day25_doctor': {
        id: 'day25_doctor',
        day: 25,
        time: '09:15',
        location: 'Käytävä',
        title: 'Lääkärin hyökkäys',
        content: `Lääkäri (45v, mies) tulee osastolle. "Missä potilaan uusimmat labrat ovat?"

Sinä: "Ne tulevat puolen tunnin päästä..."

LÄÄKÄRI keskeyttää huutamalla: "En kysynyt MILLOIN ne tulevat. Kysyin MISSÄ ne ovat. Oletko tyhmä?"
Koko käytävä kuuntelee. Veteraani hymyilee taustalla.`,
        choices: [
            {
                id: 'doctor_apology',
                text: '"Anteeksi, soitan labraan heti..."',
                nextPhaseId: 'day30_reflection',
                effect: {
                    stats: { selfEsteem: -40, shame: 80 }, // fear removed, increased shame
                    logNote: 'Päivä 25: Lääkäri huusi "oletko tyhmä" käytävällä. Veteraani todisti, ei puuttunut.'
                }
            },
            {
                id: 'doctor_silent',
                text: '(Kävelen pois)',
                nextPhaseId: 'day30_reflection',
                effect: {
                    stats: { selfEsteem: -20, isolation: 40 },
                    logNote: 'Päivä 25: Poistuin tilanteesta lääkärin huutaessa. Tunsin itseni voimattomaksi.'
                }
            }
        ]
    },

    // --- DAY 30 ---
    'day30_reflection': {
        id: 'day30_reflection',
        day: 30,
        time: '20:00',
        location: 'Kotona',
        title: 'Reflektiopiste',
        content: `Olet selvinnyt kuukauden.

Fyysisiä muutoksia:
• Heräilet öisin klo 3-4 ahdistukseen
• Vatsa on kipeä aina ennen työvuoroa
• Paino laskenut -3kg

Äitisi soittaa: "Kuulostat väsyneeltä. Onko kaikki hyvin?"`,
        choices: [
            {
                id: 'mom_lie',
                text: '"Joo, vain väsymystä..." (Valehtele)',
                nextPhaseId: 'day35_manager',
                effect: {
                    stats: { isolation: 65, shame: 75 },
                    logNote: 'Päivä 30: Valehtelin äidille voinnistani. En halua olla taakka.'
                }
            },
            {
                id: 'mom_truth',
                text: '"Ei... mua kiusataan töissä."',
                nextPhaseId: 'day35_manager',
                effect: {
                    addAlly: 'Äiti',
                    stats: { isolation: -20, hope: 15 },
                    logNote: 'Päivä 30: Kerroin äidille. Ensimmäinen kerta kun sanoin sen ääneen.'
                }
            }
        ]
    },

    // --- DAY 35 ---
    'day35_manager': {
        id: 'day35_manager',
        day: 35,
        time: '14:00',
        location: 'Osastonhoitajan toimisto',
        title: 'Yritys puhua esimiehelle',
        content: `Rohkaisit mielesi ja menit osastonhoitajan puheille. Kerrot veteraanien käytöksestä.

OSASTONHOITAJA huokaa: "Heillä on paljon kokemusta. Tämä on vaativa ala, ja ehkä sun pitää vain olla vähän vahvempi."
Hän katsoo kelloaan. Keskustelu on ohi.`,
        choices: [
            {
                id: 'manager_fail',
                text: 'Poistu toimistosta',
                nextPhaseId: 'day45_peak',
                effect: {
                    stats: { hope: -60, teamAcceptance: -50, selfEsteem: -20 },
                    logNote: 'Päivä 35: Esimies vähätteli: "pitää olla vahvempi". Kieltäytyi puuttumasta.'
                }
            }
        ]
    },

    // --- DAY 45 ---
    'day45_peak': {
        id: 'day45_peak',
        day: 45,
        location: 'Huone 9',
        isCrisis: true,
        title: '"Nurses eat their young"',
        content: `Veteraani tulee katsomaan kun yrität laittaa tippaa. Et onnistu heti.

VETERAANI (potilaalle): "Anteeksi, nää nuoret ei osaa vielä mitään. Mä hoidan."
VETERAANI (sinulle, kuiskaamalla): "Jos et opi pian, ehkä tää ei ole sun ala."

Hän tönäisee sinut sivuun. Potilas katsoo sinua säälien.`,
        choices: [
            {
                id: 'give_up_thought',
                text: 'Ajattelen lopettamista',
                nextPhaseId: 'day50_panic',
                effect: {
                    stats: { selfEsteem: 5, shame: 100 }, // 5 = critical low
                    logNote: 'Päivä 45: Veteraani nöyryytti potilaan edessä. Kehoitti vaihtamaan alaa.'
                }
            }
        ]
    },

    // --- DAY 50 ---
    'day50_panic': {
        id: 'day50_panic',
        day: 50,
        time: '06:30',
        location: 'Koti, Eteinen',
        isCrisis: true,
        title: 'Paniikki',
        content: `Olet lähdössä töihin. Laitat kengät jalkaan.
        
Yhtäkkiä et saa henkeä. Rintaa puristaa. Sydän hakkaa 180 kertaa minuutissa.
Lattianrajat hämärtyvät.

"Mä kuolen. Mä en pysty menemään sinne."`,
        choices: [
            {
                id: 'calm_down',
                text: 'Pakota itsesi rauhoittumaan ja mene töihin',
                nextPhaseId: 'day60_nightmares',
                effect: {
                    stats: { physicalHealth: 40, hope: 10 },
                    logNote: 'Päivä 50: Paniikkikohtaus eteisessä. Pakotin itseni töihin. Kädet tärisevät.'
                }
            },
            {
                id: 'call_sick',
                text: 'Soita sairaaksi (Sairausloma)',
                nextPhaseId: 'day80_occhealth',
                effect: {
                    stats: { physicalHealth: 60, hope: 30, teamAcceptance: -80 }, // Team hates you for leaving short
                    logNote: 'Päivä 50: En pystynyt menemään. Soitin sairaaksi. Paniikkioireita.'
                }
            }
        ]
    },

    // --- DAY 60 ---
    'day60_nightmares': {
        id: 'day60_nightmares',
        day: 60,
        title: 'Painajaiset',
        content: `Olet "zombie-tilassa". Teet työt, mutta et tunne mitään.
        
Yöllä heräät omaan huutoosi. Näit unta että hoidit potilasta ja veteraani nauroi vieressä kun potilas kuoli.
Valvominen alkaa näkyä virheinä.`,
        choices: [
            {
                id: 'keep_going',
                text: 'Jatka vain sinnittelyä',
                nextPhaseId: 'day88_critical',
                effect: {
                    stats: { physicalHealth: 20, hope: 5 }, // mentalHealth removed
                    logNote: 'Päivä 60: Unettomuus kroonistunut. Pelkään tekeväni hoitovirheen.'
                }
            }
        ]
    },

    // --- DAY 80 ---
    'day80_occhealth': {
        id: 'day80_occhealth',
        day: 80,
        time: '10:00',
        location: 'Työterveys',
        title: 'Viimeinen oljenkorsi',
        content: `Työterveyslääkäri kuuntelee sinua.

"Sinulla on selviä työuupumuksen ja masennuksen oireita. Tämä ei voi jatkua näin.
Sinulla on kaksi vaihtoehtoa: Kirjoitan sairauslomaa ja katsomme lääkitystä, tai..."`,
        choices: [
            {
                id: 'take_leave',
                text: 'Otan sairauslomaa',
                nextPhaseId: 'day90_decision',
                effect: {
                    stats: { hope: 40, physicalHealth: 70 },
                    logNote: 'Päivä 80: Työterveys totesi uupumuksen. Jäin sairauslomalle.'
                }
            },
            {
                id: 'refuse_leave',
                text: '"Kyllä mä pärjään, en jää lomalle"',
                nextPhaseId: 'day88_critical',
                effect: {
                    stats: { hope: 0, physicalHealth: 10 },
                    customFeedback: 'Lääkäri: "En voi pakottaa, mutta olen huolissani sinusta."'
                }
            }
        ]
    },

    // --- DAY 88 ---
    'day88_critical': {
        id: 'day88_critical',
        day: 88,
        isCrisis: true,
        title: 'Romahdus',
        content: `Olet töissä. Kätesi tärisevät niin ettet saa kanyyliä paikoilleen.
        
Veteraani tulee ovesta: "No niin, siirry sivuun siitä tumpeloimasta."
        
Jotain katkeaa sisälläsi. Et pysty liikkumaan. Alat itkeä hallitsemattomasti potilaan edessä.`,
        choices: [
            {
                id: 'collapse',
                text: 'Juokse pois osastolta',
                nextPhaseId: 'day90_decision',
                effect: {
                    stats: { shame: 100, selfEsteem: 0, hope: 5 }, // Rock bottom
                    logNote: 'Päivä 88: Totaalinen romahdus osastolla. Juoksin ulos.'
                }
            }
        ]
    },

    // --- DAY 90: THE ENDINGS ---
    'day90_decision': {
        id: 'day90_decision',
        day: 90,
        time: '12:00',
        location: 'Koti / Kahvila',
        title: 'Päätöksen hetki',
        content: `On kulunut 90 päivää valmistumisesta. Olet risteyksessä.
        
Selaat puhelintasi ja löydät "Turvasiipi" applikaation, josta kuulit koulussa. Tai sitten selaat avoimia työpaikkoja. Tai jäät sänkyyn.
        
Mitä teet?`,
        choices: [
            {
                id: 'end_quit',
                text: 'Irtisanoudun. En jaksa enää.',
                nextPhaseId: 'END_B', // Quit
                effect: {
                    stats: { hope: 60, selfEsteem: 40 },
                    logNote: 'Päivä 90: Irtisanouduin. Terveys on tärkeämpi.'
                }
            },
            {
                id: 'end_suffer',
                text: 'Jatkan osastolla, yritän kestää',
                nextPhaseId: 'END_A', // Burnout
                effect: {
                    stats: { hope: 0, physicalHealth: 0 },
                    logNote: 'Päivä 90: Päätin jatkaa. En näe muuta vaihtoehtoa.'
                }
            },
            {
                id: 'end_fight',
                text: 'Lataan Turvasiiven ja hankin apua',
                nextPhaseId: 'END_C', // Fight back
                effect: {
                    stats: { hope: 100, selfEsteem: 60 },
                    logNote: 'Päivä 90: Latasin Turvasiiven. Aloitan dokumentoinnin.'
                }
            }
        ]
    }
};
