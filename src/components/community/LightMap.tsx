"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LightMap() {
    const [lights, setLights] = useState<number>(0);
    const [hasLit, setHasLit] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);

    const [candles, setCandles] = useState<{ x: number, y: number, scale: number, duration: number, delay: number }[]>([]);

    useEffect(() => {
        // Fetch real count
        fetch('/api/lights')
            .then(res => res.json())
            .then(data => setLights(data.count))
            .catch(err => console.error("Failed to fetch lights", err));

        // Periodically refresh (basic polling every 30s to see others' lights)
        const interval = setInterval(() => {
            fetch('/api/lights')
                .then(res => res.json())
                .then(data => setLights(data.count))
                .catch(() => { });
        }, 30000);

        const localLit = localStorage.getItem("hasLitLight");
        if (localLit) {
            const litTime = parseInt(localLit);
            // Reset local "you have lit" state after 24 hours so you can light again
            if (Date.now() - litTime < 24 * 60 * 60 * 1000) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setHasLit(true);
            } else {
                localStorage.removeItem("hasLitLight");
            }
        }

        // Generate candle positions only on client
        const newCandles = Array.from({ length: 12 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            scale: 0.5 + Math.random(),
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 5
        }));
        setCandles(newCandles);

        return () => clearInterval(interval);
    }, []);

    const handleLight = async () => {
        setHasLit(true);
        // Optimistic update
        const prev = lights;
        setLights(prev + 1);
        setShowThankYou(true);
        localStorage.setItem("hasLitLight", Date.now().toString());

        try {
            const res = await fetch('/api/lights', { method: 'POST' });
            const data = await res.json();
            if (data.count) setLights(data.count); // sync with real server count
        } catch (error) {
            console.error("Failed to light candle", error);
            // revert if failed? nah, let's keep it positive for the user
        }

        setTimeout(() => setShowThankYou(false), 3000);
    };

    return (
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center min-h-[300px] flex flex-col items-center justify-center gap-6 shadow-2xl">
            {/* Background Candles */}
            <div className="absolute inset-0 z-0">
                {candles.map((candle, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0.1, y: 10 }}
                        animate={{ opacity: [0.1, 0.3, 0.1], y: [0, -10, 0] }}
                        transition={{ duration: candle.duration, repeat: Infinity, delay: candle.delay }}
                        className="absolute text-amber-500/20"
                        style={{
                            left: `${candle.x}%`,
                            top: `${candle.y}%`,
                            transform: `scale(${candle.scale})`
                        }}
                    >
                        <Flame size={48} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 space-y-2">
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/10 mb-2 ring-4 ring-amber-500/5"
                >
                    <Flame
                        className={`w-10 h-10 ${hasLit ? "text-amber-500 fill-amber-500 animate-pulse" : "text-slate-600"}`}
                    />
                </motion.div>
                <h3 className="text-2xl font-bold text-white">Valonpilkahdus</h3>
                <p className="text-slate-400 max-w-sm mx-auto">
                    Sytytä valo merkiksi siitä, että olet täällä. Et ole yksin.
                </p>
            </div>

            <div className="relative z-10">
                <AnimatePresence mode="wait">
                    {hasLit ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-amber-950/50 border border-amber-900/50 text-amber-200 px-6 py-3 rounded-full font-medium"
                        >
                            {lights} valoa sytytetty. Kiitos että olet.
                        </motion.div>
                    ) : (
                        <Button
                            onClick={handleLight}
                            size="lg"
                            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white border-0 shadow-lg shadow-amber-900/20"
                        >
                            <Flame className="w-5 h-5 mr-2 fill-white/20" /> Sytytä valo
                        </Button>
                    )}
                </AnimatePresence>
            </div>

            {/* Thank you pop-up */}
            <AnimatePresence>
                {showThankYou && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
                    >
                        <div className="text-6xl">🕯️</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
