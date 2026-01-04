"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Gamepad2, Brain, HeartPulse, User } from "lucide-react";
import Link from "next/link";

export default function SimulatorPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-900 text-white py-24">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black opacity-90" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                <div className="relative container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center space-y-8">
                        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                            <Gamepad2 className="w-4 h-4" />
                            INTERAKTIIVINEN KOKEMUS
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                            Koe työpaikkakiusaamisen <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">todellisuus</span>
                        </h1>

                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                            Simulaattori, joka avaa silmät kiusaamisen dynamiikalle.
                            Astu sairaanhoitajan, opettajan tai asiantuntijan saappaisiin ja koe,
                            miten pienet teot kasaantuvat ja vaikuttavat terveyteen.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg h-14 px-8 rounded-full shadow-lg shadow-indigo-900/20">
                                Aloita simulaatio
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features / Pillars */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={Brain}
                        title="Ymmärrä dynamiikka"
                        description="Näe miten hierarkia, vaikenemisen kulttuuri ja gaslighting toimivat käytännössä."
                        color="text-purple-600"
                        bg="bg-purple-50"
                    />
                    <FeatureCard
                        icon={HeartPulse}
                        title="Koe vaikutukset"
                        description="Seuraa miten henkinen ja fyysinen terveys rapautuu paineen alla 90 päivän aikana."
                        color="text-rose-600"
                        bg="bg-rose-50"
                    />
                    <FeatureCard
                        icon={User}
                        title="Rakenna empatiaa"
                        description="Astu toisen asemaan. Koe tunteet, joita pelkkä teksti ei voi välittää."
                        color="text-indigo-600"
                        bg="bg-indigo-50"
                    />
                </div>
            </section>

            {/* Profession Selection Placeholder */}
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Valitse ammattisi</h2>
                        <p className="text-slate-600">Jokaisella alalla kiusaaminen saa omat muotonsa.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {/* Nurse - Active */}
                        <Link href="/simulaatio/hoitaja">
                            <div className="group relative bg-white border-2 border-slate-100 rounded-3xl p-8 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 cursor-pointer text-left h-full">
                                <div className="absolute top-4 right-4 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Beta
                                </div>
                                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                                    🏥
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Sairaanhoitaja</h3>
                                <p className="text-slate-600 mb-6">"Nurses eat their young." Koe hierarkkinen väkivalta ja osaston paineet.</p>
                                <span className="text-indigo-600 font-semibold flex items-center group-hover:gap-2 transition-all absolute bottom-8">
                                    Pelaa skenaario <ArrowRight className="w-4 h-4 ml-2" />
                                </span>
                            </div>
                        </Link>

                        {/* Teacher - Coming Soon */}
                        <div className="bg-slate-50 border-2 border-slate-100 rounded-3xl p-8 opacity-70 cursor-not-allowed">
                            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 text-3xl grayscale">
                                👩‍🏫
                            </div>
                            <h3 className="text-xl font-bold text-slate-500 mb-2">Opettaja</h3>
                            <p className="text-slate-400 mb-6">Ulkopuolinen paine vanhemmilta ja tuen puute johdolta.</p>
                            <span className="text-slate-400 font-medium text-sm flex items-center">
                                Tulossa pian
                            </span>
                        </div>

                        {/* Developer - Coming Soon */}
                        <div className="bg-slate-50 border-2 border-slate-100 rounded-3xl p-8 opacity-70 cursor-not-allowed">
                            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 text-3xl grayscale">
                                💻
                            </div>
                            <h3 className="text-xl font-bold text-slate-500 mb-2">IT-asiantuntija</h3>
                            <p className="text-slate-400 mb-6">Crunch-kulttuuri, epärealistiset aikataulut ja syyllistäminen.</p>
                            <span className="text-slate-400 font-medium text-sm flex items-center">
                                Tulossa pian
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function FeatureCard({ icon: Icon, title, description, color, bg }: any) {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className={`${bg} ${color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{description}</p>
        </div>
    );
}
