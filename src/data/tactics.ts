export type Tactic = {
    id: string;
    name: string;
    definition: string;
    phrases: string[];
    goal: string;
    strategy: string[];
    logExample: string;
};

export const bullyingTactics: Tactic[] = [
    {
        id: "mitatointi",
        name: "Mitätöinti & Vähättely",
        definition: "Osaamisesi, ehdotustesi ja saavutustesi jatkuva vähättely ja kyseenalaistaminen.",
        phrases: [
            "Tuo on turha ehdotus",
            "Etkö todella tiedä tätä?",
            "Kuka tahansa olisi tehnyt tuon",
            "Miksi teet tästä numeron?"
        ],
        goal: "Murentaa itseluottamuksesi ja ammatillinen uskottavuutesi.",
        strategy: [
            "Dokumentoi positiivinen palaute muualta.",
            "Älä odota kiusaajalta tunnustusta.",
            "Vahvista osaamisesi ulkopuolisten kanssa."
        ],
        logExample: "Esimies sanoi 'turha ehdotus' palaverissa 12.12. Todistajat: 5 henkilöä."
    },
    {
        id: "eristaminen",
        name: "Eristäminen & Ulossulkeminen",
        definition: "Tahallinen jättäminen sosiaalisen ja ammatillisen vuorovaikutuksen ulkopuolelle.",
        phrases: [
            "Unohdin kertoa sinulle tuon",
            "Tämä ei kuulu sinulle",
            "(Hiljaisuus saapuessasi paikalle)",
            "Palaveri oli jo eilen"
        ],
        goal: "Tehdä sinusta näkymätön ja katkaista tukiverkostosi.",
        strategy: [
            "Rakenna verkostoja muihin tiimeihin.",
            "Dokumentoi poissaolot palavereista.",
            "Kysy kirjallisesti, miksi tieto ei kulkenut."
        ],
        logExample: "Koko tiimi meni lounaalle ilman minua 3. päivä peräkkäin (10-12.12)."
    },
    {
        id: "gaslighting",
        name: "Gaslighting",
        definition: "Psykologinen manipulaatio, joka saa sinut epäilemään omia havaintojasi ja muistiasi.",
        phrases: [
            "En ole koskaan sanonut tuota",
            "Olet liian herkkä",
            "Se oli vitsi, älä ota raskaasti",
            "Kuvittelet vain asioita"
        ],
        goal: "Saada sinut epäilemään mielenterveyttäsi ja hiljentää sinut.",
        strategy: [
            "Kirjaa asiat ylös heti tapahtumahetkellä.",
            "Käytä sähköpostia vahvistuksena.",
            "Älä jää väittelemään muistikuvista."
        ],
        logExample: "15.12 sovittiin X. 18.12 esimies väitti, ettei sellaista ole koskaan sovittu."
    },
    {
        id: "passiivi-aggressio",
        name: "Passiivi-aggressiivisuus",
        definition: "Piilotettua vihamielisyyttä, jota on vaikea osoittaa suoraan kiusaamiseksi.",
        phrases: [
            "Ehkä ensi kerralla onnistut paremmin (sarkasmi)",
            "Olen vain rehellinen",
            "(Huokailu puheenvuorosi aikana)",
            "(Silmien pyörittely)"
        ],
        goal: "Satuttaa ilman, että kiusaaja joutuu vastuuseen käytöksestään.",
        strategy: [
            "Kysy suoraan: 'Tarkoititko tuon loukkaavasti?'",
            "Pysy viileän asiallisena.",
            "Dokumentoi sanat ja eleet."
        ],
        logExample: "Esimies pyöritteli silmiään projektiesitykseni aikana. Pvm X."
    },
    {
        id: "kohtuuttomuus",
        name: "Kohtuuttomat vaatimukset",
        definition: "Mahdottomien tavoitteiden tai epäinhimillisen työkuorman asettaminen.",
        phrases: [
            "Tämä pitää olla valmis huomenna (viikon työ)",
            "Kyllä muutkin pystyvät tähän",
            "En ehdi katsoa priorisointia, tee kaikki",
            "Oletko hidas vai miksi kesto tuntuu pitkältä?"
        ],
        goal: "Aiheuttaa uupumus tai 'todistaa' epäpätevyytesi epäonnistumisen kautta.",
        strategy: [
            "Pyydä priorisointi kirjallisesti.",
            "Pidä kirjaa työajasta ja tehtävistä.",
            "Ilmoita ylikuormituksesta sähköpostilla."
        ],
        logExample: "Sain 40h työn perjantaina klo 16, palautus maanantaina klo 8."
    },
    {
        id: "epaoikeudenmukaisuus",
        name: "Epäoikeudenmukaisuus",
        definition: "Sääntöjen ja palkkioiden soveltaminen eri tavalla eri ihmisiin.",
        phrases: [
            "A saa etätyötä, sinä et (ilman syytä)",
            "Hyvä projekti A! (Vaikka sinä teit työn)",
            "Sinun virheesi on vakava (A:n sama virhe ok)",
            "Ei tästä ole tapana maksaa lisää"
        ],
        goal: "Luo epävarmuutta ja viestittää, ettet ole tasavertainen muiden kanssa.",
        strategy: [
            "Vertaa tilannettasi kirjallisiin ohjeisiin.",
            "Dokumentoi poikkeamat tasapuolisuudessa.",
            "Kysy kirjallisesti perustelut eriarvoiselle kohtelulle."
        ],
        logExample: "Kollega sai kiitoksen tiimipalaverissa projektista, jonka tein yksin."
    },
    {
        id: "uhkailu",
        name: "Uhkailu & Pelottelu",
        definition: "Epäsuora tai suora uhkaaminen työsuhteen tai maineen menetyksellä.",
        phrases: [
            "Olen puhunut sinusta johdolle",
            "Jos tämä toistuu, tiedät seuraukset",
            "Ehkä tämä ala ei sovi sinulle",
            "Toivottavasti et tee enää virheitä..."
        ],
        goal: "Hallita sinua pelon avulla ja estää puolustautuminen.",
        strategy: [
            "Tallenna kaikki kirjalliset uhat.",
            "Ota yhteys luottamusmieheen heti.",
            "Älä jää kahden kesken uhkailijan kanssa."
        ],
        logExample: "Esimies sanoi suljettujen ovien takana 'parasta alkaa etsiä uutta työtä'."
    },
    {
        id: "sabotaasi",
        name: "Sabotaasi",
        definition: "Työn tekemisen estäminen tai vaikeuttaminen tahallisesti.",
        phrases: [
            "(Tietoa annetaan väärin tai liian myöhään)",
            "En saanut viestiäsi (vaikka sai)",
            "Projekti siirrettiin toiselle kesken kaiken",
            "(Työvälineitä ei toimiteta pyynnöstä huolimatta)"
        ],
        goal: "Saada sinut näyttämään epäpätevältä ja aiheuttaa turhautumista.",
        strategy: [
            "Kopioi tärkeät viestit kolmannelle osapuolelle.",
            "Varmista ohjeet kirjallisesti.",
            "Ilmoita esteistä välittömästi raportointilinjaa pitkin."
        ],
        logExample: "Tärkeää Excel-pohjaa ei toimitettu, vaikka pyysin sitä 5 kertaa."
    },
    {
        id: "maine",
        name: "Maineen vahingoittaminen",
        definition: "Perättömien huhujen levittäminen tai osaamisen vääristely muille.",
        phrases: [
            "Hän on vaikea ihminen",
            "Hänen kanssaan kukaan ei halua työskennellä",
            "Kuulin että hän tekee paljon virheitä",
            "Hän ei ole tiimipelaaja"
        ],
        goal: "Tuhota uskottavuutesi ja tuki-mahdollisuutesi organisaatiossa.",
        strategy: [
            "Keskustele suoraan kollegoillesi.",
            "Pyydä HR:ää selvittämään huhujen lähde.",
            "Pysy ammatillisena kaikessa viestinnässä."
        ],
        logExample: "Kollega kertoi, että esimies oli puhunut minusta 'epävakaana' kahvihuoneessa."
    },
    {
        id: "manipulaatio",
        name: "Emotionaalinen manipulaatio",
        definition: "Tunteiden, kuten syyllisyyden tai pelon, käyttö toisen hallitsemiseen.",
        phrases: [
            "Luulin että olimme ystäviä",
            "Kun olet sairaana, muut kärsivät",
            "Olet ainoa joka voi pelastaa tämän",
            "Katsotaan ensi viikolla (mutta ei koskaan)"
        ],
        goal: "Tehdä sinusta tottelevainen syyllisyyden tai väärän toivon avulla.",
        strategy: [
            "Tunnista 'hyvä päivä / huono päivä' -sykli.",
            "Pidä ammatilliset rajat.",
            "Älä ota vastuuta toisen tunteista."
        ],
        logExample: "Esimies syyllisti sairaslomasta sanomalla sen tuhoavan tiimin hengen."
    },
    {
        id: "identiteetti",
        name: "Identiteetin hyökkäys",
        definition: "Hyökkäys henkilökohtaisia ominaisuuksia, kuten ikää, sukupuolta tai taustaa kohtaan.",
        phrases: [
            "Oletko ADHD vai miksi et keskity?",
            "Naiset eivät ymmärrä tätä teknistä puolta",
            "Tuon ikäisen on vaikea oppia uutta",
            "Oletpa sä herkkä tänään (viitaten ominaisuuteen)"
        ],
        goal: "Nöyryyttää ja osoittaa, ettet kuulu joukkoon henkilökohtaisen syyn takia.",
        strategy: [
            "Tämä voi olla lakia rikkovaa syrjintää.",
            "Ota yhteyttä yhdenvertaisuusvaltuutettuun.",
            "Dokumentoi sanat sanatarkasti."
        ],
        logExample: "Esimies kysyi 'johtuuko hitaus iästäsi' muiden kuullen."
    },
    {
        id: "thousand-cuts",
        name: "Death by a Thousand Cuts",
        definition: "Jatkuva sarja pieniä mikroaggressioita, joita on vaikea eristää yksittäin.",
        phrases: [
            "(Jatkuvat pienet korjaukset työhön)",
            "(Pienet huokaisut pyyntöjesi jälkeen)",
            "(Olematon palaute tehdyistä asioista)",
            "(Pieniä epäasiallisia vitsejä päivittäin)"
        ],
        goal: "Kuluttaa uhrin psyyke hitaasti mutta varmasti loppuun.",
        strategy: [
            "Dokumentoi KAIKKI pienetkin asiat – määrä ratkaisee.",
            "Katso kokonaiskuvaa, älä vain tätä päivää.",
            "Hae ulkopuolista validaatiota tilanteelle."
        ],
        logExample: "15 pientä epämiellyttävää kohtaamista saman päivän aikana. Masentava olo."
    }
];
