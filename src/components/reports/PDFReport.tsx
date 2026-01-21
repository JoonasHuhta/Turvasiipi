"use client";

import React from 'react';
import { TimelineEvent } from "@/types";
import { UserProgress, Badge, MODULES, BADGES } from "@/context/ProgressContext";
import { format } from "date-fns";
import { fi, enUS } from "date-fns/locale";

interface PDFReportProps {
    events: TimelineEvent[];
    progress: UserProgress;
    language: 'fi' | 'en';
}

export const PDFReport: React.FC<PDFReportProps> = ({ events, progress, language }) => {
    const locale = language === 'fi' ? fi : enUS;
    const t = (key: string) => {
        const translations: Record<string, any> = {
            fi: {
                title: "Turvasiipi - Henkilökohtainen Raportti",
                date: "Päivämäärä",
                summary: "Yhteenveto",
                timeline: "Aikajana",
                training: "Valmennus ja Edistyminen",
                stats: {
                    events: "Tapahtumia yhteensä",
                    duration: "Seuranta-aika",
                    avgSeverity: "Keskimääräinen voimakkuus",
                    points: "Pisteet yhteensä",
                    level: "Taso"
                },
                badges: "Saavutetut merkit",
                disclaimer: "Tämä raportti on luotu paikallisesti laitteellasi. Tietojasi ei ole lähetetty palvelimelle.",
                days: "päivää"
            },
            en: {
                title: "Turvasiipi - Personal Report",
                date: "Date",
                summary: "Summary",
                timeline: "Timeline",
                training: "Training & Progress",
                stats: {
                    events: "Total Events",
                    duration: "Tracking Duration",
                    avgSeverity: "Average Intensity",
                    points: "Total Points",
                    level: "Level"
                },
                badges: "Earned Badges",
                disclaimer: "This report was generated locally on your device. Your data has not been sent to any server.",
                days: "days"
            }
        };
        const parts = key.split('.');
        let current = translations[language];
        for (const part of parts) {
            current = current?.[part];
        }
        return current || key;
    };

    const stats = {
        totalEvents: events.length,
        durationDays: events.length > 0
            ? Math.ceil((new Date().getTime() - new Date(events[0].timestamp).getTime()) / (1000 * 60 * 60 * 24))
            : 0,
        avgIntensity: events.length > 0
            ? (events.reduce((acc, curr) => acc + (curr.intensity || 0), 0) / events.length).toFixed(1)
            : "0"
    };

    const earnedBadges = BADGES.filter(b => progress.earnedBadgeIds.includes(b.id));

    return (
        <div
            id="pdf-report-content"
            className="p-12 bg-white text-slate-900 font-serif w-[800px] border-[12px] border-slate-50"
            style={{ minHeight: '1122px' }} // A4 approx ratio
        >
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-6 mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Turvasiipi</h1>
                    <p className="text-sm font-mono text-slate-500 uppercase tracking-widest">{t('title')}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-mono text-slate-400 uppercase">{t('date')}</p>
                    <p className="font-bold">{format(new Date(), "d.M.yyyy", { locale })}</p>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-8 mb-12">
                <div className="bg-slate-50 p-6 border border-slate-100 rounded-sm">
                    <p className="text-[10px] font-mono uppercase text-slate-400 mb-1">{t('stats.events')}</p>
                    <p className="text-4xl font-black">{stats.totalEvents}</p>
                </div>
                <div className="bg-slate-50 p-6 border border-slate-100 rounded-sm">
                    <p className="text-[10px] font-mono uppercase text-slate-400 mb-1">{t('stats.duration')}</p>
                    <p className="text-4xl font-black">{stats.durationDays} <span className="text-sm font-normal">{t('days')}</span></p>
                </div>
                <div className="bg-slate-50 p-6 border border-slate-100 rounded-sm">
                    <p className="text-[10px] font-mono uppercase text-slate-400 mb-1">{t('stats.avgSeverity')}</p>
                    <p className="text-4xl font-black">{stats.avgIntensity}<span className="text-sm font-normal">/5</span></p>
                </div>
            </div>

            {/* Training Progress */}
            <div className="mb-12">
                <h2 className="text-xl font-black uppercase tracking-widest border-b border-slate-200 pb-2 mb-6">{t('training')}</h2>
                <div className="flex gap-12 items-center mb-8">
                    <div>
                        <p className="text-[10px] font-mono uppercase text-slate-400 mb-1">{t('stats.points')}</p>
                        <p className="text-3xl font-black">{progress.points}</p>
                    </div>
                    <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-slate-900 transition-all"
                            style={{ width: `${Math.min(100, (progress.points / 3000) * 100)}%` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {earnedBadges.map(badge => (
                        <div key={badge.id} className="flex items-center gap-3 p-3 border border-slate-100 rounded-sm bg-white">
                            <span className="text-2xl">{badge.icon}</span>
                            <div>
                                <p className="text-sm font-bold leading-tight">{badge.title}</p>
                                <p className="text-[10px] text-slate-500">{badge.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline Preview */}
            <div className="mb-12">
                <h2 className="text-xl font-black uppercase tracking-widest border-b border-slate-200 pb-2 mb-6">{t('timeline')}</h2>
                <div className="space-y-6">
                    {events.slice(-5).reverse().map((event, i) => (
                        <div key={event.id} className="border-l-2 border-slate-200 pl-4 py-1">
                            <p className="text-[10px] font-mono text-slate-400 uppercase mb-1">
                                {format(new Date(event.timestamp), "d. MMMM yyyy", { locale })}
                            </p>
                            <p className="text-sm font-bold mb-1">{event.description}</p>
                            {event.objectiveDescription && (
                                <p className="text-xs text-slate-600 italic">"{event.objectiveDescription}"</p>
                            )}
                        </div>
                    ))}
                    {events.length > 5 && (
                        <p className="text-xs text-slate-400 italic">... + {events.length - 5} muuta merkintää.</p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-12 border-t border-slate-100 text-center">
                <p className="text-[10px] font-mono text-slate-300 uppercase leading-relaxed max-w-md mx-auto">
                    {t('disclaimer')}
                </p>
            </div>
        </div>
    );
};
