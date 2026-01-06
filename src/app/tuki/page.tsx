"use client";

import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Lock, Server, Mail, HeartHandshake, Phone, Wind, BrainCircuit, Activity, AlertTriangle, BookOpen, Scale, Landmark, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function SupportPage() {
    return (
        <div className="space-y-8 pb-20 animate-in fade-in max-w-5xl mx-auto pt-8 px-4">

            <div className="text-center space-y-4 mb-8">
                <div className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    Resurssipankki
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Tuki ja Toipuminen</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Konkreettisia ohjeita, harjoituksia ja toimintamalleja jaksamisen tueksi.
                </p>
            </div>

            <Tabs defaultValue="plan" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-slate-100 rounded-2xl mb-8 gap-1">
                    <TabsTrigger value="plan" className="rounded-xl py-3 text-sm md:text-md font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500">
                        Toimintasuunnitelma
                    </TabsTrigger>
                    <TabsTrigger value="exercises" className="rounded-xl py-3 text-sm md:text-md font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500">
                        Harjoitukset
                    </TabsTrigger>
                    <TabsTrigger value="contacts" className="rounded-xl py-3 text-sm md:text-md font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500">
                        Yhteystiedot
                    </TabsTrigger>
                </TabsList>

                {/* --- TAB 1: TOIMINTASUUNNITELMA --- */}
                <TabsContent value="plan" className="space-y-6">
                    {/* VAIHE 1 */}
                    <Card className="border-l-4 border-l-yellow-400">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-yellow-600 font-bold text-xs uppercase tracking-widest mb-1">
                                <AlertTriangle className="w-4 h-4" /> Vaihe 1
                            </div>
                            <CardTitle>Kiusaaminen on juuri alkanut tai epäilyttää</CardTitle>
                            <CardDescription>Kun huomaat ensimmäiset merkit, toimi heti.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="p1-1">
                                    <AccordionTrigger>1. Tunnista tilanne</AccordionTrigger>
                                    <AccordionContent>
                                        Onko kyseessä toistuva epäasiallinen kohtelu? Tee etusivun testi varmistukseksi. Kirjaa ylös konkreettiset esimerkit.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="p1-2">
                                    <AccordionTrigger className="font-bold text-indigo-600">2. Aloita dokumentointi HETI</AccordionTrigger>
                                    <AccordionContent>
                                        Älä odota, että "tilanne menee ohi". Aloita lokikirjan pitäminen heti (Timeline-työkalu). Ilman dokumentaatiota sana on sanaa vastaan.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="p1-3">
                                    <AccordionTrigger>3. Kenelle puhua?</AccordionTrigger>
                                    <AccordionContent>
                                        Puhu ensin luotettavalle kollegalle tai ystävälle. Älä jää yksin asian kanssa.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>

                    {/* VAIHE 2 */}
                    <Card className="border-l-4 border-l-orange-500">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-1">
                                <AlertTriangle className="w-4 h-4" /> Vaihe 2
                            </div>
                            <CardTitle>Tilanne on jatkunut pidempään</CardTitle>
                            <CardDescription>Kun epäviralliset keinot eivät riitä, tarvitaan virallisia toimia.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="p2-1">
                                    <AccordionTrigger>1. Ota yhteys työsuojeluvaltuutettuun</AccordionTrigger>
                                    <AccordionContent>
                                        Hän on työntekijöiden edustaja, joka tuntee lait ja prosessit. Keskustelu on luottamuksellinen. Pyydä häntä mukaan tapaamisiin tueksi.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="p2-2">
                                    <AccordionTrigger>2. Tee kirjallinen ilmoitus työnantajalle</AccordionTrigger>
                                    <AccordionContent>
                                        Työnantajalla on lakisääteinen velvollisuus puuttua häirintään, kun he saavat siitä tiedon. Tee ilmoitus kirjallisesti (sähköposti), jotta siitä jää jälki.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="p2-3">
                                    <AccordionTrigger>3. Työsuojeluviranomainen (AVI)</AccordionTrigger>
                                    <AccordionContent>
                                        Jos työnantaja ei puutu asiaan, voit olla yhteydessä Aluehallintovirastoon (AVI).
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>

                    {/* VAIHE 3 */}
                    <Card className="border-l-4 border-l-emerald-500">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-1">
                                <HeartHandshake className="w-4 h-4" /> Vaihe 3
                            </div>
                            <CardTitle>Olen saiauslomalla uupumuksen vuoksi</CardTitle>
                            <CardDescription>Toipuminen on nyt tärkein työsi.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="p3-1">
                                    <AccordionTrigger>Viikot 1-2: Kriisivaihe (Lepo)</AccordionTrigger>
                                    <AccordionContent>
                                        Nuku, syö, ulkoile. Älä mieti työasioita. Poista työsähköposti puhelimesta. Olet turvassa.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="p3-2">
                                    <AccordionTrigger>Viikot 3-8: Käsittelyvaihe</AccordionTrigger>
                                    <AccordionContent>
                                        Aloita asian käsittely ammattilaisen (työterveyspsykologi, terapeutti) kanssa. Käytä Turvasiipi-raporttia apuna.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- TAB 2: HARJOITUKSET --- */}
                <TabsContent value="exercises" className="grid gap-8 md:grid-cols-2">

                    {/* HENGITYS */}
                    <Card className="md:col-span-2 border-indigo-100 bg-indigo-50/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-indigo-800">
                                <Wind className="w-6 h-6" /> Stressinhallinta: 5-5-5 Hengitys
                            </CardTitle>
                            <CardDescription>Aktivoi parasympaattinen hermosto ja rauhoita akuutti ahdistus.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <BreathingExercise555 />
                        </CardContent>
                    </Card>

                    {/* MAADOITUS */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Maadoitustekniikka 5-4-3-2-1</CardTitle>
                            <CardDescription>Kun paniikki iskee, palauta itsesi hetkeen.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-slate-700">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3"><span className="text-xl">👀</span> <strong>5</strong> asiaa jotka näet</li>
                                <li className="flex items-center gap-3"><span className="text-xl">✋</span> <strong>4</strong> asiaa johon kosketat</li>
                                <li className="flex items-center gap-3"><span className="text-xl">👂</span> <strong>3</strong> asiaa jotka kuulet</li>
                                <li className="flex items-center gap-3"><span className="text-xl">👃</span> <strong>2</strong> asiaa jotka haistat</li>
                                <li className="flex items-center gap-3"><span className="text-xl">👄</span> <strong>1</strong> asia jonka maistat</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* RAJAT */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Rajojen asettaminen</CardTitle>
                            <CardDescription>Opettele sanomaan nämä ääneen.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <QuoteBox>"En hyväksy tällaista puhetta."</QuoteBox>
                            <QuoteBox>"Pyydän että puhut minulle asiallisesti."</QuoteBox>
                            <QuoteBox>"En jatka keskustelua, jos se jatkuu tällaisena."</QuoteBox>
                        </CardContent>
                    </Card>

                    {/* DARVO */}
                    <Card className="md:col-span-2 border-slate-200 bg-slate-50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="w-5 h-5" /> DARVO-puolustus
                            </CardTitle>
                            <CardDescription>Kun kohtaat manipulointia (Deny, Attack, Reverse Victim).</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                <h4 className="font-bold text-red-800 mb-2">HYÖKKÄYS:</h4>
                                <p className="italic text-red-700">"Sinä olet liian herkkä. Sinulla on ongelmia."</p>
                            </div>
                            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                                <h4 className="font-bold text-emerald-800 mb-2">VASTAUS:</h4>
                                <p className="font-medium text-emerald-900">"Tämä ei ole minusta kiinni. Keskitytään käyttäytymiseen ja faktoihin."</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* VAHVUUSLISTA */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Vahvuuslista</CardTitle>
                            <CardDescription>Muistutus itsellesi heikkoina hetkinä.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-slate-500">Kirjoita ylös 3 asiaa, joissa olet onnistunut:</p>
                            <div className="space-y-2">
                                <input className="w-full border-b border-slate-200 focus:outline-none focus:border-indigo-500 py-1 bg-transparent" placeholder="1. _______________________" />
                                <input className="w-full border-b border-slate-200 focus:outline-none focus:border-indigo-500 py-1 bg-transparent" placeholder="2. _______________________" />
                                <input className="w-full border-b border-slate-200 focus:outline-none focus:border-indigo-500 py-1 bg-transparent" placeholder="3. _______________________" />
                            </div>
                            <p className="text-center italic text-indigo-600 font-medium pt-2">"Yksi huono esimies ei määritä minun arvoani."</p>
                        </CardContent>
                    </Card>

                    {/* HÄTÄAPUPAKKI */}
                    <Card className="bg-rose-50 border-rose-100">
                        <CardHeader>
                            <CardTitle className="text-lg text-rose-900">📦 Hätä-apupakki</CardTitle>
                            <CardDescription className="text-rose-700">Tallenna nämä valmiiksi pahaa päivää varten.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4 accent-rose-600" /> <span>Rauhoittava soittolista</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4 accent-rose-600" /> <span>Luotettavan ystävän numero</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4 accent-rose-600" checked readOnly /> <span className="font-bold">Mieli ry kriisipuhelin (09 2525 0111)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4 accent-rose-600" /> <span>Lempielokuva</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* KONFLIKTISIMULAATIO */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg">Konfliktisimulaatio</CardTitle>
                            <CardDescription>Harjoittele vastauksia vaikeisiin kysymyksiin.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <p className="font-bold text-slate-700 text-sm mb-1">KYSYMYS:</p>
                                <p className="italic mb-2">"Oletko varma ettet liioittele?"</p>
                                <p className="font-bold text-indigo-700 text-sm mb-1">VASTAUS:</p>
                                <p className="text-indigo-900 font-medium">"Olen dokumentoinut kaiken. Tämä on toistuva kuvio, ei yksittäistapaus."</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <p className="font-bold text-slate-700 text-sm mb-1">KYSYMYS:</p>
                                <p className="italic mb-2">"Miksi et sanonut aiemmin?"</p>
                                <p className="font-bold text-indigo-700 text-sm mb-1">VASTAUS:</p>
                                <p className="text-indigo-900 font-medium">"Pelkäsin tilanteen pahenevan. Nyt ymmärrän, että minun on puolustettava itseäni."</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* TULEVAISUUS */}
                    <Card className="md:col-span-2 bg-gradient-to-r from-indigo-50 to-purple-50 border-none">
                        <CardHeader>
                            <CardTitle className="text-lg">Tulevaisuuden suunnittelu</CardTitle>
                            <CardDescription>Katse eteenpäin: Missä haluat olla 6kk päästä?</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="font-medium text-slate-700">Pienet askeleet vievät eteenpäin:</p>
                            <div className="space-y-3">
                                <CheckItem time="1 vk">Päivitän CV:ni</CheckItem>
                                <CheckItem time="2 vk">Etsin 3 kiinnostavaa työpaikkaa</CheckItem>
                                <CheckItem time="jatkuva">Lepään ja palaudun</CheckItem>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>


                {/* --- TAB 3: YHTEYSTIEDOT --- */}
                <TabsContent value="contacts" className="grid gap-6 md:grid-cols-2">
                    <Card className="border-l-4 border-l-rose-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-rose-700">
                                <Phone className="w-5 h-5" /> Akuutti kriisiapua
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-bold text-lg">Mieli ry - Kriisipuhelin</h3>
                                <div className="text-3xl font-black text-slate-900 my-1">09 2525 0111</div>
                                <p className="text-sm text-slate-500">Auki 24/7. Luottamuksellinen.</p>
                            </div>
                            <div className="pt-4 border-t">
                                <h3 className="font-bold text-lg">Rikosuhripäivystys (RIKU)</h3>
                                <div className="text-3xl font-black text-slate-900 my-1">116 006</div>
                                <p className="text-sm text-slate-500">Jos koet väkivaltaa tai rikosta.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-blue-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-700">
                                <Scale className="w-5 h-5" /> Viranomaiset & Oikeus
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-bold text-base">Aluehallintovirasto (AVI)</h3>
                                <p className="text-sm text-slate-600 mb-1">Työsuojelun vastuualue</p>
                                <a href="#" className="text-blue-600 text-sm hover:underline">Siirry verkkosivuille →</a>
                            </div>
                            <div>
                                <h3 className="font-bold text-base">Ammattiliitot</h3>
                                <p className="text-sm text-slate-600">Ota yhteys oman alasi liittoon lakiapua varten.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base">Oikeusaputoimistot</h3>
                                <p className="text-sm text-slate-600">Puh: 0295 16 2500</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-emerald-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-emerald-700">
                                <Users className="w-5 h-5" /> Vertaistuki
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <a href="#" className="flex items-center gap-2 text-slate-700 hover:text-emerald-700">
                                <span>☺</span> Facebook: "Työpaikkakiusaamisen uhrit"
                            </a>
                            <a href="#" className="flex items-center gap-2 text-slate-700 hover:text-emerald-700">
                                <span>☺</span> Mieli ry: Vertaistukiryhmät (mieli.fi)
                            </a>
                            <a href="#" className="flex items-center gap-2 text-slate-700 hover:text-emerald-700">
                                <span>☺</span> Paikalliset kriisikeskukset
                            </a>
                        </CardContent>
                    </Card>

                    <Card className="border-none bg-slate-900 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-yellow-400">
                                <BookOpen className="w-5 h-5" /> Tietopankit
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-bold text-base text-blue-200">Työterveyslaitos (TTL)</h3>
                                <p className="text-sm text-slate-400">Tutkittua tietoa työhyvinvoinnista.</p>
                                <p className="text-xs text-slate-500 mt-1">ttl.fi</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-blue-200">Työturvallisuuskeskus</h3>
                                <p className="text-sm text-slate-400">Materiaaleja ja oppaita.</p>
                                <p className="text-xs text-slate-500 mt-1">ttk.fi</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="text-center pt-8 border-t border-slate-100">
                <p className="text-emerald-600 font-bold text-lg flex items-center justify-center gap-2">
                    💚 Muista: Et ole yksin. Et ole syyllinen. Sinulla on oikeus apuun.
                </p>
                <p className="text-slate-400 text-xs mt-2 italic">
                    Tämä materiaali on tarkoitettu tiedotukseksi ja tueksi. Se ei korvaa ammattilaisen antamaa apua.
                </p>
            </div>
        </div>
    );
}

// --- SUBCOMPONENTS ---

function QuoteBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-indigo-50 px-4 py-3 rounded-tr-xl rounded-bl-xl rounded-br-xl border-l-4 border-l-indigo-400 text-indigo-900 font-medium italic">
            {children}
        </div>
    );
}

function CheckItem({ time, children }: { time: string, children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
            <div className="w-6 h-6 rounded-full border-2 border-indigo-200 flex items-center justify-center text-transparent hover:text-indigo-600 cursor-pointer transition-colors">
                ✓
            </div>
            <div className="flex-1">
                <p className="text-slate-800 font-medium">{children}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">{time}</p>
            </div>
        </div>
    );
}

function BreathingExercise555() {
    const [status, setStatus] = useState("Aloita");
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        const phases = [
            { text: "Hengitä sisään (5)", duration: 5000 },
            { text: "Pidätä (5)", duration: 5000 },
            { text: "Hengitä ulos (5)", duration: 5000 },
        ];

        let phaseIndex = 0;

        const runPhase = () => {
            if (!isRunning) return; // Safety check
            setStatus(phases[phaseIndex].text);
            phaseIndex = (phaseIndex + 1) % phases.length;
        };

        runPhase();
        const interval = setInterval(runPhase, 5000);

        return () => clearInterval(interval);
    }, [isRunning]);

    return (
        <div className="flex flex-col items-center justify-center py-6 gap-6">
            <div className="relative flex items-center justify-center">
                <motion.div
                    animate={isRunning ? {
                        scale: [1, 1.3, 1.3, 1, 1], // In(1->1.3), Hold(1.3), Out(1.3->1)
                        opacity: [0.6, 1, 1, 0.6, 0.6],
                    } : { scale: 1, opacity: 0.6 }}
                    transition={isRunning ? {
                        duration: 15, // 5+5+5
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.33, 0.66, 1]
                    } : {}}
                    className="w-40 h-40 rounded-full bg-indigo-300/30 absolute blur-xl"
                />
                <motion.div
                    animate={isRunning ? {
                        scale: [1, 1.1, 1.1, 1, 1],
                    } : { scale: 1 }}
                    transition={isRunning ? {
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.33, 0.66, 1]
                    } : {}}
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center relative z-10 shadow-xl text-white font-bold text-center px-4"
                >
                    {status}
                </motion.div>
            </div>

            <Button
                onClick={() => {
                    setIsRunning(!isRunning);
                    if (isRunning) setStatus("Aloita");
                }}
                variant={isRunning ? "outline" : "default"}
                size="sm"
                className="rounded-full px-6"
            >
                {isRunning ? "Lopeta" : "Aloita harjoitus"}
            </Button>
        </div>
    );
}
