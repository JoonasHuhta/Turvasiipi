"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Brain, Target, Scale, MessageCircle, AlertTriangle, Zap, Ear, Heart, BookOpen, ShieldCheck, ArrowRight, UserCheck, Briefcase, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";

export default function NeurodiversityPage() {
    const { completeModule, isModuleCompleted } = useProgress();
    const isCompleted = isModuleCompleted('neuro_info');

    const handleComplete = () => {
        completeModule('neuro_info');
    };
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

                {/* LUSIKKATEORIA (NEW SECTION) */}
                <section id="lusikkateoria" className="bg-indigo-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="relative z-10 space-y-8">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1 space-y-4">
                                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-indigo-200 px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase">
                                    <Heart className="w-3 h-3" />
                                    Energiapääoma
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none">
                                    Lusikkateoria <br />
                                    <span className="text-indigo-400">ja jaksaminen</span>
                                </h2>
                                <p className="text-indigo-100/80 leading-relaxed font-medium">
                                    Lusikkateoria on Christine Miserandinon kehittämä vertauskuva energian rajallisuudesta.
                                    Se auttaa ymmärtämään, miksi arkipäiväiset asiat voivat uuvuttaa neuromoninaisen ihmisen nopeammin.
                                </p>
                            </div>
                            <div className="flex-1 grid grid-cols-4 gap-4 max-w-sm">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center text-2xl bg-white/10 border border-white/10 ${i > 3 ? 'opacity-20 grayscale' : 'animate-pulse'}`}>
                                        🥄
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h4 className="font-bold mb-3 text-indigo-300 uppercase text-xs tracking-wider">Mikä se on?</h4>
                                <p className="text-sm text-indigo-50/70">Jokainen "lusikka" on yksikkö energiaa. Toisin kuin neurotyypillisillä, neuromoninaisilla lusikoita on usein vähemmän ja ne kuluvat nopeammin aistiärsykkeisiin tai sosiaaliseen maskaamiseen.</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h4 className="font-bold mb-3 text-rose-300 uppercase tracking-wider text-xs">Mikä kuluttaa?</h4>
                                <p className="text-sm text-indigo-50/70">Meluisa tila, epäselvät ohjeet, muuttuvat aikataulut tai pakotettu small talk voivat viedä useita lusikoita kerralla ennen kuin varsinainen työ on edes alkanut.</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h4 className="font-bold mb-3 text-emerald-300 uppercase tracking-wider text-xs">Miten säästää?</h4>
                                <p className="text-sm text-indigo-50/70">Oikeus vastamelukuulokkeisiin, kirjallinen kommunikaatio ja lupaus olla osallistumatta videopalavereihin voivat säästää kriittisiä lusikoita loppupäivään.</p>
                            </div>
                        </div>
                    </div>
                </section>

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

                    {/* 3. DOUBLE EMPATHY DECODER (NEW) */}
                    <section id="decoder" className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">Kaksoisempatia-tulkki</h2>
                        </div>
                        <p className="text-slate-600 text-sm">Sama tilanne, kaksi eri kokemusta. Ymmärrys syntyy kuilun ylittämisestä.</p>

                        <div className="grid gap-4">
                            {[
                                {
                                    situation: "Kysymys palaverissa",
                                    nt: "Hän on hiljaa. Onko hän valmistautunut huonosti?",
                                    nd: "Prosessoin tietoa. Tarvitsen hetken jäsentää vastausta tarkasti.",
                                    bridge: "Anna vastausaikaa tai mahdollisuus vastata kirjallisesti."
                                },
                                {
                                    situation: "Kuulokkeet päässä",
                                    nt: "Hän on epäsosiaalinen ja eristäytyy tiimistä.",
                                    nd: "Suojelen aistejani, jotta voin keskittyä työhön tehokkaasti.",
                                    bridge: "Kunnioita työrauhan tarvetta. Kommunikoi Slackissa."
                                },
                                {
                                    situation: "Suora palaute",
                                    nt: "Hän on töykeä ja hyökkäävä.",
                                    nd: "Olen rehellinen ja tehokas. Faktoissa pysyminen on kunnioitusta.",
                                    bridge: "Älä ota kritiikkiä henkilökohtaisesti. Keskity sisältöön."
                                }
                            ].map((item, i) => (
                                <Card key={i} className="overflow-hidden border-slate-200">
                                    <div className="bg-slate-50 border-b border-slate-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-500">
                                        Tilanne: {item.situation}
                                    </div>
                                    <div className="grid md:grid-cols-2">
                                        <div className="p-4 border-b md:border-b-0 md:border-r border-slate-100 space-y-2">
                                            <span className="text-[10px] font-bold text-indigo-600 uppercase">Neurotyypillinen tulkinta</span>
                                            <p className="text-sm text-slate-600 italic">"{item.nt}"</p>
                                        </div>
                                        <div className="p-4 space-y-2 bg-amber-50/30">
                                            <span className="text-[10px] font-bold text-amber-600 uppercase">Neuromoninainen kokemus</span>
                                            <p className="text-sm text-slate-700 font-medium">"{item.nd}"</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-emerald-50 flex items-start gap-3">
                                        <UserCheck className="w-4 h-4 text-emerald-600 mt-0.5" />
                                        <p className="text-xs text-emerald-800 font-bold">Ratkaisu: {item.bridge}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* 4. NEPSY LOG TEMPLATES (NEW) */}
                    <section id="templates" className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">Nepsy-Log: Dokumentoinnin tueksi</h2>
                        </div>
                        <p className="text-slate-600 text-sm">Dokumentointi on paras suojasi Performance Trapia eli suoritusloukkua vastaan.</p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="border-2 border-dashed border-slate-200 bg-transparent hover:border-indigo-300 transition-colors cursor-pointer group">
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center justify-between">
                                        Sovitut mukautukset
                                        <ShieldCheck className="w-4 h-4 text-slate-300 group-hover:text-indigo-500" />
                                    </CardTitle>
                                    <CardDescription>Käytä kun sovit pelisäännöistä esimiehen kanssa.</CardDescription>
                                </CardHeader>
                                <CardContent className="bg-white m-4 rounded-xl p-4 text-[11px] font-mono text-slate-500 leading-relaxed border border-slate-100 italic">
                                    "PVM: [TÄNÄÄN]<br />
                                    OSALLISTUJAT: [NIMET]<br />
                                    SOVITTU: Meluvaimennuskuulokkeet sallittu työpisteellä.<br />
                                    PERUSTELU: Keskittymiskyvyn varmistaminen (Yhdenvertaisuuslaki).<br />
                                    SEURANTA: [PVM]"
                                </CardContent>
                            </Card>

                            <Card className="border-2 border-dashed border-slate-200 bg-transparent hover:border-rose-300 transition-colors cursor-pointer group">
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center justify-between">
                                        Viestinnän katkokset
                                        <AlertTriangle className="w-4 h-4 text-slate-300 group-hover:text-rose-500" />
                                    </CardTitle>
                                    <CardDescription>Kirjaa ylös tilanteet, joissa jäit informaatiovarjoon.</CardDescription>
                                </CardHeader>
                                <CardContent className="bg-white m-4 rounded-xl p-4 text-[11px] font-mono text-slate-500 leading-relaxed border border-slate-100 italic">
                                    "AIKA: [AIKA]<br />
                                    TAPAHTUMA: Tiimissä tehtiin päätös X keittiössä.<br />
                                    VAIKUTUS: Jäin tiedon ulkopuolelle, työni viivästyi 2h.<br />
                                    REAKTIO: Pyysin päivitystä sähköpostitse."
                                </CardContent>
                            </Card>
                        </div>
                        <div className="bg-indigo-900 rounded-2xl p-6 text-white text-sm">
                            <div className="flex gap-4 items-center">
                                <Scale className="w-10 h-10 text-indigo-300 shrink-0" />
                                <div>
                                    <p className="font-bold mb-1">Muista oikeutesi:</p>
                                    <p className="text-indigo-100 opacity-80">Yhdenvertaisuuslaki velvoittaa työnantajan tekemään kohtuulliset mukautukset. Dokumentoitu logi on näyttösi, jos näitä mukautuksia käytetään myöhemmin sinua vastaan.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

                {/* SIMULATION CALL TO ACTION */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-indigo-500 to-rose-500" />

                    <div className="relative z-10 grid lg:grid-cols-[1fr_1.2fr] gap-12 text-left items-center">
                        <div className="space-y-6">
                            <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none text-base px-4 py-1 uppercase font-black tracking-widest">Päivitetty</Badge>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.8] uppercase">
                                Harjoittele <br />
                                <span className="text-amber-400">itsepuolustusta</span>
                            </h2>
                            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                                Työelämä voi olla miinakenttä. Simulaattorimme avulla voit harjoitella vaikeita tilanteita turvallisesti ennen niiden kohtaamista arjessa.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <Link href="/simulaatio/neuro">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group cursor-pointer">
                                    <h4 className="font-bold flex items-center justify-between">
                                        Päivä neurokirjolla 🧩
                                        <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                                    </h4>
                                    <p className="text-xs text-slate-400 mt-1">Aistiyliherkkyydet ja energianhallinta.</p>
                                </div>
                            </Link>
                            <Link href="/simulaatio/performance-trap">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group cursor-pointer">
                                    <h4 className="font-bold flex items-center justify-between">
                                        Suoritusloukku 📉
                                        <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                                    </h4>
                                    <p className="text-xs text-slate-400 mt-1">Kohtuullisten mukautusten puolustaminen.</p>
                                </div>
                            </Link>
                            <Link href="/simulaatio/information-shadow">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group cursor-pointer">
                                    <h4 className="font-bold flex items-center justify-between">
                                        Informaatiovarjo 👤
                                        <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                                    </h4>
                                    <p className="text-xs text-slate-400 mt-1">Sosiaalisesta ulossulkemisesta selviytyminen.</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10 relative z-10">
                        <Link href="/simulaatio">
                            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8">
                                Katso kaikki skenaariot
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* COMPLETION SECTION */}
                <div className="pt-8 border-t border-slate-200">
                    <Card className={cn(
                        "transition-all duration-500 rounded-3xl overflow-hidden border-2",
                        isCompleted
                            ? "bg-emerald-50 border-emerald-100 shadow-sm"
                            : "bg-white border-indigo-100 shadow-xl"
                    )}>
                        <CardContent className="p-8 md:p-12 text-center space-y-6">
                            <div className={cn(
                                "w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4 transition-all duration-500",
                                isCompleted ? "bg-emerald-500 text-white rotate-12" : "bg-indigo-50 text-indigo-600"
                            )}>
                                {isCompleted ? <CheckCircle2 className="w-10 h-10" /> : <BookOpen className="w-10 h-10" />}
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">
                                    {isCompleted ? "Tieto tallennettu!" : "Saitko uutta tietoa?"}
                                </h3>
                                <p className="text-slate-600 max-w-sm mx-auto font-medium">
                                    {isCompleted
                                        ? "Olet suorittanut Neuromoninaisuus-infon. Pisteet on lisätty profiiliisi."
                                        : "Kun olet lukenut materiaalin, voit kuitata sen suoritetuksi alta. Tämä kerryttää sertifiointipisteitäsi."}
                                </p>
                            </div>

                            {!isCompleted ? (
                                <Button
                                    onClick={handleComplete}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest px-10 py-6 rounded-2xl shadow-lg hover:shadow-indigo-500/25 transition-all"
                                >
                                    Merkitse suoritetuksi (+75 pts)
                                </Button>
                            ) : (
                                <Link href="/dashboard">
                                    <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-100 font-bold px-10 py-6 rounded-2xl">
                                        Palaa työpöydälle
                                    </Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
