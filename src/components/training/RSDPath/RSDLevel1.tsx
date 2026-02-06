'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, CheckCircle2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { RSDProgressTracker } from '@/lib/rsd-path/progress-tracker';
import rsdConfig from '@/data/rsd-path-config.json';

interface Props {
    onComplete: () => void;
    onExit: () => void;
}

type View = 'intro' | 'vulnerability' | 'scenario' | 'reflection';

export default function RSDLevel1({ onComplete, onExit }: Props) {
    const [view, setView] = useState<View>('intro');
    const [tracker] = useState(() => new RSDProgressTracker());

    // Vulnerability checklist state
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
    const [vulnerabilityScore, setVulnerabilityScore] = useState(0);

    // Scenario state
    const [selectedAlternative, setSelectedAlternative] = useState<number | null>(null);

    // Intensity tracking
    const [intensityBefore, setIntensityBefore] = useState(5);
    const [intensityAfter, setIntensityAfter] = useState(5);

    const config = rsdConfig.modules[0]; // Level 1 config

    // Scroll to top when view changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [view]);

    // Calculate vulnerability score
    useEffect(() => {
        if (!config.vulnerabilityWidget) return;

        let score = 1.0; // Base score
        checkedItems.forEach(itemId => {
            const item = config.vulnerabilityWidget!.checklist.find(i => i.id === itemId);
            if (item) {
                score += item.weight;
            }
        });
        setVulnerabilityScore(score);
    }, [checkedItems, config]);

    const toggleChecklistItem = (itemId: string) => {
        const newChecked = new Set(checkedItems);
        if (newChecked.has(itemId)) {
            newChecked.delete(itemId);
        } else {
            newChecked.add(itemId);
        }
        setCheckedItems(newChecked);
    };

    const getVulnerabilityFeedback = () => {
        if (!config.vulnerabilityWidget) return '';

        if (vulnerabilityScore < 2) {
            return config.vulnerabilityWidget.feedback.low;
        } else if (vulnerabilityScore < 3.5) {
            return config.vulnerabilityWidget.feedback.medium;
        } else {
            return config.vulnerabilityWidget.feedback.high;
        }
    };

    const handleComplete = () => {
        // Save completed session
        tracker.saveCompletedSession(
            1,
            intensityBefore,
            intensityAfter,
            config.scenario.description
        );

        // Save power statement
        tracker.addPowerStatement(1, config.powerStatement);

        onComplete();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-violet-50/30 p-4 md:p-8">
            <div className="max-w-3xl mx-auto">

                <AnimatePresence mode="wait">

                    {/* INTRO VIEW */}
                    {view === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="space-y-6 md:space-y-8"
                        >
                            <Button
                                variant="ghost"
                                onClick={onExit}
                                className="mb-4"
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" /> Takaisin
                            </Button>

                            <div className="text-center space-y-4">
                                <Badge variant="outline" className="text-violet-600 border-violet-200 bg-violet-50">
                                    Taso 1
                                </Badge>
                                <h1 className="text-3xl md:text-4xl font-serif font-black text-[#292524]">
                                    {config.title}
                                </h1>
                                <p className="text-lg md:text-xl text-violet-600 font-medium">
                                    {config.subtitle}
                                </p>
                            </div>

                            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur border-violet-200">
                                <div className="space-y-4">
                                    <p className="text-base md:text-lg text-[#292524] leading-relaxed">
                                        {config.teaching.main}
                                    </p>

                                    <div className="bg-violet-50 border-l-4 border-violet-500 p-4 rounded-r">
                                        <p className="text-sm md:text-base text-[#57534E]">
                                            <strong className="text-violet-900">Avainkohta:</strong> {config.teaching.keyPoint}
                                        </p>
                                    </div>

                                    <p className="text-sm md:text-base text-[#57534E] italic">
                                        {config.teaching.reassurance}
                                    </p>
                                </div>
                            </Card>

                            <div className="text-center">
                                <p className="text-sm text-[#78716C] mb-4">
                                    ⏱️ Kesto: {config.estimatedDuration}
                                </p>
                                <Button
                                    onClick={() => setView('vulnerability')}
                                    size="lg"
                                    className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-8 py-6 shadow-xl shadow-violet-200/50"
                                >
                                    Aloita harjoitus <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* VULNERABILITY CHECKLIST VIEW */}
                    {view === 'vulnerability' && config.vulnerabilityWidget && (
                        <motion.div
                            key="vulnerability"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            <div className="text-center space-y-2">
                                <Badge variant="outline" className="text-violet-600 border-violet-200 bg-violet-50">
                                    Taso 1: Hermosto
                                </Badge>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#292524]">
                                    {config.vulnerabilityWidget.title}
                                </h2>
                                <p className="text-sm text-[#78716C]">Valitse kaikki jotka pätevät juuri nyt</p>
                            </div>

                            <Card className="p-6 bg-white/80">
                                <div className="space-y-3">
                                    {config.vulnerabilityWidget.checklist.map((item) => {
                                        const isChecked = checkedItems.has(item.id);
                                        return (
                                            <motion.button
                                                key={item.id}
                                                onClick={() => toggleChecklistItem(item.id)}
                                                className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${isChecked
                                                        ? 'border-violet-500 bg-violet-50'
                                                        : 'border-[#E7E5E4] bg-white hover:border-violet-200'
                                                    }`}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${isChecked ? 'border-violet-500 bg-violet-500' : 'border-[#D6D3D1]'
                                                    }`}>
                                                    {isChecked && <CheckCircle2 className="w-4 h-4 text-white" />}
                                                </div>
                                                <span className="text-sm md:text-base text-[#292524]">{item.label}</span>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </Card>

                            {/* Feedback */}
                            {checkedItems.size > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <Card className={`p-4 border-l-4 ${vulnerabilityScore < 2
                                            ? 'bg-emerald-50 border-emerald-500'
                                            : vulnerabilityScore < 3.5
                                                ? 'bg-amber-50 border-amber-500'
                                                : 'bg-red-50 border-red-500'
                                        }`}>
                                        <div className="flex items-start gap-3">
                                            <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm md:text-base text-[#292524]">
                                                {getVulnerabilityFeedback()}
                                            </p>
                                        </div>
                                    </Card>
                                </motion.div>
                            )}

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setView('intro')}
                                    className="border-[#E7E5E4]"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Takaisin
                                </Button>
                                <Button
                                    onClick={() => setView('scenario')}
                                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white rounded-full"
                                >
                                    Jatka <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* SCENARIO VIEW */}
                    {view === 'scenario' && (
                        <motion.div
                            key="scenario"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="text-center space-y-2">
                                <Badge variant="outline" className="text-violet-600 border-violet-200 bg-violet-50">
                                    Taso 1: Skenaario
                                </Badge>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#292524]">
                                    Tilanne työpaikalla
                                </h2>
                            </div>

                            {/* Intensity Before */}
                            <Card className="p-6 bg-white/80">
                                <label className="block text-sm font-medium text-[#292524] mb-3">
                                    Kuinka voimakas tunne on juuri nyt? (0 = rauhallinen, 10 = ylivoimainen)
                                </label>
                                <div className="space-y-4">
                                    <Slider
                                        value={[intensityBefore]}
                                        onValueChange={(value) => setIntensityBefore(value[0])}
                                        max={10}
                                        step={1}
                                        className="w-full"
                                    />
                                    <div className="text-center">
                                        <span className="text-3xl font-bold text-violet-600">{intensityBefore}</span>
                                        <span className="text-sm text-[#78716C] ml-2">/ 10</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Scenario */}
                            <Card className="p-6 bg-violet-50 border-violet-200">
                                <p className="text-base md:text-lg text-[#292524] mb-4">
                                    <strong>Tilanne:</strong> {config.scenario.description}
                                </p>
                                <p className="text-sm text-[#57534E] italic">
                                    <strong>Automaattinen ajatus:</strong> "{config.scenario.automaticThought}"
                                </p>
                            </Card>

                            {/* Alternatives */}
                            <div className="space-y-3">
                                <p className="text-sm font-medium text-[#292524]">
                                    Valitse yksi vaihtoehtoinen tulkinta:
                                </p>
                                {config.scenario.alternatives.map((alternative, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => setSelectedAlternative(index)}
                                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedAlternative === index
                                                ? 'border-violet-500 bg-violet-50 text-violet-900'
                                                : 'border-[#E7E5E4] bg-white hover:border-violet-200 text-[#292524]'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {alternative}
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setView('vulnerability')}
                                    className="border-[#E7E5E4]"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Takaisin
                                </Button>
                                <Button
                                    disabled={selectedAlternative === null}
                                    onClick={() => setView('reflection')}
                                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white rounded-full disabled:opacity-50"
                                >
                                    Jatka <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* REFLECTION VIEW */}
                    {view === 'reflection' && (
                        <motion.div
                            key="reflection"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="space-y-6"
                        >
                            <div className="text-center space-y-2">
                                <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                                    Taso 1: Reflektio
                                </Badge>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#292524]">
                                    Miten tunne muuttui?
                                </h2>
                            </div>

                            {/* Intensity After */}
                            <Card className="p-6 bg-white/80">
                                <label className="block text-sm font-medium text-[#292524] mb-3">
                                    Kuinka voimakas tunne on nyt? (0 = rauhallinen, 10 = ylivoimainen)
                                </label>
                                <div className="space-y-4">
                                    <Slider
                                        value={[intensityAfter]}
                                        onValueChange={(value) => setIntensityAfter(value[0])}
                                        max={10}
                                        step={1}
                                        className="w-full"
                                    />
                                    <div className="text-center">
                                        <span className="text-3xl font-bold text-violet-600">{intensityAfter}</span>
                                        <span className="text-sm text-[#78716C] ml-2">/ 10</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Comparison */}
                            <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
                                <div className="text-center space-y-3">
                                    <p className="text-sm text-[#57534E]">Muutos</p>
                                    <div className="flex items-center justify-center gap-4">
                                        <span className="text-2xl font-bold text-[#292524]">{intensityBefore}</span>
                                        <ArrowRight className="w-6 h-6 text-emerald-600" />
                                        <span className="text-2xl font-bold text-emerald-600">{intensityAfter}</span>
                                    </div>
                                    {intensityBefore - intensityAfter > 0 && (
                                        <p className="text-sm text-emerald-700 font-medium">
                                            Tunne laski {intensityBefore - intensityAfter} pykälää! 🎉
                                        </p>
                                    )}
                                    {intensityBefore - intensityAfter === 0 && (
                                        <p className="text-sm text-[#57534E]">
                                            Tunne pysyi samana. Sekin on okei.
                                        </p>
                                    )}
                                    {intensityBefore - intensityAfter < 0 && (
                                        <p className="text-sm text-amber-700">
                                            Tunne nousi. Ehkä keho kaipaa rauhoittamista ensin?
                                        </p>
                                    )}
                                </div>
                            </Card>

                            {/* Power Statement */}
                            <Card className="p-6 bg-violet-50 border-violet-200">
                                <div className="flex items-start gap-3">
                                    <div className="bg-violet-600 text-white p-2 rounded-lg">
                                        ✨
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#292524] mb-2">Voimavaralause</h3>
                                        <p className="text-sm md:text-base text-[#57534E] italic">
                                            "{config.powerStatement}"
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {/* Reflection Prompt */}
                            <Card className="p-6 bg-white/80">
                                <p className="text-sm text-[#57534E] mb-2">Muistiinpano:</p>
                                <p className="text-base text-[#292524] italic">
                                    {config.reflectionPrompt}
                                </p>
                            </Card>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setView('scenario')}
                                    className="border-[#E7E5E4]"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Takaisin
                                </Button>
                                <Button
                                    onClick={handleComplete}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl"
                                >
                                    Valmis <CheckCircle2 className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>

            </div>
        </div>
    );
}
