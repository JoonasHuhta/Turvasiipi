"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Heart,
    ArrowLeft,
    BookOpen,
    PlayCircle,
    Brain,
    Wind,
    Shield,
    User,
    Anchor,
    Pause,
    Play,
    CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RecoveryWellbeingProps {
    onComplete: () => void;
    onExit: () => void;
}

export const RecoveryWellbeing: React.FC<RecoveryWellbeingProps> = ({ onComplete, onExit }) => {
    const [activeTab, setActiveTab] = useState<'theory' | 'exercises'>('theory');
    const [activeExercise, setActiveExercise] = useState<string | null>(null);

    return (
        <div className="min-h-full p-6 md:p-12 max-w-5xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-slate-400 hover:text-slate-900 gap-2">
                    <ArrowLeft className="w-4 h-4" /> Keskeytä
                </Button>
                <div className="flex items-center gap-2 text-rose-500 bg-rose-50 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider">
                    <Heart className="w-4 h-4" /> Toipuminen & Hyvinvointi
                </div>
            </div>

            <div className="space-y-4 text-center pb-6">
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
                    Hermoston <span className="text-rose-500">Rauhoittaminen</span>
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                    “Sinussa ei ole vikaa – hermostosi on tehnyt juuri sen, mihin se on tarkoitettu.”
                </p>
                <div className="flex justify-center gap-4 mt-4">
                    <Button
                        onClick={() => setActiveTab('theory')}
                        variant={activeTab === 'theory' ? 'default' : 'outline'}
                        className={cn("rounded-full px-6", activeTab === 'theory' ? "bg-slate-900" : "text-slate-500")}
                    >
                        <BookOpen className="w-4 h-4 mr-2" /> Tieto & Ymmärrys
                    </Button>
                    <Button
                        onClick={() => setActiveTab('exercises')}
                        variant={activeTab === 'exercises' ? 'default' : 'outline'}
                        className={cn("rounded-full px-6", activeTab === 'exercises' ? "bg-rose-500 hover:bg-rose-600 text-white" : "text-slate-500")}
                    >
                        <PlayCircle className="w-4 h-4 mr-2" /> Harjoitteet
                    </Button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'theory' ? (
                    <TheorySection key="theory" onNext={() => setActiveTab('exercises')} />
                ) : (
                    <ExercisesSection key="exercises" activeExercise={activeExercise} setActiveExercise={setActiveExercise} onComplete={onComplete} />
                )}
            </AnimatePresence>
        </div>
    );
};

// --- THEORY SECTION ---

const TheorySection = ({ onNext }: { onNext: () => void }) => {
    const cards = [
        {
            title: "1. Keho elää uhkatilassa",
            icon: Shield,
            content: (
                <div className="space-y-4 text-slate-700">
                    <p>
                        Työpaikkakiusaaminen ei ole "vain paha kokemus". Se on psykologinen trauma, joka aktivoi kehon uhkajärjestelmän.
                        Kun kiusaaminen on toistuvaa ja ennakoimatonta, hermosto jää "päälle".
                    </p>
                    <ul className="list-disc pl-5 space-y-1 marker:text-rose-500">
                        <li>Jatkuva varuillaan olo (hypervigilanssi)</li>
                        <li>Univaikeudet ja uupumus</li>
                        <li>Vaikeus tehdä päätöksiä (prefrontaalinen aivokuori sammuu)</li>
                    </ul>
                    <p className="font-medium text-rose-800 bg-rose-50 p-3 rounded-lg border-l-4 border-rose-400">
                        Tämä ei ole heikkoutta. Se on autonomisen hermoston normaali reaktio epänormaaliin tilanteeseen.
                    </p>
                </div>
            )
        },
        {
            title: "2. Miksi järki ei riitä?",
            icon: Brain,
            content: (
                <div className="space-y-4 text-slate-700">
                    <p>
                        "Miksi en vain ajattele positiivisesti?" Koska traumatisoituneessa tilassa <strong>turvallisuuden tunne puuttuu</strong>.
                        Polyvagaalisen teorian mukaan sosiaalinen uhka (nöyryytys, ulossulkeminen) on hermostolle yhtä todellinen kuin fyysinen uhka.
                    </p>
                    <p>
                        Toipuminen alkaa kehosta. Ensin pitää palauttaa turva, vasta sitten mieli voi rauhoittua.
                    </p>
                </div>
            )
        },
        {
            title: "3. Häpeän purkaminen",
            icon: User,
            content: (
                <div className="space-y-4 text-slate-700">
                    <p>
                        Moni kantaa mukanaan toksista häpeää: <em>"Miksi en puolustanut itseäni?"</em>
                    </p>
                    <p>
                        Vastaus on biologiassa: Uhkatilassa toimintakyky kapenee. Et voinut valita vapaasti.
                        Itsesyytöksestä luopuminen on tärkein askel toipumisessa.
                    </p>
                </div>
            )
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-8 pb-12"
        >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, i) => (
                    <Card key={i} className="p-6 border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-600">
                            <card.icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-xl text-slate-900 mb-4">{card.title}</h3>
                        {card.content}
                    </Card>
                ))}
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-3xl text-center space-y-6 max-w-3xl mx-auto shadow-2xl">
                <h3 className="text-2xl font-bold">Oletko valmis kokeilemaan?</h3>
                <p className="text-slate-300">
                    Tutkimusten mukaan yksinkertaiset keholliset harjoitteet ovat tehokkain tapa viestiä hermostolle:
                    "Olet turvassa."
                </p>
                <Button onClick={onNext} className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8 py-6 text-lg font-bold">
                    Siirry harjoitteisiin <PlayCircle className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </motion.div>
    );
};

// --- EXERCISES SECTION ---

const ExercisesSection = ({
    activeExercise,
    setActiveExercise,
    onComplete
}: {
    activeExercise: string | null,
    setActiveExercise: (id: string | null) => void,
    onComplete: () => void
}) => {

    const exercises = [
        {
            id: 'anchor',
            title: "Turvallisuuden ankkurointi",
            duration: "5 min",
            icon: Anchor,
            steps: [
                "Istu tai seiso asennossa, jossa tunnet olosi mahdollisimman mukavaksi.",
                "Tuo huomio jalkoihin. Tunne lattia jalkojesi alla.",
                "Anna hartioiden laskeutua hieman.",
                "Hengitä rauhallisesti sisään nenän kautta...",
                "...ja hitaasti ulos suun kautta.",
                "Sano mielessäsi: 'Juuri nyt olen tässä. Tässä hetkessä olen turvassa.'"
            ]
        },
        {
            id: 'breath',
            title: "Rauhoittava hengitys",
            duration: "5 min",
            icon: Wind,
            steps: [
                "Hengitä sisään rauhallisesti neljään laskien (1-2-3-4).",
                "Pidätä hetki.",
                "Hengitä ulos hitaasti kuuteen laskien (1-2-3-4-5-6).",
                "Toista tämä 6-10 kertaa.",
                "Tärkeintä on, että uloshengitys on hieman pidempi kuin sisäänhengitys."
            ]
        },
        {
            id: 'shame',
            title: "Häpeän pehmentäminen",
            duration: "6 min",
            icon: Heart,
            steps: [
                "Tuo mieleesi tunne, jossa koet riittämättömyyttä.",
                "Aseta käsi rinnan tai vatsan päälle lämpimästi.",
                "Sano mielessäsi myötätuntoisesti: 'Reagoin kuten pystyin.'",
                "Tai: 'Tämä ei ollut minun vikani.'",
                "Tunne käden lämpö ja hyväksy itsesi tässä hetkessä."
            ]
        },
        {
            id: 'body',
            title: "Kehon kuuntelu",
            duration: "7 min",
            icon: User,
            steps: [
                "Sulje silmät tai pidä katse pehmeänä.",
                "Kysy hiljaa: 'Miltä kehossani tuntuu juuri nyt?'",
                "Älä yritä muuttaa mitään. Vain huomaa.",
                "Lämpö... kireys... syke... paino...",
                "Anna kaikkien tuntemusten olla. Ne ovat viestejä, eivät virheitä."
            ]
        },
        {
            id: 'boundaries',
            title: "Rajojen palauttaminen",
            duration: "8 min",
            icon: Shield,
            steps: [
                "Kuvittele kehosi ympärille oma, näkymätön tila.",
                "Huomaa, kuinka paljon tilaa tarvitset juuri nyt.",
                "Hengitä ja tunne ihosi rajana maailmaan.",
                "Sano mielessäsi vahvasti: 'Minulla on oikeus omaan tilaani.'",
                "Tämä tila on vain sinua varten."
            ]
        },
        {
            id: 'decision',
            title: "Turvallinen päätöshetki",
            duration: "3 min",
            icon: CheckCircle2,
            steps: [
                "Katso ympärillesi. Nimeä kolme asiaa, jotka näet.",
                "Kuuntele kahta ääntä tilassa.",
                "Liikuta kehoa kevyesti. Venytä.",
                "Sano: 'Harjoitus on ohi. Olen tässä hetkessä.'",
                "Kiitä itseäsi tästä hetkestä."
            ]
        }
    ];

    const currentExercise = exercises.find(e => e.id === activeExercise);

    // Timer Logic for active exercise (simplified for UI demo)
    const [stepIndex, setStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleStartExercise = (id: string) => {
        setActiveExercise(id);
        setStepIndex(0);
        setIsPlaying(true);
    };

    const handleNextStep = () => {
        if (currentExercise && stepIndex < currentExercise.steps.length - 1) {
            setStepIndex(prev => prev + 1);
        } else {
            setIsPlaying(false);
            onComplete(); // Mark module as complete after one exercise
        }
    };

    return (
        <div className="grid md:grid-cols-3 gap-6 h-[600px]">
            {/* List */}
            <div className="space-y-4 overflow-y-auto pr-2">
                {exercises.map((ex) => (
                    <button
                        key={ex.id}
                        onClick={() => handleStartExercise(ex.id)}
                        className={cn(
                            "w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4",
                            activeExercise === ex.id
                                ? "bg-rose-50 border-rose-500 shadow-md ring-1 ring-rose-200"
                                : "bg-white border-slate-200 hover:border-rose-300 hover:bg-slate-50"
                        )}
                    >
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", activeExercise === ex.id ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-500")}>
                            <ex.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className={cn("font-bold", activeExercise === ex.id ? "text-rose-900" : "text-slate-900")}>{ex.title}</h4>
                            <span className="text-xs text-slate-500 font-medium">{ex.duration}</span>
                        </div>
                        {activeExercise === ex.id && <PlayCircle className="ml-auto w-5 h-5 text-rose-500 animate-pulse" />}
                    </button>
                ))}
            </div>

            {/* Player Area */}
            <Card className="md:col-span-2 border-slate-200 shadow-xl overflow-hidden relative flex flex-col">
                {currentExercise ? (
                    <motion.div
                        key={currentExercise.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 flex flex-col p-8 md:p-12 items-center justify-center text-center space-y-8 bg-gradient-to-br from-rose-50/50 to-white"
                    >
                        <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                            <currentExercise.icon className="w-10 h-10 text-rose-500" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{currentExercise.title}</h3>
                            <p className="text-rose-500 font-medium uppercase tracking-widest text-xs">Vaihe {stepIndex + 1} / {currentExercise.steps.length}</p>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.p
                                key={stepIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-xl md:text-2xl text-slate-700 font-serif italic leading-relaxed max-w-lg"
                            >
                                "{currentExercise.steps[stepIndex]}"
                            </motion.p>
                        </AnimatePresence>

                        <div className="pt-8">
                            <Button
                                onClick={handleNextStep}
                                className="rounded-full px-10 py-6 text-lg bg-slate-900 hover:bg-slate-800 shadow-lg"
                            >
                                {stepIndex < currentExercise.steps.length - 1 ? "Seuraava vaihe" : "Päätä harjoitus"}
                            </Button>
                        </div>

                    </motion.div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
                        <Heart className="w-16 h-16 opacity-20" />
                        <p>Valitse harjoitus vasemmalta aloittaaksesi.</p>
                    </div>
                )}
            </Card>
        </div>
    );
};
