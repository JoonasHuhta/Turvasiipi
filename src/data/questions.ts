export type QuizCategory = 'itsetunto' | 'todellisuus' | 'eristyksissä' | 'fyysiset' | 'käyttäytyminen';

export type Question = {
    id: number;
    text: string;
    category: QuizCategory;
};

export const quizQuestions: Question[] = [
    // BLOKKI A: Itsetunnon mureneminen
    { id: 1, text: "Tunnetko olosi tyhmäksi työssä (vaikka et ole)?", category: 'itsetunto' },
    { id: 2, text: "Ajatteletko usein: 'Ehkä olen liian herkkä'?", category: 'itsetunto' },
    { id: 3, text: "Epäiletkö ammattitaitoasi (vaikka aiemmin et epäillyt)?", category: 'itsetunto' },
    { id: 4, text: "Pelkäätkö tehdä virheitä enemmän kuin aiemmin?", category: 'itsetunto' },
    { id: 5, text: "Tunnetko olevasi 'liian huono' työhösi?", category: 'itsetunto' },

    // BLOKKI B: Todellisuuden vääristyminen (Gaslighting)
    { id: 6, text: "Onko sinulle sanottu 'en ole koskaan sanonut tuota' (vaikka sanoi)?", category: 'todellisuus' },
    { id: 7, text: "Ovatko muut kyseenalaistaneet muistisi ('oletko varma?')?", category: 'todellisuus' },
    { id: 8, text: "Onko sinulle sanottu 'älä ota niin raskaasti' / 'se oli vitsi'?", category: 'todellisuus' },
    { id: 9, text: "Tunnetko että 'hulluksi' tuleminen on mahdollista?", category: 'todellisuus' },
    { id: 10, text: "Kirjaatko asioita ylös koska et luota muistiisi?", category: 'todellisuus' },

    // BLOKKI C: Eristyneisyys
    { id: 11, text: "Jäätkö usein pois palavereista (jossa muut ovat)?", category: 'eristyksissä' },
    { id: 12, text: "Huomaatko ettei sinulle puhuta kahvitauolla?", category: 'eristyksissä' },
    { id: 13, text: "Tuntuuko että sinusta puhutaan selän takana?", category: 'eristyksissä' },
    { id: 14, text: "Oletko menettänyt ystäviä/tukijoita työpaikalla?", category: 'eristyksissä' },
    { id: 15, text: "Vältätkö sosiaalisia tilanteita työssä?", category: 'eristyksissä' },

    // BLOKKI D: Fyysiset oireet
    { id: 16, text: "Heräiletkö öisin ajatellen työtä?", category: 'fyysiset' },
    { id: 17, text: "Onko sinulla vatsavaivoja ennen työtä?", category: 'fyysiset' },
    { id: 18, text: "Tuntuuko että sydän hakkaa palavereissa?", category: 'fyysiset' },
    { id: 19, text: "Oletko ollut useamminkin kipeänä tänä vuonna?", category: 'fyysiset' },
    { id: 20, text: "Käytätkö alkoholia/lääkkeitä selvitäksesi työpäivän paineesta?", category: 'fyysiset' },

    // BLOKKI E: Käyttäytymisen muutos
    { id: 21, text: "Oletko vetäytynyt sosiaalisesti (työn ulkopuolella)?", category: 'käyttäytyminen' },
    { id: 22, text: "Itketkö usein ilman selvää syytä?", category: 'käyttäytyminen' },
    { id: 23, text: "Ajatteletko irtisanoutumista päivittäin?", category: 'käyttäytyminen' },
    { id: 24, text: "Pelkäätkö maanantaiaamuja?", category: 'käyttäytyminen' },
    { id: 25, text: "Tunnetko että 'en ole enää oma itseni'?", category: 'käyttäytyminen' },
];

export const getRiskLevel = (score: number) => {
    if (score <= 2) return {
        key: 'stable',
        level: "Vakaa tilanne",
        color: "text-green-600",
        description: "Kokemuksesi viittaavat tällä hetkellä vakaaseen työtilanteeseen."
    };
    if (score <= 6) return {
        key: 'mild',
        level: "Lievä huomio",
        color: "text-emerald-600",
        description: "Joitakin epävarmuuden merkkejä on ilmassa. Seuraa tilannetta ja luota vaistoosi."
    };
    if (score <= 11) return {
        key: 'warning',
        level: "Varoitus",
        color: "text-yellow-600",
        description: "Hälytysmerkit ovat selkeitä. Tilanne voi eskaloitua, jos siihen ei puututa ajoissa."
    };
    if (score <= 16) return {
        key: 'moderate',
        level: "Kohonnut riski",
        color: "text-orange-600",
        description: "Merkit viittaavat toistuvaan epäasialliseen kohteluun. Älä jää yksin näiden ajatusten kanssa."
    };
    if (score <= 21) return {
        key: 'severe',
        level: "Vakava riski",
        color: "text-red-500",
        description: "Tämä on vakava tilanne. Kokemasi vastaa systemaattista kiusaamista. Suosittelemme ulkopuolista apua."
    };
    return {
        key: 'critical',
        level: "Kriittinen hätätilanne",
        color: "text-red-700",
        description: "Tämä on kriittinen hätätilanne työkuntosi kannalta. Hae apua välittömästi."
    };
};
