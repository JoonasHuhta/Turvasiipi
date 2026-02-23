"use client";

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, ArrowRight, X, CheckCircle2, ChevronRight,
    AlertTriangle, Copy, Check, ExternalLink, Plus, Trash2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type ViewState = 'intro' | 'theory' | 'doc_exercise' | 'doc_tool' | 'resources' | 'summary';

interface DocExercise {
    context: string;
    badEntry: string;
    goodEntry: string;
    explanation: string;
}

const DOC_EXERCISES: DocExercise[] = [
    {
        context: 'Ex-kumppani soitti ja oli aggressiivinen puhelimessa.',
        badEntry: '"Hän soitti ja oli taas ihan kauhea. Raivosi puhelimessa pitkään ja uhkaili. Olen todella väsynyt tähän kaikkeen."',
        goodEntry: '"15.3.2025 klo 17:14. Puhelu (kesto 4 min 20 sek). [Nimi] ilmoitti puhelun aikana: \'Jos et suostu tähän, vien asian oikeuteen ensi viikolla\'. Sävy: korotettu ääni, keskeytyksiä. Puhelu tallennettu (tiedosto: puhelu_15032025.m4a)."',
        explanation: 'Viranomainen ei tarvitse tunnekuvausta — hän tarvitsee faktoja. Päivämäärä, kellonaika, kesto, lainattu sisältö ja tieto tallenteesta muuttavat yksittäisen "sitä sanoi tätä sanoi" -tilanteen dokumentoiduksi todisteeksi.',
    },
    {
        context: 'Lapsi ei palannut sovittuna aikana tapaamisesta.',
        badEntry: '"Hän ei jälleen kerran palauttanut lasta ajoissa. Tämä on jo kolmas kerta tässä kuussa. Olen lopussa."',
        goodEntry: '"22.3.2025. Lapsen piti palata klo 18:00 sopimuksen mukaan (sopimus s. 4, kohta 3.2). Lapsi palautettiin klo 19:47, eli 1h 47min myöhässä. Ei yhteydenottoa viivästyksestä etukäteen. Viesti lähetetty klo 18:05 (WhatsApp). Tämä on kolmas myöhästyminen maaliskuussa (16.3. +55min, 19.3. +2h 10min, 22.3. +1h 47min). Kirjauspäivä: 22.3.2025."',
        explanation: 'Kolme tapahtumakirjausta muuttuu rakenteeksi. Rakenne on se, mitä tuomioistuin tai lastensuojelu voi arvioida. Yksittäinen tapaus on "riitaa" — toistuvuus on evidenssi.',
    },
];

interface DocEntry {
    id: string;
    date: string;
    time: string;
    event: string;
    channel: string;
    evidence: string;
    impact: string;
}

const RESOURCES = [
    { name: 'Nollalinja', desc: 'Maksuton 24/7 auttava puhelin väkivallan uhreille', url: 'https://nollalinja.fi', tel: '080 005 005' },
    { name: 'Ensi- ja turvakotien liitto', desc: 'Tukea lähisuhdeväkivallan uhreille, juridinen neuvonta', url: 'https://ensijaturvakotienliitto.fi', tel: '09 476 080' },
    { name: 'Oikeusaputoimistot', desc: 'Maksuton oikeusapu tulorajojen puitteissa', url: 'https://oikeus.fi/oikeusapu', tel: '' },
    { name: 'Rikosuhripäivystys (RIKU)', desc: 'Neuvoa ja tukea rikoksen uhreille', url: 'https://riku.fi', tel: '0203 16116' },
];

interface Props {
    moduleId?: string;
    onComplete: (score?: number) => void;
    onExit: () => void;
}

export default function CoercivePostSep({ onComplete, onExit }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [view, setView] = useState<ViewState>('intro');
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [showGood, setShowGood] = useState(false);
    const [entries, setEntries] = useState<DocEntry[]>([]);
    const [newEntry, setNewEntry] = useState<Partial<DocEntry>>({});
    const [copiedSummary, setCopiedSummary] = useState(false);

    const scrollTop = useCallback(() => {
        containerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
        containerRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, []);

    const go = useCallback((v: ViewState) => {
        scrollTop();
        setView(v);
    }, [scrollTop]);

    const currentEx = DOC_EXERCISES[exerciseIndex];
    const isLastEx = exerciseIndex === DOC_EXERCISES.length - 1;

    const addEntry = () => {
        if (!newEntry.date || !newEntry.event) return;
        setEntries(prev => [...prev, { ...newEntry, id: Date.now().toString() } as DocEntry]);
        setNewEntry({});
    };

    const removeEntry = (id: string) => setEntries(prev => prev.filter(e => e.id !== id));

    const generateSummary = () => {
        if (entries.length === 0) return '';
        const lines = entries.map(e =>
            `${e.date}${e.time ? ' klo ' + e.time : ''}: ${e.event}${e.channel ? ' (kanava: ' + e.channel + ')' : ''}${e.evidence ? ' — todiste: ' + e.evidence : ''}${e.impact ? ' — vaikutus: ' + e.impact : ''}`
        );
        return `DOKUMENTOINTITIIVISTELMÄ\nLuotu: ${new Date().toLocaleDateString('fi-FI')}\nTapauksia: ${entries.length}\n\n${lines.join('\n\n')}`;
    };

    const copySummary = () => {
        navigator.clipboard.writeText(generateSummary());
        setCopiedSummary(true);
        setTimeout(() => setCopiedSummary(false), 2000);
    };

    const inputClass = "w-full p-3 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg focus:ring-2 ring-rose-400 outline-none text-sm";

    return (
        <div
            ref={containerRef}
            className="relative w-full bg-[#FAFAF9] rounded-[2rem] border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C] flex flex-col"
        >

            {/* STICKY HEADER */}
            <div className="sticky top-0 z-10 bg-[#FAFAF9] border-b border-[#E7E5E4] flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
                <div className="flex items-center gap-2 md:gap-3 min-w-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 flex-shrink-0">
                        <FileText className="w-4 h-4 md:w-6 md:h-6" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-sm md:text-base font-black uppercase tracking-widest text-[#292524] leading-tight truncate">Eron jälkeen</h2>
                        <span className="text-[10px] md:text-xs font-bold text-[#A8A29E] uppercase tracking-widest">Dokumentointi · Oikeusjärjestelmä · Moduuli 3</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-[#F5F5F4] text-[#78716C] flex-shrink-0">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            <div className="flex-1 flex flex-col items-center w-full">
                <div className="w-full max-w-2xl mx-auto px-4 py-6 md:px-6 md:py-8">
                    <AnimatePresence mode="wait">

                        {/* INTRO */}
                        {view === 'intro' && (
                            <motion.div key="intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="space-y-5"
                            >
                                <Badge variant="outline" className="text-rose-700 border-rose-200 bg-rose-50 text-xs tracking-widest uppercase">Moduuli 3 / 4 — Dokumentointi</Badge>
                                <h1 className="text-2xl md:text-3xl font-serif font-black text-[#292524]">
                                    Oikeusjärjestelmä kilpenä, ei miekkana
                                </h1>
                                <p className="text-base md:text-lg text-[#57534E] leading-relaxed">
                                    Oikeusjärjestelmä käsittelee yksittäisiä vaatimuksia — se ei arvioi suhteen kokonaisrakennetta.
                                    Tämä antaa kontrolloivalle osapuolelle strategisen edun.
                                    <strong className="text-[#292524]"> Dokumentointi on tapa, jolla rakenne tehdään näkyväksi.</strong>
                                </p>
                                <Button onClick={() => go('theory')} size="lg" className="w-full md:w-auto bg-rose-700 hover:bg-rose-800 text-white rounded-full px-8">
                                    Jatka <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.div>
                        )}

                        {/* THEORY */}
                        {view === 'theory' && (
                            <motion.div key="theory" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="w-full space-y-5"
                            >
                                <div>
                                    <Badge variant="outline" className="text-rose-700 border-rose-200 bg-rose-50 text-xs tracking-widest uppercase mb-2">Muista tämä</Badge>
                                    <h2 className="text-xl md:text-2xl font-bold text-[#292524]">Yksittäinen tapahtuma vs. rakenne</h2>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                                        <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">Yksittäinen tapahtuma</p>
                                        <p className="text-sm text-red-900">"Hän oli myöhässä tapaamisesta." → Viranomaiselle: "sitä sanoi tätä sanoi" -riita. Ei johtopäätöksiä.</p>
                                    </div>
                                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                                        <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">Rakenne</p>
                                        <p className="text-sm text-emerald-900">"8 dokumentoitua myöhästymistä 3 kuukaudessa, korvaava tapaaminen evätty." → Rakenne on todistettavissa.</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-[#292524] text-white rounded-xl text-sm">
                                    <p className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">Tärkeä periaate</p>
                                    <p className="text-gray-300 leading-relaxed">Dokumentointi ei ole valittamista — se on oman todellisuuden ja oikeusturvan vahvistamista. Se tekee näkyväksi sen, mitä arjessa ei erota, koska asiat tapahtuvat hitaasti ja toistuvasti.</p>
                                </div>
                                <Button onClick={() => go('doc_exercise')} className="w-full bg-rose-700 hover:bg-rose-800 text-white rounded-full">
                                    Harjoittele kirjaamista <ChevronRight className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.div>
                        )}

                        {/* DOC EXERCISE */}
                        {view === 'doc_exercise' && (
                            <motion.div key={`docex-${exerciseIndex}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="w-full space-y-5"
                            >
                                <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-rose-700 border-rose-200 bg-rose-50 text-xs tracking-widest uppercase">
                                        Harjoitus {exerciseIndex + 1} / {DOC_EXERCISES.length}
                                    </Badge>
                                </div>
                                <p className="text-sm font-semibold text-[#292524]">Tilanne: <span className="font-normal text-[#57534E]">{currentEx.context}</span></p>

                                <div className="space-y-3">
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                                        <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">❌ Heikko kirjaus</p>
                                        <p className="text-sm text-red-900 italic">{currentEx.badEntry}</p>
                                    </div>

                                    {!showGood ? (
                                        <Button onClick={() => setShowGood(true)} variant="outline" className="w-full border-rose-200 text-rose-700 hover:bg-rose-50">
                                            Näytä hyvä kirjaus →
                                        </Button>
                                    ) : (
                                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                                            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                                                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">✓ Hyvä kirjaus</p>
                                                <p className="text-sm text-emerald-900 font-mono leading-relaxed">{currentEx.goodEntry}</p>
                                            </div>
                                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mt-3">
                                                <p className="text-sm text-[#44403C]">{currentEx.explanation}</p>
                                            </div>
                                            <Button
                                                onClick={() => {
                                                    scrollTop();
                                                    setShowGood(false);
                                                    if (isLastEx) setView('doc_tool');
                                                    else setExerciseIndex(i => i + 1);
                                                }}
                                                className="w-full mt-3 bg-rose-700 hover:bg-rose-800 text-white rounded-full"
                                            >
                                                {isLastEx ? 'Jatka → Dokumentointityökalu' : 'Seuraava harjoitus'} <ChevronRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* DOC TOOL */}
                        {view === 'doc_tool' && (
                            <motion.div key="doc_tool" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="w-full space-y-6"
                            >
                                <div className="text-center space-y-1">
                                    <Badge variant="outline" className="text-rose-700 border-rose-200 bg-rose-50 text-xs tracking-widest uppercase">Dokumentointityökalu</Badge>
                                    <h2 className="text-xl font-bold text-[#292524]">Kirjaa tapahtumat</h2>
                                    <p className="text-xs text-[#78716C]">Tiedot tallennetaan vain tälle laitteelle. Voit luoda yhteenvedon kopioitavaksi.</p>
                                </div>

                                {/* new entry form */}
                                <Card className="p-5 border-[#E7E5E4] bg-white space-y-4">
                                    <p className="text-xs font-bold text-[#A8A29E] uppercase tracking-wider">Uusi kirjaus</p>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <input className={inputClass} placeholder="Päivämäärä (pp.kk.vvvv)" value={newEntry.date || ''} onChange={e => setNewEntry(p => ({ ...p, date: e.target.value }))} />
                                        <input className={inputClass} placeholder="Kellonaika (vapaaehtoinen)" value={newEntry.time || ''} onChange={e => setNewEntry(p => ({ ...p, time: e.target.value }))} />
                                    </div>
                                    <textarea className={inputClass + ' resize-none'} rows={2} placeholder="Mitä tapahtui? (lyhyt kuvaus)" value={newEntry.event || ''} onChange={e => setNewEntry(p => ({ ...p, event: e.target.value }))} />
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <input className={inputClass} placeholder="Kanava (puhelu, WhatsApp, oikeus...)" value={newEntry.channel || ''} onChange={e => setNewEntry(p => ({ ...p, channel: e.target.value }))} />
                                        <input className={inputClass} placeholder="Todisteet (tallenne, viesti...)" value={newEntry.evidence || ''} onChange={e => setNewEntry(p => ({ ...p, evidence: e.target.value }))} />
                                    </div>
                                    <input className={inputClass} placeholder="Vaikutus (esim. lapsipäivä menetetty, €-kustannus)" value={newEntry.impact || ''} onChange={e => setNewEntry(p => ({ ...p, impact: e.target.value }))} />
                                    <Button onClick={addEntry} disabled={!newEntry.date || !newEntry.event} className="w-full bg-rose-700 hover:bg-rose-800 text-white rounded-lg">
                                        <Plus className="w-4 h-4 mr-2" /> Lisää kirjaus
                                    </Button>
                                </Card>

                                {/* entries list */}
                                {entries.length > 0 && (
                                    <div className="space-y-2">
                                        {entries.map(e => (
                                            <div key={e.id} className="p-3 bg-white border border-[#E7E5E4] rounded-lg flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-bold text-[#A8A29E]">{e.date}{e.time ? ` klo ${e.time}` : ''}</p>
                                                    <p className="text-sm text-[#292524] truncate">{e.event}</p>
                                                    {e.channel && <p className="text-xs text-[#78716C]">Kanava: {e.channel}</p>}
                                                </div>
                                                <button onClick={() => removeEntry(e.id)} className="text-[#A8A29E] hover:text-red-500 flex-shrink-0">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}

                                        <button
                                            onClick={copySummary}
                                            className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 py-3 rounded-lg transition-colors"
                                        >
                                            {copiedSummary ? <><Check className="w-4 h-4" /> Kopioitu!</> : <><Copy className="w-4 h-4" /> Kopioi yhteenveto ({entries.length} kirjausta)</>}
                                        </button>
                                    </div>
                                )}

                                <Button onClick={() => go('resources')} className="w-full bg-rose-700 hover:bg-rose-800 text-white rounded-full">
                                    Jatka → Palvelut <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                            </motion.div>
                        )}

                        {/* RESOURCES */}
                        {view === 'resources' && (
                            <motion.div key="resources" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="w-full space-y-6"
                            >
                                <div className="text-center space-y-2">
                                    <Badge variant="outline" className="text-rose-700 border-rose-200 bg-rose-50 text-xs tracking-widest uppercase">Tuki ja palvelut</Badge>
                                    <h2 className="text-2xl font-bold text-[#292524]">Et ole yksin</h2>
                                </div>
                                <div className="space-y-3">
                                    {RESOURCES.map((r) => (
                                        <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                                            className="flex items-start justify-between p-4 bg-white border border-[#E7E5E4] rounded-xl hover:border-rose-300 hover:bg-rose-50/30 transition-all group"
                                        >
                                            <div>
                                                <p className="font-bold text-[#292524] text-sm group-hover:text-rose-800">{r.name}</p>
                                                <p className="text-xs text-[#78716C] mt-0.5">{r.desc}</p>
                                                {r.tel && <p className="text-xs font-mono text-rose-700 mt-1">{r.tel}</p>}
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-[#A8A29E] flex-shrink-0 mt-0.5 group-hover:text-rose-600" />
                                        </a>
                                    ))}
                                </div>
                                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                    <AlertTriangle className="w-4 h-4 text-amber-600 mb-1" />
                                    <p className="text-xs text-amber-800">Juridisissa asioissa käänny DV-osaavaan asianajajaan tai oikeusaputoimistoon. Tavallinen asianajaja ei välttämättä tunne kontrolloivan suhteen prosessidynamiikkaa.</p>
                                </div>
                                <Button onClick={() => go('summary')} size="lg" className="w-full bg-rose-700 hover:bg-rose-800 text-white rounded-full">
                                    Valmis <CheckCircle2 className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.div>
                        )}

                        {/* SUMMARY */}
                        {view === 'summary' && (
                            <motion.div key="summary" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center text-center space-y-8 py-8"
                            >
                                <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-10 h-10 text-rose-700" />
                                </div>
                                <div className="space-y-3 max-w-md">
                                    <h1 className="text-2xl md:text-3xl font-serif font-black text-[#292524]">Rakenne vie asiat eteenpäin</h1>
                                    <p className="text-[#57534E] leading-relaxed">
                                        Dokumentointi muuttaa hajanaisen arjen rakenteeksi, jota viranomainen voi lukea.
                                        <strong className="text-[#292524]"> Se ei vaadi täydellisyyttä — se vaatii toistuvuuden kirjaamista.</strong>
                                    </p>
                                </div>
                                <Button onClick={() => onComplete()} size="lg" className="bg-[#292524] hover:bg-[#44403C] text-white rounded-full px-10 py-6 text-lg shadow-lg">
                                    Moduuli suoritettu ✓
                                </Button>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
