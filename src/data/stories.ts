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
}

export const STORIES: Story[] = [
    // EXAMPLE STORY (Remove or replace when you have real ones)
    /*
    {
        id: "story-1",
        date: "2026-01-05",
        category: "Start-up / IT",
        title: "Esimerkki: Hiljainen sulkeminen",
        text: "Tähän tulee varsinainen tarina. Esimerkiksi: Huomasin, että minua ei enää kutsuttu palavereihin..."
    }
    */
];

// Helper to get counts
export const getStoryCounts = () => {
    const counts: Record<string, number> = {};
    STORIES.forEach(story => {
        counts[story.category] = (counts[story.category] || 0) + 1;
    });
    return counts;
};
