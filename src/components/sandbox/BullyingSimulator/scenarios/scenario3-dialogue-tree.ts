import type { DialogueTreeScenario } from '../dialogue-types';

/**
 * Scenario 3: "Palaverin lasiseinä" - Dialogue Tree Version
 * BYSTANDER PERSPECTIVE: Player witnesses public humiliation and chooses how to respond
 * 
 * New features:
 * - Documentation tool (player can record incidents)
 * - Time-out button (safe exit with validation)
 * - Bystander role (not victim, but witness who can intervene)
 */
export const bystanderDialogueTree: DialogueTreeScenario = {
    id: 'bystander-dialogue-1',
    title: 'Palaverin lasiseinä',
    context: 'Olet tiimiläinen viikkopalaverissa. Et ole kiusauksen kohteena, vaan todistaja.',
    learningGoal: 'Tunnista sivustakatsojan rooli ja opi matalankynnyksen puuttumistapoja',

    characters: [
        { id: 'player', name: 'Sinä', role: 'Tiimiläinen', color: '#3b82f6' },
        { id: 'manager', name: 'Päällikkö', role: 'Esimies', color: '#ef4444' },
        { id: 'laura', name: 'Laura', role: 'Kiusattu kollega', color: '#ec4899' },
        { id: 'matti', name: 'Matti', role: 'Toinen kollega', color: '#64748b' },
    ],

    startNodeId: 'node-1-meeting-start',

    nodes: {
        // Node 1: Meeting starts normally
        'node-1-meeting-start': {
            id: 'node-1-meeting-start',
            visualState: {
                background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
                backgroundType: 'meeting',
                characters: [
                    { characterId: 'manager', position: 'standing', emotion: 'neutral', x: 30, y: 45 },
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 50, y: 60 },
                    { characterId: 'laura', position: 'sitting', emotion: 'neutral', x: 65, y: 60 },
                    { characterId: 'matti', position: 'sitting', emotion: 'neutral', x: 80, y: 60 },
                ],
            },
            narration: '🗣️ Viikkopalaveri - Koko tiimi paikalla',
            dialogueLines: [
                {
                    characterId: 'manager',
                    text: 'Hyvää huomenta! Käydään läpi viikon projektit.',
                    style: 'normal',
                },
                {
                    characterId: 'matti',
                    text: 'Saatiin asiakkaan hyväksyntä designille!',
                    style: 'normal',
                },
                {
                    characterId: 'manager',
                    text: 'Erinomaista. Laura, entäs sun asiakasraportti?',
                    style: 'normal',
                },
            ],
            nextNodeId: 'node-2-criticism-begins',
            // NEW: Enable documentation from start
            allowDocumentation: true,
        },

        // Node 2: Criticism begins (public humiliation)
        'node-2-criticism-begins': {
            id: 'node-2-criticism-begins',
            visualState: {
                background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
                backgroundType: 'meeting',
                characters: [
                    { characterId: 'manager', position: 'standing', emotion: 'angry', x: 30, y: 45 },
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 50, y: 60 },
                    { characterId: 'laura', position: 'sitting', emotion: 'sad', x: 65, y: 60 },
                    { characterId: 'matti', position: 'sitting', emotion: 'neutral', x: 80, y: 60 },
                ],
            },
            dialogueLines: [
                {
                    characterId: 'laura',
                    text: 'Tässä on yhteenveto viikon kontakteista...',
                    style: 'normal',
                },
                {
                    characterId: 'manager',
                    text: 'Taas tämä? Kuinka monta kertaa olen sanonut että haluan *yksityiskohtaisen* erittelyn?',
                    style: 'aggressive',
                },
                {
                    characterId: 'laura',
                    text: 'Mutta viime palaverissa sovittiin että...',
                    style: 'normal',
                },
                {
                    characterId: 'manager',
                    text: 'Älä selittele! Meillä on henkilöitä jotka eivät osaa noudattaa edes yksinkertaisia ohjeita.',
                    style: 'aggressive',
                },
                {
                    characterId: 'player',
                    text: '(Tämä on kohtuutonta... Laura teki juuri sen mitä sovittiin.)',
                    style: 'thought',
                },
            ],
            nextNodeId: 'choice-1-witness',
            allowDocumentation: true,
            // NEW: Allow time-out here (difficult situation)
            allowTimeOut: true,
            timeOutMessage: 'Tämä on vaikea tilanne. Julkinen nöyryytys on psykologista väkivaltaa. Et ole vastuussa tästä tilanteesta, mutta voit valita reagoitko.',
        },

        // Choice 1: How to respond as bystander? (SENTENCE BUILDER)
        'choice-1-witness': {
            id: 'choice-1-witness',
            visualState: {
                background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
                backgroundType: 'meeting',
                characters: [
                    { characterId: 'manager', position: 'standing', emotion: 'smug', x: 30, y: 45 },
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 50, y: 60 },
                    { characterId: 'laura', position: 'sitting', emotion: 'sad', x: 65, y: 60 },
                    { characterId: 'matti', position: 'sitting', emotion: 'neutral', x: 80, y: 60 },
                ],
            },
            dialogueLines: [],
            choices: [
                {
                    id: 'build-phrase',
                    text: 'Rakenna lause', // Not shown
                    sentenceBuilder: {
                        openingOptions: [
                            'Anteeksi että keskeytän',
                            'Haluaisin sanoa jotain',
                        ],
                        coreOptions: [
                            'Laura teki juuri sen mitä sovittiin',
                            'Tämä ei tunnu reilulta',
                            'Voimmeko tarkistaa muistiinpanot',
                        ],
                        guidanceText: 'Rakenna tukeva lause: valitse aloitus ja ydinviesti',
                        nextNodeId: 'node-2-response', // Next node after feedback
                        feedbackMap: {
                            'Anteeksi että keskeytän_Laura teki juuri sen mitä sovittiin': {
                                immediate: 'Käytit matalankynnyksen aloitusta ja viittasit faktoihin!',
                                analysis: '"Anteeksi että keskeytän" on lempeä ja ei-konfrontatiivinen. "Laura teki sen mitä sovittiin" on fakta, ei tulkinta.',
                                learningPoint: '💬 Matalankynnyksen interventio: lempeä aloitus + faktat = tehokas puuttuminen',
                                skillTag: 'fact-reference',
                                transferableSkill: {
                                    template: '"Anteeksi että keskeytän" + [Fakta]',
                                    realWorldExamples: [
                                        'Palaverissa: "Anteeksi, muistini mukaan sovimme..."',
                                        'Sähköpostissa: "Haluaisin tarkentaa mitä sovttiin..."'
                                    ]
                                }
                            },
                            'Anteeksi että keskeytän_Tämä ei tunnu reilulta': {
                                immediate: 'Ilmaisit oman tunnereaktiosi.',
                                analysis: '"Tämä ei tunnu reilulta" on rehellinen mutta voi tuntua konfrontatiiviselta. Faktat ovat turvallisempia.',
                                learningPoint: '🎯 Tunteet ovat valideja, mutta faktat ovat kiistattomampia työtilantees sa',
                            },
                            'Anteeksi että keskeytän_Voimmeko tarkistaa muistiinpanot': {
                                immediate: 'Ehdotit dokumenttien tarkistamista.',
                                analysis: 'Erinomainen! Viittaaminen muistiinpanoihin estää gaslightingin ja siirtää keskustelun faktoihin.',
                                learningPoint: '📋 Dokumentointi on paras työkalu gaslightingia vastaan',
                            },
                            'Haluaisin sanoa jotain_Laura teki juuri sen mitä sovittiin': {
                                immediate: 'Pyysit puheenvuoroa ja viittasit faktoihin.',
                                analysis: '"Haluaisin sanoa jotain" on assertiivinen mutta kohtelias. Fakta tukee väitettäsi.',
                                learningPoint: '✋ Assertiivisuus + faktat = tehokas yhdistelmä',
                            },
                            'Haluaisin sanoa jotain_Tämä ei tunnu reilulta': {
                                immediate: 'Ilmaisit tuntemuksesi rohkeasti.',
                                analysis: 'Tämä on suorempi lähestymistapa. Voi toimia mutta riski konfrontaatioon on suurempi.',
                                learningPoint: '⚠️ Suora tunne-ilmaisu voi eskaloida tilannetta',
                            },
                            'Haluaisin sanoa jotain_Voimmeko tarkistaa muistiinpanot': {
                                immediate: 'Ehdotit rakentavaa ratkaisua.',
                                analysis: 'Hyvä! Osoitat että haluat selvittää tilanteen yhdessä, ei syyllistää.',
                                learningPoint: '🤝 Rakentava ongelmanratkaisu vähentää puolustuskannalle menemistä',
                            },
                        },
                    },
                    nextNodeId: 'node-1b-redirect', // All lead to positive outcome for testing
                },
            ],
        },

        // Node 1a: Silent (escalation)
        'node-1a-silent': {
            id: 'node-1a-silent',
            visualState: {
                background: 'linear-gradient(to bottom, #fee2e2, #fecaca)',
                backgroundType: 'meeting',
                characters: [
                    { characterId: 'manager', position: 'standing', emotion: 'smug', x: 30, y: 45 },
                    { characterId: 'player', position: 'sitting', emotion: 'sad', x: 50, y: 60 },
                    { characterId: 'laura', position: 'sitting', emotion: 'sad', x: 65, y: 60 },
                    { characterId: 'matti', position: 'sitting', emotion: 'neutral', x: 80, y: 60 },
                ],
            },
            narration: 'Palaverin jälkeen...',
            dialogueLines: [
                {
                    characterId: 'laura',
                    text: '(Tulee luoksesi käytävällä) Kiitos kun et nauranut mukana...',
                    style: 'whisper',
                },
                {
                    characterId: 'player',
                    text: '(Tämä tapahtuu jatkuvasti. Pitäisikö minun tehdä jotain?)',
                    style: 'thought',
                },
                {
                    characterId: 'player',
                    text: '(Entä jos minusta tulee seuraava kohde?)',
                    style: 'thought',
                },
            ],
            isEnd: true,
            allowDocumentation: true,
        },

        // Node 1b: Redirect (positive outcome)
        'node-1b-redirect': {
            id: 'node-1b-redirect',
            visualState: {
                background: 'linear-gradient(to bottom, #dbeafe, #bfdbfe)',
                backgroundType: 'meeting',
                characters: [
                    { characterId: 'manager', position: 'standing', emotion: 'neutral', x: 30, y: 45 },
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 50, y: 60 },
                    { characterId: 'laura', position: 'sitting', emotion: 'neutral', x: 65, y: 60 },
                    { characterId: 'matti', position: 'sitting', emotion: 'happy', x: 80, y: 60 },
                ],
            },
            dialogueLines: [
                {
                    characterId: 'player',
                    text: 'Laura, mitä mieltä sinä olet tästä asiakasprojektista?',
                    style: 'normal',
                },
                {
                    characterId: 'laura',
                    text: 'No, asiakas oli tyytyväinen yhteenvetoon. He sanoivat että se oli selkeä.',
                    style: 'normal',
                },
                {
                    characterId: 'matti',
                    text: 'Joo, itse asiassa se oli hyvä formaatti.',
                    style: 'normal',
                },
                {
                    characterId: 'manager',
                    text: '...No, okei. Sitten seuraava aihe.',
                    style: 'normal',
                },
            ],
            nextNodeId: 'node-1b-aftermath', // redirection
            allowDocumentation: true,
        },

        // Node 1b-2: Aftermath choices (Testing emotion change)
        'node-1b-aftermath': {
            id: 'node-1b-aftermath',
            visualState: {
                background: 'linear-gradient(to bottom, #dbeafe, #bfdbfe)',
                backgroundType: 'meeting',
                characters: [
                    { characterId: 'manager', position: 'standing', emotion: 'neutral', x: 30, y: 45 },
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 50, y: 60 },
                    { characterId: 'laura', position: 'sitting', emotion: 'neutral', x: 65, y: 60 },
                    { characterId: 'matti', position: 'sitting', emotion: 'happy', x: 80, y: 60 },
                ],
            },
            dialogueLines: [
                {
                    characterId: 'player',
                    text: '(Tilanne rauhoittui. Miten päätän tämän?)',
                    style: 'thought',
                }
            ],
            choices: [
                {
                    id: 'smile-at-laura',
                    text: 'Hymyile Lauralle rohkaisevasti',
                    nextNodeId: 'node-2-reflection',
                    emotionChange: { laura: 'happy' }, // Test emotion change
                    skillTag: 'emotional-support',
                    feedback: {
                        immediate: 'Laura huomasi hymysi ja rentoutui.',
                        analysis: 'Sanaton viestintä on tärkeää. Osoitit liittolaisuutta ilman sanoja.',
                        learningPoint: '😊 Sanaton tuki voi olla yhtä tärkeää kuin sanat',
                        transferableSkill: {
                            template: '[Katsekontakti] + [Hymy/Nyökkäys]',
                            realWorldExamples: ['Palaverissa kun kollegaa grillataan', 'Käytävällä vaikean tilanteen jälkeen']
                        }
                    }
                },
                {
                    id: 'focus-work',
                    text: 'Keskity muistiinpanoihin',
                    nextNodeId: 'node-2-reflection',
                    feedback: {
                        immediate: 'Palasit työasioihin.',
                        analysis: 'Neutraali valinta. Tilanne on ohi, mutta et vahvistanut suhdetta.',
                        learningPoint: '😐 Neutraalius on ok, mutta tuki on parempi'
                    }
                }
            ]
        },

        // Node 1c: Question (confrontation)
        'node-1c-question': {
            id: 'node-1c-question',
            visualState: {
                background: 'linear-gradient(to bottom, #fee2e2, #fecaca)',
                backgroundType: 'meeting',
                characters: [
                    { characterId: 'manager', position: 'standing', emotion: 'angry', x: 30, y: 45 },
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 50, y: 60 },
                    { characterId: 'laura', position: 'sitting', emotion: 'neutral', x: 65, y: 60 },
                    { characterId: 'matti', position: 'sitting', emotion: 'neutral', x: 80, y: 60 },
                ],
            },
            dialogueLines: [
                {
                    characterId: 'player',
                    text: 'Eikö viime palaverissa sovittu että yhteenveto riittää?',
                    style: 'normal',
                },
                {
                    characterId: 'manager',
                    text: 'En muista niin sanoneeni. Ehkä sinä kuuntelit huonosti.',
                    style: 'aggressive',
                },
                {
                    characterId: 'player',
                    text: '(Hän väistää vastuun ja yrittää kääntää tilanteen minua vastaan...)',
                    style: 'thought',
                },
                {
                    characterId: 'laura',
                    text: '(Nyökkää sinulle kiitollisena)',
                    style: 'thought',
                },
            ],
            nextNodeId: 'node-2-reflection',
            allowDocumentation: true,
            allowTimeOut: true,
            timeOutMessage: 'Tämä on gaslightingia. Esimies väistää vastuun ja yrittää horjuttaa luottamustasi omaan muistiisi. Dokumentointi suojelee tältä.',
        },

        // Node 2: Reflection (learning moment)
        'node-2-reflection': {
            id: 'node-2-reflection',
            visualState: {
                background: 'linear-gradient(to bottom, #f3f4f6, #e5e7eb)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 50, y: 60 },
                ],
            },
            narration: 'Työpisteelläsi - Reflektio',
            dialogueLines: [
                {
                    characterId: 'player',
                    text: '(Mitä juuri tapahtui?)',
                    style: 'thought',
                },
                {
                    characterId: 'player',
                    text: '(Puutuin asiaan. Se tuntui pelottavalta, mutta oikealta.)',
                    style: 'thought',
                },
                {
                    characterId: 'player',
                    text: '(Entä jos tämä toistuu? Pitäisikö minun dokumentoida tämä?)',
                    style: 'thought',
                },
            ],
            isEnd: true,
            allowDocumentation: true,
        },
    },
};
