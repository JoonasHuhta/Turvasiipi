"use client";

import { useState, useEffect } from "react";
import { TimelineEvent } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FileText, Printer, ArrowLeft, Wand2, Loader2, Copy, Check, Info } from "lucide-react";
import Link from "next/link";
import { generateReportAction } from "@/actions/generateReport";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { templates, Template, TemplateCategory } from "@/data/templates";
import { cn } from "@/lib/utils";

export default function DocumentsPage() {
    const [events] = useLocalStorage<TimelineEvent[]>("suojasiipi_events", []);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [generatedEvents, setGeneratedEvents] = useState<TimelineEvent[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [reportGenerated, setReportGenerated] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | "all">("all");
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (events.length > 0) {
            setSelectedIds(new Set(events.map((e) => e.id)));
        }
    }, [events]);

    const toggleSelection = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const generateReport = async () => {
        setIsLoading(true);
        try {
            const selected = events
                .filter((e) => selectedIds.has(e.id))
                .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

            const result = await generateReportAction(selected);
            setGeneratedEvents(result);
            setReportGenerated(true);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }, 100);
        } catch (error) {
            console.error(error);
            alert("Raportin luonti epäonnistui. Yritä myöhemmin uudelleen.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const filteredTemplates = selectedCategory === "all"
        ? templates
        : templates.filter(t => t.category === selectedCategory);

    const categories: { id: TemplateCategory | "all"; label: string }[] = [
        { id: "all", label: "Kaikki" },
        { id: "employer", label: "Työnantaja" },
        { id: "union", label: "Liitto" },
        { id: "health", label: "Terveys" },
        { id: "legal", label: "Oikeudelliset" }
    ];

    if (!mounted) return null;

    if (reportGenerated) {
        return (
            <div className="space-y-8 pb-20">
                <div className="print:hidden flex flex-col sm:flex-row gap-4 justify-between items-center bg-secondary/10 p-4 rounded-xl border border-secondary/20">
                    <Button variant="ghost" onClick={() => setReportGenerated(false)} className="gap-2">
                        <ArrowLeft className="w-4 h-4" /> Takaisin valintaan
                    </Button>
                    <div className="flex gap-2">
                        <Button onClick={handlePrint} className="gap-2 rounded-full font-bold uppercase tracking-wider text-xs px-6">
                            <Printer className="w-4 h-4" /> Tulosta / Tallenna PDF
                        </Button>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto bg-white text-black p-6 sm:p-16 shadow-2xl min-h-0 sm:min-h-[29.7cm] print:shadow-none print:p-0 print:w-full overflow-x-hidden border border-slate-100 rounded-xl print:border-none">
                    <div className="space-y-10">
                        <div className="text-center border-b-4 border-slate-900 pb-10">
                            <h1 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">
                                Ilmoitus työturvallisuuslain mukaisesta epäasiallisesta kohtelusta
                            </h1>
                            <div className="flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <span>Luottamuksellinen</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full my-auto" />
                                <span>Päiväys: {new Date().toLocaleDateString("fi-FI")}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-black uppercase tracking-wider border-b-2 border-slate-100 pb-2">1. Lainsäädäntöviittaus</h2>
                            <p className="text-sm leading-relaxed text-justify indent-8">
                                Tämä ilmoitus koskee Työturvallisuuslain (738/2002) 28 §:n mukaista häirintää ja epäasiallista kohtelua.
                                Lain mukaan työnantajan on saatuaan tiedon työntekijään kohdistuvasta häirinnästä ryhdyttävä toimiin epäkohdan poistamiseksi. Laiminlyönti voi johtaa työnantajan vahingonkorvausvastuuseen.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-lg font-black uppercase tracking-wider border-b-2 border-slate-100 pb-2">2. Tapahtumakuvaus</h2>
                            <div className="space-y-10">
                                {generatedEvents.map((event, index) => (
                                    <div key={event.id} className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4 sm:gap-8 text-sm">
                                        <div className="font-black text-slate-400 tabular-nums">
                                            {new Date(event.timestamp).toLocaleDateString("fi-FI")}
                                            <div className="text-[10px] font-bold text-slate-300">klo {new Date(event.timestamp).toLocaleTimeString("fi-FI", { hour: '2-digit', minute: '2-digit' })}</div>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="whitespace-pre-wrap leading-relaxed border-l-2 border-slate-100 pl-6">{event.description}</p>
                                            {event.peopleInvolved && (
                                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Läsnäolijat / Todistajat</p>
                                                    <p className="text-xs font-medium">{event.peopleInvolved}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-20 mt-20 border-t-2 border-slate-100">
                            <div className="flex justify-between items-end h-32 px-10">
                                <div className="w-5/12 border-t-2 border-slate-900 pt-3 text-center text-[10px] font-black uppercase tracking-widest">
                                    Paikka ja aika
                                </div>
                                <div className="w-5/12 border-t-2 border-slate-900 pt-3 text-center text-[10px] font-black uppercase tracking-widest">
                                    Allekirjoitus
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div className="text-center space-y-2">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Asiakirjat</h2>
                <p className="text-muted-foreground text-lg">Muuta dokumentoitu data vaikuttaviksi asiakirjoiksi.</p>
            </div>

            <Tabs defaultValue="report" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-14 p-1 bg-slate-100 rounded-2xl">
                    <TabsTrigger value="report" className="rounded-xl font-black uppercase text-xs tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">Tapahtumaraportti</TabsTrigger>
                    <TabsTrigger value="templates" className="rounded-xl font-black uppercase text-xs tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">Viestipohjat</TabsTrigger>
                </TabsList>

                <TabsContent value="report" className="mt-8">
                    <div className="grid md:grid-cols-5 gap-8">
                        <div className="md:col-span-3">
                            <Card className="rounded-3xl border-slate-100 shadow-xl overflow-hidden">
                                <CardHeader className="bg-slate-50/50">
                                    <CardTitle className="text-lg font-black uppercase tracking-tight">Valitse merkinnät</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    {events.length === 0 ? (
                                        <div className="text-center py-12 space-y-4">
                                            <div className="text-4xl">🗒️</div>
                                            <p className="text-sm text-muted-foreground">Ei merkintöjä. Lisää tapahtumia ensin.</p>
                                            <Button variant="outline" className="rounded-full" asChild>
                                                <Link href="/timeline">Mene Logikirjaan</Link>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                                            {events.map((event) => (
                                                <div
                                                    key={event.id}
                                                    className={cn(
                                                        "flex items-start space-x-4 p-4 rounded-2xl border transition-all cursor-pointer group",
                                                        selectedIds.has(event.id)
                                                            ? "bg-primary/5 border-primary/20 ring-1 ring-primary/10"
                                                            : "bg-white border-slate-100 hover:border-slate-200"
                                                    )}
                                                    onClick={() => toggleSelection(event.id)}
                                                >
                                                    <Checkbox
                                                        id={event.id}
                                                        checked={selectedIds.has(event.id)}
                                                        onCheckedChange={() => toggleSelection(event.id)}
                                                        className="mt-1"
                                                    />
                                                    <div className="flex-1 space-y-1">
                                                        <div className="flex justify-between">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                                {new Date(event.timestamp).toLocaleDateString("fi-FI")}
                                                            </span>
                                                            {event.peopleInvolved && (
                                                                <span className="text-[9px] font-bold text-primary italic bg-primary/5 px-2 py-0.5 rounded-full">
                                                                    Todistajia
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm font-medium leading-tight line-clamp-2">
                                                            {event.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div className="md:col-span-2 space-y-6">
                            <Card className="rounded-3xl border-primary/20 bg-primary/5 shadow-xl shadow-primary/5">
                                <CardContent className="p-8 text-center space-y-6">
                                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                        <Wand2 className="w-10 h-10 text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black uppercase tracking-tight">AI Raportti</h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Tekoäly muotoilee valitut merkinnät neutraaliksi, ammattimaiseksi ja kronologiseksi raportiksi.
                                        </p>
                                    </div>

                                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-primary/10">
                                        <div className="text-center">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Valittuna</p>
                                            <p className="text-4xl font-black text-primary">{selectedIds.size}</p>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase">Tapahtumaa</p>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full h-14 rounded-2xl gap-2 font-black uppercase tracking-widest shadow-lg shadow-primary/20"
                                        size="lg"
                                        onClick={generateReport}
                                        disabled={selectedIds.size === 0 || isLoading}
                                    >
                                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
                                        {isLoading ? "Käsitellään..." : "Luo Asiakirja"}
                                    </Button>

                                    <div className="flex items-center gap-2 justify-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                                        Työturvallisuuslaki 28 § yhteensopiva
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
                                <div className="flex items-center gap-2 text-slate-600 font-black uppercase text-[10px] tracking-widest">
                                    <Info className="w-3 h-3" /> Ohje
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed italic">
                                    "Älä lähetä raporttia vihoissasi. Generoi se, lue se läpi, ja pyydä luotettavaa ystävää tai liiton edustajaa oikolukemaan se."
                                </p>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="templates" className="mt-8">
                    <div className="grid md:grid-cols-12 gap-8">
                        <div className="md:col-span-4 space-y-4">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Kategoria</p>
                                <div className="flex flex-col gap-1">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={cn(
                                                "text-left px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                                                selectedCategory === cat.id
                                                    ? "bg-slate-900 text-white shadow-lg"
                                                    : "hover:bg-slate-100 text-slate-600"
                                            )}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-8 space-y-6">
                            {selectedTemplate ? (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <Button variant="ghost" onClick={() => setSelectedTemplate(null)} className="gap-2 mb-2">
                                        <ArrowLeft className="w-4 h-4" /> Takaisin listaan
                                    </Button>
                                    <Card className="rounded-3xl border-slate-900 shadow-2xl overflow-hidden overflow-x-hidden">
                                        <CardHeader className="bg-slate-900 text-white p-8">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-2">
                                                    <div className="bg-white/10 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                        {selectedTemplate.category}
                                                    </div>
                                                    <CardTitle className="text-2xl font-black uppercase tracking-tighter italic">
                                                        {selectedTemplate.title}
                                                    </CardTitle>
                                                </div>
                                                <Button
                                                    onClick={() => copyToClipboard(selectedTemplate.content)}
                                                    variant="outline"
                                                    className="bg-white/5 border-white/20 hover:bg-white/10 text-white rounded-xl gap-2 h-12 px-6"
                                                >
                                                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                    {copied ? "Kopioitu" : "Kopioi Teksti"}
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-8 space-y-6">
                                            <div className="space-y-4">
                                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Sähköpostin aihe</p>
                                                    <p className="text-sm font-bold text-slate-900 italic">"{selectedTemplate.subject}"</p>
                                                </div>
                                                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 min-h-[300px]">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Viestin sisältö</p>
                                                    <pre className="text-sm font-medium leading-relaxed whitespace-pre-wrap font-sans text-slate-800">
                                                        {selectedTemplate.content}
                                                    </pre>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-primary/5 rounded-2xl flex items-start gap-4 border border-primary/10">
                                                <Info className="w-5 h-5 text-primary mt-0.5" />
                                                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                                    <strong className="text-primary uppercase tracking-widest text-[9px]">Vinkki:</strong> Korvaa hakasulkeilla [ ] merkityt kohdat omilla tiedoillasi ennen lähettämistä. AI-osiot täydentyvät parhaiten, kun kopioit tekstin ensin muokkaimeen.
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ) : (
                                <div className="grid gap-4 animate-in fade-in duration-500">
                                    {filteredTemplates.map((template) => (
                                        <Card
                                            key={template.id}
                                            className="rounded-3xl border-slate-100 hover:border-slate-300 transition-all cursor-pointer group hover:shadow-xl shadow-sm"
                                            onClick={() => setSelectedTemplate(template)}
                                        >
                                            <CardContent className="p-6">
                                                <div className="flex justify-between items-center">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                                {template.category === 'employer' ? '🏢 Työnantaja' :
                                                                    template.category === 'union' ? '🤝 Ammattiliitto' :
                                                                        template.category === 'health' ? '🏥 Terveys' : '⚖️ Laki'}
                                                            </span>
                                                            <div className="flex gap-1">
                                                                {template.tags.map(tag => (
                                                                    <span key={tag} className="text-[8px] font-bold text-slate-300 uppercase">#{tag}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-primary transition-colors italic">
                                                            {template.title}
                                                        </h3>
                                                        <p className="text-sm text-slate-500 leading-snug line-clamp-1">
                                                            {template.description}
                                                        </p>
                                                    </div>
                                                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                    {filteredTemplates.length === 0 && (
                                        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Ei pohjia tässä kategoriassa vielä.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
