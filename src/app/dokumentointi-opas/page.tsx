"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, BookOpen, Shield, AlertTriangle, CheckCircle2, XCircle, ArrowRight, Quote, Lock, Copy, Eye, FileCheck, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DocumentationGuidePage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] pb-20">
            {/* Header */}
            <div className="bg-[#2B2B2B] text-white pt-32 pb-16 px-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/timeline" className="inline-flex items-center text-white/60 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Takaisin
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                        Dokumentoinnin <br />
                        <span className="text-emerald-400">Masterclass</span>
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
                        Miten muutat hajanaiset kokemukset juridisesti päteväksi näytöksi ilman, että uuvut prosessiin.
                    </p>
                </div>
            </div>

            <main className="max-w-3xl mx-auto px-6 -mt-10 space-y-16">

                {/* Intro Card */}
                <Card className="border-none shadow-xl bg-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
                    <CardContent className="p-8 md:p-10 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-emerald-100 rounded-full text-emerald-700 shrink-0">
                                <Shield className="w-8 h-8" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#2B2B2B]">Miksi tämä on tärkeää?</h2>
                                <p className="text-[#4A4A4A] leading-relaxed text-lg">
                                    Työpaikkakiusaamisesta kannattaa tehdä mahdollisimman konkreettisia, päiväkirjamaisia muistiinpanoja. Yksi koherentti loki on vahvempi todiste kuin sata hajanaista muistilappua.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4 pt-2">
                                    <div className="bg-[#FDFBF7] p-4 rounded-lg border border-[#E8DDD0]">
                                        <h3 className="font-bold text-[#5B4B8A] mb-2 flex items-center gap-2">
                                            <Lock className="w-4 h-4" /> Suojaa muistisi
                                        </h3>
                                        <p className="text-sm text-[#4A4A4A]">Stressi heikentää muistia. Kirjaamalla tapahtumat heti, säilytät yksityiskohdat, jotka muuten katoaisivat.</p>
                                    </div>
                                    <div className="bg-[#FDFBF7] p-4 rounded-lg border border-[#E8DDD0]">
                                        <h3 className="font-bold text-[#5B4B8A] mb-2 flex items-center gap-2">
                                            <Eye className="w-4 h-4" /> Paljastaa toistuvuuden
                                        </h3>
                                        <p className="text-sm text-[#4A4A4A]">Yksittäinen tapahtuma voidaan selittää väärinkäsityksenä. Aikajana paljastaa systemaattisen kaavan.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Psychological Safety */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 text-[#5B4B8A]">
                        <AlertTriangle className="w-6 h-6" />
                        <h2 className="text-sm font-bold uppercase tracking-widest">Miksi aloittaminen on vaikeaa?</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-[#E8DDD0] hover:border-[#5B4B8A]/30 transition-colors">
                            <h3 className="font-bold text-[#2B2B2B] mb-2">"En halua olla hankala"</h3>
                            <p className="text-[#4A4A4A] text-sm leading-relaxed">
                                Pelko leimautumisesta on yleinen. Muista: dokumentointi on vain sinua varten. Se ei ole vielä ilmoitus. Se on vakuutus.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-[#E8DDD0] hover:border-[#5B4B8A]/30 transition-colors">
                            <h3 className="font-bold text-[#2B2B2B] mb-2">"Kuvittelenko vain?"</h3>
                            <p className="text-[#4A4A4A] text-sm leading-relaxed">
                                Epävarmuus kuuluu asiaan. Juuri siksi kirjaaminen auttaa: kun näet tapahtumat paperilla, alat erottaa faktat tunteista.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 5-Point Formula & Copyable Template */}
                <section className="space-y-8">
                    <div className="text-center max-w-lg mx-auto space-y-2">
                        <h2 className="text-3xl font-serif font-bold text-[#2B2B2B]">5 kohdan kaava</h2>
                        <p className="text-[#4A4A4A]">Tämä rakenne tekee merkinnästäsi juridisesti vahvan.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-[#E8DDD0] overflow-hidden">
                        <div className="grid divide-y divide-[#E8DDD0]">
                            {[
                                { num: 1, title: "Aika", desc: "Päivämäärä ja kellonaika (noin-tarkkuus riittää)" },
                                { num: 2, title: "Paikka", desc: "Missä tilanne tapahtui? (Neukkari, Teams, Kahvihuone)" },
                                { num: 3, title: "Henkilöt", desc: "Kuka teki? Kuka muu oli paikalla (todistajat)?" },
                                { num: 4, title: "Teko", desc: "Mitä sanottiin tai tehtiin? Käytä suoria lainauksia jos voit." },
                                { num: 5, title: "Vaikutus", desc: "Miten se vaikutti työhösi tai vointiisi juuri silloin?" },
                            ].map((item) => (
                                <div key={item.num} className="p-6 flex gap-4 items-center">
                                    <div className="w-10 h-10 rounded-full bg-[#2B2B2B] text-white flex items-center justify-center font-bold text-lg shrink-0">
                                        {item.num}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#2B2B2B]">{item.title}</h3>
                                        <p className="text-[#4A4A4A] text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Copyable Template Card */}
                    <Card className="border-indigo-100 bg-indigo-50/30">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-[#5B4B8A] flex items-center gap-2">
                                    <Copy className="w-4 h-4" /> Kopioitava lomakepohja
                                </h3>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-200"
                                    onClick={() => {
                                        const template = `1. Aika: \n2. Paikka: \n3. Henkilöt: \n4. Teko: \n5. Vaikutus: \n6. Jatkotoimet: `;
                                        navigator.clipboard.writeText(template);
                                        alert('Pohja kopioitu leikepöydälle!');
                                    }}
                                >
                                    <Copy className="w-3 h-3 mr-2" /> Kopioi pohja
                                </Button>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-indigo-100 text-sm font-mono text-[#4A4A4A] whitespace-pre-line">
                                1. Aika: 15.1.2026 klo 9.15<br />
                                2. Paikka: Neukkari A<br />
                                3. Henkilöt: Tekijä NN, Todistaja MM<br />
                                4. Teko: Sanoi "Olet hidaste", pyöritti silmiä.<br />
                                5. Vaikutus: Tehtävä viivästyi 2h.<br />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Follow-up Tracking */}
                    <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 space-y-2">
                        <h3 className="font-bold text-amber-900 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Tärkeä lisäys: Jatkotoimet
                        </h3>
                        <p className="text-amber-800 text-sm leading-relaxed">
                            Kirjaa myös, mitä teit tilanteen jälkeen. Tämä paljastaa, jos asiaan ei puututa.<br />
                            <em>"16.1.2026: Kerroin työsuojelulle. Seuraavassa palaverissa esimies sivalsi uudestaan."</em>
                        </p>
                    </div>
                </section>

                {/* Interactive Training: Observation vs Emotion */}
                <section className="space-y-8 py-8">
                    <div className="text-center max-w-lg mx-auto space-y-2">
                        <h2 className="text-3xl font-serif font-bold text-[#2B2B2B]">Tunne vs. Havainto</h2>
                        <p className="text-[#4A4A4A]">Harjoittele kääntämään tunnekieli konkreettisiksi havainnoiksi.</p>
                    </div>

                    <div className="space-y-6">
                        <TrainingCard
                            bad="Hän nöyryytti minua."
                            good="Hän sanoi: 'Sinusta ei koskaan tule pätevää opettajaa', ja muut nauroivat."
                            explanation="Nöyryyttäminen on tulkinta. Sitaatti ja nauru ovat faktoja, jotka voi todistaa."
                        />
                        <TrainingCard
                            bad="Ilmapiiri on myrkyllinen."
                            good="Tiimipalaverissa 3/4 edellisellä viikolla esimies vitsaili ulkonäöstäni."
                            explanation="Myrkyllisyys on abstrakti käsite. Toistuvat vitsit ovat konkreettinen teko."
                        />
                        <TrainingCard
                            bad="Hän on narsisti ja vihaa minua."
                            good="Hän ei vastannut tervehdykseeni aamulla, mutta tervehti muita paikallaolijoita."
                            explanation="Älä diagnosoi. Kuvaa vain se, mitä ulkopuolinen havaitsisi videolta."
                        />
                    </div>
                </section>

                {/* Witness Protection & Anonymization */}
                <section className="grid md:grid-cols-2 gap-8">
                    <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-[#E8DDD0] space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#5B4B8A] rounded-lg text-white">
                                <Quote className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-[#2B2B2B]">Todistajien suojaaminen</h2>
                        </div>

                        <div className="space-y-4 text-[#4A4A4A] leading-relaxed text-sm">
                            <p><strong>Anonymisoi lokisi:</strong> Älä kirjaa nimiä ennen virallista prosessia. Käytä koodeja.</p>
                            <ul className="space-y-2 list-disc pl-4 marker:text-[#5B4B8A]">
                                <li>Kirjaa: "Todistaja A (tiimin jäsen) vahvisti asian."</li>
                                <li>Pyydä HR:ltä anonymisoitu yhteenveto.</li>
                                <li>Kysy neutraalisti: "Olisiko ok kertoa havainnoistasi, jos kysytään?"</li>
                            </ul>
                        </div>
                    </div>

                    {/* Technical Security */}
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-700 rounded-lg text-white">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-[#2B2B2B]">Tekninen suoja</h2>
                        </div>

                        <div className="space-y-4 text-[#4A4A4A] leading-relaxed text-sm">
                            <p><strong>Älä käytä työlaitteita muistiinpanoihin.</strong></p>
                            <ul className="space-y-2 list-disc pl-4 marker:text-slate-400">
                                <li><strong>Yksi loki:</strong> Google Docs (oma tili), Notion tai vihko kotona.</li>
                                <li><strong>Varmuuskopio:</strong> Lähetä itsellesi sähköpostia viikoittain.</li>
                                <li><strong>Kovat todisteet:</strong> Ota kuvakaappaukset chateista heti.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Templates Link */}
                <section className="bg-indigo-900 text-white p-8 rounded-3xl space-y-6 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="space-y-4 max-w-lg">
                            <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
                                <FileCheck className="w-8 h-8 text-indigo-300" />
                                Tarvitsetko virallisen asiakirjan?
                            </h2>
                            <p className="text-indigo-100 text-sm leading-relaxed">
                                Joskus pelkkä lokimerkintä ei riitä. Olemme laatineet valmiita pohjia (esim. ilmoitus työturvallisuudesta, vastine varoitukseen), jotta sinun ei tarvitse miettiä sanamuotoja yksin.
                            </p>
                        </div>
                        <Link href="/raportti">
                            <Button className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold px-6 py-6 rounded-xl shadow-lg transition-all group shrink-0">
                                Selaa mallipohjia <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Motivation Challenge */}
                <section className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl border border-emerald-100 text-center space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl -mr-16 -mt-16" />

                    <h2 className="text-2xl font-serif font-bold text-[#2B2B2B]">Pieni askel -haaste</h2>
                    <div className="grid md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
                        <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">Tänään</span>
                            <p className="text-sm">Kirjoita VAIN eilisen tapaus 5 minuutissa.</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">Huomenna</span>
                            <p className="text-sm">Lisää yksi vanha muisto listalle.</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">Viikossa</span>
                            <p className="text-sm">Huomaat kaavan itse. Se on voimauttavaa.</p>
                        </div>
                    </div>
                    <p className="text-emerald-800 text-sm italic">"Tämä on sinun turvasi, ei taistelu. Kirjoita sen verran kuin jaksat."</p>
                </section>

                {/* Final CTA */}
                <div className="bg-[#2B2B2B] rounded-3xl p-8 md:p-12 text-center space-y-6">
                    <h2 className="text-3xl font-serif font-bold text-white">Oletko valmis kokeilemaan?</h2>
                    <p className="text-white/70 max-w-md mx-auto">
                        Paras aika aloittaa on nyt. Vaikka vain yhdellä lauseella.
                    </p>
                    <Link href="/loki" className="inline-block">
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-6 rounded-xl text-lg shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                            Avaa Lokikirja <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>

                <div className="h-10" />
            </main>
        </div>
    );
}

function TrainingCard({ bad, good, explanation }: { bad: string, good: string, explanation: string }) {
    const [revealed, setRevealed] = useState(false);

    return (
        <div className="grid md:grid-cols-2 gap-4 items-stretch relative">
            {/* The "Bad" Side */}
            <div className={cn(
                "p-6 rounded-xl border border-dashed border-rose-200 bg-rose-50/50 transition-opacity",
                revealed ? "opacity-50" : "opacity-100"
            )}>
                <div className="flex items-center gap-2 mb-3 text-rose-600 font-bold text-xs uppercase tracking-widest">
                    <XCircle className="w-4 h-4" /> Tunnekieli
                </div>
                <p className="text-lg font-medium text-rose-900">"{bad}"</p>
            </div>

            {/* The "Good" Side (Hidden/Revealed) */}
            <div
                className={cn(
                    "p-6 rounded-xl border transition-all cursor-pointer relative overflow-hidden group",
                    revealed
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-white border-[#E8DDD0] hover:border-[#5B4B8A]"
                )}
                onClick={() => setRevealed(true)}
            >
                {!revealed && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[2px] z-10 group-hover:bg-white/30 transition-colors">
                        <span className="bg-[#2B2B2B] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg transform group-hover:scale-105 transition-transform">
                            <BookOpen className="w-4 h-4" /> Katso parempi versio
                        </span>
                    </div>
                )}

                <div className="flex items-center gap-2 mb-3 text-emerald-600 font-bold text-xs uppercase tracking-widest">
                    <CheckCircle2 className="w-4 h-4" /> Havainto
                </div>
                <p className="text-lg font-bold text-[#2B2B2B] mb-2">"{good}"</p>
                <p className="text-sm text-[#4A4A4A] border-t border-emerald-200/50 pt-2 mt-2">
                    💡 {explanation}
                </p>
            </div>

            {!revealed && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:block hidden z-20 pointer-events-none">
                    <ArrowRight className="w-6 h-6 text-[#2B2B2B]/20" />
                </div>
            )}
        </div>
    );
}
