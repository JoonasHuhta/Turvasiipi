"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, MessageSquare, Phone, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProgress } from "@/context/ProgressContext";

export default function SOSMode() {
    const { completeModule, isModuleCompleted } = useProgress();
    const [isActive, setIsActive] = useState(false);
    const [breathPhase, setBreathPhase] = useState<'in' | 'out'>('in');

    // Track first SOS activation for gamification
    const activateSOS = () => {
        setIsActive(true);
        if (!isModuleCompleted('neuro_sos_activated')) {
            completeModule('neuro_sos_activated'); // +10 points
        }
    };

    // Breathing cycle (4s in, 4s out)
    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            setBreathPhase(prev => prev === 'in' ? 'out' : 'in');
        }, 4000);

        return () => clearInterval(interval);
    }, [isActive]);

    const sendPresetMessage = () => {
        // Open email with preset message
        const subject = "Tarvitsen tauon";
        const body = "Tarvitsen nyt 15 min tauon. Palaan pian.\n\n- [Sinun nimesi]";
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const showEmergencyNumbers = () => {
        alert(`KRIISIPUHELINNUMEROT:

🆘 Hätänumero: 112

💬 Kriisipuhelin (24/7): 
   09 2525 0111

🧠 Mieli ry (ma-pe 9-15):
   09 435 9500

📞 Työterveyshuolto:
   [Oma numero]`);
    };

    if (!isActive) {
        return (
            <button
                onClick={activateSOS}
                className="fixed bottom-6 right-6 w-20 h-20 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-2xl z-50 flex items-center justify-center text-3xl font-bold animate-pulse transition-all hover:scale-110"
                aria-label="SOS - Hätätila"
            >
                🆘
            </button>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900 z-50 flex flex-col items-center justify-center p-6"
            >
                {/* Close button */}
                <button
                    onClick={() => setIsActive(false)}
                    className="absolute top-6 right-6 w-16 h-16 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
                    aria-label="Poistu SOS-tilasta"
                >
                    <X className="w-8 h-8" />
                </button>

                {/* Breathing ball (always visible) */}
                <div className="mb-12">
                    <motion.div
                        className="relative w-32 h-32"
                        animate={{
                            scale: breathPhase === 'in' ? [1, 1.6, 1.6] : [1.6, 1, 1],
                        }}
                        transition={{
                            duration: 4,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-5xl text-white">
                                {breathPhase === 'in' ? '▲' : '▼'}
                            </span>
                        </div>
                    </motion.div>
                    <p className="text-center text-white text-xl mt-4 font-medium">
                        {breathPhase === 'in' ? 'Hengitä sisään' : 'Hengitä ulos'}
                    </p>
                </div>

                {/* Large action buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">

                    <Button
                        onClick={() => {
                            const audio = new Audio('/sounds/brown-noise.mp3');
                            audio.loop = true;
                            audio.play().catch(() => {
                                // Fallback: open YouTube brown noise
                                window.open('https://www.youtube.com/watch?v=RqzGzwTY-6w', '_blank');
                            });
                        }}
                        className="h-32 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center gap-3 text-xl"
                    >
                        <Volume2 className="w-16 h-16" />
                        <span>Rauhoittava ääni</span>
                    </Button>

                    <Button
                        onClick={sendPresetMessage}
                        className="h-32 bg-amber-600 hover:bg-amber-700 text-white flex flex-col items-center justify-center gap-3 text-xl"
                    >
                        <MessageSquare className="w-16 h-16" />
                        <span>Lähetä viesti</span>
                    </Button>

                    <Button
                        onClick={showEmergencyNumbers}
                        className="h-32 bg-purple-600 hover:bg-purple-700 text-white flex flex-col items-center justify-center gap-3 text-xl"
                    >
                        <Phone className="w-16 h-16" />
                        <span>Kriisipuhelinnumerot</span>
                    </Button>

                    <Button
                        onClick={() => setIsActive(false)}
                        className="h-32 bg-slate-700 hover:bg-slate-600 text-white flex flex-col items-center justify-center gap-3 text-xl"
                    >
                        <Circle className="w-16 h-16" />
                        <span>Hengitä vain</span>
                    </Button>

                </div>

                {/* Safety note */}
                <p className="text-slate-400 text-center mt-12 max-w-lg">
                    Tämä tila on tarkoitettu akuuttiin rauhoittumiseen. Jos tunnet olevasi vaarassa, soita hätänumeroon 112.
                </p>

            </motion.div>
        </AnimatePresence>
    );
}
