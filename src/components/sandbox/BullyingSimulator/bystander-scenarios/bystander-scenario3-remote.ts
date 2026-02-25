import type { BystanderScenario } from '../bystander-types';

/**
 * Scenario 3: "Teams-kanava"
 * Context: Written belittling visible in team channel. Evidence stays — but the threshold to intervene feels high.
 * Power dynamic: peer → peer, public digital space
 * Difficulty: ⭐⭐⭐ (asynchronous, permanent record, audience pressure)
 */
export const bystanderScenario3Remote: BystanderScenario = {
    id: 'bystander-s3-remote',
    title: 'Teams-kanava',
    context: 'Tiimin Teams-kanavalla joku vähättelee kollegan työtä julkisesti. Koko tiimi näkee. Kukaan ei reagoi.',
    powerDynamic: 'Vertainen → vertainen (digitaalinen yleisö)',
    difficulty: 3,
    difficultyLabel: 'Haastava',
    durationMinutes: 8,
    learningGoal: 'Tunnista kirjallinen vähättely, harjoittele digitaalista puuttumista (Direct & Document)',

    characters: [
        { id: 'player', name: 'Sinä', role: 'Tiimiläinen', color: '#3b82f6' },
        { id: 'hannu', name: 'Hannu', role: 'Kollega (lähettäjä)', color: '#ef4444' },
        { id: 'leena', name: 'Leena', role: 'Kollega (kohde)', color: '#ec4899' },
        { id: 'sami', name: 'Sami', role: 'Kollega', color: '#64748b' },
        { id: 'aino', name: 'Aino', role: 'Kollega', color: '#94a3b8' },
    ],

    scene: {
        id: 'teams-channel',
        background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
        perpetratorId: 'hannu',
        victimId: 'leena',
        bystanderIds: ['sami', 'aino'],
        bystanderReactions: [
            {
                characterId: 'sami',
                behavior: 'avoids_eye_contact',
                label: 'Sami näkee viestin — ei reagoi',
            },
            {
                characterId: 'aino',
                behavior: 'looks_at_phone',
                label: 'Aino laittaa 👍 Hannun viestiin',
            },
        ],
        dialogue: [
            {
                characterId: 'leena',
                text: '[Teams #projekti] Hei tiimi! Liitin päivitetyn aikataulun tiedostoon. Katsotteko ja kommentoitte? 🙂',
                style: 'normal',
            },
            {
                characterId: 'hannu',
                text: 'Selitäks joku tää Leenalle miten aikataulut tehdään? Tää on jo kolmas versio joka ei vastaa mitään mitä sovittiin. En ymmärrä miten tähän on menossa noin paljon aikaa.',
                style: 'aggressive',
            },
            {
                characterId: 'aino',
                text: '👍',
                style: 'normal',
            },
            {
                characterId: 'player',
                text: '(Silmät pysähtyvät Hannun viestiin. Leena ei ole vielä vastannut. Kanavalla on 12 tiimiläistä online.)',
                style: 'thought',
            },
        ],
        timeWindowSeconds: 10,
        silenceOutcome: {
            text: 'Leena vastaa tunnin kuluttua lyhyesti: "Ok, muokataan." Hän ei enää kirjoita kanavalle yhtä usein seuraavien viikkojen aikana.',
            learningPoint: '📊 Digitaalisessa ympäristössä hiljaisuus on näkyvämpi — ja vaikutukseltaan yhtä vahingollinen kuin fyysisessä tilassa. Reaktion puuttuminen näyttää hyväksynnältä.',
        },
    },

    recognition: {
        question: 'Mitä Hannun viesti teki?',
        options: [
            {
                id: 'public-shaming',
                label: 'Nimesi Leenan epäpäteväksi julkisesti koko tiimin nähden',
                isCorrect: true,
                explanation: 'Oikein. "Selitäks joku tää Leenalle" infantilisoi hänet suoraan. Koko tiimin yleisö tekee tästä erityisen vahingollisen.',
            },
            {
                id: 'frustrated',
                label: 'Ilmaisi turhautumisensa — rehellisesti, vaikka karkeasti',
                isCorrect: false,
                explanation: 'Turhautuminen on hyväksyttävä tunne, mutta sen ilmaiseminen näin on epäasiallista. Työsähköposti tai yksityisviesti olisi asianmukainen kanava.',
            },
            {
                id: 'feedback',
                label: 'Antoi kriittistä palautetta — se kuuluu työskentelyyn',
                isCorrect: false,
                explanation: 'Kritiikki kuuluu kyllä työskentelyyn. Mutta julkinen, henkilökohtaiseen pätevyyteen kohdistuva kritiikki ei ole palaute — se on vähättely.',
            },
            {
                id: 'minor',
                label: 'Sanoi vähän karskisti mutta ei mitään vakavaa',
                isCorrect: false,
                explanation: '"Ei mitään vakavaa" on yleinen reaktio — mutta 12 kollegan silmien edessä tapahtunut infantilisointi vaikuttaa Leenan asemaan ja itseluottamukseen.',
            },
        ],
        certaintyQuestion: 'Kuinka selkeästi näet tässä epäasiallisuuden?',
        feedback: {
            correct: '✓ Tunnistit infantilisoinnin ja julkisen yleisön merkityksen.',
            partial: 'Hyvä intuitio. Kannattaa kiinnittää huomiota "selitäks joku tää" -muotoon — se tekee Leenasta objektin, ei subjektin.',
            normalize: 'Täysin ymmärrettävää, jos olet epävarma. Kirjallinen viestintä on monimerkityksistä — mutta jos sisässä tuntuu väärältä, se tunne on informaatiota.',
        },
        educationalNote: '🧠 "Julkinen häpäisy digitaalisessa ympäristössä" — Aino\'n 👍 tekee tilanteesta erityisen vaikuttavan. Hyväksynnän signaali vahvistaa käyttäytymistä ja tekee Leenasta yksinäisemmän.',
    },

    arousal: {
        question: 'Sillä hetkellä kun luet viestin — miltä kehossasi tuntuu?',
        options: [
            {
                id: 'numb',
                label: 'Epämukava — nopea tunne vatsassa',
                icon: '😟',
                description: 'Kehon signaali ennen kuin rationaalinen mieli ehtii. Se on arvokas — älä sivuuta sitä.',
            },
            {
                id: 'heart_racing',
                label: 'Ärsyyntynyt tai vihainen Hannusta',
                icon: '😠',
                description: 'Suorat reagoijat. Haaste: digitaalinen tilanne antaa aikaa — käytä se strategiseen eikä reaktiiviseen vastaamiseen.',
            },
            {
                id: 'frozen',
                label: 'Jäätynyt — en tiedä mitä sanoa tai tehdä',
                icon: '🧊',
                description: 'Hyvin yleinen digitaalisessa ympäristössä. "Kaikki näkevät" -efekti lamaannuttaa. Harjoittelu auttaa tähän eniten.',
            },
            {
                id: 'tense',
                label: 'Ahdistunut — pelkään saavani saman kohtelun',
                icon: '😰',
                description: 'Toisarvoinen uhka on todellinen sivulliselle. Tämä on osa miksi ihmiset vaikenevat — itsesuojelu.',
            },
            {
                id: 'calm',
                label: 'Rauhallinen — minulla on sanat valmiina',
                icon: '✨',
                description: 'Harjoiteltujen lauseiden valta: kun tiedät mitä sanoa, reaktionopeus kasvaa ja stressitaso laskee.',
            },
        ],
        groundingExercise: {
            type: 'breathing',
            promptText: 'Digitaalisessa ympäristössä on harvinainen etu: aikaa hengittää ennen vastausta. Sisään 4s, ulos 6s. Sitten kirjoita.',
            durationSeconds: 15,
            afterwardQuestion: 'Onko sinulla nyt selkeämpi idea mitä haluaisit sanoa tai tehdä?',
        },
        polyvagalNote: '🫀 Digitaalinen ympäristö luo erityisen haasteen: reaktio jää näkyväksi pysyvästi. Tämä aktivoi enemmän harkintaa — mutta myös enemmän lamaantumista. Hengitys palauttaa prefrontaalikuoren käyttöön.',
    },

    intervention: {
        prompt: 'Valitse tapa reagoida. Olet Teams-kanavassa — kaikki näkevät mitä kirjoitat (tai kirjoittamatta jätät).',
        noChoiceText: 'Voit olla kirjoittamatta mitään. Hiljaisuus on myös viesti.',
        interventions: [
            {
                type: 'distract',
                label: 'Häiritse',
                icon: '🔀',
                riskLevel: 1,
                riskLabel: 'Matala riski',
                tagline: 'Muuta aihetta — vie huomio pois',
                whenBestUsed: 'Kun et halua konfrontoida mutta haluat katkaista hetkeen. Siirtää energian pois kohteelta.',
                whenRiskHigh: 'Jos tilanne on jo eskaloitunut — häirintä saattaa vain jäädä huomaamatta.',
                examples: [
                    { text: '"Leena, laitoin kommentin tiedostoon — yhtä kohtaa pohditaan vielä, mutta kokonaisuus näyttää hyvältä."' },
                    { text: '"Tiimi, muistuttelen vielä aikataupalaverista to 14:00 — confirm kalenteristanne 👍"' },
                ],
                feedback: 'Loit rinnakkaisen tapahtuman. Leenan ei tarvitse enää vastata Hannulle suoraan — tilanne on siirtynyt eteenpäin.',
                skillTag: 'distract-topic-shift',
            },
            {
                type: 'delegate',
                label: 'Delegoi',
                icon: '👋',
                riskLevel: 1,
                riskLabel: 'Matala riski',
                tagline: 'Vie screenshottina esimiehelle',
                whenBestUsed: 'Kun tilanne on liian vaikea puuttua kanavalla — mutta haluat silti tehdä jotain.',
                whenRiskHigh: 'Digitaaliset todisteet ovat erityisen vahvoja — tämä toimii hyvin.',
                examples: [
                    { text: '"Laitin sinulle yksityisviestin asiasta joka jäi vaivaaman Teams-kanavalta."' },
                ],
                feedback: 'Screenshot + yksityisviesti esimiehelle on tehokas tapa. Digitaalinen jälki tekee delegoinnista konkreettisempaa.',
                skillTag: 'delegate-screenshot',
            },
            {
                type: 'document',
                label: 'Dokumentoi',
                icon: '📋',
                riskLevel: 1,
                riskLabel: 'Turvallisin',
                tagline: 'Ota kuvakaappaus — Teams-historia voi kadota',
                whenBestUsed: 'Aina. Digitaalisessa ympäristössä dokumentointi on erityisen helppoa — ja arvokasta jos asia etenee.',
                whenRiskHigh: 'Ei riskiä.',
                examples: [
                    { text: '"Otan kuvakaappauksen: Teams #projekti, 25.2.2026, 14:32. Hannu: [viesti]. Läsnä: 12 tiimiläistä. Aino: 👍"' },
                ],
                feedback: 'Digitaalinen todiste on poikkeuksellisen arvokas. HR tai esimies ottaa kirjalliset tapaukset vakavammin kuin suulliset kertomukset.',
                skillTag: 'document-screenshot',
            },
            {
                type: 'delay',
                label: 'Tue myöhemmin',
                icon: '💙',
                riskLevel: 1,
                riskLabel: 'Matala riski',
                tagline: 'Kirjoita Leenalle yksityisviesti',
                whenBestUsed: 'Kun tilanne on jo ohi tai et halua puuttua julkisesti.',
                whenRiskHigh: 'Jos Leena on hauras juuri nyt — kysy ensin miten hän voi.',
                examples: [
                    { text: '"Hei Leena, luin kanavalta Hannun viestin. Se kuulosti aika kovalta. Oletko ok?"' },
                    { text: '"Vain FYI — aikataulusi vaikutti minusta hyvin tehtyltä. Kommentit olivat ankaria."' },
                ],
                feedback: '"Näin mitä tapahtui" — yksityinen validointi on erityisen arvokas julkisen häpäisyn jälkeen. Se korjaa sosiaalisen todellisuuden.',
                skillTag: 'delay-dm',
                emotionChanges: { leena: 'happy' },
            },
            {
                type: 'direct',
                label: 'Suora puuttuminen',
                icon: '🗣',
                riskLevel: 2,
                riskLabel: 'Kohtalainen riski',
                tagline: 'Kirjoita kanavalle — julkisesti',
                whenBestUsed: 'Kun uskot, että organisaatiokulttuuri tukee sinua. Julkinen puuttuminen on vahvin signaali.',
                whenRiskHigh: 'Jos Hannu on hierarkiassa sinua ylempänä tai erityisen vaikutusvaltainen.',
                examples: [
                    { text: '"Hannu, mielestäni tuo kommentti oli aika kova. Olen katsonut Leenan aikataulua — siihen on selkeästi panostettu."' },
                    { text: '"Leena, minusta aikataulu vaikutti hyvältä. Jos on kommentoitavaa, ehkä kannattaa käydä suoraan läpi?"' },
                ],
                feedback: 'Julkinen tuki on vahvin signaali — se muuttaa koko kanavan normia. Samalla se on se vastuullisin teko, koska se jää näkyväksi.',
                skillTag: 'direct-public-reply',
                emotionChanges: { leena: 'happy', hannu: 'neutral' },
            },
        ],
    },

    wordPractice: {
        context: 'Hannu kirjoitti — "Selitäks joku tää Leenalle miten aikataulut tehdään?" — kanavalle. 12 tiimiläistä on online. Leena ei ole vielä vastannut.',
        phrasePrompt: 'Valitse tai kirjoita oma vastauksesi kanavalle tai yksityisviestiksi.',
        readyMadePhrases: [
            {
                text: 'Leena, katsoin aikataulua — näyttää hyvältä. Jos on tarkennettavaa, voidaan käydä sen läpi yhdessä.',
                tone: 'gentle',
                dModel: 'distract',
                sceneReaction: {
                    perpetratorReaction: 'Hannu ei vastaa enää kanavalle.',
                    victimReaction: 'Leena: "Kiitos 🙂" — ensimmäinen vastaus tunnin hiljaisuuden jälkeen.',
                    bystanderReaction: 'Sami laittaa 👍 vastauksellesi.',
                },
                analysis: '✓ Muutit narraatia. Leena ei ole enää selittelyn kohde — hän on kollega jonka työtä arvostat.',
            },
            {
                text: 'Hannu, mielestäni tuo kommentti kuulosti aika kovalta. Palaute toimii paremmin suoraan Leenan kanssa.',
                tone: 'assertive',
                dModel: 'direct',
                sceneReaction: {
                    perpetratorReaction: 'Hannu ei vastaa — tai: "En tarkoittanut pahaa."',
                    victimReaction: 'Leena: "Kiitos" yksityisviestillä sinulle.',
                    bystanderReaction: 'Aino poistaa 👍:n.',
                },
                analysis: '✓ Selkeä ja asiaankuuluva. "Minun mielestäni" pitää vastuun sinulla. Nimeät ongelman nimeämättä Hannua kiusaajaksi.',
            },
            {
                text: 'Hei Leena, luin kanavan viestiketjun. Tuo kuulosti kovalta — miten voit?',
                tone: 'gentle',
                dModel: 'delay',
                sceneReaction: {
                    perpetratorReaction: '(Yksityisviesti Leenalle)',
                    victimReaction: '"Kiitos että kirjoitit. En odottanut sitä." — Leena hengähtää.',
                },
                analysis: '✓ Yksityinen validointi on erityisen arvokas julkisen häpäisyn jälkeen. "En odottanut sitä" kertoo, miten yksin Leena oli.',
            },
        ],
        editableTemplate: {
            template: '[Leena/Hannu], [lyhyt havainto]. [Ratkaisu tai ehdotus].',
            slots: [
                {
                    placeholder: '[Leena/Hannu]',
                    suggestion: 'Leena',
                    hint: 'Kenen puoleen käännyt? Tuki Leenalle vs. haaste Hannulle.',
                },
                {
                    placeholder: '[lyhyt havainto]',
                    suggestion: 'katsoin aikataulua ja näyttää hyvältä',
                    hint: 'Konkreettinen havainto — ei yleistys',
                },
                {
                    placeholder: '[Ratkaisu tai ehdotus]',
                    suggestion: 'käydään läpi yhdessä jos on kommentteja',
                    hint: 'Vie tilanne eteenpäin rakentavasti',
                },
            ],
        },
        openTextLabel: 'Kirjoita oma vastauksesi',
        openTextHint: 'Digitaalisessa viestinnässä lyhyt ja selkeä on voima. Tavoittele yhtä tai kahta lausetta.',
        savedPhraseLabel: 'Tallenna tämä turvalauseeksesi',
    },

    safetyPlan: {
        intro: 'Viikon kuluttua Hannun viesti on edelleen kanavalla. Leena kirjoittaa vähemmän...',
        costScenario: {
            description: 'Mitä pelkäisit tapahtuvan, jos olisit puuttunut julkisesti?',
            options: [
                { id: 'hannu-target', label: 'Hannu kohdistaa seuraavaksi minuun', isCost: true },
                { id: 'overreacting', label: 'Muut ajattelevat, että ylireagointi', isCost: true },
                { id: 'normalized', label: 'Hannu jatkaa — ei muutu mitään', isCost: false },
                { id: 'channel-norm', label: 'Kanavan kulttuuri alkaa hiljalleen muuttua', isCost: false },
                { id: 'leena-less-alone', label: 'Leena tietää, ettei ole yksin', isCost: false },
            ],
            note: 'Aktiivinen hiljaisuus antaa käyttäytymiselle yhteisön hyväksynnän. Aino\'n 👍 ei ehkä merkinnyt paljoa — mutta muut näkivät sen.',
        },
        protectionActions: [
            {
                id: 'screenshot-now',
                label: 'Otan kuvakaappauksen heti — ennen kuin historia muuttuu',
                category: 'systemic',
                description: 'Teams-historiaa voidaan muokata tai poistaa. Välitön dokumentointi on paras suoja.',
            },
            {
                id: 'dm-leena',
                label: 'Kirjoitan Leenalle yksityisviestin',
                category: 'victim',
                description: '"Näin mitä tapahtui — oletko ok?" — yhdellä viestillä rikot eristyksen.',
            },
            {
                id: 'tell-manager',
                label: 'Kerron esimiehelle — viesti on todisteena',
                category: 'systemic',
                description: 'Digitaalinen todiste tekee delegoinnista erityisen vahvan. Esimies voi toimia kirjallisen todisteen pohjalta.',
            },
            {
                id: 'channel-norm',
                label: 'Jatkossa kommentoin positiivisesti kanavalla — muutan normin',
                category: 'self',
                description: 'Toistuva positiivinen signaali muuttaa kanavan kulttuuria yhtä tehokkaasti kuin yksi suuri puuttuminen.',
            },
        ],
        upstanderNote: '📊 Digitaalinen ympäristö harhauttaa: "kirjoitus vain jää siellä, ei tarvitse reagoida heti." Mutta hiljaisuuden näkyvyys on täsmälleen sama kuin fyysisessä tilassa — kaikki 12 tiimiläistä näkivät, ettei kukaan puuttunut.',
    },
};
