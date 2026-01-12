import { TimelineEvent } from "@/types";
import { addDays, isAfter, subDays } from "date-fns";

export type PatternType = 'repetition' | 'escalation' | 'isolation';

export interface Insight {
    id: string;
    type: PatternType;
    title: string;
    description: string;
    level: 'warning' | 'info';
    relatedEventIds: string[];
}

export function analyzePatterns(events: TimelineEvent[]): Insight[] {
    const insights: Insight[] = [];
    const now = new Date();
    const thirtyDaysAgo = subDays(now, 30);

    // 1. REPETITION: Same tactic 3+ times in 30 days
    const recentEvents = events.filter(e => isAfter(new Date(e.timestamp), thirtyDaysAgo));
    const tacticCounts: Record<string, string[]> = {};

    recentEvents.forEach(e => {
        if (!tacticCounts[e.title]) tacticCounts[e.title] = [];
        tacticCounts[e.title].push(e.id);
    });

    Object.entries(tacticCounts).forEach(([tactic, ids]) => {
        if (ids.length >= 3) {
            insights.push({
                id: `rep-${tactic}`,
                type: 'repetition',
                title: 'Toistuvaa toimintaa',
                description: `Olet kirjannut "${tactic}" -tapahtuman ${ids.length} kertaa viimeisen 30 päivän aikana. Tämä voi viitata systemaattiseen toimintamalliin.`,
                level: 'warning',
                relatedEventIds: ids
            });
        }
    });

    // 2. ESCALATION: Intensity trending up (last 5 events)
    if (events.length >= 3) {
        const last5 = events.slice(0, 5).reverse(); // Oldest first
        let increasingCount = 0;
        for (let i = 1; i < last5.length; i++) {
            if (last5[i].intensity > last5[i - 1].intensity) increasingCount++;
        }

        if (increasingCount >= 3) {
            insights.push({
                id: 'escalation-detected',
                type: 'escalation',
                title: 'Tilanne on kärjistymässä',
                description: 'Häirinnän intensiteetti näyttää nousevan viimeisimmissä kirjauksissa. Harkitse työsuojeluvaltuutetun puoleen kääntymistä.',
                level: 'warning',
                relatedEventIds: last5.map(e => e.id)
            });
        }
    }

    // 3. ISOLATION: 3+ social exclusion events
    const isolationEvents = events.filter(e =>
        ['Eristäminen & Ulossulkeminen', 'Ostrakismi', 'Tiedon panttaaminen'].includes(e.title)
    );

    if (isolationEvents.length >= 3) {
        insights.push({
            id: 'isolation-risk',
            type: 'isolation',
            title: 'Eristämisen riski',
            description: 'Useat kirjauksesi liittyvät ulossulkemiseen. Sosiaalinen eristäminen on vakava työpaikkakiusaamisen muoto.',
            level: 'info',
            relatedEventIds: isolationEvents.map(e => e.id).slice(0, 5) // Link mostly recent
        });
    }

    return insights;
}
