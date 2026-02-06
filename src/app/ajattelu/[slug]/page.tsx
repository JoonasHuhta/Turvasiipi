"use client";

import { getArticleBySlug } from "@/data/articles";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { ChevronLeft, Calendar, Clock, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { notFound } from "next/navigation";

export default function ArticlePage({ params }: { params: { slug: string } }) {
    const { t } = useLanguage();
    const article = getArticleBySlug(params.slug);

    // If article not found, show 404
    if (!article) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-suojasiipi-bg">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Back Button */}
                <Link
                    href="/ajattelu"
                    className="inline-flex items-center gap-2 text-sm text-suojasiipi-text-body hover:text-suojasiipi-primary transition-colors mb-8"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Takaisin artikkeleihin
                </Link>

                {/* Article Header */}
                <article className="space-y-8">
                    <header className="space-y-6 pb-8 border-b border-suojasiipi-secondary">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-suojasiipi-text-main leading-tight">
                            {article.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-suojasiipi-text-body/70">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {new Date(article.publishedDate).toLocaleDateString('fi-FI', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {article.readTime}
                            </span>
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
                    </header>

                    {/* Article Content Placeholder */}
                    <Card className="p-8 sm:p-12 border-2 border-dashed border-suojasiipi-secondary bg-white/50">
                        <div className="text-center space-y-4">
                            <p className="text-lg font-serif text-suojasiipi-text-body">
                                📝 Artikkelin sisältö tulee tähän
                            </p>
                            <p className="text-sm text-suojasiipi-text-body/70 max-w-md mx-auto">
                                Tulevaisuudessa tämä alue tukee MDX-formaattia (Markdown + React-komponentit)
                                jolloin artikkeleihin voi upottaa mm. interaktiivisia elementtejä.
                            </p>
                        </div>
                    </Card>

                    {/* Future: Article content will be rendered here from MDX */}
                    {/* <div className="prose prose-lg max-w-none">
                        {article content}
                    </div> */}
                </article>
            </div>
        </div>
    );
}
