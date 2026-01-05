
import { Phase } from "../types";

export const YOUTH_SCENARIO: Record<string, Phase> = {
    START: {
        id: "START",
        day: 0,
        title: "Työhaastattelu",
        time: "14:00",
        location: "Toimisto",
        content: `Olet 22-vuotias vastavalmistunut. Haet ensimmäistä "oikeaa" työpaikkaasi.
        
        Haastattelija nojaa taaksepäin ja hymyilee hieman väkinäisesti:
        "Meillä on täällä aika kova tahti, mutta kyllä täällä oppii. Emme katso kelloa, koska olemme täällä kuin yhtä perhettä."`,
        choices: [
            {
                id: "accept",
                text: "Innostua ja hyväksyä haaste.",
                nextPhaseId: "ONBOARDING_BAD",
                effect: {
                    stats: { hope: 10, selfEsteem: -5 },
                    logNote: "Hyväksyin 'perhemäisen' kulttuurin kyseenalaistamatta."
                }
            },
            {
                id: "ask",
                text: "Kysyä perehdytyksestä.",
                nextPhaseId: "ONBOARDING_REALISTIC",
                effect: {
                    stats: { selfEsteem: 10, physicalHealth: 5 },
                    logNote: "Kysyin perehdytyksestä ja virheiden käsittelystä."
                }
            }
        ]
    },
    ONBOARDING_BAD: {
        id: "ONBOARDING_BAD",
        day: 7,
        title: "Viikko 1: Kaaos",
        time: "09:00",
        location: "Avokonttori",
        content: `Ensimmäinen viikko on ollut yhtä juoksua. Kukaan ei varsinaisesti vastaa sinusta. Saat ristiriitaisia ohjeita eri ihmisiltä.
        
        Kysyt esihenkilöltäsi: "Miten tämä kirjaus tehdään?"
        
        Hän huokaisee: "Kyllä sinun tämä jo pitäisi tietää, jos kerran olet alan ihmisiä."`,
        choices: [
            {
                id: "blame_self",
                text: "Syytä itseäsi ja yritä kovempaa.",
                nextPhaseId: "SILENT_TREATMENT",
                effect: {
                    stats: { selfEsteem: -20, physicalHealth: -10 },
                    logNote: "Aloin ylisuorittaa paikatakseni 'osaamattomuuttani'."
                }
            },
            {
                id: "document",
                text: "Kirjaa ylös ohjeiden puute.",
                nextPhaseId: "SILENT_TREATMENT",
                effect: {
                    stats: { selfEsteem: 5 },
                    logNote: "Dokumentoin puutteellisen perehdytyksen."
                }
            }
        ]
    },
    ONBOARDING_REALISTIC: {
        id: "ONBOARDING_REALISTIC",
        day: 7,
        title: "Viikko 1: Epämääräisyys",
        time: "09:00",
        location: "Avokonttori",
        content: `Vaikka kysyit perehdytyksestä, todellisuus on toinen. "Mentori" on aina kiireinen.
        
        Huomaat, että muut tiimiläiset menevät lounaalle pyytämättä sinua mukaan.
        Kun kysyt neuvoa, sinulle sanotaan: "Kato intranetistä, siellä sen pitäisi olla." (Ei ole).`,
        choices: [
            {
                id: "work_through_lunch",
                text: "Jätä lounas väliin ja etsi tietoa.",
                nextPhaseId: "SILENT_TREATMENT",
                effect: {
                    stats: { physicalHealth: -15, isolation: 20 },
                    logNote: "Jätin tauot väliin pärjätäkseni."
                }
            },
            {
                id: "insist",
                text: "Vaadi hetki mentorin aikaa.",
                nextPhaseId: "SILENT_TREATMENT",
                effect: {
                    stats: { selfEsteem: 10, teamAcceptance: -10 },
                    logNote: "Vaadin ohjausta, vaikka se ärsytti muita."
                }
            }
        ]
    },
    SILENT_TREATMENT: {
        id: "SILENT_TREATMENT",
        day: 25,
        title: "Viikko 4: Hiljainen koulu",
        time: "14:30",
        location: "Palaveri",
        content: `Olet ollut talossa kuukauden. Huomaat, että tärkeitä sähköposteja "unohtuu" lähettää sinulle.
        
        Palaverissa esität idean. Se ohitetaan. Viisi minuuttia myöhemmin kollega esittää saman idean ja saa kehut.
        
        Taukotilassa kuulet kuiskailua: "No se on vielä niin uusi, ei se ymmärrä talon tapoja."`,
        choices: [
            {
                id: "emotional",
                text: "Loukkaannu ja vetäydy.",
                nextPhaseId: "CRITICAL_POINT",
                effect: {
                    stats: { isolation: 30, hope: -20 },
                    logNote: "Vetäydyin omiin oloihini."
                }
            },
            {
                id: "neutral",
                text: "Pysy asiallisena ja kirjaa tapahtunut.",
                nextPhaseId: "CRITICAL_POINT",
                effect: {
                    stats: { selfEsteem: 5 },
                    logNote: "Havaitsin ideavarkauden ja ulossulkemisen."
                }
            }
        ]
    },
    CRITICAL_POINT: {
        id: "CRITICAL_POINT",
        day: 45,
        title: "Kriittinen piste",
        time: "16:45",
        location: "Esihenkilön huone",
        isCrisis: true,
        content: `Sinua syytetään virheestä, joka johtui puutteellisista ohjeista.
        
        Esihenkilö: "Tämä on vakava asia. Meidän pitää miettiä, oletko sopiva tähän taloon, jos perusasiat eivät suju."
        
        Tunnet kyyneleet silmissäsi. Tämä on se hetki.`,
        choices: [
            {
                id: "breakdown",
                text: "Romahda ja pyydä anteeksi. (Kestä)",
                nextPhaseId: "END_BURNOUT",
                effect: {
                    stats: { selfEsteem: -50, hope: -50 },
                    triggerCrisis: true,
                    logNote: "Otin syyt niskoilleni toisen virheestä."
                }
            },
            {
                id: "anger",
                text: "Huuda takaisin epäreiluudesta. (Tunne)",
                nextPhaseId: "END_LABEL",
                effect: {
                    stats: { teamAcceptance: -100 },
                    logNote: "Menetin malttini ja minut leimattiin hankalaksi."
                }
            },
            {
                id: "boundaries",
                text: "Aseta ammatillinen raja. (Rakenne)",
                nextPhaseId: "END_GROWTH",
                effect: {
                    stats: { selfEsteem: 50, hope: 50 },
                    logNote: "Kieltäydyin syntipukin roolista rauhallisesti."
                }
            }
        ]
    },
    // ENDINGS
    END_BURNOUT: {
        id: "END_BURNOUT",
        day: 90,
        title: "Lopputulos: Uupumus",
        time: "---",
        content: "Jatkoit yrittämistä ilman tukea. Kuormitus kasvoi, virheet lisääntyivät. Lopulta jäit pitkälle sairaslomalle. Opit pelkäämään työelämää.",
        choices: []
    },
    END_LABEL: {
        id: "END_LABEL",
        day: 46,
        title: "Lopputulos: Leimautuminen",
        time: "---",
        content: "Purkauksesi kuitattiin 'nuoruuden kiukutteluna'. Sinusta tuli tiimin silmätikku ja musta lammas. Sopimustasi ei jatkettu.",
        choices: []
    },
    END_GROWTH: {
        id: "END_GROWTH",
        day: 46,
        title: "Lopputulos: Toimijuus",
        time: "---",
        content: "Sanoit rauhallisesti: 'Jotta voin kantaa vastuun, minulla täytyy olla edellytykset tehdä työ oikein. Ohjeistus puuttui.'\n\nTilanne ei ehkä ratkennut heti, mutta pelastit itsetuntosi. Ymmärsit, että vika ei ollut sinussa.",
        choices: []
    }
};
