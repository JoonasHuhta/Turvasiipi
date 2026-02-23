"use client";

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ArrowRight, X, CheckCircle2, ChevronRight, AlertTriangle, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ViewState = 'intro' | 'continuum' | 'scenarios' | 'audit' | 'summary';

interface Scenario {
    id: string;
    phase: string;
    phaseColor: string;
    text: string;
    question: string;
    options: { id: string; label: string; correct: boolean; feedback: string }[];
    tacticName: string;
    tacticExplanation: string;
}

const SCENARIOS: Scenario[] = [
    {
        id: 'sc1',
        phase: 'Suhteessa',
        phaseColor: 'amber',
        text: 'Teet kotitöitä eri tavalla kuin kumppanisi haluaa. Hän ei suutu avoimesti — hän lakkaa puhumasta sinulle kolmeksi päiväksi. Kun kysyt mikä on vialla, hän sanoo: "Ei mitään. Sinä tiedät kyllä."',
        question: 'Mistä tässä on kyse?',
        options: [
            { id: 'a', label: 'Hän on loukattu ja tarvitsee tilaa — normaali reaktio', correct: false, feedback: 'Loukkauksen käsittely on normaalia, mutta hiljaisuuden käyttö rangaistuksena ja "sinä tiedät kyllä" on osallistamista syyllisyyteen ilman selvitystä.' },
            { id: 'b', label: 'Hiljaisuutta käytetään rangaistuksena — kontrollin muoto', correct: true, feedback: 'Oikein. "Silent treatment" rankaisee ilman selitystä, pakottaa toisen arvailemaan ja asettaa valtaepäsymmetrian. Ilman selvitystä ei ole mahdollista muuttua — se ei ole tarkoituskaan.' },
            { id: 'c', label: 'Viestintäongelma, josta voi selvitä puhumalla', correct: false, feedback: 'Viestintäongelma edellyttää molemminpuolista tahtoa selvittää. Tässä toinen käyttää hiljaisuutta välineenä — ei kieltäydy viestinnästä vahingossa.' },
        ],
        tacticName: 'Silent treatment / Hiljaisuus rangaistuksena',
        tacticExplanation: 'Hiljaisuutta käytetään rangaistuksen välineenä. Se pakottaa kohteen arvailemaan virhettään ja pyytämään anteeksi — ilman tietoa mistä. Tämä ylläpitää valtaepäsymmetriaa.',
    },
    {
        id: 'sc2',
        phase: 'Eron aikana',
        phaseColor: 'orange',
        text: 'Olette sopineet lapsen tapaamisen viikonlopuksi. Ex-kumppani ilmoittaa perjantai-iltana, että lapsi on "väsynyt" eikä tule. Tämä on tapahtunut jo kuudetta kertaa. Pyydät perusteluja — saat vastauksen: "Laitan lapsen edun aina ensin. Sinä et ymmärrä."',
        question: 'Mikä on tapahtuman todennäköinen luonne?',
        options: [
            { id: 'a', label: 'Lapsi on oikeasti ollut väsynyt — huolenpitopäätös', correct: false, feedback: 'Yksittäinen tapaus voi olla aito huolenpitopäätös. Kuudes toistuvuus ilman vaihtoehtoista ratkaisua viittaa muuhun.' },
            { id: 'b', label: 'Logistinen ongelma, joka voidaan sopia uudelleen', correct: false, feedback: 'Logistinen ongelma ratkaistaan sopimalla täydentävä aika. Tässä se ei tapahdu — peruutus tulee toistuvasti eikä tarjoa kompromissia.' },
            { id: 'c', label: 'Tapaamisten kontrollointi — lapsi välineenä', correct: true, feedback: 'Oikein. Toistuvat viime hetken peruutukset ilman vaihtoehtoista tarjousta ja "lapsen etu" -retoriikka moralisoimisen välineenä ovat tyypillisiä post-separation abuse -taktiikoita.' },
        ],
        tacticName: 'Tapaamisten sabotointi',
        tacticExplanation: 'Toistuvat peruutukset ilman ratkaisua kontrolloivat vanhempaa ja ylläpitävät "lapsen etu" -kulissia. Dokumentointi on avain — kuusi kertaa on rakenne, ei yksittäistapaus.',
    },
    {
        id: 'sc3',
        phase: 'Eron jälkeen',
        phaseColor: 'red',
        text: 'Ex-kumppani tekee sinut koskevasta asiasta useita kirjelmiä, valituksia ja uusia vaatimuksia oikeuteen — kuukausikaupalla. Asiat ovat pieniä (omaisuuden jako, tavarat), mutta jokainen vaatii sinulta vastauksen, asianajajan aikaa ja rahaa.',
        question: 'Mitä tämä todennäköisesti on?',
        options: [
            { id: 'a', label: 'Tärkeitä, ratkaisemattomia asioita jotka pitää selvittää', correct: false, feedback: 'Sisältö voi olla pientä, mutta se ei ole ratkaisematonta — se on tarkoituksellisesti auki pidettyä. Ero on olennainen.' },
            { id: 'b', label: 'Oikeudellinen prosessikiusaaminen — kontrollin jatkuminen uudessa areenassa', correct: true, feedback: 'Oikein. Loputon kirjelmöinti pienistä asioista kuluttaa aikaa, rahaa ja henkistä kapasiteettia. Tavoite ei ole ratkaisu — tavoite on pitää sinut ylikuormitettuna ja reaktiivisena.' },
            { id: 'c', label: 'Ex-kumppani haluaa reilun ratkaisun mutta kommunikoi huonosti', correct: false, feedback: 'Reilua ratkaisua tavoitteleva henkilö tekee kompromisseja ja pyrkii sulkemaan asioita. Tässä ei tehdä kumpaakin.' },
        ],
        tacticName: 'Oikeudellinen viivyttely ja ylikuormittaminen',
        tacticExplanation: 'Tuomioistuimet käsittelevät yksittäisiä vaatimuksia — eivät arvioi kokonaisrakennetta. Tämä antaa kontrolloivalle henkilölle strategisen edun: prosessin käyttö kontrollin välineenä näyttää "normaalilta" riitelyllä.',
    },
];

const AUDIT_ITEMS = [
    { id: 'a1', text: 'Säännöt tuntuvat muuttuvan jälkikäteen ja syyllinen on aina minä' },
    { id: 'a2', text: 'Pyydän jatkuvasti anteeksi asioita, joita en täysin ymmärrä' },
    { id: 'a3', text: 'Pelkään kumppanin / ex-kumppanin reaktiota ennen kuin lähetän viestin' },
    { id: 'a4', text: 'Koen, että taloudellinen tilanteeni tai lapseni ovat "panttivankeja"' },
    { id: 'a5', text: 'Oikeudellinen tai hallinnollinen prosessi tuntuu tietoiselta ylikuormittamiselta' },
    { id: 'a6', text: 'Lähipiiri tai viranomaiset eivät usko kertomustani — "hän vaikuttaa niin normaalilta"' },
    { id: 'a7', text: 'Tunnen, että sovinto on mahdoton koska toinen ei halua ratkaisua vaan voittoa' },
];

interface Props {
    moduleId?: string;
    onComplete: (score?: number) => void;
    onExit: () => void;
}

export default function CoerciveRecognition({ onComplete, onExit }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [view, setView] = useState<ViewState>('intro');
    const [scenarioIndex, setScenarioIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [auditChecked, setAuditChecked] = useState<Set<string>>(new Set());

    const scrollTop = useCallback(() => {
        containerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
        // Also scroll the page itself in case module is not full-viewport
        containerRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, []);

    const go = useCallback((v: ViewState) => {
        scrollTop();
        setView(v);
    }, [scrollTop]);

    const currentScenario = SCENARIOS[scenarioIndex];
    const isLast = scenarioIndex === SCENARIOS.length - 1;

    const handleSelect = (optId: string) => {
        if (showFeedback) return;
        setSelectedOption(optId);
        setShowFeedback(true);
        const opt = currentScenario.options.find(o => o.id === optId);
        if (opt?.correct) setCorrectCount(c => c + 1);
    };

    const handleNext = () => {
        scrollTop();
        setSelectedOption(null);
        setShowFeedback(false);
        if (isLast) setView('audit');
        else setScenarioIndex(i => i + 1);
    };

    const phaseColorMap: Record<string, string> = {
        amber: 'bg-amber-50 text-amber-700 border-amber-200',
        orange: 'bg-orange-50 text-orange-700 border-orange-200',
        red: 'bg-red-50 text-red-700 border-red-200',
    };

    const optionStyle = (opt: typeof currentScenario.options[0]) => {
        if (!showFeedback) return 'border-[#E7E5E4] hover:border-slate-400 hover:bg-slate-50 cursor-pointer';
        if (opt.correct) return 'border-emerald-400 bg-emerald-50';
        if (opt.id === selectedOption) return 'border-red-300 bg-red-50';
        return 'border-[#E7E5E4] opacity-40';
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full bg-[#FAFAF9] rounded-[2rem] border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C] flex flex-col"
        >
            {/* STICKY HEADER */}
            <div className="sticky top-0 z-10 bg-[#FAFAF9] border-b border-[#E7E5E4] flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
                <div className="flex items-center gap-2 md:gap-3 min-w-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0">
                        <Eye className="w-4 h-4 md:w-6 md:h-6" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-sm md:text-base font-black uppercase tracking-widest text-[#292524] leading-tight truncate">Tunnista käyttäytymismalli</h2>
                        <span className="text-[10px] md:text-xs font-bold text-[#A8A29E] uppercase tracking-widest">Kontrolloiva suhde · Moduuli 1</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-[#F5F5F4] text-[#78716C] flex-shrink-0">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            {/* CONTENT */}
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
                                className="space-y-6"
                            >
                                <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50 text-xs tracking-widest uppercase">Moduuli 1 / 4 — Tunnistaminen</Badge>
                                <h1 className="text-2xl md:text-3xl font-serif font-black text-[#292524]">
                                    Miksi tämä ei ole tavallinen riitely?
                                </h1>
                                <p className="text-base md:text-lg text-[#57534E] leading-relaxed">
                                    Kontrolloivassa suhteessa säännöt muuttuvat jälkikäteen — mutta syyllinen pysyy aina samana.
                                    Kiusaaminen ei ala yhtäkkiä. Se rakentuu hitaasti ja voi jatkua eron jälkeenkin uudessa muodossa.
                                </p>
                                <p className="text-sm text-[#78716C] italic">
                                    Käyt läpi tilanteita kolmesta vaiheesta: suhteessa, erotilanteessa ja eron jälkeen.
                                </p>
                                <Button onClick={() => go('continuum')} size="lg" className="w-full md:w-auto bg-amber-700 hover:bg-amber-800 text-white rounded-full px-8">
                                    Aloita <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.div>
                        )}

                        {/* CONTINUUM */}
                        {view === 'continuum' && (
                            <motion.div
                                key="continuum"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-5"
                            >
                                <div>
                                    <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50 text-xs tracking-widest uppercase mb-2">Kontrollin jatkumo</Badge>
                                    <h2 className="text-xl md:text-2xl font-bold text-[#292524]">Miten kontrolli rakentuu?</h2>
                                </div>

                                <div className="space-y-2">
                                    {[
                                        { step: '1', label: 'Normaali erimielisyys', desc: 'Konflikti ja ratkaisu — molemmat haluavat selvittää', color: 'bg-green-50 border-green-200 text-green-800' },
                                        { step: '2', label: 'Toistuva loukkaus', desc: 'Sama käyttäytyminen toistuu, selitykset vaihtelevat', color: 'bg-yellow-50 border-yellow-200 text-yellow-800' },
                                        { step: '3', label: 'Kontrolli', desc: 'Toinen alkaa muuttaa käytöstään välttääkseen konfliktin', color: 'bg-orange-50 border-orange-200 text-orange-800' },
                                        { step: '4', label: 'Koercive control', desc: 'Systemaattinen vallankäyttö — pelko, eristäminen, taloudellinen kontrolli', color: 'bg-red-50 border-red-200 text-red-800' },
                                        { step: '5', label: 'Jatkuu eron jälkeen', desc: 'Oikeusjärjestelmä, lapset, talous — kontrolli siirtyy uuteen areenaan', color: 'bg-purple-50 border-purple-200 text-purple-800' },
                                    ].map((item) => (
                                        <div key={item.step} className={`flex items-start gap-3 p-3 border rounded-xl ${item.color}`}>
                                            <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                                                {item.step}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{item.label}</p>
                                                <p className="text-xs opacity-80 mt-0.5">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 bg-[#292524] text-white rounded-xl space-y-2">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                        <p className="font-bold text-xs uppercase tracking-wider text-amber-400">Miksi kontrolli jatkuu eron jälkeen?</p>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-300">
                                        Kontrolloivalla henkilöllä on usein vaikeus sietää toisen itsemääräämisoikeutta. Ero ei tarkoita kontrollin loppumista — se tarkoittaa uuden hallinnan areenan etsimistä.
                                    </p>
                                    <p className="text-sm leading-relaxed text-gray-300">
                                        Siksi sovintoa ei synny: <strong className="text-white">tavoite ei ole ratkaisu — tavoite on yksipuolinen voitto ja alistamisen jatkaminen.</strong>
                                    </p>
                                </div>

                                <Button onClick={() => go('scenarios')} size="lg" className="w-full bg-amber-700 hover:bg-amber-800 text-white rounded-full">
                                    Tunnista tilanteet <ChevronRight className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.div>
                        )}

                        {/* SCENARIOS */}
                        {view === 'scenarios' && (
                            <motion.div
                                key={`sc-${scenarioIndex}`}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-5"
                            >
                                <div className="flex items-center justify-between">
                                    <Badge variant="outline" className={`text-xs tracking-widest uppercase border ${phaseColorMap[currentScenario.phaseColor]}`}>
                                        {currentScenario.phase}
                                    </Badge>
                                    <div className="flex gap-1">
                                        {SCENARIOS.map((_, i) => (
                                            <div key={i} className={`h-1.5 w-8 rounded-full ${i <= scenarioIndex ? 'bg-amber-600' : 'bg-slate-200'}`} />
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 bg-white border-2 border-[#E7E5E4] rounded-xl">
                                    <p className="text-sm text-[#44403C] leading-relaxed italic">{currentScenario.text}</p>
                                </div>

                                <p className="font-semibold text-[#292524] text-sm">{currentScenario.question}</p>

                                <div className="space-y-2">
                                    {currentScenario.options.map((opt) => (
                                        <div
                                            key={opt.id}
                                            className={`p-3 md:p-4 border-2 rounded-xl transition-all ${optionStyle(opt)}`}
                                            onClick={() => handleSelect(opt.id)}
                                        >
                                            <p className="text-sm">{opt.label}</p>
                                            {showFeedback && (
                                                <p className="text-xs mt-2 text-[#57534E] italic">{opt.feedback}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {showFeedback && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2"
                                    >
                                        <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">{currentScenario.tacticName}</p>
                                        <p className="text-sm text-[#44403C]">{currentScenario.tacticExplanation}</p>
                                        <Button onClick={handleNext} className="w-full bg-amber-700 hover:bg-amber-800 text-white rounded-full mt-1">
                                            {isLast ? 'Jatka → Oman tilanteen arviointi' : 'Seuraava tilanne'} <ChevronRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {/* AUDIT */}
                        {view === 'audit' && (
                            <motion.div
                                key="audit"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-5"
                            >
                                <div>
                                    <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50 text-xs tracking-widest uppercase mb-2">Oman tilanteen tunnistaminen</Badge>
                                    <h2 className="text-xl md:text-2xl font-bold text-[#292524]">Tunnistatko itsesi?</h2>
                                    <p className="text-sm text-[#57534E] mt-1">Valitse lauseet jotka resonoivat tilanteessasi. Tämä on vain sinua varten.</p>
                                </div>

                                <div className="space-y-2">
                                    {AUDIT_ITEMS.map((item) => {
                                        const isChecked = auditChecked.has(item.id);
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => {
                                                    const next = new Set(auditChecked);
                                                    if (isChecked) next.delete(item.id);
                                                    else next.add(item.id);
                                                    setAuditChecked(next);
                                                }}
                                                className={`p-3 border-2 rounded-xl cursor-pointer transition-all flex items-start gap-3 ${isChecked ? 'border-amber-400 bg-amber-50' : 'border-[#E7E5E4] hover:border-slate-300'}`}
                                            >
                                                <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${isChecked ? 'border-amber-500 bg-amber-500' : 'border-[#C4B5A5]'}`}>
                                                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                                </div>
                                                <p className="text-sm text-[#44403C]">{item.text}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                {auditChecked.size >= 3 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="p-4 bg-[#292524] text-white rounded-xl"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Tärkeää</p>
                                        </div>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            Olet tunnistanut useamman merkin. Et ole ainoa joka kokee näin —
                                            ja tuntemukset ovat totta, vaikka kukaan muu ei vielä näe koko kuvaa.
                                            Seuraavissa moduuleissa opit, miten suojelet itseäsi.
                                        </p>
                                    </motion.div>
                                )}

                                <Button
                                    onClick={() => go('summary')}
                                    size="lg"
                                    className="w-full bg-amber-700 hover:bg-amber-800 text-white rounded-full"
                                >
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
                                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-10 h-10 text-amber-700" />
                                </div>
                                <div className="space-y-3 max-w-md">
                                    <h1 className="text-2xl md:text-3xl font-serif font-black text-[#292524]">Tunnistaminen on alku</h1>
                                    <p className="text-[#57534E] leading-relaxed">
                                        Juuri tämä — nimeäminen — on se, mikä puuttuu useimmilta vuosia.
                                        Kun tilanne saa nimen, voit alkaa toimia sen mukaisesti.
                                        <strong className="text-[#292524]"> Et yritä enää selvittää selvittämätöntä.</strong>
                                    </p>
                                </div>
                                <Button
                                    onClick={() => onComplete()}
                                    size="lg"
                                    className="bg-[#292524] hover:bg-[#44403C] text-white rounded-full px-10 py-6 text-lg shadow-lg"
                                >
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
