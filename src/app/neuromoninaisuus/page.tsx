"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Brain, Target, Scale, MessageCircle, AlertTriangle, Zap, Ear, Heart, BookOpen, ShieldCheck, ArrowRight, UserCheck, Briefcase } from "lucide-react";
import Link from "next/link";

export default function NeurodiversityPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* HEADER */}
                <div className="text-center space-y-6">
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1 text-sm">
                        Oppimiskeskus
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                        Neuromoninaisuus työelämässä
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Aivosi toimivat eri tavalla? Se on voimavarasi.
                        <br />
                        <span className="text-base mt-2 block">
                            Neuromoninaisuus kattaa tilat kuten autismikirjon, ADHD, dysleksia ja dyspraksia. Se ei ole sairaus, vaan osa ihmisen luonnollista vaihtelua.
                        </span>
                    </p>
                </div>

                {/* INTRODUCTION CARDS */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                                <Brain className="w-8 h-8" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">Mistä kyse?</CardTitle>
                                <CardDescription>15-20% väestöstä</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="text-slate-600 space-y-2 text-sm">
                            <p><strong>ADHD (5%):</strong> Luovuus, energisyys, "out-of-the-box" ajattelu. Haasteina keskittyminen ja impulssikontrolli.</p>
                            <p><strong>Autismikirjo (2%):</strong> Systeemiajattelu, yksityiskohtien havaitseminen, johdonmukaisuus. Haasteina sosiaalinen kommunikaatio.</p>
                            <p><strong>Dysleksia (10%):</strong> Visuaalinen ajattelu, kokonaisuuksien hahmottaminen.</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-slate-900 to-indigo-900 text-white border-none shadow-lg">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="p-3 bg-white/10 text-white rounded-xl">
                                <Zap className="w-8 h-8" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">Supervoimat</CardTitle>
                                <CardDescription className="text-indigo-200">Tutkittuja vahvuuksia</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="text-indigo-50 space-y-2 text-sm">
                            <p>🏆 <strong>Tuottavuus:</strong> Autism at Work -ohjelmissa jopa 140% tuottavampia ja vähemmän virheitä.</p>
                            <p>💡 <strong>Innovaatio:</strong> Kuvioiden tunnistaminen ja monimutkainen ongelmanratkaisu.</p>
                            <p>🔍 <strong>Hyperfokus:</strong> Kyky uppoutua täysin tehtävään ja tuottaa poikkeuksellista laatua.</p>
                        </CardContent>
                    </Card>
                </div>

                {/* MAIN CONTENT SECTIONS */}
                <div className="space-y-8">

                    {/* 1. HAASTEET */}
                    <section id="haasteet">
                        <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-slate-800">
                            <AlertTriangle className="w-6 h-6 text-amber-500" />
                            Miksi työelämä kuormittaa?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base flex items-center gap-2"><Briefcase className="w-4 h-4 text-slate-400" /> Työympäristö</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-slate-600 space-y-2">
                                    <p>Avokonttorit (melu, valot), spontaanit palaverit ilman agendaa, ja jatkuva "small talk" -kulttuuri kuormittavat aisteja ja sosiaalista akkua.</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base flex items-center gap-2"><Ear className="w-4 h-4 text-slate-400" /> Väärinkäsitykset</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-slate-600 space-y-2">
                                    <p>Suora puhe tulkitaan töykeydeksi. Katsekontaktin puute tulkitaan epärehellisyydeksi. 96% vammoista on näkymättömiä.</p>
                                </CardContent>
                            </Card>
                            <Card className="md:col-span-2 border-red-100 bg-red-50/50">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base flex items-center gap-2 text-red-700">⚠️ Masking (Naamioituminen)</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-slate-700 space-y-2">
                                    <p>
                                        Masking tarkoittaa oireiden piilottamista sopeutuakseen. Se kuluttaa valtavasti energiaa ja johtaa uupumukseen, ahdistukseen ja identiteetin katoamiseen.
                                        <strong> Burnout-riski on merkittävästi korkeampi.</strong>
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* 2. MITÄ VOIT TEHDÄ */}
                    <section id="toiminta" className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
                        <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-slate-800">
                            <UserCheck className="w-6 h-6 text-emerald-600" />
                            Mitä voit tehdä?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-emerald-800">Työntekijälle</h3>
                                <ul className="space-y-3 text-slate-600 text-sm">
                                    <li className="flex gap-2"><span className="text-emerald-500 font-bold">1.</span> Tunnista tarpeesi: Mikä ympäristö tukee sinua?</li>
                                    <li className="flex gap-2"><span className="text-emerald-500 font-bold">2.</span> Dokumentoi: Milloin keskittymisesi on parhaimmillaan?</li>
                                    <li className="flex gap-2"><span className="text-emerald-500 font-bold">3.</span> Viesti selkeästi: "Kirjalliset ohjeet auttavat minua hahmottamaan kokonaisuuden paremmin."</li>
                                    <li className="flex gap-2"><span className="text-emerald-500 font-bold">4.</span> Suojaa energiaasi: Älä maskeeraa jos ei ole pakko. Ota taukoja.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-indigo-800">Esimiehelle & Kollegalle</h3>
                                <ul className="space-y-3 text-slate-600 text-sm">
                                    <li className="flex gap-2"><span className="text-indigo-500 font-bold">1.</span> Älä oleta - kysy: "Miten voisin tukea työskentelyäsi?"</li>
                                    <li className="flex gap-2"><span className="text-indigo-500 font-bold">2.</span> Tarjoa mukautuksia: Etätyö, hiljainen tila, vastamelukuulokkeet.</li>
                                    <li className="flex gap-2"><span className="text-indigo-500 font-bold">3.</span> Kommunikoi ennakoiden: Agendat etukäteen, selkeät aikataulut.</li>
                                    <li className="flex gap-2"><span className="text-indigo-500 font-bold">4.</span> Normalisoi erilaisuus: Jokaisella on oikeus olla oma itsensä.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 3. TEORIA & TYÖKALUT */}
                    <Accordion type="single" collapsible className="w-full bg-slate-100 p-4 rounded-xl">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-lg font-semibold text-slate-700">🥄 Lusikkateoria (Spoon Theory)</AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed space-y-3">
                                <p>
                                    Kuvittele, että sinulla on aamulla 12 lusikkaa (energiaa). Suihku vie yhden, työmatka kaksi. Masking palaverissa vie kolme.
                                    Kun lusikat loppuvat, seuraa "shutdown". Se ei ole laiskuutta, vaan resurssien täydellistä loppumista.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-lg font-semibold text-slate-700">🤝 Kaksoisempatian ongelma</AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed space-y-3">
                                <p>
                                    Tutkimukset osoittavat, että kommunikaatiokatkokset johtuvat usein kahdesta eri "kielestä", ei empatiakyvyn puutteesta.
                                    Neurotyypillinen odottaa vihjailua, neuroepätyypillinen suoruutta. Molemmat voivat oppia ymmärtämään toisiaan.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-lg font-semibold text-slate-700">⚖️ Laki ja Oikeutesi</AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed space-y-3">
                                <p><strong>Yhdenvertaisuuslaki:</strong> Työnantajan on tehtävä kohtuulliset mukautukset vammaisuuden perusteella. Tämä ei ole erityiskohtelua, vaan lainmukainen oikeus.</p>
                                <p>Jos koet syrjintää, ota yhteyttä työterveyshuoltoon, työsuojeluvaltuutettuun tai liittoon.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </div>

                {/* SIMULATION CALL TO ACTION */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-indigo-500 to-rose-500" />

                    <div className="space-y-4 relative z-10">
                        <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none text-base px-4 py-1">Uutta</Badge>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">Koe päivä neuroepätyypillisenä</h2>
                        <p className="text-slate-300 max-w-xl mx-auto text-lg leading-relaxed">
                            Simulaatiossa olet Alex, graafinen suunnittelija.
                            Pääset tekemään valintoja, jotka vaikuttavat energiaasi, keskittymiseesi ja tiimin ymmärrykseen.
                            Tunnistatko tilanteet?
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto opacity-80 text-sm font-mono text-emerald-300 mb-6">
                        <div className="bg-white/5 p-2 rounded">🔋 Energia</div>
                        <div className="bg-white/5 p-2 rounded">🎯 Keskittyminen</div>
                        <div className="bg-white/5 p-2 rounded">❤️ Hyvinvointi</div>
                        <div className="bg-white/5 p-2 rounded">👥 Ymmärrys</div>
                    </div>

                    <div className="relative z-10">
                        <Link href="/simulaatio/neuro">
                            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg px-8 py-6 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                                Kokeile simulaattoria nyt <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <p className="mt-4 text-xs text-slate-500">Kesto: n. 5 minuuttia • Ei tallenna henkilötietoja</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
