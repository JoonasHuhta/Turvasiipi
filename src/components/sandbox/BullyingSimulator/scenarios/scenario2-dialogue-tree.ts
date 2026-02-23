import type { DialogueTreeScenario } from '../dialogue-types';

/**
 * Scenario 2: "Mikromanagerointi ja vallan väärinkäyttö" - Dialogue Tree Version
 * Simplified version for testing the new dialogue system
 */
export const micromanagementDialogueTree: DialogueTreeScenario = {
    id: 'micromanagement-dialogue-1',
    title: 'Mikromanagerointi',
    context: 'Olet työskennellyt palvelualalla 5 vuotta. Sait uuden esihenkilön 2 kuukautta sitten.',
    learningGoal: 'Tunnista hierarkian väärinkäyttö ja opi rajojen asettaminen esihenkilölle',

    characters: [
        { id: 'player', name: 'Sinä', role: 'Kokenut työntekijä', color: '#3b82f6' },
        { id: 'supervisor', name: 'Esimies', role: 'Uusi esihenkilö', color: '#ef4444' },
        { id: 'colleague', name: 'Jari', role: 'Kollega', color: '#64748b' },
    ],

    startNodeId: 'node-1-morning',

    nodes: {
        // Node 1: Morning - Excessive demands
        'node-1-morning': {
            id: 'node-1-morning',
            visualState: {
                background: 'linear-gradient(to bottom, #f1f5f9, #cbd5e1)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 40, y: 60 },
                    { characterId: 'supervisor', position: 'standing', emotion: 'smug', x: 70, y: 50 },
                ],
            },
            narration: '📋 Maanantaiaamu - Työpisteelläsi ',
            dialogueLines: [
                {
                    characterId: 'supervisor',
                    text: 'Tarvitsen raportin jokaisesta asiakaskontaktista. Tuntikohtainen erittely.',
                    style: 'aggressive',
                },
                {
                    characterId: 'player',
                    text: '(Meillä on jo valmis raportointijärjestelmä...)',
                    style: 'thought',
                },
                {
                    characterId: 'supervisor',
                    text: 'Minä päätän miten täällä raportoidaan. Haluan myös nähdä kaikki sähköpostit ennen lähetystä.',
                    style: 'aggressive',
                },
            ],
            nextNodeId: 'choice-1-respond',
        },

        // Choice 1: How to respond? (A/B/C greeting style)
        'choice-1-respond': {
            id: 'choice-1-respond',
            visualState: {
                background: 'linear-gradient(to bottom, #f1f5f9, #cbd5e1)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 40, y: 60 },
                    { characterId: 'supervisor', position: 'standing', emotion: 'smug', x: 70, y: 50 },
                ],
            },
            dialogueLines: [],
            choices: [
                {
                    id: 'comply',
                    text: 'A) "Selvä, teen kuten käsketään."',
                    feedback: {
                        immediate: 'Päätät noudattaa kaikkia vaatimuksia.',
                        analysis: 'Vältit välittömän konfliktin, mutta kohtuuttomat vaatimukset johtavat uupumukseen.',
                        learningPoint: '⚠️ Kun hyväksyt kerran, vaatimukset kasvavat. Aseta rajat aikaisessa vaiheessa.',
                    },
                    nextNodeId: 'node-1a-comply',
                },
                {
                    id: 'question',
                    text: 'B) "Mikä ongelma tällä ratkaistaan? Meillä on toimiva järjestelmä."',
                    feedback: {
                        immediate: 'Asetit rajan ja esitit perustelun.',
                        analysis: 'Oikea reaktio, mutta voi johtaa uhkailuun.',
                        learningPoint: '🤔 Rakentava kysymys paljastaa tarkoituksellisuuden',
                    },
                    nextNodeId: 'node-1b-question',
                },
                {
                    id: 'suggest-meeting',
                    text: 'C) "Selvä. Ehdotan että keskustellaan tarkemmin palaverissa."',
                    feedback: {
                        immediate: 'Ehdotat rakentavaa keskustelua.',
                        analysis: 'Erinomainen! Tunnustit auktoriteetin mutta ehdotit yhteistyötä.',
                        learningPoint: '💡 "Ehdotan että keskustellaan" - rakentava mutta voimaannuttava',
                    },
                    nextNodeId: 'node-1c-meeting',
                },
            ],
        },

        // Node 1a: Comply response
        'node-1a-comply': {
            id: 'node-1a-comply',
            visualState: {
                background: 'linear-gradient(to bottom, #f1f5f9, #cbd5e1)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'sitting', emotion: 'sad', x: 40, y: 60 },
                    { characterId: 'supervisor', position: 'standing', emotion: 'smug', x: 70, y: 50 },
                ],
            },
            dialogueLines: [
                {
                    characterId: 'player',
                    text: 'Selvä, teen kuten käsketään.',
                    style: 'normal',
                },
                {
                    characterId: 'supervisor',
                    text: 'Hyvä. Aloita heti.',
                    style: 'aggressive',
                },
            ],
            nextNodeId: 'node-1.5-correction',
        },

        // Node 1b: Question response
        'node-1b-question': {
            id: 'node-1b-question',
            visualState: {
                background: 'linear-gradient(to bottom, #f1f5f9, #cbd5e1)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 40, y: 60 },
                    { characterId: 'supervisor', position: 'standing', emotion: 'angry', x: 70, y: 50 },
                ],
            },
            dialogueLines: [
                {
                    characterId: 'player',
                    text: 'Mikä ongelma tällä ratkaistaan? Meillä on toimiva järjestelmä.',
                    style: 'normal',
                },
                {
                    characterId: 'supervisor',
                    text: 'Minä päätän täällä. Jos et pysty, voimme keskustella sopivuudestasi.',
                    style: 'aggressive',
                },
            ],
            nextNodeId: 'node-1.5-correction',
        },

        // Node 1c: Meeting suggestion response
        'node-1c-meeting': {
            id: 'node-1c-meeting',
            visualState: {
                background: 'linear-gradient(to bottom, #f1f5f9, #cbd5e1)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 40, y: 60 },
                    { characterId: 'supervisor', position: 'standing', emotion: 'neutral', x: 70, y: 50 },
                ],
            },
            dialogueLines: [
                {
                    characterId: 'player',
                    text: 'Selvä. Ehdotan että keskustellaan tarkemmin palaverissa, mitkä raportit ovat tarpeellisia.',
                    style: 'normal',
                },
                {
                    characterId: 'supervisor',
                    text: '...Hyvä on. Sovitaan aika. Mutta tee tämä ensin.',
                    style: 'normal',
                },
            ],
            nextNodeId: 'node-1.5-correction',
        },

        // Node 1.5: Correction / Double Bind (Bridge Scene) - NEW
        'node-1.5-correction': {
            id: 'node-1.5-correction',
            visualState: {
                background: 'linear-gradient(to bottom, #f1f5f9, #cbd5e1)',
                backgroundType: 'office',
                characters: [
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 40, y: 60 },
                    { characterId: 'supervisor', position: 'standing', emotion: 'angry', x: 60, y: 55 },
                ],
            },
            narration: 'Myöhemmin samana päivänä...',
            dialogueLines: [
                {
                    characterId: 'player',
                    text: 'Tässä on se kooste, jonka pyysit.',
                    style: 'normal',
                },
                {
                    characterId: 'supervisor',
                    text: 'Miksi käytit tätä fonttia? Ja miksi tämä on Excelissä?',
                    style: 'aggressive',
                },
                {
                    characterId: 'player',
                    text: 'Mutta... me käytämme aina Exceliä näissä.',
                    style: 'normal',
                },
                {
                    characterId: 'supervisor',
                    text: 'Sanoin selvästi, että haluan Word-dokumentin. Kuunteletko sinä ollenkaan?',
                    style: 'aggressive',
                },
                {
                    characterId: 'player',
                    text: '(Hän ei taatusti sanonut mitään Wordista...)',
                    style: 'thought',
                },
                {
                    characterId: 'supervisor',
                    text: 'Tee se uudestaan. Heti.',
                    style: 'aggressive',
                },
            ],
            nextNodeId: 'node-2-meeting',
        },

        // Node 2: Weekly meeting - Public humiliation
        'node-2-meeting': {
            id: 'node-2-meeting',
            visualState: {
                background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
                backgroundType: 'meeting',
                characters: [
                    { characterId: 'supervisor', position: 'standing', emotion: 'angry', x: 30, y: 45 },
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 60, y: 60 },
                    { characterId: 'colleague', position: 'sitting', emotion: 'neutral', x: 75, y: 60 },
                ],
            },
            narration: '🗣️ Viikkopalaverissa - Koko tiimi paikalla',
            dialogueLines: [
                {
                    characterId: 'supervisor',
                    text: 'Ja kuten huomasimme tänään, meillä on henkilöitä, jotka eivät osaa noudattaa edes yksinkertaisia ohjeita.',
                    style: 'aggressive',
                },
                {
                    characterId: 'player',
                    text: '(Hän puhuu minusta... ja siitä keksitystä Word-ohjeesta.)',
                    style: 'thought',
                },
            ],
            nextNodeId: 'choice-2-respond',
        },

        // Choice 2: How to respond to public humiliation?
        'choice-2-respond': {
            id: 'choice-2-respond',
            visualState: {
                background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
                backgroundType: 'meeting',
                characters: [
                    { characterId: 'supervisor', position: 'standing', emotion: 'smug', x: 30, y: 45 },
                    { characterId: 'player', position: 'sitting', emotion: 'sad', x: 60, y: 60 },
                    { characterId: 'colleague', position: 'sitting', emotion: 'neutral', x: 75, y: 60 },
                ],
            },
            dialogueLines: [],
            choices: [
                {
                    id: 'silent',
                    text: 'A) En sano mitään. Kestän tilanteen.',
                    feedback: {
                        immediate: 'Hiljennyt ja kestät julkisen nöyryytyksen.',
                        analysis: 'Vältit väittelyn, mutta hiljaisuus voi tulkita hyväksynnäksi.',
                        learningPoint: '📋 Julkinen nöyryytys on psykologista väkivaltaa - dokumentoi!',
                    },
                    nextNodeId: 'node-2a-silent',
                },
                {
                    id: 'request-private',
                    text: 'B) "Voisimmeko käsitellä tämän kahden kesken palaverin jälkeen?"',
                    feedback: {
                        immediate: 'Asetit rajan rauhallisesti mutta selkeästi.',
                        analysis: 'Erinomainen! Vaadita asiallista kohtelua julkisesti.',
                        learningPoint: '🗣️ "Voisimmeko käsitellä kahden kesken?" asettaa rajan julkisesti',
                    },
                    nextNodeId: 'node-2b-private',
                },
                {
                    id: 'ask-concrete',
                    text: 'C) "Voitko täsmentää, mihin ohjeisiin viittaat?"',
                    feedback: {
                        immediate: 'Pyydät konkretiaa epämääräisten syytösten sijaan.',
                        analysis: 'Loistava taktiikka! Paljastit että syytökset ovat perättömiä.',
                        learningPoint: '🎯 Pyydä aina konkretiaa - se paljastaa perusteettoman kritiikin',
                    },
                    nextNodeId: 'node-2c-concrete',
                },
            ],
        },

        // Node 2a: Silent response
        'node-2a-silent': {
            id: 'node-2a-silent',
            visualState: {
                background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
                backgroundType: 'meeting',
                characters: [
                    { characterId: 'supervisor', position: 'standing', emotion: 'smug', x: 30, y: 45 },
                    { characterId: 'player', position: 'sitting', emotion: 'sad', x: 60, y: 60 },
                    { characterId: 'colleague', position: 'sitting', emotion: 'sad', x: 75, y: 60 },
                ],
            },
            dialogueLines: [
                {
                    characterId: 'player',
                    text: '(...)',
                    style: 'thought',
                },
                {
                    characterId: 'colleague',
                    text: '(Tulee luoksesi palaverin jälkeen) Tuo oli ihan kohtuutonta.',
                    style: 'whisper',
                },
            ],
            isEnd: true,
        },

        // Node 2b: Request private discussion
        'node-2b-private': {
            id: 'node-2b-private',
            visualState: {
                background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
                backgroundType: 'meeting',
                characters: [
                    { characterId: 'supervisor', position: 'standing', emotion: 'angry', x: 30, y: 45 },
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 60, y: 60 },
                    { characterId: 'colleague', position: 'sitting', emotion: 'happy', x: 75, y: 60 },
                ],
            },
            dialogueLines: [
                {
                    characterId: 'player',
                    text: 'Voisimmeko käsitellä tämän kahden kesken palaverin jälkeen?',
                    style: 'normal',
                },
                {
                    characterId: 'supervisor',
                    text: 'Ei tarvitse. Tämä koskee kaikkia.',
                    style: 'aggressive',
                },
                {
                    characterId: 'colleague',
                    text: '(Nyökkää sinulle hyväksyvästi)',
                    style: 'thought',
                },
            ],
            isEnd: true,
        },

        // Node 2c: Ask for concrete examples
        'node-2c-concrete': {
            id: 'node-2c-concrete',
            visualState: {
                background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
                backgroundType: 'meeting',
                characters: [
                    { characterId: 'supervisor', position: 'standing', emotion: 'angry', x: 30, y: 45 },
                    { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 60, y: 60 },
                    { characterId: 'colleague', position: 'sitting', emotion: 'neutral', x: 75, y: 60 },
                ],
            },
            dialogueLines: [
                {
                    characterId: 'player',
                    text: 'Voitko täsmentää, mitä tarkoitat? Mihin ohjeisiin viittaat?',
                    style: 'normal',
                },
                {
                    characterId: 'supervisor',
                    text: '...Siirrytään seuraavaan aiheeseen.',
                    style: 'normal',
                },
                {
                    characterId: 'player',
                    text: '(Ei pystynyt nimeämään mitään konkreettista...)',
                    style: 'thought',
                },
            ],
            isEnd: true,
        },
    },
};
