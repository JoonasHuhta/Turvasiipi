export interface HealthySignCategory {
    title: string;
    items: string[];
}

export const healthySigns: HealthySignCategory[] = [
    {
        title: "Vuorovaikutus ja viestintä",
        items: [
            "Palaute annetaan rakentavasti ja kahden kesken",
            "Kritiikki on tasapainoista - kaikki saavat sitä",
            "Kehut annetaan julkisesti, moitteet yksityisesti",
            "Virheitä käsitellään oppimismahdollisuuksina",
            "Vitsit eivät kohdistu yhteen henkilöön",
            "Kun huomauttaa epäasiallisesta, siihen puututaan"
        ]
    },
    {
        title: "Tiedonkulku ja päätöksenteko",
        items: [
            "Kaikki saavat saman tiedon samaan aikaan",
            "Kokouskutsut lähetetään kaikille relevanteille",
            "Päätökset perustellaan läpinäkyvästi",
            "Muutokset ilmoitetaan etukäteen",
            "Resurssit jaetaan tasapuolisesti",
            "Odotukset ovat selkeät ja pysyvät"
        ]
    },
    {
        title: "Valtasuhteet ja dynamiikka",
        items: [
            "Esihenkilö kuuntelee ja ottaa vastaan palautetta",
            "Hierarkia ei estä avointa keskustelua",
            "Virheistä voi puhua ilman pelkoa",
            "Erimielisyydet ratkaistaan asiallisesti",
            "Kaikilla on yhtäläinen oikeus tulla kuulluksi",
            "Valta-asemaa ei käytetä väärin"
        ]
    },
    {
        title: "Ilmapiiri ja yhteisö",
        items: [
            "Ihmiset juttelevat rennosti keskenään",
            "Kukaan ei jää systemaattisesti ulkopuolelle",
            "Lounaita ja taukoja vietetään yhdessä",
            "Onnistumiset juhlistetaan tiimillä",
            "Apua pyydetään ja annetaan vapaasti",
            "Tunnelma ei muutu kenenkään tullessa"
        ]
    },
    {
        title: "Omat tunnereaktiot",
        items: [
            "Nautit työstäsi suurimman osan ajasta",
            "Nukut hyvin, et herää miettiä työasioita",
            "Töihin meno ei aiheuta ahdistusta",
            "Voit olla oma itsesi työpaikalla",
            "Luotat kollegoihisi ja esimieheen",
            "Tunnet kuuluvasi yhteisöön"
        ]
    }
];

export interface ComparisonItem {
    situation: string;
    healthy: string;
    warning: string;
}

export const conflictVsBullying: ComparisonItem[] = [
    {
        situation: "Erimielisyys",
        healthy: "Keskustellaan asiallisesti, etsitään ratkaisu",
        warning: "Yksi osapuoli vähätellään, asia jää roikkumaan"
    },
    {
        situation: "Virhe",
        healthy: "\"Mitä opimme?\"",
        warning: "\"Taas sinä?\" - toistuvasti saman henkilön \"typeryys\""
    },
    {
        situation: "Palaute",
        healthy: "Rakentava, kaksisuuntainen",
        warning: "Yksisuuntainen, julkinen, nöyryyttävä"
    },
    {
        situation: "Vitsi",
        healthy: "Kaikki nauravat, kukaan ei loukkaa",
        warning: "Yksi on aina kohteena, \"älä nyt ole herkkä\""
    },
    {
        situation: "Huono päivä",
        healthy: "Kollega pahoittelee kireyttä",
        warning: "Toistuvaa, kohdistuu vain sinuun"
    }
];
