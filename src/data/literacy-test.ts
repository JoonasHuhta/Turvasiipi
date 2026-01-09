export interface LiteracyScenario {
    id: number;
    text: string;
    isBullying: boolean;
    explanation: string;
}

export const literacyScenarios: LiteracyScenario[] = [
    {
        id: 1,
        text: "Esimies antaa tiukkaa palautetta myöhästyneestä raportista ja vaatii korjauksia välittömästi.",
        isBullying: false,
        explanation: "Asiallinen, työhön kohdistuva palaute ja työn johtaminen ei ole kiusaamista, vaikka se tuntuisi ikävältä."
    },
    {
        id: 2,
        text: "Työkaveri jättää toistuvasti kutsumatta yhden tiimiläisen yhteiselle lounaalle, vaikka kaikki muut pyydetään.",
        isBullying: true,
        explanation: "Eristäminen ja ulkopuolelle jättäminen on yksi tyypillisimmistä sosiaalisen kiusaamisen muodoista."
    },
    {
        id: 3,
        text: "Esimies huomauttaa virheestä koko tiimin kuullen ja pilkkaa työntekijän osaamista sarkastisesti.",
        isBullying: true,
        explanation: "Julkinen nolaaminen ja osaamisen kyseenalaistaminen epäasiallisella tavalla on kiusaamista."
    },
    {
        id: 4,
        text: "Työntekijälle annetaan uusia, haastavia tehtäviä, joihin hänellä on osaamista mutta jotka vaativat opettelua.",
        isBullying: false,
        explanation: "Työnkuvan muuttaminen tai haastaminen ei ole kiusaamista, jos se perustuu työn tarpeisiin eikä ole kohtuutonta."
    },
    {
        id: 5,
        text: "Käyttäjätunnukset suljetaan 'vahingossa' useita kertoja kuukaudessa juuri ennen tärkeitä määräaikoja.",
        isBullying: true,
        explanation: "Työnteon sabotointi on järjestelmällistä kiusaamista, jolla pyritään horjuttamaan uhrin asemaa."
    },
    {
        id: 6,
        text: "Työntekijä saa kutsun YT-neuvotteluihin muun osaston mukana.",
        isBullying: false,
        explanation: "Lakisääteiset työnantajan toimenpiteet, kuten YT-neuvottelut, eivät ole kiusaamista."
    },
    {
        id: 7,
        text: "Työntekijän vapaa-ajan harrastuksille nauretaan toistuvasti kahvihuoneessa.",
        isBullying: true,
        explanation: "Henkilökohtaisuuksiin menevä pilkka ja loukkaaminen on kiusaamista."
    },
    {
        id: 8,
        text: "Tiimin jäsen on eri mieltä ideastasi viikkopalaverissa ja esittää vastakkaisia argumentteja.",
        isBullying: false,
        explanation: "Erimielisyydet ja asioista väitteleminen kuuluvat normaaliin työyhteisöön."
    },
    {
        id: 9,
        text: "Työntekijältä viedään ilman perusteluja kaikki vastuualueet ja hänet jätetään istumaan ilman tehtäviä.",
        isBullying: true,
        explanation: "Tyhjiin tehtäviin jättäminen on passiivista kiusaamista, jolla pyritään nujertamaan työntekijä."
    },
    {
        id: 10,
        text: "Työpaikalla levitetään perättömiä juoruja työntekijän yksityiselämästä.",
        isBullying: true,
        explanation: "Maineeseen kohdistuva häirintä ja juoruilu on selkeää kiusaamista."
    },
    {
        id: 11,
        text: "Esimies pyytää selvitystä toistuvista maanantaipoissaoloista.",
        isBullying: false,
        explanation: "Työnantajalla on oikeus ja velvollisuus seurata poissaoloja ja puuttua niihin."
    },
    {
        id: 12,
        text: "Työntekijälle annetaan jatkuvasti mahdottomia määräaikoja, joista tiedetään ettei niitä voi saavuttaa.",
        isBullying: true,
        explanation: "Kohtuuttomilla vaatimuksilla uuvuttaminen on yksi työpaikkakiusaamisen muoto."
    },
    {
        id: 13,
        text: "Työyhteisössä on kova äänenpaine ja stressaava ilmapiiri kiireen vuoksi.",
        isBullying: false,
        explanation: "Huono työilmapiiri tai kiire ei ole automaattisesti kiusaamista, jos se ei kohdistu kehenkään yksilöön."
    },
    {
        id: 14,
        text: "Työntekijän puhe keskeytetään säännönmukaisesti palavereissa tai häntä ei kuunnella.",
        isBullying: true,
        explanation: "Puhevallan rajoittaminen ja huomiotta jättäminen on vaimentamista, joka on kiusaamista."
    },
    {
        id: 15,
        text: "Työyhteisön sääntöjä (esim. työaikoja) sovelletaan tiukasti kaikkiin työntekijöihin.",
        isBullying: false,
        explanation: "Tasapuolinen sääntöjen noudattaminen ei ole kiusaamista."
    },
    {
        id: 16,
        text: "Työntekijän sähköposteihin ei vastata viikkoihin, vaikka asiat vaatisivat päätöksiä muilta.",
        isBullying: true,
        explanation: "Tiedon pimittäminen ja vastaamattomuus työn estämiseksi on kiusaamista."
    },
    {
        id: 17,
        text: "Kiusaajaksi koettu henkilö on itsekin stressaantunut ja uupunut.",
        isBullying: true,
        explanation: "Kiusaaminen ei poistu, vaikka tekijän motiivi olisi uupumus. Toiminta on silti kiusaamista."
    },
    {
        id: 18,
        text: "Työpaikan pikkujouluissa joku vitsailee mauttomasti yleisellä tasolla.",
        isBullying: false,
        explanation: "Huono käytös tai mauton huumori on ikävää, mutta ei vielä kiusaamista, jos se on kertaluonteista eikä kohdistu keneenkään."
    },
    {
        id: 19,
        text: "Työntekijälle myönnetään vähemmän bonusta kuin muille heikomman tuloksen vuoksi.",
        isBullying: false,
        explanation: "Perusteltu erilainen kohtelu (esim. tulospalkkaus) ei ole kiusaamista."
    },
    {
        id: 20,
        text: "Esimies vaihtaa työntekijän työpisteen siivouskomeroon ilman työhön liittyvää syytä.",
        isBullying: true,
        explanation: "Fyysinen eristäminen ja nöyryyttävä tilajärjestely on selkeää kiusaamista."
    }
];

export const getLiteracyLevel = (score: number) => {
    const percentage = (score / 20) * 100;
    if (percentage >= 95) return "Mestari";
    if (percentage >= 85) return "Sujuva";
    if (percentage >= 75) return "Perustaso";
    return "Alkutaso";
};
