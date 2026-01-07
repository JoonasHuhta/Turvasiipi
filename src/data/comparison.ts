export type ComparisonPoint = {
    title: string;
    bullying: string;
    criticism: string;
    icon: string;
};

export const comparisonData: ComparisonPoint[] = [
    {
        title: "Tavoite",
        bullying: "Nöyryyttää, hallita tai savustaa työntekijä ulos.",
        criticism: "Parantaa työn laatua tai korjata virheellinen toimintapa.",
        icon: "🎯"
    },
    {
        title: "Kohde",
        bullying: "Henkilökohtaiset ominaisuudet, persoona tai maine.",
        criticism: "Suoritus, työn tulos tai noudatettavat ohjeet.",
        icon: "👤"
    },
    {
        title: "Vuorovaikutus",
        bullying: "Yksipuolista, hyökkäävää, usein muiden edessä tai selän takana.",
        criticism: "Keskustelevaa, perusteltua ja useimmiten kahdenkeskistä.",
        icon: "💬"
    },
    {
        title: "Toistuvuus",
        bullying: "Jatkuvaa, systemaattista ja usein pitkäkestoista.",
        criticism: "Tilannekohtaista ja loppuu, kun sovittu muutos on tehty.",
        icon: "🔁"
    },
    {
        title: "Lopputulos",
        bullying: "Uupumus, itseluottamuksen menetys ja ahdistus.",
        criticism: "Selkeys odotuksista ja ammatillinen kehittyminen.",
        icon: "📈"
    }
];
