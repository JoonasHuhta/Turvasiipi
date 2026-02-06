"use client";

import { articles } from "@/data/articles";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { Calendar, Clock, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AjatteluPage() {
    const { t } = useLanguage();

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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-suojasiipi-text-main">
                            {t('thinking_page.title')}
                        </h1>
                        <p className="text-lg text-suojasiipi-text-body max-w-2xl mx-auto">
                            {t('thinking_page.subtitle')}
                        </p>
                    </div>

                    {/* Articles Grid */}
                    <div className="grid gap-6">
                        {articles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/ajattelu/${article.slug}`}
                                className="group"
                            >
                                <Card className="p-6 sm:p-8 hover:shadow-lg transition-all hover:border-suojasiipi-primary/30 bg-white">
                                    <div className="space-y-4">
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
                    </div>
                </div>
            </div>
        </div>
    );
}
