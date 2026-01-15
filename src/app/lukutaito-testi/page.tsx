"use client";

import { useState } from "react";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
    ArrowRight, CheckCircle2, ChevronRight, ChevronDown, Activity,
    AlertTriangle, ShieldCheck, ClipboardCheck, BarChart3,
    Thermometer, Heart, Check, X, AlertCircle, RefreshCcw, User, Users
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function WorkplaceStatusPage() {
    return (
        <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-32 space-y-12">

            {/* Header Section */}
            <header className="space-y-6 border-b border-[#E8DDD0] pb-8 text-center md:text-left">
                <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border border-[#5B4B8A] px-3 py-1 rounded-sm inline-block">
                    Työyhteisön tila
                </span>
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2B2B2B]">
                        Tunnista työyhteisön tila
                    </h1>
                    <p className="text-lg text-[#4A4A4A] max-w-2xl leading-relaxed md:ml-0 mx-auto">
                        Terve työpaikka on perusta, josta kaikki lähtee. Tunnista, missä teidän yhteisönne menee, jotta voit toimia oikein.
                    </p>
                </div>
            </header>

            <Tabs defaultValue="warnings" className="w-full space-y-8">
                <TabsList className="flex flex-wrap md:flex-nowrap w-full bg-white border border-[#E8DDD0] p-1 h-auto rounded-sm gap-1">
                    <TabsTrigger value="team_check" className="flex-1 py-3 text-xs md:text-sm uppercase font-bold tracking-wider data-[state=active]:bg-[#FDFBF7] data-[state=active]:text-[#5B4B8A] data-[state=active]:shadow-none rounded-sm bg-transparent text-[#4A4A4A]">
                        <CheckCircle2 className="w-4 h-4 mr-2 hidden sm:inline" /> Tarkista tiimisi
                    </TabsTrigger>
                    <TabsTrigger value="thermometer" className="flex-1 py-3 text-xs md:text-sm uppercase font-bold tracking-wider data-[state=active]:bg-[#FDFBF7] data-[state=active]:text-[#5B4B8A] data-[state=active]:shadow-none rounded-sm bg-transparent text-[#4A4A4A]">
                        <Activity className="w-4 h-4 mr-2 hidden sm:inline" /> Termometri
                    </TabsTrigger>
                    <TabsTrigger value="quicktest" className="flex-1 py-3 text-xs md:text-sm uppercase font-bold tracking-wider data-[state=active]:bg-[#FDFBF7] data-[state=active]:text-[#5B4B8A] data-[state=active]:shadow-none rounded-sm bg-transparent text-[#4A4A4A]">
                        <ClipboardCheck className="w-4 h-4 mr-2 hidden sm:inline" /> Pikatesti
                    </TabsTrigger>
                    <TabsTrigger value="warnings" className="flex-1 py-3 text-xs md:text-sm uppercase font-bold tracking-wider data-[state=active]:bg-[#FDFBF7] data-[state=active]:text-[#5B4B8A] data-[state=active]:shadow-none rounded-sm bg-transparent text-[#4A4A4A]">
                        <AlertTriangle className="w-4 h-4 mr-2 hidden sm:inline" /> Varoitusmerkit
                    </TabsTrigger>
                    <TabsTrigger value="self" className="flex-1 py-3 text-xs md:text-sm uppercase font-bold tracking-wider data-[state=active]:bg-[#FDFBF7] data-[state=active]:text-[#5B4B8A] data-[state=active]:shadow-none rounded-sm bg-transparent text-[#4A4A4A]">
                        <ShieldCheck className="w-4 h-4 mr-2 hidden sm:inline" /> Itsearviointi
                    </TabsTrigger>
                </TabsList>

                {/* --- TEAM CHECKLIST TAB --- */}
                <TabsContent value="team_check" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <TeamChecklistComponent />
                </TabsContent>

                {/* --- THERMOMETER TAB --- */}
                <TabsContent value="thermometer" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white border border-[#E8DDD0] p-8 md:p-12 rounded-sm shadow-sm space-y-8">
                        <div className="flex items-center gap-3 border-b border-[#FAFAFA] pb-4">
                            <Thermometer className="w-6 h-6 text-[#5B4B8A]" />
                            <h2 className="text-xl font-serif font-bold text-[#2B2B2B]">Työhyvinvoinnin termometri</h2>
                        </div>
                        <div className="grid gap-4 max-w-3xl mx-auto">
                            {/* Level 1: Excellent */}
                            <div className="relative group cursor-default">
                                <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-px h-6 bg-[#E8DDD0] z-0 group-last:hidden" />
                                <div className="relative z-10 bg-emerald-50/50 border border-emerald-100 p-6 rounded-sm text-center hover:bg-emerald-50 transition-colors">
                                    <h3 className="text-emerald-900 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                        <Heart className="w-4 h-4 fill-emerald-500 text-emerald-500" /> Erinomainen — Turvallisuuskulttuuri
                                    </h3>
                                    <p className="text-emerald-800/80 text-sm mt-2 font-serif group-hover:block hidden animate-in fade-in">
                                        Avoin vuorovaikutus, virheistä oppiminen, psykologinen turvallisuus kohdallaan.
                                    </p>
                                </div>
                            </div>
                            {/* Level 2: Healthy */}
                            <div className="relative group cursor-default">
                                <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-px h-6 bg-[#E8DDD0] z-0" />
                                <div className="relative z-10 bg-[#FDFBF7] border border-[#E8DDD0] p-6 rounded-sm text-center hover:border-emerald-200 hover:bg-white transition-colors">
                                    <h3 className="text-[#2B2B2B] font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Terve — Näin sen kuuluu olla
                                    </h3>
                                    <p className="text-[#4A4A4A] text-sm mt-2 font-serif group-hover:block hidden animate-in fade-in">
                                        Työ sujuu, ristiriidat ratkotaan asiallisesti, selkeät roolit.
                                    </p>
                                </div>
                            </div>
                            {/* Level 3: Concern */}
                            <div className="relative group cursor-default">
                                <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-px h-6 bg-[#E8DDD0] z-0" />
                                <div className="relative z-10 bg-[#FDFBF7] border border-[#E8DDD0] p-6 rounded-sm text-center hover:border-amber-200 hover:bg-amber-50/10 transition-colors">
                                    <h3 className="text-[#2B2B2B] font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-amber-400" /> Huoli — Varhaiset merkit
                                    </h3>
                                    <p className="text-[#4A4A4A] text-sm mt-2 font-serif group-hover:block hidden animate-in fade-in">
                                        Klikkiytyminen, puhumattomuus, epäselvyydet, satunnainen epäasiallinen käytös.
                                    </p>
                                </div>
                            </div>
                            {/* Level 4: Warning */}
                            <div className="relative z-10 bg-[#FDFBF7] border border-[#E8DDD0] p-6 rounded-sm text-center hover:border-red-200 hover:bg-red-50/10 transition-colors cursor-default group">
                                <h3 className="text-[#2B2B2B] font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" /> Varoitus — Systemaattinen ongelma
                                </h3>
                                <p className="text-[#4A4A4A] text-sm mt-2 font-serif group-hover:block hidden animate-in fade-in">
                                    Jatkuva pelko, sairauspoissaolot, eristäminen, avoin vihamielisyys.
                                </p>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* --- QUICK TEST TAB --- */}
                <TabsContent value="quicktest" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <LiteracyTestComponent />
                </TabsContent>

                {/* --- WARNING SIGNS TAB (REFACTORED WITH DETAILED LEVELS) --- */}
                <TabsContent value="warnings" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-4">
                        <Accordion type="single" collapsible className="w-full space-y-4">

                            {/* 1. KELTAINEN */}
                            <AccordionItem value="yellow" className="bg-white border-l-4 border-l-yellow-400 border border-[#E8DDD0] rounded-sm px-4">
                                <AccordionTrigger className="hover:no-underline py-6">
                                    <div className="flex items-start gap-4 text-left">
                                        <div className="mt-1 bg-yellow-100 p-2 rounded-full">
                                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-[#2B2B2B]">KELTAINEN - Varhaiset merkit</h3>
                                            <p className="text-sm text-[#4A4A4A]">Epämukavuus ja intuitio: "Jokin on pielessä"</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-8 pl-16 grid gap-8">
                                    <p className="text-[#4A4A4A] italic">
                                        Tilanteet tuntuvat oudoilta, mutta ne on helppo selittää pois "huumorilla" tai "kiireellä".
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#2B2B2B]">Valtasuhdemerkit</h4>
                                            <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                                <li>• Esihenkilö vitsailee toistuvasti sinun kustannuksellasi</li>
                                                <li>• Asiantuntijuuttasi vähätellään hienovaraisesti</li>
                                                <li>• Palautetta annetaan eri tavalla kuin muille</li>
                                            </ul>
                                        </div>
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#2B2B2B]">Ilmapiirimerkit</h4>
                                            <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                                <li>• Ihmiset hiljentyvät kun tulet paikalle</li>
                                                <li>• Katsekontaktia vältetään</li>
                                                <li>• "Huumori" tuntuu epämukavalta mutta "älä nyt ole niin herkkä"</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="border border-yellow-200 bg-yellow-50 p-6 rounded-sm">
                                        <div className="flex items-center gap-2 font-bold text-yellow-800 uppercase tracking-widest text-xs mb-2">
                                            <ShieldCheck className="w-4 h-4" /> Tarkista itsesi
                                        </div>
                                        <p className="font-serif text-lg text-yellow-900 border-l-4 border-yellow-300 pl-4 py-1">
                                            "Heräätkö öisin miettimään työtilanteita? Jos kyllä → seuraa tarkemmin"
                                        </p>
                                    </div>

                                    <div className="bg-[#F6F8FF] border border-[#5B4B8A]/20 p-6 rounded-sm">
                                        <h4 className="font-bold text-[#5B4B8A] flex items-center gap-2 mb-4">
                                            <CheckCircle2 className="w-4 h-4" /> Mitä teen nyt?
                                        </h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-[#4A4A4A]">
                                            <li>Aloita "tunnepäiväkirja" - kirjaa päivittäin: miltä tuntui, miksi, kuka oli läsnä</li>
                                            <li>Tee 60 sekunnin itsearviointi kerran viikossa</li>
                                            <li>Kirjoita faktat ylös heti kun jotain tapahtuu</li>
                                            <li>Älä jää pohtimaan yksin - puhu luotettavalle ystävälle</li>
                                        </ol>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* 2. ORANSSI */}
                            <AccordionItem value="orange" className="bg-white border-l-4 border-l-orange-500 border border-[#E8DDD0] rounded-sm px-4">
                                <AccordionTrigger className="hover:no-underline py-6">
                                    <div className="flex items-start gap-4 text-left">
                                        <div className="mt-1 bg-orange-100 p-2 rounded-full">
                                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-[#2B2B2B]">ORANSSI - Toistuvat merkit</h3>
                                            <p className="text-sm text-[#4A4A4A]">Systemaattinen häirintä: "Tämä ei ole enää sattumaa"</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-8 pl-16 grid gap-8">
                                    <p className="text-[#4A4A4A] italic">
                                        Toiminta ei ole enää satunnaista. Se toistuu ja alkaa vaikuttaa työkykyysi.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#2B2B2B]">Valtasuhteen väärinkäyttö</h4>
                                            <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                                <li>• Muuttuvat suoritevaatimukset ("tee paremmin" ilman selkeää kriteeriä)</li>
                                                <li>• "Gotcha-taktiikka" - kun täytät odotukset, ne muuttuvat</li>
                                                <li>• Resurssit tai työvälineet evätään ilman perustelua</li>
                                            </ul>
                                        </div>
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#2B2B2B]">Dokumentointikriteerit (Tärkeä!)</h4>
                                            <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-400 rounded-full" /> Toistuvuus: 3-5+ kertaa viikossa/kuukaudessa</li>
                                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-400 rounded-full" /> Kohdentuminen: Vain sinuun, ei muihin</li>
                                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-400 rounded-full" /> Vaikutus: Suorituksesi tai hyvinvointisi laskee</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="border border-orange-200 bg-orange-50 p-6 rounded-sm">
                                        <div className="flex items-center gap-2 font-bold text-orange-800 uppercase tracking-widest text-xs mb-2">
                                            <ShieldCheck className="w-4 h-4" /> Tarkista itsesi
                                        </div>
                                        <p className="font-serif text-lg text-orange-900 border-l-4 border-orange-300 pl-4 py-1">
                                            "Oletko kertonut jollekulle tilanteesta? Jos et → aika puhua luottamushenkilölle"
                                        </p>
                                    </div>

                                    <div className="bg-[#F6F8FF] border border-[#5B4B8A]/20 p-6 rounded-sm">
                                        <h4 className="font-bold text-[#5B4B8A] flex items-center gap-2 mb-4">
                                            <CheckCircle2 className="w-4 h-4" /> Mitä teen nyt?
                                        </h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-[#4A4A4A]">
                                            <li>Tallenna kaikki sähköpostit ja viestit erilliseen kansioon</li>
                                            <li>Tunnista todistajat - ketkä olivat paikalla?</li>
                                            <li>Ota yhteyttä ammattiliittoon TAI työsuojeluun (et tarvitse molempia heti)</li>
                                            <li>Varaa aika työterveyteen oireiden kirjaamiseksi</li>
                                        </ol>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* 3. PUNAINEN */}
                            <AccordionItem value="red" className="bg-white border-l-4 border-l-red-600 border border-[#E8DDD0] rounded-sm px-4">
                                <AccordionTrigger className="hover:no-underline py-6">
                                    <div className="flex items-start gap-4 text-left">
                                        <div className="mt-1 bg-red-100 p-2 rounded-full">
                                            <AlertTriangle className="w-5 h-5 text-red-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-[#2B2B2B]">PUNAINEN - Vakavat vaarat</h3>
                                            <p className="text-sm text-[#4A4A4A]">Kriisi ja terveysvaara: "Turvallisuutesi on uhattuna"</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-8 pl-16 grid gap-8">
                                    <p className="text-[#4A4A4A] italic">
                                        Tilanne on terveydelle vaarallinen. Kyse ei ole enää "konfliktista" vaan väkivallasta.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#2B2B2B]">Pelko hallitsee</h4>
                                            <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                                <li>• Pelkäät kostotoimia jos puhut</li>
                                                <li>• Et uskalla käyttää oikeuksiasi (esim. sairasloma)</li>
                                                <li>• Harkitset lopettamista ilman uutta työpaikkaa</li>
                                            </ul>
                                        </div>
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#2B2B2B]"> Fyysiset merkit</h4>
                                            <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                                <li>• Unettomuus tai painajaiset työstä</li>
                                                <li>• Vatsavaivat ennen töihin lähtöä</li>
                                                <li>• Paniikkikohtaukset, sydämentykytys</li>
                                                <li>• Jatkuva väsymys huolimatta levosta</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="border border-red-200 bg-red-50 p-6 rounded-sm">
                                        <div className="flex items-center gap-2 font-bold text-red-800 uppercase tracking-widest text-xs mb-2">
                                            <ShieldCheck className="w-4 h-4" /> Tarkista itsesi
                                        </div>
                                        <p className="font-serif text-lg text-red-900 border-l-4 border-red-300 pl-4 py-1">
                                            "Tuntuuko että sinulla ei ole ulospääsyä? Jos kyllä → hae apua NYT"
                                        </p>
                                    </div>

                                    <div className="bg-[#F6F8FF] border border-[#5B4B8A]/20 p-6 rounded-sm">
                                        <h4 className="font-bold text-[#5B4B8A] flex items-center gap-2 mb-4">
                                            <CheckCircle2 className="w-4 h-4" /> Mitä teen nyt?
                                        </h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-[#4A4A4A]">
                                            <li>Soita kriisipuhelimeen NYT (ei "kohta" tai "huomenna")</li>
                                            <li>Harkitse välitöntä sairaslomaa - tämä ON sairaus</li>
                                            <li>Kerro jollekulle läheiselle - ÄLÄ ole yksin tämän kanssa</li>
                                            <li>Poistu tilanteesta fyysisesti jos mahdollista</li>
                                        </ol>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* NEW: Conflict vs Bullying Table */}
                    <Card className="border-[#E8DDD0] bg-white rounded-sm shadow-sm mt-8">
                        <CardContent className="p-8">
                            <h3 className="text-xl font-serif font-bold text-[#2B2B2B] mb-6">Normaali konflikti vs. Kiusaaminen</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-[#E8DDD0]">
                                            <th className="text-left font-bold uppercase tracking-widest text-[10px] text-[#4A4A4A] py-3 text-left w-1/4">Tilanne</th>
                                            <th className="text-left font-bold uppercase tracking-widest text-[10px] text-emerald-700 py-3 w-1/3">
                                                <div className="flex items-center gap-2"><Check className="w-3 h-3" /> Terve työpaikka</div>
                                            </th>
                                            <th className="text-left font-bold uppercase tracking-widest text-[10px] text-amber-600 py-3">
                                                <div className="flex items-center gap-2"><AlertTriangle className="w-3 h-3" /> Varoitusmerkki</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-mono text-[#4A4A4A]">
                                        <tr className="border-b border-[#FAFAFA] hover:bg-[#FDFBF7]">
                                            <td className="py-4 font-bold">Erimielisyys</td>
                                            <td className="py-4 pr-4">Keskustellaan asiallisesti, etsitään ratkaisu</td>
                                            <td className="py-4">Yksi osapuoli vähätellään, asia jää roikkumaan</td>
                                        </tr>
                                        <tr className="border-b border-[#FAFAFA] hover:bg-[#FDFBF7]">
                                            <td className="py-4 font-bold">Virhe</td>
                                            <td className="py-4 pr-4">&quot;Mitä opimme?&quot; - analysoidaan prosessia</td>
                                            <td className="py-4">&quot;Taas sinä?&quot; - toistuvasti saman henkilön &quot;typeryys&quot;</td>
                                        </tr>
                                        <tr className="border-b border-[#FAFAFA] hover:bg-[#FDFBF7]">
                                            <td className="py-4 font-bold">Palaute</td>
                                            <td className="py-4 pr-4">Rakentava, kaksisuuntainen</td>
                                            <td className="py-4">Yksisuuntainen, julkinen, nöyryyttävä</td>
                                        </tr>
                                        <tr className="border-b border-[#FAFAFA] hover:bg-[#FDFBF7]">
                                            <td className="py-4 font-bold">Vitsi</td>
                                            <td className="py-4 pr-4">Kaikki nauravat, kukaan ei loukkaa</td>
                                            <td className="py-4">Yksi on aina kohteena, &quot;älä nyt ole herkkä&quot;</td>
                                        </tr>
                                        <tr className="border-b border-[#FAFAFA] hover:bg-[#FDFBF7]">
                                            <td className="py-4 font-bold">Huono päivä</td>
                                            <td className="py-4 pr-4">Kollega pahoittelee kireyttä</td>
                                            <td className="py-4">Toistuvaa, kohdistuu vain sinuun</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- SELF ASSESSMENT TAB --- */}
                <TabsContent value="self" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <SelfAssessmentComponent />
                </TabsContent>
            </Tabs>
        </div>
    );
}

// --- TEAM CHECKLIST COMPONENT (Existing) ---
const TEAM_CRITERIA = {
    interaction: {
        title: "Vuorovaikutus ja viestintä",
        items: [
            "Palaute annetaan rakentavasti ja kahden kesken",
            "Kritiikki on tasapainoista - kaikki saavat sitä",
            "Kehut annetaan julkisesti, moitteet yksityisesti",
            "Virheitä käsitellään oppimismahdollisuuksina",
            "Vitsit eivät kohdistu yhteen henkilöön",
            "Kun huomauttaa epäasiallisesta, siihen puututaan"
        ]
    },
    info: {
        title: "Tiedonkulku ja päätöksenteko",
        items: [
            "Kaikki saavat saman tiedon samaan aikaan",
            "Kokouskutsut lähetetään kaikille relevanteille",
            "Päätökset perustellaan läpinäkyvästi",
            "Muutokset ilmoitetaan etukäteen",
            "Resurssit jaetaan tasapuolisesti",
            "Odotukset ovat selkeät ja pysyvät"
        ]
    },
    power: {
        title: "Valtasuhteet ja dynamiikka",
        items: [
            "Esihenkilö kuuntelee ja ottaa vastaan palautetta",
            "Hierarkia ei estä avointa keskustelua",
            "Virheistä voi puhua ilman pelkoa",
            "Erimielisyydet ratkaistaan asiallisesti",
            "Kaikilla on yhtäläinen oikeus tulla kuulluksi",
            "Valta-asemaa ei käytetä väärin"
        ]
    },
    atmosphere: {
        title: "Ilmapiiri ja yhteisö",
        items: [
            "Ihmiset juttelevat rennosti keskenään",
            "Kukaan ei jää systemaattisesti ulkopuolelle",
            "Lounaita ja taukoja vietetään yhdessä",
            "Onnistumiset juhlistetaan tiimillä",
            "Apua pyydetään ja annetaan vapaasti",
            "Tunnelma ei muutu kenenkään tullessa"
        ]
    },
    feelings: {
        title: "Omat tunnereaktiot",
        items: [
            "Nautit työstäsi suurimman osan ajasta",
            "Nukut hyvin, et herää miettiä työasioita",
            "Töihin meno ei aiheuta ahdistusta",
            "Voit olla oma itsesi työpaikalla",
            "Luotat kollegoihisi ja esimieheen",
            "Tunnet kuuluvasi yhteisöön"
        ]
    }
};

function TeamChecklistComponent() {
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const toggle = (section: string, index: number) => {
        const key = `${section}-${index}`;
        setChecked(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const totalChecked = Object.values(checked).filter(Boolean).length;
    // const totalItems = Object.values(TEAM_CRITERIA).reduce((acc, cat) => acc + cat.items.length, 0);
    const isCrisis = totalChecked < 15;

    return (
        <div className="space-y-8">
            <div className="bg-white border border-[#E8DDD0] p-8 rounded-sm shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 sticky top-4 z-20">
                <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-2xl font-serif font-bold text-[#2B2B2B]">Tarkista tiimisi</h2>
                    <p className="text-[#4A4A4A]">Rastita kohdat, jotka toteutuvat työpaikallasi.</p>
                </div>

                <div className={cn(
                    "px-8 py-4 rounded-sm border-2 flex items-center gap-6 transition-colors",
                    isCrisis ? "bg-red-50 border-red-100 text-red-900" : "bg-emerald-50 border-emerald-100 text-emerald-900"
                )}>
                    <div className="text-center">
                        <div className="text-3xl font-black">{totalChecked}</div>
                        <div className="text-[9px] uppercase font-bold tracking-widest opacity-70">Rastia</div>
                    </div>
                    <div className="h-10 w-px bg-current opacity-20" />
                    <div>
                        <div className="font-bold flex items-center gap-2 uppercase tracking-wide">
                            {isCrisis ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                            {isCrisis ? "KRIISI" : "TERVE"}
                        </div>
                        <div className="text-xs opacity-90 max-w-[180px] leading-tight mt-1">
                            {isCrisis ? "Akuutti toiminta tarpeen. Ota yhteys työsuojeluun. 🔴" : "Työyhteisösi vaikuttaa voivan hyvin. Jatka samaan malliin! 🟢"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(TEAM_CRITERIA).map(([key, category]) => {
                    const sectionCheckedCount = category.items.filter((_, idx) => checked[`${key}-${idx}`]).length;

                    return (
                        <Card key={key} className="border-[#E8DDD0] bg-white rounded-sm shadow-sm">
                            <CardContent className="p-8 space-y-6">
                                <div className="flex justify-between items-baseline border-b border-[#FAFAFA] pb-4">
                                    <h3 className="font-bold font-serif text-lg text-[#2B2B2B]">{category.title}</h3>
                                    <Badge variant="secondary" className="bg-[#FDFBF7] text-[#4A4A4A] border border-[#E8DDD0] font-mono text-xs">
                                        {sectionCheckedCount} / {category.items.length}
                                    </Badge>
                                </div>
                                <div className="space-y-4">
                                    {category.items.map((item, index) => {
                                        const isChecked = checked[`${key}-${index}`];
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => toggle(key, index)}
                                                className="flex items-start gap-4 text-left w-full group"
                                            >
                                                <div className={cn(
                                                    "w-5 h-5 rounded-sm border mt-0.5 shrink-0 flex items-center justify-center transition-all",
                                                    isChecked ? "bg-[#5B4B8A] border-[#5B4B8A]" : "bg-white border-[#E8DDD0] group-hover:border-[#5B4B8A]"
                                                )}>
                                                    {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                                                </div>
                                                <span className={cn(
                                                    "text-sm transition-colors",
                                                    isChecked ? "text-[#2B2B2B] font-medium" : "text-[#4A4A4A] group-hover:text-[#2B2B2B]"
                                                )}>
                                                    {item}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

// --- LITERACY TEST COMPONENT (Existing) ---
import { literacyScenarios } from "@/data/literacy-test";

function LiteracyTestComponent() {
    const { completeModule } = useProgress();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [lastResult, setLastResult] = useState<{ isCorrect: boolean } | null>(null);
    const [isFinished, setIsFinished] = useState(false);

    const currentScenario = literacyScenarios[currentIndex];

    const handleAnswer = (userChoice: boolean) => {
        const isCorrect = userChoice === currentScenario.isBullying;
        if (isCorrect) setScore(prev => prev + 1);
        setLastResult({ isCorrect });
        setHasAnswered(true);
    };

    const nextScenario = () => {
        if (currentIndex < literacyScenarios.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setHasAnswered(false);
            setLastResult(null);
        } else {
            setIsFinished(true);
            completeModule('literacy_test');
        }
    };

    if (isFinished) {
        return (
            <div className="bg-white border border-[#E8DDD0] p-8 rounded-sm text-center">
                <h3 className="text-2xl font-serif font-bold text-[#2B2B2B] mb-2">Tulos: {score} / {literacyScenarios.length}</h3>
                <p className="text-[#4A4A4A] mb-6">Testi suoritettu. Jatka harjoittelua parantaaksesi tunnistamistaitojasi.</p>
                <Button onClick={() => { setIsFinished(false); setCurrentIndex(0); setScore(0); }} variant="outline" className="border-[#2B2B2B] text-[#2B2B2B] uppercase font-bold tracking-widest text-xs">
                    Tee uudelleen
                </Button>
            </div>
        )
    }

    return (
        <div className="bg-white border border-[#E8DDD0] p-8 md:p-12 rounded-sm shadow-sm">
            <div className="flex justify-between items-center mb-8 border-b border-[#FAFAFA] pb-4">
                <h3 className="font-serif font-bold text-xl text-[#2B2B2B]">Skenaario {currentIndex + 1}</h3>
                <span className="text-xs font-mono text-[#5B4B8A]">{currentIndex + 1} / {literacyScenarios.length}</span>
            </div>

            <p className="text-lg text-[#2B2B2B] leading-relaxed mb-8 min-h-[80px]">
                &quot;{currentScenario.text}&quot;
            </p>

            {!hasAnswered ? (
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => handleAnswer(true)} className="p-6 border border-[#E8DDD0] hover:bg-[#FDFBF7] hover:border-[#5B4B8A] text-left transition-all group rounded-sm">
                        <span className="block font-bold text-[#2B2B2B] mb-1 group-hover:text-[#5B4B8A]">Kyllä</span>
                        <span className="text-xs text-[#4A4A4A]">Tämä on kiusaamista</span>
                    </button>
                    <button onClick={() => handleAnswer(false)} className="p-6 border border-[#E8DDD0] hover:bg-[#FDFBF7] hover:border-[#5B4B8A] text-left transition-all group rounded-sm">
                        <span className="block font-bold text-[#2B2B2B] mb-1 group-hover:text-[#5B4B8A]">Ei</span>
                        <span className="text-xs text-[#4A4A4A]">Tämä on konflikti/muuta</span>
                    </button>
                </div>
            ) : (
                <div className="space-y-6 animate-in fade-in">
                    <div className={cn("p-6 border-l-4 bg-[#FDFBF7]", lastResult?.isCorrect ? "border-[#5B4B8A]" : "border-[#E8DDD0]")}>
                        <h4 className="font-bold font-serif text-[#2B2B2B] mb-2">{lastResult?.isCorrect ? "Oikea tulkinta" : "Väärä tulkinta"}</h4>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">{currentScenario.explanation}</p>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={nextScenario} className="bg-[#2B2B2B] text-white hover:bg-[#4A4A4A] uppercase font-bold tracking-widest text-xs">
                            Seuraava <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

// --- SELF ASSESSMENT COMPONENT (Updated with User Content) ---

type QuestionType = "slider" | "single_choice";

interface Question {
    id: string;
    text: string;
    category: string;
    type: QuestionType;
    options?: string[];
}

const SITUATION_DATA: Record<string, Question[]> = {
    "Käytös": [
        { id: "k1", text: "Työkaverini vitsailevat toistuvasti minun kustannuksellani", category: "Käytös", type: "slider" },
        { id: "k2", text: "Saan julkista kritiikkiä virheistäni, kun muut eivät", category: "Käytös", type: "slider" },
        { id: "k3", text: "Asiantuntemustani vähätellään tai mitätöidään", category: "Käytös", type: "slider" },
        { id: "k4", text: "Minulle sanotaan \"älä ole niin herkkä\" kun mainitsen loukkauksen", category: "Käytös", type: "slider" },
        { id: "k5", text: "Jään säännöllisesti pois tärkeistä kokouksista ilman syytä", category: "Käytös", type: "slider" },
        { id: "k6", text: "En saa samaa tietoa kuin muut tiimin jäsenet", category: "Käytös", type: "slider" },
        { id: "k7", text: "Työtehtäviäni muutetaan ilman selitystä", category: "Käytös", type: "slider" },
        { id: "k8", text: "Palautetta minulle annetaan eri tavalla kuin muille", category: "Käytös", type: "slider" },
        { id: "k9", text: "Keskustelut hiljenevät kun tulen paikalle", category: "Käytös", type: "slider" },
        { id: "k10", text: "Minut jätetään systemaattisesti ulkopuolelle sosiaalisista tilanteista", category: "Käytös", type: "slider" },
        { id: "k11", text: "Kollegat välttelevät katsekontaktia kanssani", category: "Käytös", type: "slider" },
        { id: "k12", text: "Lounaille tai tauoille mennään ilman minua", category: "Käytös", type: "slider" }
    ],
    "Valtasuhteet": [
        { id: "v1", text: "Esimieheni kohtelee minua eri tavalla kuin muita", category: "Valtasuhteet", type: "slider" },
        { id: "v2", text: "Suoritevaatimukset muuttuvat jatkuvasti ilman selkeää perustetta", category: "Valtasuhteet", type: "slider" },
        { id: "v3", text: "Pelkään kostotoimia jos nostan huolen esiin", category: "Valtasuhteet", type: "slider" },
        { id: "v4", text: "Resursseja tai työvälineitä evätään minulta ilman syytä", category: "Valtasuhteet", type: "slider" },
        { id: "v5", text: "Päätökset minua koskien tehdään ilman perusteluja", category: "Valtasuhteet", type: "slider" },
        { id: "v6", text: "Minulla ei ole samanlaista pääsyä tietoon kuin muilla", category: "Valtasuhteet", type: "slider" }
    ],
    "Omat reaktiot": [
        { id: "r1", text: "Nukun huonosti tai näen painajaisia työstä", category: "Omat reaktiot", type: "slider" },
        { id: "r2", text: "Minulla on vatsavaivoja ennen töihin lähtöä", category: "Omat reaktiot", type: "slider" },
        { id: "r3", text: "Tunnen jatkuvaa väsymystä huolimatta levosta", category: "Omat reaktiot", type: "slider" },
        { id: "r4", text: "Sydämeni tykyttää ennen tiettyjä tapaamisia", category: "Omat reaktiot", type: "slider" },
        { id: "r5", text: "Mietin työtilanteitä vapaa-ajalla tai öisin", category: "Omat reaktiot", type: "slider" },
        { id: "r6", text: "Epäilen olevani itse ongelma", category: "Omat reaktiot", type: "slider" },
        { id: "r7", text: "Vältän tiettyjä ihmisiä tai tilanteita aktiivisesti", category: "Omat reaktiot", type: "slider" },
        { id: "r8", text: "Työmotivaationi on laskenut merkittävästi", category: "Omat reaktiot", type: "slider" }
    ],
    "Toistuvuus ja kesto": [
        { id: "t1", text: "Kuinka kauan tilanne on jatkunut?", category: "Toistuvuus ja kesto", type: "single_choice", options: ["Alle viikko", "1-4 viikkoa", "1-3 kk", "3-6 kk", "Yli 6 kk"] },
        { id: "t2", text: "Kuinka usein kokemuksesi toistuvat?", category: "Toistuvuus ja kesto", type: "single_choice", options: ["Kerran", "Satunnaisesti", "Viikoittain", "Päivittäin", "Useita kertoja päivässä"] },
        { id: "t3", text: "Onko tilanne pahentumassa?", category: "Toistuvuus ja kesto", type: "single_choice", options: ["Ei", "Pysynyt samana", "Kyllä, hitaasti", "Kyllä, nopeasti"] }
    ]
};

// Simplified culture questions for demo parity (can be expanded similarly)
const CULTURE_DATA: Record<string, Question[]> = {
    "Johtaminen ja valtasuhteet": [
        { id: "c1", text: "Esihenkilöni antaa palautetta tasapuolisesti kaikille", category: "Johtaminen ja valtasuhteet", type: "slider" },
        { id: "c2", text: "Kritiikki annetaan rakentavasti ja kahden kesken", category: "Johtaminen ja valtasuhteet", type: "slider" },
        { id: "c3", text: "Kehut annetaan julkisesti, moitteet yksityisesti", category: "Johtaminen ja valtasuhteet", type: "slider" },
        { id: "c4", text: "Virheitä käsitellään oppimismahdollisuuksina", category: "Johtaminen ja valtasuhteet", type: "slider" },
        { id: "c5", text: "Päätökset perustellaan läpinäkyvästi", category: "Johtaminen ja valtasuhteet", type: "slider" },
        { id: "c6", text: "Alaisten mielipiteitä kuunnellaan ja otetaan huomioon", category: "Johtaminen ja valtasuhteet", type: "slider" },
        { id: "c7", text: "Muutoksista tiedotetaan etukäteen", category: "Johtaminen ja valtasuhteet", type: "slider" },
        { id: "c8", text: "Resurssit jaetaan tasapuolisesti", category: "Johtaminen ja valtasuhteet", type: "slider" }
    ],
    "Vuorovaikutus ja ilmapiiri": [
        { id: "c9", text: "Kaikki saavat saman tiedon samaan aikaan", category: "Vuorovaikutus ja ilmapiiri", type: "slider" },
        { id: "c10", text: "Kokouskutsut lähetetään kaikille relevanteille", category: "Vuorovaikutus ja ilmapiiri", type: "slider" },
        { id: "c11", text: "Vitsit eivät kohdistu yhteen henkilöön toistuvasti", category: "Vuorovaikutus ja ilmapiiri", type: "slider" },
        { id: "c12", text: "Lounaita ja taukoja vietetään yhdessä", category: "Vuorovaikutus ja ilmapiiri", type: "slider" },
        { id: "c13", text: "Kukaan ei jää systemaattisesti ulkopuolelle", category: "Vuorovaikutus ja ilmapiiri", type: "slider" },
        { id: "c14", text: "Epäasiallisuuteen puututaan välittömästi", category: "Vuorovaikutus ja ilmapiiri", type: "slider" },
        { id: "c15", text: "Ilmapiiriongelmista voi puhua avoimesti", category: "Vuorovaikutus ja ilmapiiri", type: "slider" },
        { id: "c16", text: "Jos huomautan loukkaavasta käytöksestä, siihen reagoidaan", category: "Vuorovaikutus ja ilmapiiri", type: "slider" },
        { id: "c17", text: "Hiljainen hyväksyntä (sivustakatselu) ei ole hyväksyttävää", category: "Vuorovaikutus ja ilmapiiri", type: "slider" },
        { id: "c18", text: "Naljailu ei ole \"vain vitsiä\" -anteeksipyyntö", category: "Vuorovaikutus ja ilmapiiri", type: "slider" }
    ],
    "Tukirakenteet ja prosessit": [
        { id: "c19", text: "Tiedän mihin ilmoitan kiusaamishuolesta", category: "Tukirakenteet ja prosessit", type: "slider" },
        { id: "c20", text: "Työsuojeluvaltuutetun yhteystiedot ovat helposti saatavilla", category: "Tukirakenteet ja prosessit", type: "slider" },
        { id: "c21", text: "Prosessit kiusaamistapauksissa ovat selkeät", category: "Tukirakenteet ja prosessit", type: "slider" },
        { id: "c22", text: "Ilmoitukset käsitellään nopeasti (alle 7 päivää)", category: "Tukirakenteet ja prosessit", type: "slider" },
        { id: "c23", text: "Voin tuoda esiin huoleni ilman pelkoa seurauksista", category: "Tukirakenteet ja prosessit", type: "slider" },
        { id: "c24", text: "Ilmoittaminen on luottamuksellista", category: "Tukirakenteet ja prosessit", type: "slider" },
        { id: "c25", text: "Puuttujia tuetaan, ei rangaista", category: "Tukirakenteet ja prosessit", type: "slider" },
        { id: "c26", text: "Toistuviin tapauksiin puututaan tehokkaasti", category: "Tukirakenteet ja prosessit", type: "slider" }
    ],
    "Psykologinen turvallisuus": [
        { id: "c27", text: "Voin olla oma itseni työpaikalla", category: "Psykologinen turvallisuus", type: "slider" },
        { id: "c28", text: "Erimielisyydet ratkaistaan asiallisesti", category: "Psykologinen turvallisuus", type: "slider" },
        { id: "c29", text: "Virheistä voi puhua ilman pelkoa", category: "Psykologinen turvallisuus", type: "slider" },
        { id: "c30", text: "Apua pyydetään ja annetaan vapaasti", category: "Psykologinen turvallisuus", type: "slider" },
        { id: "c31", text: "Tunnen kuuluvani yhteisöön", category: "Psykologinen turvallisuus", type: "slider" },
        { id: "c32", text: "Tunnelma ei muutu kenenkään tullessa paikalle", category: "Psykologinen turvallisuus", type: "slider" }
    ],
    "Puuttumisen rohkeus": [
        { id: "c33", text: "Puuttuisin havaitsemaani epäasiallisuuteen", category: "Puuttumisen rohkeus", type: "slider" },
        { id: "c34", text: "Puuttuisin vaikka kohteena olisi vaikutusvaltainen henkilö", category: "Puuttumisen rohkeus", type: "slider" },
        { id: "c35", text: "Kollegani tukisivat minua jos puuttuisin", category: "Puuttumisen rohkeus", type: "slider" },
        { id: "c36", text: "Tiedän turvallisen tavan puuttua", category: "Puuttumisen rohkeus", type: "slider" },
        { id: "c37", text: "Olen puuttunut viimeisen 3 kk aikana havaittuani epäasiallisuutta", category: "Puuttumisen rohkeus", type: "slider" }
    ],
    "Seuranta ja kehitys": [
        { id: "c38", text: "Ilmapiirikyselyjä tehdään säännöllisesti", category: "Seuranta ja kehitys", type: "slider" },
        { id: "c39", text: "Kyselyn tulokset johtavat konkreettisiin toimiin", category: "Seuranta ja kehitys", type: "slider" },
        { id: "c40", text: "Koulutusta kiusaamisen tunnistamisesta järjestetään", category: "Seuranta ja kehitys", type: "slider" }
    ]
};
// Feedback data for detailed analysis
const RESULT_FEEDBACK: Record<string, {
    risk: { low: string, medium: string, high: string },
    culture: { low: string, medium: string, high: string }
}> = {
    // Tunnista tilanteesi (Risk Mode: High score = Bad)
    "Käytös": {
        risk: {
            low: "Tilanne on rauhallinen. Satunnaiset erimielisyydet kuuluvat työhön, mutta ne eivät vaikuta toistuvan.",
            medium: "Havaittavissa on joitakin huolestuttavia piirteitä. Kiinnitä huomiota, toistuvatko tietyt vitsit tai kommentit.",
            high: "VAKAVA RISKI: Raportoit toistuvaa epäasiallista käytöstä. Tämä voi täyttää työpaikkakiusaamisen tunnusmerkit."
        },
        culture: { low: "-", medium: "-", high: "-" } // Not used in culture mode
    },
    "Valtasuhteet": {
        risk: {
            low: "Koet tulevasi kohdelluksi tasavertaisesti.",
            medium: "Johtamisessa tai päätöksenteossa on epäselvyyksiä.",
            high: "VAKAVA RISKI: Epätasapuolinen kohtelu tai vallan väärinkäyttö on ilmeistä."
        },
        culture: { low: "-", medium: "-", high: "-" }
    },
    "Omat reaktiot": {
        risk: {
            low: "Työ ei vaikuta merkittävästi vointiisi vapaa-ajalla.",
            medium: "Työasiat pyörivät mielessä, mutta palaudut vielä.",
            high: "HÄLYTTÄVÄÄ: Oireesi viittaavat vakavaan kuormitukseen (univaikeudet, ahdistus)."
        },
        culture: { low: "-", medium: "-", high: "-" }
    },
    "Toistuvuus ja kesto": {
        risk: {
            low: "Tilanteet ovat yksittäisiä.",
            medium: "Tilanne on jatkunut jonkin aikaa.",
            high: "Pitkittynyt tai toistuva tilanne vaatii välitöntä puuttumista."
        },
        culture: { low: "-", medium: "-", high: "-" }
    },

    // Työkulttuuri (Culture Mode: Low score = Bad, High score = Good)
    "Johtaminen ja valtasuhteet": {
        risk: { low: "-", medium: "-", high: "-" },
        culture: {
            low: "Johtamisessa on vakavia puutteita. Epäselvät vastuut ja tuen puute kuormittavat.",
            medium: "Johtaminen toimii osittain, mutta läpinäkyvyydessä on parannettavaa.",
            high: "Johtaminen on oikeudenmukaista ja tuki on saatavilla."
        }
    },
    "Vuorovaikutus ja ilmapiiri": {
        risk: { low: "-", medium: "-", high: "-" },
        culture: {
            low: "Ilmapiiri on tulehtunut tai pelokas. Asioista ei uskalleta puhua.",
            medium: "Ilmapiiri on asiallinen, mutta ei erityisen avoin.",
            high: "Työyhteisössä on turvallista ja mukavaa olla."
        }
    },
    "Tukirakenteet ja prosessit": {
        risk: { low: "-", medium: "-", high: "-" },
        culture: {
            low: "Prosessi ongelmiin puuttumiseksi puuttuu tai ei toimi.",
            medium: "Prosessit ovat olemassa, mutta niiden käytännön toimivuus vaihtelee.",
            high: "Tukirakenteet (esim. työsuojelu, HR) toimivat hyvin."
        }
    },
    "Psykologinen turvallisuus": {
        risk: { low: "-", medium: "-", high: "-" },
        culture: {
            low: "Virheiden tekemistä pelätään ja erilaisuutta ei hyväksytä.",
            medium: "Perusturvallisuus on kunnossa, mutta haavoittuvuutta vältellään.",
            high: "Huipputaso: Tiimissä voi olla täysin oma itsensä."
        }
    },
    "Puuttumisen rohkeus": {
        risk: { low: "-", medium: "-", high: "-" },
        culture: {
            low: "Epäkohtiin ei uskalleta tai haluta puuttua.",
            medium: "Puuttuminen on yksilöiden vastuulla, ei yhteinen tapa.",
            high: "Jokainen ottaa vastuun yhteisestä ilmapiiristä."
        }
    },
    "Seuranta ja kehitys": {
        risk: { low: "-", medium: "-", high: "-" },
        culture: {
            low: "Ongelmia lakaistaan maton alle eikä niitä seurata.",
            medium: "Kyselyitä tehdään, mutta toimenpiteet jäävät joskus piippuun.",
            high: "Kehitys on jatkuvaa ja dataan reagoivaa."
        }
    }
};

function SelfAssessmentComponent() {
    const [mode, setMode] = useState<"menu" | "situation" | "culture">("menu");
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [currentStep, setCurrentStep] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const questionsData = mode === "situation" ? SITUATION_DATA : CULTURE_DATA;
    const sections = Object.keys(questionsData);

    const handleStart = (selectedMode: "situation" | "culture") => {
        setMode(selectedMode);
        setAnswers({});
        setCurrentStep(0);
        setIsFinished(false);
    };

    const handleAnswer = (id: string, value: any) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const nextStep = () => {
        if (currentStep < sections.length - 1) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            setIsFinished(true);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const calculateScore = () => {
        let totalScore = 0;
        let maxScore = 0;

        const data = mode === 'situation' ? SITUATION_DATA : CULTURE_DATA;

        Object.entries(data).forEach(([section, qs]) => {
            qs.forEach(q => {
                if (q.type === 'slider') {
                    totalScore += (answers[q.id] || 3);
                    maxScore += 5;
                }
            });
        });

        const percent = Math.round((totalScore / maxScore) * 100);
        return percent || (mode === 'situation' ? 61 : 60); // fallback mocks
    };

    if (mode === "menu") {
        return (
            <div className="space-y-8 animate-in fade-in">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-serif font-bold text-[#2B2B2B]">Itsearviointityökalut</h2>
                    <p className="text-[#4A4A4A] max-w-xl mx-auto">
                        Kokeile uusia arviointityökaluja. Data ei tallennu pysyvästi mihinkään tietokantaan, vaan toimii tässä istunnossa.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <Card className="hover:border-[#5B4B8A] transition-colors cursor-pointer group" onClick={() => handleStart("situation")}>
                        <CardContent className="p-8 text-center space-y-6">
                            <div className="w-16 h-16 bg-[#5B4B8A]/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-[#5B4B8A] transition-colors">
                                <User className="w-8 h-8 text-[#5B4B8A] group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#2B2B2B] mb-2">Tunnista tilanteesi</h3>
                                <p className="text-sm text-[#4A4A4A]">Anonyymi työkalu omien kokemusten jäsentämiseen. Tunnista onko kyse kiusaamisesta.</p>
                            </div>
                            <Button className="w-full bg-[#5B4B8A] hover:bg-[#4A3A7A]">ALOITA</Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:border-emerald-600 transition-colors cursor-pointer group" onClick={() => handleStart("culture")}>
                        <CardContent className="p-8 text-center space-y-6">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-emerald-600 transition-colors">
                                <Users className="w-8 h-8 text-emerald-700 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#2B2B2B] mb-2">Työkulttuurin itsearviointi</h3>
                                <p className="text-sm text-[#4A4A4A]">Arvioi tiimisi tilaa. Miten johtaminen, vuorovaikutus ja turvallisuus toteutuvat?</p>
                            </div>
                            <Button className="w-full bg-emerald-700 hover:bg-emerald-800">ALOITA</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (isFinished) {
        const percent = calculateScore();
        const categoryScores = sections.map(section => {
            // Calculate real section score
            const sectionQs = questionsData[section].filter(q => q.type === 'slider');
            if (sectionQs.length === 0) return { section, score: 0 };

            const sectionTotal = sectionQs.reduce((acc, q) => acc + (answers[q.id] || 3), 0);
            const sectionMax = sectionQs.length * 5;
            return { section, score: Math.round((sectionTotal / sectionMax) * 100) };
        });

        // Feedback Logic
        let feedback = {
            color: "bg-orange-500",
            textColor: "text-orange-600",
            iconColor: "bg-red-500",
            title: "TULOKSET",
            badge: `${percent}%`,
            description: "Tulokset analysoitu."
        };

        if (mode === 'situation') {
            // Risk Logic (High % = Bad)
            if (percent >= 60) {
                feedback = {
                    color: "bg-orange-500",
                    textColor: "text-orange-600",
                    iconColor: "bg-red-500",
                    title: "VAKAVIA ONGELMIA HAVAITTAVISSA",
                    badge: `VAKAVA RISKI ${percent}%`,
                    description: "Työhyvinvointisi on vaarassa. Kokemuksesi viittaavat toistuvaan epäasialliseseen kohteluun. Suosittelemme aloittamaan tilanteiden dokumentoinnin ja puhumaan luottamushenkilölle."
                };
            } else {
                feedback = {
                    color: "bg-emerald-600",
                    textColor: "text-emerald-700",
                    iconColor: "bg-emerald-400",
                    title: "TILANNE VAIKUTTAA RAUHALLISELTA",
                    badge: `MATALA RISKI ${percent}%`,
                    description: "Tilanteessa ei näy välittömiä hälytysmerkkejä, mutta pidä huolta rajoistasi."
                };
            }
        } else {
            // Culture Logic (High % = Good)
            if (percent >= 80) {
                feedback = {
                    color: "bg-emerald-600",
                    textColor: "text-emerald-700",
                    iconColor: "bg-white",
                    title: "TERVE TYÖKULTTUURI",
                    badge: `ERINOMAINEN ${percent}%`,
                    description: "Työyhteisössänne asiat ovat hyvin. Johtaminen ja vuorovaikutus toimivat."
                };
            } else if (percent >= 50) {
                feedback = {
                    color: "bg-amber-500",
                    textColor: "text-amber-700",
                    iconColor: "bg-amber-100",
                    title: "KEHITETTÄVÄÄ LÖYTYY",
                    badge: `VÄLTTÄVÄ ${percent}%`,
                    description: "Työyhteisössä on haasteita, jotka vaikuttavat ilmapiiriin ja jaksamiseen. Avoimempi keskustelu ja pelisääntöjen selkeyttäminen olisi tarpeen."
                };
            } else {
                feedback = {
                    color: "bg-red-600",
                    textColor: "text-red-700",
                    iconColor: "bg-red-200",
                    title: "HÄLYTTÄVÄ TILANNE",
                    badge: `HEIKKO ${percent}%`,
                    description: "Työkulttuurissa on vakavia puutteita, jotka vaativat välitöntä puuttumista johdon taholta."
                };
            }
        }

        return (
            <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto">
                <Button variant="ghost" onClick={() => setMode("menu")} className="text-[#4A4A4A] hover:text-[#2B2B2B] pl-0">
                    &larr; Palaa alkuun
                </Button>

                <div className={cn("rounded-lg p-8 md:p-12 text-center text-white shadow-sm space-y-6", feedback.color)}>
                    <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-2 rounded-full backdrop-blur-sm shadow-sm">
                        <div className={cn("w-3 h-3 rounded-full", feedback.iconColor)} />
                        <span className="font-bold text-sm tracking-wide uppercase">{feedback.badge}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">{feedback.title}</h2>
                    <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
                        {feedback.description}
                    </p>
                    <Button variant="secondary" className={cn("bg-white hover:bg-white/90 font-bold uppercase tracking-widest mt-4", feedback.textColor)}>
                        {mode === 'situation' ? "Näytä toimintaohjeet" : "Lue suositukset"}
                    </Button>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-[#2B2B2B] uppercase tracking-wider text-center">Osa-alueiden analyysi</h3>
                    <p className="text-[#4A4A4A] text-sm text-center">Klikkaa osa-aluetta nähdäksesi tarkemman analyysin ja toimenpidesuositukset.</p>

                    <div className="grid gap-4">
                        {categoryScores.map((cat, idx) => {
                            const isExpanded = expandedCategory === cat.section;

                            // Determine status level for feedback
                            let statusLevel: 'low' | 'medium' | 'high' = 'medium';
                            if (mode === 'situation') {
                                // Risk Mode: High score = BAD (High Risk)
                                if (cat.score < 30) statusLevel = 'low';      // Low Risk
                                else if (cat.score < 60) statusLevel = 'medium'; // Warning
                                else statusLevel = 'high';                    // High Risk
                            } else {
                                // Culture Mode: High score = GOOD (Healthy)
                                if (cat.score < 50) statusLevel = 'low';      // Bad (Alarming)
                                else if (cat.score < 80) statusLevel = 'medium'; // OK (Needs improvement)
                                else statusLevel = 'high';                    // Good (Healthy)
                            }

                            // Feedback Text
                            const feedbackText = RESULT_FEEDBACK[cat.section]?.[mode === 'situation' ? 'risk' : 'culture']?.[statusLevel]
                                || "Ei palautetta saatavilla.";

                            // Colors based on Status Level & Mode
                            let colorClass = "bg-slate-100";
                            let textClass = "text-slate-700";
                            let borderClass = "border-[#E8DDD0]";

                            if (mode === 'situation') {
                                if (statusLevel === 'high') { colorClass = "bg-red-100"; textClass = "text-red-700"; borderClass = "border-red-200 bg-red-50/50"; }
                                else if (statusLevel === 'medium') { colorClass = "bg-amber-100"; textClass = "text-amber-700"; borderClass = "border-amber-200 bg-amber-50/50"; }
                                else { colorClass = "bg-emerald-100"; textClass = "text-emerald-700"; borderClass = "border-emerald-200 bg-emerald-50/50"; }
                            } else {
                                if (statusLevel === 'low') { colorClass = "bg-red-100"; textClass = "text-red-700"; borderClass = "border-red-200 bg-red-50/50"; }
                                else if (statusLevel === 'medium') { colorClass = "bg-amber-100"; textClass = "text-amber-700"; borderClass = "border-amber-200 bg-amber-50/50"; }
                                else { colorClass = "bg-emerald-100"; textClass = "text-emerald-700"; borderClass = "border-emerald-200 bg-emerald-50/50"; }
                            }

                            return (
                                <div
                                    key={idx}
                                    className={cn(
                                        "rounded-lg border transition-all duration-300 overflow-hidden",
                                        borderClass,
                                        isExpanded ? "shadow-md scale-[1.02]" : "hover:border-[#5B4B8A] cursor-pointer"
                                    )}
                                    onClick={() => setExpandedCategory(isExpanded ? null : cat.section)}
                                >
                                    <div className="p-5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("w-2 h-10 rounded-full shrink-0",
                                                mode === 'situation'
                                                    ? (statusLevel === 'high' ? 'bg-red-500' : (statusLevel === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'))
                                                    : (statusLevel === 'low' ? 'bg-red-500' : (statusLevel === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'))
                                            )} />
                                            <div>
                                                <h4 className="font-serif font-bold text-[#2B2B2B] text-lg leading-tight">{cat.section}</h4>
                                                {!isExpanded && (
                                                    <p className="text-xs text-[#4A4A4A] mt-1 font-medium tracking-wide uppercase opacity-70">
                                                        Klikkaa suositukset auki
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={cn("font-black text-xl", textClass)}>{Math.round(cat.score)}%</span>
                                            <ChevronDown className={cn("w-5 h-5 text-[#4A4A4A] transition-transform duration-300", isExpanded && "rotate-180")} />
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2">
                                            <div className="h-px w-full bg-[#E8DDD0]/50 mb-4" />
                                            <p className="text-[#2B2B2B] leading-relaxed text-base font-medium">
                                                {feedbackText}
                                            </p>

                                            <div className="mt-4 flex gap-2">
                                                <Badge variant="outline" className={cn("bg-white/50 backdrop-blur-sm", textClass, borderClass)}>
                                                    {mode === 'situation' && statusLevel === 'high' && "Vakava riski"}
                                                    {mode === 'situation' && statusLevel === 'medium' && "Huomion arvoinen"}
                                                    {mode === 'situation' && statusLevel === 'low' && "Matala riski"}

                                                    {mode === 'culture' && statusLevel === 'low' && "Kriittinen"}
                                                    {mode === 'culture' && statusLevel === 'medium' && "Kehitettävää"}
                                                    {mode === 'culture' && statusLevel === 'high' && "Erinomainen"}
                                                </Badge>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex justify-center pt-12 pb-8">
                        <Button onClick={() => handleStart(mode)} variant="outline" className="border-[#2B2B2B] text-[#2B2B2B] font-bold uppercase tracking-widest hover:bg-[#FDFBF7] px-8 py-6 text-lg">
                            <RefreshCcw className="w-5 h-5 mr-3" /> Tee uudelleen
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const currentSection = sections[currentStep];
    const progress = Math.round((currentStep / sections.length) * 100);

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in bg-white p-6 md:p-12 border border-[#E8DDD0] rounded-sm">
            {/* Header */}
            <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between text-sm font-bold text-[#4A4A4A] uppercase tracking-widest">
                    <span>{currentSection}</span>
                    <span>{progress}% VALMIS</span>
                </div>
                <div className="h-1 w-full bg-[#FAFAFA] rounded-full overflow-hidden">
                    <div className="h-full bg-[#5B4B8A] transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#E8DDD0] flex items-center justify-center font-serif font-bold text-[#2B2B2B]">
                        {currentStep + 1}
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-[#2B2B2B]">{currentSection}</h2>
                </div>
            </div>

            {/* Questions */}
            <div className="space-y-12">
                {questionsData[currentSection].map((q) => (
                    <div key={q.id} className="space-y-6 border-b border-[#FAFAFA] pb-8 last:border-0">
                        <h4 className="text-lg font-medium text-[#2B2B2B]">{q.text}</h4>

                        {q.type === 'slider' && (
                            <div className="space-y-4 px-2">
                                <Slider
                                    value={[answers[q.id] || 3]}
                                    min={1}
                                    max={5}
                                    step={1}
                                    className="py-4 cursor-pointer"
                                    onValueChange={(val) => handleAnswer(q.id, val[0])}
                                />
                                <div className="flex justify-between text-xs text-[#4A4A4A] font-medium uppercase tracking-wider">
                                    <span>{mode === 'situation' ? "Ei koskaan" : "Eri mieltä"}</span>
                                    <span className="text-center opacity-50">{mode === 'situation' ? "Joskus" : "Ei samaa/eri mieltä"}</span>
                                    <span>{mode === 'situation' ? "Jatkuvasti" : "Samaa mieltä"}</span>
                                </div>
                            </div>
                        )}

                        {q.type === 'single_choice' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {q.options?.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => handleAnswer(q.id, opt)}
                                        className={cn(
                                            "p-3 rounded-sm text-sm text-left transition-all border",
                                            answers[q.id] === opt
                                                ? "bg-[#5B4B8A] text-white border-[#5B4B8A]"
                                                : "bg-[#FDFBF7] text-[#4A4A4A] border-[#E8DDD0] hover:border-[#5B4B8A]"
                                        )}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer Navigation */}
            <div className="pt-8 flex justify-between items-center gap-4">
                <Button variant="ghost" onClick={prevStep} disabled={currentStep === 0} className="text-[#4A4A4A]">
                    Edellinen
                </Button>
                <Button onClick={nextStep} className="bg-[#5B4B8A] text-white hover:bg-[#4A3A7A] px-8 py-6 text-lg uppercase tracking-widest font-bold">
                    {currentStep === sections.length - 1 ? "Näytä tulokset" : "Seuraava osio"} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
