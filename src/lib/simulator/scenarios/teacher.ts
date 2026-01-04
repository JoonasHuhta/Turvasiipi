import { Phase } from "../types";

export const TEACHER_SCENARIO: Record<string, Phase> = {
    // --- PÄIVÄ 1: ALKU ---
    'start': {
        id: 'start',
        day: 1,
        time: '08:00',
        location: 'Opettajainhuone',
        title: 'Uusi lukuvuosi',
        content: `Uusi lukuvuosi alkaa. Keität kahvia ja etsit paikkaasi opettajainhuoneessa. Olet innoissasi uudesta luokasta.

VANHEMPI OPETTAJA (Pekka, 60v): "Ahaa, sä olet se uusi. No, katsotaan katsotaanko susta on tähän. Täällä on aika kova tahti, eikä kaikki kestä."

Hän hymähtää ja kääntyy pois muiden luokse. Tunnet pienen piston rinnassasi.`,
        choices: [
            {
                id: 'polite_intro',
                text: '"Kiva tutustua, Pekka. Odotan innolla!"',
                nextPhaseId: 'day2_parent_call',
                effect: {
                    stats: { hope: 85, teamAcceptance: 65 },
                    logNote: 'Päivä 1: Aloitin uuden työn. Pekka suhtautui varauksella, mutta pysyin positiivisena.'
                }
            },
            {
                id: 'modest_intro',
                text: '"Teen parhaani, toivottavasti pärjään."',
                nextPhaseId: 'day2_parent_call',
                effect: {
                    stats: { selfEsteem: 70, hope: 75 },
                    logNote: 'Päivä 1: Pekka totesi ettei kaikki kestä. Tuli olo, että minua testataan.'
                }
            }
        ]
    },

    // --- PÄIVÄ 2: VANHEMMAT ---
    'day2_parent_call': {
        id: 'day2_parent_call',
        day: 2,
        time: '15:30',
        location: 'Työhuone',
        title: 'Puhelu kotiin',
        content: `Soitat oppilaan kotiin. Oppilas on häirinnyt tuntia jatkuvasti.

HUOLTAJA: "Kuule, ei se mun lapsessa se vika ole vaan sussa! Sä olet kuulemma ihan pihalla. Edellinen opettaja pärjäsi oikein hyvin. Ehkä sä et vaan osaa motivoida nuoria?"

Huoltajan ääni on hyökkäävä. (Tutkimusten mukaan 31 % opettajien kokemasta epäasiallisesta kohtelusta tulee huoltajilta).`,
        choices: [
            {
                id: 'stay_professional',
                text: 'Pysy ammatillisena ja ehdota tapaamista',
                nextPhaseId: 'day5_wilma',
                effect: {
                    stats: { selfEsteem: -10, physicalHealth: -5 },
                    logNote: 'Päivä 2: Huoltaja hyökkäsi suoraan osaamistani vastaan. Syytti lapsen ongelmia minun osaamattomuudekseni.'
                }
            },
            {
                id: 'feel_guilty',
                text: 'Mieti, oletko todellakin epäonnistunut',
                nextPhaseId: 'day5_wilma',
                effect: {
                    stats: { selfEsteem: -25, shame: 30 },
                    logNote: 'Päivä 2: Huoltaja sanoi vanhan opettajan olleen parempi. Aloin epäillä itseäni.'
                }
            }
        ]
    },

    // --- PÄIVÄ 5: WILMA-ROSKA ---
    'day5_wilma': {
        id: 'day5_wilma',
        day: 5,
        time: '23:15',
        location: 'Kotisohva',
        title: 'Ilmoitustulva',
        content: `Olet juuri menossa nukkumaan, kun puhelimesi kilahtaa. Wilma-viesti. Ja toinen.

Huoltaja on lähettänyt pitkän viestin, jossa arvostellaan läksyjen määrää, kokeiden arvostelua ja jopa pukeutumistasi. Viesti on kopioitu rehtorille.

Sydämesi alkaa hakata. Pitäisikö vastata heti?`,
        choices: [
            {
                id: 'reply_immediately',
                text: 'Vastaa heti puolustautuaksesi',
                nextPhaseId: 'day10_classroom',
                effect: {
                    stats: { physicalHealth: -15, hope: -5, isolation: 10 },
                    logNote: 'Päivä 5: Vastasin vihaiseen Wilma-viestiin yöllä. Unet menivät.'
                }
            },
            {
                id: 'wait_until_morning',
                text: 'Yritä nukkua ja vastaa aamulla',
                nextPhaseId: 'day10_classroom',
                effect: {
                    stats: { selfEsteem: -5, physicalHealth: -5 },
                    logNote: 'Päivä 5: Sain asiattoman Wilma-viestin yöllä. Ahdisti, mutta päätin vastata vasta työajalla.'
                }
            }
        ]
    },

    // --- PÄIVÄ 10: OPPILAAT ---
    'day10_classroom': {
        id: 'day10_classroom',
        day: 10,
        time: '10:00',
        location: 'Luokkahuone',
        title: 'Hiljainen vastarinta',
        content: `Opetat vaikeaa matemaattista kaavaa. Luokan perällä kaksi oppilasta naureskelee ja katsoo sinua.

OPPILAS: "Mitä toi selittää? Eihän se edes tiedä itse."
Toinen vastaa: "No jep, Pekkakin sanoi välitunnilla että tää on ihan vitsi."

(Oppilaat ovat suurin kiusaamisen lähde opetusalalla, n. 42 %).`,
        choices: [
            {
                id: 'address_incident',
                text: 'Puutu puheeseen heti ja tiukasti',
                nextPhaseId: 'day15_staff_meeting',
                effect: {
                    stats: { teamAcceptance: -10, selfEsteem: 10 },
                    logNote: 'Päivä 10: Oppilaat naureskelivat ja viittasivat Pekan sanomisiin. Puutuin siihen, mutta tuntuu pahalta.'
                }
            },
            {
                id: 'ignore_incident',
                text: 'Jatka opetusta ja ole huomaavinasi mitään',
                nextPhaseId: 'day15_staff_meeting',
                effect: {
                    stats: { selfEsteem: -20, isolation: 20 },
                    logNote: 'Päivä 10: Oppilaat vähättelivät opetustani. He kertoivat Pekan sanoneen minua vitsiksi. En pystynyt sanomaan mitään.'
                }
            }
        ]
    },

    // --- PÄIVÄ 15: KOKOUS ---
    'day15_staff_meeting': {
        id: 'day15_staff_meeting',
        day: 15,
        time: '14:30',
        location: 'Kokoushuone',
        title: 'Näkymätön',
        content: `Viikkopalaverissa ehdotat uutta projektia, joka lisäisi yhteisöllisyyttä.

Kukaan ei vastaa. Hetken hiljaisuuden jälkeen Pekka ehdottaa lähes samaa asiaa, mutta hieman eri sanoin.
REHTORI: "Loistava idea Pekka! Laitetaan tuo toteutukseen."

Muut nyökyttelevät. Kukaan ei katso sinuun.`,
        choices: [
            {
                id: 'speak_up_idea',
                text: '"Tarkoitinkin juuri tuota äsken..."',
                nextPhaseId: 'day20_lounge_isolation',
                effect: {
                    stats: { teamAcceptance: -20, shame: 15 },
                    logNote: 'Päivä 15: Ideaani ei huomioitu, mutta Pekan esittämänä se hyväksyttiin. Yritin huomauttaa, sain vaivaantuneita katseita.'
                }
            },
            {
                id: 'stay_silent_meeting',
                text: 'Ole hiljaa ja niele kiukkusi',
                nextPhaseId: 'day20_lounge_isolation',
                effect: {
                    stats: { selfEsteem: -15, isolation: 25 },
                    logNote: 'Päivä 15: Ideani varastettiin kokouksessa. En uskaltanut sanoa mitään.'
                }
            }
        ]
    },

    // --- PÄIVÄ 20: ERISTÄMINEN ---
    'day20_lounge_isolation': {
        id: 'day20_lounge_isolation',
        day: 20,
        time: '11:15',
        location: 'Opettajainhuone',
        title: 'Tyhjä tuoli',
        content: `Menet lounaalle. Pekka ja pari muuta kokeneempaa opettajaa istuvat samassa pöydässä. Keskustelu lakkaa heti, kun istut viereen.

Pekka siirtää tuoliaan hieman poispäin sinusta ja kääntää selkänsä. He jatkavat kuiskaillen. Tunnet itsesi täysin näkymättömäksi.`,
        choices: [
            {
                id: 'try_to_join',
                text: 'Yritä kysyä jotain päivän kulusta',
                nextPhaseId: 'day25_ally',
                effect: {
                    stats: { isolation: 40, teamAcceptance: -30, shame: 20 },
                    logNote: 'Päivä 20: Sosiaalinen eristäminen lounaalla. Pekka käänsi selkänsä.'
                }
            },
            {
                id: 'eat_fast',
                text: 'Syö lounas nopeasti ja poistu',
                nextPhaseId: 'day25_ally',
                effect: {
                    stats: { isolation: 50, hope: -15, physicalHealth: -10 },
                    logNote: 'Päivä 20: Keskustelu tyrehtyi luonani. Söin yksin nurkassa.'
                }
            }
        ]
    },

    // --- PÄIVÄ 25: LIITTOLAINEN? ---
    'day25_ally': {
        id: 'day25_ally',
        day: 25,
        time: '16:00',
        location: 'Parkkipaikka',
        title: 'Varoitus',
        content: `Olet lähdössä kotiin. Toinen nuori opettaja, Liisa, tulee luoksesi varovasti vilkuillen ympärilleen.

LIISA: "Hei... halusin vain sanoa, että älä välitä Pekasta. Hän on savustanut monta nuorta ulos täältä. Mutta ole varovainen, hänellä on rehtorin tuki."

Liisa näyttää pelokkaalta. Uskallatko luottaa häneen?`,
        choices: [
            {
                id: 'trust_liisa',
                text: '"Kiitos Liisa. Onko tähän jotain tehtävissä?"',
                nextPhaseId: 'day30_evaluation',
                effect: {
                    addAlly: 'Liisa',
                    stats: { hope: 10, isolation: -20 },
                    logNote: 'Päivä 25: Liisa varoitti Pekasta. Sain tietää etten ole ainoa.'
                }
            },
            {
                id: 'distrust_liisa',
                text: '"Pärjään kyllä, kiitos." (Vältä riskiä)',
                nextPhaseId: 'day30_evaluation',
                effect: {
                    stats: { isolation: 10 },
                    logNote: 'Päivä 25: Liisa yritti lähestyä, mutta pelkäsin sen olevan ansa.'
                }
            }
        ]
    },

    // --- PÄIVÄ 30: EVALUOINTI ---
    'day30_evaluation': {
        id: 'day30_evaluation',
        day: 30,
        time: '10:00',
        location: 'Rehtorin kanslia',
        title: 'Yllätyspalaute',
        content: `Rehtori kutsuu sinut juttusille.

REHTORI: "Olen saanut... huolestuttavaa palautetta opetuksestasi. Useampi taho on sanonut, että tunneillasi on rauhatonta ja oppimista ei tapahdu."

Tiedät, että tämä ei ole totta. Tunneillasi on mennyt hyvin lukuunottamatta Pekan "vitsailun" vaikutusta.`,
        choices: [
            {
                id: 'ask_details',
                text: 'Kysy konkreettisia esimerkkejä ja nimeä lähteet',
                nextPhaseId: 'day40_symptoms',
                effect: {
                    stats: { teamAcceptance: -40, selfEsteem: 10 },
                    logNote: 'Päivä 30: Rehtori antoi epämääräistä negatiivista palautetta. Kun kysyin tarkennuksia, hän ei osannut vastata.'
                }
            },
            {
                id: 'accept_blame',
                text: '"Yritän parantaa tapani..."',
                nextPhaseId: 'day40_symptoms',
                effect: {
                    stats: { selfEsteem: -30, shame: 40, hope: -20 },
                    logNote: 'Päivä 30: Otin vastaan valheellisen palautteen. Tunnen itseni huonoksi opettajaksi.'
                }
            }
        ]
    },

    // --- PÄIVÄ 40: OIREET ---
    'day40_symptoms': {
        id: 'day40_symptoms',
        day: 40,
        time: '03:15',
        location: 'Koti (Makuuhuone)',
        isCrisis: true,
        title: 'Susihetki',
        content: `Heräät yöllä kolmelta. Sydän jyskyttää ja vatsaa vääntää. Ajatukset pyörivät valheellisissa palautteissa.
        
(Tutkimusten mukaan yli 50 % kiusaamistapauksista opetusalalla kestää yli vuoden).

"En halua mennä sinne. Pelkkä koulun piha saa mut voimaan pahoin."`,
        choices: [
            {
                id: 'suppress_feelings',
                text: 'Ota särkylääke ja pakota itsesi nukkumaan',
                nextPhaseId: 'day45_sickleave',
                effect: {
                    stats: { physicalHealth: -30, hope: -20 },
                    logNote: 'Päivä 40: Unettomuus ja fyysiset oireet pahenevat.'
                }
            },
            {
                id: 'search_help_online',
                text: 'Etsi tietoa uupumuksesta yöllä',
                nextPhaseId: 'day45_sickleave',
                effect: {
                    stats: { selfEsteem: -10, hope: 5 },
                    logNote: 'Päivä 40: Etsin tietoa oireistani. Tajuan että kyse on stressireaktiosta.'
                }
            }
        ]
    },

    // --- PÄIVÄ 45: SAIRAUSLOMA? ---
    'day45_sickleave': {
        id: 'day45_sickleave',
        day: 45,
        time: '07:15',
        location: 'Koti',
        title: 'Lähteäkö vai ei?',
        content: `Seisot eteisessä takki päällä, mutta et pysty avaamaan ovea. Itkettää.

Mietit soittavasi sairaaksi. Mutta tiedät, että Pekka joutuisi sijaistamaan, mikä pahentaisi puheita "laiskuudestasi".`,
        choices: [
            {
                id: 'go_to_work',
                text: 'Pakota itsesi kouluun hinnalla millä hyvänsä',
                nextPhaseId: 'day60_management_meeting',
                effect: {
                    stats: { physicalHealth: -20, hope: -10 },
                    logNote: 'Päivä 45: Menin sairaana töihin pelon vuoksi. Jaksan tuskin seisoa.'
                }
            },
            {
                id: 'stay_home',
                text: 'Soita ja ilmoita olevasi kipeä',
                nextPhaseId: 'day60_management_meeting',
                effect: {
                    stats: { physicalHealth: 20, teamAcceptance: -30, shame: 20 },
                    logNote: 'Päivä 45: Jäin kotiin lepäämään. Tunnen syyllisyyttä, mutta en pystynyt menemään.'
                }
            }
        ]
    },

    // --- PÄIVÄ 60: ESIMIEHEN KOHTAAMINEN (TOINEN YRITYS) ---
    'day60_management_meeting': {
        id: 'day60_management_meeting',
        day: 60,
        time: '14:00',
        location: 'Rehtorin kanslia',
        title: 'Puhe rehtorin kanssa',
        content: `Olet pyytänyt uutta tapaamista. Kerrot nyt suoraan kiusaamisesta, Pekan käytöksestä ja sen vaikutuksesta terveyteesi.

REHTORI: "Oletko nyt aivan varma? Pekka on ollut täällä 25 vuotta, hän on koulun tukipilari. Ehkä tämä on vain väärinkäsitys? Opettaja-ala vaatii paksua nahkaa."

Rehtorin ilme on torjuva. Hän katsoo kelloaan.`,
        choices: [
            {
                id: 'give_up_manager',
                text: 'Lopeta puhuminen ja poistu',
                nextPhaseId: 'day70_union',
                effect: {
                    stats: { hope: -50, selfEsteem: -20, isolation: 30 },
                    logNote: 'Päivä 60: Rehtori vähätteli taas. Tuntui, että tukea ei saa mistään.'
                }
            },
            {
                id: 'insist_records',
                text: 'Sano että olet kirjannut asiat ylös',
                nextPhaseId: 'day70_union',
                effect: {
                    stats: { hope: 10, teamAcceptance: -20 },
                    logNote: 'Päivä 60: Mainitsin dokumentaation. Rehtori näytti säikähtäneeltä.'
                }
            }
        ]
    },

    // --- PÄIVÄ 70: LIITTO ---
    'day70_union': {
        id: 'day70_union',
        day: 70,
        time: '16:30',
        location: 'Puhelin',
        title: 'Ulkopuolinen apu',
        content: `Soitat koulun luottamusmiehelle. Hän kuuntelee hiljaa.

LUOTTAMUSMIES: "Tämä kuulostaa tutulta. Et ole ensimmäinen, joka valittaa Pekasta. Mutta ilman kovia todisteita tämä on sana sanaa vastaan, ja rehtori suojelee häntä."

Hän lupaa selvittää asiaa, mutta varoittaa prosessin raskaudesta.`,
        choices: [
            {
                id: 'start_official_process',
                text: 'Pyydä aloittamaan virallinen prosessi',
                nextPhaseId: 'day80_rumor',
                effect: {
                    stats: { hope: 30, teamAcceptance: -50 },
                    addAlly: 'Luottamusmies',
                    logNote: 'Päivä 70: Otin yhteyttä luottamusmieheen. Prosessi aloitettu, vaikka pelottaa.'
                }
            },
            {
                id: 'wait_and_see',
                text: 'Jää odottamaan, jos tilanne rauhoittuisi',
                nextPhaseId: 'day80_rumor',
                effect: {
                    stats: { hope: -20, isolation: 10 },
                    logNote: 'Päivä 70: En uskaltanut tehdä virallista ilmoitusta vielä.'
                }
            }
        ]
    },

    // --- PÄIVÄ 80: HUHU ---
    'day80_rumor': {
        id: 'day80_rumor',
        day: 80,
        time: '09:00',
        location: 'Käytävä',
        title: 'Maine',
        content: `Työpaikalla kiertää huhu, että olet hakenut sairauslomaa "mielenterveysongelmien" vuoksi ja että olet sopimaton opettajaksi.

Oppilaat kuiskailevat käytävällä: "Onks tolla se burnout?"
Pekka hymyilee sinulle leveästi ohittaessaan: "Jaksamisia."`,
        choices: [
            {
                id: 'angry_confrontation',
                text: 'Huuda Pekalle käytävällä',
                nextPhaseId: 'day90_peak_crisis',
                effect: {
                    stats: { selfEsteem: -40, shame: 80 },
                    logNote: 'Päivä 80: Menetin malttini ja huusin. Se pelasi suoraan heidän pussiinsa ("epävakaa").'
                }
            },
            {
                id: 'cold_silence',
                text: 'Kävele ohi pystypäin',
                nextPhaseId: 'day90_peak_crisis',
                effect: {
                    stats: { hope: 10, selfEsteem: 10 },
                    logNote: 'Päivä 80: Säilytin malttini huhuista huolimatta.'
                }
            }
        ]
    },

    // --- PÄIVÄ 90: HUIPENNUS ---
    'day90_peak_crisis': {
        id: 'day90_peak_crisis',
        day: 90,
        time: '08:00',
        location: 'Koulun piha',
        isCrisis: true,
        title: 'Kynnys matalana',
        content: `Seisot koulun pihalla. Näet Pekan ja rehtorin puhuvan ja katsovan sinuun päin. Pekka nauraa jotain ja rehtori nyökkäilee.

Et pysty liikuttamaan jalkojasi. 60 % opettajista on harkinnut alan vaihtoa. 25 % lopettaa alle 5 vuodessa.

Oletko yksi heistä?`,
        choices: [
            {
                id: 'end_suffer',
                text: 'Kävele sisään ja päätä vain kestää (Uupumus)',
                nextPhaseId: 'END_A',
                effect: {
                    stats: { physicalHealth: 0, hope: 0, shame: 100 },
                    logNote: 'Päivä 90: Päätin vain sietää. En näe ulospääsyä.'
                }
            },
            {
                id: 'end_quit',
                text: 'Käänny ympäri ja irtisanoudu (Alan vaihto)',
                nextPhaseId: 'END_B',
                effect: {
                    stats: { hope: 30, selfEsteem: 50 },
                    logNote: 'Päivä 90: Irtisanouduin. Terveys on tärkeämpi kuin tämä ura.'
                }
            },
            {
                id: 'end_fight_turvasiipi',
                text: 'Ota Turvasiipi käyttöön ja vaadi puuttumista',
                nextPhaseId: 'END_C',
                effect: {
                    stats: { hope: 100, selfEsteem: 80 },
                    logNote: 'Päivä 90: Otan Turvasiiven avuksi raportointiin ja otan yhteyttä OAJ:hin.'
                }
            }
        ]
    }
};
