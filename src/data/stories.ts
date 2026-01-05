export type StoryCategory =
    | "Sote-ala"
    | "IT ja teknologia"
    | "Opetus ja koulutus"
    | "Toimistotyö ja hallinto"
    | "Ravintola ja kauppa"
    | "Teollisuus ja rakentaminen"
    | "Luova ala"
    | "Neuromoninaisuus"
    | "Muut";

export interface Story {
    id: string; // generated, e.g. "story-1"
    date: string; // YYYY-MM-DD
    title: string;
    category: StoryCategory;
    text: string;
    author?: string; // Optional nickname
    likes?: number; // Optional base count for hearts/stars
    views?: number; // Optional base count for views
}

export const STORIES: Story[] = [
    {
        id: "story-1",
        date: "2026-01-05",
        category: "Opetus ja koulutus",
        title: "Hiljaisuus on kallis hinta",
        text: `Tapahtumista on jo useita vuosia aikaa. Mutta olen vasta viime aikoina pysähtynyt eri tavalla miettimään, miten helposti työyhteisön todellisuus voi vääristyä ja jäädä limboon. Olen seurannut vierestä ja kokenut nahoissani, kuinka pienistä asioista rakennetaan suuria ja pelottavia tarinoita, joilla ei ole enää mitään tekemistä totuuden kanssa.

Olen nähnyt, miten yksi ihminen voi ottaa oikeuden omiin käsiinsä ja päättää, kuka sopii joukkoon ja kuka ei. On ollut pysäyttävää huomata, miten taitavasti manipulointi voi toimia: totuutta venytetään, syyllisyyttä jaetaan ja vastapuoli vaiennetaan huutamalla tai sivuuttamalla. Mutta kaikkein eniten olen ihmetellyt sitä, miksi me muut – ja erityisesti johto – usein vain katsomme vierestä. Miksi valitsemme helpoimman tien ja odotamme, että aika tai eläköityminen tai että kiusatun hidas savustaminen hoitaa ongelman puolestamme ennen pitkää?

Omat oppituntini tässä kaikessa ovat olleet kipeitä. Opin, miltä tuntuu tulla kyseenalaistetuksi ammattilaisena vain siksi, että joku on levittänyt perättömiä huhuja selkäni takana. Opin myös sen, että ahdistunut ja aikaansaamaton johto saattaa suojella kiusaajaa välttääkseen konfliktin, vaikka se tarkoittaisi yhden tai useamman työntekijän uhraamista.

Hiljaisuus on kyllä kallis hinta rauhasta. Tai itse asisassa sillä ei saavuta mitään. Piinassa ja pinteessä sitä miettii, myrkytänkö ilmapiirin, jos avaan suuni vääryyttä nähdessäni? Vai myrkkyykö meidän kaikkien mieli juuri siitä, ettemme sano mitään? Syyllisyys siitä, ettei puutu henkiseen väkivaltaan, jättää meihin jokaiseen kipeitä jälkiä...

Väärinkäytösten määrä voi olla häkellyttävä, ja sen kaiken voi joskus nähdä vasta jälkikäteen, joskus vasta vuosien jälkeen. Nyt kun olen ottanut etäisyyttä ja alkanut puhua asioista niiden oikeilla nimillä, toipumiseni on alkanut, kun oikea rauha ja turva on laskeutunut. Ennen kaikkea käsitykseni itsestäni on selkiytynyt. Prosessi on ollut eri vaiheissa rytinää ja syöksyä, mutta kaikki se ilmeisesti kuuluu asiaan matkalla kohti parempaa oloa. Olen oppinut luottamaan jälleen omaan havaintokykyyni ja intuitiooni. Enää en suostu kantamaan muiden vääristämiä tarinoita mukanani. Minä uskallan puuttua ja kannustan siihen nykyään myös muitakin.`,
        author: "Molzii",
        likes: 0,
        views: 0
    }
];

// Helper to get counts
export const getStoryCounts = () => {
    const counts: Record<string, number> = {};
    STORIES.forEach(story => {
        counts[story.category] = (counts[story.category] || 0) + 1;
    });
    return counts;
};
