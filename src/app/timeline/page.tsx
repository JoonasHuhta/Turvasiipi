"use client";

import { useState, useEffect } from "react";
import { TimelineEventForm } from "@/components/TimelineEventForm";
import { TimelineList } from "@/components/TimelineList";
import { useSecureLocalStorage } from "@/hooks/useSecureLocalStorage";
import { VaultWrapper } from "@/components/VaultWrapper";
import { TimelineEvent } from "@/types";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Archive, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { QuickLogButton } from "@/components/QuickLogButton";

export default function TimelinePage() {
    const { t } = useLanguage();
    const { completeModule, awardBadge } = useProgress();
    const { data: events, setData: setEvents, isLocked, hasData, unlock } = useSecureLocalStorage<TimelineEvent[]>("suojasiipi_events_secure", []);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAddEvent = (newEvent: Omit<TimelineEvent, "id">) => {
        const eventWithId = { ...newEvent, id: crypto.randomUUID() };
        setEvents([eventWithId, ...events]);
        completeModule('timeline');
        awardBadge('doc_start');
    };

    const handleDeleteEvent = (id: string) => {
        if (confirm(t('timeline.page.confirm_delete'))) {
            setEvents(events.filter(e => e.id !== id));
        }
    };

    if (!mounted) return (
        <div className="container mx-auto px-6 py-32 text-center text-[#5B4B8A] font-mono animate-pulse">
            {t('timeline.page.loading')}
        </div>
    );

    return (
        <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-32 space-y-12">
            <VaultWrapper isLocked={isLocked} hasData={hasData} onUnlock={unlock}>
                <header className="space-y-6 border-b border-[#E8DDD0] pb-8">
                    <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest">
                        Välineet &mdash; Lokikirja
                    </span>
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl font-serif font-bold text-[#2B2B2B]">
                            {t('timeline.page.title')}
                        </h1>
                        <div className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border border-[#5B4B8A] px-3 py-1 rounded-sm flex items-center gap-2">
                            <Archive className="w-3 h-3" />
                            {t('timeline.page.status_open')}
                        </div>
                    </div>
                    <p className="text-lg text-[#4A4A4A] max-w-xl leading-relaxed">
                        {t('timeline.page.subtitle')} Dokumentoi kaikki. Vaikka tuntuisi pieneltä.
                    </p>
                </header>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* LEFT COLUMN: Tools & Help */}
                    <div className="lg:col-span-1 space-y-8 order-2 lg:order-1">

                        {/* AI Helper Card - Redesigned */}
                        <div className="bg-[#FDFBF7] border border-[#E8DDD0] p-6 space-y-4 rounded-sm">
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-2 border border-[#E8DDD0] rounded-sm">
                                    <Sparkles className="w-5 h-5 text-[#5B4B8A]" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-[#2B2B2B] text-sm uppercase tracking-wide">Kaipaatko selkeyttä?</h4>
                                    <p className="text-sm text-[#4A4A4A] leading-relaxed">
                                        Tekoäly voi auttaa koostamaan merkinnöistäsi yhteenvedon tai raportin.
                                    </p>
                                </div>
                            </div>
                            <Link href="/raportti" className="block">
                                <Button variant="outline" className="w-full bg-white border-[#E8DDD0] hover:border-[#5B4B8A] text-[#2B2B2B] justify-between group">
                                    <span>{t('timeline.page.ai_button')}</span>
                                    <ArrowRight className="w-4 h-4 text-[#E8DDD0] group-hover:text-[#5B4B8A] transition-colors" />
                                </Button>
                            </Link>
                        </div>

                        {/* Form Container */}
                        <div className="bg-white p-6 border border-[#E8DDD0] rounded-sm shadow-sm">
                            <h3 className="font-bold text-[#2B2B2B] mb-4">Lisää uusi merkintä</h3>
                            <TimelineEventForm onAdd={handleAddEvent} />
                        </div>

                    </div>

                    {/* RIGHT COLUMN: The List */}
                    <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">
                        <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD0]">
                            <h3 className="font-serif font-bold text-xl text-[#2B2B2B]">Tapahtumahistoria</h3>
                            <span className="font-mono text-xs text-[#4A4A4A]">
                                {t('timeline.page.entry_count', { count: events.length })}
                            </span>
                        </div>

                        <TimelineList
                            events={events}
                            onDelete={handleDeleteEvent}
                        />
                    </div>
                </div>
            </VaultWrapper>

            {/* Quick Log Floating Button */}
            <QuickLogButton />
        </div>
    );
}
