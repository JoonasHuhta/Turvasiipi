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
        name: "Muna",
        minPoints: 0,
        maxPoints: 100,
        color: "text-slate-500",
        bg: "bg-slate-100",
        icon: "🥚",
        subLevels: [
            {
                min: 0,
                max: 100,
                title: "Tarkkailija",
                description: "Jokainen matka alkaa tästä. Ota aikasi.",
                feedback: "Vasta opettelet tunnistamaan hienovaraisia vihjeitä. Kaikki on uutta.",
                hints: ["Kiinnitä huomiota siihen, kuka jää keskustelun ulkopuolelle.", "Lue lisää ostrakismista tutkimuspankista."]
            }
        ]
    },
    {
        id: 2,
        name: "Untuvikko",
        minPoints: 101,
        maxPoints: 300,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        icon: "🐣",
        subLevels: [
            {
                min: 101,
                max: 300,
                title: "Oppija",
                description: "Ei ole heikkoutta oppia. On viisautta.",
                feedback: "Olet tehnyt ensimmäiset askeleet. Tiedät nyt enemmän kuin eilen.",
                hints: ["Pienikin ele, kuten tervehtiminen sivuutettua, merkitsee paljon.", "Kokeile Bystander-simulaatiota."]
            }
        ]
    },
    {
        id: 3,
        name: "Keltanokka",
        minPoints: 301,
        maxPoints: 600,
        color: "text-amber-500",
        bg: "bg-amber-50",
        icon: "🐤",
        subLevels: [
            {
                min: 301,
                max: 600,
                title: "Harjoittelija",
                description: "Dokumentointi on voimaa. Jatka näin.",
                feedback: "Harjoittelet lentoa. Et ole vielä valmis, mutta opit joka päivä.",
                hints: ["Harjoittele vielä viestien lukutaitoa.", "Lue lisää itsetuntemuksesta itsearviointien kautta."]
            }
        ]
    },
    {
        id: 4,
        name: "Höyhenpuku",
        minPoints: 601,
        maxPoints: 1000,
        color: "text-blue-500",
        bg: "bg-blue-50",
        icon: "🐦",
        subLevels: [
            {
                min: 601,
                max: 1000,
                title: "Taitaja",
                description: "Sinulla on nyt työkalut. Käytä niitä viisaasti.",
                feedback: "Höyhenesi ovat kasvaneet. Olet valmis ensimmäisiin lyhyisiin lentoihin.",
                hints: ["Luomalla raportin saat työkalut viralliseen prosessiin.", "Käytä kaikkia simulaattoreita vahvistaaksesi osaamistasi."]
            }
        ]
    },
    {
        id: 5,
        name: "Lentokykyinen",
        minPoints: 1001,
        maxPoints: 1500,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        icon: "🕊️",
        subLevels: [
            {
                min: 1001,
                max: 1500,
                title: "Osaaja",
                description: "Et ole enää yksin. Tiedät mihin olet menossa.",
                feedback: "Lennät omilla siivilläsi. Tiedät mitä teet ja miksi.",
                hints: ["Jatkuva dokumentointi auttaa pysymään tilanteen päällä.", "Käy läpi valmennuspolku syventääksesi ymmärrystäsi."]
            }
        ]
    },
    {
        id: 6,
        name: "Parviopas",
        minPoints: 1501,
        maxPoints: 2500,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        icon: "🦜",
        subLevels: [
            {
                min: 1501,
                max: 2500,
                title: "Opastaja",
                description: "Sinun kokemuksesi voi auttaa toista untuvikkoa.",
                feedback: "Lennät parven kärjessä. Olet nähnyt paljon ja oppinut paljon. Voit nyt auttaa muita.",
                hints: ["Viisautesi voi olla ratkaisevaa toiselle.", "Aktiivisuutesi yhteisössä murentaa kiusaamisen rakenteita."]
            }
        ]
    },
    {
        id: 7,
        name: "Turvasiipi-Mestari",
        minPoints: 2501,
        maxPoints: 10000,
        color: "text-orange-600",
        bg: "bg-orange-50",
        icon: "🦅",
        subLevels: [
            {
                min: 2501,
                max: 10000,
                title: "Suojelija",
                description: "Sinä olet se, jota muut tarvitsevat. Kiitos että jaksat.",
                feedback: "Lennät korkealla ja näet kauas. Olet läpikäynyt myrskyn ja selvinnyt.",
                hints: ["Olet jo huipulla. Kiitos panoksestasi parempaan työelämään."]
            }
        ]
    }
];
