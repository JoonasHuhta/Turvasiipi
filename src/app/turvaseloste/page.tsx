"use client";

import Link from "next/link";
import { ArrowLeft, Database, EyeOff, Key, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
            <div className="max-w-3xl mx-auto space-y-12">
                {/* Header */}
                <div className="space-y-6">
                    <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> {t('privacy_page.back')}
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                        {t('privacy_page.title')}
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        {t('privacy_page.subtitle')}
                    </p>
                </div>

                {/* Core Principles */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <Database className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{t('privacy_page.principles.local_title')}</h3>
                        <p className="text-slate-600">
                            {t('privacy_page.principles.local_desc')}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <EyeOff className="w-8 h-8 text-indigo-500 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{t('privacy_page.principles.anonymous_title')}</h3>
                        <p className="text-slate-600">
                            {t('privacy_page.principles.anonymous_desc')}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <Key className="w-8 h-8 text-emerald-500 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{t('privacy_page.principles.encryption_title')}</h3>
                        <p className="text-slate-600">
                            {t('privacy_page.principles.encryption_desc')}
                        </p>
                    </div>
                </div>

                {/* Detailed Sections */}
                <div className="space-y-8">
                    <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <Database className="w-6 h-6 text-blue-500" />
                            {t('privacy_page.data_collection.title')}
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p className="font-semibold text-slate-900">{t('privacy_page.data_collection.local_label')}</p>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li>{t('privacy_page.data_collection.local_list_1')}</li>
                                <li>{t('privacy_page.data_collection.local_list_2')}</li>
                                <li>{t('privacy_page.data_collection.local_list_3')}</li>
                            </ul>

                            <p className="font-semibold text-slate-900 mt-6">{t('privacy_page.data_collection.server_label')}</p>
                            <p className="mt-2">{t('privacy_page.data_collection.server_desc')}</p>

                            <h3 className="font-bold text-slate-900 mt-6 mb-2">{t('privacy_page.data_collection.cookies_title')}</h3>
                            <p>{t('privacy_page.data_collection.cookies_desc')}</p>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <Shield className="w-6 h-6 text-emerald-500" />
                            {t('privacy_page.gdpr.title')}
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p className="mb-4">
                                {t('privacy_page.gdpr.desc')}
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>{t('privacy_page.gdpr.right_1')}</li>
                                <li>{t('privacy_page.gdpr.right_2')}</li>
                                <li>{t('privacy_page.gdpr.right_3')}</li>
                            </ul>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">
                            {t('privacy_page.contact.title')}
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p>
                                {t('privacy_page.contact.desc')}
                            </p>
                            <p className="mt-4 font-mono text-sm bg-slate-100 p-3 rounded-lg">
                                {t('privacy_page.contact.email')}
                            </p>
                            <p className="text-xs mt-4 text-slate-500">
                                {t('privacy_page.contact.updated')}
                            </p>
                        </div>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-center pt-8">
                    <Link href="/">
                        <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800">
                            {t('privacy_page.back')}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
