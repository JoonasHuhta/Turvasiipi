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
}

/**
 * All articles in chronological order (newest first)
 * User will add articles here as they write them
 */
export const articles: Article[] = [
    {
        id: "article-001",
        slug: "kun-tyoyhteiso-sairastuu",
        title: "Kun työyhteisö sairastuu",
        excerpt: "Miksi työpaikkakiusaamista selitetään – eikä pysäytetä. Kulmakiviartikkeli siitä, miksi terve organisaatio reagoi uhkiin ja sairas organisaatio selittää ne pois.",
        publishedDate: "2024-02-06",
        readTime: "3 min",
        tags: ["Organisaatiokulttuuri", "Työpaikkakiusaaminen", "Johtaminen"],
        featured: true,
    },
    // Example structure (commented out):
    // {
    //   id: "example-article-001",
    //   slug: "rsd-toinen-tulkinta",
    //   title: "RSD ja Toinen Tulkinta -metodi",
    //   excerpt: "Miten RSD:n aiheuttamat tulkintavirheet voi neutraloida yksinkertaisella harjoituksella.",
    //   publishedDate: "2024-02-06",
    //   readTime: "8 min",
    //   tags: ["RSD", "ADHD", "Harjoitukset"],
    //   featured: true,
    // },
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
