import type { DialogueTreeScenario } from '../dialogue-types';

/**
 * Scenario 1: "Silent Isolation" - Dialogue Tree Version
 * Simplified initial version for testing the new dialogue system
 */
export const isolationDialogueTree: DialogueTreeScenario = {
    id: 'isolation-dialogue-1',
    title: 'Hiljainen eristäminen',
    context: 'Olet työskennellyt IT-yrityksessä 3 kuukautta.',
    learningGoal: 'Tunnista sosiaalinen eristäminen kiusaamisen muotona',

    characters: [
        { id: 'player', name: 'Sinä', role: 'Uusi työntekijä', color: '#3b82f6' },
        { id: 'emma', name: 'Emma', role: 'Kollega', color: '#ec4899' },
        { id: 'kari', name: 'Kari', role: 'Kollega', color: '#64748b' },
    ],

    startNodeId: 'node-1-morning',

    nodes: {
        // Node 1: Morning scene - Introduction
        'node-1-morning': {
            id: 'node-1-morning',
            visualState: {
                background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'standing', emotion: 'neutral', x: 30, y: 60 },
                    { characterId: 'emma', position: 'sitting', emotion: 'neutral', x: 60, y: 65 },
                    { characterId: 'kari', position: 'sitting', emotion: 'happy', x: 75, y: 65 },
                ],
            },
            narration: '☕ Maanantaiaamu - Toimisto',
            dialogueLines: [
                {
                    characterId: 'emma',
                    text: 'Hei Kari! Kuulit itsit viikonvaihteesta?',
                    style: 'normal',
                },
                {
                    characterId: 'kari',
                    text: 'Joo! Oli mahtava reissu. Koko tiimi oli mukana!',
                    style: 'normal',
                },
                {
                    characterId: 'player',
                    text: '(Tunnet että jotain on pielessä. Et tiennyt mistään matkasta.)',
                    style: 'thought',
                },
            ],
            nextNodeId: 'node-2-approach',
        },

        // Node 2: Player approaches - CHOICE
        'node-2-approach': {
            id: 'node-2-approach',
            visualState: {
                background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'standing', emotion: 'neutral', x: 40, y: 60 },
                    { characterId: 'emma', position: 'sitting', emotion: 'happy', x: 60, y: 65 },
                    { characterId: 'kari', position: 'sitting', emotion: 'happy', x: 75, y: 65 },
                ],
            },
            narration: 'Lähestyt kahvitaukopöytää',
            dialogueLines: [],
            choices: [
                {
                    id: 'greeting-friendly',
                    text: 'A) "Moikka! Oliko kiva viikonloppu?"',
                    feedback: {
                        immediate: 'Tervehdit ystävällisesti.',
                        analysis: 'Ystävällinen ja avoin lähestymistapa.',
                        learningPoint: '💬 Ystävällinen tervehdys on neutraali tapa lähestyä',
                    },
                    nextNodeId: 'node-2a-greeting-friendly',
                },
                {
                    id: 'greeting-cautious',
                    text: 'B) "Hei..."',
                    feedback: {
                        immediate: 'Tervehdit varovaisesti.',
                        analysis: 'Varova lähestymistapa, kun tunnet jännitettä.',
                        learningPoint: '🤔 Varovaisuus voi olla merkki siitä että tunnet tilanteen epävarmaksi',
                    },
                    nextNodeId: 'node-2b-greeting-cautious',
                },
                {
                    id: 'greeting-energetic',
                    text: 'C) "Moi kaikki! Mitä kuuluu?"',
                    feedback: {
                        immediate: 'Tervehdit iloisesti ja energisesti.',
                        analysis: 'Energinen lähestymistapa voi joko purkaa jännitettä tai tehdä siitä näkyvämmän.',
                        learningPoint: '😊 Energinen tervehdys voi paljastaa muiden reaktiot selvemmin',
                    },
                    nextNodeId: 'node-2c-greeting-energetic',
                },
            ],
        },

        // Node 2a: Friendly greeting response
        'node-2a-greeting-friendly': {
            id: 'node-2a-greeting-friendly',
            visualState: {
                background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'standing', emotion: 'neutral', x: 40, y: 60 },
                    { characterId: 'emma', position: 'sitting', emotion: 'neutral', x: 60, y: 65 },
                    { characterId: 'kari', position: 'sitting', emotion: 'neutral', x: 75, y: 65 },
                ],
            },
            dialogueLines: [
                {
                    characterId: 'player',
                    text: 'Moikka! Oliko kiva viikonloppu?',
                    style: 'normal',
                },
                {
                    characterId: 'emma',
                    text: 'Joo...',
                    style: 'normal',
                },
                {
                    characterId: 'kari',
                    text: 'Ai niin, mulla oli juttua esimiehen kanssa.',
                    style: 'normal',
                },
            ],
            nextNodeId: 'node-invisible-moment',
        },

        // Node 2b: Cautious greeting response
        'node-2b-greeting-cautious': {
            id: 'node-2b-greeting-cautious',
            visualState: {
                background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'standing', emotion: 'sad', x: 40, y: 60 },
                    { characterId: 'emma', position: 'sitting', emotion: 'neutral', x: 60, y: 65 },
                    { characterId: 'kari', position: 'sitting', emotion: 'neutral', x: 75, y: 65 },
                ],
            },
            dialogueLines: [
                {
                    characterId: 'player',
                    text: 'Hei...',
                    style: 'normal',
                },
                {
                    characterId: 'emma',
                    text: '...Hei.',
                    style: 'normal',
                },
                {
                    characterId: 'kari',
                    text: 'Joo, ai niin - Emma meillä oli se juttu.',
                    style: 'normal',
                },
            ],
            nextNodeId: 'node-invisible-moment',
        },

        // Node 2c: Energetic greeting response
        'node-2c-greeting-energetic': {
            id: 'node-2c-greeting-energetic',
            visualState: {
                background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'standing', emotion: 'happy', x: 40, y: 60 },
                    { characterId: 'emma', position: 'sitting', emotion: 'neutral', x: 60, y: 65 },
                    { characterId: 'kari', position: 'sitting', emotion: 'neutral', x: 75, y: 65 },
                ],
            },
            dialogueLines: [
                {
                    characterId: 'player',
                    text: 'Moi kaikki! Mitä kuuluu?',
                    style: 'normal',
                },
                {
                    characterId: 'emma',
                    text: 'Ah... Joo, hyvää.',
                    style: 'normal',
                },
                {
                    characterId: 'kari',
                    text: 'Selvä. Emma, meillä oli se juttu.',
                    style: 'normal',
                },
            ],
            nextNodeId: 'node-invisible-moment',
        },

        // Node 2.5: The Invisible Moment (Bridge Scene) - NEW
        'node-invisible-moment': {
            id: 'node-invisible-moment',
            visualState: {
                background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'standing', emotion: 'neutral', x: 40, y: 60 },
                    { characterId: 'emma', position: 'sitting', emotion: 'neutral', x: 60, y: 65 },
                    { characterId: 'kari', position: 'sitting', emotion: 'neutral', x: 75, y: 65 },
                ],
            },
            dialogueLines: [
                {
                    characterId: 'kari',
                    text: 'Hei Emma, lähetitkö sen kalenterikutsun Tiinalle?',
                    style: 'normal',
                },
                {
                    characterId: 'emma',
                    text: 'Joo, ja Mikolle myös. Pitäisi olla kaikilla.',
                    style: 'normal',
                },
                {
                    characterId: 'player',
                    text: 'Ai onko meillä joku tiimipalaveri tulossa?',
                    style: 'normal',
                },
                {
                    characterId: 'emma',
                    text: '(Ei vastaa, katsoo tietokoneen ruutua)',
                    style: 'thought',
                },
                {
                    characterId: 'player',
                    text: '(Oudosti hiljaista...)',
                    style: 'thought',
                },
                {
                    characterId: 'kari',
                    text: 'Hyvä. Mennään katsomaan sitä neukkariin.',
                    style: 'normal',
                },
            ],
            nextNodeId: 'node-3-alone',
        },

        // Node 3: Left alone
        'node-3-alone': {
            id: 'node-3-alone',
            visualState: {
                background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'standing', emotion: 'sad', x: 50, y: 60 },
                ],
            },
            narration: 'He poistuvat. Jäit yksin.',
            dialogueLines: [
                {
                    characterId: 'player',
                    text: '(Tämä on nyt kolmas kerta tällä viikolla...)',
                    style: 'thought',
                },
            ],
            nextNodeId: 'choice-1-react',
        },

        // Choice 1: How to react?
        'choice-1-react': {
            id: 'choice-1-react',
            visualState: {
                background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'standing', emotion: 'neutral', x: 50, y: 60 },
                ],
            },
            dialogueLines: [],
            choices: [
                {
                    id: 'ignore',
                    text: 'Ajattelen että kuvittelen asioita. Palaan töihin.',
                    feedback: {
                        immediate: 'Päätät unohtaa asian ja palaat työpisteellesi.',
                        analysis: 'Yksittäistapaus ei kerro koko totuutta. Mutta jos toistuu, se on hälyttävä merkki. Itsekritiikki on kiusaajan ase - "Olenko liian herkkä?" on vaarallinen kysymys.',
                        learningPoint: '⚠️ Tunnista toistuvuus: 3+ samankaltaista tapausta viikossa = kuvio, ei sattuma',
                    },
                    nextNodeId: 'node-ignore-week-later',
                },
                {
                    id: 'document',
                    text: 'Kirjaan muistiin: päivä, tilanne, todistajat.',
                    feedback: {
                        immediate: 'Otat esiin muistikirjasi ja kirjaat tilanteen.',
                        analysis: 'Erinomainen! Dokumentointi on tärkein työkalu. Kirjaa AINA aika, paikka, toimijat, todistajat. Tunteesi ovat vähemmän tärkeitä kuin faktat.',
                        learningPoint: '📋 Dokumentoi heti: Päivämäärä + aika + henkilöt + mitä tapahtui + todistajat',
                    },
                    nextNodeId: 'node-document-week-later',
                },
                {
                    id: 'confront',
                    text: 'Kysyn suoraan Emmalta myöhemmin.',
                    feedback: {
                        immediate: 'Päätät ottaa asian puheeksi.',
                        analysis: 'Rohkea valinta! Suora kommunikaatio voi joko ratkaista väärinkäsityksen TAI paljastaa tarkoituksellisuuden. Valmistaudu molempiin.',
                        learningPoint: '💬 Puheeksi ottaminen paljastaa: Jos vastaus on vilpitön, ongelma ratkeaa. Jos välttelevä, tiedät että kyseessä on tahallista.',
                    },
                    nextNodeId: 'node-confront-later',
                },
            ],
        },

        // Branch: Ignored -> Week later (gets worse)
        'node-ignore-week-later': {
            id: 'node-ignore-week-later',
            visualState: {
                background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
                backgroundType: 'meeting',
                characters: [
                    { characterId: 'player', position: 'sitting', emotion: 'sad', x: 30, y: 60 },
                    { characterId: 'emma', position: 'sitting', emotion: 'neutral', x: 60, y: 60 },
                    { characterId: 'kari', position: 'sitting', emotion: 'happy', x: 80, y: 60 },
                ],
            },
            narration: 'Viikko myöhemmin - Tiimikokous',
            dialogueLines: [
                {
                    characterId: 'emma',
                    text: 'Kari, mitä mieltä olet tästä designista?',
                    style: 'normal',
                },
                {
                    characterId: 'kari',
                    text: 'Hyvä! Olen samaa mieltä.',
                    style: 'normal',
                },
                {
                    characterId: 'player',
                    text: '(Nostin käteni 5 minuuttia sitten. Minua ei huomioida.)',
                    style: 'thought',
                },
            ],
            isEnd: true,
        },

        // Branch: Documented -> Week later (have evidence)
        'node-document-week-later': {
            id: 'node-document-week-later',
            visualState: {
                background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 50, y: 60 },
                ],
            },
            narration: 'Viikko myöhemmin - Sinulla on 7 kirjausta',
            dialogueLines: [
                {
                    characterId: 'player',
                    text: '(Minulla on nyt selkeä lista tapauksista. Voin viedä tämän HR:lle tai esihenkilölle.)',
                    style: 'thought',
                },
            ],
            isEnd: true,
        },

        // Branch: Confronted
        'node-confront-later': {
            id: 'node-confront-later',
            visualState: {
                background: 'linear-gradient(to bottom, #dbeafe, #bfdbfe)',
                backgroundType: 'hallway',
                characters: [
                    { characterId: 'player', position: 'standing', emotion: 'neutral', x: 40, y: 60 },
                    { characterId: 'emma', position: 'standing', emotion: 'neutral', x: 70, y: 60 },
                ],
            },
            narration: 'Käytävällä - Kahden kesken',
            dialogueLines: [
                {
                    characterId: 'player',
                    text: 'Emma, voinko kysyä... tuntuuko että olen tehnyt jotain väärin?',
                    style: 'normal',
                },
                {
                    characterId: 'emma',
                    text: 'Ei, ei ollenkaan! Anteeksi, olen vain ollut niin kiireinen. Otetaan lounas yhdessä huomenna?',
                    style: 'normal',
                },
            ],
            isEnd: true,
        },
    },
};
