"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function StartHereHero() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Auto-scroll after 10 seconds if user hasn't scrolled
        const timer = setTimeout(() => {
            handleScroll();
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    const handleScroll = () => {
        setIsVisible(false);
        const selectorSection = document.getElementById("intensity-selector");
        if (selectorSection) {
            selectorSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDFBF7] p-6 text-center"
                >
                    <div className="max-w-2xl space-y-8">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-2xl md:text-3xl font-serif text-[#2B2B2B] italic leading-relaxed"
                        >
                            {t("start_here.hero.line1")}
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.5, duration: 1 }}
                            className="text-xl md:text-2xl font-serif text-[#4A4A4A] leading-relaxed"
                        >
                            {t("start_here.hero.line2")}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 5.5, duration: 1 }}
                            className="pt-12 space-y-6"
                        >
                            <h3 className="text-sm font-bold tracking-widest uppercase text-[#5B4B8A]">
                                {t("start_here.hero.permission_title")}
                            </h3>
                            <div className="space-y-3 text-lg text-[#2B2B2B]">
                                <p>✨ {t("start_here.hero.permission_1")}</p>
                                <p>🛑 {t("start_here.hero.permission_2")}</p>
                                <p>🤝 {t("start_here.hero.permission_3")}</p>
                            </div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 8, duration: 1 }}
                            className="pt-8 text-[#4A4A4A]/80 text-sm font-mono"
                        >
                            {t("start_here.hero.closing")}
                        </motion.p>
                    </div>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 9, duration: 1 }}
                        onClick={handleScroll}
                        className="absolute bottom-12 flex flex-col items-center gap-2 text-[#4A4A4A]/60 hover:text-[#5B4B8A] transition-colors cursor-pointer"
                    >
                        <span className="text-xs uppercase tracking-widest">{t("start_here.hero.scroll_hint")}</span>
                        <ArrowDown className="w-5 h-5 animate-bounce" />
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
