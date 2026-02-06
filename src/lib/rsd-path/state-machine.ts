import { RSDLevel, UserState, ProgressData, IntensityRecord } from './types';

export interface UserInteraction {
    level: RSDLevel;
    intensityBefore?: number;
    intensityAfter?: number;
    selectedAlternatives?: number[];
    completedRegulation?: boolean;
    sliderMoved?: boolean;
}

export class RSDStateMachine {
    /**
     * Determine recommended level based on user's current state and history
     */
    determineRecommendedLevel(
        currentState: UserState,
        history: ProgressData
    ): RSDLevel {
        // Priority 1: If overloaded, always recommend body regulation
        if (currentState === 'overloaded') {
            return 3;
        }

        // Priority 2: If regulating, stay with body work
        if (currentState === 'regulating') {
            return 3;
        }

        // Priority 3: Check recent intensity trends
        const recentTrend = this.getRecentIntensityTrend(history);
        if (recentTrend === 'increasing') {
            // If things are getting worse, fallback to body
            return 3;
        }

        // Priority 4: State-based recommendations
        switch (currentState) {
            case 'questioning':
                // If they've never done Level 1, start there
                if (!history.completedLevels.includes(1)) {
                    return 1;
                }
                // Otherwise cognitive defusion
                return 2;

            case 'reflecting':
                // Build evidence with prediction tracker
                return 4;

            case 'integrating':
                // Transform sensitivity into strength
                return 5;

            default:
                // New user or unclear state: start with Level 1
                if (history.completedLevels.length === 0) {
                    return 1;
                }
                // Otherwise suggest Level 2 as default
                return 2;
        }
    }

    /**
     * Check if user has met exit conditions for a level
     */
    checkExitCondition(level: RSDLevel, interaction: UserInteraction): boolean {
        switch (level) {
            case 1:
                // Must have read feedback and accepted state
                return interaction.intensityAfter !== undefined;

            case 2:
                // Must have moved the lens slider
                return interaction.sliderMoved === true;

            case 3:
                // Must have completed at least one regulation cycle
                return interaction.completedRegulation === true;

            case 4:
                // Must have made at least one prediction
                return true; // Handled by prediction tracker component

            case 5:
                // Must have created a strength card
                return true; // Handled by strength card component

            default:
                return false;
        }
    }

    /**
     * Determine if user should fallback to a different level
     */
    shouldFallback(
        level: RSDLevel,
        intensityBefore: number,
        intensityAfter: number
    ): { shouldFallback: boolean; targetLevel?: RSDLevel; message?: string } {
        const intensityChange = intensityAfter - intensityBefore;

        // If intensity INCREASED by 2+ points, fallback to body regulation
        if (intensityChange >= 2) {
            return {
                shouldFallback: true,
                targetLevel: 3,
                message: 'Pysähdytään. Siirrytään kehoon.'
            };
        }

        // If still very high (8+) after exercise, suggest body work
        if (intensityAfter >= 8 && level !== 3) {
            return {
                shouldFallback: true,
                targetLevel: 3,
                message: 'Teoria ei auta juuri nyt. Kokeillaan jotain konkreettista.'
            };
        }

        return { shouldFallback: false };
    }

    /**
     * Analyze recent intensity trends
     */
    private getRecentIntensityTrend(history: ProgressData): 'increasing' | 'decreasing' | 'stable' {
        const recentRecords = history.intensityHistory.slice(-3); // Last 3 sessions

        if (recentRecords.length < 2) {
            return 'stable';
        }

        const avgDrop = recentRecords.reduce((sum, record) => sum + record.drop, 0) / recentRecords.length;

        if (avgDrop < -1) {
            return 'increasing'; // Negative drop = intensity is increasing
        } else if (avgDrop > 1) {
            return 'decreasing';
        }

        return 'stable';
    }

    /**
     * Check for crisis signals that require intervention
     */
    checkForCrisisSignals(history: ProgressData): {
        isCrisis: boolean;
        reason?: string;
        recommendation?: string;
    } {
        // Red flag 1: Intensity increases across multiple sessions
        const recentRecords = history.intensityHistory.slice(-5);
        const increasingSessions = recentRecords.filter(r => r.drop < 0).length;

        if (increasingSessions >= 3) {
            return {
                isCrisis: true,
                reason: 'Intensiteetti nousee useissa sessioissa',
                recommendation: 'Harjoitukset eivät auta juuri nyt. Harkitse ammattilaisen tukea.'
            };
        }

        // Red flag 2: Fear realization rate very high (Level 4 data)
        const totalPredictions = history.predictions.filter(p => p.outcome !== null).length;
        const realizedPredictions = history.predictions.filter(
            p => p.outcome === 'realized' || p.outcome === 'partial'
        ).length;

        if (totalPredictions >= 5 && realizedPredictions / totalPredictions > 0.8) {
            return {
                isCrisis: true,
                reason: 'Pelot toteutuvat usein',
                recommendation: 'Tilanne vaikuttaa kuormittavalta. Ammattilainen voi auttaa.'
            };
        }

        return { isCrisis: false };
    }
}
