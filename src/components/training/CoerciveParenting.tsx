"use client";

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ArrowRight, X, CheckCircle2, ChevronRight, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ViewState = 'intro' | 'theory' | 'scripts' | 'checklist' | 'summary';

interface ScriptScenario {
    id: string;
    situation: string;
    childSays: string;
    options: { id: string; label: string; correct: boolean; why: string }[];
}

const SCRIPTS: ScriptScenario[] = [
    {
        id: 'ss1',
        situation: 'Lapsi (7 v.) palaa tapaamisesta ja sanoo:',
        childSays: '"Isä/äiti sanoi, että te meette köyhäksi koska sinä tuhlaatte rahat."',
        options: [
            { id: 'a', label: '"Se ei pidä paikkaansa! Isä/äiti valehtelee."', correct: false, why: 'Toisesta vanhemmasta puhuminen negatiivisesti asettaa lapsen ristiriitatilaan — se loukkaa lapsen rakkautta toista vanhempaansa kohtaan.' },
            { id: 'b', label: '"Aikuisten raha-asiat ovat aikuisten asioita. Sinulla on täällä kaikki mitä tarvitset. Haluatko kertoa lisää?"', correct: true, why: 'Tämä kuittaa väitteen rauhallisesti, asettaa rajan lasten ja aikuisten maailmojen välille, ja avaa tilaa lapselle puhua ilman että lapsi joutuu sivuston osapuoleksi.' },
            { id: 'c', label: '"Eikö sinulle voisi puhua muistakaan kuin rahasta?"', correct: false, why: 'Tämä ilmaisee turhautumista tilanteeseen, jonka lapsi on vain vienyt eteenpäin. Lapsi ei ole syyllinen.' },
        ],
    },
    {
        id: 'ss2',
        situation: 'Lapsi (10 v.) kysyy:',
        childSays: '"Miksi te ette voi vain olla ystäviä? Olen väsynyt tähän."',
        options: [
            { id: 'a', label: '"Koska isä/äiti on sellainen ihminen joka tekee asiat vaikeaksi."', correct: false, why: 'Vaikka se tuntuisi rehelliseltä, se siirtää kohtuuttoman taakan lapselle ja asettaa toiselle vanhemmalle leiman.' },
            { id: 'b', label: '"Ymmärrän, se on raskasta kuunnella. Meillä aikuisilla on asioita, jotka on vaikea selvittää. Se ei ole sinun syysi — ja sinulla on oikeus rakastaa meitä molempia."', correct: true, why: 'Tämä validoi lapsen tunteen, ottaa vastuun aikuisten tilanteesta ja vapauttaa lapsen syyllisyydestä.' },
            { id: 'c', label: '"Yritetään olla ajattelematta sitä. Mennään syömään!"', correct: false, why: 'Aiheen vaihtaminen viestii lapselle, ettei hänen tunteensa ole sallittuja. Lapsi tarvitsee tunnustuksen, ei piilottamista.' },
        ],
    },
    {
        id: 'ss3',
        situation: 'Lapsi (8 v.) ei halua lähteä tapaamiseen ja itkee:',
        childSays: '"En halua mennä. Siellä on ikävää."',
        options: [
            { id: 'a', label: '"Sinun täytyy mennä, se on sopimus."', correct: false, why: 'Lain ja sopimusten noudattaminen on tärkeää, mutta lapsen tunne pitää ensin ottaa vakavasti — muuten lapsi oppii, että hänen kokemuksensa ei ole tärkeä.' },
            { id: 'b', label: '"Kerrotko minulle, mikä siellä on ikävää? Kuuntelen."', correct: true, why: 'Kuuleminen ennen — ja sitten rauhallinen selvittely mitä tapahtuu ja miten se hoidetaan. Jos lapsi kertoo jotain huolestuttavaa, se kirjataan ja viedään tarvittaessa ammattilaiselle.' },
            { id: 'c', label: '"Ehkä tällä kertaa voidaan jäädä kotiin."', correct: false, why: 'Sopimusten joustaminen yksipuolisesti voi johtaa juridisiin ongelmiin ja lapselle viestii, että tapaaminen voidaan kiertää itkemällä.' },
        ],
    },
];

const CHECKLIST_ITEMS = [
    {
        category: 'Tapaamisvaihdot', items: [
            'Vaihdot tapahtuvat neutraalissa paikassa (koulu, päiväkoti, neutraali piste)',
            'En kohtaa toista vanhempaa henkilökohtaisesti ilman tarvetta',
            'Korkean riskin vaihdoissa on tukihenkilö tai valvoja tarvittaessa',
        ]
    },
    {
        category: 'Kommunikaatio', items: [
            'Kaikki viestintä on kirjallista (sähköposti tai co-parenting-sovellus)',
            'Vastaan vain lapsiin liittyviin, asiallisiin kysymyksiin',
            'Olen asettanut vasteajalle selkeän rajan (esim. vastaan 24h kuluessa)',
        ]
    },
    {
        category: 'Lapsi', items: [
            'Lapsi ei ole viestinviejä aikuisten asioissa',
            'En kommentoi toista vanhempaa negatiivisesti lapsen kuullen',
            'Lapsi tietää, että hänellä on oikeus rakastaa molempia vanhempia',
            'Lapsi tietää keneen voi ottaa yhteyttä jos pelottaa (luotettava aikuinen)',
        ]
    },
    {
        category: 'Oma jaksaminen', items: [
            'Minulla on yksi ihminen jolle voin puhua rehellisesti',
            'Minulla on juridinen tuki tarvittaessa',
            'Tiedän mihin soittaa akuutissa tilanteessa',
        ]
    },
];

interface Props {
    moduleId?: string;
    onComplete: (score?: number) => void;
    onExit: () => void;
}

export default function CoerciveParenting({ onComplete, onExit }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [view, setView] = useState<ViewState>('intro');
    const [scriptIndex, setScriptIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [checked, setChecked] = useState<Set<string>>(new Set());

    const scrollTop = useCallback(() => {
        containerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
        containerRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, []);

    const go = useCallback((v: ViewState) => {
        scrollTop();
        setView(v);
    }, [scrollTop]);

    const current = SCRIPTS[scriptIndex];
    const isLast = scriptIndex === SCRIPTS.length - 1;

    const handleSelect = (id: string) => {
        if (showFeedback) return;
        setSelectedOption(id);
        setShowFeedback(true);
    };

    const handleNext = () => {
        scrollTop();
        setSelectedOption(null);
        setShowFeedback(false);
        if (isLast) setView('checklist');
        else setScriptIndex(i => i + 1);
    };

    const toggleCheck = (id: string) => {
        setChecked(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const optStyle = (opt: typeof current.options[0]) => {
        if (!showFeedback) return 'border-[#E7E5E4] hover:border-teal-400 hover:bg-teal-50/30 cursor-pointer';
        if (opt.correct) return 'border-emerald-400 bg-emerald-50';
        if (opt.id === selectedOption) return 'border-red-300 bg-red-50';
        return 'border-[#E7E5E4] opacity-40';
    };

    const totalChecked = checked.size;
    const totalItems = CHECKLIST_ITEMS.reduce((sum, cat) => sum + cat.items.length, 0);

    return (
        <div
            ref={containerRef}
            className="relative w-full bg-[#FAFAF9] rounded-[2rem] border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C] flex flex-col"
        >

            {/* STICKY HEADER */}
            <div className="sticky top-0 z-10 bg-[#FAFAF9] border-b border-[#E7E5E4] flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
                <div className="flex items-center gap-2 md:gap-3 min-w-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 flex-shrink-0">
                        <Users className="w-4 h-4 md:w-6 md:h-6" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-sm md:text-base font-black uppercase tracking-widest text-[#292524] leading-tight truncate">Suojaa lapset</h2>
                        <span className="text-[10px] md:text-xs font-bold text-[#A8A29E] uppercase tracking-widest">Rinnakkaisvanhemmuus — Moduuli 4</span>
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
                                <Badge variant="outline" className="text-teal-700 border-teal-200 bg-teal-50 text-xs tracking-widest uppercase">Moduuli 4 / 4 — Vanhemmuus</Badge>
                                <h1 className="text-2xl md:text-3xl font-serif font-black text-[#292524]">
                                    Rinnakkaisvanhemmuus — ei yhteistyötä, vaan rakenne
                                </h1>
                                <p className="text-base md:text-lg text-[#57534E] leading-relaxed">
                                    Kontrolloivan ex-kumppanin kanssa perinteinen yhteistyövanhemmuus ei ole mahdollista.
                                    Rinnakkaisvanhemmuus (parallel parenting) tarkoittaa, että lapsi saa rauhaa —
                                    ilman aikuisten sodan keskelle joutumista.
                                </p>
                                <Button onClick={() => go('theory')} size="lg" className="w-full md:w-auto bg-teal-700 hover:bg-teal-800 text-white rounded-full px-8">
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
                                    <Badge variant="outline" className="text-teal-700 border-teal-200 bg-teal-50 text-xs tracking-widest uppercase mb-2">Teoria</Badge>
                                    <h2 className="text-xl md:text-2xl font-bold text-[#292524]">Co-parenting vs. Parallel parenting</h2>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-3">
                                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Co-parenting</p>
                                        <p className="text-sm text-gray-700">Vaatii molemminpuolisen kunnioituksen ja halukkuuden yhteisiin päätöksiin. <strong>Ei toimi kontrolloivan kumppanin kanssa</strong> — se antaa lisää arenan konflikteille.</p>
                                    </div>
                                    <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-2">
                                        <p className="text-xs font-bold text-teal-700 uppercase tracking-wider">Parallel parenting ✓</p>
                                        <p className="text-sm text-teal-900">Vanhemmat toimivat rinnakkain, mahdollisimman vähällä kontaktilla. Jokainen vastaa omista päätöksistään omalla vuorollaan. Kodit ovat erillisiä, turvallisia saarekkeita.</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {[
                                        { title: 'Lapsi ei ole viestinviejä', desc: 'Lapsi ei välitä viestejä, lomakkeita tai rahaa aikuisten välillä.' },
                                        { title: 'Konfliktista erillään', desc: 'Lapsi saa rakastaa molempia vanhempia — ilman lojaalisuuskonfliktin taakkaa.' },
                                        { title: 'Ikätasoinen tieto', desc: '"Aikuisilla on asioita selvitettävänä. Se ei ole sinun syysi." Ei yksityiskohtia.' },
                                        { title: 'Huoli kirjataan — ei käsitellä lapsen kautta', desc: 'Jos lapsi kertoo jotain huolestuttavaa, vanhempi kirjaa ja vie ammattilaiselle, ei kuulustele.' },
                                    ].map(item => (
                                        <div key={item.title} className="flex items-start gap-3 p-3 bg-white border border-[#E7E5E4] rounded-xl">
                                            <Heart className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-sm text-[#292524]">{item.title}</p>
                                                <p className="text-xs text-[#78716C] mt-0.5">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Button onClick={() => go('scripts')} className="w-full bg-teal-700 hover:bg-teal-800 text-white rounded-full">
                                    Harjoittele lapsen kanssa puhumista <ChevronRight className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.div>
                        )}

                        {/* SCRIPTS */}
                        {view === 'scripts' && (
                            <motion.div key={`script-${scriptIndex}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="w-full space-y-5"
                            >
                                <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-teal-700 border-teal-200 bg-teal-50 text-xs tracking-widest uppercase">
                                        Tilanne {scriptIndex + 1} / {SCRIPTS.length}
                                    </Badge>
                                    <div className="flex gap-1">
                                        {SCRIPTS.map((_, i) => (
                                            <div key={i} className={cn("h-1.5 w-8 rounded-full", i <= scriptIndex ? 'bg-teal-600' : 'bg-slate-200')} />
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-sm text-teal-900">
                                    <p className="font-semibold mb-1">{current.situation}</p>
                                    <p className="italic">"{current.childSays}"</p>
                                </div>

                                <p className="font-semibold text-sm text-[#292524]">Mitä sanot?</p>
                                <div className="space-y-3">
                                    {current.options.map(opt => (
                                        <div key={opt.id}
                                            className={`p-4 border-2 rounded-xl transition-all ${optStyle(opt)}`}
                                            onClick={() => handleSelect(opt.id)}
                                        >
                                            <p className="text-sm">{opt.label}</p>
                                            {showFeedback && (
                                                <p className="text-xs mt-2 text-[#57534E] italic">{opt.why}</p>
                                            )}
                                            {showFeedback && opt.correct && (
                                                <div className="flex items-center gap-1 mt-1">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                                    <span className="text-xs font-semibold text-emerald-700">Hyvä vastaus</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {showFeedback && (
                                    <Button onClick={handleNext} className="w-full bg-teal-700 hover:bg-teal-800 text-white rounded-full">
                                        {isLast ? 'Jatka → Turvasuunnitelma' : 'Seuraava'} <ChevronRight className="ml-2 w-4 h-4" />
                                    </Button>
                                )}
                            </motion.div>
                        )}

                        {/* CHECKLIST */}
                        {view === 'checklist' && (
                            <motion.div key="checklist" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="w-full space-y-5"
                            >
                                <div>
                                    <Badge variant="outline" className="text-teal-700 border-teal-200 bg-teal-50 text-xs tracking-widest uppercase mb-2">Turvasuunnitelma</Badge>
                                    <h2 className="text-xl md:text-2xl font-bold text-[#292524]">Missä olet nyt?</h2>
                                    <p className="text-sm text-[#57534E] mt-1">Merkitse mitkä rakenteet on jo paikallaan. Muut ovat seuraavia askeleita.</p>
                                </div>

                                <div className="flex justify-between text-sm font-semibold text-[#292524] px-1">
                                    <span>Tarkistuslista</span>
                                    <span className="text-teal-700">{totalChecked} / {totalItems}</span>
                                </div>

                                <div className="space-y-5">
                                    {CHECKLIST_ITEMS.map((cat) => (
                                        <div key={cat.category} className="space-y-2">
                                            <p className="text-xs font-bold text-[#A8A29E] uppercase tracking-wider">{cat.category}</p>
                                            {cat.items.map((item, i) => {
                                                const id = `${cat.category}-${i}`;
                                                const isChecked = checked.has(id);
                                                return (
                                                    <div key={id} onClick={() => toggleCheck(id)}
                                                        className={cn(
                                                            "flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all",
                                                            isChecked ? 'border-teal-300 bg-teal-50' : 'border-[#E7E5E4] hover:border-teal-200'
                                                        )}
                                                    >
                                                        <div className={cn("w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center", isChecked ? 'border-teal-500 bg-teal-500' : 'border-[#C4B5A5]')}>
                                                            {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                                        </div>
                                                        <p className="text-sm text-[#44403C]">{item}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>

                                <Button onClick={() => go('summary')} size="lg" className="w-full bg-teal-700 hover:bg-teal-800 text-white rounded-full">
                                    Valmis <CheckCircle2 className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.div>
                        )}

                        {/* SUMMARY */}
                        {view === 'summary' && (
                            <motion.div key="summary" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center text-center space-y-8 py-8"
                            >
                                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                                    <Heart className="w-10 h-10 text-teal-700" />
                                </div>
                                <div className="space-y-3 max-w-md">
                                    <h1 className="text-2xl md:text-3xl font-serif font-black text-[#292524]">Lapsen turvallinen saari</h1>
                                    <p className="text-[#57534E] leading-relaxed">
                                        Sinun kotisi voi olla paikka jossa lapsi saa hengittää.
                                        Et pysty suojelemaan lasta kaikelta — mutta voit tehdä oman kodistasi sellaisen paikan,
                                        jossa konfliktia ei tuoda olohuoneeseen.
                                        <strong className="text-[#292524]"> Se on paljon.</strong>
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
