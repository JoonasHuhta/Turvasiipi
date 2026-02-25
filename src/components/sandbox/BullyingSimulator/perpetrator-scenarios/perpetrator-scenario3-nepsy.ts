import type { PerpetratorScenario } from '../perpetrator-types';

/**
 * S3 — Nepsyn ärsytys
 * Kollega ylivireystilassa, ADHD/autismikirjon tiimiläinen
 * tarvitsee lisäohjausta — reaktio kohdistuu häneen.
 */
export const perpetratorScenario3Nepsy: PerpetratorScenario = {
    id: 'perpetrator-s3-nepsy',
    title: 'Nepsyn ärsytys',
    context:
        'Tiimiläisellä Ellalla on ADHD. Hän kysyy yksityiskohtia, toistaa ohjeita ääneen ja tarvitsee kirjalliset vahvistukset suullisen sijaan. Olet jo valmiiksi ylivireystilassa kuormittavan viikon jälkeen.',
    role: 'colleague',
    systemicPressure:
        'Tiimissä ei ole sovittuja saavutettavuuskäytäntöjä. "Kaikille samanlaiset ohjeet" -kulttuuri, eikä neurodiversiteettikoulutusta ole tarjottu.',
    difficulty: 4,
    difficultyLabel: 'Vaativa',
    durationMinutes: 20,
    learningGoal:
        'Erottaa oma ylivireystila tiimiläisen tarpeista — ja harjoitella oman hermoston säätelyä ennen reaktiota.',
    triggerWarning: undefined,

    characters: [
        {
            id: 'player',
            name: 'Sinä',
            role: 'Kollega',
            color: '#6366f1',
            isPlayer: true,
        },
        {
            id: 'ella',
            name: 'Ella',
            role: 'Tiimiläinen (ADHD)',
            color: '#a855f7',
            isTarget: true,
        },
    ],

    scene: {
        id: 'open-office-noisy',
        background: 'office',
        description: 'Meluisa avotoimisto. Palaverihuone varattuna. Et pysty siirtymään rauhallisempaan tilaan.',
    },

    // ─── OSA 1: PAINE ──────────────────────────────────────────────────────────
    pressurePhase: {
        intro:
            'Ennen kuin Ella tuli puhua sinulle, sinun hermostosi oli jo valmiiksi täynnä. Katsotaan viikko.',
        timeline: [
            {
                time: 'Ma–Ke',
                text: 'Kolme peräkkäistä päivää täynnä palavereita. Ei yhtään syvätöiden aikaa. Pää soi.',
                icon: '📅',
                stressImpact: 2,
            },
            {
                time: 'Torstai',
                text: 'Avotoimiston häly on ollut läpi viikon korkea. Tänään erityisen kova. Kuulet toisten puhelut.',
                icon: '🔊',
                stressImpact: 2,
            },
            {
                time: 'Perjantai, klo 14:00',
                text: 'Sinulla on vielä kolme kesken olevaa tehtävää ja yksi tuntia myöhässä oleva viesti johon pitää vastata.',
                icon: '📋',
                stressImpact: 1,
            },
        ],
        internalMonologue:
            'Jos kuulen vielä yhden keskeytyksen, räjähdän. Tarvitsen vain tunnin rauhoittumista — mutta sitä ei tule.',
        stressStartLevel: 4,
        bodySignalAtStart: 'Pää painaa. Silmät kirvelevät. Ääniä on liikaa — kuulet jokaisen.',
        question: 'Mitkä seuraavista lisäsivät kuormitustasi tällä viikolla?',
        stressFactors: [
            {
                id: 'sensory',
                label: 'Aistikuorma — melu, valo, häly',
                description: 'Aistikuorma heikentää kognitiivista kapasiteettia ja impulssikontrollia',
                icon: '👂',
                stressImpact: 2,
            },
            {
                id: 'interruptions',
                label: 'Toistuvat keskeytykset viikon aikana',
                description: 'Jokainen keskeytys lisää hermostollista aktivaatiota — ne kertyvät',
                icon: '🔔',
                stressImpact: 1,
            },
            {
                id: 'own-adhd',
                label: 'Olen itse herkkä melulle tai häiriöille',
                description: 'Neurodiversiteetti voi tarkoittaa myös omaa ylivireyttä — jolloin toisen tarpeet törmäävät',
                icon: '⚡',
                stressImpact: 1,
            },
            {
                id: 'deadline',
                label: 'Deadline painaa — juuri tänään',
                description: 'Ajan paine kaventaa kognitiivisia resursseja',
                icon: '⏰',
                stressImpact: 1,
            },
        ],
    },

    // ─── OSA 2: VAARAVYÖHYKE ───────────────────────────────────────────────────
    dangerZonePhase: {
        trigger: {
            characterId: 'ella',
            text: 'Ella: "Hei — voisitko vielä kerran vahvistaa, kumpi deadline se on? Laitan kirjallisena niin on varma. Mulla on taipumus sekoittaa nää."',
            style: 'question',
        },
        bodySignals: [
            'Ärsytyspiikki — nopeampi kuin aiemmin, koska hermosto on jo täynnä',
            'Ajatus: "Koska minä sanoin tämän jo" ennen kuin prosessoit täysin',
            'Mahdollinen tunne: "Miksi hän ei vain muista?"',
            'Hermosto on jo ylivirittynyt — tämä on SINUN tilasi, ei Ellan ongelma',
        ],
        cognitiveNarrow:
            'Hermostossasi ei ole enää kapasiteettia käsitellä tätä neutraalisti. Ella näyttäytyy ongelmana — mutta hän on oman tarpeensa kanssa.',
        justificationOptions: [
            {
                type: 'minimizing',
                text: '"Tämä on nyt jo kolmas kerta kun hän kysyy. Tämä on kohtuutonta."',
                insight:
                    'Kohtuuttomuuden kokemus on aito — mutta se johtuu omasta ylivireydestä. Muistin tukistrategioilla toimiva ihminen ei valitse toistaa tahallaan.',
            },
            {
                type: 'blaming',
                text: '"Hänen pitäisi ottaa omat muistiinpanot — se ei ole minun vastuuni."',
                insight:
                    'Tämä on osin totta — mutta vähättelevän sävyn tuottaminen ei ole sama kuin rajan asettaminen. Nämä voi erottaa.',
            },
            {
                type: 'authority',
                text: '"Tiimissä on tietynlaiset odotukset — kaikkien pitää toimia samoin."',
                insight:
                    '"Kaikille samoin" -ajattelu ei huomioi, että tasa-arvo voi tarkoittaa erilaisia tapoja saavuttaa sama tulos.',
            },
            {
                type: 'honesty',
                text: '"Sanon suoraan, että tämä alkaa haitata minun työtäni."',
                insight:
                    'Oman tilan kommunikointi on oikeutettua — mutta oikea viesti on "minä olen nyt ylivirittynyt", ei "sinä olet ongelma".',
            },
        ],
        interpretations: [
            {
                id: 'hostile-1',
                text: '"Hän tekee tämän tarkoituksella — testaa minua."',
                isHostile: true,
                explanation:
                    'ADHD:n muistin tukistrategiat (toistaminen, kirjallinen vahvistus) ovat toimintatapoja, eivät manipulaatiota.',
            },
            {
                id: 'hostile-2',
                text: '"Hän ei yksinkertaisesti pysty toimimaan itsenäisesti — liikaa käsillyttämistä."',
                isHostile: true,
                explanation:
                    'Neurodiversiteettiin liittyvät tukistrategiat eivät tarkoita riippuvaisuutta. Ne ovat kognitiivisia apuvälineitä — kuten silmälasit näkemiseen.',
            },
            {
                id: 'neutral-1',
                text: '"Hänellä on muistinhallintastrategia joka toimii hänelle — kirjallinen vahvistus."',
                isHostile: false,
                explanation:
                    'Neutraali. Moni ihminen toimii paremmin kirjallisella vahvistuksella — se ei ole heikkous vaan erilainen tapa prosessoida.',
            },
            {
                id: 'neutral-2',
                text: '"Olen nyt itse ylivirittynyt — tämä ei oikeastaan johdu Ellasta."',
                isHostile: false,
                explanation:
                    'Paras mahdollinen tulkinta. Oman ylivireystilan tunnistaminen ennen reaktiota on se taito, jota harjoitellaan.',
            },
        ],
        groundingPrompt:
            'Ennen kuin vastat — tunnista: onko ärsytykseni Ellan tarpeesta, vai omasta ylivireydestäni?',
    },

    // ─── OSA 3: TEKO + SEURAUKSET ──────────────────────────────────────────────
    consequencePhase: {
        prompt: 'Ella odottaa vahvistusta. Näät hänen olevan rehellinen. Mitä teet?',
        actions: [
            {
                id: 'eye-roll',
                text: '(Huokaiset pitkään ja  rullaat silmäsi, sitten vastat.) "Se on perjantai. Ei tätä nyt tarvitse enemmän."',
                severity: 'aggressive',
                icon: '🔴',
                shortTermSelfFeel: 'Hetkellinen purku — ärsytys laukesi.',
                shortTermBenefit: 'Tilanne loppui nopeasti.',
                consequences: {
                    victimExperience: {
                        immediateThought: '"Minun tapani tehdä töitä on väärä. Olen häiriö."',
                        bodyReaction: 'Ella vetäytyy. Katsoo alas. Lähtee hiljaa.',
                        longTermEffect:
                            'Ella alkoi hävetä tukistrategioitaan. Hän alkoi tehdä virheitä jotka johtuivat siitä, ettei enää uskaltanut vahvistaa.',
                    },
                    groupAtmosphere: {
                        immediate: 'Muut kuulivat. Vaivaantunut hiljaisuus.',
                        longTerm: 'Tiimissä levisi epävirallinen normi: "Ellalle ei selitetä kunnolla."',
                    },
                    selfAftermath: {
                        immediate: 'Hetkellinen helpotus — sitten tunne, että ehkä se oli liikaa.',
                        physical: 'Ahdistus palaa tunnin kuluttua.',
                        longTerm: 'Ella alkoi tehdä virheitä jotka vaikuttivat koko tiimin aikatauluihin.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin, että hän oppii olemaan itsenäisempi.',
                        impact: 'Hän menetti luottamuksen strategioihin jotka auttoivat häntä — ja alkoi epäonnistua enemmän.',
                    },
                    nextDay: 'Ella tulee töihin myöhemmin kuin yleensä.',
                    nextWeek: 'Ella tekee virheen aikataulussa — hän ei uskaltanut vahvistaa.',
                },
            },
            {
                id: 'curt',
                text: '"Perjantai." (Lyhyt, ei katsetta, takaisin töihin.)',
                severity: 'passive_aggressive',
                icon: '🟠',
                shortTermSelfFeel: 'Annettiin vastaus — minimissä.',
                shortTermBenefit: undefined,
                consequences: {
                    victimExperience: {
                        immediateThought: '"Vastasi — mutta olenko häiriöksi?"',
                        bodyReaction: 'Ella kirjoittaa vastauksen epävarmalla otteella.',
                        longTermEffect: 'Ella alkoi epäröimään pyytäessään vahvistuksia — virheet kasvoivat.',
                    },
                    groupAtmosphere: {
                        immediate: 'Kylmä.',
                        longTerm: 'Ella alkoi hakea vahvistuksia muista kanavista — tiedonkulku hajosi.',
                    },
                    selfAftermath: {
                        immediate: 'Ei hyvä eikä huono — suoritettu.',
                        physical: 'Ylivireys jatkuu.',
                        longTerm: 'Virheiden myötä työ lisääntyi sinullakin.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin vastata ilman isoa konfliktia.',
                        impact: 'Ella sai vastauksen mutta menetti luottamuksen pyytää apua.',
                    },
                    nextDay: 'Ella toimii mutta etäinen.',
                    nextWeek: 'Huomaat Ellan lähettävän enemmän sähköposteja kuin puhuvan.',
                },
            },
            {
                id: 'honest-need',
                text: '"Perjantai — ja Ella, minulla on itsellä nyt erittäin täysi päivä. Laita se itsellesi muistiin, ja jos epäselvää jää, palataan huomenna."',
                severity: 'constructive',
                icon: '🟢',
                shortTermSelfFeel: 'Oma tila kommunikoitu — mutta Ella ei jäänyt torjuttuna.',
                shortTermBenefit: 'Molemmat saivat tilan. Asia varmistui.',
                consequences: {
                    victimExperience: {
                        immediateThought: '"Hän vastasi selkeästi. Hän ei syyttänyt minua — hän kertoi omasta tilanteestaan."',
                        bodyReaction: 'Ella kirjoittaa korostetun muistiinpanon.',
                        longTermEffect: 'Ella jatkoi pyytämään vahvistuksia — koska hän tiesi sen olevan ok.',
                    },
                    groupAtmosphere: {
                        immediate: 'Neutraali — mutta Ella sai sen mitä tarvitsi.',
                        longTerm: 'Tiimissä syntyi käytäntö: kirjalliset vahvistukset ovat normaali tapa.',
                    },
                    selfAftermath: {
                        immediate: 'Pienikin hetki kommunikoida omaa tilaa tuntui paremmalta kuin purku.',
                        physical: 'Ärsytys ei kasvanut.',
                        longTerm: 'Yhteistyö säilyi — ja virheet vähenivät.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin suojata omaa kapasiteettiani.',
                        impact: 'Suojelin itseäni ilman vahingoittamista.',
                    },
                    nextDay: 'Ella on oma itsensä.',
                    nextWeek: 'Ella ehdottaa parannusta tiimin dokumentaatiokäytäntöihin.',
                },
            },
            {
                id: 'avoidant',
                text: '(Et vastaa heti. Laitat kuulokkeet päähän näytteleminen.)',
                severity: 'avoidant',
                icon: '⚪',
                shortTermSelfFeel: 'Hengähdystauko — ei purkausta mutta ei vastaustakaan.',
                shortTermBenefit: undefined,
                consequences: {
                    victimExperience: {
                        immediateThought: '"En tiedä onko tämä ok. Pitääkö minun kysyä uudelleen?"',
                        bodyReaction: 'Ella jää epävarmuuteen.',
                        longTermEffect: 'Ella alkoi arvata deadlinen. Arvasi väärin.',
                    },
                    groupAtmosphere: {
                        immediate: 'Epäselvä.',
                        longTerm: 'Tiedonkulku epäselvää.',
                    },
                    selfAftermath: {
                        immediate: 'Lievitys hetkeksi.',
                        physical: 'Ylivireys jatkuu — ohitit tilanteen mutta et käsitellyt sitä.',
                        longTerm: 'Ellan virhe tuli sinulle aikataulumuutoksena.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin paeta tilanteesta.',
                        impact: 'Ella jäi ilman vastausta — virhe seurasi.',
                    },
                    nextDay: 'Ella epäilee omaa aikatauluaan.',
                    nextWeek: 'Aikatauluvirhe paljastuu.',
                },
            },
        ],
    },

    // ─── OSA 4: REWIND ─────────────────────────────────────────────────────────
    rewindPhase: {
        rewindExplanation:
            'Sama tilanne. Sama ylikuormitus. Ellan tarve ei muuttunut — mutta sinä voit.',
        sameStressReminder:
            'Oma ylivireystilasi on aito. Ellan tarve on myös aito. Nämä kaksi voivat molemmat olla totta.',
        alternatives: [
            {
                id: 'alt-own-state',
                text: '"Perjantai — ja Ella, olen itse nyt maksimikuormituksella. Se ei ole sinusta kiinni. Vastaan lyhyesti: perjantai. Laita ylös."',
                tone: 'self-aware',
                toneLabel: 'Oman tilan nimeäminen',
                explanation:
                    'Oman ylivireystilan ääneen sanominen poistaa Ellalta vastuun tulkita sinua — ja estää hänestä tulevan syntipukin.',
                sceneReaction: {
                    targetReaction: 'Ella: "Okei, kiitos — ja toivottavasti päivä helpottaa." (Kirjoittaa muistiin.)',
                    groupReaction: undefined,
                },
                analysis:
                    'Kun nimeät oman tilanteesi, ärsytys ei siirry toiselle. Tämä on neurotietoinen taito.',
            },
            {
                id: 'alt-structure-nepsy',
                text: '"Ella, hyvä asia että vahvistat. Kirjoitan sen sulle nyt viestiketjuun, niin se on aina tarkistettavissa."',
                tone: 'assertive',
                toneLabel: 'Saavutettavuusratkaisu',
                explanation:
                    'Kirjallinen vahvistus ei vie enempää aikaa kuin suullinen — mutta poistaa toistuvan kysymyksen tarpeen.',
                sceneReaction: {
                    targetReaction: 'Ella: "Täydellinen — näin se pysyy selkeänä. Kiitos!"',
                    groupReaction: 'Muut: "Hyvä käytäntö — ehkä voisimme tehdä tämän kaikkien kanssa."',
                },
                analysis:
                    'Pieni rakenne poistaa ison toistuvan kuormituksen. Saavutettavuus auttaa kaikkia.',
            },
            {
                id: 'alt-pause',
                text: '"Hetkinen — tarvitsen itse nyt hengähdyksen. Viisi minuuttia, sitten palataan tähän."',
                tone: 'boundary',
                toneLabel: 'Tauko itselle',
                explanation:
                    'Tauon ottaminen ennen reaktiota on hermoston säätelyn taito — ei pako tilanteesta.',
                sceneReaction: {
                    targetReaction: 'Ella: "Selvä — odotan."',
                    groupReaction: undefined,
                },
                analysis:
                    'Viisi minuuttia hermoston rauhoittumiseen tuottaa paremman vastauksen kuin välitön reaktio ylivireydessä.',
            },
        ],
        editableTemplate: {
            template: 'Olen nyt itse [OMA TILA]. Se ei johdu sinusta. [KONKREETTINEN RATKAISU].',
            slots: [
                {
                    placeholder: '[OMA TILA]',
                    suggestion: 'ylikuormittunut',
                    hint: 'Nimeä oma tilasi — ei syytä toiselle',
                },
                {
                    placeholder: '[KONKREETTINEN RATKAISU]',
                    suggestion: 'Vastaan viestiketjussa',
                    hint: 'Mitä teet seuraavaksi',
                },
            ],
        },
        openTextPrompt:
            'Tai kirjoita omin sanoin — miten voit kommunikoida oman ylivireytesi ilman, että Ella jää torjutuksi?',
    },

    // ─── OSA 5: KORJAAVA LIIKE ─────────────────────────────────────────────────
    repairPhase: {
        shameNormalization:
            'Ylivireys on kehollinen tila, ei moraalinen epäonnistuminen. Kun hermosto on täynnä, reaktiot kiihtyvät — tämä on biologia. Häpeä kertoo nyt, että huomasit.',
        seatTakingText:
            'Olet kollega joka reagoi Ellan tarpeeseen ylivireystilassa. Et ole "kiusaaja" — olet ihminen joka tarvitsee tukea oman hermoston säätelyyn.',
        identityContrast: {
            old: '"Kaikki häiritsevät kun olen kuormittunut — ja se näkyy"',
            new: '"Tunnistan ylivireyteni ennen kuin se siirtyy muihin"',
        },
        repairActions: [
            {
                id: 'check-ella',
                label: 'Hakeudu Ellan luo — kysy miten menee',
                category: 'conversation',
                description: 'Matalan kynnyksen tarkistus — ei anteeksipyyntöä tarvita, vaan näkyvyyttä.',
                exampleText: 'Ella, hei — miten sulla menee? Onko tiimissä tarvittavat käytännöt selkeät?',
                difficulty: 1,
            },
            {
                id: 'written-confirmations',
                label: 'Ehdota tiimille kirjallisia vahvistuksia käytännöksi',
                category: 'systemic',
                description: 'Pienenkin muutoksen ehdottaminen normalisoi tukistrategiat kaikille.',
                difficulty: 2,
            },
            {
                id: 'own-sensory',
                label: 'Tutki omia ylivireystilanteita',
                category: 'self',
                description: 'Milloin oma hermosto on täynnä? Miten tunnistaa se ennen reaktiota?',
                difficulty: 2,
            },
            {
                id: 'nepsy-training',
                label: 'Neurodiversiteettikoulutus',
                category: 'systemic',
                description: 'Ehdota HR:lle tiimikoulutusta — ADHD ja autismikirjon tukistrategiat.',
                difficulty: 3,
            },
        ],
        supportResources: [
            {
                label: 'Neurodiversiteetti työelämässä',
                description: 'ADHD-liitto ja Autismiliitto Suomessa tarjoavat työnantajille tietoa ja koulutuksia.',
            },
            {
                label: 'Hermoston säätely',
                description: 'Polyvagaaliteoriaan pohjautuvia harjoitteita: hengitys, liike, tauko.',
            },
        ],
        cardPrompt: 'Yksi asia jonka opit tänään omasta ylivireydestäsi:',
        nextStepPrompt: 'Yksi tapa jolla suojaat hermostoasi ennen kuin se vaikuttaa muihin:',
    },
};
