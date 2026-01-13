"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, PenLine, Shield, X, EyeOff } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";

export default function HiekkalaatikkoPage() {
    const { t } = useLanguage();
    const [timestamp, setTimestamp] = useState("");

    useEffect(() => {
        setTimestamp(new Date().toLocaleDateString('fi-FI', { weekday: 'long', day: 'numeric', month: 'long' }));
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-sans selection:bg-slate-200 pb-32">

            {/* Minimal Header */}
            <header className="fixed top-0 left-0 right-0 bg-[#FDFBF7]/90 backdrop-blur-sm z-50 px-6 py-6 flex justify-between items-center transition-all duration-300">
                <div className="text-sm font-bold tracking-tight uppercase border-b-2 border-slate-900 pb-0.5">Turvasiipi</div>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-serif italic text-slate-500 hidden sm:inline">{timestamp}</span>
                    <Button variant="ghost" size="sm" className="hidden sm:flex text-xs text-slate-400 hover:text-red-500 hover:bg-transparent transition-colors uppercase font-bold tracking-widest gap-2" asChild>
                        <Link href="/">
                            <X className="w-3 h-3" /> Sulje
                        </Link>
                    </Button>
                </div>
            </header>

            <main className="container mx-auto max-w-3xl px-6 pt-32 space-y-20">

                {/* Title Block - Warm & Human */}
                <section className="space-y-8">
                    <h1 className="text-4xl md:text-6xl font-serif font-medium leading-tight text-slate-900">
                        Useimmat eivät hae apua,<br />
                        koska eivät ole vielä mielestään<br />
                        <span className="italic text-slate-500">"tarpeeksi kiusattuja".</span>
                    </h1>

                    <div className="space-y-6 max-w-xl">
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                            Tämä ei välttämättä näytä pahalta paperilla. Saatat ajatella liioittelevasi. Tai että "se on vain huumoria".
                        </p>
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
                            Jos se olisi helppoa, et olisi täällä.
                        </p>
                    </div>
                </section>

                {/* Soft Actions */}
                <section className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-slate-200">
                    <Link href="/quiz">
                        <Button className="rounded-full bg-slate-900 hover:bg-slate-800 text-white h-14 px-8 text-base font-medium transition-all shadow-lg shadow-slate-200/50 hover:scale-105 active:scale-95">
                            Tee testi (jos haluat) <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                    <Link href="/timeline">
                        <Button variant="outline" className="rounded-full h-14 px-8 text-base font-medium border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-900 transition-all">
                            Kirjoita vain itsellesi <PenLine className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                    <p className="text-xs text-slate-400 flex items-center gap-2 sm:ml-auto self-center">
                        <Shield className="w-3 h-3" /> Täysin anonyymi
                    </p>
                </section>

                {/* The Journal - Handwritten feel */}
                <section className="space-y-12 pt-12">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-4">
                        Tuntemuksia
                    </h2>

                    <div className="grid gap-12 relative">
                        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-slate-200" />

                        {/* Moment 1 */}
                        <div className="flex gap-8 group">
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 z-10 text-slate-400 group-hover:border-slate-400 group-hover:text-slate-900 transition-colors shadow-sm">
                                1
                            </div>
                            <div className="space-y-2 pt-1">
                                <h3 className="text-xl font-serif italic text-slate-800">Hämmennys</h3>
                                <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                                    Joku lopettaa puhumisen kun astut huoneeseen. Tai sähköposti on sävyltään vain vähän liian tyly. <br />
                                    <span className="text-slate-400 text-sm mt-2 block">"Kuvittelinko vain?"</span>
                                </p>
                            </div>
                        </div>

                        {/* Moment 2 */}
                        <div className="flex gap-8 group">
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 z-10 text-slate-400 group-hover:border-slate-400 group-hover:text-slate-900 transition-colors shadow-sm">
                                2
                            </div>
                            <div className="space-y-2 pt-1">
                                <h3 className="text-xl font-serif italic text-slate-800">Kuormitus</h3>
                                <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                                    Se ei ole väsymystä, vaan pelkoa. Alat kerätä muistiinpanoja todistaaksesi itsellesi, ettet ole tulossa hulluksi.
                                </p>
                            </div>
                        </div>

                        {/* Moment 3 */}
                        <div className="flex gap-8 group">
                            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 z-10 shadow-lg">
                                3
                            </div>
                            <div className="space-y-4 pt-1">
                                <h3 className="text-xl font-serif italic text-slate-900">Pysähtyminen</h3>
                                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                                    <p className="text-base font-medium text-slate-900 leading-snug">
                                        "Miksi et kertonut aiemmin?"
                                    </p>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        Kun tämä kysymys tulee, olet jo käyttänyt kaiken energiasi selviytymiseen.
                                        Siksi me olemme täällä.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Footnotes / Privacy */}
                <section className="bg-white rounded-3xl p-8 border border-slate-100 flex flex-col md:flex-row gap-8 text-sm text-slate-500">
                    <div className="flex-1 space-y-2">
                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                            <EyeOff className="w-4 h-4" /> Yksityisyys
                        </h4>
                        <p className="leading-relaxed opacity-80">
                            Kaikki kirjoittamasi jää vain tälle laitteelle. Meillä ei ole tietokantoja eikä pilvitallennusta. Jos suljet selaimen, tiedot katoavat (ellet itse tallenna niitä).
                        </p>
                    </div>
                    <div className="flex-1 space-y-2">
                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> Tietopankki
                        </h4>
                        <p className="leading-relaxed opacity-80">
                            Käytämme lähteinä Työterveyslaitoksen ja Mieli ry:n suosituksia. <Link href="/tieto" className="underline hover:text-slate-900">Lue lisää lähteistä.</Link>
                        </p>
                    </div>
                </section>

            </main>
        </div>
    );
}
