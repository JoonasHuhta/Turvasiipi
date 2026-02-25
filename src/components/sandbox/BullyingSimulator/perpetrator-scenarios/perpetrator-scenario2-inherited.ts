import type { PerpetratorScenario } from '../perpetrator-types';

/**
 * S2 — Peritty malli
 * Kollega joka on itse aiemmin ollut kiusattu, huomaa
 * toistavansa opittua mallia uudelle tiimiläiselle.
 */
export const perpetratorScenario2Inherited: PerpetratorScenario = {
    id: 'perpetrator-s2-inherited',
    title: 'Peritty malli',
    context:
        'Sinä olet nousemassa hierarkiassa ylöspäin. Uusi tiimiläinen Aleksi muistuttaa sinua itseäsi muutama vuosi sitten — epävarma, paljon kysymyksiä. Huomaat äkkiä, että olet alkanut puhua hänelle niin kuin sinulle aikanaan puhuttiin.',
    role: 'colleague',
    systemicPressure:
        'Organisaatio palkitsee itsevarmuuden ja nopeuden. "Aloittelijana sinun piti oppia itse — niin oppii muutkin." Mentorointiin ei ole rakenteita eikä aikaa.',
    difficulty: 4,
    difficultyLabel: 'Vaativa',
    durationMinutes: 22,
    learningGoal:
        'Tunnistaa opitun mallin joka toistuu — ja harjoitella ketjun katkaisemista siinä kohdassa.',
    triggerWarning: 'Skenaario sisältää viittauksia aiempaan kiusaamiseen omana kokemuksena.',

    characters: [
        {
            id: 'player',
            name: 'Sinä',
            role: 'Vanhempi kollega',
            color: '#6366f1',
            isPlayer: true,
        },
        {
            id: 'aleksi',
            name: 'Aleksi',
            role: 'Uusi tiimiläinen',
            color: '#3b82f6',
            isTarget: true,
        },
    ],

    scene: {
        id: 'workstation',
        background: 'office',
        description: 'Avotoimisto. Aleksi on pöytäsi vieressä. Muut kuulevat keskustelunne.',
    },

    // ─── OSA 1: PAINE ──────────────────────────────────────────────────────────
    pressurePhase: {
        intro:
            'Ennen kuin tämä tilanne alkoi, taustalla oli jo paljon. Katsotaan päivää — ja myös kuvioita kauempaa menneisyydestä.',
        timeline: [
            {
                time: 'Viisi vuotta sitten',
                text: 'Aloitit tässä tiimissä. Vanhempi kollega sanoi: "Jos et osaa tätä, et kuulu tähän tiimiin." Et löytänyt apua mistään.',
                icon: '🕰️',
                stressImpact: 2,
            },
            {
                time: 'Kolme vuotta sitten',
                text: 'Olit viimein "sisällä". Ajattelit: "Se kovuus teki minusta paremman." Opit selviytymisen arvoksi.',
                icon: '🎖️',
                stressImpact: 1,
            },
            {
                time: 'Tänään, klo 9:00',
                text: 'Aleksi on jo kolmatta kertaa tullut kysymään neuvoa. Huokailet — muut kuulevat.',
                icon: '😤',
                stressImpact: 1,
            },
            {
                time: 'Tänään, klo 11:00',
                text: 'Palaverissa sanoit Aleksin ideasta: "Tää on jo kokeiltu, ei toimi." Et selittänyt miksi.',
                icon: '🚫',
                stressImpact: 1,
            },
        ],
        internalMonologue:
            'Minulle ei tarjottu kädestä pitämistä — ja katso nyt missä olen. Se kasvatti minua. Aleksin pitää oppia itse.',
        stressStartLevel: 2,
        bodySignalAtStart: 'Ärsytys ei tunnu stressiltä — se tuntuu oikeutukselta.',
        question: 'Mitkä tunnistuvat sinulle?',
        stressFactors: [
            {
                id: 'own-past',
                label: 'Muistan oman kovuusopetuksen — se toimii',
                description: 'Opittu malli, joka on sisäistetty selviytymisstrategiaksi',
                icon: '🔄',
                stressImpact: 2,
            },
            {
                id: 'status-threat',
                label: 'Aleksi on nuorempi ja ottamassa tilaa',
                description: 'Aseman uhka — vanhat rakenteet hakevat turvallisuutta hierarkiasta',
                icon: '🎯',
                stressImpact: 1,
            },
            {
                id: 'no-time',
                label: 'Minulla ei yksinkertaisesti ole aikaa perehdyttää',
                description: 'Kiire on aito — mutta toimii myös selityksenä',
                icon: '⏱️',
                stressImpact: 1,
            },
            {
                id: 'peer-pressure',
                label: 'Muut kollegat eivät auta Aleksia myöskään',
                description: 'Ryhmänormi: "näin täällä toimitaan"',
                icon: '👥',
                stressImpact: 1,
            },
        ],
    },

    // ─── OSA 2: VAARAVYÖHYKE ───────────────────────────────────────────────────
    dangerZonePhase: {
        trigger: {
            characterId: 'aleksi',
            text: 'Aleksi: "Hei — sori taas, mutta mulla on vielä yksi kysymys tosta prosessista. Voinko häiritä hetken?"',
            style: 'question',
        },
        bodySignals: [
            'Ärsytyspiikki — nopea, automaattinen',
            'Ajatus: "Taas se" ennen kuin hän on lopettanut lauseen',
            'Kehossasi ei varsinaista stressiä — enemmän "kärsimättömyyttä"',
            'Ärsytys tuntuu oikeutetulta — mikä tekee siitä vaarallisemman',
        ],
        cognitiveNarrow:
            'Huomaat vertaavasi Aleksia itseesi. "Minä opin. Hän voisi oppia myös." Tämä sulkee muut selitykset pois näkyvistäsi.',
        justificationOptions: [
            {
                type: 'authority',
                text: '"Minulle tehtiin niin — se kehitti minua. Sama toimii Aleksille."',
                insight:
                    'Trauma-perustelu: kokemus siitä, että "se kasvatti minua", ei tee menetelmästä hyvää — se tarkoittaa vain, että selvisit siitä.',
            },
            {
                type: 'honesty',
                text: '"Suoruus on tässä tiimissä arvostettua. Pehmoilu ei auta ketään."',
                insight:
                    'Kulttuurinormi, joka on siirretty sisäiseksi arvoksi. Suoruus ≠ kovuus. Selkeys on mahdollista ilman loukkaavuutta.',
            },
            {
                type: 'blaming',
                text: '"Jos hän ei hae vastausta itse, hän ei kehity."',
                insight:
                    'Vastuunsiirto. Uudet tiimiläiset tarvitsevat usein enemmän rakennetta kuin veteraanit muistavat tarvinneensa.',
            },
            {
                type: 'group_defense',
                text: '"Tässä tiimissä kaikki ovat oppineet niin. Miksi hän olisi erilainen?"',
                insight:
                    'Ryhmänormin käyttö oikeutuksena — vaikka normi itse olisi haitallinen.',
            },
        ],
        interpretations: [
            {
                id: 'hostile-1',
                text: '"Hän ei yritä löytää vastausta itse — laiskuus."',
                isHostile: true,
                explanation:
                    'Laiskuuden leima on yleensä oire epäselvistä ohjeista tai pelon kulttuurista — ei henkilön motivaatiosta.',
            },
            {
                id: 'hostile-2',
                text: '"Hän pyytää apua liikaa — se on heikkous."',
                isHostile: true,
                explanation:
                    'Avunpyytäminen on merkki luottamuksesta ja oppimishalusta — ei heikkoudesta. Tämä tulkinta on opittu kulttuurista, ei todellisuudesta.',
            },
            {
                id: 'neutral-1',
                text: '"Hänellä on ehkä vielä epäselvä kuva prosessista — perehdytys on kesken."',
                isHostile: false,
                explanation:
                    'Neutraali tulkinta. Yleisin syy toistuviin kysymyksiin on rakenteiden epäselvyys, ei henkilön ominaisuudet.',
            },
            {
                id: 'neutral-2',
                text: '"Hän muistuttaa minua alussa — ja silloin olisin tarvinnut apua."',
                isHostile: false,
                explanation:
                    'Empaattinen muisti. Tämä tulkinta katkaisee perityn mallin ketjun — ja se on vaikea, mutta tärkeä.',
            },
        ],
        groundingPrompt:
            'Ennen kuin vastat — hengitä hetki. Muistatko miltä sinusta tuntui, kun kukaan ei auttanut?',
    },

    // ─── OSA 3: TEKO + SEURAUKSET ──────────────────────────────────────────────
    consequencePhase: {
        prompt: 'Aleksi odottaa vastaustasi. Mitä teet?',
        actions: [
            {
                id: 'dismissive',
                text: '"Katso dokumentaatiosta. Jos et löydä, googlaile." (Kääntyminen takaisin näyttöön.)',
                severity: 'aggressive',
                icon: '🔴',
                shortTermSelfFeel: 'Tuntuu tehokkaalta. Annettiin selkeä vastaus.',
                shortTermBenefit: 'Aleksi ei tule kysymään heti uudelleen.',
                consequences: {
                    victimExperience: {
                        immediateThought: '"Olen häiriöksi. Opin, että en saa pyytää apua täällä."',
                        bodyReaction: 'Puna nousee kasvoille. Palaa paikalleen hiljaa.',
                        longTermEffect:
                            'Aleksi alkoi hakea vastauksia muilta organisaation ulkopuolelta — tiedonpirstaloituminen kasvoi. Kolmen kuukauden kuluttua hän haki muualle.',
                    },
                    groupAtmosphere: {
                        immediate: 'Muut näkivät. Ketju jatkuu — seuraava uusi henkilö oppii jo ennen kuin edes saapuu, miten täällä "toimitaan".',
                        longTerm: 'Tiimi mainittiin rekrytointihaastatteluissa: "siellä on kova kulttuuri."',
                    },
                    selfAftermath: {
                        immediate: 'Tuntuu oikeutetulta. Tehokas.',
                        physical: 'Ei kehollista epämukavuutta — tämä on automatisoitunut.',
                        longTerm: 'Ketju jatkuu. Viiden vuoden kuluttua joku uusi tekee sinulle saman.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin, että Aleksi oppii itsenäisyyttä.',
                        impact: 'Aleksi oppi, että apua ei saa pyytää — ja organisaatiot menettää osaajan.',
                    },
                    nextDay: 'Aleksi ei tule kysymään. Löydt myöhemmin virheen hänen tuotoksestaan.',
                    nextWeek: 'Aleksi alkaa tulla töihin myöhemmin ja lähtemään aiemmin.',
                },
            },
            {
                id: 'sigh-loud',
                text: '(Näkyvä huokaisu, laitat kuulokkeet päähän.) "Joo-o, mitkä on ne kysymykset sitten."',
                severity: 'passive_aggressive',
                icon: '🟠',
                shortTermSelfFeel: 'Et kieltäytynyt — mutta keho viesittää ärtymystä.',
                shortTermBenefit: undefined,
                consequences: {
                    victimExperience: {
                        immediateThought: '"Hän vastaa, mutta se on raskasta hänelle. Olen taakka."',
                        bodyReaction: 'Aleksi puhuu nopeammin, äänessä pahoittelu.',
                        longTermEffect: 'Aleksi alkoi rajata kysymyksensä minimiin — tiedonkulku katkesi.',
                    },
                    groupAtmosphere: {
                        immediate: 'Vaivaantunut hiljaisuus lähipiirissä.',
                        longTerm: 'Uudet henkilöt alkoivat tutkia kulttuuria ennen kuin tulivat kysymään mitään.',
                    },
                    selfAftermath: {
                        immediate: 'Ei selvää purkausta — mutta ei helpotustakaan.',
                        physical: 'Ärtymys jää kehoon.',
                        longTerm: 'Aleksi ei tuo sinulle tietoa jota tarvitset — koska hän pelkää reaktiota.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin, että Aleksi tietää ettei tämä ole sopivaa.',
                        impact: 'Aleksi lopetti kysymisen — mikä on huonompi tulos kuin liika kysyminen.',
                    },
                    nextDay: 'Aleksi lähettää epävarman kysymyksen sähköpostilla sen sijaan, että kysynyt kasvotusten.',
                    nextWeek: 'Työtulos sisältää virheitä joita ei rohkaistu nostamaan esiin.',
                },
            },
            {
                id: 'short-help',
                text: '"Joo, käydään." (Selität nopeasti ilman katsekontaktia, takaisin töihin.)',
                severity: 'avoidant',
                icon: '⚪',
                shortTermSelfFeel: 'Nopea ja toiminnallinen — velvollisuus täytetty.',
                shortTermBenefit: 'Aleksi sai vastauksen.',
                consequences: {
                    victimExperience: {
                        immediateThought: '"Sain vastauksen — mutta hän ei oikeasti halunnut auttaa."',
                        bodyReaction: 'Kiitos sanottiin nopeasti ja Aleksi palasi omalle paikalleen.',
                        longTermEffect: 'Yhteys jäi pintapuoliseksi. Aleksi ei kertonut ongelmista ennen kuin ne olivat kasvaneet.',
                    },
                    groupAtmosphere: {
                        immediate: 'Neutraali.',
                        longTerm: 'Tiimiyhteys jäi transaktionaaliseksi.',
                    },
                    selfAftermath: {
                        immediate: 'Ok. Suoritettu.',
                        physical: 'Ei mitään erityistä.',
                        longTerm: 'Et rakentanut luottamusta — etkä välttämättä saanut tietoa kun sitä tarvitsit.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin hoitaa asian pois alta.',
                        impact: 'Asia hoidettiin — mutta ihminen sen takana jäi sivuun.',
                    },
                    nextDay: 'Aleksi selviytyy — mutta ei kuontuisi sinuun apuun jatkossa.',
                    nextWeek: 'Tiimissä on hyvä etäisyys — ei huono, muttei myöskään yhteistyötä.',
                },
            },
            {
                id: 'break-chain',
                text: '"Hei, joo — ja halusin muuten sanoa jotain. Muistan miten haastavaa alussa oli. Käydään tää kunnolla läpi, ja laitetaan myös dokumentaatioon niin se on selvempi muillekin."',
                severity: 'constructive',
                icon: '🟢',
                shortTermSelfFeel: 'Ei automaattinen — vaati valintaa. Mutta se tuntui erilaiselta.',
                shortTermBenefit: 'Aleksi sai vastauksen ja yhteyden. Prosessi selkeni myös muille.',
                consequences: {
                    victimExperience: {
                        immediateThought: '"Hän oikeasti auttaa. Voin kysyä lisää."',
                        bodyReaction: 'Hartiat laskeutuivat. Aleksi puhui avoimemmin.',
                        longTermEffect:
                            'Aleksi alkoi tuoda ongelmia esiin ennen kuin ne kasvoivat. Työtulos parani.',
                    },
                    groupAtmosphere: {
                        immediate: 'Muut näkivät — ja se muutti normia hitusen.',
                        longTerm: 'Tiimiin alkoi tulla enemmän avoimia kysymyksiä — ketju katkesi yhdessä hetkessä.',
                    },
                    selfAftermath: {
                        immediate: 'Ehkä yllätys — se ei tuntunut heikkoudelta.',
                        physical: 'Rentous hartioissa.',
                        longTerm: 'Aleksi tuli kertomaan ongelmasta ajoissa — säästit projektin virheen.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin katkaista ketjun joka jatkui minussa.',
                        impact: 'Ketju katkesi. Aleksi jäi tiimiin. Dokumentaatio parani.',
                    },
                    nextDay: 'Aleksi sanoo hyvää huomenta hymyillen.',
                    nextWeek: 'Aleksi tuo palaverissa esiin ongelman ennen kuin se on kasvanut suuremmaksi.',
                },
            },
        ],
    },

    // ─── OSA 4: REWIND ─────────────────────────────────────────────────────────
    rewindPhase: {
        rewindExplanation:
            'Sama Aleksi. Sama kysymys. Ketju joka on kestänyt vuosia — se voidaan katkaista juuri tässä kohdassa.',
        sameStressReminder:
            'Et tarvitse olla erilainen ihminen. Tarvitset vain yhden toisenlaisen valinnan.',
        alternatives: [
            {
                id: 'alt-memory',
                text: '"Hei, joo — muistan ittekin, miten epäselviä nää olivat alussa. Käydään läpi."',
                tone: 'self-aware',
                toneLabel: 'Empaattinen muisti',
                explanation:
                    'Oman historiansa käyttö yhteyden rakentamiseen — ei opitun mallin jatkamiseen.',
                sceneReaction: {
                    targetReaction: 'Aleksi: "Okei — kiitos." (Kehonkieli avautuu.)',
                    groupReaction: 'Muut: hiljaa — mutta huomasivat.',
                },
                analysis:
                    'Tämä katkaisee ketjun: sen sijaan, että käyttäisit omaa kipuasi oikeutuksena, käytät sitä empatiaan.',
            },
            {
                id: 'alt-structure',
                text: '"Laitan nyt kalenteriin 30 minuuttia perjantaiksi — käydään kaikki avoimet läpi kerralla. Toimiiko?"',
                tone: 'assertive',
                toneLabel: 'Rakenne',
                explanation:
                    'Rakenteen luominen suojelee sinua jatkuvalta katkeamiselta — ja antaa Aleksille selkeän tuen.',
                sceneReaction: {
                    targetReaction: 'Aleksi: "Joo, toimii täydellisesti!"',
                    groupReaction: undefined,
                },
                analysis:
                    'Ongelma ei ole Aleksissa — ongelma on siinä, ettei perehdytykselle ole rakennetta. Tämä muuttaa sen.',
            },
            {
                id: 'alt-boundary-kind',
                text: '"Aleksi, minulla on nyt kiireinen hetki. Laita tämä ylös ja palataan siihen klo 14. Silloin ehdin kunnolla."',
                tone: 'boundary',
                toneLabel: 'Raja + kunnioitus',
                explanation:
                    'Raja asetetaan — mutta se ei hylkää. Aleksi ei tule torjutuksi, vain ajankohtaa siirretään.',
                sceneReaction: {
                    targetReaction: 'Aleksi: "Selvä — laitan muistiinpanon."',
                    groupReaction: undefined,
                },
                analysis:
                    'Rajakieli on mahdollinen ilman kovuutta. Se suojelee sinua ja kunnioittaa Aleksia.',
            },
        ],
        editableTemplate: {
            template: 'Muistan miten [OMA KOKEMUS]. Sen takia haluan [MITÄ TEET NYTAEN].',
            slots: [
                {
                    placeholder: '[OMA KOKEMUS]',
                    suggestion: 'epäselvää alussa oli',
                    hint: 'Oma muisto apuna — ei oikeutuksena vaan yhteydessä',
                },
                {
                    placeholder: '[MITÄ TEET NYT]',
                    suggestion: 'tehdä tästä selkeämmän',
                    hint: 'Konkreettinen teko joka katkaisee ketjun',
                },
            ],
        },
        openTextPrompt: 'Tai kirjoita omin sanoin — mitä voisit sanoa kun muistat oman alkuaikasi?',
    },

    // ─── OSA 5: KORJAAVA LIIKE ─────────────────────────────────────────────────
    repairPhase: {
        shameNormalization:
            'Moni ihminen toistaa opittua mallia tietämättään — erityisesti jos se on auttanut heitä selviytymään. Häpeä kertoo nyt, että huomasit. Se on iso askel.',
        seatTakingText:
            'Sinä olet kollega joka on siirtänyt opittua mallia eteenpäin. Et ole "kiusaaja ikuisesti". Olet ihminen joka voi nyt valita toisin.',
        identityContrast: {
            old: '"Kovuuden välittäjä — selviytyminen kasvattaa"',
            new: '"Ketjun katkaisija — se mitä minulle tehtiin loppuu minuun"',
        },
        repairActions: [
            {
                id: 'check-in',
                label: 'Hakeudu Aleksin luo ja kysy miten menee',
                category: 'conversation',
                description: 'Matalan kynnyksen yhteydenotto — ei kohtaaminen, vaan ovi auki.',
                exampleText:
                    'Hei Aleksi — miten sulla menee täällä? Onko teillä tarvittava tuki alussa?',
                difficulty: 1,
            },
            {
                id: 'apology-light',
                label: 'Kevyt tunnustus',
                category: 'apology',
                description: 'Et tarvitse pitkää selivttämistä — pieni tunnustus riittää.',
                exampleText:
                    'Aleksi, olen huomannut että olen ollut lyhytsanainen — se ei ollut tarkoituksellista. Olen käytettävissä jos tulee kysyttävää.',
                difficulty: 2,
            },
            {
                id: 'structure',
                label: 'Luo perehdytyskäytäntö',
                category: 'systemic',
                description: 'Ehdota tiimille säännöllistä Q&A-aikaa uusille henkilöille.',
                difficulty: 3,
            },
            {
                id: 'own-reflection',
                label: 'Reflektoi mistä oma malli tuli',
                category: 'self',
                description: 'Työnohjauksessa tai itsekseen: mistä "kovuus kasvattaa" -uskomus on peräisin?',
                difficulty: 2,
            },
        ],
        supportResources: [
            {
                label: 'Trauma-tietoinen itsereflektio',
                description: 'Monet coaching-palvelut tarjoavat oman historian käsittelyä ammatillisessa kontekstissa.',
            },
            {
                label: 'Mentoroinnin koulutukset',
                description: 'HR-toimistot tarjoavat lyhytkoulutuksia uusien henkilöiden tukemiseen.',
            },
        ],
        cardPrompt: 'Yksi asia jonka opit tänään omasta historiastasi:',
        nextStepPrompt: 'Yksi konkreettinen teko jonka teet Aleksin suuntaan:',
    },
};
