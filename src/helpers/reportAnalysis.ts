import { TimelineEvent } from "@/types";

export interface ReportStats {
    totalEvents: number;
    firstEventDate: string | null;
    lastEventDate: string | null;
    durationDays: number;
    avgSeverity: number;
    commonTypes: string[];
    mostAffectedEmotion: string;
    eventsByMonth: Record<string, number>;
}

export function analyzeEvents(events: TimelineEvent[]): ReportStats {
    if (events.length === 0) {
        return {
            totalEvents: 0,
            firstEventDate: null,
            lastEventDate: null,
            durationDays: 0,
            avgSeverity: 0,
            commonTypes: [],
            mostAffectedEmotion: "neutral",
            eventsByMonth: {}
        };
    }

    // Sort by date ascending
    const sorted = [...events].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    const first = new Date(sorted[0].timestamp);
    const last = new Date(sorted[sorted.length - 1].timestamp);
    const durationTime = last.getTime() - first.getTime();
    const durationDays = Math.ceil(durationTime / (1000 * 3600 * 24));

    // Severity
    const totalSeverity = events.reduce((sum, e) => sum + (e.severity || 0), 0);
    const avgSeverity = totalSeverity / events.length;

    // Types frequency
    const typeCounts: Record<string, number> = {};
    events.forEach(e => {
        e.bullyingTypes?.forEach(t => {
            typeCounts[t] = (typeCounts[t] || 0) + 1;
        });
    });
    const commonTypes = Object.entries(typeCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([t]) => t);

    // Emotion frequency
    const emotionCounts: Record<string, number> = {};
    events.forEach(e => {
        emotionCounts[e.emotion] = (emotionCounts[e.emotion] || 0) + 1;
    });
    const mostAffectedEmotion = Object.entries(emotionCounts)
        .sort(([, a], [, b]) => b - a)[0]?.[0] || "neutral";

    // Monthly distribution
    const eventsByMonth: Record<string, number> = {};
    events.forEach(e => {
        const d = new Date(e.timestamp);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        eventsByMonth[key] = (eventsByMonth[key] || 0) + 1;
    });

    return {
        totalEvents: events.length,
        firstEventDate: first.toLocaleDateString("fi-FI"),
        lastEventDate: last.toLocaleDateString("fi-FI"),
        durationDays: durationDays === 0 ? 1 : durationDays, // Min 1 day
        avgSeverity: parseFloat(avgSeverity.toFixed(1)),
        commonTypes,
        mostAffectedEmotion,
        eventsByMonth
    };
}

export function generateSummaryChecklist(stats: ReportStats): string[] {
    const list = [];

    if (stats.durationDays > 180) {
        list.push("report.analysis.checklist.long_duration");
    }
    if (stats.avgSeverity > 7) {
        list.push("report.analysis.checklist.high_severity");
    }
    if (stats.totalEvents > 10 && stats.durationDays < 30) {
        list.push("report.analysis.checklist.high_frequency");
    }
    if (stats.commonTypes.includes("work_limitation")) {
        list.push("report.analysis.checklist.work_limitation");
    }

    return list;
}
