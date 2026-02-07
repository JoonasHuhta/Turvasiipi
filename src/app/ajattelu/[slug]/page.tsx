"use client";

import { getArticleBySlug } from "@/data/articles";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { ChevronLeft, Calendar, Clock, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { use, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { t } = useLanguage();
    const article = getArticleBySlug(slug);
    const [content, setContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadContent() {
            try {
                const response = await fetch(`/content/articles/${slug}.md`);
                if (response.ok) {
                    const text = await response.text();
                    setContent(text);
                }
            } catch (error) {
                console.error("Failed to load article content:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadContent();
    }, [slug]);

    if (!article) {
        return (
            <div className="min-h-screen bg-suojasiipi-bg px-6 py-24">
                <div className="max-w-3xl mx-auto">
                    <Card className="p-12 text-center border-suojasiipi-secondary bg-white/40">
                        <h1 className="text-2xl font-serif text-suojasiipi-text-main mb -4">Artikkelia ei löytynyt</h1>
                        <Link href="/ajattelu" className="text-suojasiipi-primary hover:underline">
                            ← Palaa artikkeleihin
                        </Link>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-suojasiipi-bg">
            {/* Header */}
            <div className="border-b border-suojasiipi-secondary bg-white/80 backdrop-blur-sm">
                <div className="max-w-3xl mx-auto px-8 md:px-12 py-6">
                    <Link
                        href="/ajattelu"
                        className="inline-flex items-center gap-2 text-sm text-suojasiipi-text-body hover:text-suojasiipi-primary transition-colors mb-8"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Kaikki artikkelit
                    </Link>

                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-serif text-suojasiipi-text-main leading-tight">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-suojasiipi-text-body border-t border-b border-suojasiipi-secondary py-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(article.publishedDate).toLocaleDateString('fi-FI')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{article.readTime}</span>
                            </div>
                            {article.tags.length > 0 && (
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Tag className="w-4 h-4" />
                                    {article.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 bg-suojasiipi-secondary/30 text-xs rounded-sm border border-suojasiipi-secondary"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="max-w-3xl mx-auto px-8 md:px-12 py-16">
                {isLoading ? (
                    <div className="text-center py-12 text-suojasiipi-text-body">
                        Ladataan artikkelia...
                    </div>
                ) : content ? (
                    <div className="prose prose-lg prose-serif max-w-prose mx-auto
                        prose-headings:font-serif prose-headings:text-suojasiipi-text-main
                        prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-suojasiipi-secondary prose-h2:pb-3
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                        prose-p:text-suojasiipi-text-body prose-p:leading-relaxed prose-p:mb-6
                        prose-strong:text-suojasiipi-primary prose-strong:font-semibold
                        prose-a:text-suojasiipi-primary prose-a:no-underline hover:prose-a:underline
                        prose-blockquote:border-l-4 prose-blockquote:border-suojasiipi-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-suojasiipi-text-body
                        prose-ul:list-none prose-ul:space-y-3
                        prose-li:before:content-['→'] prose-li:before:text-suojasiipi-primary prose-li:before:mr-3 prose-li:before:font-bold
                        prose-hr:border-suojasiipi-secondary prose-hr:my-12
                    ">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {content}
                        </ReactMarkdown>
                    </div>
                ) : (
                    <Card className="p-8 border-suojasiipi-secondary bg-white/40">
                        <p className="text-suojasiipi-text-body">Artikkelin sisältöä ei voitu ladata.</p>
                    </Card>
                )}
            </article>

            {/* Footer CTA */}
            <div className="border-t border-suojasiipi-secondary bg-white/80 mt-16">
                <div className="max-w-3xl mx-auto px-8 md:px-12 py-12 text-center">
                    <h3 className="text-xl font-serif text-suojasiipi-text-main mb-4">
                        Hyödyllinen artikkeli?
                    </h3>
                    <p className="text-suojasiipi-text-body mb-6">
                        Tutustu muihin työkaluihin ja artikkeleihin
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/ajattelu"
                            className="px-6 py-3 bg-white border-2 border-suojasiipi-secondary text-suojasiipi-text-main hover:bg-suojasiipi-bg transition-colors rounded-sm"
                        >
                            Muut artikkelit
                        </Link>
                        <Link
                            href="/valmennus"
                            className="px-6 py-3 bg-suojasiipi-primary text-white hover:bg-suojasiipi-primary/90 transition-colors rounded-sm"
                        >
                            Tutustu valmennukseen
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
