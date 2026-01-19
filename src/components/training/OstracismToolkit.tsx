"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Ghost, AlertTriangle, Shield, CheckCircle2,
    MessageCircle, Users, EyeOff, Info, ArrowRight,
    Search, ClipboardList, BookOpen, Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface OstracismToolkitProps {
    onComplete: () => void;
    onExit: () => void;
}

export default function OstracismToolkit({ onComplete, onExit }: OstracismToolkitProps) {
    const [activeTab, setActiveTab] = useState<'basics' | 'signs' | 'manager' | 'strategies'>('basics');

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full -mr-32 -mt-32" />
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3 text-indigo-400">
                        <Ghost className="w-8 h-8" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Koulutusmoduuli</span>
                        <div className="flex-1" />
                        <Button variant="ghost" className="text-indigo-200 hover:text-white hover:bg-white/10" onClick={onExit}>Sulje</Button>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase">Ostrakismi-työkalupakki</h1>
                    <p className="text-slate-400 text-lg max-w-2xl font-medium">
                        Opi tunnistamaan ja purkamaan työyhteisön vaarallisin mutta näkymättömin kiusaamisen muoto: sosiaalinen ulossulkeminen.
                    </p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-white border border-slate-200 rounded-3xl shadow-sm">
                {[
                    { id: 'basics', label: 'Perusteet', icon: BookOpen },
                    { id: 'signs', label: 'Tunnistus', icon: Search },
                    { id: 'manager', label: 'Esimiehelle', icon: Shield },
                    { id: 'strategies', label: 'Strategiat', icon: Lightbulb }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all",
                            activeTab === tab.id
                                ? "bg-slate-900 text-white shadow-lg shadow-slate-200 scale-[1.02]"
                                : "text-slate-500 hover:bg-slate-50"
                        )}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        {activeTab === 'basics' && <BasicsView />}
                        {activeTab === 'signs' && <SignsView />}
                        {activeTab === 'manager' && <ManagerView />}
                        {activeTab === 'strategies' && <StrategiesView />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer Action */}
            <div className="flex justify-center pt-8 border-t border-slate-200">
                <Button
                    onClick={onComplete}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-8 rounded-full font-black uppercase tracking-widest shadow-xl shadow-indigo-100 group"
                >
                    Suoritettu <CheckCircle2 className="ml-3 w-6 h-6 group-hover:scale-110 transition-transform" />
                </Button>
            </div>
        </div>
    );
}

function BasicsView() {
    return (
        <div className="grid md:grid-cols-2 gap-8">
            <Card className="rounded-[2rem] border-slate-200/60 overflow-hidden">
                <div className="bg-indigo-600 p-6 text-white flex items-center gap-3">
                    <Info className="w-6 h-6" />
                    <h3 className="font-black uppercase tracking-widest text-sm">Mikä on ostrakismi?</h3>
                </div>
                <CardContent className="p-8 space-y-4">
                    <p className="text-slate-600 font-medium leading-relaxed">
                        Ostrakismi on yksi tuskallisimmista kiusaamisen muodoista. Se ei ole huutamista tai suoraa hyökkäystä, vaan <span className="text-indigo-600 font-bold">hiljaista ulossulkemista</span>.
                    </p>
                    <p className="text-slate-600 font-medium leading-relaxed">
                        Se aktivoi aivoissa samat alueet kuin fyysinen kipu. Uhria kohdellaan ikään kuin hän olisi näkymätön – 'ghost in the room'.
                    </p>
                </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-slate-200/60 overflow-hidden">
                <div className="bg-slate-900 p-6 text-white flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                    <h3 className="font-black uppercase tracking-widest text-sm">Miksi se on vaarallista?</h3>
                </div>
                <CardContent className="p-8 space-y-4">
                    <ul className="space-y-4">
                        {[
                            { title: "Murentaa itsetunnon", desc: "Aikaansaa tunteen, ettei ole olemassa tai ettei ole tärkeä." },
                            { title: "Vaikea todistaa", desc: "Kiusaaja voi aina väittää 'unohdin' tai 'olin kiireinen'." },
                            { title: "Luo silent consensus -ilmiön", desc: "Muut tiimiläiset alkavat seurata kiusaajan esimerkkiä peläten itse joutuvansa ulkopuoleksi." }
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                                <div>
                                    <div className="font-bold text-slate-900">{item.title}</div>
                                    <div className="text-sm text-slate-500">{item.desc}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}

function SignsView() {
    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                        <EyeOff className="w-6 h-6 text-indigo-600" /> Yksilön tuntomerkkejä
                    </h3>
                    <div className="grid gap-4">
                        {[
                            "Sinua ei tervehditä tai tervehdykseesi ei vastata.",
                            "Keskustelu lakkaa, kun tilaat huoneeseen.",
                            "Tietoa ei jaeta sinulle 'vahingossa'.",
                            "Mielipiteitäsi ei kysytä tai ne ohitetaan nopeasti.",
                            "Kehonkieli viestii torjuntaa (selän kääntäminen)."
                        ].map((sign, i) => (
                            <div key={i} className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-3xl shadow-sm">
                                <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
                                <span className="text-sm font-bold text-slate-700">{sign}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                        <Users className="w-6 h-6 text-emerald-600" /> Tiimin tuntomerkkejä
                    </h3>
                    <div className="grid gap-4">
                        {[
                            "Lounaalle tai kahville lähtöä ei huudella ääneen.",
                            "Sisäpiirivitsit, joita ei selitetä muille.",
                            "Yksi työntekijä saa vain rutiinitehtäviä.",
                            "Epäsymmetrinen viestintä (vain viralliset kanavat yhdelle).",
                            "Passiivinen vastarinta uuden idean edessä."
                        ].map((sign, i) => (
                            <div key={i} className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-3xl shadow-sm">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span className="text-sm font-bold text-slate-700">{sign}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ManagerView() {
    return (
        <Card className="rounded-[2.5rem] border-slate-200/60 overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-3">
                <div className="bg-slate-900 p-8 text-white space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight leading-none">Esimiehen muistilista</h3>
                    <p className="text-slate-400 text-sm font-medium">
                        Ostrakismi on usein esimiehelle näkymätöntä. Sinun on oltava proaktiivinen.
                    </p>
                    <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-3">
                            <Search className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-slate-300">Tarkkaile epämuodollisia rakenteita.</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-3">
                            <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-slate-300">Puhu 1-to-1 keskusteluissa fiiliksestä.</p>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-2 p-8 md:p-12 space-y-8">
                    <div className="grid gap-6">
                        {[
                            { title: "Havaitse", text: "Huomaatko, ettei teemua kutsuta palavereihin? Tai että taukohuone hiljenee, kun Tiina astuu sisään?" },
                            { title: "Dokumentoi", text: "Kirjaa ylös toistuvat poikkeamat tiedonkulussa tai sosiaalisessa inkluusiossa." },
                            { title: "Intervenoi", text: "Keskustele tiimin kanssa 'yhteisistä pelisäännöistä' ilman, että syyllistät ketään yksitellen heti." },
                            { title: "Inkludoi", text: "Luo rakenteita, jotka pakottavat inkluusioon (esim. arvotut parit projekteihin)." }
                        ].map((step, i) => (
                            <div key={i} className="flex gap-6 items-start group">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">{i + 1}</div>
                                <div className="space-y-1">
                                    <h4 className="font-black uppercase text-xs tracking-widest text-slate-900">{step.title}</h4>
                                    <p className="text-sm text-slate-500 font-medium">{step.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}

function StrategiesView() {
    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 p-8 rounded-[2rem] border border-indigo-100 space-y-4">
                <h4 className="font-black text-indigo-600 uppercase text-xs tracking-[0.2em]">Uhreille</h4>
                <div className="space-y-3">
                    <p className="text-sm font-bold text-slate-700">1. Pue sanoiksi havainto asiallisesti.</p>
                    <p className="text-sm font-bold text-slate-700">2. Älä syytä, vaan kysy kiinnostuneena.</p>
                    <p className="text-xs text-slate-500">Esim: 'Huomasin, että viestiini ei vastattu. Puuttuuko siitä jokin tieto vai jäikö se huomaamatta?'</p>
                </div>
            </div>

            <div className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100 space-y-4">
                <h4 className="font-black text-emerald-600 uppercase text-xs tracking-[0.2em]">Sivustaseuraajille</h4>
                <div className="space-y-3">
                    <p className="text-sm font-bold text-slate-700">1. Ole 'jäänmurtaja'.</p>
                    <p className="text-sm font-bold text-slate-700">2. Osoita huomiota uhrille muiden nähden.</p>
                    <p className="text-xs text-slate-500">Esim: 'Mitä sinä olet mieltä tästä, Liisa?' tai pelkkä 'Huomenta!' eristetylle.</p>
                </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 space-y-4">
                <h4 className="font-black text-slate-600 uppercase text-xs tracking-[0.2em]">Organisaatiolle</h4>
                <div className="space-y-3">
                    <p className="text-sm font-bold text-slate-700">1. Nollatoleranssi myös hiljaisuudelle.</p>
                    <p className="text-sm font-bold text-slate-700">2. Suosi rotation-käytäntöjä.</p>
                    <p className="text-xs text-slate-500">Varmistetaan, että klikit eivät pääse muodostumaan pysyviksi rakenteiksi.</p>
                </div>
            </div>
        </div>
    );
}
