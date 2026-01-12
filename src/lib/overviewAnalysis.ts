import { TimelineEvent } from "@/types";
import { differenceInDays, format, subDays, startOfDay, endOfDay } from "date-fns";

export type TimeRange = '7d' | '30d' | '3mo' | 'all';

/**
 * Filter events by time range
 */
export function filterEventsByTimeRange(
    events: TimelineEvent[],
    range: TimeRange
): TimelineEvent[] {
    const now = new Date();
    let startDate: Date;

    switch (range) {
        case '7d':
            startDate = subDays(now, 7);
            break;
        case '30d':
            startDate = subDays(now, 30);
            break;
        case '3mo':
            startDate = subDays(now, 90);
            break;
        case 'all':
            return events;
    }

    return events.filter(event => {
        const eventDate = new Date(event.timestamp);
        return eventDate >= startDate && eventDate <= now;
    });
}

/**
 * Calculate overview statistics
 */
export function calculateStats(events: TimelineEvent[]) {
    if (events.length === 0) {
        return {
            totalEvents: 0,
            duration: '0 päivää',
            trendPercentage: 0,
            avgIntensity: 0
        };
    }

    // Sort by timestamp
    const sorted = [...events].sort((a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const firstEvent = new Date(sorted[0].timestamp);
    const lastEvent = new Date(sorted[sorted.length - 1].timestamp);
    const durationDays = differenceInDays(lastEvent, firstEvent);

    // Calculate trend (compare first half vs second half)
    const midpoint = Math.floor(events.length / 2);
    const firstHalf = events.slice(0, midpoint);
    const secondHalf = events.slice(midpoint);

    const firstHalfAvg = firstHalf.reduce((sum, e) => sum + (e.intensity || 3), 0) / (firstHalf.length || 1);
    const secondHalfAvg = secondHalf.reduce((sum, e) => sum + (e.intensity || 3), 0) / (secondHalf.length || 1);
    const trendPercentage = Math.round(((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100);

    // Average intensity
    const avgIntensity = events.reduce((sum, e) => sum + (e.intensity || 3), 0) / events.length;

    // Format duration
    let duration: string;
    if (durationDays === 0) {
        duration = 'Tänään';
    } else if (durationDays < 7) {
        duration = `${durationDays} päivää`;
    } else if (durationDays < 30) {
        const weeks = Math.floor(durationDays / 7);
        duration = `${weeks} viikkoa`;
    } else if (durationDays < 365) {
        const months = Math.floor(durationDays / 30);
        duration = `${months} kk`;
    } else {
        const years = Math.floor(durationDays / 365);
        duration = `${years} vuotta`;
    }

    return {
        totalEvents: events.length,
        duration,
        trendPercentage,
        avgIntensity: Math.round(avgIntensity * 10) / 10
    };
}

/**
 * Get tactic distribution for bar chart
 */
export function getTacticDistribution(events: TimelineEvent[]) {
    const counts: Record<string, number> = {};

    events.forEach(event => {
        const type = event.type || 'unknown';
        counts[type] = (counts[type] || 0) + 1;
    });

    return Object.entries(counts)
        .map(([name, count]) => ({
            name: getTacticLabel(name),
            count,
            color: getTacticColor(name)
        }))
        .sort((a, b) => b.count - a.count);
}

/**
 * Get intensity trend data for line chart
 */
export function getIntensityTrend(events: TimelineEvent[]) {
    const dailyData: Record<string, { total: number; count: number }> = {};

    events.forEach(event => {
        const date = format(new Date(event.timestamp), 'yyyy-MM-dd');
        if (!dailyData[date]) {
            dailyData[date] = { total: 0, count: 0 };
        }
        dailyData[date].total += event.intensity || 3;
        dailyData[date].count += 1;
    });

    return Object.entries(dailyData)
        .map(([date, data]) => ({
            date,
            avgIntensity: Math.round((data.total / data.count) * 10) / 10
        }))
        .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Get heatmap data for calendar visualization
 */
export function getHeatmapData(events: TimelineEvent[], range: TimeRange) {
    const now = new Date();
    let startDate: Date;

    switch (range) {
        case '7d':
            startDate = subDays(now, 7);
            break;
        case '30d':
            startDate = subDays(now, 30);
            break;
        case '3mo':
            startDate = subDays(now, 90);
            break;
        case 'all':
            startDate = events.length > 0
                ? new Date(Math.min(...events.map(e => new Date(e.timestamp).getTime())))
                : subDays(now, 90);
            break;
    }

    const dailyData: Record<string, { intensity: number; count: number; events: TimelineEvent[] }> = {};

    events.forEach(event => {
        const date = format(new Date(event.timestamp), 'yyyy-MM-dd');
        if (!dailyData[date]) {
            dailyData[date] = { intensity: 0, count: 0, events: [] };
        }
        dailyData[date].intensity += event.intensity || 3;
        dailyData[date].count += 1;
        dailyData[date].events.push(event);
    });

    return Object.entries(dailyData).map(([date, data]) => ({
        date,
        intensity: Math.round((data.intensity / data.count) * 10) / 10,
        count: data.count,
        events: data.events
    }));
}

/**
 * Generate smart insights with priority levels
 */
export function generateSmartInsights(events: TimelineEvent[]) {
    const insights: {
        priority: 'urgent' | 'warning' | 'positive';
        icon: string;
        message: string;
        action?: { label: string; href: string };
    }[] = [];

    if (events.length === 0) {
        insights.push({
            priority: 'positive',
            icon: '✅',
            message: 'Ei merkintöjä. Toivottavasti kaikki on hyvin!'
        });
        return insights;
    }

    const stats = calculateStats(events);

    // Check for urgent trend
    if (stats.trendPercentage > 30) {
        insights.push({
            priority: 'urgent',
            icon: '⚠️',
            message: `KIIREELLINEN: Intensiteetti noussut ${stats.trendPercentage}% → Hae apua nyt`,
            action: { label: 'Tukipalvelut', href: '/tuki' }
        });
    }

    // Check for high average intensity
    if (stats.avgIntensity >= 4) {
        insights.push({
            priority: 'urgent',
            icon: '🔴',
            message: 'KIIREELLINEN: Korkea keskimääräinen vakavuus → Ota yhteyttä työterveyshuoltoon',
            action: { label: 'Yhteystiedot', href: '/tuki' }
        });
    }

    // Check for repeating tactics
    const distribution = getTacticDistribution(events);
    const topTactic = distribution[0];
    if (topTactic && topTactic.count >= 3) {
        insights.push({
            priority: 'warning',
            icon: '💡',
            message: `HUOMIO: "${topTactic.name}" toistuu (${topTactic.count} kertaa) → Tutustu vastastrategioihin`,
            action: { label: 'Taktiikkapankki', href: '/taktiikat' }
        });
    }

    // Check for recent quiet period
    const recentEvents = filterEventsByTimeRange(events, '7d');
    if (recentEvents.length === 0 && events.length > 0) {
        insights.push({
            priority: 'positive',
            icon: '✅',
            message: 'POSITIIVINEN: Ei merkintöjä 7 päivään → Hyvä jakso!'
        });
    }

    // Check for high frequency
    if (stats.totalEvents > 20 && stats.duration.includes('kk')) {
        insights.push({
            priority: 'warning',
            icon: '📊',
            message: `HUOMIO: ${stats.totalEvents} tapahtumaa ${stats.duration} aikana → Systemaattinen kiusaaminen`,
            action: { label: 'Luo raportti', href: '/raportti' }
        });
    }

    return insights;
}

// Helper functions
function getTacticLabel(type: string): string {
    const labels: Record<string, string> = {
        'verbal': 'Sanallinen',
        'social': 'Sosiaalinen',
        'passive': 'Passiivinen',
        'power': 'Valta',
        'manipulative': 'Manipuloiva',
        'structural': 'Rakenteellinen',
        'quick_log': 'Pikamerkintä',
        'unknown': 'Määrittelemätön'
    };
    return labels[type] || type;
}

function getTacticColor(type: string): string {
    const colors: Record<string, string> = {
        'verbal': '#ef4444',
        'social': '#3b82f6',
        'passive': '#f59e0b',
        'power': '#8b5cf6',
        'manipulative': '#ec4899',
        'structural': '#14b8a6',
        'quick_log': '#f59e0b',
        'unknown': '#6b7280'
    };
    return colors[type] || '#6b7280';
}
