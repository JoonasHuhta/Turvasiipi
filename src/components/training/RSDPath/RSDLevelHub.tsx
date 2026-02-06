'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, TrendingDown, Target, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RSDProgressTracker } from '@/lib/rsd-path/progress-tracker';
import { RSDStateMachine } from '@/lib/rsd-path/state-machine';
import { RSDLevel, UserState } from '@/lib/rsd-path/types';
import rsdConfig from '@/data/rsd-path-config.json';
import RSDLevel1 from './RSDLevel1';

interface Props {
    onExit: () => void;
}

export default function RSDLevelHub({ onExit }: Props) {
    const [tracker] = useState(() => new RSDProgressTracker());
    const [stateMachine] = useState(() => new RSDStateMachine());
    const [progress, setProgress] = useState(() => tracker.loadProgress());
    const [weeklyStats, setWeeklyStats] = useState(() => tracker.getWeeklyStats());
    const [recommendedLevel, setRecommendedLevel] = useState<RSDLevel>(1);
    const [selectedLevel, setSelectedLevel] = useState<RSDLevel | null>(null);

    useEffect(() => {
        // Reload progress when returning from level
        if (!selectedLevel) {
            const freshProgress = tracker.loadProgress();
            setProgress(freshProgress);
            setWeeklyStats(tracker.getWeeklyStats());
        }
    }, [selectedLevel, tracker]);

    useEffect(() => {
        // Determine recommended level based on current state
        // For now, default to "questioning" state
        const currentState: UserState = 'questioning';
        const recommended = stateMachine.determineRecommendedLevel(currentState, progress);
        setRecommendedLevel(recommended);

        // Check for crisis signals
        const crisisCheck = stateMachine.checkForCrisisSignals(progress);
        if (crisisCheck.isCrisis) {
            console.warn('Crisis detected:', crisisCheck.reason);
            // TODO: Show crisis prompt modal
        }
    }, [progress, stateMachine]);

    const getLevelConfig = (level: RSDLevel) => {
        return rsdConfig.modules.find(m => m.level === level);
    };

    const handleSelectLevel = (level: RSDLevel) => {
        setSelectedLevel(level);
    };

    const handleLevelComplete = () => {
        setSelectedLevel(null);
    };

    const handleLevelExit = () => {
        setSelectedLevel(null);
    };

    // If a level is selected, show that component
    if (selectedLevel === 1) {
        return <RSDLevel1 onComplete={handleLevelComplete} onExit={handleLevelExit} />;
    }

    // Otherwise show hub
    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-violet-50/30 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">

                {/* Header */}
                <div className="text-center space-y-2 md:space-y-4">
                    <Button
                        variant="ghost"
                        onClick={onExit}
                        className="mb-4"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" /> Takaisin
                    </Button>

                    <h1 className="text-3xl md:text-5xl font-serif font-black text-[#292524]">
                        RSD Valmennuspolku
                    </h1>
                    <p className="text-base md:text-lg text-[#57534E]">
                        5-tasoinen polku RSD:n hallintaan. Aloita mistä tahansa.
                    </p>
                </div>

                {/* Progress Overview */}
                <Card className="p-6 md:p-8 bg-white/80 backdrop-blur border-violet-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-[#292524]">Edistymisesi</h2>
                        <Badge variant="outline" className="text-violet-600 border-violet-300">
                            {progress.completedLevels.length} / 5
                        </Badge>
                    </div>

                    {/* Progress Dots */}
                    <div className="flex gap-3 justify-center mb-6">
                        {[1, 2, 3, 4, 5].map(level => {
                            const isCompleted = progress.completedLevels.includes(level as RSDLevel);
                            return (
                                <div
                                    key={level}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${isCompleted
                                        ? 'bg-violet-600 text-white'
                                        : 'bg-gray-200 text-gray-400'
                                        }`}
                                >
                                    {level}
                                </div>
                            );
                        })}
                    </div>

                    {/* Weekly Stats */}
                    {weeklyStats.completedSessions > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 text-emerald-600 mb-1">
                                    <TrendingDown className="w-4 h-4" />
                                    <span className="text-2xl font-bold">
                                        {weeklyStats.averageIntensityDrop.toFixed(1)}
                                    </span>
                                </div>
                                <p className="text-xs text-[#78716C]">Tunne laski keskim.</p>
                            </div>

                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 text-violet-600 mb-1">
                                    <Target className="w-4 h-4" />
                                    <span className="text-2xl font-bold">
                                        {weeklyStats.completedSessions}
                                    </span>
                                </div>
                                <p className="text-xs text-[#78716C]">Harjoitusta viikolla</p>
                            </div>

                            <div className="text-center col-span-2 md:col-span-1">
                                <div className="flex items-center justify-center gap-2 text-amber-600 mb-1">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="text-2xl font-bold">
                                        {weeklyStats.powerStatementsCollected}
                                    </span>
                                </div>
                                <p className="text-xs text-[#78716C]">Voimavaralausetta</p>
                            </div>
                        </div>
                    )}
                </Card>

                {/* Recommendation Card */}
                <Card className="p-6 bg-gradient-to-br from-violet-100 to-violet-50 border-violet-300">
                    <div className="flex items-start gap-4">
                        <div className="bg-violet-600 text-white p-3 rounded-xl">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-[#292524] mb-1">
                                Suositus sinulle tänään
                            </h3>
                            <p className="text-sm text-[#57534E] mb-3">
                                {getLevelConfig(recommendedLevel)?.title}
                            </p>
                            <Button
                                onClick={() => handleSelectLevel(recommendedLevel)}
                                size="sm"
                                className="bg-violet-600 hover:bg-violet-700 text-white"
                            >
                                Aloita <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Level Cards */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-[#292524]">Kaikki tasot</h2>

                    {rsdConfig.modules.map((levelConfig) => {
                        const isCompleted = progress.completedLevels.includes(levelConfig.level as RSDLevel);
                        const isRecommended = levelConfig.level === recommendedLevel;

                        return (
                            <motion.div
                                key={levelConfig.level}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Card
                                    className={`p-6 cursor-pointer transition-all ${isRecommended
                                        ? 'border-2 border-violet-500 bg-violet-50/50'
                                        : 'border-[#E7E5E4] hover:border-violet-200'
                                        } ${isCompleted ? 'bg-emerald-50/30' : 'bg-white'}`}
                                    onClick={() => handleSelectLevel(levelConfig.level as RSDLevel)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant={isCompleted ? 'default' : 'outline'} className={
                                                    isCompleted ? 'bg-emerald-600' : 'border-violet-300 text-violet-700'
                                                }>
                                                    Taso {levelConfig.level}
                                                </Badge>
                                                {isRecommended && (
                                                    <Badge variant="outline" className="border-violet-500 text-violet-700">
                                                        Suositeltu
                                                    </Badge>
                                                )}
                                            </div>
                                            <h3 className="text-lg font-bold text-[#292524] mb-1">
                                                {levelConfig.title}
                                            </h3>
                                            <p className="text-sm text-[#57534E] mb-2">
                                                {levelConfig.subtitle}
                                            </p>
                                            <p className="text-xs text-[#78716C]">
                                                ⏱️ {levelConfig.estimatedDuration}
                                            </p>
                                        </div>

                                        <ArrowRight className={`w-5 h-5 ${isRecommended ? 'text-violet-600' : 'text-[#78716C]'
                                            }`} />
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Data Controls */}
                <div className="flex gap-4 justify-center pt-6 border-t border-[#E7E5E4]">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            const data = tracker.exportData();
                            const blob = new Blob([data], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `rsd-data-${new Date().toISOString().split('T')[0]}.json`;
                            a.click();
                        }}
                        className="border-[#E7E5E4] text-[#57534E]"
                    >
                        Lataa tietoni
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            if (confirm('Haluatko varmasti poistaa kaikki RSD-tiedot? Tätä ei voi perua.')) {
                                tracker.clearAllData();
                                setProgress(tracker.loadProgress());
                                setWeeklyStats(tracker.getWeeklyStats());
                            }
                        }}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                        Poista kaikki tiedot
                    </Button>
                </div>

            </div>
        </div>
    );
}
