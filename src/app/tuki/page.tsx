"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    Activity,
    ShieldAlert,
    FileText,
    Phone,
    Scale,
    Users,
    BookOpen,
    Smile,
    CheckCircle2,
    AlertTriangle,
    Hospital,
    HelpCircle,
    ArrowRight,
    Brain
} from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
    const [breathingActive, setBreathingActive] = useState(false);
    const [breathingPhase, setBreathingPhase] = useState("start"); // start, inhale, hold, exhale

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
            <header className="space-y-4 text-center py-8">
                <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200 mb-2">Resurssipankki</Badge>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Tuki ja Toipuminen</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Konkreettisia ohjeita, harjoituksia ja toimintamalleja jaksamisen tueksi.
                </p>
            </header>

            <Tabs defaultValue="plan" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-slate-100/80 backdrop-blur rounded-full">
                    <TabsTrigger value="plan" className="rounded-full py-3">Toimintasuunnitelma</TabsTrigger>
                    <TabsTrigger value="exercises" className="rounded-full py-3">Harjoitukset</TabsTrigger>
                    <TabsTrigger value="contacts" className="rounded-full py-3">Yhteystiedot</TabsTrigger>
                </TabsList>

                {/* --- TAB: TOIMINTASUUNNITELMA --- */}
                <TabsContent value="plan" className="space-y-6 mt-8">
                    <div className="grid gap-6">
                        {/* 1. Kiusaaminen juuri alkanut */}
                        <Card className="border-l-4 border-l-yellow-500 shadow-md">
                            <CardHeader>
                                <div className="flex items-center gap-2 text-yellow-600 mb-2">
                                    <AlertTriangle className="w-5 h-5" />
                                    <span className="font-bold uppercase text-xs tracking-widest">Vaihe 1</span>
                                </div>
                                <CardTitle className="text-2xl">Kiusaaminen on juuri alkanut tai epäilyttää</CardTitle>
                                <CardDescription>Kun huomaat ensimmäiset merkit, toimi heti.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="identify">
                                        <AccordionTrigger className="font-bold">1. Tunnista tilanne</AccordionTrigger>
                                        <AccordionContent className="text-slate-600 space-y-2">
                                            <p>Kysy itseltäsi:</p>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>Onko käyttäytyminen toistunut useammin kuin kerran?</li>
                                                <li>Kohdistuuko se juuri sinuun?</li>
                                                <li>Tuntuuko sinusta, että et voi puolustautua?</li>
                                                <li>Vaikuttaako se uneen tai stressitasoosi?</li>
                                            </ul>
                                            <p className="font-medium mt-2">Jos vastasit "kyllä" useampaan, kyseessä voi olla kiusaaminen.</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="document">
                                        <AccordionTrigger className="font-bold text-indigo-600">2. Aloita dokumentointi HETI</AccordionTrigger>
                                        <AccordionContent className="text-slate-600 space-y-4">
                                            <p>Muisti hämärtyy. Aloita "Kiusaamispäiväkirja" tänään.</p>
                                            <Card className="bg-slate-50 border-slate-200">
                                                <CardContent className="p-4 space-y-2 text-sm font-mono">
                                                    <div><strong>Kirjaa ylös:</strong></div>
                                                    <ul className="list-disc pl-5 space-y-1">
                                                        <li>Päivämäärä ja kellonaika</li>
                                                        <li>Mitä tapahtui (faktat, ei tulkintoja)</li>
                                                        <li>Todistajat (nimet)</li>
                                                        <li>Tarkat sanamuodot ("Hän sanoi...")</li>
                                                        <li>Omat tuntemukset ja reaktiot</li>
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                            <p className="text-sm">💡 <strong>Vinkki:</strong> Käytä sovelluksen <Link href="/timeline" className="text-indigo-600 underline">Logikirjaa</Link> tähän.</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="talk">
                                        <AccordionTrigger className="font-bold">3. Kenelle puhua?</AccordionTrigger>
                                        <AccordionContent className="text-slate-600 space-y-2">
                                            <p><strong>Turvallinen henkilö ensin:</strong></p>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>Luotettava työkaveri (todistaja?)</li>
                                                <li>Perheenjäsen tai ystävä (validointi)</li>
                                                <li>Työterveyshuolto (luottamuksellinen tuki)</li>
                                            </ul>
                                            <p className="mt-2 text-red-600 text-sm font-bold">⚠️ ÄLÄ vielä konfrontoi kiusaajaa yksin tai lähetä vihaisia viestejä.</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>

                        {/* 2. Tilanne on jatkunut */}
                        <Card className="border-l-4 border-l-orange-500 shadow-md">
                            <CardHeader>
                                <div className="flex items-center gap-2 text-orange-600 mb-2">
                                    <ShieldAlert className="w-5 h-5" />
                                    <span className="font-bold uppercase text-xs tracking-widest">Vaihe 2</span>
                                </div>
                                <CardTitle className="text-2xl">Tilanne on jatkunut pidempään</CardTitle>
                                <CardDescription>Kun epäviralliset keinot eivät riitä, tarvitaan virallisia toimia.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="ts-valtuutettu">
                                        <AccordionTrigger className="font-bold">1. Ota yhteys työsuojeluvaltuutettuun</AccordionTrigger>
                                        <AccordionContent className="text-slate-600 space-y-2">
                                            <p>Hän on työntekijöiden edustaja, joka tuntee lait ja prosessit. Keskustelu on luottamuksellinen. Pyydä häntä mukaan tapaamisiin tueksi.</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="ilmoitus">
                                        <AccordionTrigger className="font-bold">2. Tee kirjallinen ilmoitus työnantajalle</AccordionTrigger>
                                        <AccordionContent className="text-slate-600 space-y-3">
                                            <p>Työnantajan velvollisuus alkaa vasta kun he "saavat tiedon". Kirjallinen on paras todiste.</p>
                                            <div className="bg-slate-100 p-4 rounded-md font-mono text-xs">
                                                <p>"ASIA: Ilmoitus epäasiallisesta kohtelusta..."</p>
                                                <p>"Pyydän työnantajaa ryhtymään toimenpiteisiin työturvallisuuslain mukaisesti..."</p>
                                            </div>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href="/raportti">Käytä Raportti-työkalua</Link>
                                            </Button>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="avi">
                                        <AccordionTrigger className="font-bold">3. Työsuojeluviranomainen (AVI)</AccordionTrigger>
                                        <AccordionContent className="text-slate-600 space-y-2">
                                            <p>Jos työnantaja ei toimi ilmoituksesta huolimatta, tee ilmoitus Aluehallintovirastoon (AVI). He voivat tarkastaa työpaikan ja antaa määräyksiä.</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>

                        {/* 3. Sairausloma ja toipuminen */}
                        <Card className="border-l-4 border-l-emerald-500 shadow-md">
                            <CardHeader>
                                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                                    <Hospital className="w-5 h-5" />
                                    <span className="font-bold uppercase text-xs tracking-widest">Vaihe 3</span>
                                </div>
                                <CardTitle className="text-2xl">Olen sairauslomalla uupumuksen vuoksi</CardTitle>
                                <CardDescription>Toipuminen on nyt tärkein työsi.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="kriisi">
                                        <AccordionTrigger className="font-bold">Viikot 1-2: Kriisivaihe (Lepo)</AccordionTrigger>
                                        <AccordionContent className="text-slate-600 space-y-2">
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li><strong>Nuku:</strong> Kehosi on ylikierroksilla.</li>
                                                <li><strong>Irti työstä:</strong> Älä lue sähköposteja. Poista sovellukset.</li>
                                                <li><strong>Hae apua:</strong> Työterveys, terapia, kriisipuhelin.</li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="kasittely">
                                        <AccordionTrigger className="font-bold">Viikot 3-8: Käsittelyvaihe</AccordionTrigger>
                                        <AccordionContent className="text-slate-600 space-y-2">
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>Ala käsitellä tapahtunutta ammattilaisen kanssa.</li>
                                                <li>Aloita pienet hyvinvointirutiinit (kävely, säännöllinen ruoka).</li>
                                                <li>Ymmärrä: Et ole syyllinen. Tämä oli trauma.</li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="future">
                                        <AccordionTrigger className="font-bold">Viikot 8+: Tulevaisuus</AccordionTrigger>
                                        <AccordionContent className="text-slate-600 space-y-2">
                                            <p>Arvioi vaihtoehdot realistisesti:</p>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>Paluu (onko tilanne korjattu?)</li>
                                                <li>Siirto toiseen tiimiin</li>
                                                <li>Työpaikan vaihto (uusi alku)</li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* --- TAB: HARJOITUKSET --- */}
                <TabsContent value="exercises" className="mt-8">
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* 1. Hengitysharjoitus */}
                        <Card className="md:col-span-2 bg-slate-900 text-white border-none overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Activity className="w-48 h-48" />
                            </div>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-emerald-400" />
                                    Stressinhallinta: 5-5-5 Hengitys
                                </CardTitle>
                                <CardDescription className="text-slate-400">Aktivoi parasympaattinen hermosto ja rauhoita akuutti ahdistus.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center py-10 relative z-10">
                                {!breathingActive ? (
                                    <Button size="lg" onClick={() => setBreathingActive(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8">
                                        Aloita harjoitus
                                    </Button>
                                ) : (
                                    <div className="flex flex-col items-center gap-8">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1.2, 1],
                                                opacity: [0.7, 1, 1, 0.7],
                                            }}
                                            transition={{
                                                duration: 15, // 5s in, 5s hold, 5s out
                                                ease: "linear",
                                                repeat: Infinity,
                                                times: [0, 0.33, 0.66, 1]
                                            }}
                                            className="w-40 h-40 bg-emerald-500/20 border-4 border-emerald-500 rounded-full flex items-center justify-center relative shadow-[0_0_50px_rgba(16,185,129,0.3)]"
                                        >
                                            <div className="text-2xl font-bold text-emerald-400">
                                                Hengitä
                                            </div>
                                        </motion.div>
                                        <p className="text-slate-300 font-mono text-sm animate-pulse">
                                            Sisään (5s) ... Pidätä (5s) ... Ulos (5s)
                                        </p>
                                        <Button variant="outline" className="text-black border-white/20 hover:bg-white/10 hover:text-white" onClick={() => setBreathingActive(false)}>Lopeta</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* 2. Maadoitus */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2"><Brain className="w-5 h-5 text-indigo-500" /> Maadoitustekniikka 5-4-3-2-1</CardTitle>
                                <CardDescription>Kun paniikki iskee, palauta itsesi hetkeen.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-slate-600">
                                <ul className="space-y-2">
                                    <li>👀 <strong>5</strong> asiaa jotka näet</li>
                                    <li>✋ <strong>4</strong> asiaa johon kosketat</li>
                                    <li>👂 <strong>3</strong> asiaa jotka kuulet</li>
                                    <li>👃 <strong>2</strong> asiaa jotka haistat</li>
                                    <li>👄 <strong>1</strong> asia jonka maistat</li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* 3. Rajojen asettaminen */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-orange-500" /> Rajojen asettaminen</CardTitle>
                                <CardDescription>Opettele sanomaan nämä ääneen.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <ul className="space-y-2 text-sm font-medium text-slate-700">
                                    <li className="bg-orange-50 p-2 rounded border border-orange-100">"En hyväksy tällaista puhetta."</li>
                                    <li className="bg-orange-50 p-2 rounded border-orange-100">"Pyydän että puhut minulle asiallisesti."</li>
                                    <li className="bg-orange-50 p-2 rounded border-orange-100">"En jatka keskustelua, jos se jatkuu tällaisena."</li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* 4. DARVO-puolustus */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2"><Scale className="w-5 h-5 text-blue-500" /> DARVO-puolustus</CardTitle>
                                <CardDescription>Kun kohtaat manipulointia (Deny, Attack, Reverse Victim).</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div>
                                    <div className="font-bold text-red-500 text-xs">HYÖKKÄYS:</div>
                                    <div className="italic text-slate-500">"Sinä olet liian herkkä. Sinulla on ongelmia."</div>
                                </div>
                                <div>
                                    <div className="font-bold text-emerald-600 text-xs">VASTAUS:</div>
                                    <div className="font-medium text-slate-700">"Tämä ei ole minusta kiinni. Keskitytään käyttäytymiseen ja faktoihin."</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 5. Vahvuuslista */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2"><Smile className="w-5 h-5 text-pink-500" /> Vahvuuslista</CardTitle>
                                <CardDescription>Muistutus itsellesi heikkoina hetkinä.</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-slate-600 space-y-2">
                                <p>Kirjoita ylös 3 asiaa, joissa olet onnistunut:</p>
                                <ol className="list-decimal pl-5 space-y-1 font-mono bg-slate-50 p-3 rounded">
                                    <li>_______________________</li>
                                    <li>_______________________</li>
                                    <li>_______________________</li>
                                </ol>
                                <p className="italic text-xs">"Yksi huono esimies ei määritä minun arvoani."</p>
                            </CardContent>
                        </Card>

                        {/* 6. Hätä-apupakki */}
                        <Card className="bg-slate-50 border-dashed border-2">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">📦 Hätä-apupakki</CardTitle>
                                <CardDescription>Tallenna nämä valmiiksi pahaa päivää varten.</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400" /> Rauhoittava soittolista</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400" /> Luotettavan ystävän numero</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400" /> Mieli ry kriisipuhelin (09 2525 0111)</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400" /> Lempielokuva</li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* 7. Konfliktin käsittely */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2"><Users className="w-5 h-5 text-purple-500" /> Konfliktisimulaatio</CardTitle>
                                <CardDescription>Harjoittele vastauksia vaikeisiin kysymyksiin.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="space-y-1">
                                    <div className="font-bold text-slate-700">"Oletko varma ettet liioittele?"</div>
                                    <div className="bg-purple-50 p-2 rounded text-purple-900 border border-purple-100">"Olen dokumentoinut kaiken. Tämä on toistuva kuvio, ei yksittäistapaus."</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="font-bold text-slate-700">"Miksi et sanonut aiemmin?"</div>
                                    <div className="bg-purple-50 p-2 rounded text-purple-900 border border-purple-100">"Pelkäsin tilanteen pahenevan. Nyt ymmärrän, että minun on puolustettava itseäni."</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 8. Tulevaisuus */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2"><ArrowRight className="w-5 h-5 text-cyan-500" /> Tulevaisuuden suunnittelu</CardTitle>
                                <CardDescription>Katse eteenpäin: Missä haluat olla 6kk päästä?</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm text-slate-600">
                                <p>Pienet askeleet vievät eteenpäin:</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-cyan-500" /> Päivitän CV:ni (1 vk)</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-cyan-500" /> Etsin 3 kiinnostavaa työpaikkaa (2 vk)</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-cyan-500" /> Lepään ja palaudun (jatkuva)</li>
                                </ul>
                            </CardContent>
                        </Card>

                    </div>
                </TabsContent>

                {/* --- TAB: YHTEYSTIEDOT --- */}
                <TabsContent value="contacts" className="mt-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-l-4 border-l-red-500">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Phone className="w-5 h-5 text-red-500" /> Akuutti kriisiapua</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="font-bold text-lg">Mieli ry - Kriisipuhelin</div>
                                    <div className="text-2xl font-black text-slate-900 my-1">09 2525 0111</div>
                                    <div className="text-muted-foreground text-sm">Auki 24/7. Luottamuksellinen.</div>
                                </div>
                                <hr />
                                <div>
                                    <div className="font-bold">Rikosuhripäivystys (RIKU)</div>
                                    <div className="text-xl font-bold text-slate-800 my-1">116 006</div>
                                    <div className="text-muted-foreground text-sm">Jos koet väkivaltaa tai rikosta.</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Scale className="w-5 h-5 text-indigo-500" /> Viranomaiset & Oikeus</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="font-bold">Aluehallintovirasto (AVI)</div>
                                    <div className="text-sm text-slate-600 mb-1">Työsuojelun vastuualue</div>
                                    <Link href="https://avi.fi" target="_blank" className="text-indigo-600 hover:underline text-sm flex items-center gap-1">
                                        Siirry verkkosivuille <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                                <div>
                                    <div className="font-bold">Ammattiliitot</div>
                                    <div className="text-sm text-slate-600">
                                        Ota yhteys oman alasi liittoon lakiapua varten.
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Oikeusaputoimistot</div>
                                    <div className="text-sm text-slate-600">
                                        Puh: 0295 16 2500
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-emerald-500" /> Vertaistuki</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="space-y-3 text-sm text-slate-600">
                                    <li className="flex items-center gap-2">
                                        <Smile className="w-4 h-4 text-emerald-500" />
                                        <span><strong>Facebook:</strong> "Työpaikkakiusaamisen uhrit"</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Smile className="w-4 h-4 text-emerald-500" />
                                        <span><strong>Mieli ry:</strong> Vertaistukiryhmät (mieli.fi)</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Smile className="w-4 h-4 text-emerald-500" />
                                        <span><strong>Paikalliset kriisikeskukset</strong></span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-900 text-white border-none">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">💡 Tietopankit</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <div className="font-bold text-indigo-300">Työterveyslaitos (TTL)</div>
                                    <div className="text-sm text-slate-400">Tutkittua tietoa työhyvinvoinnista.</div>
                                    <div className="text-xs text-slate-500">ttl.fi</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="font-bold text-indigo-300">Työturvallisuuskeskus</div>
                                    <div className="text-sm text-slate-400">Materiaaleja ja oppaita.</div>
                                    <div className="text-xs text-slate-500">ttk.fi</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            <footer className="text-center text-slate-400 text-sm mt-12 mb-8 bg-slate-50 p-6 rounded-2xl">
                <p className="font-medium text-slate-500 mb-2">💚 Muista: Et ole yksin. Et ole syyllinen. Sinulla on oikeus apuun.</p>
                <p className="text-xs italic">Tämä materiaali on tarkoitettu tiedotukseksi ja tueksi. Se ei korvaa ammattilaisen antamaa apua.</p>
            </footer>
        </div>
    );
}
