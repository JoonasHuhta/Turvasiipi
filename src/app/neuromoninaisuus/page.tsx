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
        <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* HEADER */}
                <div className="text-center space-y-6">
                    <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1 inline-block">
                        Oppimiskeskus
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#2B2B2B] tracking-tight leading-tight">
                        Neuromoninaisuus työelämässä
                    </h1>
                    <p className="text-xl text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed font-serif italic">
                        "Aivosi toimivat eri tavalla? Se on voimavarasi."
                    </p>
                    <p className="text-sm text-[#666] max-w-xl mx-auto leading-relaxed">
                        Neuromoninaisuus kattaa tilat kuten autismikirjon, ADHD, dysleksia ja dyspraksia. Se ei ole sairaus, vaan osa ihmisen luonnollista vaihtelua.
                    </p>
                </div>

                {/* INTRODUCTION CARDS */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-white border-[#E8DDD0] shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                                <Brain className="w-8 h-8" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">Mistä kyse?</CardTitle>
                                <CardDescription>15-20% väestöstä</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="text-[#4A4A4A] space-y-2 text-sm">
                            <p><strong>ADHD (5%):</strong> Luovuus, energisyys, "out-of-the-box" ajattelu. Haasteina keskittyminen ja impulssikontrolli.</p>
                            <p><strong>Autismikirjo (2%):</strong> Systeemiajattelu, yksityiskohtien havaitseminen, johdonmukaisuus. Haasteina sosiaalinen kommunikaatio.</p>
                            <p><strong>Dysleksia (10%):</strong> Visuaalinen ajattelu, kokonaisuuksien hahmottaminen.</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-[#E8DDD0] shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="p-3 bg-[#FDFBF7] text-[#5B4B8A] rounded-xl border border-[#E8DDD0]">
                                <Zap className="w-8 h-8" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-serif">Supervoimat</CardTitle>
                                <CardDescription className="text-[#5B4B8A] font-mono text-[10px] uppercase tracking-wider">Tutkittuja vahvuuksia</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="text-[#4A4A4A] space-y-2 text-sm leading-relaxed">
                            <p>🏆 <strong>Tuottavuus:</strong> Autism at Work -ohjelmissa jopa 140% tuottavampia ja vähemmän virheitä.</p>
                            <p>💡 <strong>Innovaatio:</strong> Kuvioiden tunnistaminen ja monimutkainen ongelmanratkaisu.</p>
                            <p>🔍 <strong>Hyperfokus:</strong> Kyky uppoutua täysin tehtävään ja tuottaa poikkeuksellista laatua.</p>
                        </CardContent>
                    </Card>
                </div>

                {/* LUSIKKATEORIA (NEW SECTION) */}
                {/* LUSIKKATEORIA */}
                <section id="lusikkateoria" className="bg-white rounded-[2.5rem] p-8 md:p-12 text-[#2B2B2B] relative overflow-hidden shadow-sm border border-[#E8DDD0]">
                    <div className="relative z-10 space-y-8">
                        <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                            <div className="flex-1 space-y-4">
                                <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1 inline-block">
                                    Energiapääoma
                                </span>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2B2B2B] leading-tight">
                                    Lusikkateoria ja jaksaminen
                                </h2>
                                <p className="text-[#4A4A4A] leading-relaxed font-medium">
                                    Lusikkateoria on Christine Miserandinon kehittämä vertauskuva energian rajallisuudesta.
                                    Se auttaa ymmärtämään, miksi arkipäiväiset asiat voivat uuvuttaa neuromoninaisen ihmisen nopeammin.
                                </p>
                            </div>
                            <div className="flex-1 grid grid-cols-4 gap-4 max-w-sm">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center text-2xl bg-white border border-[#E8DDD0] shadow-sm ${i > 3 ? 'opacity-20 grayscale' : 'animate-pulse'}`}>
                                        🥄
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#E8DDD0]">
                                <h4 className="font-bold mb-3 text-[#5B4B8A] uppercase text-[10px] tracking-widest">Mikä se on?</h4>
                                <p className="text-sm text-[#4A4A4A]">Jokainen "lusikka" on yksikkö energiaa. Toisin kuin neurotyypillisillä, neuromoninaisilla lusikoita on usein vähemmän ja ne kuluvat nopeammin aistiärsykkeisiin tai sosiaaliseen maskaamiseen.</p>
                            </div>
                            <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#E8DDD0]">
                                <h4 className="font-bold mb-3 text-rose-700 uppercase tracking-widest text-[10px]">Mikä kuluttaa?</h4>
                                <p className="text-sm text-[#4A4A4A]">Meluisa tila, epäselvät ohjeet, muuttuvat aikataulut tai pakotettu small talk voivat viedä useita lusikoita kerralla ennen kuin varsinainen työ on edes alkanut.</p>
                            </div>
                            <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#E8DDD0]">
                                <h4 className="font-bold mb-3 text-emerald-700 uppercase tracking-widest text-[10px]">Miten säästää?</h4>
                                <p className="text-sm text-[#4A4A4A]">Oikeus vastamelukuulokkeisiin, kirjallinen kommunikaatio ja lupaus olla osallistumatta videopalavereihin voivat säästää kriittisiä lusikoita loppupäivään.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* MAIN CONTENT SECTIONS */}

                <div className="space-y-8">

                    {/* 1. HAASTEET */}
                    <section id="haasteet">
                        <h2 className="text-2xl font-serif font-bold flex items-center gap-3 mb-6 text-[#2B2B2B]">
                            <AlertTriangle className="w-6 h-6 text-amber-600" />
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
                    <section id="toiminta" className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#E8DDD0]">
                        <h2 className="text-2xl font-serif font-bold flex items-center gap-3 mb-6 text-[#2B2B2B]">
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
                            <div className="p-2 bg-[#FDFBF7] text-[#5B4B8A] rounded-lg border border-[#E8DDD0]">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-[#2B2B2B]">Kaksoisempatia-tulkki</h2>
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
                            <div className="p-2 bg-[#FDFBF7] text-[#5B4B8A] rounded-lg border border-[#E8DDD0]">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-[#2B2B2B]">Nepsy-Log</h2>
                        </div>
                        <p className="text-slate-600 text-sm font-medium">Dokumentoinnin tueksi Performance Trapia eli suoritusloukkua vastaan.</p>

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
                        <div className="bg-[#FDFBF7] rounded-2xl p-6 text-[#2B2B2B] text-sm border border-[#E8DDD0] shadow-sm">
                            <div className="flex gap-4 items-center">
                                <Scale className="w-10 h-10 text-[#5B4B8A] shrink-0 opacity-50" />
                                <div>
                                    <h4 className="font-bold mb-1 font-serif">Muista oikeutesi:</h4>
                                    <p className="text-[#4A4A4A] leading-relaxed">Yhdenvertaisuuslaki velvoittaa työnantajan tekemään kohtuulliset mukautukset. Dokumentoitu logi on näyttösi, jos näitä mukautuksia käytetään myöhemmin sinua vastaan.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

                {/* SIMULATION CALL TO ACTION */}
                {/* SIMULATION CALL TO ACTION */}
                <div className="bg-white border border-[#E8DDD0] rounded-3xl p-8 md:p-12 text-[#2B2B2B] relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-[#5B4B8A]/20" />

                    <div className="relative z-10 grid lg:grid-cols-[1fr_1.2fr] gap-12 text-left items-center">
                        <div className="space-y-6">
                            <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1 inline-block">
                                Harjoittelu
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#2B2B2B] leading-tight">
                                Harjoittele itsepuolustusta turvallisesti
                            </h2>
                            <p className="text-[#4A4A4A] text-lg leading-relaxed max-w-md">
                                Työelämä voi olla miinakenttä. Simulaattorimme avulla voit harjoitella vaikeita tilanteita ennen niiden kohtaamista arjessa.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <Link href="/simulaatio/neuro">
                                <div className="p-5 bg-[#FDFBF7] border border-[#E8DDD0] rounded-2xl hover:bg-white hover:border-[#5B4B8A] transition-all group shadow-sm">
                                    <h4 className="font-bold text-[#2B2B2B] flex items-center justify-between">
                                        Päivä neurokirjolla 🧩
                                        <ArrowRight className="w-4 h-4 text-[#5B4B8A] group-hover:translate-x-1 transition-transform" />
                                    </h4>
                                    <p className="text-xs text-[#666] mt-1">Aistiyliherkkyydet ja energianhallinta.</p>
                                </div>
                            </Link>
                            <Link href="/simulaatio/performance-trap">
                                <div className="p-5 bg-[#FDFBF7] border border-[#E8DDD0] rounded-2xl hover:bg-white hover:border-[#5B4B8A] transition-all group shadow-sm">
                                    <h4 className="font-bold text-[#2B2B2B] flex items-center justify-between">
                                        Suoritusloukku 📉
                                        <ArrowRight className="w-4 h-4 text-[#5B4B8A] group-hover:translate-x-1 transition-transform" />
                                    </h4>
                                    <p className="text-xs text-[#666] mt-1">Kohtuullisten mukautusten puolustaminen.</p>
                                </div>
                            </Link>
                            <Link href="/simulaatio/information-shadow">
                                <div className="p-5 bg-[#FDFBF7] border border-[#E8DDD0] rounded-2xl hover:bg-white hover:border-[#5B4B8A] transition-all group shadow-sm">
                                    <h4 className="font-bold text-[#2B2B2B] flex items-center justify-between">
                                        Informaatiovarjo 👤
                                        <ArrowRight className="w-4 h-4 text-[#5B4B8A] group-hover:translate-x-1 transition-transform" />
                                    </h4>
                                    <p className="text-xs text-[#666] mt-1">Sosiaalisesta ulossulkemisesta selviytyminen.</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="pt-8 mt-8 border-t border-[#E8DDD0] relative z-10 text-center lg:text-left">
                        <Link href="/simulaatio">
                            <Button variant="outline" className="border-[#E8DDD0] text-[#5B4B8A] hover:bg-[#FDFBF7] rounded-full px-8 font-serif">
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
                        <CardContent className="p-6 md:p-12 text-center space-y-6">
                            <div className={cn(
                                "w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4 transition-all duration-500 shadow-sm border border-[#E8DDD0]",
                                isCompleted ? "bg-emerald-500 text-white rotate-12" : "bg-white text-[#5B4B8A]"
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
                                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-wider px-8 py-4 sm:py-6 rounded-2xl shadow-lg hover:shadow-indigo-500/25 transition-all h-auto whitespace-normal"
                                >
                                    Merkitse suoritetuksi (+75 pts)
                                </Button>
                            ) : (
                                <Link href="/profiili" className="block w-full sm:inline-block sm:w-auto">
                                    <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-100 font-bold px-10 py-6 rounded-2xl">
                                        Palaa saavutuksiin
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
