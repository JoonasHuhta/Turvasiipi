import { HeartPulse, UserX, AlertCircle, Brain, Target, MessageSquare, Info } from "lucide-react";

export type FeelingCategory =
    | "itseepaily"
    | "eristyksisyys"
    | "halvaantuminen"
    | "pelko"
    | "identiteetti"
    | "fyysiset";

export interface FeelingQuestion {
    id: number;
    category: FeelingCategory;
    question: string;
    validationTitle: string;
    validationText: string;
    isCritical?: boolean;
}

export const categoryWeights: Record<FeelingCategory, number> = {
    itseepaily: 3,
    eristyksisyys: 2,
    halvaantuminen: 2,
    pelko: 2,
    identiteetti: 1.5,
    fyysiset: 3
};

export const feelingsQuestions: FeelingQuestion[] = [
    // KATEGORIA 1: ITSEEPÄILY & HÄPEÄ (Weight x3)
    {
        id: 1,
        category: "itseepaily",
        question: 'Ajattelen usein: "Olen liian herkkä" tai "Otan asiat liian raskaasti"',
        validationTitle: "💙 TÄRKEÄ TIETO",
        validationText: "68% työpaikkakiusaamisen uhreista ajattelee tämän. Tämä ajatus on usein seurausta gaslightingista, jossa tunteitasi on vähätelty toistuvasti. Sinä ET ole liian herkkä."
    },
    {
        id: 2,
        category: "itseepaily",
        question: "Epäilen ammattitaitoani tai osaamistani työssä (vaikka tulokseni ovat objektiivisesti hyviä)",
        validationTitle: "💙 TUNNISTA MITÄTÖINTI",
        validationText: "71% uhreista alkaa epäillä osaamistaan. Jos sinua on jatkuvasti arvosteltu tai mitätöity, se murentaa itseluottamustasi huolimatta todellisista tuloksistasi."
    },
    {
        id: 3,
        category: "itseepaily",
        question: 'Vertailen itseäni muihin ja ajattelen: "Muut pärjäävät, miksi en minä?"',
        validationTitle: "💙 TÄRKEÄ YMMÄRRYS",
        validationText: "62% uhreista vertailee itseään muihin. Muista, että sinua kohdellaan eri tavalla kuin muita. Kyse ei ole pärjäämisestä, vaan epätasaisesta pelikentästä."
    },
    {
        id: 4,
        category: "itseepaily",
        question: 'Ajattelen että ansaitsen tämän kohtelun tai että "ehkä minussa on jotain vikaa"',
        validationTitle: "💙 KUULE TÄMÄ HUOLELLISESTI",
        validationText: "54% uhreista alkaa uskoa ansaitsevansa kohtelun. Kukaan ei ansaitse nöyryytystä tai pelkoa. Syy on kiusaajassa ja rakenteissa, ei sinussa."
    },
    {
        id: 5,
        category: "itseepaily",
        question: "Pyydän anteeksi asioista, jotka eivät ole minun vikani",
        validationTitle: "💙 TUNNISTA MALLI",
        validationText: "Jatkuva anteeksipyytäminen on selviytymismekanismi myrkyllisessä ympäristössä. Sinun ei tarvitse pyytää anteeksi olemassaoloasi tai asioita, joihin et voi vaikuttaa."
    },
    {
        id: 6,
        category: "itseepaily",
        question: 'Ajattelen että "jos vain olisin parempi/yrittäisin kovemmin, tämä loppuisi"',
        validationTitle: "💙 TÄRKEÄ TOTUUS",
        validationText: "Tämä on yleinen harha. Kiusaaminen ei johdu suorituksestasi, vaan vallankäytöstä. Et voi 'ansaita' hyvää kohtelua olemalla parempi – se on perusoikeutesi."
    },

    // KATEGORIA 2: ERISTYNEISYYS & LUOTTAMUSPULA (Weight x2)
    {
        id: 7,
        category: "eristyksisyys",
        question: "Tunnen olevani yksin tämän kanssa",
        validationTitle: "💙 ET OLE YKSIN",
        validationText: "72% uhreista tuntee olevansa yksin. Eristäminen on tietoinen kiusaamistaktiikka, jolla viedään uhrilta tuki ja ulkoinen validointi."
    },
    {
        id: 8,
        category: "eristyksisyys",
        question: "Pelkään että kukaan ei usko minua jos kerron",
        validationTitle: "💙 ME USKOMME SINUA",
        validationText: "68% uhreista pelkää epäuskoa. Kiusaaminen on usein hienovaraista ja tapahtuu suljettujen ovien takana, mikä ruokkii tätä pelkoa."
    },
    {
        id: 9,
        category: "eristyksisyys",
        question: 'Muut eivät puutu tilanteeseen, joten ajattelen että "ehkä tämä on normaalia"',
        validationTitle: "💙 BYSTANDER EFFECT",
        validationText: "58% uhreista tulkitsee muiden hiljaisuuden hyväksynnäksi. Todellisuudessa muutkin usein pelkäävät kohteeksi joutumista ja jähmettyvät."
    },
    {
        id: 10,
        category: "eristyksisyys",
        question: "En voi puhua tästä kenellekään",
        validationTitle: "💙 HÄPEÄ ON ASE",
        validationText: "63% uhreista tuntee, ettei voi puhua kenellekään. Häpeä on kiusaajan vahvin ase. Puhuminen on ensimmäinen askel vallan murtamiseen."
    },
    {
        id: 11,
        category: "eristyksisyys",
        question: "Luulen että HR/johto ei auta, koska he suojelevat yritystä/kiusaajaa",
        validationTitle: "💙 VALITETTAVAN YLEISTÄ",
        validationText: "55% uhreista jakaa tämän huolen. On tärkeää dokumentoida kaikki huolellisesti ja tarvittaessa hakea apua organisaation ulkopuolelta."
    },

    // KATEGORIA 3: HALVAANTUMINEN & TOIMINTAKYVYTTÖMYYS (Weight x2)
    {
        id: 12,
        category: "halvaantuminen",
        question: "En tiedä mitä pitäisi tehdä seuraavaksi",
        validationTitle: "💙 82% TUNTEE NÄIN",
        validationText: "Tämä on normaali trauma-reaktio. Liiallinen stressi halvaannuttaa päätöksenteon. Turvasiipi auttaa sinua ottamaan yhden pienen askeleen kerrallaan."
    },
    {
        id: 13,
        category: "halvaantuminen",
        question: "Pelkään että tilanne pahenee jos yritän puuttua siihen",
        validationTitle: "💙 REALISTINEN PELKO",
        validationText: "69% uhreista pelkää kostoa. Siksi on tärkeää rakentaa todistusaineisto (dokumentointi) ennen kuin nostat asian virallisesti esiin."
    },
    {
        id: 14,
        category: "halvaantuminen",
        question: "En jaksa enää taistella tai yrittää",
        validationTitle: "💙 UUPUMUS ON TODELLINEN",
        validationText: "76% uhreista tuntee uupumusta. Kehosi kertoo, että olet taistellut liian kauan ja liian yksin. Nyt on aika levätä ja hakea tukea."
    },
    {
        id: 15,
        category: "halvaantuminen",
        question: 'Ajattelen että "minun pitäisi vain kestää tämä" tai "en ole uhri"',
        validationTitle: "💙 'KESTÄMINEN' ON MYRKKYÄ",
        validationText: "61% uhreista yrittää 'vain kestää'. Kestäminen ei lopeta kiusaamista, se vain kuluttaa terveyttäsi. Avun hakeminen on rohkeutta, ei heikkoutta."
    },
    {
        id: 16,
        category: "halvaantuminen",
        question: "Muistini on heikentynyt - en muista tarkkaan mitä on tapahtunut",
        validationTitle: "💙 TRAUMA JA MUISTI",
        validationText: "48% uhreista kärsii muistiongelmista. Jatkuva stressi vaikuttaa aivojen muistikeskukseen. Siksi dokumentointi heti tapahtumien jälkeen on kriittistä."
    },

    // KATEGORIA 4: PELKO & TURVATTOMUUS (Weight x2)
    {
        id: 17,
        category: "pelko",
        question: "Pelkään mennä töihin (erityisesti maanantaiaamuna)",
        validationTitle: "💙 74% TUNTEE TÄMÄN",
        validationText: "Maanantai-ahdistus on vakava merkki turvattomuudesta. Kehosi varoittaa sinua epäterveestä ympäristöstä jo ennen kuin olet edes paikalla."
    },
    {
        id: 18,
        category: "pelko",
        question: "En tiedä milloin 'seuraava isku' tulee - olen jatkuvassa valppaustilassa",
        validationTitle: "💙 JATKUVA VALPPAUSTILA",
        validationText: "67% uhreista elää 'fight or flight' -tilassa. Tämä kuluttaa hermostoa ja on tyypillinen PTSD-oire. Tarvitset turvallisen etäisyyden tilanteeseen palautuaksesi."
    },
    {
        id: 19,
        category: "pelko",
        question: "Pelkään että menetän työpaikkani jos puhun / raportoin",
        validationTitle: "💙 REALISTINEN PELKO",
        validationText: "71% uhreista pelkää työpaikkansa puolesta. Laki kuitenkin suojaa raportoijaa kostoilta. Dokumentointi on paras suojasi laittomia toimia vastaan."
    },
    {
        id: 20,
        category: "pelko",
        question: "Työasiat seuraavat minua kotiin - viestit tai ajatukset vievät vapaa-ajan",
        validationTitle: "💙 EI RAJAA TYÖN VÄLILLÄ",
        validationText: "Kun työ seuraa kotiin painajaisina tai ajatuksina, palautuminen estyy. Tämä on yksi burnoutin ja traumatisoitumisen vahvimmista ennusmerkeistä."
    },

    // KATEGORIA 5: IDENTITEETIN MURENEMINEN (Weight x1.5)
    {
        id: 21,
        category: "identiteetti",
        question: "En ole enää oma itseni - persoonallisuuteni on muuttunut",
        validationTitle: "💙 IDENTITEETTI",
        validationText: "64% uhreista tuntee menettäneensä itsensä. Tämä ei ole pysyvää, mutta se kertoo siitä, kuinka syvälle pitkäaikainen kiusaaminen iskee."
    },
    {
        id: 22,
        category: "identiteetti",
        question: "Olen menettänyt iloni - asiat jotka ennen ilahduttivat eivät enää kiinnosta",
        validationTitle: "💙 ANHEDONIA",
        validationText: "68% uhreista kärsii ilon menetyksestä. Se on masennuksen ja burnoutin oire, joka vaatii pysähtymistä ja usein ammattilaisen apua."
    },
    {
        id: 23,
        category: "identiteetti",
        question: 'Muistan miten olin ennen - ja haluaisin olla taas se henkilö',
        validationTitle: "💙 MUISTO VANHASTA ITSESSTÄ",
        validationText: "59% uhreista kaipaa 'entistä itseään'. Se henkilö ei ole kadonnut, hän on vain traumatisoitunut ja suojautumassa. Toipuminen on polku takaisin."
    },
    {
        id: 24,
        category: "identiteetti",
        question: "Katson peiliin enkä tunnista itseäni",
        validationTitle: "💙 DISSOSIAATIO",
        validationText: "41% uhreista kokee vierautta itseään kohtaan. Keho ja mieli voivat luoda etäisyyttä kivuliaaseen todellisuuteen. Tämä on merkki hakea apua."
    },

    // KATEGORIA 6: FYYSISET OIREET (Weight x3)
    {
        id: 25,
        category: "fyysiset",
        question: "En nuku kunnolla - heräilen öisin tai kärsin painajaisista",
        validationTitle: "💙 81% KÄRSII UNIHÄIRIÖISTÄ",
        validationText: "Unettomuus on kehon tapa huutaa ylikuormituksesta. Uni on kriittinen palautumiselle, ja sen jatkuva häiriintyminen vaatii reagointia."
    },
    {
        id: 26,
        category: "fyysiset",
        question: "Minulla on vatsavaivoja tai pahoinvointia erityisesti ennen työtä",
        validationTitle: "💙 KEHO PITÄÄ KIRJAA",
        validationText: "58% uhreista kärsii vatsaoireista. Kehosi reagoi pelkoon fyysisesti jo ennen kuin mielesi ehtii analysoida tilannetta."
    },
    {
        id: 27,
        category: "fyysiset",
        question: "Sydämeni hakkaa tai tunnen ahdistusta työtilanteissa",
        validationTitle: "💙 PANIIKKIREAKTIO",
        validationText: "64% uhreista kokee ahdistusoireita. Se on kehon luonnollinen hälytysjärjestelmä epäoikeudenmukaista ja uhkaavaa tilannetta kohtaan."
    },
    {
        id: 28,
        category: "fyysiset",
        question: "Olen ollut useammin sairaana tänä vuonna kuin aiemmin",
        validationTitle: "💙 IMMUUNISUOJA",
        validationText: "58% uhreista sairastaa useammin. Pitkäaikainen stressi ja korkea kortisoli heikentävät tutkitusti vastustuskykyäsi."
    },
    {
        id: 29,
        category: "fyysiset",
        question: "Käytän alkoholia, lääkkeitä tai muita keinoja selvitäkseni",
        validationTitle: "💙 ITSEHOITO",
        validationText: "31% uhreista turvautuu päihteisiin turruttaakseen kipunsa. Se on inhimillinen reaktio sietämättömään oloon, mutta uuvuttaa kehoa entisestään."
    },
    {
        id: 30,
        category: "fyysiset",
        question: "Olen harkinnut itsemurhaa tai koen ettei elämällä ole merkitystä",
        validationTitle: "🚨 KRIISIAPU NYT",
        validationText: "Tämä on vakavin mahdollinen merkki. Et ole yksin, ja apua on saatavilla 24/7. Soita välittömästi kriisipuhelimeen: 09 2525 0111.",
        isCritical: true
    }
];

export const getFeelingsRiskLevel = (score: number) => {
    if (score >= 81) return { level: "Kriittinen", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
    if (score >= 51) return { level: "Korkea", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" };
    if (score >= 21) return { level: "Kohtalainen", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" };
    return { level: "Lievä", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" };
};
