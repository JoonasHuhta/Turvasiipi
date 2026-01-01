/**
 * Työelämän Totuuskartta - Logiikka
 * Laskee SafetyScore-arvot anonyymien raporttien perusteella.
 */

export interface RawReport {
    timestamp: string;
    severity: number; // 1-10
    city: string;
    industry: string;
    type: string;
}

export interface CalculatedSafety {
    score: number; // 0-10
    color: "green" | "yellow" | "red";
    label: string;
    recentCount: number;
    topIssues: string[];
}

/**
 * Laskee SafetyScoren algoritmin mukaan:
 * 1. Recency (Tuoreus): Viimeisen 30pv raportit 100%, 30-90pv 50%, >90pv 10%
 * 2. Severity (Vakavuus): Korkea vakavuus laskee pisteitä eksponentiaalisesti.
 * 3. Volume Adjustment (Määrä): Vähäinen data on epävarmaa.
 */
export function calculateSafetyScore(reports: RawReport[]): CalculatedSafety {
    if (reports.length === 0) {
        return { score: 10, color: "green", label: "Ei huomioita", recentCount: 0, topIssues: [] };
    }

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    let totalWeight = 0;
    let weightedSeveritySum = 0;
    let recentCount = 0;

    reports.forEach(r => {
        const rDate = new Date(r.timestamp);
        let timeWeight = 0.1; // Base weight for old reports

        if (rDate > thirtyDaysAgo) {
            timeWeight = 1.0;
            recentCount++;
        } else if (rDate > ninetyDaysAgo) {
            timeWeight = 0.5;
        }

        // Severity 1-10. Normalizing it so high severity (10) results in high penalty.
        // Score is 10 - average_penalty
        totalWeight += timeWeight;
        weightedSeveritySum += (r.severity * timeWeight);
    });

    const avgSeverity = weightedSeveritySum / totalWeight;

    // Safety Score = 10 - (weighted average severity)
    // Ensure score stays within 0-10
    let score = Math.max(0, Math.min(10, 10 - (avgSeverity - 1))); // Offset by 1 so severity 1 is 'perfect'

    // Volume penalty: If less than 5 reports, lean towards neutral (yellow/green)
    if (reports.length < 5) {
        score = (score + 10) / 2; // Pull towards 10 (neutral/good) when data is sparse
    }

    let color: "green" | "yellow" | "red" = "green";
    let label = "Turvallinen satama";

    if (score < 5) {
        color = "red";
        label = "Myrskyvaroitus";
    } else if (score < 8) {
        color = "yellow";
        label = "Huomiota vaativa";
    }

    // Find top issues
    const issueCounts: Record<string, number> = {};
    reports.forEach(r => {
        issueCounts[r.type] = (issueCounts[r.type] || 0) + 1;
    });

    const topIssues = Object.entries(issueCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([type]) => type);

    return {
        score: parseFloat(score.toFixed(1)),
        color,
        label,
        recentCount,
        topIssues
    };
}

// Mock Data generation for testing
export const getMockReports = (city: string, industry?: string): RawReport[] => {
    const reports: RawReport[] = [];
    const count = Math.floor(Math.random() * 50) + 5;

    const types = ["Ulkopuolelle jättäminen", "Sanallinen häirintä", "Aseman väärinkäyttö", "Esimiespaine"];

    for (let i = 0; i < count; i++) {
        const daysAgo = Math.floor(Math.random() * 120);
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);

        reports.push({
            timestamp: date.toISOString(),
            severity: Math.floor(Math.random() * 8) + 2,
            city,
            industry: industry || "Sote",
            type: types[Math.floor(Math.random() * types.length)]
        });
    }
    return reports;
};
