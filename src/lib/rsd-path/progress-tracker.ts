import {
    RSDLevel,
    ProgressData,
    IntensityRecord,
    WeeklyStats,
    Prediction,
    StrengthCard
} from './types';

const STORAGE_KEY = 'rsd_path_progress';
const RETENTION_DAYS = 90;

export class RSDProgressTracker {
    /**
     * Load progress data from localStorage
     */
    loadProgress(): ProgressData {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                return this.getEmptyProgress();
            }

            const parsed = JSON.parse(stored) as ProgressData;
            // Clean old data based on retention policy
            return this.cleanOldData(parsed);
        } catch (error) {
            console.error('Failed to load RSD progress:', error);
            return this.getEmptyProgress();
        }
    }

    /**
     * Save completed session
     */
    saveCompletedSession(
        level: RSDLevel,
        intensityBefore: number,
        intensityAfter: number,
        scenario: string
    ): void {
        const progress = this.loadProgress();

        const record: IntensityRecord = {
            timestamp: Date.now(),
            level,
            before: intensityBefore,
            after: intensityAfter,
            drop: intensityBefore - intensityAfter,
            scenario
        };

        // Add to history
        progress.intensityHistory.push(record);

        // Mark level as completed if not already
        if (!progress.completedLevels.includes(level)) {
            progress.completedLevels.push(level);
        }

        // Update last accessed time
        progress.lastAccessedLevelData[level] = Date.now();
        progress.currentLevel = level;

        this.saveProgress(progress);
    }

    /**
     * Add power statement
     */
    addPowerStatement(level: RSDLevel, statement: string): void {
        const progress = this.loadProgress();

        // Avoid duplicates
        if (!progress.powerStatements.includes(statement)) {
            progress.powerStatements.push(statement);
            this.saveProgress(progress);
        }
    }

    /**
     * Add prediction (Level 4)
     */
    addPrediction(
        fear: string,
        confidence: number,
        followUpHours: number
    ): string {
        const progress = this.loadProgress();

        const prediction: Prediction = {
            id: `pred_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: Date.now(),
            fear,
            confidence,
            followUpHours,
            followUpTimestamp: Date.now() + (followUpHours * 60 * 60 * 1000),
            outcome: null
        };

        progress.predictions.push(prediction);
        this.saveProgress(progress);

        return prediction.id;
    }

    /**
     * Update prediction outcome
     */
    updatePredictionOutcome(
        predictionId: string,
        outcome: 'not_realized' | 'partial' | 'realized'
    ): void {
        const progress = this.loadProgress();
        const prediction = progress.predictions.find(p => p.id === predictionId);

        if (prediction) {
            prediction.outcome = outcome;
            prediction.outcomeTimestamp = Date.now();
            this.saveProgress(progress);
        }
    }

    /**
     * Add strength card (Level 5)
     */
    addStrengthCard(strengthId: string, cardText: string, customText?: string): void {
        const progress = this.loadProgress();

        const card: StrengthCard = {
            id: `card_${Date.now()}`,
            timestamp: Date.now(),
            strengthId,
            cardText,
            customText
        };

        progress.strengthCards.push(card);
        this.saveProgress(progress);
    }

    /**
     * Get weekly statistics
     */
    getWeeklyStats(): WeeklyStats {
        const progress = this.loadProgress();
        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);

        const recentSessions = progress.intensityHistory.filter(
            r => r.timestamp >= oneWeekAgo
        );

        // Calculate average intensity drop
        const totalDrop = recentSessions.reduce((sum, r) => sum + r.drop, 0);
        const avgDrop = recentSessions.length > 0 ? totalDrop / recentSessions.length : 0;

        // Calculate fear realization rate
        const recentPredictions = progress.predictions.filter(
            p => p.timestamp >= oneWeekAgo && p.outcome !== null
        );
        const realizedCount = recentPredictions.filter(
            p => p.outcome === 'realized' || p.outcome === 'partial'
        ).length;
        const fearRate = recentPredictions.length > 0
            ? realizedCount / recentPredictions.length
            : 0;

        // Find most used level
        const levelCounts: Record<RSDLevel, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        recentSessions.forEach(r => levelCounts[r.level]++);
        const levelKey = Object.entries(levelCounts)
            .sort(([, a], [, b]) => b - a)[0]?.[0] || null;
        const mostUsedLevel = levelKey ? parseInt(levelKey) as RSDLevel : null;

        return {
            completedSessions: recentSessions.length,
            averageIntensityDrop: Math.round(avgDrop * 10) / 10, // Round to 1 decimal
            fearRealizationRate: fearRate,
            totalPredictions: recentPredictions.length,
            realizedPredictions: realizedCount,
            mostUsedLevel,
            powerStatementsCollected: progress.powerStatements.length
        };
    }

    /**
     * Export all data as JSON
     */
    exportData(): string {
        const progress = this.loadProgress();
        return JSON.stringify(progress, null, 2);
    }

    /**
     * Clear all data (GDPR compliance)
     */
    clearAllData(): void {
        localStorage.removeItem(STORAGE_KEY);
    }

    /**
     * Get predictions that need follow-up
     */
    getPendingFollowUps(): Prediction[] {
        const progress = this.loadProgress();
        const now = Date.now();

        return progress.predictions.filter(
            p => p.outcome === null && p.followUpTimestamp <= now
        );
    }

    // Private methods

    private getEmptyProgress(): ProgressData {
        return {
            currentLevel: null,
            completedLevels: [],
            intensityHistory: [],
            powerStatements: [],
            lastAccessedLevelData: {} as Record<RSDLevel, number>,
            predictions: [],
            strengthCards: []
        };
    }

    private saveProgress(progress: ProgressData): void {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        } catch (error) {
            console.error('Failed to save RSD progress:', error);
        }
    }

    private cleanOldData(progress: ProgressData): ProgressData {
        const cutoffTime = Date.now() - (RETENTION_DAYS * 24 * 60 * 60 * 1000);

        return {
            ...progress,
            intensityHistory: progress.intensityHistory.filter(r => r.timestamp >= cutoffTime),
            predictions: progress.predictions.filter(p => p.timestamp >= cutoffTime),
            strengthCards: progress.strengthCards.filter(c => c.timestamp >= cutoffTime)
        };
    }
}
