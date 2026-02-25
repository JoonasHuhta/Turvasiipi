import type { PerpetratorScenario } from '../perpetrator-types';

/**
 * S4 — Ryhmäpaine
 * Ryhmän jäsen, joka ei halua jäädä ulkopuolelle.
 * Pelkolähtöinen osallistuminen kiusaamiseen.
 */
export const perpetratorScenario4Group: PerpetratorScenario = {
    id: 'perpetrator-s4-group',
    title: 'Ryhmäpaine',
    context:
        'Olet lounaalla tutun kaveriporukan kanssa. He ovat alkaneet piikitellä yhtä yhteistä tuttavaa Sannaa — joka ei ole paikalla. Kaikki nauravat. Sinä tiedät, että Sannalla on ollut vaikea aika. Kaikki katsovat sinuun pyytäen myötäilyä.',
    role: 'group_member',
    systemicPressure:
        'Porukassa on vakiintunut hierarkia: on "sisäpiiri" ja "ulkopiiri". Sannan kohteleminen vahvistaa omaa asemaa.',
    difficulty: 3,
    difficultyLabel: 'Kohtalainen',
    durationMinutes: 18,
    learningGoal:
        'Tunnistaa sosiaalinen palkinto kiusaamiseen osallistumisessa — ja harjoitella vaihtoehto joka ei tarkoita ryhmästä poistumista.',
    triggerWarning: undefined,

    characters: [
        {
            id: 'player',
            name: 'Sinä',
            role: 'Ryhmän jäsen',
            color: '#6366f1',
            isPlayer: true,
        },
        {
            id: 'sanna',
            name: 'Sanna',
            role: 'Kohde (ei paikalla)',
            color: '#ec4899',
            isTarget: true,
        },
        {
            id: 'ryhmä',
            name: 'Ryhmä',
            role: 'Muut lounastajat',
            color: '#f59e0b',
        },
    ],

    scene: {
        id: 'lunch',
        background: 'cafeteria',
        description: 'Henkilöstöravintola / sisäpiha. Sanna ei ole paikalla. Muut ryhmän jäsenet ovat.',
    },

    // ─── OSA 1: PAINE ──────────────────────────────────────────────────────────
    pressurePhase: {
        intro:
            'Ennen lounasta taustalla on jo jotain. Katsotaan mikä tilanne on — ja mitä se tarkoittaa sinulle sosiaalisesti.',
        timeline: [
            {
                time: 'Kaksi viikkoa sitten',
                text: 'Olit nuuskahtanut ryhmänjutulle — ja tunsit olevasi "ulkona" seuraavat päivät. Se tuntui pahalta.',
                icon: '❄️',
                stressImpact: 1,
            },
            {
                time: 'Viime viikolla',
                text: 'Sanna sai promootion jonka sinäkin toivoit. Porukassa alkoi kuiskintaa.',
                icon: '📊',
                stressImpact: 1,
            },
            {
                time: 'Tänään, lounaalle mentäessä',
                text: 'Yksi ryhmän jäsenistä sanoi jo käytävällä: "Muistatteko Sannan elostartin?" ja nauroi.',
                icon: '😄',
                stressImpact: 1,
            },
        ],
        internalMonologue:
            'Jos en naura, he huomaavat. Jos he huomaavat, minusta tulee seuraava. Siinä vaan — ei tässä ketään oikeasti loukata.',
        stressStartLevel: 2,
        bodySignalAtStart: 'Sosiaalinen ahdistus — ei kehollinen ylivireys, vaan huoli ryhmäasemasta.',
        question: 'Mitkä tekijät tunnistuvat?',
        stressFactors: [
            {
                id: 'fear-exclusion',
                label: 'Pelkäsin tulevan sivuutetuksi tai torjutuksi',
                description: 'Ulkopuolisuuden pelko on voimakas motivaattori — evoluutio on rakentanut meidät välttämään sitä',
                icon: '😰',
                stressImpact: 2,
            },
            {
                id: 'envy',
                label: 'Sannan menestys herätti myös kateutta',
                description: 'Kateus on normaali tunne — mutta se voi olla ponnahduslauta kiusaamiseen osallistumiseen',
                icon: '🎯',
                stressImpact: 1,
            },
            {
                id: 'group-norm',
                label: 'Tässä porukassa on aina tehty näin',
                description: 'Ryhmänormin naturalisoituminen — "kun kaikki tekevät, se tuntuu normaalilta"',
                icon: '👥',
                stressImpact: 1,
            },
            {
                id: 'anonymity',
                label: 'Ryhmässä tuntee olevansa näkymättömämpi',
                description: 'Sosiaalinen diffuusio: vastuun jakautuminen ryhmälle heikentää yksilöllistä pidikettä',
                icon: '🌫️',
                stressImpact: 1,
            },
        ],
    },

    // ─── OSA 2: VAARAVYÖHYKE ───────────────────────────────────────────────────
    dangerZonePhase: {
        trigger: {
            characterId: 'ryhmä',
            text: '"...ja sit se elostartti-homma — haha! Eikö olekin aika surkea." (Kaikki katsovat sinuun odottavasti. Hiljaisuus. Odotetaan.)',
            style: 'normal',
        },
        bodySignals: [
            'Sosiaalinen ahdistus — sydän nopeampaa, pienen kärsimättömyyden tunne',
            'Tunne: kaikkien silmät sinussa',
            '"Jos en reagoi nyt, se huomataan"',
            'Keho kaipaa nopeaa laukaisua — naurun tai myötäilyn kautta',
        ],
        cognitiveNarrow:
            'Huomaat ajattelevasi vain kahdesta vaihtoehdosta: naura mukaan tai ole hiljaa ja poikkea. Et näe vielä kolmatta.',
        justificationOptions: [
            {
                type: 'minimizing',
                text: '"Tämä on vain huumoria — Sanna ei edes kuule tätä."',
                insight:
                    'Harmiton pois päin huumori voi silti rakentaa normia joka vaikuttaa siellä miten Sannaan suhtaudutaan fyysisesti paikalla ollessa.',
            },
            {
                type: 'group_defense',
                text: '"En halua pilata tunnelmaa. Kaikilla on oikeus pitää hauskaa."',
                insight:
                    'Tunnelman ylläpitäminen on aito sosiaalinen paine — mutta sen toteuttaminen jonkun kustannuksella rakentaa toksista normaaliutta.',
            },
            {
                type: 'blaming',
                text: '"Sanna provosoi itse tätä promootiojutulla."',
                insight:
                    'Syytös kohteelle on klassinen moraalinen irrottautuminen. Ihmisen menestys ei oikeuta kiusaamista.',
            },
            {
                type: 'comparing',
                text: '"Tämä on paljon pienempi juttu kuin mitä oikeassa kiusaamisessa tapahtuu."',
                insight:
                    'Vähättely vertaamalla — mutta pienet normalisoivat teot rakentavat suurempia. Tämä on prosessi, ei yksittäinen teko.',
            },
        ],
        interpretations: [
            {
                id: 'hostile-1',
                text: '"Sanna on vaikeissa asioissa — hän aiheuttaa itse tämän."',
                isHostile: true,
                explanation:
                    'Syytöksen siirtäminen kohteelle. Ulkopuolisten kommentit Sannan vaikeuksista vahvistavat haavoittuvuutta — ei "ansaitsemista".',
            },
            {
                id: 'hostile-2',
                text: '"Kaikki täällä ajattelevat samoin — tämä on vain ääneen lausuma."',
                isHostile: true,
                explanation:
                    'Pluralistinen tietämättömyys: moni ryhmässä saattaa tosiasiassa paheksua mutta ei sano — koska luulee muiden hyväksyvän.',
            },
            {
                id: 'neutral-1',
                text: '"Sanna ei tiedä mitä täällä puhutaan — mutta kulttuuri rakentuu teoista."',
                isHostile: false,
                explanation:
                    'Todellisuus: myös poissaolevaan kohdistuva puhe muokkaa sitä, miten ihmistä kohdellaan paikalla.',
            },
            {
                id: 'neutral-2',
                text: '"Pelkäsin torjumista — mutta ehkä muutkin pelkäävät."',
                isHostile: false,
                explanation:
                    'Pluralistinen todellisuus: usein kukaan ryhmässä ei aidosti ole mukana — he kaikki pelkäävät samaa.',
            },
        ],
        groundingPrompt:
            'Ennen kuin reagoit — muistele: haluaisitko Sannan kuulevan mitä tässä puhutaan?',
    },

    // ─── OSA 3: TEKO + SEURAUKSET ──────────────────────────────────────────────
    consequencePhase: {
        prompt: 'Hiljaisuus on jo pidentynyt. Kaikki odottavat sinua. Mitä teet?',
        actions: [
            {
                id: 'joins',
                text: '"Haha — joo, no se elostartti oli kyllä aika kökkö." (Nauru. Mukaan meneminen.)',
                severity: 'aggressive',
                icon: '🔴',
                shortTermSelfFeel: 'Sosiaalinen helpotus — kuulut porukkaan.',
                shortTermBenefit: 'Ryhmäjännitys purkautui. Olet sisäpiirissä.',
                consequences: {
                    victimExperience: {
                        immediateThought: 'Sanna ei tiedä nyt — mutta seuraavassa kohtaamisessa ryhmä on muuttunut.',
                        bodyReaction: 'Ei välitöntä reaktiota — kyseessä on näkyviä seurauksia vähitellen.',
                        longTermEffect:
                            'Kun Sanna tulee seuraavaan lounaaseen, ryhmässä on hankalaa jännitettä. Hän aistii, ettei hänestä pidetä — vaikkei tiedä miksi.',
                    },
                    groupAtmosphere: {
                        immediate: 'Kaikki nauraa — yhteenkuuluvuus. Sanna on "ulkona".',
                        longTerm: 'Normi vahvistui: Sanna on kohde. Jatkossa kynnys on matalampi.',
                    },
                    selfAftermath: {
                        immediate: 'Helpotus — kuuluit.',
                        physical: 'Ei kuormitusta heti.',
                        longTerm: 'Pieni häpeä jäi — muistat sen valinnan.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin kuulua ryhmään.',
                        impact: 'Rakensin normin joka vahingoittaa Sannaa jatkuvasti.',
                    },
                    nextDay: 'Näät Sannan käytävällä. Olet hetkellisesti epämukava.',
                    nextWeek: 'Ryhmälounaalla vitsi Sannasta tulee taas — kynnys on matalampi.',
                },
            },
            {
                id: 'awkward-smile',
                text: '(Hermostunut hymy ilman lausetta. Ei naura — mutta ei myöskään sano mitään.)',
                severity: 'passive_aggressive',
                icon: '🟠',
                shortTermSelfFeel: 'Et osallistunut — mutta et myöskään poistunut.',
                shortTermBenefit: undefined,
                consequences: {
                    victimExperience: {
                        immediateThought: 'Sanna ei tiedä — mutta hiljaisuutesi vahvisti normin.',
                        bodyReaction: 'Ei välitöntä — hiljainen hyväksyntä on myös hyväksyntä.',
                        longTermEffect: 'Normi jatkui — Sanna on kohde.  Hijasuutesi tulkittiin hyväksymiseksi.',
                    },
                    groupAtmosphere: {
                        immediate: 'Muut jatkoivat — ei keskeytystä.',
                        longTerm: 'Samoin kuin mukana meneminen — kulttuuri vahvistui.',
                    },
                    selfAftermath: {
                        immediate: 'Jonkin verran epämukavuutta — mutta vähemmän kuin jos olisit puhunut.',
                        physical: 'Kevyt häpeä.',
                        longTerm: 'Myöhemmin ajattelit: "Olisin voinut sanoa jotain."',
                    },
                    intentVsImpact: {
                        intent: 'Halusin olla hiljaa ilman konfliktia.',
                        impact: 'Hiljaisuutesi vahvisti normin yhtä lailla.',
                    },
                    nextDay: 'Lounas tuntuu epämukavalta.',
                    nextWeek: 'Sama tilanne toistuu — ja on vaikeampaa sanoa jotain mitä myöhemmin.',
                },
            },
            {
                id: 'topic-change',
                text: '"No niin — muuten, kuulitteko siitä uudesta projektista?" (Aiheen vaihto, neutraalisti.)',
                severity: 'constructive',
                icon: '🟢',
                shortTermSelfFeel: 'Ei naurua — mutta ei suoraa konfrontaatiota. Aiheen siirto.',
                shortTermBenefit: 'Et vahvistanut normaalia. Et myöskään riskeerannut asemaasi suoraan.',
                consequences: {
                    victimExperience: {
                        immediateThought: 'Sanna ei tiedä — mutta ketju ei jatkunut.',
                        bodyReaction: 'Ei välitöntä.',
                        longTermEffect: 'Normi ei vahvistunut. Pieni muutos ryhmän kulttuurissa.',
                    },
                    groupAtmosphere: {
                        immediate: 'Hetkellinen epämukavuus — sitten aihe vaihtui.',
                        longTerm: 'Muut huomasivat — implisiittinen viesti: "Kaikki eivät ole mukana."',
                    },
                    selfAftermath: {
                        immediate: 'Pieni sosiaalinen riski — mutta myös selkeys.',
                        physical: 'Ei kajauttanut purkausta — mutta olet silti "sisällä".',
                        longTerm: 'Et rakentanut normia. Myöhemmin tunnet olosi paremmaksi kuin jos olisit nauranut.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin muuttaa suuntaa ilman suurta draamaa.',
                        impact: 'Ketju katkesi. Sanna säästyi yhdeltä tilanteelta.',
                    },
                    nextDay: 'Lounas on mukava. Sanna ei tiedä — mutta sinulla on eri olo.',
                    nextWeek: 'Muut ryhmän jäsenet jäivät miettimään aiheen vaihtoa.',
                },
            },
            {
                id: 'speak',
                text: '"Hei — Sannalla on ollut aika kova vaihe. Ehkä jätetään tää tähän?" (Rauhallisesti.)',
                severity: 'constructive',
                icon: '🌱',
                shortTermSelfFeel: 'Sosiaalinen riski — mutta myös selkeys siitä missä seisot.',
                shortTermBenefit: 'Normi keskeytettiin suoraan.',
                consequences: {
                    victimExperience: {
                        immediateThought: 'Sanna ei tiedä — mutta joku puolusti häntä.',
                        bodyReaction: 'Ei välitöntä.',
                        longTermEffect: 'Jos Sanna kuulee myöhemmin, se merkitsee paljon.',
                    },
                    groupAtmosphere: {
                        immediate: 'Hiljaisuus. Mahdollisesti epämukavuus.',
                        longTerm: 'Ryhmässä tuli uusi normi: tähän ei kaikki osallistu.',
                    },
                    selfAftermath: {
                        immediate: 'Sosiaalinen epämukavuus — mutta myös sisäinen selkeys.',
                        physical: 'Ei purkausta, ei häpeää.',
                        longTerm: 'Joillakin on enemmän kunnioitusta sinua kohtaan.',
                    },
                    intentVsImpact: {
                        intent: 'Halusin puolustaa Sannaa — ilman sankari-draamaa.',
                        impact: 'Normi muuttui. Sanna saattaa kuulla joskus ja se merkitsee.',
                    },
                    nextDay: 'Yksi ryhmän jäsen tulee erikseen sanomaan: "Se oli hyvä juttu eilen."',
                    nextWeek: 'Ryhmälounaalla vitsi Sannan suuntaan ei synny samalla tavalla.',
                },
            },
        ],
    },

    // ─── OSA 4: REWIND ─────────────────────────────────────────────────────────
    rewindPhase: {
        rewindExplanation:
            'Sama hetki. Sama sosiaalinen paine. Aiheen vaihto ei vaadi sankariuutta — vain yhden lauseen.',
        sameStressReminder:
            'Et tarvitse poistua ryhmästä. Voit muuttaa sen suuntaa.',
        alternatives: [
            {
                id: 'alt-topic',
                text: '"No niin — muist muuten, meillä oli se projektipalaveri perjantaina. Mitä siitä tuli?"',
                tone: 'assertive',
                toneLabel: 'Aiheen vaihto',
                explanation:
                    'Aiheen vaihto on tehokas keskeyttäjä ilman suoraa konfrontaatiota. Ryhmä saa vastaanottaa suunnanmuutoksen ilman kukaan "häviää".',
                sceneReaction: {
                    targetReaction: undefined,
                    groupReaction: 'Hetkellinen hämmennys — sitten joku vastaa. Jännitys laukeaa eri suuntaan.',
                },
                analysis:
                    'Tämä on yksi Hollabackin 5D-strategioista (Distract). Tehokas ilman sosiaalista kustannusta.',
            },
            {
                id: 'alt-neutral-defense',
                text: '"Hmm — Sannalla on ollut vaikea jakso. Ehkä mennään muihin aiheisiin."',
                tone: 'boundary',
                toneLabel: 'Pehmeä raja',
                explanation:
                    'Rajaviesti ilman syytöstä — empaattinen siirtymä pois aiheesta.',
                sceneReaction: {
                    targetReaction: undefined,
                    groupReaction: 'Hiljaisuus — sitten joku sanoo "joo, totta." Aihe muuttuu.',
                },
                analysis:
                    'Ei tarvita sankarilausetta. Pehmeä raja toimii useimmiten.',
            },
            {
                id: 'alt-humor-redirect',
                text: '"Haha — no, pitääkö kaikkien elostarteista saada kuulla? Kertokaa kuulumiset mieluummin itsestänne."',
                tone: 'assertive',
                toneLabel: 'Huumorin suunnan vaihto',
                explanation:
                    'Huumori suunnataan pois kohteesta — ryhmään itseensä. Tämä on sosiaalinen taito, ei konfrontaatio.',
                sceneReaction: {
                    targetReaction: undefined,
                    groupReaction: 'Naurua — mutta nyt eri suuntaan. Sanna ei enää kohteena.',
                },
                analysis:
                    'Huumorin suunta on valinta. Sama energia voidaan kääntää inklusiiviseksi.',
            },
        ],
        editableTemplate: {
            template: 'Muuten — [UUSI AIHE]. [KYSYMYS JOKA SIIRTÄÄ FOKUKSEN].',
            slots: [
                {
                    placeholder: '[UUSI AIHE]',
                    suggestion: 'kuulumiset?',
                    hint: 'Mikä aihe voisi luontevasti seurata?',
                },
                {
                    placeholder: '[KYSYMYS JOKA SIIRTÄÄ FOKUKSEN]',
                    suggestion: 'Mitä teillä on tulossa viikonloppuna?',
                    hint: 'Vilpitön kysymys — ei pakotettuna',
                },
            ],
        },
        openTextPrompt: 'Tai kirjoita omin sanoin — miten voisit muuttaa aiheen ilman suurta draamaa?',
    },

    // ─── OSA 5: KORJAAVA LIIKE ─────────────────────────────────────────────────
    repairPhase: {
        shameNormalization:
            'Ryhmäpaine on yksi voimakkaimmista inhimillisistä motivaattoreista. Evoluutio on rakentanut meidät välttämään torjumista. Se että sinä myötäilit ei tee sinusta pahaa — se tekee sinusta ihmisen.',
        seatTakingText:
            'Olet ryhmän jäsen joka osallistui tai hiljeni paineessa. Se on rooli — ei pysyvä identiteetti.',
        identityContrast: {
            old: '"Ryhmän suoja — sisällä pysyminen millä hinnalla tahansa"',
            new: '"Neutraali voima — en lisää, mutta en myöskään vahvista"',
        },
        repairActions: [
            {
                id: 'check-sanna',
                label: 'Ota yhteyttä Sannaan — kysy kuulumisia',
                category: 'conversation',
                description: 'Ei tarvitse kertoa mitä tapahtui — kontakti riittää.',
                exampleText: 'Hei Sanna — kauan aikaa! Miten sulla menee? Mennäänkö kahville joskus?',
                difficulty: 1,
            },
            {
                id: 'practice-topic-change',
                label: 'Harjoittele aiheen vaihto seuraavaan kertaan',
                category: 'self',
                description: 'Valmistaudu — niin seuraavassa tilanteessa on lause valmiina.',
                difficulty: 1,
            },
            {
                id: 'norm-reflection',
                label: 'Mieti ryhmänormin alkuperää',
                category: 'self',
                description: 'Mistä tässä porukassa on tullut tapa kohdata ihmisiä näin?',
                difficulty: 2,
            },
            {
                id: 'group-change',
                label: 'Aloita muutos ryhmässä — pienellä jutulla',
                category: 'systemic',
                description: 'Joskus yksi ihminen joka avaa eri suunnan muuttaa koko normin.',
                difficulty: 3,
            },
        ],
        supportResources: [
            {
                label: 'Bystander-strategiat',
                description: 'Tutustu Turvasiiven bystander-simulaattoriin — samoja taitoja, sivullisen näkökulmasta.',
            },
        ],
        cardPrompt: 'Yksi asia jonka opit siitä, miten sosiaalinen paine vaikuttaa sinuun:',
        nextStepPrompt: 'Yksi lause jonka harjoittelet valmiiksi seuraavaan vastaavaan tilanteeseen:',
    },
};
