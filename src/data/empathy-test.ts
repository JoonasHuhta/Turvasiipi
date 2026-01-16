export interface EmpathyQuestion {
    id: number;
    text: string;
    category: 'cognitive' | 'affective' | 'moral';
}

export const empathyQuestions: EmpathyQuestion[] = [
    // Cognitive (Understanding perspective)
    { id: 1, category: 'cognitive', text: 'Ymmärrän yleensä helposti, miksi joku on jostain asiasta tuohtunut.' },
    { id: 2, category: 'cognitive', text: 'Pystyn usein ennakoimaan, miten työkaverini reagoi ehdotukseeni.' },
    { id: 3, category: 'cognitive', text: 'Minun on helppo asettua toisen asemaan, vaikka olisin eri mieltä.' },
    { id: 4, category: 'cognitive', text: 'Huomaan nopeasti, jos joku teeskentelee olevansa iloinen, vaikka ei ole.' },

    // Affective (Feeling with others)
    { id: 5, category: 'affective', text: 'Kun näen jonkun kärsivän, tunnen pahan olon itsekin.' },
    { id: 6, category: 'affective', text: 'Muiden ihmisten innostus tarttuu minuun helposti.' },
    { id: 7, category: 'affective', text: 'Eläydyn voimakkaasti elokuvien ja kirjojen hahmojen kohtaloihin.' },
    { id: 8, category: 'affective', text: 'Minun on vaikea pysyä rauhallisena, jos läheiselläni on vaikeaa.' },

    // Moral (Acting on empathy)
    { id: 9, category: 'moral', text: 'Koen velvollisuudekseni puuttua peliin, jos näen jonkun joutuvan epäoikeudenmukaisesti kohdelluksi.' },
    { id: 10, category: 'moral', text: 'Olen valmis siirtämään omat tehtäväni sivuun auttaakseni ahdingossa olevaa työkaveria.' },
    { id: 11, category: 'moral', text: 'Oikeudenmukaisuus on minulle tärkeämpi arvo kuin säännöistä kiinni pitäminen.' },
    { id: 12, category: 'moral', text: 'En voi katsoa sivusta, jos heikompaa syrjitään.' }
];

export type EmpathyProfile = {
    title: string;
    description: string;
    icon: string;
};

export const getEmpathyProfile = (scores: { cognitive: number, affective: number, moral: number }): EmpathyProfile => {
    const total = scores.cognitive + scores.affective + scores.moral;

    if (total >= 42) return {
        title: "Syväymmärtävä Auttaja",
        description: "Olet harvinaisen korkean empatian omaava henkilö. Tunnet muiden tuskan, ymmärrät sen syyt ja olet valmis toimimaan oikeudenmukaisuuden puolesta. Olet työyhteisön todellinen turvasatama.",
        icon: "🌟"
    };

    if (total <= 18) return {
        title: "Vieras Ulkopuolinen",
        description: "Sinun on tällä hetkellä vaikea tavoittaa muiden tunteita tai nähdä heidän näkökulmiaan. Tämä voi johtua stressistä, suojautumisesta tai yksinkertaisesti harjoituksen puutteesta. Turvasiipi auttaa sinua rakentamaan siltoja muihin.",
        icon: "🌑"
    };

    if (scores.moral >= 14) return {
        title: "Oikeudenmukaisuuden Puolustaja",
        description: "Moraalinen pääomasi on vahva. Ehkä et aina tunne muiden tunteita omassa kehossasi, mutta tiedät mikä on oikein ja olet valmis seisomaan sen takana.",
        icon: "🛡️"
    };

    if (scores.cognitive >= 14) return {
        title: "Analyyttinen Tarkkailija",
        description: "Ymmärrät ihmisten välisiä suhteita ja dynamiikkaa erinomaisesti järjellä. Pystyt näkemään tilanteet useista näkökulmista, mikä tekee sinusta hyvän sovittelijan.",
        icon: "🔍"
    };

    if (scores.affective >= 14) return {
        title: "Tunteiden Tulkki",
        description: "Imet muiden tunteita kuin sieni. Olet herkkä aistimaan ilmapiirin ja muiden voinnin. Muista suojata omaa jaksamistasi, sillä muiden murheet voivat kuormittaa sinua.",
        icon: "💚"
    };

    return {
        title: "Kasvava Empaatti",
        description: "Empatiasi on orastavalla tasolla. Tunnet välillä piston sydämessäsi tai ymmärrät toisen mieltä, mutta tarvitset vielä harjoitusta ja rohkeutta muuttaa nämä tunteet selkeäksi toiminnaksi.",
        icon: "🌱"
    };
};
