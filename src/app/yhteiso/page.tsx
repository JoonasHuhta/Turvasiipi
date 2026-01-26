"use client";

import { LightMap } from "@/components/community/LightMap";
import { DailyPoll } from "@/components/community/DailyPoll";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartHandshake, ExternalLink, ShieldAlert, MessageSquare, Heart } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";

export default function CommunityPage() {
    const { t, loadNamespace } = useLanguage();

    useEffect(() => {
        loadNamespace('community_page');
    }, [loadNamespace]);

    return (
        <div className="space-y-12 pb-20 fade-in animate-in pt-8 px-4 max-w-5xl mx-auto">

            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {t('community_page.header.badge')}
                </div>
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{t('community_page.header.title')}</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    {t('community_page.header.subtitle')}
                </p>
            </div>

            {/* Virtual Solidarity */}
            <section className="max-w-3xl mx-auto">
                <LightMap />
            </section>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                {/* Voting Column */}
                <div className="space-y-8">
                    <DailyPoll />

                    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-indigo-900">
                                <MessageSquare className="w-5 h-5" /> {t('community_page.stories_card.title')}
                            </CardTitle>
                            <CardDescription>
                                {t('community_page.stories_card.desc')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-700 mb-6 text-sm leading-relaxed">
                                {t('community_page.stories_card.quote')}
                            </p>
                            <div className="flex gap-4">
                                <Link href="/tarinat" className="w-full">
                                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                                        {t('community_page.stories_card.btn')}
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Resources Column */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HeartHandshake className="w-5 h-5 text-emerald-600" /> {t('community_page.resources.safe_havens')}
                            </CardTitle>
                            <CardDescription>
                                {t('community_page.resources.desc')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <a
                                href="https://mieli.fi/tukea-ja-apua/vertaistukiryhmat/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-4 rounded-xl border hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
                            >
                                <div className="flex items-center justify-between font-bold text-slate-800 group-hover:text-emerald-900 mb-1">
                                    {t('community_page.resources.mieli.name')} <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                                </div>
                                <p className="text-sm text-slate-500">{t('community_page.resources.mieli.desc')}</p>
                            </a>

                            <a
                                href="https://discord.gg/b66PVbXA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-4 rounded-xl border hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                            >
                                <div className="flex items-center justify-between font-bold text-slate-800 group-hover:text-indigo-900 mb-1">
                                    {t('community_page.resources.discord.name')} <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                                </div>
                                <p className="text-sm text-slate-500">{t('community_page.resources.discord.desc')}</p>
                            </a>

                            <a
                                href="https://www.facebook.com/groups/tyopaikkakiusaamisen.uhrit"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-4 rounded-xl border hover:border-blue-500 hover:bg-blue-50 transition-all group"
                            >
                                <div className="flex items-center justify-between font-bold text-slate-800 group-hover:text-blue-900 mb-1">
                                    {t('community_page.resources.facebook.name')} <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                </div>
                                <p className="text-sm text-slate-500">{t('community_page.resources.facebook.desc')}</p>
                            </a>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-yellow-400 bg-yellow-50/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-base text-yellow-900">
                                <ShieldAlert className="w-5 h-5 text-yellow-600" />
                                {t('community_page.no_chat.title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-yellow-800/80 leading-relaxed">
                                {t('community_page.no_chat.text')}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 text-white border-0 overflow-hidden relative">
                        {/* Decorative gradient */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />

                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-purple-300">
                                <Heart className="w-5 h-5" /> {t('community_page.wellbeing.title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 relative z-10">
                            <p className="text-sm text-slate-300">
                                {t('community_page.wellbeing.text')}
                            </p>
                            <Link href="/tuki" className="inline-block text-sm font-bold text-white hover:text-purple-300 underline underline-offset-4">
                                {t('community_page.wellbeing.link')}
                            </Link>

                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
