export interface SubLevel {
    min: number;
    max: number;
    title: string;
    description: string;
    feedback: string;
    hints: string[];
}

export interface ExpertLevel {
    id: number;
    name: string;
    minPoints: number;
    maxPoints: number;
    color: string;
    bg: string;
    icon: string;
    subLevels: SubLevel[];
}

export const EXPERT_LEVELS: ExpertLevel[] = [
    {
        id: 1,
        name: "Noviisi",
        minPoints: 0,
        maxPoints: 100,
        color: "text-slate-600",
        bg: "bg-slate-100",
        icon: "💡",
        subLevels: [
            {
                min: 0,
                max: 25,
                title: "Työpaikan Pökkelö",
                description: "Vasta opettelet tunnistamaan hienovaraisia vihjeitä.",
                feedback: "Vaikuttaa siltä, että kiusaamisen hienovaraiset muodot, kuten ostrakismi, menevät vielä ohi. Se on normaalia alussa!",
                hints: ["Kiinnitä huomiota siihen, kuka jää keskustelun ulkopuolelle.", "Lue lisää ostrakismista tutkimuspankista."]
            },
            {
                min: 26,
                max: 50,
                title: "Sivustaseuraaja",
                description: "Huomaat jotain olevan vialla, mutta et tiedä miten toimia.",
                feedback: "Tunnistat jo jännitteitä, mutta puuttuminen tuntuu vielä vaikealta.",
                hints: ["Pienikin ele, kuten tervehtiminen sivuutettua, merkitsee paljon.", "Kokeile Bystander-simulaatiota."]
            },
            {
                min: 51,
                max: 75,
                title: "Empatian Harjoittelija",
                description: "Yrität ymmärtää kokemusta toisen näkökulmasta.",
                feedback: "Olet hyvällä matkalla. Empatiakyky on taito, jota voi vahvistaa.",
                hints: ["Kysy itseltäsi: miltä tämä tuntuisi minusta?"]
            },
            {
                min: 76,
                max: 100,
                title: "Perusymmärtäjä",
                description: "Hallitset kiusaamisen peruskäsitteet.",
                feedback: "Hyvää työtä! Olet suorittanut perusteet ja olet valmis syventämään osaamistasi.",
                hints: ["Siirry seuraavaan simulaatioon kokeilemaan taitojasi."]
            }
        ]
    },
    {
        id: 2,
        name: "Osaaja",
        minPoints: 101,
        maxPoints: 200,
        color: "text-emerald-600",
        bg: "bg-emerald-100",
        icon: "🌱",
        subLevels: [
            {
                min: 101,
                max: 125,
                title: "Empatia-trainee",
                description: "Kykenet tunnistamaan uhrin hädän hienovaraisista merkeistä.",
                feedback: "Loistavaa edistymistä! Huomaat jo pienetkin muutokset ilmapiirissä.",
                hints: ["Harjoittele vielä viestien lukutaitoa."]
            },
            {
                min: 176,
                max: 200,
                title: "Tukiverkosto",
                description: "Olet aktiivinen tuki muille työyhteisössä.",
                feedback: "Olet työyhteisön voimavara. Aktiivinen tukesi murentaa kiusaamisen rakenteita.",
                hints: ["Voisitko toimia mentorina uusille työntekijöille?"]
            }
        ]
    },
    {
        id: 3,
        name: "Asiantuntija",
        minPoints: 201,
        maxPoints: 300,
        color: "text-indigo-600",
        bg: "bg-indigo-100",
        icon: "🧠",
        subLevels: [
            {
                min: 201,
                max: 225,
                title: "Lukutaito-asiantuntija",
                description: "Analysoit kiusaamisen dynamiikkaa kuin ammattilainen.",
                feedback: "Ymmärrät syvällisesti, miten valta ja hiljaisuus toimivat työyhteisössä.",
                hints: ["Tutustu Pluralistiseen ignoranssiin syvemmin."]
            },
            {
                min: 276,
                max: 300,
                title: "Restoratiivinen sovittelija",
                description: "Osaat rakentaa siltoja ja korjata vaurioituneita suhteita.",
                feedback: "Olet saavuttanut tason, jossa pystyt auttamaan koko yhteisöä parantumaan.",
                hints: ["Harkitse virallista sovittelijakoulutusta."]
            }
        ]
    },
    {
        id: 4,
        name: "Mestari",
        minPoints: 301,
        maxPoints: 400,
        color: "text-purple-600",
        bg: "bg-purple-100",
        icon: "🏆",
        subLevels: [
            {
                min: 301,
                max: 325,
                title: "Organisaatiokonsultti",
                description: "Näet systeemiset virheet ja osaat ehdottaa rakenteellisia muutoksia.",
                feedback: "Kykysi analysoida organisaation DNA:ta on erinomainen.",
                hints: ["Luo oma toimintasuunnitelma työyhteisöllesi."]
            },
            {
                min: 376,
                max: 400,
                title: "Strateginen muutosjohtaja",
                description: "Johdat työyhteisöä kohti psykologista turvallisuutta.",
                feedback: "Olet mestaritasolla. Toimintasi muuttaa koko työkulttuuria pysyvästi.",
                hints: ["Jaa osaamistasi muille esimiehille."]
            }
        ]
    },
    {
        id: 5,
        name: "Legenda",
        minPoints: 401,
        maxPoints: 500,
        color: "text-amber-600",
        bg: "bg-amber-100",
        icon: "🌟",
        subLevels: [
            {
                min: 401,
                max: 425,
                title: "Empatia-mestari",
                description: "Olet saavuttanut syvimmän mahdollisen ymmärryksen ihmisestä.",
                feedback: "Legendaarista. Olet majakka, joka näyttää tietä pimeydessä.",
                hints: ["Olet jo huipulla. Kiitos panoksestasi parempaan työelämään."]
            },
            {
                min: 476,
                max: 500,
                title: "Työelämän valontuoja",
                description: "Olet muuttanut lukemattomien ihmisten elämän suunnan paremmaksi.",
                feedback: "Suurin mahdollinen kunnianosoitus. Olet tuonut valoa sinne, missä oli vain hiljaisuutta.",
                hints: ["Sinulla ei ole enää mitään opittavaa täällä, olet valmis muuttamaan maailman."]
            }
        ]
    }
];
