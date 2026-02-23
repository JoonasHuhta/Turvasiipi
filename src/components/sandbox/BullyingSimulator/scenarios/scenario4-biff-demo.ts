import type { DialogueTreeScenario } from '../dialogue-types';

/**
 * Scenario 4: "Sähköpostimyrsky" - BIFF Model Demo
 * CONTEXT: You receive a blaming email from your manager, copying the whole team.
 * GOAL: Respond using the BIFF model (Brief, Informative, Friendly, Firm).
 */
export const biffEmailScenario: DialogueTreeScenario = {
    id: 'biff-email-scenario',
    title: 'Sähköpostimyrsky (BIFF-demo)',
    context: 'Saat syyttävän sähköpostin koko tiimin nähden. Miten vastaat asiallisesti?',
    learningGoal: 'Opi käyttämään BIFF-mallia (Brief, Informative, Friendly, Firm) kirjallisessa viestinnässä.',

    characters: [
        { id: 'player', name: 'Sinä', role: 'Asiantuntija', color: '#3b82f6' },
        { id: 'manager', name: 'Esimies', role: 'Päällikkö', color: '#ef4444' },
    ],

    startNodeId: 'node-1-email-received',

    nodes: {
        // Node 1: The Email
        'node-1-email-received': {
            id: 'node-1-email-received',
            visualState: {
                background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 50, y: 60 },
                    // Manager represents the email/presence
                    { characterId: 'manager', position: 'standing', emotion: 'angry', x: 80, y: 45 },
                ],
            },
            narration: '📧 Uusi sähköposti - Lähettäjä: Esimies (CC: Koko tiimi)',
            dialogueLines: [
                {
                    characterId: 'manager',
                    text: 'MIKSI tämä projekti on TAAS myöhässä? Olenko ainoa joka täällä välittää deadlineista? Selitys HETI!',
                    style: 'aggressive',
                },
                {
                    characterId: 'player',
                    text: '(Apua... koko tiimi näkee tämän. Sydän hakkaa. Mitä vastaan?)',
                    style: 'thought',
                },
            ],
            choices: [
                {
                    id: 'build_response',
                    text: 'Kirjoita vastaus...',
                    // Type requirements for Choice interface
                    nextNodeId: 'node-2-feedback',
                    conversationId: 'node-1-email-received', // Optional but good for tracking
                    // Dummy feedbackMap to satisfy type requirements (logic is handled by next node choices)
                    feedback: {
                        immediate: '',
                        analysis: '',
                        learningPoint: ''
                    },
                    sentenceBuilder: {
                        guidanceText: 'Rakenna BIFF-vastaus: Lyhyt, Informatiivinen, Ystävällinen, Jämäkkä.',
                        openingOptions: [
                            'Kuulepas nyt...',       // Aggressive
                            'Anteeksi häiriö...',    // Passive
                            'Kiitos viestistä.',     // Diplomatic/Friendly
                        ],
                        coreOptions: [
                            'Tämä on epäreilua!',                 // Emotional/Defensive
                            'Projekti on aikataulussa.',          // Fact (Brief)
                            'En tiedä mitä tarkoitat...',         // Evasive
                        ],
                    }
                }
            ],
            allowDocumentation: true,
        },

        // Node 2: Feedback & Outcomes (Manually mapped combinations)
        'node-2-feedback': {
            id: 'node-2-feedback',
            visualState: {
                background: 'linear-gradient(to bottom, #dbeafe, #bfdbfe)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 50, y: 60 },
                    { characterId: 'manager', position: 'standing', emotion: 'neutral', x: 80, y: 45 },
                ],
            },
            dialogueLines: [], // Populated by choice
            choices: [ // Virtual choices to catch the sentence builder output
                // 1. BIFF MASTER (Friendly + Fact)
                {
                    id: 'Kiitos viestistä._Projekti on aikataulussa.',
                    text: 'Lähetä',
                    nextNodeId: 'node-success',
                    skillTag: 'biff-technique',
                    feedback: {
                        immediate: 'Vastasit: "Kiitos viestistä. Projekti on aikataulussa."',
                        analysis: 'Täydellinen BIFF-vastaus! Kiitos on ystävällinen (Friendly), loppu on lyhyt ja informatiivinen fakta (Brief, Informative).',
                        learningPoint: '✅ BIFF riisuu aseista: Ei tunnetta, vain faktaa.',
                        transferableSkill: {
                            template: '[Kiitos/Kuittaus] + [Neutraali fakta]',
                            realWorldExamples: ['Sähköpostit joissa on syytöksiä', 'Teams-viestit joissa on Caps Lockia']
                        },
                        emotionChange: { manager: 'neutral', player: 'happy' }
                    }
                },
                // 2. MIXED SIGNALS (Aggressive Outcome)
                {
                    id: 'Kuulepas nyt..._Tämä on epäreilua!',
                    text: 'Lähetä',
                    nextNodeId: 'node-fail',
                    feedback: {
                        immediate: 'Vastasit: "Kuulepas nyt... Tämä on epäreilua!"',
                        analysis: 'Vastasit tunteella tunteeseen. Tämä "hook" (koukku) tarttui, ja nyt olette väittelyssä.',
                        learningPoint: '⚠️ Älä niele koukkua (Dont take the bait).',
                        emotionChange: { manager: 'smug', player: 'angry' }
                    }
                },
                // 3. PASSIVE INVALIDATION
                {
                    id: 'Anteeksi häiriö..._En tiedä mitä tarkoitat...',
                    text: 'Lähetä',
                    nextNodeId: 'node-fail',
                    feedback: {
                        immediate: 'Vastasit: "Anteeksi häiriö... En tiedä mitä tarkoitat..."',
                        analysis: 'Pyytelet anteeksi olemassaoloasi. Esimies näkee tämän heikkoutena ja jatkaa jyräämistä.',
                        learningPoint: '🛑 Älä pyydä anteeksi jos et ole tehnyt väärin.',
                        emotionChange: { manager: 'angry', player: 'sad' }
                    }
                },
                // 4. AGGRESSIVE FACT (Right fact, wrong tone)
                {
                    id: 'Kuulepas nyt..._Projekti on aikataulussa.',
                    text: 'Lähetä',
                    nextNodeId: 'node-fail',
                    feedback: {
                        immediate: 'Vastasit: "Kuulepas nyt... Projekti on aikataulussa."',
                        analysis: 'Fakta on oikein, mutta sävy on hyökkäävä. Esimies tarttuu sävyyn eikä kuuntele faktaa.',
                        learningPoint: '⚖️ Sävy ratkaisee, meneekö viesti perille.',
                        emotionChange: { manager: 'angry', player: 'neutral' }
                    }
                },
                // Catch-all for other combinations
                {
                    id: 'fallback',
                    text: 'Jatka',
                    nextNodeId: 'node-1-email-received', // Loop back
                }
            ]
        },

        // Success Node
        'node-success': {
            id: 'node-success',
            visualState: {
                background: 'linear-gradient(to bottom, #d1fae5, #a7f3d0)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'standing', emotion: 'happy', x: 50, y: 60 },
                    { characterId: 'manager', position: 'standing', emotion: 'neutral', x: 80, y: 45 },
                ],
            },
            dialogueLines: [
                {
                    characterId: 'manager',
                    text: 'Ok. Hyvä. Jatkakaa.',
                    style: 'normal',
                },
                {
                    characterId: 'player',
                    text: '(Jes! Hän rauhoittui heti kun en lähtenyt tunteeseen mukaan.)',
                    style: 'thought',
                }
            ],
            choices: [], // End
        },

        // Fail Node
        'node-fail': {
            id: 'node-fail',
            visualState: {
                background: 'linear-gradient(to bottom, #fee2e2, #fecaca)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'sitting', emotion: 'sad', x: 50, y: 60 },
                    { characterId: 'manager', position: 'standing', emotion: 'angry', x: 80, y: 45 },
                ],
            },
            dialogueLines: [
                {
                    characterId: 'manager',
                    text: 'Älä viisastele siellä! Haluan tuloksia, en selityksiä!',
                    style: 'aggressive',
                },
            ],
            choices: [
                {
                    id: 'try_again',
                    text: 'Yritä uudelleen (Hengitä syvään)',
                    nextNodeId: 'node-1-email-received',
                }
            ],
        }
    }
};
