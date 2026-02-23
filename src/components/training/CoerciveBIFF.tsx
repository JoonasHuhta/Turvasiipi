"use client";

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare, ArrowRight, X, CheckCircle2,
    Copy, Check, ChevronRight, AlertCircle, ExternalLink
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

type ViewState = 'intro' | 'theory' | 'exercise' | 'templates' | 'summary';

interface BiffExercise {
    id: string;
    context: string;
    message: string;
    options: { id: string; label: string; type: 'defensive' | 'apologetic' | 'biff' }[];
    correctId: string;
    explanation: string;
}

const EXERCISES: BiffExercise[] = [
    {
        id: 'ex1',
        context: 'Saat pitkän sähköpostin, jossa sinut syytetään huonosta vanhemmuudesta. Lopussa on kysymys: "Voiko Miia tulla harrastuksiin tiistaina?"',
        message: '"Olet aina laiminlyönyt lapsesi tarpeet. Muistan miten sinä [3 kappaletta syytöksiä]... Vaadin että selität käytöksesi. Voiko Miia tulla harrastuksiin tiistaina?"',
        options: [
            { id: 'a', label: '"En ole laiminlyönyt lastamme. Päinvastoin, minä olen aina huolehtinut... Minä en ymmärrä miten voit sanoa noin, kun sinäkin olet..."', type: 'defensive' },
            { id: 'b', label: '"Olen pahoillani jos olet kokenut niin. Yritän parhaani mukaan ja toivon että voisimme puhua asiallisemmin. Lapsenkin takia."', type: 'apologetic' },
            { id: 'c', label: '"Kyllä, Miia voi tulla harrastuksiin tiistaina. Päätösaika on klo 17:00."', type: 'biff' },
        ],
        correctId: 'c',
        explanation: 'BIFF-vastaus vastaa vain faktuaaliseen kysymykseen. Syytöksiin ei reagoida — se ei anna lisää "materiaalia" konfliktille eikä kutsuta riitaan.',
    },
    {
        id: 'ex2',
        context: 'Ex-kumppani peruu tapaamisen viime hetkellä ja syyttää sinua siitä, että "teit tästä tilanteen".',
        message: '"Peruutan tämän viikonlopun. Et ole ottanut huomioon minun aikataulujani. Sinähän tämän tilanteen teit."',
        options: [
            { id: 'a', label: '"En ole tehnyt mitään! Sinä olet se joka aina peruu. Eikö lapsesi kiinnosta sinua?"', type: 'defensive' },
            { id: 'b', label: '"Ymmärrän, elämä voi olla stressaavaa. Jos tarvitset muutoksia aikatauluihin, voimme puhua siitä rauhassa."', type: 'apologetic' },
            { id: 'c', label: '"Kirjaan peruutuksen. Seuraava tapaaminen sopimuksen mukaan on 15.3. Varmistan, että lapsi on valmiina klo 10."', type: 'biff' },
        ],
        correctId: 'c',
        explanation: 'Grey rock -tyyli: olet niin neutraali ja hänen viestinsä saa niin vähän reaktiota kuin harmaa kivi. Syytös sivuutetaan täysin — vain fakta kirjataan.',
    },
    {
        id: 'ex3',
        context: 'Saat viestin: "Maksat liian vähän elatusta. Olen valmis menemään oikeuteen."',
        message: '"Elatussumma on täysin riittämätön. Tiedän mitä ansaitset. Jos et maksa enemmän, vien sinut oikeuteen ensi viikolla."',
        options: [
            { id: 'a', label: '"Maksan sen mitä laki vaatii. Jos haluat enemmän, mene sitten oikeuteen — minulla on hyvä asianajaja."', type: 'defensive' },
            { id: 'b', label: '"Haluan löytää ratkaisun. Voisimmeko tavata ja puhua tästä? En halua riidellä lapsemme takia."', type: 'apologetic' },
            { id: 'c', label: '"Elatusmaksu on asetettu [päivämäärä] sopimuksessa ja vastaa laskennallista osuuttani. Oikeudellisissa kysymyksissä ota yhteyttä asianajajaan."', type: 'biff' },
        ],
        correctId: 'c',
        explanation: 'Uhkaukseen ei reagoida uhkauksella eikä tarjouksella. Fakta todetaan, oikeudellinen prosessi ohjataan sen omaan kanavaan. Tämä suojaa sinua — vastaus on dokumentoitavissa.',
    },
];

const TEMPLATES = [
    {
        title: 'Syyttävä viesti',
        situation: 'Kun saat pitkän, syyttävän viestin',
        template: 'Hoidetaan [asia] klo [aika] / [päivämäärä]. Muut asiat voit lähettää kirjallisesti.',
        note: 'Ei selityksiä. Ei anteeksipyyntöjä. Vain käytännön fakta.',
    },
    {
        title: 'Viime hetken peruutus',
        situation: 'Tapaaminen peruutetaan ilman syytä',
        template: 'Kirjaan peruutuksen. Seuraava tapaaminen sopimuksen mukaan on [pvm]. Olen yhteydessä tarvittaessa.',
        note: 'Älä kysy selitystä. Älä osoita pettymystä. Kirjaa vain.',
    },
    {
        title: 'Taloudellinen uhkailu',
        situation: 'Elatuksesta tai varoista uhkaillaan',
        template: '[Asia] on sovittu [dokumentti/sopimus/päätös] mukaisesti. Oikeudellisissa kysymyksissä ota yhteyttä asianajajaan.',
        note: 'Ohjaa juridinen sisältö pois omasta viestinnästäsi.',
    },
    {
        title: 'Toistuvat kysymykset',
        situation: 'Saat kysymystulvan',
        template: 'Vastasin tähän [päivämäärä]. Tieto löytyy viestistäni. Uusia kysymyksiä voit lähettää sähköpostilla.',
        note: 'Kerran riittää. Et ole velvollinen toistamaan itseäsi.',
    },
    {
        title: 'Mustamaalaus',
        situation: 'Sinut mustamaalataan lapselle, sukulaisille tai viranomaisille',
        template: 'En kommentoi tätä väitettä. Jos sinulla on dokumentoitua huolta lapsen hyvinvoinnista, ota yhteyttä [lasten­suojelu / oikeus].',
        note: 'Puolustautuminen vahvistaa konfliktin. Fakta ohjaa asiat oikeaan kanavaan.',
    },
];

interface Props {
    moduleId?: string;
    onComplete: (score?: number) => void;
    onExit: () => void;
}

export default function CoerciveBIFF({ onComplete, onExit }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [view, setView] = useState<ViewState>('intro');
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const scrollTop = useCallback(() => {
        containerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
        containerRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, []);

    const go = useCallback((v: ViewState) => {
        scrollTop();
        setView(v);
    }, [scrollTop]);

    const currentExercise = EXERCISES[exerciseIndex];
    const isLastExercise = exerciseIndex === EXERCISES.length - 1;

    const handleOptionSelect = (optionId: string) => {
        if (showFeedback) return;
        setSelectedOption(optionId);
        setShowFeedback(true);
        if (optionId === currentExercise.correctId) {
            setCorrectCount(c => c + 1);
        }
    };

    const handleNextExercise = () => {
        scrollTop();
        setSelectedOption(null);
        setShowFeedback(false);
        if (isLastExercise) {
            setView('templates');
        } else {
            setExerciseIndex(i => i + 1);
        }
    };

    const copyTemplate = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const getOptionStyle = (optId: string) => {
        if (!showFeedback) return 'border-[#E7E5E4] hover:border-slate-400 hover:bg-slate-50 cursor-pointer';
        if (optId === currentExercise.correctId) return 'border-emerald-400 bg-emerald-50';
        if (optId === selectedOption) return 'border-red-300 bg-red-50';
        return 'border-[#E7E5E4] opacity-50';
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full bg-[#FAFAF9] rounded-[2rem] border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C] flex flex-col"
        >

            {/* STICKY HEADER */}
            <div className="sticky top-0 z-10 bg-[#FAFAF9] border-b border-[#E7E5E4] flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
                <div className="flex items-center gap-2 md:gap-3 min-w-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                        <MessageSquare className="w-4 h-4 md:w-6 md:h-6" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-sm md:text-base font-black uppercase tracking-widest text-[#292524] leading-tight truncate">Viesti ilman reaktiopintaa</h2>
                        <span className="text-[10px] md:text-xs font-bold text-[#A8A29E] uppercase tracking-widest">BIFF · Grey Rock · Moduuli 2</span>
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
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-5"
                            >
                                <Badge variant="outline" className="text-slate-600 border-slate-200 bg-slate-50 text-xs tracking-widest uppercase">Moduuli 2 / 4 — Viestintä</Badge>
                                <h1 className="text-2xl md:text-3xl font-serif font-black text-[#292524]">
                                    Lopeta henkinen pingis
                                </h1>
                                <p className="text-base md:text-lg text-[#57534E] leading-relaxed">
                                    Kontrolloiva kumppani tai ex-kumppani käyttää viestejä reaktion kalasteluna.
                                    Pitkät syytökset, uhkailut ja kysymystulvat ovat ansoja — ei aidosti kommunikaatiota.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                                        <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Miten reagoit nyt?</p>
                                        <p className="text-sm text-red-800">Selittelyt, puolustautuminen ja anteeksipyynnöt antavat enemmän materiaalia konfliktiin.</p>
                                    </div>
                                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Mitä opitaan?</p>
                                        <p className="text-sm text-emerald-800">BIFF ja Grey Rock: lyhyt, asiallinen, neutraali — et anna reaktiota eikä sitä, mitä etsitään.</p>
                                    </div>
                                </div>
                                <Button onClick={() => go('theory')} size="lg" className="w-full md:w-auto bg-slate-700 hover:bg-slate-800 text-white rounded-full px-8">
                                    Mikä on BIFF? <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.div>
                        )}

                        {/* THEORY */}
                        {view === 'theory' && (
                            <motion.div
                                key="theory"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="w-full space-y-5"
                            >
                                <div>
                                    <Badge variant="outline" className="text-slate-600 border-slate-200 bg-slate-50 text-xs tracking-widest uppercase mb-2">Teoria</Badge>
                                    <h2 className="text-xl md:text-2xl font-bold text-[#292524]">BIFF-malli</h2>
                                    <p className="text-[#57534E] text-sm mt-1">Bill Eddy, LCSW — kehitetty korkean konfliktin tilanteisiin</p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { letter: 'B', word: 'Brief', fi: 'Lyhyt', desc: 'Maksimissaan muutama lause. Jokainen lisäsana on uusi ansakohta.' },
                                        { letter: 'I', word: 'Informative', fi: 'Informatiivinen', desc: 'Vain faktat. Päivämäärät, numerot, sopimukset — ei tunteita eikä mielipiteitä.' },
                                        { letter: 'F', word: 'Firm', fi: 'Luja', desc: 'Ei pyydä anteeksi. Ei selittele. Ei kutsu uuteen kierrokseen.' },
                                        { letter: 'F', word: 'Friendly/Formal', fi: 'Ystävällinen / Asiallinen', desc: 'Neutraali sävy — ei hyökkäävä eikä lämpimästi kutsuva. Lämmin sävy houkuttaa enemmän viestejä.' },
                                    ].map((item) => (
                                        <div key={item.letter + item.word} className="p-5 bg-white border border-[#E7E5E4] rounded-xl flex gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-slate-700 text-white flex items-center justify-center font-black text-lg flex-shrink-0">
                                                {item.letter}
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#292524]">{item.word} <span className="font-normal text-[#78716C]">— {item.fi}</span></p>
                                                <p className="text-sm text-[#57534E] mt-1">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Grey Rock -metodi</p>
                                    <p className="text-sm text-[#57534E]">
                                        Ole niin tylsä ja reagoimaton kuin harmaa kivi. Kontrolloiva henkilö etsii reaktiota — tunnetta, selitystä, vastatuntoa.
                                        Kun reaktiota ei tule, ärsyke lakkaa olemasta palkitseva.
                                        <strong className="text-[#292524]"> Et estä konfliktia selittämällä — lopetat sen olemalla läsnä vain sen verran kuin on pakollista.</strong>
                                    </p>
                                </div>

                                <Button onClick={() => go('exercise')} size="lg" className="w-full bg-slate-700 hover:bg-slate-800 text-white rounded-full">
                                    Harjoittele viestejä <ChevronRight className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.div>
                        )}

                        {/* EXERCISE */}
                        {view === 'exercise' && (
                            <motion.div
                                key={`exercise-${exerciseIndex}`}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="w-full space-y-5"
                            >
                                <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-slate-600 border-slate-200 bg-slate-50 text-xs tracking-widest uppercase">
                                        Harjoitus {exerciseIndex + 1} / {EXERCISES.length}
                                    </Badge>
                                    <div className="flex gap-1">
                                        {EXERCISES.map((_, i) => (
                                            <div key={i} className={`h-1.5 w-8 rounded-full ${i <= exerciseIndex ? 'bg-slate-600' : 'bg-slate-200'}`} />
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-900">
                                    <p className="font-semibold mb-1">Tilanne:</p>
                                    <p>{currentExercise.context}</p>
                                </div>

                                <div className="p-4 bg-white border-2 border-[#E7E5E4] rounded-xl">
                                    <p className="text-xs font-bold text-[#A8A29E] uppercase tracking-wider mb-2">Viesti jonka saat:</p>
                                    <p className="text-sm text-[#44403C] italic leading-relaxed">{currentExercise.message}</p>
                                </div>

                                <p className="text-sm font-semibold text-[#57534E]">Miten vastaat?</p>
                                <div className="space-y-3">
                                    {currentExercise.options.map((opt) => (
                                        <div
                                            key={opt.id}
                                            className={`p-3 md:p-4 border-2 rounded-xl transition-all ${getOptionStyle(opt.id)}`}
                                            onClick={() => handleOptionSelect(opt.id)}
                                        >
                                            <p className="text-sm">{opt.label}</p>
                                            {showFeedback && opt.id === currentExercise.correctId && (
                                                <div className="flex items-center gap-1 mt-2">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                                    <span className="text-xs font-semibold text-emerald-700">BIFF-vastaus</span>
                                                </div>
                                            )}
                                            {showFeedback && opt.id === selectedOption && opt.id !== currentExercise.correctId && (
                                                <div className="flex items-center gap-1 mt-2">
                                                    <AlertCircle className="w-4 h-4 text-red-500" />
                                                    <span className="text-xs font-semibold text-red-600">
                                                        {opt.type === 'defensive' ? 'Puolustautuva — ruokkii konfliktia' : 'Selittelevä — antaa uuden ansan'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {showFeedback && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-slate-50 border border-slate-200 rounded-xl"
                                    >
                                        <p className="text-sm text-[#292524]">{currentExercise.explanation}</p>
                                        <Button onClick={handleNextExercise} className="mt-4 w-full bg-slate-700 hover:bg-slate-800 text-white rounded-full">
                                            {isLastExercise ? 'Jatka → Vastauspohjat' : 'Seuraava harjoitus'} <ChevronRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {/* TEMPLATES */}
                        {view === 'templates' && (
                            <motion.div
                                key="templates"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="w-full space-y-5"
                            >
                                <div>
                                    <Badge variant="outline" className="text-slate-600 border-slate-200 bg-slate-50 text-xs tracking-widest uppercase mb-2">Vastauspohjat</Badge>
                                    <h2 className="text-xl md:text-2xl font-bold text-[#292524]">Kopioi ja muokkaa</h2>
                                    <p className="text-sm text-[#57534E] mt-1">Tallenna nämä puhelimeen tai sähköpostiluonnokseksi — kirjoita [hakasulkeisiin] omat tietosi.</p>
                                </div>

                                <div className="space-y-4">
                                    {TEMPLATES.map((tmpl, i) => (
                                        <div key={i} className="p-5 bg-white border border-[#E7E5E4] rounded-xl space-y-3">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="font-bold text-[#292524] text-sm">{tmpl.title}</p>
                                                    <p className="text-xs text-[#A8A29E] mt-0.5">{tmpl.situation}</p>
                                                </div>
                                                <button
                                                    onClick={() => copyTemplate(`tmpl-${i}`, tmpl.template)}
                                                    className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                                                >
                                                    {copiedId === `tmpl-${i}` ? <><Check className="w-3.5 h-3.5" />Kopioitu</> : <><Copy className="w-3.5 h-3.5" />Kopioi</>}
                                                </button>
                                            </div>
                                            <p className="text-sm font-mono bg-slate-50 text-slate-700 p-3 rounded-lg border border-slate-200 leading-relaxed">
                                                {tmpl.template}
                                            </p>
                                            <p className="text-xs text-[#78716C] italic">{tmpl.note}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Link to BIFF simulator */}
                                <div className="p-4 bg-[#5B4B8A]/5 border border-[#5B4B8A]/20 rounded-xl flex items-center justify-between gap-3">
                                    <p className="text-sm text-[#2B2B2B]">
                                        <strong>Harjoittele käytännössä</strong> — sähköpostisimulaattori jossa harjoittelet BIFF-vastausta oikeassa tilanteessa.
                                    </p>
                                    <Link
                                        href="/simulaatio/kiusaaminen/biff-email-scenario"
                                        className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold text-[#5B4B8A] hover:text-[#4A3A79] bg-[#5B4B8A]/10 px-3 py-2 rounded-lg transition-colors"
                                    >
                                        Simulaattori <ExternalLink className="w-3.5 h-3.5" />
                                    </Link>
                                </div>

                                <Button onClick={() => go('summary')} size="lg" className="w-full bg-slate-700 hover:bg-slate-800 text-white rounded-full">
                                    Valmis <CheckCircle2 className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.div>
                        )}

                        {/* SUMMARY */}
                        {view === 'summary' && (
                            <motion.div
                                key="summary"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center text-center space-y-8 py-8"
                            >
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-10 h-10 text-slate-600" />
                                </div>
                                <div className="space-y-3 max-w-md">
                                    <h1 className="text-2xl md:text-3xl font-serif font-black text-[#292524]">
                                        {correctCount}/{EXERCISES.length} oikein
                                    </h1>
                                    <p className="text-[#57534E] leading-relaxed">
                                        Olet harjoitellut BIFF-viestintää ja Grey Rock -metodia.
                                        Nämä tekniikat eivät lopeta konfliktia — ne lopettavat sinun osuutesi konfliktissa.
                                        <strong className="text-[#292524]"> Se on ainoa asia, jonka voit kontrolloida.</strong>
                                    </p>
                                </div>
                                <Button onClick={() => onComplete(Math.round(correctCount / EXERCISES.length * 100))} size="lg" className="bg-[#292524] hover:bg-[#44403C] text-white rounded-full px-10 py-6 text-lg shadow-lg">
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
