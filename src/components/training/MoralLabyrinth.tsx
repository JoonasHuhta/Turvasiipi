"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Fingerprint,
    ArrowLeft,
    Scale,
    Users,
    Briefcase,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    ArrowRight,
    ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MoralLabyrinthProps {
    onComplete: () => void;
    onExit: () => void;
}

type ProfileType = 'idealist' | 'pragmatist' | 'protector' | 'survivor';

export const MoralLabyrinth: React.FC<MoralLabyrinthProps> = ({ onComplete, onExit }) => {
    const [step, setStep] = useState(0);
    const [choices, setChoices] = useState<string[]>([]);
    const [profile, setProfile] = useState<ProfileType | null>(null);

    // Simplistic scoring system for demonstration
    // In a real app, this would be more complex
    const calculateProfile = (choices: string[]): ProfileType => {
        const counts = { idealist: 0, pragmatist: 0, protector: 0, survivor: 0 };

        choices.forEach(c => {
            if (c.includes('idealist')) counts.idealist++;
            if (c.includes('pragmatist')) counts.pragmatist++;
            if (c.includes('protector')) counts.protector++;
            if (c.includes('survivor')) counts.survivor++;
        });

        // Find max
        let max = 0;
        let result: ProfileType = 'pragmatist'; // default

        (Object.keys(counts) as ProfileType[]).forEach(key => {
            if (counts[key] > max) {
                max = counts[key];
                result = key;
            }
        });

        return result;
    };

    const handleChoice = (choiceId: string) => {
        const newChoices = [...choices, choiceId];
        setChoices(newChoices);

        if (step < storySteps.length - 1) {
            setStep(prev => prev + 1);
        } else {
            setProfile(calculateProfile(newChoices));
            setStep(prev => prev + 1); // Move to results
        }
    };

    const storySteps = [
        {
            title: "Tähtisuorittajan Varjo",
            text: "Olet markkinointitiimin asiantuntija. Tiiminne 'Tähtisuorittaja', Alex, tuo taloon valtavasti rahaa, mutta hänellä on tapana nolata uusi harjoittelija, Eeva, kokouksissa hienovaraisilla piikeillä. Tänään Alex sanoi Eevalle: 'Ehkä tämä ala ei vaan ole sinua varten', ja Eeva poistui itkien.",
            question: "Mitä teet tilanteessa?",
            options: [
                { id: '1_idealist', text: "Puutun heti ja julkisesti: 'Alex, tuo oli asiatonta.'", type: 'idealist' },
                { id: '1_pragmatist', text: "Odotan kokouksen loppuun ja puhun Alexille kahden kesken.", type: 'pragmatist' },
                { id: '1_protector', text: "Lähden Eevan perään lohduttamaan häntä.", type: 'protector' },
                { id: '1_survivor', text: "Pysyn hiljaa. Alex on liian vaikutusvaltainen vastustettavaksi.", type: 'survivor' }
            ]
        },
        {
            title: "Johdon Paine",
            text: "Alex sai kuulla, että Eevan itku herätti huomiota. Esimiehesi kutsuu sinut toimistoon. 'Alex on meille elintärkeä juuri nyt. Eeva on... herkkä. Toivon, että tuet tiimin yhtenäisyyttä etkä levitä juttuja.'",
            question: "Miten vastaat?",
            options: [
                { id: '2_survivor', text: "Ymmärrän. Keskityn vain töihini.", type: 'survivor' },
                { id: '2_idealist', text: "En voi hyväksyä kiusaamista, riippumatta tuloksesta.", type: 'idealist' },
                { id: '2_pragmatist', text: "Ymmärrän paineen, mutta Eevan tukeminen auttaa myös tulosta pitkässä juoksussa.", type: 'pragmatist' },
                { id: '2_protector', text: "Jos Eeva lähtee tämän takia, kerron kaikille miksi.", type: 'protector' }
            ]
        },
        {
            title: "Eskalaatio",
            text: "Viikko myöhemmin Eeva on sairaslomalla. Alex vitsailee kahvihuoneessa: 'Heikot sortuu elon tiellä'. Muut nauravat vaivautuneesti.",
            question: "Tämä on ratkaiseva hetki. Mitä teet?",
            options: [
                { id: '3_protector', text: "Otan yhteyttä työsuojeluvaltuutettuun Eevan puolesta.", type: 'protector' },
                { id: '3_survivor', text: "Naurahdan mukana välttääkseni konfliktin.", type: 'survivor' },
                { id: '3_idealist', text: "Sanon ääneen: 'Tuo ei ole hauskaa, se on julmaa.'", type: 'idealist' },
                { id: '3_pragmatist', text: "Ehdotan tiimipalaveria pelisäännöistä ilman nimiä.", type: 'pragmatist' }
            ]
        }
    ];

    const profiles = {
        idealist: {
            title: "Idealisti",
            description: "Asetat oikeudenmukaisuuden kaiken edelle. Olet rohkea, mutta saatat joutua konflikteihin, jotka vaarantavat oman asemasi.",
            icon: Scale,
            color: "text-indigo-500",
            advice: "Rohkeutesi on ihailtavaa. Muista kuitenkin valita taistelusi, jotta et pala loppuun."
        },
        pragmatist: {
            title: "Pragmaatikko",
            description: "Etsit ratkaisuja, jotka toimivat käytännössä. Yrität tasapainotella tuloksen ja ihmisten välillä.",
            icon: Briefcase,
            color: "text-emerald-500",
            advice: "Diplomaattisuutesi on voimavara. Varo kuitenkin, ettet tee liikaa kompromisseja arvojesi kustannuksella."
        },
        protector: {
            title: "Suojelija",
            description: "Puolustat heikompia suurella sydämellä. Olet empaattinen ja lojaali.",
            icon: Users,
            color: "text-rose-500",
            advice: "Empatiasi on supervoima. Muista asettaa rajat myös itsesi suojelemiseksi."
        },
        survivor: {
            title: "Selviytyjä",
            description: "Keskityt oman turvallisuutesi takaamiseen. Vältät riskejä ja konflikteja.",
            icon: ShieldAlert,
            color: "text-slate-500",
            advice: "Suojautuminen on inhimillistä. Mieti kuitenkin, mikä on vaikenemisen hinta pitkällä aikavälillä."
        }
    };

    return (
        <div className="min-h-full p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-slate-400 hover:text-slate-900 gap-2">
                    <ArrowLeft className="w-4 h-4" /> Keskeytä
                </Button>
                <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-xs">
                    <Fingerprint className="w-4 h-4" /> Moraalinen Labyrintti
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step < storySteps.length ? (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8 mt-8"
                    >
                        <div className="w-full bg-slate-100 h-2 rounded-full mb-8">
                            <div className="h-full bg-indigo-600 transition-all duration-500 rounded-full" style={{ width: `${((step) / storySteps.length) * 100}%` }} />
                        </div>

                        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Fingerprint className="w-64 h-64" />
                            </div>
                            <h2 className="text-2xl font-black uppercase text-slate-900 mb-4 relative z-10">{storySteps[step].title}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8 relative z-10">
                                {storySteps[step].text}
                            </p>

                            <h3 className="font-bold text-indigo-600 uppercase tracking-widest text-sm mb-4 relative z-10">{storySteps[step].question}</h3>

                            <div className="grid gap-4 relative z-10">
                                {storySteps[step].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleChoice(opt.id)}
                                        className="text-left p-4 rounded-xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all font-medium text-slate-700 hover:text-indigo-900"
                                    >
                                        {opt.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : profile && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-8 text-center space-y-8"
                    >
                        <ProfilesView profile={profile} data={profiles[profile]} onComplete={onComplete} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ProfilesView = ({ profile, data, onComplete }: { profile: ProfileType, data: any, onComplete: () => void }) => {
    return (
        <Card className="p-12 border-slate-200 shadow-2xl overflow-hidden relative">
            <div className={cn("absolute top-0 left-0 w-full h-2",
                profile === 'idealist' ? "bg-indigo-500" :
                    profile === 'pragmatist' ? "bg-emerald-500" :
                        profile === 'protector' ? "bg-rose-500" : "bg-slate-500"
            )} />

            <div className={cn("w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6",
                profile === 'idealist' ? "bg-indigo-100 text-indigo-600" :
                    profile === 'pragmatist' ? "bg-emerald-100 text-emerald-600" :
                        profile === 'protector' ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-600"
            )}>
                <data.icon className="w-12 h-12" />
            </div>

            <h2 className="text-4xl font-black uppercase text-slate-900 mb-2">{data.title}</h2>
            <p className="text-xl text-slate-600 max-w-xl mx-auto mb-8 font-light">
                "{data.description}"
            </p>

            <div className="bg-slate-50 p-6 rounded-2xl max-w-lg mx-auto mb-8">
                <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-2">Suojasiiven analyysi</h4>
                <p className="text-slate-700 italic">{data.advice}</p>
            </div>

            <Button onClick={onComplete} className="rounded-full px-12 py-6 bg-slate-900 text-white font-bold text-lg shadow-xl hover:bg-slate-800">
                Palaa valikkoon <ArrowRight className="ml-2" />
            </Button>
        </Card>
    );
};
