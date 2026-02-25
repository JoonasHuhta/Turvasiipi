import type { BystanderScenario } from '../bystander-types';

/**
 * Scenario 2: "Tiimin suosikki"
 * Context: Charismatic team peer systematically excludes one colleague from informal social spaces.
 * No loud incidents — just persistent invisibility. Hardest to name.
 * Difficulty: ⭐⭐⭐ (no clear perpetrator signal, social pressure, peer-to-peer)
 */
export const bystanderScenario2Social: BystanderScenario = {
    id: 'bystander-s2-social',
    title: 'Tiimin suosikki',
    context: 'Olet tiimissä. Karismaattinen kollega on kaikkien suosiossa — paitsi yhden. Sitä ei sanota ääneen.',
    powerDynamic: 'Vertainen → vertainen (sosiaalinen pääoma)',
    difficulty: 3,
    difficultyLabel: 'Haastava',
    durationMinutes: 10,
    learningGoal: 'Tunnista epäsuora sosiaalinen sulkeminen ilman selkeää tapahtumaa, harjoittele pieniä inklusioita (Distract & Delay)',

    characters: [
        { id: 'player', name: 'Sinä', role: 'Tiimiläinen', color: '#3b82f6' },
        { id: 'roope', name: 'Roope', role: 'Karismaattinen tiimiläinen', color: '#f59e0b' },
        { id: 'kaisa', name: 'Kaisa', role: 'Kollega (kohde)', color: '#ec4899' },
        { id: 'testi', name: 'Testi', role: 'Kollega', color: '#64748b' },
        { id: 'ville', name: 'Ville', role: 'Kollega', color: '#94a3b8' },
    ],

    scene: {
        id: 'break-room-social',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        perpetratorId: 'roope',
        victimId: 'kaisa',
        bystanderIds: ['testi', 'ville'],
        bystanderReactions: [
            {
                characterId: 'testi',
                behavior: 'laughs_awkwardly',
                label: 'Testi nauraa Roopen jutuille innokkaasti',
            },
            {
                characterId: 'ville',
                behavior: 'avoids_eye_contact',
                label: 'Ville ei huomaa mitään outoa',
            },
        ],
        dialogue: [
            {
                characterId: 'roope',
                text: 'Hei kuulit te, että meillä on perjantaina tiimitreffit? Varataan pöytä siihen Hesaan. Ville, Testi — ootte mukana?',
                style: 'normal',
            },
            {
                characterId: 'testi',
                text: 'Joo, ehdottomasti! Otetaan sama paikka kuin viime kuussa.',
                style: 'normal',
            },
            {
                characterId: 'kaisa',
                text: '(Kaisa katsoo odottavasti — ei kutsua tule)',
                style: 'thought',
            },
            {
                characterId: 'roope',
                text: 'Siisti. *(kääntyy takaisin Villelle)* Muuten kello kuusi vai seiska?',
                style: 'normal',
            },
            {
                characterId: 'player',
                text: '(Kaisa pyörittää kahvikuppiaan. Kukaan ei katso häntä. Roope ei koskaan nimenomaan kieltänyt — hän vain ei kutsunut.)',
                style: 'thought',
            },
        ],
        timeWindowSeconds: 10,
        silenceOutcome: {
            text: 'Tiimitreffit järjestetään. Kaisa kuulee niistä maanantaina Slackissa, valokuvista. Hän ei sano mitään.',
            learningPoint: '📊 Sosiaalinen sulkeminen on vaikein tunnistaa, koska "mitään ei tapahtunut". Mutta Kaisalle tapahtui jotain — hän tuli näkymättömäksi.',
        },
    },

    recognition: {
        question: 'Mikä tässä tilanteessa oli ongelma?',
        options: [
            {
                id: 'exclusion-invisible',
                label: 'Kaisa suljettiin ulos kutsusta — hiljaisesti, tarkoituksellisesti',
                isCorrect: true,
                explanation: 'Oikein. Sulkeminen ilman sanoja on erityisen vahingollista, koska kohde ei pysty reagoimaan — eikä kukaan muu näe selkeää rajaa.',
            },
            {
                id: 'nothing-happened',
                label: 'Mitään väärää ei tapahtunut — kukaan ei loukannut Kaisaa',
                isCorrect: false,
                explanation: 'Sulkeminen ei tarvitse sanoja. Toistuvat poisjättämiset epävirallisista tapahtumista rakentavat eristyneisyyttä yhtä tehokkaasti kuin suorat loukkaukset.',
            },
            {
                id: 'kaisas-fault',
                label: 'Kaisa voisi itse pyytää mukaan — hän ei ole yrittänyt',
                isCorrect: false,
                explanation: 'Kohteen vastuu ei poista sulkijan vastuuta. Roopen olisi pitänyt kutsua — tai sinä voisit kutsua.',
            },
            {
                id: 'just-friends',
                label: 'Roopella on omat kaverinsa — hän ei ole velvollinen kutsumaan kaikkia',
                isCorrect: false,
                explanation: 'Yksityisessä elämässä kyllä — mutta tiimikontekstissa toistuvat poissulkemiset luovat eriarvoisuutta ja vaikuttavat Kaisan asemaan työssä.',
            },
        ],
        certaintyQuestion: 'Kuinka selkeältä tämä tilanne tuntuu sinulle?',
        feedback: {
            correct: '✓ Tunnistit hiljaisuuden sulkemisena. Tämä on vaikein vivahteiden taso.',
            partial: 'Hyvä intuitio. Tässä on tahallinen epäselvyys — Roope ei koskaan "tee mitään väärää".',
            normalize: 'Täysin normaalia, ettei tässä näe selkeää rajaa. Sosiaalinen sulkeminen on suunniteltu häivyttämään juurikin se raja.',
        },
        educationalNote: '🧠 "Sosiaalinen ostrakismi" — tutkimukset osoittavat, että hiljainen sulkeminen aktivoi aivoissa saman alueen kuin fyysinen kipu. Kaisa ei kuvittele.',
    },

    arousal: {
        question: 'Miltä sisälläsi tuntuu, kun näet tilanteen?',
        options: [
            {
                id: 'numb',
                label: 'Epämukava — mutta en ole varma onko minun asiani',
                icon: '😟',
                description: 'Epävarmuus on normaalia. Vertaisvalta on vaikeampaa nimetä kuin hierarkkinen valta.',
            },
            {
                id: 'heart_racing',
                label: 'Vihainen — tämä on epäreilua',
                icon: '😤',
                description: 'Viha oikeudenmukaisuusloukkauksesta on terve signaali. Haaste: miten kanavoida se rakentavasti?',
            },
            {
                id: 'frozen',
                label: 'Voimaton — Roope on suosittu, mitä minä voin tehdä',
                icon: '😔',
                description: 'Voimattomuus on hyvin yleinen reaktio. Mutta jopa pienet teot — yksi kutsu, yksi huomiointi — muuttavat dynamiikkaa.',
            },
            {
                id: 'tense',
                label: 'En ole varma onko tässä oikeasti mitään',
                icon: '🤔',
                description: 'Ammattilaisetkin ovat epävarmoja. Sosiaalinen sulkeminen on suunniteltu juuri tähän: se jättää todistajan epävarmuuteen.',
            },
            {
                id: 'calm',
                label: 'En koe tätä merkittävänä',
                icon: '😐',
                description: 'Huomion puuttuminen on osa sosiaalisen sulkemisen mekanismia. Toistuvuus tekee siitä vahingollista — ei yksittäinen hetki.',
            },
        ],
        groundingExercise: {
            type: 'breathing',
            promptText: 'Tilanteessa on sosiaalista painetta — Roope on suosittu. Hengitä hetki ennen toimintaa. Sisään 4s, ulos 6s.',
            durationSeconds: 15,
            afterwardQuestion: 'Onko sinulla enemmän tilaa miettiä, mitä voisit tehdä Kaisan hyväksi?',
        },
        polyvagalNote: '🫀 Sosiaalinen paine on hermoston stressori yhtä lailla kuin fyysinen uhka. Epävarmuus + ryhmäpaine = sen vaikea reagoida. Harjoittelemalla reaktiopynnystulee matalammaksi.',
    },

    intervention: {
        prompt: 'Valitse tapa toimia. Ei täydellinen — vaan se, mihin sinulla on juuri nyt rohkeutta.',
        noChoiceText: 'Voit myös olla reagoimatta. Seurauksilla on väliä — mutta hiljaisuudellakin.',
        interventions: [
            {
                type: 'distract',
                label: 'Häiritse',
                icon: '🔀',
                riskLevel: 1,
                riskLabel: 'Matala riski',
                tagline: 'Luo tilaisuus Kaisalle luontevasti',
                whenBestUsed: 'Kun et halua haastaa Roopea — mutta haluat tehdä jotain välittömästi.',
                whenRiskHigh: 'Harvoin — Roope voi kuitata kommenttisi ilman seurauksia.',
                examples: [
                    { text: '"Kaisa, tuletko sinäkin perjantaiksi? Minulla on se sama ilta vapaana."' },
                    { text: '"Hei, mulla on ideapuhelu Kaisan kanssa ennen perjantaita — voisimmeko yhdistää sen tiimitreffien kanssa?"' },
                ],
                feedback: 'Hyvin tehty. Loitkin kutsun jota Roope ei antanut. Kaisa sai paikan — ilman konfliktia.',
                skillTag: 'distract-include',
                emotionChanges: { kaisa: 'happy' },
            },
            {
                type: 'delegate',
                label: 'Delegoi',
                icon: '👋',
                riskLevel: 1,
                riskLabel: 'Matala riski',
                tagline: 'Kerro havaintosi esimiehelle tai HR:lle',
                whenBestUsed: 'Kun tämä on toistuva kaava, ei satunnainen unohdus.',
                whenRiskHigh: 'Jos esimies on Roopen kaveri — harkitse muita tahoja.',
                examples: [
                    { text: '"Olen huomannut, että Kaisa jää usein ulkopuolelle tiimin sosiaalisista tapahtumista. Halusin nostaa sen esiin."' },
                ],
                feedback: 'Delegointi nostaa rakenteellisen ongelman näkyväksi. Yksi ihminen ei pysty muuttamaan tiimikulttuuria yksin.',
                skillTag: 'delegate-report',
            },
            {
                type: 'document',
                label: 'Dokumentoi',
                icon: '📋',
                riskLevel: 1,
                riskLabel: 'Turvallisin',
                tagline: 'Kirjaa ylös havaitsemasi toistuvuus',
                whenBestUsed: 'Aina. Erityisesti kun sulkeminen on toistuvaa — dokumentointi muuttaa "mielipiteet" tosiasioiksi.',
                whenRiskHigh: 'Ei käytännössä riskiä.',
                examples: [
                    { text: '"25.2.2026, kahvitauko. Roope kutsui Testiä ja Villeä perjantain tiimitreffeihin — Kaisaa ei mainittu. Kolmas vastaava tilanne tässä kuussa."' },
                ],
                feedback: 'Toistuvuuden dokumentointi on poikkeuksellisen tärkeää silloin, kun jokainen yksittäinen tilanne vaikuttaa pieneltä.',
                skillTag: 'document',
            },
            {
                type: 'delay',
                label: 'Tue myöhemmin',
                icon: '💙',
                riskLevel: 1,
                riskLabel: 'Matala riski',
                tagline: 'Ota Kaisa huomioon kahden kesken',
                whenBestUsed: 'Kun tilanne on jo mennyt ohi — mutta sen vaikutus on vielä Kaisassa.',
                whenRiskHigh: 'Jos Kaisa ei halua puhua siitä.',
                examples: [
                    { text: '"Hei Kaisa, huomasin äsken tilanteen kahvitauolla. Miten sun viikko menee muutenkin?"' },
                    { text: '"Onko sinulla ajatuksia tiimin dynamiikasta? Minäkin olen miettinyt."' },
                ],
                feedback: '"Joku huomasi" — nämä kaksi sanaa voivat olla koko päivän tärkein asia suljetulle ihmiselle.',
                skillTag: 'delay-support',
                emotionChanges: { kaisa: 'happy' },
            },
            {
                type: 'direct',
                label: 'Suora puuttuminen',
                icon: '🗣',
                riskLevel: 2,
                riskLabel: 'Kohtalainen riski',
                tagline: 'Ota Roope puheeksi kahden kesken',
                whenBestUsed: 'Kun sinulla on suhde Roopeeseen ja tilanne on toistuva. Parempi yksityisesti kuin julkisesti.',
                whenRiskHigh: 'Jos Roope on defensiivinen tai ryhmäpaine kääntyy sinua vastaan.',
                examples: [
                    { text: '"Roope, huomasin kahvitauolla, että Kaisa ei ollut mukana tiimitreffien suunnittelussa. Olisiko hyvä idea kutsua myös hän?"' },
                    { text: '"Olen huomannut, että Kaisa jää usein ulkopuolelle porukan jutuista. Onko se tarkoituksellista?"' },
                ],
                feedback: 'Suora kahden kesken on tehokas — se antaa Roopeelle mahdollisuuden korjata ilman kasvojen menetystä. Mutta se vaatii selkärankaa.',
                skillTag: 'direct-private',
                emotionChanges: { kaisa: 'neutral', roope: 'neutral' },
            },
        ],
    },

    wordPractice: {
        context: 'Olet juuri nähnyt Kaisan sivuuttamisen. Roope ja muut juttelevat perjantain treffejä. Kaisa seisoo sivussa.',
        phrasePrompt: 'Valitse lause, jota voisit sanoa. Ei täydellinen — vain käyttökelpoinen.',
        readyMadePhrases: [
            {
                text: 'Kaisa, oletko sinäkin perjantaina vapaa? Me mietittiin yhteistä iltaa.',
                tone: 'gentle',
                dModel: 'distract',
                sceneReaction: {
                    perpetratorReaction: 'Roope ei reagoi — tai lisää "joo, totta kai".',
                    victimReaction: 'Kaisan kasvot kirkastuvat. "Joo, olen vapaa."',
                    bystanderReaction: 'Testi nyökkää — hyvä idea.',
                },
                analysis: '✓ Yksinkertainen ja tehokas. Loitit inkluusion ääneen. Roope ei voi kohtuudella kieltäytyä — ja Kaisa on nyt mukana.',
            },
            {
                text: 'Roope, kutsutaanko Kaisa myös mukaan? Meillä on kaikki tiimi tässä.',
                tone: 'assertive',
                dModel: 'direct',
                sceneReaction: {
                    perpetratorReaction: 'Roope: "Joo, totta kai — Kaisa, tuletko?" (ehkä tarkoittaa, ehkä ei).',
                    victimReaction: 'Kaisa katsoo sinua — jotain muuttuu.',
                    bystanderReaction: 'Testi hiljaa. Ville: "Joo, hyvä idea."',
                },
                analysis: '✓ Suora ja kohtelias. Ei syytä, mutta nimeää tilanteen julkisesti. Roopen on reagoitava.',
            },
            {
                text: 'Hei Kaisa, minulla on sinulle juttua — onko sinulla hetki myöhemmin?',
                tone: 'gentle',
                dModel: 'delay',
                sceneReaction: {
                    perpetratorReaction: '(Sanot tämän myöhemmin kahden kesken)',
                    victimReaction: '"Joo, totta kai. Kaikki ok?" — Kaisa huomaa, että et ignoorannut.',
                },
                analysis: '✓ Loit yhteyden. Myöhemmässä puhelussa voit nimetä sen mitä näit ja kysyä miten Kaisa voi.',
            },
        ],
        editableTemplate: {
            template: '[Kaisan nimi], [kutsu/huomiointi]. [Luonteva jatko].',
            slots: [
                {
                    placeholder: '[Kaisan nimi]',
                    suggestion: 'Kaisa',
                    hint: 'Nimen käyttö on jo inklusio — se tekee hänestä näkyvän',
                },
                {
                    placeholder: '[kutsu/huomiointi]',
                    suggestion: 'oletko sinäkin mukana perjantaina',
                    hint: 'Kutsuminen on konkreettisin inklusio',
                },
                {
                    placeholder: '[Luonteva jatko]',
                    suggestion: 'me mietittiin yhteistä asiaa',
                    hint: 'Ei korosteta poissulkemista — vain korjataan se',
                },
            ],
        },
        openTextLabel: 'Kirjoita oma lauseesi',
        openTextHint: 'Täydellisyys ei ole tavoite. Tavoite on jotain, mitä sanoisit oikeasti.',
        savedPhraseLabel: 'Tallenna tämä turvalauseeksesi',
    },

    safetyPlan: {
        intro: 'Olet puuttunut — tai ehkä päättänyt vain tarkkailla ensin. Viikon kuluttua...',
        costScenario: {
            description: 'Mitä pelkäisit tapahtuvan seuraavan viikon aikana?',
            options: [
                { id: 'roope-cold', label: 'Roope on viileämpi minulle — olen menettänyt suosiota', isCost: true },
                { id: 'labeled', label: 'Muut pitävät minua "liian herkälle ottavana"', isCost: true },
                { id: 'kaisa-safe', label: 'Kaisa tuntee olevansa vähemmän yksin', isCost: false },
                { id: 'nothing', label: 'Tilanne jatkuu kuten ennenkin', isCost: false },
                { id: 'dynamic-shifts', label: 'Tiimin dynamiikka alkaa hiljalleen muuttua', isCost: false },
            ],
            note: 'Sosiaalinen riski on todellinen — mutta hiljaa olemisen hinta Kaisalle on myös todellinen. Sinä päätät kumpi painaa enemmän.',
        },
        protectionActions: [
            {
                id: 'repeat-include',
                label: 'Teen inkluusiosta tavan, en kertaluonteisen teon',
                category: 'self',
                description: 'Yksi kutsu muuttaa hetken. Toistuva kutsu muuttaa kulttuurin.',
            },
            {
                id: 'document-pattern',
                label: 'Dokumentoin tapausten toistuvuuden',
                category: 'systemic',
                description: 'Jos tilanne jatkuu, dokumentointi antaa minulle pohjan esimies- tai HR-keskustelulle.',
            },
            {
                id: 'tell-manager',
                label: 'Kerron tilanteesta esimiehelle neutraalisti',
                category: 'systemic',
                description: '"Olen huomannut, että tiimikulttuuri saattaa sulkea joitain ulos. Onko tähän kiinnitetty huomiota?"',
            },
            {
                id: 'check-kaisa',
                label: 'Kysyn Kaisalta miten hän voi viikon kuluttua',
                category: 'victim',
                description: '"Olit mielessäni — miten sulla menee?" — yksinkertainen ja voimakas.',
            },
        ],
        upstanderNote: '📊 Vertaistason sulkeminen on vaikein puuttua, koska se on kokonaan sosiaalisesta pääomasta riippuvainen. Se, että huomasit ja harkitsit toimintaa, on jo osa ratkaisua.',
    },
};
