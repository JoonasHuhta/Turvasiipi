"use client";

import { articles } from "@/data/articles";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { Calendar, Clock, Tag, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function AjatteluPage() {
    const { t } = useLanguage();
    const [expandedSeries, setExpandedSeries] = useState<Record<string, boolean>>({});

    if (articles.length === 0) {
        return (
            <div className="min-h-screen bg-suojasiipi-bg">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-suojasiipi-text-main">
                                {t('thinking_page.title')}
                            </h1>
                            <p className="text-lg text-suojasiipi-text-body max-w-2xl mx-auto">
                                {t('thinking_page.subtitle')}
                            </p>
                        </div>

                        <Card className="p-12 border-2 border-dashed border-suojasiipi-secondary bg-white/50">
                            <div className="text-center space-y-3">
                                <p className="text-xl font-serif text-suojasiipi-text-body">
                                    📝 Ensimmäiset artikkelit tulossa pian!
                                </p>
                                <p className="text-sm text-suojasiipi-text-body/70">
                                    Tämä osio täyttyy ajatuksilla työelämän psykologisesta turvallisuudesta.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-suojasiipi-bg">
            <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-32 space-y-24">

                {/* Header / Intro */}
                <header className="space-y-12 max-w-2xl">
                    <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1">
                        {t('thinking_page.header.label')}
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold text-[#2B2B2B] leading-[1.1] tracking-tight">
                        {t('thinking_page.header.title')} <br />
                        <span className="text-[#4A4A4A] font-normal italic">{t('thinking_page.header.title_span')}</span>
                    </h1>

                    <div className="space-y-6 max-w-xl">
                        <p className="text-lg text-[#4A4A4A] leading-relaxed">
                            {t('thinking_page.header.p1')}
                        </p>
                        <p className="text-lg text-[#4A4A4A] leading-relaxed">
                            {t('thinking_page.header.p2')}
                        </p>
                    </div>
                </header>

                {/* Divider */}
                <div className="space-y-16">

                    {/* Featured Hero - if there's a featured series article */}
                    {(() => {
                        const featuredSeries = articles.find(a => a.series?.part === 1 && a.featured);
                        if (!featuredSeries) return null;

                        return (
                            <Link href={`/ajattelu/${featuredSeries.slug}`} className="block group">
                                <Card className="overflow-hidden hover:shadow-xl transition-all hover:border-suojasiipi-primary/50 bg-white">
                                    <div className="flex flex-col md:flex-row">
                                        {/* Cover Image or Gradient Placeholder */}
                                        <div className="md:w-2/5 aspect-[16/9] md:aspect-auto bg-gradient-to-br from-suojasiipi-secondary/20 via-suojasiipi-primary/10 to-suojasiipi-secondary/30 relative overflow-hidden">
                                            {featuredSeries.coverImage ? (
                                                <img
                                                    src={featuredSeries.coverImage}
                                                    alt={featuredSeries.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="text-center p-6">
                                                        <div className="text-6xl opacity-20 mb-2">📚</div>
                                                        <p className="text-sm text-suojasiipi-text-body/50 font-medium">
                                                            {featuredSeries.series!.totalParts}-osainen sarja
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="md:w-3/5 p-6 sm:p-8 flex flex-col justify-center">
                                            <div className="space-y-4">
                                                {/* Series Badge */}
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-suojasiipi-primary/10 border border-suojasiipi-primary/30 rounded-sm">
                                                    <span className="text-xs font-semibold text-suojasiipi-primary">
                                                        📖 {featuredSeries.series!.name}
                                                    </span>
                                                </div>

                                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-suojasiipi-text-main group-hover:text-suojasiipi-primary transition-colors">
                                                    {featuredSeries.title}
                                                </h2>

                                                <p className="text-suojasiipi-text-body leading-relaxed">
                                                    {featuredSeries.excerpt}
                                                </p>

                                                <div className="flex items-center gap-4 text-sm text-suojasiipi-text-body/70">
                                                    <span>{featuredSeries.series!.totalParts} osaa</span>
                                                    <span>·</span>
                                                    <span>{featuredSeries.readTime}</span>
                                                </div>

                                                <div className="pt-2">
                                                    <span className="inline-flex items-center gap-2 text-sm font-bold text-suojasiipi-primary group-hover:gap-3 transition-all">
                                                        Aloita lukeminen →
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        );
                    })()}

                    {/* Articles Grid */}
                    <div className="grid gap-6">
                        {(() => {
                            // Group articles
                            const groupedArticles: {
                                series: Record<string, typeof articles>,
                                standalone: typeof articles
                            } = {
                                series: {},
                                standalone: []
                            };

                            articles.forEach(article => {
                                // Skip featured series first article (already shown in hero)
                                if (article.series?.part === 1 && article.featured) return;

                                if (article.series) {
                                    if (!groupedArticles.series[article.series.name]) {
                                        groupedArticles.series[article.series.name] = [];
                                    }
                                    groupedArticles.series[article.series.name].push(article);
                                } else {
                                    groupedArticles.standalone.push(article);
                                }
                            });

                            return (
                                <>
                                    {/* Series Groups */}
                                    {Object.entries(groupedArticles.series).map(([seriesName, seriesArticles]) => {
                                        const isExpanded = expandedSeries[seriesName];
                                        const sortedArticles = [...seriesArticles].sort((a, b) => a.series!.part - b.series!.part);

                                        return (
                                            <div key={seriesName}>
                                                {/* Series Header - Collapsible */}
                                                <button
                                                    onClick={() => setExpandedSeries(prev => ({ ...prev, [seriesName]: !prev[seriesName] }))}
                                                    className="w-full text-left"
                                                >
                                                    <Card className="p-6 hover:shadow-lg transition-all hover:border-suojasiipi-primary/30 bg-white cursor-pointer">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <span className="text-sm font-semibold text-suojasiipi-primary">
                                                                        📚 {seriesName}
                                                                    </span>
                                                                    <span className="text-xs text-suojasiipi-text-body/50">
                                                                        {sortedArticles.length + 1} osaa
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm text-suojasiipi-text-body">
                                                                    {isExpanded ? 'Piilota osat' : 'Katso kaikki osat'}
                                                                </p>
                                                            </div>
                                                            {isExpanded ? (
                                                                <ChevronUp className="w-5 h-5 text-suojasiipi-primary" />
                                                            ) : (
                                                                <ChevronDown className="w-5 h-5 text-suojasiipi-primary" />
                                                            )}
                                                        </div>
                                                    </Card>
                                                </button>

                                                {/* Expanded Article List */}
                                                {isExpanded && (
                                                    <div className="mt-4 ml-4 space-y-3 border-l-2 border-suojasiipi-secondary/30 pl-4">
                                                        {sortedArticles.map(article => (
                                                            <Link
                                                                key={article.id}
                                                                href={`/ajattelu/${article.slug}`}
                                                                className="block group"
                                                            >
                                                                <Card className="p-4 hover:shadow-md transition-all hover:border-suojasiipi-primary/30 bg-white/80">
                                                                    <div className="space-y-2">
                                                                        <div className="flex items-center gap-2 text-xs text-suojasiipi-primary">
                                                                            <span className="font-semibold">Osa {article.series!.part}/{article.series!.totalParts}</span>
                                                                            <span>·</span>
                                                                            <span>{article.readTime}</span>
                                                                        </div>
                                                                        <h3 className="text-lg font-serif font-semibold text-suojasiipi-text-main group-hover:text-suojasiipi-primary transition-colors">
                                                                            {article.title}
                                                                        </h3>
                                                                    </div>
                                                                </Card>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}

                                    {/* Standalone Articles */}
                                    {groupedArticles.standalone.map((article) => (
                                        <Link
                                            key={article.id}
                                            href={`/ajattelu/${article.slug}`}
                                            className="group"
                                        >
                                            <Card className="p-6 sm:p-8 hover:shadow-lg transition-all hover:border-suojasiipi-primary/30 bg-white">
                                                <div className="space-y-4">
                                                    {/* Series Badge */}
                                                    {article.series && (
                                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-suojasiipi-primary/10 border border-suojasiipi-primary/30 rounded-sm">
                                                            <span className="text-xs font-semibold text-suojasiipi-primary">
                                                                {article.series.name} – Osa {article.series.part}/{article.series.totalParts}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Meta Info */}
                                                    <div className="flex flex-wrap items-center gap-4 text-xs text-suojasiipi-text-body/70">
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            {new Date(article.publishedDate).toLocaleDateString('fi-FI')}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            {article.readTime}
                                                        </span>
                                                    </div>

                                                    {/* Title & Excerpt */}
                                                    <div className="space-y-2">
                                                        <h2 className="text-2xl font-serif font-bold text-suojasiipi-text-main group-hover:text-suojasiipi-primary transition-colors">
                                                            {article.title}
                                                        </h2>
                                                        <p className="text-suojasiipi-text-body leading-relaxed">
                                                            {article.excerpt}
                                                        </p>
                                                    </div>

                                                    {/* Tags */}
                                                    {article.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {article.tags.map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="inline-flex items-center gap-1 px-3 py-1 bg-suojasiipi-secondary/50 text-suojasiipi-primary text-xs font-medium rounded-full"
                                                                >
                                                                    <Tag className="w-3 h-3" />
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Read More */}
                                                    <div className="pt-2">
                                                        <span className="text-sm font-bold text-suojasiipi-primary group-hover:underline">
                                                            {t('thinking_page.read_more')} →
                                                        </span>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    ))}
                                </>
                            );
                        })()}
                    </div>
                </div>
            </div>
            );
}
