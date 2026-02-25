import type { PerpetratorScenario } from '../perpetrator-types';

export const perpetratorScenario1KPI: PerpetratorScenario = {
    id: 'perpetrator-s1-kpi',
    title: 'KPI-paine',
    context:
        'Puhut tiimiläisesi kanssa viikkopalaverin jälkeen. Johto on antanut kritiikkiä suorituksista ja sinulla on kiire korjata tilanne. Hän on tehnyt saman virheen jo kolmatta kertaa.',
    role: 'manager',
    systemicPressure:
        'KPI-pohjainen suorituskulttuuri, jossa esihenkilöä arvioidaan tiimin tulosten perusteella. Virheistä rangaistaan — tuki- ja oppimisresursseja ei ole tarjolla.',
    difficulty: 3,
    difficultyLabel: 'Kohtalainen',
    durationMinutes: 20,
    learningGoal:
        'Tunnistaa, miten oma stressinpurku voi muuttua vallan väärinkäytöksi — ja harjoitella rajakieltä saman paineen alla.',
    triggerWarning: undefined,

    characters: [
        {
            id: 'player',
            name: 'Sinä',
            role: 'Tiiminvetäjä',
            color: '#6366f1',
            isPlayer: true,
        },
        {
            id: 'mia',
            name: 'Mia',
            role: 'Tiimiläinen',
            color: '#ec4899',
            isTarget: true,
        },
    ],

    scene: {
        id: 'office-corridor',
        background: 'office',
        description: 'Käytävä palaverin jälkeen. Muut ovat jo lähteneet. Olet kahdestaan Mian kanssa.',
    },

    // ─── OSA 1: PAINE ──────────────────────────────────────────────────────────
    pressurePhase: {
        intro:
            'Ennen kuin tämä hetki alkoi, sinulla oli jo taustalla raskas aamu. Katsotaan, mitä tapahtui.',
        timeline: [
            {
                time: 'Klo 8:15',
                text: 'Johtoryhmän sähköposti: "Tiiminne KPI-luku on pudonnut 14 % — tarvitaan selitys.",',
                icon: '📧',
                stressImpact: 2,
            },
            {
                time: 'Klo 9:30',
                text: '30 minuutin yksilötapaaminen johtajan kanssa. Painostava.  Ei rakentavaa palautetta — vain numeroita.',
                icon: '💼',
                stressImpact: 2,
            },
            {
                time: 'Klo 11:00',
                text: 'Tiimikokous: raportti oli myöhässä — sinä vastaat siitä, vaikka vastuu oli Mialla.',
                icon: '📊',
                stressImpact: 1,
            },
            {
                time: 'Klo 12:30',
                text: 'Et syönyt lounasta. Palaveri venyi.',
                icon: '😮‍💨',
                stressImpact: 1,
            },
        ],
        internalMonologue:
            'Jos Mia tekee tämän virheen vielä kerran, menetän uskottavuuteni. Miksi hän ei vain suoriudu? Minun ei pitäisi edes joutua selittelemään tätä ylöspäin.',
        stressStartLevel: 3,
        bodySignalAtStart: 'Leuka on kireänä. Hartiat nousseet. Hengitys pinnallista.',
        question: 'Mitkä seuraavista lisäsivät stressitasoasi tänään?',
        stressFactors: [
            {
                id: 'no-lunch',
                label: 'En syönyt lounaata',
                description: 'Verensokeri matala — impulssikontrolli heikentyy',
                icon: '🍽️',
                stressImpact: 1,
            },
            {
                id: 'poor-sleep',
                label: 'Nukuin huonosti',
                description: 'Univaje nostaa tunnereaktion todennäköisyyttä merkittävästi',
                icon: '😴',
                stressImpact: 1,
            },
            {
                id: 'earlier-conflict',
                label: 'Oli jo aiempi jännitys tiimissä',
                description: 'Kertyneisyys — reaktio ei kohdistukaan tähän tilanteeseen vaan kasaumaan',
                icon: '⚡',
                stressImpact: 2,
            },
            {
                id: 'own-fear',
                label: 'Pelkäsin oman asemani puolesta',
                description: 'Statuksen menetyksen uhka aktivoi puolustusreaktion',
                icon: '😰',
                stressImpact: 1,
            },
        ],
    },

    // ─── OSA 2: VAARAVYÖHYKE ───────────────────────────────────────────────────
    dangerZonePhase: {
        trigger: {
            characterId: 'mia',
            text: 'Mia: "Hei — voitko selittää tämän kohdan uudelleen? En ole varma miten tämä lasketaan."',
            style: 'question',
        },
        bodySignals: [
            'Sydän lyö voimakkaammin',
            'Leuka puristuu tiukemmin',
            'Käsivarret jännittyvät',
            'Näkökenttä kapenee — näet Mian "häiriökohtana", et ihmisenä',
        ],
        cognitiveNarrow:
            'Huomaat, että ajatuksesi pyörivät yhden lauseen ympärillä: "Hän ei vain suoriudu." Muut vaihtoehdot eivät tunnu saavutettavilta.',
        justificationOptions: [
            {
                type: 'honesty',
                text: '"Sanon vain miten asiat ovat. Rehellisyys on tärkeää."',
                insight:
                    'Rehellisyys ja suoruus ovat arvoja — mutta ne eivät oikeuta loukkaavaa sävyä. Stressi muuttaa "rehellisyyden" aggressiivisuudeksi.',
            },
            {
                type: 'authority',
                text: '"Esihenkilönä minulla on vastuu. Pitää olla jämäkkä."',
                insight:
                    'Auktoriteetti ei tarkoita rangaistusta. Jämäkkyys tarkoittaa selkeyttä — ei nöyryyttämistä.',
            },
            {
                type: 'blaming',
                text: '"Hän on jo kolmatta kertaa samassa kohdassa. Hänen täytyy ottaa vastuuta."',
                insight:
                    'Vastuun vaatiminen on oikeutettua — mutta se voidaan tehdä ilman häpäisyä. Tässä ajatus oikeuttaa ankaran reaktion.',
            },
            {
                type: 'minimizing',
                text: '"En nyt ehdi olla herkkä — tilanne vaatii nopeuttaa."',
                insight:
                    'Kiire voi tuntua perustellulta. Mutta se ei poista vastuuta siitä, miten kommunikoit.',
            },
        ],
        interpretations: [
            {
                id: 'hostile-1',
                text: '"Hän tekee tämän tahallaan — testaa minua."',
                isHostile: true,
                explanation:
                    'Hostile attribution bias: tulkitsemme tilanteen tahalliseksi, vaikka se useimmiten on osaamattomuutta tai epäselvyyttä. Tämä nostaa aggression todennäköisyyttä.',
            },
            {
                id: 'hostile-2',
                text: '"Hän ei yksinkertaisesti välitä tehdä töitä kunnolla."',
                isHostile: true,
                explanation:
                    'Globaali leimaaminen ("ei välitä") sen sijaan että nähtäisi spesifi tilanne. Johtaa kontaktin menettämiseen ihmiseen.',
            },
            {
                id: 'neutral-1',
                text: '"Hän kysyy — se tarkoittaa, että ohjeet ovat epäselvät tai hän on epävarma."',
                isHostile: false,
                explanation:
                    'Neutraali tulkinta. Kysyminen on merkki siitä, että henkilö yrittää tehdä oikein — ei laiskuudesta.',
            },
            {
                id: 'neutral-2',
                text: '"Ehkä minulla ei ole ollut aikaa perehdyttää häntä kunnolla."',
                isHostile: false,
                explanation:
                    'Vastuun ottava tulkinta. Vie tarkastelun pois pelkästä kohteesta — avaa myös oman toiminnan reflektiolle.',
            },
        ],
        groundingPrompt:
            'Ennen kuin valitset — hengitä kerran syvään. Sisään 4 sekuntia, ulos 6 sekuntia.',
    },

    // ─── OSA 3: TEKO + SEURAUKSET ──────────────────────────────────────────────
    consequencePhase: {
        prompt: 'Mia kysyy neuvoa. Mitä teet?',
        actions: [
            {
                id: 'public-shame',
                text: '"Tämähän on aivan perusasia, Mia. Miten et osaa tätä vieläkään? Olisit pitänyt tarkkaavaisempi palaverissa."',
                severity: 'aggressive',
                icon: '🔴',
                shortTermSelfFeel: 'Hetkellinen aggressiopurku — leuan kireys lievittyy sekunniksi.',
                shortTermBenefit: 'Tilanne päättyy nopeasti — Mia ei kysy lisää.',
                consequences: {
                    victimExperience: {
                        immediateThought: '"En uskalla enää kysyä. Ehkä minun pitää vain selvitä yksin."',
                        bodyReaction: 'Vatsa kiristyi. Puna nousi kasvoille. Yritys pidätellä kyyneleitä.',
                        longTermEffect:
                            'Mia alkoi välttää kysymistä. Virheet alkoivat kasautua hiljaa. Kuukauden kuluttua hän haki muihin töihin.',
                    },
                    groupAtmosphere: {
                        immediate: 'Käytävälle laskeutui hankala hiljaisuus. Viereiset kollegat, jotka kuulivat, alkoivat puhua hiljemmin sinun lähelläsi.',
                        longTerm:
                            'Tiimi alkoi pidättäytyä kysymyksistä palavereissa. "Parempi kuin joutuu Mian paikalle."',
                    },
                    selfAftermath: {
                        immediate: 'Hetkellinen helpotus — sitten tyhjyyden tunne.',
                        physical: 'Kiire ei häviä. Leuan kireys palaa tunnin kuluttua.',
                        longTerm: 'Et saanut suorituksia parannettua. Sait lisää distanssiin ja vähentyneeseen aloitteellisuuteen tiimissä.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin, että Mia ottaa enemmän vastuuta ja oppii.',
                        impact: 'Mia sulkeutui. Hänen suorituksensa huononi. Minun suoritukseni ei parantunut.',
                    },
                    nextDay:
                        'Mia tuli töihin hiljaisena. Ei osallistunut aivoriihen alkuun.',
                    nextWeek:
                        'Kolme tiimiläistä kysyi sinulta yksityisviestillä: "Mikä tilanne Mian kanssa on? Onko kaikki ok?"',
                },
            },
            {
                id: 'sighing',
                text: '(Huokaiset näkyvästi ja rullaat silmiäsi.) "Selitän taas kerran..." (Selität mekaanisesti, ilme väsynyt.)',
                severity: 'passive_aggressive',
                icon: '🟠',
                shortTermSelfFeel: 'Puolikas purku — ei samanlainen kuin suora sanominen, mutta merkki välittyi.',
                shortTermBenefit: 'Ainakin sanoit jotain.',
                consequences: {
                    victimExperience: {
                        immediateThought: '"Olen rasitteena. Häiriin häntä."',
                        bodyReaction: 'Kasvoille kipu. Yritys vaikuttaa neutraalilta.',
                        longTermEffect:
                            'Mia alkoi pyytää apua muilta kollegoilta — vältti sinua. Tiedonkulku kärsi.',
                    },
                    groupAtmosphere: {
                        immediate: 'Epämukava jännitys. Sivulliset tulkitsevat tilanteen — alkavat varoa samaa.',
                        longTerm: 'Ryhmädynamiikka muuttui epäsuoraksi. Ihmiset puhuivat sinusta, ei sinulle.',
                    },
                    selfAftermath: {
                        immediate: 'Ei oikein helpottanut — mutta et "räjähtänyt".',
                        physical: 'Jännitys jäi kehoon. Et sanonut mitä halusit sanoa — etkä mitä olisi pitänyt.',
                        longTerm:
                            'Maineesi asiantuntevana mutta vaikeana esihenkilönä vahvistui.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin osoittaa, että tämä turhautti minua.',
                        impact: 'Mia koki häpeää ja alkoi vältellä yhteistyötä.',
                    },
                    nextDay: 'Mia ei kysy enää sinulta neuvoa.',
                    nextWeek: 'Huomaat, ettei Mia enää kerro virheilyn työnkulussa — koska hän pelkää reaktiotasi.',
                },
            },
            {
                id: 'ignore',
                text: '"Katso dokumentaatiosta." (Käännyt pois.)',
                severity: 'avoidant',
                icon: '⚪',
                shortTermSelfFeel: 'Et reagoinut aggressiivisesti — mutta et auttanutkaan.',
                shortTermBenefit: undefined,
                consequences: {
                    victimExperience: {
                        immediateThought: '"Olen yksin tässä. Kysyisin uudelleen — mutta en uskalla."',
                        bodyReaction: 'Turhautuminen ja häpeä sekoittuivat.',
                        longTermEffect:
                            'Mia löysi vastauksen itse — väärin. Virhe toistui myöhemmin raporteissa.',
                    },
                    groupAtmosphere: {
                        immediate: 'Neutraali ulospäin — mutta Mia kärsi yksin.',
                        longTerm: 'Tiimi huomasi, ettet auta — alkoi rakentaa epävirallisia verkostoja sinun ohitsesi.',
                    },
                    selfAftermath: {
                        immediate: 'Lievitys — sidetään tilanteesta ilman konfliktia.',
                        physical: 'Stressi jatkoi kasvuaan — Mian seuraava virhe tuli kahden viikon kuluttua.',
                        longTerm: 'Et olisi saanut virheitä vähennettyä välttämisellä.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin välttää konfliktin.',
                        impact: 'Jätin Mian ilman tukea — virhe jatkui.',
                    },
                    nextDay: 'Mia löytää vastauksen dokumentaatiosta — osittain väärin.',
                    nextWeek: 'Saat sähköpostin jossa raportoidaan sama virhe uudelleen.',
                },
            },
            {
                id: 'constructive',
                text: '"Hei, hetkinen — tämä on hyvä kysymys. Käydään se läpi yhdessä nyt. Pitää varmistaa, että ymmärrys on selvä molemmilla puolilla."',
                severity: 'constructive',
                icon: '🟢',
                shortTermSelfFeel: 'Ei välitöntä purkausta — mutta rauhoittuminen hetken kuluttua.',
                shortTermBenefit: 'Tilanne ratkeaa. Mia saa vastauksen.',
                consequences: {
                    victimExperience: {
                        immediateThought: '"Hän ei vihaakaan minua. Voin kysyä jatkossa."',
                        bodyReaction: 'Hartiat laskeutuivat. Helpotus.',
                        longTermEffect:
                            'Mia alkoi kysyä aiemmin — virheet vähenivät. Hän kertoi ennakkovaroituksia myöhässä olevista projekteista.',
                    },
                    groupAtmosphere: {
                        immediate: 'Muut, jotka kuulivat: "Tuo oli asiallista."',
                        longTerm: 'Tiimissä ihmiset uskalsivat tuoda esille virheitä ennen kuin ne kasvoivat suuriksi.',
                    },
                    selfAftermath: {
                        immediate: 'Ei helpotusta samalla tavoin — mutta ei myöskään jälkihäpeää.',
                        physical: 'Stressi ei poistunut heti — mutta ei myöskään lisääntynyt.',
                        longTerm: 'KPI-luvut alkoivat nousta kuukauden kuluttua kun virheet vähentyivät.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin, että virhe korjautuu.',
                        impact: 'Virhe korjautui — ja tiimin oppimiskyky kasvoi.',
                    },
                    nextDay: 'Mia tulee kertomaan, että löysi vastaavan kohdan toisessa raportissa — ehdottaa korjauksen ennakoivasti.',
                    nextWeek: 'Muut tiimiläiset ovat alkaneet jakaa vastaavia havaintoja avoimemmin.',
                },
            },
        ],
    },

    // ─── OSA 4: REWIND ─────────────────────────────────────────────────────────
    rewindPhase: {
        rewindExplanation:
            'Sama tilanne. Sama KPI-paine. Sama väsymys. Voit silti valita toisin — ei erilaisen ihmisen ominaisuudesta, vaan erilaisesta taidosta.',
        sameStressReminder:
            'Et ole erilainen ihminen. Sama stressi — eri lause.',
        alternatives: [
            {
                id: 'alt-boundary',
                text: '"Mia, tämä on hyvä kysymys. Minulla on nyt kiire — voitko laittaa sen kalenteriin? Käydään läpi perjantaina kunnolla."',
                tone: 'boundary',
                toneLabel: 'Rajakieli',
                explanation:
                    'Raja asetetaan selkeästi, mutta Mia ei tule torjutuksi. Kysymys tunnustetaan arvokkaaksi.',
                sceneReaction: {
                    targetReaction: 'Mia: "Selvä — laitan kutsun." (Helpottunut, ei torjuttu.)',
                    groupReaction: undefined,
                },
                analysis:
                    'Rajakieli toimii: se suojelee sinua ylikuormitukselta ilman, että se vahingoittaa toista.',
            },
            {
                id: 'alt-assertive',
                text: '"Mia, tämä kohta on ollut epäselvä ennenkin. Tarvitsemme ehkä paremman dokumentaation — otetaan se työnalle. Mutta nyt käydään läpi: tässä on se logiikka."',
                tone: 'assertive',
                toneLabel: 'Jämäkkyys',
                explanation:
                    'Asiallinen suoruus: ongelmaan puututaan — mutta ratkaisukeskeisesti ei syyttävästi.',
                sceneReaction: {
                    targetReaction: 'Mia: "Okei — hyvä idea. Voin tehdä sen dokumentaation."',
                    groupReaction: 'Muut tiimiläiset: "He saivat sen selvitettyä — ei dramaattisesti."',
                },
                analysis:
                    'Jämäkkyys ≠ aggressio. Aggressio sulkee — jämäkkyys avaa reittejä.',
            },
            {
                id: 'alt-self-aware',
                text: '"Hetkinen — olen tänään tosi tiukka aikataulujen kanssa ja saatan olla ärtynyt. Ei se sinusta johdu. Selitetään nopeasti ja palataan sitten."',
                tone: 'self-aware',
                toneLabel: 'Tietoisuus',
                explanation:
                    'Oman tilan nimeäminen vähentää toisen velvollisuutta tulkita sinua — ja rakentaa luottamusta.',
                sceneReaction: {
                    targetReaction: 'Mia: "...okei, kiitos että sanoit. Minustakin on vähän stressaavaa tänään."',
                    groupReaction: undefined,
                },
                analysis:
                    'Oman stressin nimeäminen ääneen on erilainen taito — mutta se vapauttaa molemmat.',
            },
        ],
        editableTemplate: {
            template: 'Tarvitsen [HETKI]. Sinä et ole [SYY]. Palataan tähän [TILANNE].',
            slots: [
                {
                    placeholder: '[HETKI]',
                    suggestion: 'hetken ennen kuin vastaatan',
                    hint: 'Miten pyydät itsellesi tilan',
                },
                {
                    placeholder: '[SYY]',
                    suggestion: 'ongelma',
                    hint: 'Poista syyttäminen',
                },
                {
                    placeholder: '[TILANNE]',
                    suggestion: 'kun minulla on enemmän aikaa',
                    hint: 'Milloin palaat aiheeseen',
                },
            ],
        },
        openTextPrompt: 'Tai kirjoita oma lauseesi — mitä voisit sanoa tässä tilanteessa saman stressin alla?',
    },

    // ─── OSA 5: KORJAAVA LIIKE ─────────────────────────────────────────────────
    repairPhase: {
        shameNormalization:
            'Moni esihenkilö on tässä tilanteessa — paineen alla, hyvistä aikomuksista huolimatta. Häpeä kertoo, että sinulla on omatunto. Se on lähtökohta muutokselle, ei este.',
        seatTakingText:
            'Olet esihenkilö joka teki X stressissä. Et ole "kiusaaja ikuisesti". Rooli ei ole ydinpersoona.',
        identityContrast: {
            old: '"Paineiden purkaja — vahvuudella eteenpäin"',
            new: '"Esihenkilö joka tunnistaa omat rajansa ja suojelee tiimiä ylikuormituksen heijastumiselta"',
        },
        repairActions: [
            {
                id: 'apology-private',
                label: 'Yksityinen anteeksipyyntö Mialle',
                category: 'apology',
                description: 'Lyhyt, suora — ilman selittelyä.',
                exampleText:
                    'Hei Mia — halusin sanoa, että eilen olin kireä ja se näkyi epäasiallisena sävynä. Se ei ollut reilua sinua kohtaan. Pahoittelen.',
                difficulty: 2,
            },
            {
                id: 'follow-up',
                label: 'Seurantapalaveri: asia oikeasti käydään läpi',
                category: 'conversation',
                description: 'Palataan itse kysymykseen — kunnolla. Kuunnellaan myös Mian prosessista.',
                difficulty: 1,
            },
            {
                id: 'self-stress',
                label: 'Hae tuki oman stressinhallintaan',
                category: 'self',
                description: 'Työnohjaukseen, esihenkilövalmennukseen tai terapiaan. Stressi ei katoa itsestään.',
                difficulty: 3,
            },
            {
                id: 'systemic',
                label: 'Nosta KPI-kulttuuri omalle esihenkilöllesi',
                category: 'systemic',
                description:
                    'Nosta rakenneongelma: "tarvitsemme paremmat resurssit perehdyttämiseen — muuten virheet jatkuvat."',
                difficulty: 3,
            },
        ],
        supportResources: [
            {
                label: 'Työnohjaus',
                description: 'Suomi: Suomen työnohjaajat ry listaa sertifioituja ohjaajia.',
            },
            {
                label: 'Esihenkilövalmennus',
                description: 'Monet HR-toimistot tarjoavat paineenhallintaan räätälöityjä valmennuksia.',
            },
            {
                label: 'Työterveys',
                description: 'Työterveyslääkäri tai -psykologi voi arvioida uupumuksen.',
            },
        ],
        cardPrompt: 'Yksi asia jonka opit tänään itsestäsi:',
        nextStepPrompt: 'Yksi lause jonka koitat seuraavan kerran kun tunnet stressin nousevan:',
    },
};
