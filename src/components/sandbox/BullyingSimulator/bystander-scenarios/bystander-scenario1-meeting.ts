import type { BystanderScenario } from '../bystander-types';

/**
 * Scenario 1: "Palaverin piikki"
 * Context: Weekly team meeting, manager repeatedly belittles one employee.
 * Bystander observes from the side — others are silent or laugh awkwardly.
 * Difficulty: ⭐⭐ (clear power dynamic, still plausibly ambiguous)
 */
export const bystanderScenario1Meeting: BystanderScenario = {
    id: 'bystander-s1-meeting',
    title: 'Palaverin piikki',
    context: 'Olet tiimiläinen viikkopalaverissa. Et ole itse kohteena — sinä olet todistaja.',
    powerDynamic: 'Esimies → alainen',
    difficulty: 2,
    difficultyLabel: 'Kohtalainen',
    durationMinutes: 12,
    learningGoal: 'Tunnista julkinen vähättely, harjoittele häiritsevää puuttumista (Distract)',

    characters: [
        { id: 'player', name: 'Sinä', role: 'Tiimiläinen', color: '#3b82f6' },
        { id: 'manager', name: 'Pekka', role: 'Tiimiesimies', color: '#ef4444' },
        { id: 'meri', name: 'Meri', role: 'Kollega (kohde)', color: '#ec4899' },
        { id: 'jarkko', name: 'Jarkko', role: 'Kollega', color: '#64748b' },
        { id: 'saara', name: 'Saara', role: 'Kollega', color: '#94a3b8' },
    ],

    scene: {
        id: 'meeting-room',
        background: 'linear-gradient(135deg, #fef9f0 0%, #fef3c7 100%)',
        perpetratorId: 'manager',
        victimId: 'meri',
        bystanderIds: ['jarkko', 'saara'],
        bystanderReactions: [
            {
                characterId: 'jarkko',
                behavior: 'laughs_awkwardly',
                label: 'Jarkko hymähtää epämukavasti',
            },
            {
                characterId: 'saara',
                behavior: 'looks_at_phone',
                label: 'Saara katsoo puhelintaan',
            },
        ],
        dialogue: [
            {
                characterId: 'manager',
                text: 'Hyvää huomenta. Käydään läpi viikon tilanne. Meri, onkin hyvä että olet paikalla — kerrotko miksi raportti oli taas myöhässä?',
                style: 'normal',
            },
            {
                characterId: 'meri',
                text: 'Anteeksi, järjestelmässä oli tekninen ongelma ja—',
                style: 'normal',
            },
            {
                characterId: 'manager',
                text: 'Aina jokin tekosyy. Se on jo sun brändi, Meri — "tekninen ongelma". Ehkä ongelma on muualla.',
                style: 'aggressive',
            },
            {
                characterId: 'player',
                text: '(Tunnun oudolta. Meri näyttää nololta. Muut eivät reagoi...)',
                style: 'thought',
            },
        ],
        timeWindowSeconds: 10,
        silenceOutcome: {
            text: 'Palaveri jatkuu. Meri ei sano enää mitään loppupalaverissa. Näet hänen kasvojensa sulkeutuvan.',
            learningPoint: '📊 Tutkimus: 85% todistajista vaikenii samankaltaisessa tilanteessa. Se, että edes huomasit epäreiluuden, on jo ensimmäinen askel.',
        },
    },

    recognition: {
        question: 'Mikä tässä tilanteessa tuntui väärältä?',
        options: [
            {
                id: 'public-humiliation',
                label: 'Julkinen nöyryyttäminen — kritiikki koko tiimin edessä',
                isCorrect: true,
                explanation: 'Oikein. Palaute tulee aina antaa yksityisesti. Julkinen kritiikki on epäasiallista, erityisesti kun se on epämääräistä ja henkilökohtaista.',
            },
            {
                id: 'normal-correction',
                label: 'Tavallinen korjaus — esimies vain hoiti tehtävänsä',
                isCorrect: false,
                explanation: 'Kritiikissä on toki oikeutus, mutta "se on su brändi" -kommentti ylittää asiallisen palautteen rajan. Se on henkilön leimaamista.',
            },
            {
                id: 'bad-day',
                label: 'Esimiehellä vain on huono päivä',
                isCorrect: false,
                explanation: 'Mahdollista — mutta emme voi tietää sitä. Käyttäytyminen oli vahingollista riippumatta syystä. Tunnistaminen ei vaadi varmuutta.',
            },
            {
                id: 'personality-conflict',
                label: 'Heidän välinen henkilökohtainen konflikti, ei minun asiani',
                isCorrect: false,
                explanation: 'Julkinen tilanne tekee siitä kaikkien asia. Sivullisen roolin ydin on juuri tässä: voit vaikuttaa tilanteeseen, vaikka et ole osapuoli.',
            },
        ],
        certaintyQuestion: 'Kuinka varma olet, että tässä on kyse epäasiallisesta kohtelusta?',
        feedback: {
            correct: '✓ Tunnistit oikein. Julkinen ja henkilöön kohdistuva kritiikki on epäasiallista.',
            partial: 'Hyvä huomio. Tilanne on tahallisesti epäselvä — "vitsin" ja loukkauksen raja on häilyvä taktisesti.',
            normalize: 'On täysin ok, ettet ole 100% varma. Riittää, että tunnet sisäisen hälytyksesi. Epäselvyys on osa kiusaamisen toimintalogiikkaa.',
        },
        educationalNote: '🧠 Tämä on "vähättelevä julkinen vertailu" — kiusaajan taktiikka, joka toimii juuri epäselvyytensä vuoksi. Kohde ei pysty puolustautumatta näyttämästä yliherkältä.',
    },

    arousal: {
        question: 'Jos olisit tuossa palaverissa, miltä sinusta tuntuisi fyysisesti?',
        options: [
            {
                id: 'heart_racing',
                label: 'Sydän hakkaa',
                icon: '💓',
                description: 'Adrenaliini aktivoituu — kehosi valmistautuu toimintaan. Normaali reaktio uhkaavaan tilanteeseen.',
            },
            {
                id: 'tense',
                label: 'Jännittynyt, haluaisin sanoa jotain',
                icon: '😬',
                description: 'Olet lähellä sietoikkunaa — energiaa on, mutta pystyt silti ajattelemaan. Hyvä lähtöpaikka.',
            },
            {
                id: 'frozen',
                label: 'Jäätynyt, en pysty reagoimaan',
                icon: '🧊',
                description: 'Jäätyminen on poikkeuksellinen taistele-tai-pakene-reaktio. Hyvin yleinen sivustakatsojilla.',
            },
            {
                id: 'numb',
                label: 'Turta — vain toivon, että se menee ohi',
                icon: '😶',
                description: 'Alivireys suojelee, kun tilanne tuntuu ylivoimaiselta. Myös tämä on normaali reaktio.',
            },
            {
                id: 'calm',
                label: 'Rauhallinen, pystyisin reagoimaan',
                icon: '✨',
                description: 'Hienoa — olet sietoikkunassa. Saatat kuitenkin aliarvioida sosiaalisen riskin tunteen.',
            },
        ],
        groundingExercise: {
            type: 'breathing',
            promptText: 'Ennen kuin valitset miten puutut, hengitä hetki: sisään 4 sekuntia, ulos 6 sekuntia.',
            durationSeconds: 15,
            afterwardQuestion: 'Tuntuuko nyt hieman helpommalta miettiä, mitä voisit tehdä?',
        },
        polyvagalNote: '🫀 Polyvagaali-teoria: yli- tai alivireys on hermoston normaali suojareaktio, ei heikkous. Puuttuminen onnistuu parhaiten lähellä sietoikkunaa — ja harjoittelemalla siihen pääsee.',
    },

    intervention: {
        prompt: 'Valitse yksi tapa puuttua. Ei paras — vaan se, mitä oikeasti uskaltaisit tehdä juuri nyt.',
        noChoiceText: 'Voit myös jättää valitsematta. Näet mitä sitten tapahtuu.',
        interventions: [
            {
                type: 'distract',
                label: 'Häiritse',
                icon: '🔀',
                riskLevel: 1,
                riskLabel: 'Matala riski',
                tagline: 'Keskeytä tilanne epäsuorasti',
                whenBestUsed: 'Kun kiusaaja on esimies tai suosittu — suora konfrontaatio olisi liian riskialtis.',
                whenRiskHigh: 'Jos esimies tarttuu häiriöön aggressiivisesti tai kääntyy sinuun.',
                examples: [
                    { text: 'Anteeksi, keskeytän — Meri, voitko auttaa minua yhdessä asiassa palaverin jälkeen?' },
                    { text: 'Muuten — onko tämä raporttipohja sama kuin viime kerralla? Merin versio näytti erilaiselta.' },
                ],
                feedback: 'Hyvin tehty. Siirrait huomion Meriltä. Hän sai hetken hengähtää, ja piikki jäi ilmaan ilman lisäoikeuttamista.',
                skillTag: 'distract-interrupt',
                emotionChanges: { meri: 'neutral', manager: 'neutral' },
            },
            {
                type: 'delegate',
                label: 'Delegoi',
                icon: '👋',
                riskLevel: 1,
                riskLabel: 'Matala riski',
                tagline: 'Vie asia turvallisemmalle taholle',
                whenBestUsed: 'Kun et pysty tai halua puuttua suoraan — mutta haluat silti tehdä jotain.',
                whenRiskHigh: 'Jos organisaatiokultuuri on myrkyllinen ja HR:ä ei voi luottaa.',
                examples: [
                    { text: 'Menen palaverin jälkeen HR:n luokse: "Huomasin jotain, joka jäi vaivaaman."' },
                    { text: 'Kerron asiasta Pekan omalle esimiehelle: "Haluan nostaa esiin tilanteen, jonka näin."' },
                ],
                feedback: 'Delegointi on erittäin pätevä strategia. Se vie asian ihmiselle, jolla on valtaa puuttua rakenteellisesti.',
                skillTag: 'delegate-report',
            },
            {
                type: 'document',
                label: 'Dokumentoi',
                icon: '📋',
                riskLevel: 1,
                riskLabel: 'Turvallisin',
                tagline: 'Kirjaa ylös mitä näit',
                whenBestUsed: 'Aina. Dokumentointi on turvaverkkosi ja Merin tukesi — todiste siitä, että tilanne on toistuva.',
                whenRiskHigh: 'Ei käytännössä. Dokumentointi on aina turvallista.',
                examples: [
                    { text: 'Kirjaan puhelimelle: "24.2.2026, viikkopalaveri, Pekka: \'se on su brändi, Meri\'. Läsnä: Jarkko, Saara."' },
                ],
                feedback: 'Dokumentointi on gaslightingin vastavoima. Jos tilanne eskaloituu, sinulla on todiste.',
                skillTag: 'document',
            },
            {
                type: 'delay',
                label: 'Tue myöhemmin',
                icon: '💙',
                riskLevel: 1,
                riskLabel: 'Matala riski',
                tagline: 'Tavoita uhri palaverin jälkeen',
                whenBestUsed: 'Kun tilanne on jo ohi — mutta tuki on silti tärkeää. Viivästetty tuki voi olla arvokkaampaa kuin yllätetty häiriö.',
                whenRiskHigh: 'Jos Meri haluaa unohtaa tilanteen eikä kaipaa muistutusta.',
                examples: [
                    { text: 'Käytävällä: "Hei Meri, miten voit äskeisen jälkeen? Tuli aika kovalta."' },
                    { text: '"Haluatko, että mennään yhdessä juttelemaan tästä jollekin?"' },
                ],
                feedback: '"Näin mitä tapahtui" — nämä kolme sanaa voivat olla uhrille tärkein lause koko päivässä.',
                skillTag: 'delay-support',
                emotionChanges: { meri: 'happy' },
            },
            {
                type: 'direct',
                label: 'Suora puuttuminen',
                icon: '🗣',
                riskLevel: 3,
                riskLabel: 'Korkea riski',
                tagline: 'Puutu heti, suoraan',
                whenBestUsed: 'Kun sinulla on asemaa, pitkä suhde esimieheen tai tilanteessa on muita tukijoita.',
                whenRiskHigh: 'Jos esimies on epävakainen, organisaatio ei tue puuttujaa, tai sinulla on lyhyt sopimus.',
                examples: [
                    { text: '"Pekka, mun mielestä tuo tapa puhua Merille ei ole ok. Voidaanko pysyä asiallisissa?"' },
                    { text: '"Hetkinen — tuo \'brändi\'-kommentti tuntui kovalta. Voiko kritiikki käydä erikseen?"' },
                ],
                feedback: 'Suora puuttuminen on rohkein vaihtoehto. Se vaatii eniten, mutta sen vaikutus on välitön. Muut näkevät, että normia haastetaan.',
                skillTag: 'direct-confrontation',
                emotionChanges: { manager: 'neutral', meri: 'happy', jarkko: 'happy' },
            },
        ],
    },

    wordPractice: {
        context: 'Olet palaverissa. Pekka on juuri sanonut: "Se on jo su brändi, Meri." Jarkko hymähtää. Saara katsoo puhelintaan.',
        phrasePrompt: 'Valitse tai muokkaa lause jota käyttäisit. Ei täydellinen — vain käyttökelpoinen.',
        readyMadePhrases: [
            {
                text: 'Anteeksi, keskeytän hetken — Meri, voisitko näyttää minulle sen raporttipohjan myöhemmin?',
                tone: 'gentle',
                dModel: 'distract',
                sceneReaction: {
                    perpetratorReaction: 'Pekka pysähtyy ja siirtyy seuraavaan aiheeseen.',
                    victimReaction: 'Meri nyökkää sinulle kiitollisin silmin.',
                    bystanderReaction: 'Jarkko näyttää helpottuneelta.',
                },
                analysis: '✓ Lempeä ja ei-konfrontatiivinen. Siirtää huomion kutsumatta Pekan toimintaa nimeltä. Erittäin turvallinen.',
            },
            {
                text: 'Mun mielestä tuo kommentti oli aika kova. Voidaanko pitäytyä asiallisissa?',
                tone: 'assertive',
                dModel: 'direct',
                sceneReaction: {
                    perpetratorReaction: 'Pekka jähmettyy hetkeksi. "No, vain huumoria." Siirtyy jatkoon.',
                    victimReaction: 'Meri nostaa katseensa. Hänen hartioistaan lähtee jännitys.',
                    bystanderReaction: 'Saara sulkee puhelimen.',
                },
                analysis: '✓ "Mun mielestä" -aloitus: vastuu on sinulla, et diagnosoi toista. Selkeä rajanveto ilman huutamista.',
            },
            {
                text: 'Hei Meri, äskeinen tuntui kovalta. Miten voit?',
                tone: 'gentle',
                dModel: 'delay',
                sceneReaction: {
                    perpetratorReaction: '(Sanot tämän käytävällä palaverin jälkeen)',
                    victimReaction: 'Meri hengähtää. "Kiitos. En tiennyt osasiko kukaan huomata."',
                },
                analysis: '✓ Jälkikäteinen tuki. "En tiennyt osasiko kukaan huomata" — se kertoo, miten eristävää hiljaisuus on.',
            },
        ],
        editableTemplate: {
            template: '[Aloitus], [havainto/tunne]. [Pyyntö tai kysymys].',
            slots: [
                {
                    placeholder: '[Aloitus]',
                    suggestion: 'Anteeksi, keskeytän',
                    hint: 'Lempeä aloitus vähentää puolustautumista',
                },
                {
                    placeholder: '[havainto/tunne]',
                    suggestion: 'mun mielestä tuo kuulosti kovalta',
                    hint: 'Minä-muoto: raportoit omaa kokemustasi, et syytä',
                },
                {
                    placeholder: '[Pyyntö tai kysymys]',
                    suggestion: 'voidaanko pitäytyä asiallisessa?',
                    hint: 'Ei syytös, vaan ehdotus suunnasta',
                },
            ],
        },
        openTextLabel: 'Kirjoita oma lauseesi',
        openTextHint: 'Älä tavoittele täydellisyyttä — tavoittele jotain lyhyttä, jota voisit oikeasti sanoa.',
        savedPhraseLabel: 'Tallenna tämä turvalauseeksesi',
    },

    safetyPlan: {
        intro: 'Olet puuttunut. Viikon kuluttua huomaat...',
        costScenario: {
            description: 'Valitse kaikki, mitä pelkäisit voivan tapahtua seuraavaksi:',
            options: [
                { id: 'pekka-annoyed', label: 'Pekka on viileämpi minulle palavereissa', isCost: true },
                { id: 'labeled-difficult', label: 'Saan maineen "hankalana ihmisenä"', isCost: true },
                { id: 'meri-grateful', label: 'Meri kiittää minua sanomalla "en tiennyt kukaan huomasi"', isCost: false },
                { id: 'others-silent', label: 'Muut jatkavat hiljaisuutta kuten ennenkin', isCost: false },
                { id: 'nothing', label: 'Ei mitään erityistä — elämä jatkuu', isCost: false },
            ],
            note: 'Riski on todellinen. Mutta niin on myös hiljaisuuden hinta — uhrille ja sinulle itsellesi.',
        },
        protectionActions: [
            {
                id: 'document-start',
                label: 'Aloitan dokumentoinnin heti',
                category: 'self',
                description: 'Kirjaan päivämäärät, tarkat sanat, läsnäolijat. Tämä on turvaverkkoni jos tilanne eskaloituu.',
            },
            {
                id: 'tell-trusted',
                label: 'Kerron luottamukselliselle taholle',
                category: 'systemic',
                description: 'HR, luottamusmies, ylempi esimies tai työsuojeluvaltuutettu. Hiljaisuus antaa tilanteen jatkua.',
            },
            {
                id: 'check-in-meri',
                label: 'Sovitaan Merin kanssa jatkoseurannasta',
                category: 'victim',
                description: '"Voinko kysyä ensi viikolla miten tilanne on?" — uhri ei jää yksin.',
            },
            {
                id: 'adjust-strategy',
                label: 'Arvioin: jatkanko suoraa vai vaihdan epäsuoraan?',
                category: 'self',
                description: 'Jos reaktio oli kielteinen, vaihdan strategiaa. Delegointi tai dokumentointi ovat yhtä päteviä.',
            },
            {
                id: 'peer-support',
                label: 'Haen itse tukea — myös puuttuminen voi uuvuttaa',
                category: 'self',
                description: 'Kerron tilanteesta luottamuksellisesti ystävälle tai työnohjaajalle.',
            },
        ],
        upstanderNote: '📊 85% ihmisistä jäi tässä tilanteessa sivustakatsojiksi. Se, että sinä puutuit — tai edes harkitsit sitä — on jo muutos. Jokainen puuttuminen tekee seuraavasta helpompaa.',
    },
};
