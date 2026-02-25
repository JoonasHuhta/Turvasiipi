import type { PerpetratorScenario } from '../perpetrator-types';

/**
 * S5 — Uupunut auttaja
 * Hoiva- tai asiantuntija-alan ammattilainen, myötätuntouupumus.
 * Aggressio kohdistuu turvalliseen kohteeseen.
 * Korkein vaikeus — rakenteellinen ja kehollinen taso yhdistyvät.
 */
export const perpetratorScenario5Helper: PerpetratorScenario = {
    id: 'perpetrator-s5-helper',
    title: 'Uupunut auttaja',
    context:
        'Olet töissä hoiva-, opetus- tai asiantuntija-alalla. Sinulla on liiallinen vastuu, rajojen puute, ja jatkuvat muiden emotionaaliset tarpeet. Kollegasi Liisa pyytää apua tilanteessa, jossa sinulla ei ole enää mitään annettavaa.',
    role: 'helper',
    systemicPressure:
        'Kulttuuri, jossa auttaminen on normatiivinen vaatimus — sanominen "ei" koetaan hylkäämisenä tai laiskuutena. Organisaatiossa ei ole rakenteita, jotka tukisivat auttajien jaksamista.',
    difficulty: 5,
    difficultyLabel: 'Erittäin vaativa',
    durationMinutes: 25,
    learningGoal:
        'Tunnistaa, milloin oma rajojen puute vaikuttaa muihin — ja harjoitella rajojen asettamista ennen kuin kuorma siirtyy kollegaan.',
    triggerWarning: 'Skenaario käsittelee uupumusta ja myötätuntoväsymystä. Voit pitää tauon milloin tahansa.',

    characters: [
        {
            id: 'player',
            name: 'Sinä',
            role: 'Uupunut auttaja',
            color: '#6366f1',
            isPlayer: true,
        },
        {
            id: 'liisa',
            name: 'Liisa',
            role: 'Kollega',
            color: '#14b8a6',
            isTarget: true,
        },
    ],

    scene: {
        id: 'break-room',
        background: 'office',
        description: 'Taukotila. Olet juuri lopettanut pitkän asiakastilanteen. Liisa tulee sisään.',
    },

    // ─── OSA 1: PAINE ──────────────────────────────────────────────────────────
    pressurePhase: {
        intro:
            'Ennen kuin Liisa astuu ovesta sisään, sinulla on jo taustalla viikkojen kuorma. Katsotaan mitä on tapahtunut.',
        timeline: [
            {
                time: 'Viikko sitten',
                text: 'Ylitöitä neljänä päivänä. Et sanonut "ei" yhdellekään ylimääräiselle pyynnölle.',
                icon: '⏱️',
                stressImpact: 2,
            },
            {
                time: 'Kolme päivää sitten',
                text: 'Asiakas / oppilas / potilas joka oli erityisen haastavassa tilanteessa. Kantoit sitä töistä kotiin.',
                icon: '💔',
                stressImpact: 2,
            },
            {
                time: 'Eilen',
                text: 'Yöunet häiriintyneet. Herät ajattelemaan töitä.',
                icon: '😴',
                stressImpact: 1,
            },
            {
                time: 'Tänään',
                text: 'Kolmas intensiivinen asiakastilanne putkeen, ilman taukoa. Tunnet, että tyhjennyt.',
                icon: '🫙',
                stressImpact: 2,
            },
        ],
        internalMonologue:
            'En pysty enää. En pysty ottamaan lisää. Jos yksi ihminen pyytää minulta jotain, en tiedä miten reagoin.',
        stressStartLevel: 5,
        bodySignalAtStart: 'Täydellinen tyhjyyden tunne. Hartiat painuvat eteenpäin. Ei kyyneliä — liian uupunut. Vain tyhjyys.',
        question: 'Mitkä seuraavista tunnistat omasta tilanteestasi?',
        stressFactors: [
            {
                id: 'compassion-fatigue',
                label: 'Muiden kärsimyksen kuuleminen on alettu tuntua turruttavalta',
                description: 'Myötätuntouupumus: kehon reaktio suojata itseään liialliselta tunnesyötteeltä',
                icon: '🛡️',
                stressImpact: 2,
            },
            {
                id: 'no-boundaries',
                label: 'En ole osannut sanoa "ei" tarpeeksi',
                description: 'Rajojen puute kertyy — jokainen ylitetty raja nostaa kuormaa',
                icon: '🚪',
                stressImpact: 2,
            },
            {
                id: 'emotional-labor',
                label: 'Esitän olevani ok — vaikka en ole',
                description: 'Emotionaalinen työ: tunnetyön ja todellisen kokemuksen kuilu kasvaa',
                icon: '🎭',
                stressImpact: 1,
            },
            {
                id: 'no-support',
                label: 'Ei rakenteita oman jaksamisen tueksi',
                description: 'Organisaatio ei tue — auttajat ovat yksin omien resurssien kanssa',
                icon: '🏗️',
                stressImpact: 1,
            },
        ],
    },

    // ─── OSA 2: VAARAVYÖHYKE ───────────────────────────────────────────────────
    dangerZonePhase: {
        trigger: {
            characterId: 'liisa',
            text: 'Liisa: "Hei — sori, tiedän että olet ollut kiireinen, mutta mulla on nyt akuutti tilanne. Voitko auttaa hetken?"',
            style: 'question',
        },
        bodySignals: [
            'Reaktio on erilainen kuin tavallinen ärsytys — tämä on syvempää',
            'Voi tuntua tyhjyydeltä, jäätymiseltä tai äkilliseltä räjähdykseltä',
            'Kehosi on jo niin ylivireinen ettei sen voi enää havaita tavallisella tavalla',
            'Tämä ei ole heikkous — tämä on kehosi suojelumekanismi kuormituksen jälkeen',
        ],
        cognitiveNarrow:
            'Et enää pysty näkemään Liisaa ihmisenä joka tarvitsee apua — hän näyttäytyy kuormana johon sinulla ei ole kapasiteettia. Tämä on myötätuntouupumuksen merkki, ei sinun vikasi.',
        justificationOptions: [
            {
                type: 'blaming',
                text: '"Liisan olisi pitänyt hoitaa tämä itsekseen."',
                insight:
                    'Syyttäminen kollegaa siirtyy vastuun sinne missä se ei kuulu. Liisa ei tiedä tilaasi — hän pyytää apua hyvässä uskossa.',
            },
            {
                type: 'minimizing',
                text: '"Tämä on pieni asia — jotain kestettävä."',
                insight:
                    'Uupuneena pienetkin asiat tuntuvat ylivoimaisilta. "Kestä" on väärä neuvo — keho tarvitsee tauon.',
            },
            {
                type: 'authority',
                text: '"Tässä työssä pitää olla ammattilainen — tunteiden ei pidä vaikuttaa."',
                insight:
                    'Professionalismimyytti: auttamisaloilla tunteet ovat osa työtä — niiden kieltäminen ei poista niitä, vaan siirtää ne toisiin.',
            },
            {
                type: 'comparing',
                text: '"Liisalla on tuhat kertaa vaikeampaa — pitää auttaa."',
                insight:
                    'Myötätuntouupumuksen paradoksi: vertaaminen muiden kärsimykseen vahvistaa uupumusta — ei korjaa sitä.',
            },
        ],
        interpretations: [
            {
                id: 'hostile-1',
                text: '"Hän tulee aina juuri väärään aikaan."',
                isHostile: true,
                explanation:
                    'Liisa ei tiedä tilaasi. "Väärä aika" on sinun tilasi — ei hänen virheensä.',
            },
            {
                id: 'hostile-2',
                text: '"Hän ei pysty hoitamaan asioitaan itse — minäkö aina..',
                isHostile: true,
                explanation:
                    'Pyyntö nähdään aina toistuvana — mutta tämä tulkinta syntyy uupumuksen linssin läpi, ei todellisuudesta.',
            },
            {
                id: 'neutral-1',
                text: '"Liisalla on aito tarve — minulla on aito raja. Molemmat voivat olla totta."',
                isHostile: false,
                explanation:
                    'Neutraali. Kahden eri tarpeen samanaikainen validointi — tämä on avain rajakieleen.',
            },
            {
                id: 'neutral-2',
                text: '"Olen tyhjiinajettuna — tein tänään enemmän kuin yksi ihminen voi." ',
                isHostile: false,
                explanation:
                    'Oman tilanteen rehellinen tunnistaminen ilman syyllistämistä itselle tai Liisalle.',
            },
        ],
        groundingPrompt:
            'Ennen kuin reagoit — tunnista: en ole valmiina nyt. Liisa ei tiedä sitä. Miten voin kommunikoida tämän ilman vahinkoa?',
    },

    // ─── OSA 3: TEKO + SEURAUKSET ──────────────────────────────────────────────
    consequencePhase: {
        prompt: 'Liisa odottaa. Mitä sanot?',
        actions: [
            {
                id: 'snap',
                text: '"En pysty. En pysty. En pysty enää auttamaan ketään." (Äänessä väsymys ja turhautuminen yhdistyvät.)',
                severity: 'aggressive',
                icon: '🔴',
                shortTermSelfFeel: 'Räjähdys — hetken keveys sitten valtava häpeä.',
                shortTermBenefit: undefined,
                consequences: {
                    victimExperience: {
                        immediateThought: '"Olin häiriöksi. En olisi pitänyt pyytää."',
                        bodyReaction: 'Liisa jäätyy. Pyytää anteeksi vaikka ei tiedä mistä. Poistuu.',
                        longTermEffect: 'Liisa ei pyydä apua jatkossa. Hänen tilanteensa pahenee yksin.',
                    },
                    groupAtmosphere: {
                        immediate: 'Jos muita näkee tai kuulee, vaivaantunut hiljaisuus.',
                        longTerm: 'Liisa kertoo muille: "Hän on nyt äärirajoilla — ei kannata pyytää."',
                    },
                    selfAftermath: {
                        immediate: 'Hetken helpotus räjähdyksen jälkeen — sitten massiivinen häpeä ja syyllisyys.',
                        physical: 'Ei paranemista — lisää kuormaa häpeän muodossa.',
                        longTerm: 'Uupumus ei selvinnyt räjähdyksestä. Seuraava viikko on vaikeampi.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin kertoa ettei minulla ole kapasiteettia.',
                        impact: 'Liisa kärsi — ja minä sain lisää häpeää jo täyteen kippoon.',
                    },
                    nextDay: 'Liisa välttelee sinua. Sinä pahoittelet itsellesi koko aamun.',
                    nextWeek: 'Uupumus jatkuu — räjähdys ei korjannut mitään.',
                },
            },
            {
                id: 'force-yes',
                text: '"Joo-o, käydään." (Sanot kyllä vaikka et pysty. Apua annetaan tyhjistä käsistä.)',
                severity: 'avoidant',
                icon: '⚪',
                shortTermSelfFeel: 'Ei räjähdystä — mutta auttaminen tyhjentyneenä on lähes mahdotonta.',
                shortTermBenefit: 'Liisa sai teknisesti vastauksen.',
                consequences: {
                    victimExperience: {
                        immediateThought: '"Hän auttaa — mutta jotain on vialla."',
                        bodyReaction: 'Liisa aistii, ettei olet paikalla. apu on puolittainen.',
                        longTermEffect: 'Liisa sai avun — osittain. Mutta jäi myös tuntemaan pahoittelevan asiaa.',
                    },
                    groupAtmosphere: {
                        immediate: 'Näyttää ok ulospäin.',
                        longTerm: 'Sinä jatkat tyhjentymistä. Se tulee näkymään myöhemmin, pahemmin.',
                    },
                    selfAftermath: {
                        immediate: 'Ei räjähdystä — mutta ei myöskään lepoa.',
                        physical: 'Tyhjyyden tunne syvenee.',
                        longTerm: 'Burnout lähestyy.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin auttaa enkä halua pettää.',
                        impact: 'Apu oli heikkoa ja oma jaksaminen heikkeni entisestään.',
                    },
                    nextDay: 'Olet vaikeampi kuin eilen.',
                    nextWeek: 'Kehosi vaatii sairasloman.',
                },
            },
            {
                id: 'honest-limit',
                text: '"Liisa — olen juuri nyt aivan lopussa. Ei ole mitään väärää sinun pyyynnössäsi, mutta en pysty tänään. Voinko auttaa huomenna aamulla?"',
                severity: 'constructive',
                icon: '🟢',
                shortTermSelfFeel: 'Rehellisyys — se tuntuu haavoittuvalta mutta myös vapauttavalta.',
                shortTermBenefit: 'Liisa saa rehellisen vastauksen. Et romahtanut.',
                consequences: {
                    victimExperience: {
                        immediateThought: '"Hän on rehellinen — ei hylkää, asettaa rajan."',
                        bodyReaction: 'Liisa ymmärtää. Hakee ratkaisun muualta tai odottaa.',
                        longTermEffect: 'Luottamus säilyy. Liisa tietää, että hän voi pyytää — mutta sinulla on myös rajat.',
                    },
                    groupAtmosphere: {
                        immediate: 'Neutraali.',
                        longTerm: 'Normi: ihmiset saavat sanoa "nyt ei onnistu" ilman häpeää.',
                    },
                    selfAftermath: {
                        immediate: 'Haavoittuvainen — mutta ei räjähdystä.',
                        physical: 'Pieni helpotus. Raja suojeli.',
                        longTerm: 'Olet seuraavana päivänä enemmän paikalla Liisalle.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin suojata itseäni ilman vahingoittamista.',
                        impact: 'Molemmat säilyivät — ja yhteys jatkuu.',
                    },
                    nextDay: 'Liisa tulee aamulla. Autat kunnolla.',
                    nextWeek: 'Olet jaksavampi kuin jos olisit sanonut kyllä.',
                },
            },
            {
                id: 'pause-first',
                text: '"Annatko minulle minuutin?" (Istut alas. Hengität. Sitten kerrot tilanteesi lyhyesti.)',
                severity: 'constructive',
                icon: '🌊',
                shortTermSelfFeel: 'Tauko ennen reaktiota. Hermoston lievä rauhoittuminen.',
                shortTermBenefit: 'Et toiminut ylivireydessä.',
                consequences: {
                    victimExperience: {
                        immediateThought: '"Hän kerää itsensä — se on ok."',
                        bodyReaction: 'Liisa odottaa. Respekti.',
                        longTermEffect: 'Sinä ja Liisa rakennat yhteistä tapaa kommunikoida rajoja.',
                    },
                    groupAtmosphere: {
                        immediate: 'Rauhallinen.',
                        longTerm: 'Se minuutti vältti räjähdyksen joka olisi vahingoittanut molempia.',
                    },
                    selfAftermath: {
                        immediate: 'Minuutti rauhoitti hermoston tarpeeksi puhua.',
                        physical: 'Pieni palautuminen.',
                        longTerm: 'Parempi yhteys Liisaan. Parempi ymmärrys omista rajoista.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin hetken ennen kuin sanon mitään.',
                        impact: 'Tauko suojeli molempia.',
                    },
                    nextDay: 'Liisa tulee sanomaan: "Kiitos eilisestä."',
                    nextWeek: 'Alat ymmärtää paremmin milloin tarvitset taukoa.',
                },
            },
        ],
    },

    // ─── OSA 4: REWIND ─────────────────────────────────────────────────────────
    rewindPhase: {
        rewindExplanation:
            'Sama hetki. Sama tyhjyyden tunne. Liisa ei muutu — mutta sinulla voi olla lause valmiina.',
        sameStressReminder:
            'Rajojen asettaminen ei ole hylkäämistä. Se suojelee molempia.',
        alternatives: [
            {
                id: 'alt-honest',
                text: '"Liisa — olen nyt aivan tyhjillä. Se ei johdu sinusta. Voinko auttaa huomenna aamulla klo 9?"',
                tone: 'boundary',
                toneLabel: 'Rehellinen raja',
                explanation:
                    'Oman tilan ääneen sanominen + konkreettinen vaihtoehto. Liisa ei tule torjutuksi — hän saa rehellisen vastauksen.',
                sceneReaction: {
                    targetReaction: 'Liisa: "Selvä — kiitos rehellisyydestä. Hoidan sen itse tai odoan."',
                    groupReaction: undefined,
                },
                analysis:
                    'Tämä on rajakielen ydin: minus ei ole este — se suojelee molempia.',
            },
            {
                id: 'alt-minute',
                text: '"Annatko hetken?" (Minuutti. Silmät kiinni. Kolme hengitystä. Sitten: "Käydään läpi.")',
                tone: 'self-aware',
                toneLabel: 'Tauko itselle',
                explanation:
                    'Hermosto rauhoittuu jonkin verran jo 60 sekunnissa. Tauko ennen reaktiota on kehollinen taito.',
                sceneReaction: {
                    targetReaction: 'Liisa: (odottaa) "Selvä, otetaan rauhassa."',
                    groupReaction: undefined,
                },
                analysis:
                    'Tauko on aktiivinen valinta — ei pako. Se estää ylivireyden siirtymisen toiseen.',
            },
            {
                id: 'alt-delegate',
                text: '"Minulla ei ole nyt kapasiteettia — pystynkö laittamaan sinut Markon luo, hän on juuri nyt paremmin käytettävissä?"',
                tone: 'help_seeking',
                toneLabel: 'Delegointi + ohjaus',
                explanation:
                    'Delegointi on auttamisen muoto — ei luovuttaminen. Liisa saa tarvitsemansa avun.',
                sceneReaction: {
                    targetReaction: 'Liisa: "Okei — hyvä idea. Kiitos."',
                    groupReaction: undefined,
                },
                analysis:
                    'Auttamisaloilla delegointi on ammattitaito, ei epäonnistuminen.',
            },
        ],
        editableTemplate: {
            template: 'Olen nyt [OMA TILA]. Se ei johdu sinusta. [VAIHTOEHTO TAI AIKA].',
            slots: [
                {
                    placeholder: '[OMA TILA]',
                    suggestion: 'aivan tyhjillä',
                    hint: 'Rehellinen — ei syytös itselle tai toiselle',
                },
                {
                    placeholder: '[VAIHTOEHTO TAI AIKA]',
                    suggestion: 'Voin auttaa huomenna aamulla',
                    hint: 'Konkreettinen vaihtoehto — ei vain "ei"',
                },
            ],
        },
        openTextPrompt:
            'Tai kirjoita omin sanoin — mitä voisit sanoa kun olet täysin tyhjillä mutta et halua vahingoittaa?',
    },

    // ─── OSA 5: KORJAAVA LIIKE ─────────────────────────────────────────────────
    repairPhase: {
        shameNormalization:
            'Myötätuntouupumus on tunnustettua ammatillista kärsimystä — erityisesti hoiva-, opetus- ja asiantuntija-aloilla. Se ei ole heikkous. Se on merkki siitä, että olet antanut liikaa ilman täydentymistä.',
        seatTakingText:
            'Olet auttaja joka antoi enemmän kuin sinulla oli. Rajat ovat eettinen velvollisuus — ei itsekkyys.',
        identityContrast: {
            old: '"Rajaton auttaja — aina saatavilla, loppuun asti"',
            new: '"Kestävä auttaja — tiedot rajani, jotta voin auttaa kunnolla"',
        },
        repairActions: [
            {
                id: 'check-liisa',
                label: 'Tarkista Liisan tilanne — hae hänet',
                category: 'conversation',
                description: 'Matalan kynnyksen yhteydenotto — toteaa, että olet olemassa.',
                exampleText: 'Hei Liisa — menin eilen kiinni jumittumaan. Hoidettiinko se asia? Miten sulla menee nyt?',
                difficulty: 1,
            },
            {
                id: 'own-support',
                label: 'Hae tukea itsellesi — työnohjaukseen tai terapiaan',
                category: 'self',
                description: 'Uupumus ei korjaannu itsekseen. Ammattituki on investointi — ei heikkous.',
                difficulty: 2,
            },
            {
                id: 'sick-leave',
                label: 'Harkitse sairaslomaa — tai ainakin täydellistä lepoviikkoa',
                category: 'self',
                description: 'Työterveys: uupumus on diagnosoitava tila, ei moraalinen epäonnistuminen.',
                difficulty: 3,
            },
            {
                id: 'systemic-raise',
                label: 'Nosta asia esihenkilöllä: resurssit ja rakenteet',
                category: 'systemic',
                description: 'Yksilön ongelma on usein organisaation rakenneongelma — nosta se ääneen.',
                difficulty: 3,
            },
        ],
        supportResources: [
            {
                label: 'Työterveys',
                description: 'Myötätuntouupumus on lääketieteellisesti tunnustettu tila — työterveyslääkäri arvioi.',
            },
            {
                label: 'Työnohjaus',
                description: 'Erityisesti hoiva- ja opetusaloilla: Suomen työnohjaajat ry.',
            },
            {
                label: 'Burnout-testi',
                description: 'Suomessa käytössä mm. MBI (Maslach Burnout Inventory) — pyydä viittaus työterveyslääkäriltä.',
            },
        ],
        cardPrompt: 'Yksi asia jonka opit tänään omista rajoistasi:',
        nextStepPrompt: 'Yksi konkreettinen askel oman jaksamisesi suojelemiseksi:',
    },
};
