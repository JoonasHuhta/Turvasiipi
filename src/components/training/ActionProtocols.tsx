"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Shield,
    MessageSquare,
    FileText,
    ArrowRight,
    ArrowLeft,
    Zap,
    UserX,
    Lock,
    CheckCircle2,
    AlertTriangle,
    Save
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionProtocolsProps {
    onComplete: () => void;
    onExit: () => void;
}

export const ActionProtocols: React.FC<ActionProtocolsProps> = ({ onComplete, onExit }) => {
    const [activeTab, setActiveTab] = useState("acute");

    return (
        <div className="min-h-full p-6 md:p-12 max-w-5xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-slate-400 hover:text-slate-900 gap-2">
                    <ArrowLeft className="w-4 h-4" /> Keskeytä
                </Button>
                <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider">
                    <Shield className="w-4 h-4" /> Konkreettiset Toimintamallit
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
                    Työkalupakki <span className="text-indigo-600">Reagointiin</span>
                </h1>
                <p className="text-slate-600 max-w-2xl">
                    Älä jäädy tilanteessa. Tässä on valmiit sanat ja suunnitelmat, jotta tiedät tasan mitä tehdä.
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-slate-100 rounded-xl">
                    <TabsTrigger value="acute" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Zap className="w-4 h-4 mr-2" /> Akuutit Skriptit
                    </TabsTrigger>
                    <TabsTrigger value="conversation" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <MessageSquare className="w-4 h-4 mr-2" /> Vaikea Keskustelu
                    </TabsTrigger>
                    <TabsTrigger value="manager" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <UserX className="w-4 h-4 mr-2" /> Esimies-Ketju
                    </TabsTrigger>
                    <TabsTrigger value="safety-plan" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Lock className="w-4 h-4 mr-2" /> Turvasuunnitelma
                    </TabsTrigger>
                </TabsList>

                {/* 1. ACUTE SCRIPTS */}
                <TabsContent value="acute" className="space-y-6 outline-none">
                    <AcuteScripts />
                </TabsContent>

                {/* 2. DIFFICULT CONVERSATION */}
                <TabsContent value="conversation" className="space-y-6 outline-none">
                    <DifficultConversation />
                </TabsContent>

                {/* 3. MANAGER CHAIN */}
                <TabsContent value="manager" className="space-y-6 outline-none">
                    <ManagerChain />
                </TabsContent>

                {/* 4. SAFETY PLAN */}
                <TabsContent value="safety-plan" className="space-y-6 outline-none">
                    <SafetyPlanBuilder onComplete={onComplete} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const AcuteScripts = () => {
    const scripts = [
        {
            title: "Julkinen naljailu",
            icon: MessageSquare,
            script: "En pidä tästä kommentista. Lopeta heti.",
            nuance: "Sano rauhallisella, matalalla äänellä. Älä hymyile. Katso silmiin.",
            next: "Kirjaa ylös: Kuka sanoi, mitä, milloin (kellonaika)."
        },
        {
            title: "Tiedon panttaus",
            icon: FileText,
            script: "Tarvitsen tämän tiedon työhöni. Lähetä nyt.",
            nuance: "Älä pyydä 'voisitko'. Totea tarve. Lisää viestiin CC luottamushenkilölle jos toistuu.",
            next: "Ota kuvakaappaus pyynnöstäsi. Jos ei vastausta, lähetä muistutus."
        },
        {
            title: "Eristäminen",
            icon: UserX,
            script: "Miksi minua ei kutsuttu? Lisää minut jatkossa.",
            nuance: "Kysy suoraan palaverissa tai ryhmächatissa. Tee näkymättömästä näkyvää.",
            next: "Kysy tiimiltä tukea: 'Huomasitteko että olin poissa?'"
        }
    ];

    return (
        <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-3 bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-3xl font-black text-indigo-600">3</span>
                </div>
                <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-xl font-bold text-indigo-900 uppercase">Stop - Puhu - Dokumentoi</h3>
                    <p className="text-indigo-700">
                        Kolme askelta kaaoksen hallintaan. <br />
                        1. <strong>Stop:</strong> Pysäytä reaktiosi (hengitä). <br />
                        2. <strong>Puhu:</strong> Sano skripti (rajanveto). <br />
                        3. <strong>Dokumentoi:</strong> Kirjaa ylös heti kun pääset turvaan.
                    </p>
                </div>
            </div>

            {scripts.map((s, i) => (
                <Card key={i} className="p-6 border-slate-200 hover:border-indigo-300 transition-colors group">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 mb-4 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                        <s.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-4">{s.title}</h3>
                    <div className="bg-slate-900 text-white p-4 rounded-xl relative mb-4">
                        <div className="absolute -top-3 left-4 bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Sano näin</div>
                        <p className="font-medium italic">"{s.script}"</p>
                    </div>
                    <div className="space-y-3 text-sm">
                        <p className="text-slate-600"><strong className="text-slate-900">Tyyli:</strong> {s.nuance}</p>
                        <p className="text-slate-600"><strong className="text-slate-900">Seuraava askel:</strong> {s.next}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
};

const DifficultConversation = () => {
    const [step, setStep] = useState(0);
    const steps = [
        {
            title: "1. Avaus",
            script: "Kiitos että tulit. Haluan keskustella meidän välisestä vuorovaikutuksesta. Tämä on tärkeää työni kannalta.",
            tip: "Rajaa aihe neutraalisti. Älä syytä, kutsu keskusteluun."
        },
        {
            title: "2. Konkreettinen esimerkki",
            script: "Viime tiistain kokouksessa sanoit julkisesti 'Et tajua tästä mitään'. Koen tämän mitätöivänä. Miltä sinusta kuulostaa?",
            tip: "Kerro fakta (mitä tapahtui) ja vaikutus (miltä tuntui). Lopeta avoimeen kysymykseen."
        },
        {
            title: "3. Rajaus",
            script: "Jatkossa odotan naljailun loppuvan. Työni hoituu parhaiten ilman sitä. Oletko samaa mieltä?",
            tip: "Esitä selkeä vaatimus. Älä pyydä lupaa, vaan sitoutumista."
        },
        {
            title: "4. Seuranta ja tuki",
            script: "Miten varmistamme, että tämä ei toistu? Tarvitsenko sinulta jotain tietoa työhöni?",
            tip: "Siirrä vastuu ratkaisusta yhteiseksi. 'Miten me onnistumme tässä?'"
        },
        {
            title: "5. Päätös ja dokumentointi",
            script: "Kiitos keskustelusta. Kirjaan tämän muistioon. Onko sinulla lisättävää?",
            tip: "Tee tilanteesta virallinen. Lähetä muistio sähköpostilla (CC luottamusmies)."
        }
    ];

    return (
        <Card className="p-8 max-w-2xl mx-auto border-slate-200">
            <h2 className="text-2xl font-black uppercase text-slate-900 mb-2">Vaikean keskustelun kaava</h2>
            <p className="text-slate-500 mb-8">
                Käytä tätä 5-vaiheista runkoa yksityiskeskustelussa.
            </p>

            <div className="space-y-8">
                {steps.map((s, i) => (
                    <div key={i} className={cn("flex gap-4 transition-opacity duration-500", i === step ? "opacity-100" : "opacity-40 grayscale")}>
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0",
                            i === step ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-slate-100 text-slate-400"
                        )}>
                            {i + 1}
                        </div>
                        <div className="flex-1 space-y-2 pt-1">
                            <h3 className="font-bold text-slate-900">{s.title}</h3>
                            <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-indigo-400">
                                <p className="font-medium text-slate-800 italic">"{s.script}"</p>
                            </div>
                            <p className="text-sm text-slate-500 flex items-center gap-2">
                                <Zap className="w-3 h-3" /> {s.tip}
                            </p>
                            {i === step && i < steps.length - 1 && (
                                <Button onClick={() => setStep(i + 1)} size="sm" className="mt-2 bg-slate-900 text-white rounded-full">
                                    Seuraava vaihe
                                </Button>
                            )}
                            {i === step && i === steps.length - 1 && (
                                <Button onClick={() => setStep(0)} variant="outline" size="sm" className="mt-2 rounded-full">
                                    Aloita alusta
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const ManagerChain = () => {
    return (
        <div className="space-y-8">
            <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-rose-900 uppercase mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" /> Esimies on kiusaaja?
                </h3>
                <p className="text-rose-800 text-sm">
                    Kun valta-asemaa käytetään väärin, sinun on suojeltava itseäsi byrokratialla.
                    Älä jää odottamaan. Dokumentoi kaikki.
                </p>
            </div>

            <div className="relative border-l-2 border-slate-200 ml-6 space-y-12">
                {[
                    {
                        step: "1. Puheeksiotto",
                        target: "Esimies (kahden kesken)",
                        script: "Koen [toiminnan] epäasiallisena. Pyydän lopettamaan.",
                        time: "Heti"
                    },
                    {
                        step: "2. Kirjallinen ilmoitus",
                        target: "Yliesimies",
                        script: "Ilmoitan [Kiistattomat faktat]. Tarvitsen selvityksen.",
                        time: "1-2 vrk"
                    },
                    {
                        step: "3. Avunpyyntö",
                        target: "Työsuojeluvaltuutettu / Liitto",
                        script: "Tarvitsen apua tilanteen selvitykseen. Liite: dokumentaatio.",
                        time: "Heti kun vaihe 2 ei toimi"
                    },
                    {
                        step: "4. Terveyslausunto",
                        target: "Työterveys",
                        script: "Kiusaaminen aiheuttaa oireita. Pyydän lausunnon työkyvystä.",
                        time: "1 viikko"
                    },
                    {
                        step: "5. Valvontapyyntö",
                        target: "AVI (Aluehallintovirasto)",
                        script: "Työnantaja ei ole ryhtynyt toimiin ilmoituksesta huolimatta.",
                        time: "2 viikkoa hiljaisuutta"
                    },
                ].map((item, i) => (
                    <div key={i} className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-4 border-white shadow-sm" />
                        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-slate-900">{item.step}</h3>
                                <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase tracking-wider">{item.time}</span>
                            </div>
                            <p className="text-sm text-slate-500 mb-3">Kohde: <span className="font-medium text-indigo-600">{item.target}</span></p>
                            <div className="bg-slate-50 p-3 rounded border-l-2 border-slate-400 text-sm italic text-slate-700">
                                "{item.script}"
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SafetyPlanBuilder = ({ onComplete }: { onComplete: () => void }) => {
    const [plan, setPlan] = useState({
        reaction: '',
        support: '',
        phrase: 'Käytän nyt turvasuunnitelmaani – tarvitsen apua.',
        exit: '',
        place: ''
    });

    return (
        <Card className="p-8 max-w-2xl mx-auto border-slate-200">
            <h2 className="text-2xl font-black uppercase text-slate-900 mb-2">Oma Turvasuunnitelma</h2>
            <p className="text-slate-500 mb-8">
                Täytä tämä ja tallenna kuvakaappauksena puhelimeesi.
            </p>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase text-slate-700">1. Ensimmäinen turvareaktio</label>
                    <input
                        type="text"
                        placeholder="Esim. Poistun paikalta 5 minuutiksi."
                        className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={plan.reaction}
                        onChange={e => setPlan({ ...plan, reaction: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase text-slate-700">2. Luotettava tuki</label>
                    <input
                        type="text"
                        placeholder="Nimi ja puhelinnumero."
                        className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={plan.support}
                        onChange={e => setPlan({ ...plan, support: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase text-slate-700">3. Hätäfraasi esimiehelle</label>
                    <div className="w-full p-3 bg-indigo-50 rounded-lg border border-indigo-200 text-indigo-900 font-medium">
                        "{plan.phrase}"
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase text-slate-700">4. Exit-signaali</label>
                    <input
                        type="text"
                        placeholder="Esim. Jos ei muutosta 3 viikossa -> Sairasloma."
                        className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={plan.exit}
                        onChange={e => setPlan({ ...plan, exit: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase text-slate-700">5. Turvapaikka</label>
                    <input
                        type="text"
                        placeholder="Esim. Kahvila lounaalla / Etätyö."
                        className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={plan.place}
                        onChange={e => setPlan({ ...plan, place: e.target.value })}
                    />
                </div>

                <div className="pt-6">
                    <Button onClick={onComplete} className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold uppercase tracking-widest text-lg shadow-xl">
                        <Save className="w-5 h-5 mr-3" /> Tallenna suunnitelma
                    </Button>
                    <p className="text-xs text-center text-slate-400 mt-3">
                        Tiedot eivät tallennu palvelimelle tietoturvasyistä. Ota kuvakaappaus tästä näkymästä.
                    </p>
                </div>
            </div>
        </Card>
    );
};
