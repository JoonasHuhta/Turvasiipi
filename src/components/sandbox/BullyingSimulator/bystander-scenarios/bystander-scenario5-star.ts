import type { BystanderScenario } from '../bystander-types';

/**
 * Scenario 5: "Tähtisuorittaja"
 * Context: A high-performer protected by management makes cutting remarks.
 * Everyone sees it, no one speaks — even the manager doesn't.
 * Institutional silence makes this the hardest scenario.
 * Difficulty: ⭐⭐⭐⭐⭐ (institutional protection, group silence, high social risk)
 */
export const bystanderScenario5Star: BystanderScenario = {
    id: 'bystander-s5-star',
    title: 'Tähtisuorittaja',
    context: 'Tiimin paras myyjä piikittelee. Kaikki näkevät. Kukaan ei puhu — myöskään esimies ei.',
    powerDynamic: 'Institutionaalisesti suojeltu suoriutuja → tiimiläinen',
    difficulty: 5,
    difficultyLabel: 'Erittäin vaativa',
    durationMinutes: 14,
    learningGoal: 'Ymmärtää institutionaalisen suojan rakenne, tunnistaa milloin suora puuttuminen on liian riskialtis, harjoitella epäsuoran vaikuttamisen strategioita',

    characters: [
        { id: 'player', name: 'Sinä', role: 'Tiimiläinen', color: '#3b82f6' },
        { id: 'kristoffer', name: 'Kristoffer', role: 'Tähtisuorittaja', color: '#f97316' },
        { id: 'sini', name: 'Sini', role: 'Kollega (kohde)', color: '#ec4899' },
        { id: 'tiina', name: 'Tiina', role: 'Tiimiesimies', color: '#10b981' },
        { id: 'risto', name: 'Risto', role: 'Kollega', color: '#64748b' },
    ],

    scene: {
        id: 'open-office',
        background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
        perpetratorId: 'kristoffer',
        victimId: 'sini',
        bystanderIds: ['tiina', 'risto'],
        bystanderReactions: [
            {
                characterId: 'tiina',
                behavior: 'avoids_eye_contact',
                label: 'Tiina jatkaa kirjoittamista — ei nosta katsetta',
            },
            {
                characterId: 'risto',
                behavior: 'laughs_awkwardly',
                label: 'Risto hymähtää — hauras nauru',
            },
        ],
        dialogue: [
            {
                characterId: 'sini',
                text: 'Tein Q3:n analyysistä raportin ja lisäsin sen SharePointiin —',
                style: 'normal',
            },
            {
                characterId: 'kristoffer',
                text: 'Sini, ei ole pahaa sanoa — mutta täällä oppii melko nopeasti, kenen analyysit luetaan loppuun asti. *(kääntyy Ristone puoleen)* Tiedäthän mitä tarkoitan.',
                style: 'aggressive',
            },
            {
                characterId: 'risto',
                text: '*(hymähtää epämukavasti)*',
                style: 'normal',
            },
            {
                characterId: 'tiina',
                text: '*(ei nosta katse tietokoneen ruudulta)*',
                style: 'thought',
            },
            {
                characterId: 'player',
                text: '(Sinillä on kyyneleet silmissä. Tiina näki tilanteen — ja kirjoittaa edelleen. Kristofferilla on paras myyntitulos neljännen kerran peräkkäin.)',
                style: 'thought',
            },
        ],
        timeWindowSeconds: 10,
        silenceOutcome: {
            text: 'Sini lähtee toimistolta ennen kello kahta. Seuraavana päivänä hän ilmoittaa sairaslomasta. Kristoffer saa Q3-palkinnon seuraavassa tiimipalaverissa.',
            learningPoint: '📊 Institutionaalinen suoja tekee sivullisen roolista vaikeimman. Esimiehen hiljaisuus viestii: "tämä on hyväksyttävää." Tähän ei ole helppoja vastauksia — mutta on olemassa strategioita.',
        },
    },

    recognition: {
        question: 'Mikä tässä tilanteessa oli erityisen vahingollista?',
        options: [
            {
                id: 'institutional',
                label: 'Esimiehen hiljaisuus antoi tilanteelle institutionaalisen hyväksynnän',
                isCorrect: true,
                explanation: 'Oikein. Esimiehen reaktio (tai sen puuttuminen) on tiimille signaali: "tämä on normi täällä." Hiljaisuus ei ole neutraali — se vahvistaa käyttäytymistä.',
            },
            {
                id: 'just-joke',
                label: 'Kristoffer vain piikitteli — mutta ei suoraan loukannut',
                isCorrect: false,
                explanation: '"Täällä oppii nopeasti, kenen analyysit luetaan loppuun" on suoraan Sinin ammatillisen kompetenssin alentaminen. Epäsuoruus on osa taktikkaa.',
            },
            {
                id: 'performance-culture',
                label: 'Tähtisuorittajat voivat olla suorasanaisia — se on osa kulttuuria',
                isCorrect: false,
                explanation: 'Suorasanaisuus on eri asia kuin kompetenssin julkinen alentaminen. Kulttuuri ei tee käyttäytymisestä hyväksyttävää — se tekee siitä vain tutumpaa.',
            },
            {
                id: 'sinis-problem',
                label: 'Sini voisi harjoitella paksumpaa nahkaa — työ on kilpailullista',
                isCorrect: false,
                explanation: '"Paksu nahka" -odotus asettaa sopeutumisvastuun kohteelle, ei tehijälle. Kyyneleet eivät ole heikkous — ne ovat merkki siitä, että raja ylitetty.',
            },
        ],
        certaintyQuestion: 'Tunnistathan esimiehen hiljaisuuden merkityksen tässä tilanteessa?',
        feedback: {
            correct: '✓ Tunnistit institutionaalisen dynamiikan. Tämä on kaikkein vaikein ymmärtää — mutta tärkein.',
            partial: 'Hyvä intuitio. Kiinnitä huomio erityisesti Tiinan reaktioon — tai sen puuttumiseen.',
            normalize: 'Tämä on vaikein tunnistaa, koska "mitään suurta ei tapahtunut" — mutta institutionaalinen dynamiikka tekee siitä kaikkein vahingollisimman.',
        },
        educationalNote: '🧠 "Bystander effect" on vahvimmillaan silloin, kun auktoriteetti (esimies) on paikalla ja hiljaa. Se antaa käyttäytymiselle valtarakenteiden tuen — joka tekee sivullisen puuttumisesta subjektiivisesti kaikkein riskialttiimpaa.',
    },

    arousal: {
        question: 'Miltä sisälläsi tuntuu, kun näet Sinin kyyneleet ja Tiinan hiljaisuuden?',
        options: [
            {
                id: 'heart_racing',
                label: 'Raivo tai vahva oikeudenmukaisuuden loukkaus',
                icon: '🔥',
                description: 'Voimakas reaktio on normaali — institutionaalinen epäoikeudenmukaisuus on erityisen vahingollista. Haaste: suora purkaminen voi kääntyä sinua vastaan.',
            },
            {
                id: 'tense',
                label: 'Pelko — Kristoffer voisi kohdistaa minuun seuraavaksi',
                icon: '😨',
                description: 'Toisarvoinen uhka on tässä skenaariossa todellinen. Tähtisuorittajalla on sosiaalinen pääoma, jota sinulla ei ehkä ole. Pelko on rationaalinen.',
            },
            {
                id: 'numb',
                label: 'Täydellinen voimattomuus — esimieskin on hiljaa',
                icon: '😶',
                description: 'Systeeminen voimattomuus on erityisen tunnistettava reaktio. Se ei tarkoita, etteivät pienet teot merkitsisi — mutta yksin isoa systeemiä vastaan on vaikea.',
            },
            {
                id: 'calm',
                label: 'Harkitsevainen — mietin mitä minun kannattaa tehdä',
                icon: '🤔',
                description: 'Strateginen harkinta on oikea reaktio tähän skenaarioon. Vaikuttavuus vaatii tässä suunnittelua, ei impulssia.',
            },
            {
                id: 'frozen',
                label: 'Jäätynyt täysin',
                icon: '🧊',
                description: 'Hyvin yleinen reaktio institutionaalisessa tilanteessa. Kun kukaan ei reagoi, jäätyminen voimistuu — "ehkä minä olen ainoa joka näkee tämän väärin."',
            },
        ],
        groundingExercise: {
            type: 'breathing',
            promptText: 'Tämä on vaikein tilanne — systeemi itsessään suojelee väärää käyttäytymistä. Hengitä ennen kuin päätät. Sisään 4s, ulos 6s. Kahdesti.',
            durationSeconds: 20,
            afterwardQuestion: 'Onko sinulla nyt ajatus, mitä voisit tehdä — tänään tai tällä viikolla?',
        },
        polyvagalNote: '🫀 Tähtisuorittajatilanteessa hermoston uhka-arvio on korkeimmillaan: tekijä, esimies ja ryhmä ovat kaikki "vastapuolella". Jäätyminen tai tunnehtuminen on täysin normaali reaktio — ei heikkous. Strateginen toiminta alkaa siitä, kun hermosto on rauhoittunut.',
    },

    intervention: {
        prompt: 'Valitse strategia. Suora puuttuminen tässä on korkein riski — mutta pienet teot ovat yhä merkityksellisiä.',
        noChoiceText: 'Voit vaieta. Mutta lue ensin mitä sitten tapahtuu.',
        interventions: [
            {
                type: 'distract',
                label: 'Häiritse',
                icon: '🔀',
                riskLevel: 2,
                riskLabel: 'Kohtalainen riski',
                tagline: 'Keskeytä tilanne — vie Sinillä tila hengähtää',
                whenBestUsed: 'Kun et halua haastaa Kristofferia suoraan — mutta haluat katkoa tilanne.',
                whenRiskHigh: 'Kristoffer voi kuitata häiriösi aggressiivisesti — hänellä on sosiaalinen pääoma.',
                examples: [
                    { text: '"Sini, voisitko lähettää sen linkin minulle myöhemmin? Halusin tutustua raporttiin."' },
                    { text: '"Tiima, onko meillä se Q3-aineisto jo kaikilla — halusin tarkistaa yhden kohdan."' },
                ],
                feedback: 'Katkaisi hetken. Sini sai tilan siirtyä pois kohteena olemisesta. Se ei muuta systeemiä — mutta se muuttaa tämän minuutin hänelle.',
                skillTag: 'distract-create-space',
                emotionChanges: { sini: 'neutral' },
            },
            {
                type: 'delegate',
                label: 'Delegoi',
                icon: '👋',
                riskLevel: 1,
                riskLabel: 'Matala riski',
                tagline: 'Vie asia esimiehen esimiehelle tai HR:lle',
                whenBestUsed: 'Kun oma esimies on osa ongelmaa — seuraava taso on ainoa vaihtoehto.',
                whenRiskHigh: 'Jos koko organisaatiokulttuuri suojelee Kristofferia — arvioi oma asemasi ennen.',
                examples: [
                    { text: '"Halusin nostaa esiin tiimin käyttäytymiskulttuurin. Äskeinen tilanne on osa toistuvaa kaavaa."' },
                    { text: '"Kirjoitin HR:lle: näin tilanteen joka jäi vaivaaman. Tallennatteko tämän, jotta saan kirjallisen vahvistuksen?"' },
                ],
                feedback: 'Delegointi esimiehen ohi on rohkein rakentellinen teko — ja usein ainoa keino murtaa institutionaalinen suoja.',
                skillTag: 'delegate-escalate',
            },
            {
                type: 'document',
                label: 'Dokumentoi',
                icon: '📋',
                riskLevel: 1,
                riskLabel: 'Turvallisin',
                tagline: 'Kirjaa tarkat sanat, läsnäolijat, esimiehen reaktio',
                whenBestUsed: 'Aina — erityisesti tässä skenaariossa. Institutionaalinen suoja on helpompi murtaa todisteilla.',
                whenRiskHigh: 'Ei riskiä.',
                examples: [
                    { text: '"25.2.2026, avotoimisto, 14.15. Kristoffer: \'kenen analyysit luetaan loppuun\'. Läsnä: Tiina (ei reagoinut), Risto (hymähteli). Sini: kyyneleet, lähti ennen kello kahta."' },
                ],
                feedback: 'Tarkat sanat + reaktioiden dokumentointi on institutionaalisen suojan paras vastavoima. Jos tilanne etenee HR:lle, sinulla on todisteet.',
                skillTag: 'document-institutional',
            },
            {
                type: 'delay',
                label: 'Tue myöhemmin',
                icon: '💙',
                riskLevel: 1,
                riskLabel: 'Matala riski',
                tagline: 'Tavoita Sini päivän aikana — yksin',
                whenBestUsed: 'Aina — kaikkein tärkeintä tässä skenaariossa, koska julkinen tuki on liian riskialtis.',
                whenRiskHigh: 'Jos Sini haluaa olla yksin — kunnioita sitä.',
                examples: [
                    { text: '"Hei Sini, näin mitä tapahtui. Se oli epäreilua. Oletko ok?"' },
                    { text: '"Luin raporttisi — se oli hyvin tehty. Mitä tapahtui äsken oli väärin."' },
                ],
                feedback: '"Näin mitä tapahtui" on tässä kaikkein tärkein lause. Sini on ehkä jo epäilemässä omaa todellisuuttaan — sinä vahvistit, että se oli todellista.',
                skillTag: 'delay-validate-private',
                emotionChanges: { sini: 'happy' },
            },
            {
                type: 'direct',
                label: 'Suora puuttuminen',
                icon: '🗣',
                riskLevel: 3,
                riskLabel: 'Hyvin korkea riski',
                tagline: 'Tämä on kaikkein riskialttisin — mutta mahdollinen',
                whenBestUsed: 'Jos sinulla on pitkä suhde Tiinaan tai organisaatiokulttuuri on turvallinen. Tai jos et pelkää seurauksista.',
                whenRiskHigh: 'Jos Kristofferilla on vahva asema ja organisaatiokulttuuri suojelee häntä — harkitse tarkkaan.',
                examples: [
                    { text: '"Kristoffer, en tunnista tuossa kommentissa Sinin työtä. Olen lukenut hänen analyysejaan — ne ovat laadukkaita."' },
                    { text: '"Tiina, haluaisin jutella tästä tilanteesta kahden kesken — löytyykö sinulle aikaa?"' },
                ],
                feedback: 'Suora puuttuminen tässä tilanteessa on harvinaisen rohkeaa. Se ei välttämättä muuta sitä, mitä tapahtuu — mutta se muuttaa Sinin kokemuksen: joku puuttui.',
                skillTag: 'direct-high-stakes',
                emotionChanges: { sini: 'happy', kristoffer: 'neutral', tiina: 'neutral' },
            },
        ],
    },

    wordPractice: {
        context: 'Kristoffer on sanonut kommenttinsa. Sini on hiljaa. Tiina ei ole reagoinut. Risto on hymähtänyt. Sinä olet paikalla.',
        phrasePrompt: 'Valitse yksi lause — tai kirjoita omasi. Tässä tilanteessa mikä tahansa lause on jo rohkeus.',
        readyMadePhrases: [
            {
                text: 'Sini, voisitko laittaa sen raportin linkin minulle — halusin tutustua siihen tarkemmin.',
                tone: 'gentle',
                dModel: 'distract',
                sceneReaction: {
                    perpetratorReaction: 'Kristoffer ei reagoi — jatkaa.',
                    victimReaction: 'Sini katsoo sinuun. Jotain helpottuu.',
                    bystanderReaction: 'Risto katsoo puhelintaan.',
                },
                analysis: '✓ Minimaalinen riski, maksimaalinen vaikutus Sinille. Loit hänelle konkreettisen tuen — ja katkait hetkeen.',
            },
            {
                text: 'En tunnista tuossa kommentissa Sinin työtä. Olen lukenut hänen analyysejaan.',
                tone: 'assertive',
                dModel: 'direct',
                sceneReaction: {
                    perpetratorReaction: 'Kristoffer: "No, pidä ne kommenttisi itsellesi." Tiina katsoo ylös.',
                    victimReaction: 'Sini: ei sano mitään. Mutta selkä suoristuu hieman.',
                    bystanderReaction: 'Risto on hiljaa.',
                },
                analysis: '✓ Erittäin rohkea. "En tunnista" on kritiikki ilman syytöstä. "Olen lukenut" on konkreettinen todiste. Tämä jää muistiin pitkäksi aikaa — kaikille.',
            },
            {
                text: 'Hei Sini, näin mitä tapahtui äsken. Se oli epäreilua. Haluatko jutella hetken?',
                tone: 'gentle',
                dModel: 'delay',
                sceneReaction: {
                    perpetratorReaction: '(Yksityinen — Kristoffer ei kuule)',
                    victimReaction: '"Kiitos. En uskonut kenenkään huomaavan." — Sini hengähtää.',
                },
                analysis: '✓ Tässä tilanteessa tämä saattaa olla tärkein lause. Gaslighting toimii eristyksen kautta — sinä rikoit eristyksen.',
            },
        ],
        editableTemplate: {
            template: '[Sini / Kristoffer / Tiina], [lyhyt havainto]. [Tuki tai haaste].',
            slots: [
                {
                    placeholder: '[Sini / Kristoffer / Tiina]',
                    suggestion: 'Sini',
                    hint: 'Kenelle puhut? Tukea Sinille vs. haaste Kristofferille vs. pyyntö Tiinalle.',
                },
                {
                    placeholder: '[lyhyt havainto]',
                    suggestion: 'olen lukenut raporttiasi ja se oli laadukas',
                    hint: 'Konkreettinen — ei yleinen kommentti',
                },
                {
                    placeholder: '[Tuki tai haaste]',
                    suggestion: 'halusin sen vain sanoa ääneen',
                    hint: 'Ei tarvitse olla iso eleä — pieni riittää',
                },
            ],
        },
        openTextLabel: 'Kirjoita oma lauseesi',
        openTextHint: 'Institutionaalisessa tilanteessa lyhyt lause on jo teko. "Näin mitä tapahtui" on voimakkaampi kuin mikään pitkä puhe.',
        savedPhraseLabel: 'Tallenna tämä turvalauseeksesi',
    },

    safetyPlan: {
        intro: 'Sini on sairaslomalla. Kristoffer sai tiimipalkinnon. Sinä olet edelleen tiimissä...',
        costScenario: {
            description: 'Jos olisit puuttunut — mitä pelkäisit tapahtuvan?',
            options: [
                { id: 'kristoffer-target', label: 'Kristoffer kohdistaa seuraavaksi minuun', isCost: true },
                { id: 'career-risk', label: 'Urani kärsii — Kristoffer on tärkeä henkilö', isCost: true },
                { id: 'sini-less-alone', label: 'Sini ei olisi yksin — "joku näki"', isCost: false },
                { id: 'norm-named', label: 'Tiimi näki, että normi haastettiin', isCost: false },
                { id: 'tiina-might-act', label: 'Tiina sai signaalin, että asia pitää käsitellä', isCost: false },
            ],
            note: 'Tässä skenaariossa riski on todellinen — institutionaalinen suoja on rakennettu juuri sitä varten, ettei kukaan puutu. Mutta hiljaisuuden hinta on myös todellinen — Sinille.',
        },
        protectionActions: [
            {
                id: 'document-everything',
                label: 'Aloitan dokumentoinnin välittömästi — tarkat sitaatit ja reaktiot',
                category: 'systemic',
                description: 'Institutionaalisen suojan murtaa parhaiten kirjallinen todiste toistuvuudesta.',
            },
            {
                id: 'reach-sini',
                label: 'Tavoitan Sinin ja vahvistan: "näin mitä tapahtui"',
                category: 'victim',
                description: 'Sairasloma on merkki siitä, että tilanne on kriittinen. Yhteydenotto on nyt tärkeintä.',
            },
            {
                id: 'escalate',
                label: 'Harkitsen delegointia Tiinan esimiehelle tai HR:lle',
                category: 'systemic',
                description: 'Tiinan hiljaisuus on systemaattinen ongelma. Se ei ratkea yksittäisellä puuttumisella — se vaatii rakenteellisen puuttumisen.',
            },
            {
                id: 'self-care',
                label: 'Haen itselleni tukea — todistajuus on myös rasittavaa',
                category: 'self',
                description: 'Institutionaalinen epäoikeudenmukaisuus on erityisen kuormittavaa todistajalle. Oma hyvinvointi on myös asia.',
            },
            {
                id: 'assess-org',
                label: 'Arvioin omaa tilannettani organisaatiossa realistisesti',
                category: 'self',
                description: 'Joskus turvallisin teko on hakeutua muualle. Se ei ole antautuminen — se on eloonjääminen.',
            },
        ],
        upstanderNote: '📊 Tässä skenaariossa ei ole "oikeaa" vastausta. Institutionaalinen suoja on suunniteltu estämään puuttuminen. Esimiehen hiljaisuus + tähtisuorittajan asema = yhtälö, jossa yksittäinen teko harvoin muuttaa paljon. Mutta silti: "Sini, näin mitä tapahtui" — se on jo teko, joka muuttaa jotain.',
    },
};
