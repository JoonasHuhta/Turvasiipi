import type { BystanderScenario } from '../bystander-types';

/**
 * Scenario 4: "Nepsyn arki"
 * Context: Experienced colleague repeatedly dismisses a neurodivergent team member's ideas.
 * The dismissal is wrapped in "help" language — "let me rephrase that for you."
 * Difficulty: ⭐⭐⭐⭐ (cultural norm, unclear intent, disability context)
 */
export const bystanderScenario4Nepsy: BystanderScenario = {
    id: 'bystander-s4-nepsy',
    title: 'Nepsyn arki',
    context: 'Kokenut kollega toistuvasti "tulkkaa" neurodivergentin tiimiläisen ehdotukset — ikään kuin auttaakseen. Mutta Aada katoaa prosessissa.',
    powerDynamic: 'Kokemus + nepsytietoisuuden puute → neurodivergenssi',
    difficulty: 4,
    difficultyLabel: 'Vaativa',
    durationMinutes: 12,
    learningGoal: 'Tunnista paternalistinen auttaminen kiusaamisen muotona, harjoittele amplifiointia (toista kohteen sanat) ja suoraa puuttumista',

    characters: [
        { id: 'player', name: 'Sinä', role: 'Tiimiläinen', color: '#3b82f6' },
        { id: 'pertti', name: 'Pertti', role: 'Kokenut kollega', color: '#7c3aed' },
        { id: 'aada', name: 'Aada', role: 'Kollega, neurodivergenssi (ADHD)', color: '#ec4899' },
        { id: 'hanna', name: 'Hanna', role: 'Tiimiesimies', color: '#10b981' },
        { id: 'mikael', name: 'Mikael', role: 'Kollega', color: '#64748b' },
    ],

    scene: {
        id: 'project-workshop',
        background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
        perpetratorId: 'pertti',
        victimId: 'aada',
        bystanderIds: ['hanna', 'mikael'],
        bystanderReactions: [
            {
                characterId: 'hanna',
                behavior: 'avoids_eye_contact',
                label: 'Hanna kirjaa muistiinpanoja — ei huomaa',
            },
            {
                characterId: 'mikael',
                behavior: 'laughs_awkwardly',
                label: 'Mikael nyökkää Pertille — idea tuntuu oikealta',
            },
        ],
        dialogue: [
            {
                characterId: 'aada',
                text: 'Mulla on idea miten me saatais tää käyttäjätutkimusdata jäsennettyä nopeemmin — jos me käytettäis klusteroinnissa aihemallia eikä manuaalista koodausta—',
                style: 'normal',
            },
            {
                characterId: 'pertti',
                text: 'Joo, tarkoitat siis sitä että automaattiluokittelu voisi nopeuttaa prosessia. Hyvä ajatus periaatteessa — mutta meillä ei ole siihen tarvittavia resursseja tässä vaiheessa.',
                style: 'normal',
            },
            {
                characterId: 'aada',
                text: 'No, en oikeastaan tarkoittanut automaattia — vaan aihemallinnusta, se on eri asia—',
                style: 'normal',
            },
            {
                characterId: 'pertti',
                text: 'Joo, se on hyvä täsmennys. Eli siis se mitä Aada tarkoitti on X. Päästäänkö taas takaisin asiaan?',
                style: 'normal',
            },
            {
                characterId: 'player',
                text: '(Aada katsoo pöytää. Hän lakkaa puhumasta. Pertti on "auttanut" — mutta Aadan idea on nyt Pertin sanoina.)',
                style: 'thought',
            },
        ],
        timeWindowSeconds: 10,
        silenceOutcome: {
            text: 'Kokous päättyy. Loppupöytäkirjaan kirjataan Pertin muotoilu. Aada ei ota enää sanaa kokouksissa.',
            learningPoint: '📊 "Tulkkaaminen" on erityisen näkymätön vallankäytön muoto — se esittäytyy apuna. Aadalle itselleen se antoi viestin: "sanasi eivät ole tarpeeksi hyviä sellaisenaan."',
        },
    },

    recognition: {
        question: 'Mitä tässä tilanteessa tapahtui?',
        options: [
            {
                id: 'stolen-voice',
                label: 'Pertti toistuvasti muotoili Aadan sanat uudelleen — otti hänen äänensä',
                isCorrect: true,
                explanation: 'Oikein. "Tulkkaaminen" ilman lupaa vie ihmiseltä hänen oman äänensä. Erityisesti neurodiversiteettikontekstissa se on erityisen vahingollinen muoto.',
            },
            {
                id: 'helped',
                label: 'Pertti auttoi Aadaa ilmaisemaan itsensä paremmin',
                isCorrect: false,
                explanation: 'Pertti luuli ehkä auttavansa — mutta apu ilman lupaa on kontrollia. Aada ei pyytänyt tulkkausta ja vastusti sitä suoraan.',
            },
            {
                id: 'communication-style',
                label: 'Aadalla on eri kommunikaatiotyyli — sopeutuminen on järkevää',
                isCorrect: false,
                explanation: 'Erilainen kommunikaatiotyyli on neurodiversiteetin ydin. Sopeutumisen vastuu on kaikilla — ei vain Aadalla. "Tulkkaaminen" asettaa vastuun väärälle.',
            },
            {
                id: 'nothing',
                label: 'Kokouksissa tiivistetään ideoita — se on normaalia',
                isCorrect: false,
                explanation: 'Tiivistäminen voi olla ok — jos henkilö itse pyytää tai hyväksyy sen. Aada vastusti, ja Pertti jatkoi silti.',
            },
        ],
        certaintyQuestion: 'Kuinka selvänä pidät tätä ongelmana?',
        feedback: {
            correct: '✓ Tunnistit äänenvaltauksen. Intention hyvyys ei muuta vaikutusta.',
            partial: 'Hyvä havainto. Tässä tahallinen epäselvyys on erityisen vahva — koska Pertti todella saattaa luulla auttavansa.',
            normalize: 'Neurodiversiteettikonteksti tekee tästä erityisen vaikean tunnistaa. Se on OK — tunnistaminen vaatii harjoittelua ja tietoa.',
        },
        educationalNote: '🧠 Amplifikaatio vastastrategiana: kun toinen toistaa sinun sanasi — esim. "Kuten Aada sanoi, aihemallinnus tarkoittaa X" — palautat äänen takaisin alkuperäiselle puhujalle ilman konfliktia.',
    },

    arousal: {
        question: 'Miltä tilanne tuntuu sisällä, kun huomaat mitä tapahtuu?',
        options: [
            {
                id: 'tense',
                label: 'Epävarma — Pertti yrittää auttaa, vai mitä?',
                icon: '🤔',
                description: 'Paternalistinen kontrolli on hankala tunnistaa, koska se näyttää avulta. Epävarmuus on normaali reaktio.',
            },
            {
                id: 'heart_racing',
                label: 'Turhautunut Pertistä — hän ei kuuntele',
                icon: '😤',
                description: 'Kuulluksi tuleminen on perustarve. Kun näet sen puuttuvan toiselta, turhautuminen on empaattinen reaktio.',
            },
            {
                id: 'numb',
                label: 'Voimaton — Pertti on kokenut, hänellä on auktoriteettia',
                icon: '😔',
                description: 'Kokemusauktoriteetti on todellinen sosiaalinen voima. Mutta amplifikaatio on strategia joka ei vaadi asemaa.',
            },
            {
                id: 'calm',
                label: 'Tunnistan tilanteen — olen nähnyt tämän ennenkin',
                icon: '👁',
                description: 'Tunnistaminen on ensimmäinen teko. Se tarkoittaa, että olet valmis toimimaan.',
            },
            {
                id: 'frozen',
                label: 'Jäätynyt — en tiedä onko minun asiani puuttua',
                icon: '🧊',
                description: 'Hyvin yleinen reaktio neurodiversiteettikontekstissa. "En ymmärrä, onko tämä ongelma" on estänyt monta puuttumistilaisuutta.',
            },
        ],
        groundingExercise: {
            type: 'breathing',
            promptText: 'Aada on hiljaa. Pertti jatkaa. Hengitä ennen kuin puhut. Sisään 4s, ulos 6s.',
            durationSeconds: 15,
            afterwardQuestion: 'Onko sinulla nyt jokin lause, jonka voisit sanoa Aadan hyväksi?',
        },
        polyvagalNote: '🫀 Auktoriteetin läsnäolo (kokenut kollega) aktivoi sosiaalisen hierarkia-systeemin — erityisesti jos sinulla on lyhyt kokemus tiimistä. Tämä ei ole heikkous vaan hermoston suojausmekanismi.',
    },

    intervention: {
        prompt: 'Valitse tapa puuttua. Aada on vaiennut — mutta kokous jatkuu.',
        noChoiceText: 'Voit myös vaieta. Se mitä ei sanota, on myös viesti.',
        interventions: [
            {
                type: 'distract',
                label: 'Amplifoi (Häiritse)',
                icon: '🔀',
                riskLevel: 1,
                riskLabel: 'Matala riski',
                tagline: '"Kuten Aada sanoi..." — palauta hänen äänensä',
                whenBestUsed: 'Paras strategia tähän tilanteeseen. Lainaat Aadan sanoja takaisin — Pertti ei ole yhteentörmäyksen kohde.',
                whenRiskHigh: 'Harvoin. Amplifikaatio on poliittisesti neutraali — se ei syytä ketään.',
                examples: [
                    { text: '"Voitaisko palata Aadan alkuperäiseen ideaan — hän mainitsi aihemallinnuksen, joka on eri kuin automaattiluokittelu. Aada, selitätkö vähän lisää?"' },
                    { text: '"Joo, kuten Aada sanoi — aihemallinnus eroaa automaattiluokittelusta. Kiinnostaa kuulla lisää siitä."' },
                ],
                feedback: 'Amplifoit Aadan äänen. Hänen ideansa on nyt uudelleen pöydällä — hänen sanoin, ei Pertin tulkkaamana.',
                skillTag: 'amplify-voice',
                emotionChanges: { aada: 'happy' },
            },
            {
                type: 'delegate',
                label: 'Delegoi',
                icon: '👋',
                riskLevel: 1,
                riskLabel: 'Matala riski',
                tagline: 'Kerro esimiehelle toistuvuudesta',
                whenBestUsed: 'Kun tilanne on toistuva kaava — ei yksittäinen tapaus.',
                whenRiskHigh: 'Jos esimies ei ole nepsytietoinen, saattaa vähätellä ongelmaa.',
                examples: [
                    { text: '"Halusin nostaa esiin tilanteen, jota olen havainnut useamman kerran. Aadan ideat muotoillaan usein uudelleen ennen kuin ne ehditään kuulla alkuperäisinä."' },
                ],
                feedback: 'Delegointi on erityisen tärkeää kun ongelma on systemaattinen. Yksittäiseen tilanteeseen puuttuminen ei muuta tiimikulttuuria.',
                skillTag: 'delegate-manager',
            },
            {
                type: 'document',
                label: 'Dokumentoi',
                icon: '📋',
                riskLevel: 1,
                riskLabel: 'Turvallisin',
                tagline: 'Merkitse ylös toistuvuus tarkkoine sanamuotoineen',
                whenBestUsed: 'Aina — erityisesti kun paternalistinen kieli on systemaattista.',
                whenRiskHigh: 'Ei riskiä.',
                examples: [
                    { text: '"25.2.2026, projektipalaveri. Aada ehdotti aihemallinnusta. Pertti muotoili idean uudelleen automaattiluokitteluksi kaksi kertaa, vaikka Aada korjasi. Aada lopetti puhumisen."' },
                ],
                feedback: 'Tarkat sitaatit ovat ratkaisevia — "Pertti tulkkaa Aadaa" on mielipide, mutta "Pertti sanoi X kun Aada sanoi Y" on fakta.',
                skillTag: 'document-quotes',
            },
            {
                type: 'delay',
                label: 'Tue myöhemmin',
                icon: '💙',
                riskLevel: 1,
                riskLabel: 'Matala riski',
                tagline: 'Kysy Aadalta kokouksen jälkeen',
                whenBestUsed: 'Aina — myös silloin kun puutuit kokouksessa.',
                whenRiskHigh: 'Jos Aada haluaa sivuuttaa tilanteen — kunnioita sitä.',
                examples: [
                    { text: '"Hei Aada, kuulostiko minulle tuttu idea aihemallinnuksesta hyvin. Haluaisitko käydä sen läpi minun kanssani — saataisiin idea oikein esitettyä seuraavaan kertaan?"' },
                    { text: '"Huomasin palaverissa, että ideasi meni hieman sekaisin tulkkaamisen kanssa. Miltä se tuntui?"' },
                ],
                feedback: '"Kuulin sinun — ei Pertin version" — tämä lause voi olla kokonainen todellisuuden korjaus Aadalle.',
                skillTag: 'delay-validate',
                emotionChanges: { aada: 'happy' },
            },
            {
                type: 'direct',
                label: 'Suora puuttuminen',
                icon: '🗣',
                riskLevel: 3,
                riskLabel: 'Korkea riski',
                tagline: 'Nimeä tilanne suoraan kokouksessa',
                whenBestUsed: 'Kun sinulla on asemaa, hyvä suhde tiimiin, tai esimies on paikalla ja tukee.',
                whenRiskHigh: 'Jos organisaatiokulttuuri ei ole nepsytietoinen — "yliherkkyys"-leima on riski.',
                examples: [
                    { text: '"Pertti, huomaan, että Aadan idea muotoillaan toistuvasti uudelleen — mutta minua kiinnostaisi kuulla se Aadalta itseltään. Aada, mitä tarkoitit alun perin?"' },
                    { text: '"Annetaanko Aadalle tilaa viimeistellä idea ensin — sitten voidaan kommentoida?"' },
                ],
                feedback: 'Suora puuttuminen vaatii eniten — mutta se myös muuttaa tiimin normia tässä kokouksessa, ei vain tässä hetkessä.',
                skillTag: 'direct-amplify',
                emotionChanges: { aada: 'happy', pertti: 'neutral', hanna: 'neutral' },
            },
        ],
    },

    wordPractice: {
        context: 'Aada esitti ideansa. Pertti muotoili sen uudelleen. Aada vastusti — Pertti jatkoi. Aada on vaiennut.',
        phrasePrompt: 'Valitse lause. Ei täydellinen — vain käyttökelpoinen.',
        readyMadePhrases: [
            {
                text: 'Kuten Aada sanoi — aihemallinnus on eri tekniikka kuin automaatti. Aada, haluaisitko avata sitä vähän lisää?',
                tone: 'gentle',
                dModel: 'distract',
                sceneReaction: {
                    perpetratorReaction: 'Pertti pysähtyy. Siirtyy sivuun.',
                    victimReaction: 'Aada nostaa katseen — ja alkaa puhua taas.',
                    bystanderReaction: 'Hanna katsoo kiinnostuneena.',
                },
                analysis: '✓ Amplifikaatio puhtaimmillaan. "Kuten Aada sanoi" palauttaa omistajuuden — "haluaisitko avata" antaa hänelle äänen takaisin.',
            },
            {
                text: 'Pertti, anna Aadan ensin viimeistellä ajatuksensa — sitten kommentoidaan.',
                tone: 'assertive',
                dModel: 'direct',
                sceneReaction: {
                    perpetratorReaction: 'Pertti: "Joo, totta kai." — Pieni hämmennys.',
                    victimReaction: 'Aada: "Kiitos." Hän jatkaa.',
                    bystanderReaction: 'Mikael nyökkää.',
                },
                analysis: '✓ Lyhyt, asiallinen, ei syytä ketään. "Anna viimeistellä" on pyyntö, ei hyökkäys.',
            },
            {
                text: 'Hei Aada, kuulin idean — aihemallinnus kuulostaa kiinnostavalta. Kerrotko lisää, en ole varma ymmärsin oikein.',
                tone: 'gentle',
                dModel: 'delay',
                sceneReaction: {
                    perpetratorReaction: 'Pertti vetäytyy — puhu on nyt Aadalle.',
                    victimReaction: 'Aada saa kysymyksen — ja alkaa vastata suoraan.',
                },
                analysis: '✓ Kohditit huomion suoraan Aadaan. Sinä olet kiinnostunut — ei Pertin versiosta.',
            },
        ],
        editableTemplate: {
            template: '"Kuten [Aada] sanoi — [alkuperäinen idea]. [Aada], [kutsu jatkamaan]."',
            slots: [
                {
                    placeholder: '[Aada]',
                    suggestion: 'Aada',
                    hint: 'Aina alkuperäisen puhujan nimi — se palauttaa omistajuuden',
                },
                {
                    placeholder: '[alkuperäinen idea]',
                    suggestion: 'aihemallinnus — ei automaattiluokittelu',
                    hint: 'Toista Aadan sanat — ei Pertin muotoilu',
                },
                {
                    placeholder: '[kutsu jatkamaan]',
                    suggestion: 'haluaisitko avata tätä lisää?',
                    hint: 'Kysymys antaa äänen takaisin',
                },
            ],
        },
        openTextLabel: 'Kirjoita oma lauseesi',
        openTextHint: 'Amplifikaatio toimii parhaiten lyhyesti: "Kuten X sanoi..." + kutsu jatkamaan.',
        savedPhraseLabel: 'Tallenna tämä turvalauseeksesi',
    },

    safetyPlan: {
        intro: 'Kokous on ohi. Loppupöytäkirjaan on kirjattu Pertin muotoilu...',
        costScenario: {
            description: 'Mitä pelkäisit tapahtuvan, jos olisit puuttunut?',
            options: [
                { id: 'pertti-annoyed', label: 'Pertti olisi loukkaantunut — hän luuli auttavansa', isCost: true },
                { id: 'oversensitive', label: 'Muut olisivat ajatelleet, että liioittelen', isCost: true },
                { id: 'aada-voice', label: 'Aadalla olisi ollut ääni omassa ideassaan', isCost: false },
                { id: 'norm-shift', label: 'Tiimi olisi oppinut, että amplifikaatio on ok', isCost: false },
                { id: 'nothing', label: 'Ehkä ei olisi muuttunut mitään', isCost: false },
            ],
            note: 'Paternalistinen auttajuus ei vaadi pahaa tarkoitusta. Siitä on silti seurauksia Aadalle — ja sen nimeäminen on mahdollista ilman syytöksiä.',
        },
        protectionActions: [
            {
                id: 'amplify-habit',
                label: 'Teen amplifikaatiosta tavan jokaisessa kokouksessa',
                category: 'self',
                description: '"Kuten X sanoi..." — harjoittele sitä kunnes se tuntuu luonnolliselta.',
            },
            {
                id: 'learn-nepsy',
                label: 'Luen lyhyesti neurodiversiteetistä ja kommunikaatiosta',
                category: 'self',
                description: 'ADHD:n kommunikaatiopiirteiden ymmärtäminen auttaa tunnistamaan, milloin "tulkkaaminen" on haitallista.',
            },
            {
                id: 'tell-manager',
                label: 'Kerron esimiehelle tiimin nepsytietoisuuden tarpeesta',
                category: 'systemic',
                description: '"Tiimikoulutus nepsyystävällisestä kommunikaatiosta voisi olla hyödyllinen" — rakenteellinen muutos.',
            },
            {
                id: 'check-aada',
                label: 'Kysyn Aadalta miten hän koki kokouksen',
                category: 'victim',
                description: 'Ilman olettamuksia — Aada itse tietää parhaiten mikä on hyödyllistä.',
            },
        ],
        upstanderNote: '📊 Tutkimukset osoittavat, että neurodiversit henkilöt jätetään toistuvasti puheenvuorojen ulkopuolelle — usein ilman tarkoitusta. Amplifikaatio on yksi tehokkaimmista ja riskittömimmistä keinoista korjata tätä.',
    },
};
