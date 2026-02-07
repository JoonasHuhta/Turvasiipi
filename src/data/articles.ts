/**
 * Article data management for the Ajattelu (Thinking) section
 * 
 * To add a new article:
 * 1. Add article metadata to the `articles` array
 * 2. Create corresponding article content file (future: MDX support)
 */

export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    publishedDate: string; // ISO format: "2024-02-06"
    readTime: string; // e.g., "5 min"
    tags: string[]; // e.g., ["RSD", "Kiusaaminen", "ADHD"]
    featured?: boolean;
    author?: string;
    coverImage?: string; // e.g., "/images/articles/filename.png"
    series?: {
        name: string;
        part: number;
        totalParts: number;
    };
}

/**
 * All articles in chronological order (newest first)
 * User will add articles here as they write them
 */
export const articles: Article[] = [
    {
        id: "article-006",
        slug: "kiusaamisen-lukutaito-osa-5",
        title: "Miksi kiusattu usein lähtee – ja miten kierteen voi katkaista ennen sitä",
        excerpt: "Kun järjestelmä ei toimi, milloin eskalaatio on välttämätöntä? Miksi lähteminen ei ole epäonnistuminen – mutta hiljainen lähtö on järjestelmän voitto.",
        publishedDate: "2026-02-07",
        readTime: "7 min",
        tags: ["Kiusaamisen lukutaito", "Eskalaatio", "Työturvallisuus"],
        featured: false,
        series: {
            name: "Kiusaamisen lukutaito",
            part: 5,
            totalParts: 5,
        },
    },
    {
        id: "article-005",
        slug: "kiusaamisen-lukutaito-osa-4",
        title: "Miksi muisti ei riitä – ja dokumentointi muuttaa kaiken",
        excerpt: "Työelämässä asiat ratkaistaan sen perusteella, mitä voidaan näyttää toteen. Dokumentointi ei ole kyttäämistä – se on turvaa.",
        publishedDate: "2026-02-05",
        readTime: "6 min",
        tags: ["Kiusaamisen lukutaito", "Dokumentointi", "Todistaminen"],
        featured: false,
        series: {
            name: "Kiusaamisen lukutaito",
            part: 4,
            totalParts: 5,
        },
    },
    {
        id: "article-004",
        slug: "kiusaamisen-lukutaito-osa-3",
        title: "Kun kiusaaminen pukeutuu hyväksyttävään muotoon",
        excerpt: "Yksi syy siihen, miksi kiusaaminen jää tunnistamatta, on että se ei näytä kiusaamiselta. Se näyttää palautteelta, huumorilta, tehokkuudelta.",
        publishedDate: "2026-02-03",
        readTime: "8 min",
        tags: ["Kiusaamisen lukutaito", "Naamioitu kiusaaminen", "Työelämä"],
        featured: false,
        series: {
            name: "Kiusaamisen lukutaito",
            part: 3,
            totalParts: 5,
        },
    },
    {
        id: "article-003",
        slug: "kiusaamisen-lukutaito-osa-2",
        title: "Kolmio, jossa kukaan ei näe kokonaisuutta",
        excerpt: "Kiusaaminen ei ole kahden ihmisen välinen ongelma. Se on kolmen roolin muodostama järjestelmä: kiusaaja, kiusattu ja sivullinen.",
        publishedDate: "2026-02-01",
        readTime: "6 min",
        tags: ["Kiusaamisen lukutaito", "Dynamiikka", "Roolit"],
        featured: false,
        series: {
            name: "Kiusaamisen lukutaito",
            part: 2,
            totalParts: 5,
        },
    },
    {
        id: "article-002",
        slug: "kiusaamisen-lukutaito-osa-1",
        title: "Miksi kiusattu lähtee – ja miksi se ei ole ratkaisu",
        excerpt: "Miksi ongelma ei koskaan lähde – vaan ihminen lähtee? Tämä sarja käsittelee kiusaamisen lukutaitoa: miten tunnistaa tilanne ajoissa ja miten toimia ennen kuin terveys hajoaa.",
        publishedDate: "2026-01-30",
        readTime: "5 min",
        tags: ["Kiusaamisen lukutaito", "Tunnistaminen", "Järjestelmä"],
        featured: true,
        coverImage: "/images/articles/kiusaamisen-lukutaito.svg",
        series: {
            name: "Kiusaamisen lukutaito",
            part: 1,
            totalParts: 5,
        },
    },
    {
        id: "article-001",
        slug: "kun-tyoyhteiso-sairastuu",
        title: "Kun työyhteisö sairastuu",
        excerpt: "Miksi työpaikkakiusaamista selitetään – eikä pysäytetä. Kulmakiviartikkeli siitä, miksi terve organisaatio reagoi uhkiin ja sairas organisaatio selittää ne pois.",
        publishedDate: "2026-01-28",
        readTime: "3 min",
        tags: ["Organisaatiokulttuuri", "Työpaikkakiusaaminen", "Johtaminen"],
        featured: true,
    },
];

/**
 * Get article by slug
 */
export function getArticleBySlug(slug: string): Article | undefined {
    return articles.find((article) => article.slug === slug);
}

/**
 * Get all unique tags from articles
 */
export function getAllTags(): string[] {
    const tags = new Set<string>();
    articles.forEach((article) => {
        article.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
}

/**
 * Get articles by tag
 */
export function getArticlesByTag(tag: string): Article[] {
    return articles.filter((article) => article.tags.includes(tag));
}

/**
 * Get featured articles
 */
export function getFeaturedArticles(): Article[] {
    return articles.filter((article) => article.featured);
}
