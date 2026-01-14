"use client";

import Link from "next/link";
import { ArrowRight, Shield, ShieldCheck, Lock, EyeOff, BookOpen, Feather, ArrowLeft, Globe, Trophy, Gamepad2, Search, User, Wrench, Heart, ChevronDown } from "lucide-react";

export default function Hiekkalaatikko3Page() {
    return (
        <div className="min-h-screen bg-[#0A0A09] text-[#E5E5E0] font-serif selection:bg-slate-800 antialiased overflow-x-hidden">

            {/* Grain/Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Subtle Lighting Effect */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-900/5 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-[#0A0A09]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-screen-xl mx-auto px-8 h-20 flex items-center justify-between">

                    {/* Left side: Logo */}
                    <div className="flex items-center gap-4 mr-8">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                            <Feather className="w-4 h-4 text-slate-400" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 whitespace-nowrap">Turvasiipi / 0.3</span>
                    </div>

                    {/* Middle: Navigation Items */}
                    <div className="hidden lg:flex items-center gap-8 text-[11px] font-mono uppercase tracking-widest text-slate-400 flex-1 justify-center">
                        <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                            <Globe className="w-3.5 h-3.5" />
                            <span>EN</span>
                        </div>
                        <div className="h-4 w-px bg-white/10 mx-1"></div>
                        <Trophy className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                        <Link href="/simulaatio" className="flex items-center gap-2 hover:text-white transition-colors">
                            <Gamepad2 className="w-4 h-4" />
                            <span>Koe</span>
                        </Link>
                        <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                            <Search className="w-4 h-4" />
                            <span>Tutki</span>
                            <ChevronDown className="w-3 h-3 opacity-50" />
                        </div>
                        <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                            <User className="w-4 h-4" />
                            <span>Valmennus</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                            <Wrench className="w-4 h-4" />
                            <span>Välineet</span>
                            <ChevronDown className="w-3 h-3 opacity-50" />
                        </div>
                    </div>

                    {/* Right side: Apua + Close */}
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-[11px] font-mono uppercase tracking-widest transition-colors cursor-pointer group">
                            <Heart className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                            <span>Apua</span>
                            <ChevronDown className="w-3 h-3 opacity-50 ml-1" />
                        </div>
                        <Link href="/" className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                            Sulje
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative max-w-screen-md mx-auto px-8 pt-48 pb-32">

                {/* HERO - The Sanctuary Entrance */}
                <header className="mb-40 space-y-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        <Lock className="w-3 h-3" /> Täysin yksityinen tila
                    </div>

                    <h1 className="text-5xl md:text-6xl font-normal leading-[1.1] tracking-tight">
                        Sinun ei tarvitse selittää tätä <span className="italic text-slate-400">kenellekään muulle.</span>
                    </h1>

                    <div className="max-w-xl space-y-8">
                        <p className="text-2xl text-slate-400 leading-relaxed font-light">
                            Tämä on arkisto, joka ei kysy lupaa tai vaadi päätöksiä.
                            Vain paikka, jossa voit hengittää ja jäsentää sen, mitä tuntuu vaikealta sanoittaa.
                        </p>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <Link href="#" className="px-8 py-4 bg-white text-black hover:bg-slate-200 transition-all rounded-sm font-medium flex items-center gap-3 group">
                                Aloita tästä
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="#" className="px-8 py-4 bg-transparent border border-white/20 hover:border-white/40 transition-all rounded-sm font-medium">
                                Mitä tämä on?
                            </Link>
                        </div>
                    </div>
                </header>

                {/* THE VALUES / ATMOSPHERE */}
                <section className="grid gap-24 mb-48">

                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                            <EyeOff className="w-6 h-6 text-slate-400" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-xl font-medium">Näkymätön suoja</h2>
                            <p className="text-lg text-slate-500 leading-relaxed">
                                Kaikki mitä teet täällä, pysyy laitteellasi. Ei pilvitallennusta, ei seurantaa, ei algoritmia joka arvioisi hätääsi. Vain sinä ja koodi, joka palvelee sinua.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-slate-400" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-xl font-medium">Oman kokemuksen arkisto</h2>
                            <p className="text-lg text-slate-500 leading-relaxed">
                                Kiusaaminen on usein sumua. Me tarjoamme rakenteita, jotka auttavat hälventämään sitä — päivämääriä, havaintoja ja faktoja, joita kukaan ei voi kiistää myöhemmin.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-slate-400" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-xl font-medium">Päätösvalta on sinulla</h2>
                            <p className="text-lg text-slate-500 leading-relaxed">
                                Emme kehota sinua tekemään rikosilmoitusta tai ottamaan yhteyttä HR:ään. Me annamme sinulle tiedot, jotta voit päättää itse, kun olet siihen valmis.
                            </p>
                        </div>
                    </div>

                </section>

                {/* THE FOCUS QUOTE */}
                <section className="py-24 border-y border-white/5 mb-48">
                    <blockquote className="text-3xl md:text-4xl text-center font-light italic text-slate-300 leading-snug max-w-2xl mx-auto">
                        "Ensimmäinen askel ulos kiusaamisesta on lakata selittämästä sitä parhain päin."
                    </blockquote>
                </section>

                {/* ARCHIVE FRAGMENTS - Anonymous stories */}
                <section className="mb-48 space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500">Arkiston fragmentteja</h2>
                        <h3 className="text-3xl font-normal text-slate-200">Et ole ainoa, joka epäilee muistiaan.</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            "Kuvittelin pitkään, että se on vain esimiehen raskas huumorintaju. Kunnes huomasin, että se kohdistuu vain minuun.",
                            "Luulin olevani huono työssäni. Sitten aloin kirjata asioita ylös ja huomasin logiikan säännöllisyyden.",
                            "Pahinta oli se hiljaisuus huoneessa, kun se tapahtui. Kukaan ei sanonut mitään.",
                            "Tuntui, että olin seonnut, kunnes näin merkinnät peräkkäin. Ne olivat siinä, mustaa valkoisella."
                        ].map((quote, i) => (
                            <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-sm hover:bg-white/[0.04] transition-colors group">
                                <p className="text-lg text-slate-400 italic font-light leading-relaxed group-hover:text-slate-200 transition-colors">
                                    "{quote}"
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* THE VAULT VISUALIZATION */}
                <section className="mb-48 grid md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-6 space-y-8">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500">Turvateknologia</h2>
                        <h3 className="text-4xl font-normal leading-tight">Kirjoitettu näkymättömiin, <br />mutta pysyvästi.</h3>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            Käytämme digitaalista allekirjoitusta, joka on kuin sinetti kirjekuoressa. Kun teet merkinnän, se aikaleimataan tavalla, jota ei voi väärentää.
                        </p>
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4 text-sm font-mono text-slate-500">
                                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                                Paikallinen salaus (Ei pilveä)
                            </div>
                            <div className="flex items-center gap-4 text-sm font-mono text-slate-500">
                                <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
                                Muokkaamaton aikajana
                            </div>
                            <div className="flex items-center gap-4 text-sm font-mono text-slate-500">
                                <div className="w-2 h-2 rounded-full bg-orange-500/50"></div>
                                Vain sinun avaimesi alla
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-12 lg:col-span-5 lg:col-start-8">
                        <div className="aspect-square relative flex items-center justify-center">
                            {/* Abstract Vault Visual */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-orange-500/5 rounded-full blur-3xl"></div>
                            <div className="relative w-64 h-64 border border-white/10 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rounded-full"></div>
                                <div className="w-48 h-48 border border-white/5 rounded-full flex items-center justify-center animate-[spin_15s_linear_infinite_reverse]">
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-white/40 rounded-full"></div>
                                    <div className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center bg-white/[0.02] backdrop-blur-sm">
                                        <Lock className="w-8 h-8 text-white/20" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* REFLECTION MOMENT */}
                <section className="mb-48 max-w-xl mx-auto text-center space-y-8 py-16 px-8 bg-white/[0.01] border border-white/5 rounded-2xl">
                    <h3 className="text-2xl font-normal italic text-slate-300">
                        Kenen ääntä kuuntelet juuri nyt?
                    </h3>
                    <div className="flex justify-center gap-12">
                        <button className="text-sm font-mono uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">
                            Omaani
                        </button>
                        <button className="text-sm font-mono uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">
                            Heidän
                        </button>
                    </div>
                    <p className="text-xs text-slate-600 font-mono">
                        Tätä valintaa ei tallenneta mihinkään. Tämä on vain sinulle.
                    </p>
                </section>

                {/* FINAL CALL */}
                <section className="text-center space-y-12">
                    <h2 className="text-4xl font-normal leading-tight">
                        Haluatko kokeilla, <br />
                        miltä selkeys tuntuu?
                    </h2>
                    <div className="flex flex-col items-center gap-6">
                        <Link href="/lukutaito-testi" className="group text-xl border-b border-white/20 pb-2 hover:border-white transition-all flex items-center gap-3">
                            Käy läpi tilanteesi rauhassa
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <span className="text-xs font-mono text-slate-600 uppercase tracking-widest">
                            Ei vaadi kirjautumista. Täysin anonyymi.
                        </span>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="max-w-screen-md mx-auto px-8 py-24 border-t border-white/5 text-center">
                <div className="inline-flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                    <Shield className="w-5 h-5" />
                    <Lock className="w-5 h-5" />
                    <EyeOff className="w-5 h-5" />
                </div>
                <p className="mt-8 text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600">
                    Turvasiipi Vault Environment / 2026
                </p>
            </footer>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap');
                
                :root {
                    --font-serif: 'Playfair Display', serif;
                    --font-sans: 'Inter', sans-serif;
                }

                h1, h2, h3, blockquote {
                    font-family: var(--font-serif);
                }

                body {
                    font-family: var(--font-sans);
                }
            `}</style>
        </div>
    );
}
