export type Question = {
    id: number;
    text: string;
};

export const quizQuestions: Question[] = [
    {
        id: 1,
        text: "Huomaatko tulevasi toistuvasti ohitetuksi tai eristetyksi työyhteisön sosiaalisissa tilanteissa?"
    },
    {
        id: 2,
        text: "Onko työtehtäviäsi muutettu ilman perusteltua syytä tai onko sinulle annettu kohtuuttomia deadlines?"
    },
    {
        id: 3,
        text: "Saatko jatkuvaa, perusteetonta kritiikkiä työstäsi tai henkilökohtaisista ominaisuuksistasi?"
    },
    {
        id: 4,
        text: "Puhutaanko sinusta pahaa selän takana tai levitetäänkö sinusta perättömiä huhuja?"
    },
    {
        id: 5,
        text: "Onko sinulle huudettu, kiroiltu tai käyttäydytty uhkaavasti työpaikalla?"
    },
    {
        id: 6,
        text: "Onko mielipiteitäsi väheksytty tai sivuutettu toistuvasti palavereissa tai päätöksenteossa?"
    },
    {
        id: 7,
        text: "Onko sinulta evätty työssä tarvittavaa tietoa tai välineitä tarkoituksellisesti?"
    },
    {
        id: 8,
        text: "Onko sinua nimitelty tai pilkattu muiden kuullen?"
    },
    {
        id: 9,
        text: "Tunnetko olosi jatkuvasti ahdistuneeksi tai pelokkaaksi työpäivän aikana?"
    },
    {
        id: 10,
        text: "Onko sinua kielletty ilmaisemasta mielipidettäsi tai osallistumasta keskusteluihin?"
    }
];

export const getRiskLevel = (score: number) => {
    if (score <= 2) return { level: "Matala riski", color: "text-green-600", description: "Tilanne vaikuttaa satunnaiselta, mutta pidä kirjaa jos se jatkuu." };
    if (score <= 5) return { level: "Kohtalainen riski", color: "text-orange-600", description: "Merkit viittaavat mahdolliseen epäasialliseen kohteluun. Aloita dokumentointi." };
    return { level: "Korkea riski", color: "text-red-600", description: "Tilanne viittaa vahvasti työpaikkakiusaamiseen. Suosittelemme ottamaan yhteyttä työsuojeluun ja dokumentoimaan kaiken." };
};
