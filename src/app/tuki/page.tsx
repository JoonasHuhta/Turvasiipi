"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Activity, CheckCircle2 } from "lucide-react";

export default function SupportPage() {
    const [breathingActive, setBreathingActive] = useState(false);
    const [checklist, setChecklist] = useState({
        rest: false,
        talk: false,
        eat: false,
        exercise: false,
    });

    const toggleCheck = (key: keyof typeof checklist) => {
        setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Tuki ja Toipuminen</h2>
                <p className="text-muted-foreground">Konkreettisia ohjeita ja harjoituksia jaksamisen tueksi.</p>
            </div>

            <Tabs defaultValue="plan" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="plan">Toimintasuunnitelma</TabsTrigger>
                    <TabsTrigger value="exercises">Harjoitukset</TabsTrigger>
                </TabsList>

                <TabsContent value="plan" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mitä tehdä juuri nyt?</CardTitle>
                            <CardDescription>Valitse tilanteeseesi sopiva osio.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="start">
                                    <AccordionTrigger>Kiusaaminen on juuri alkanut tai epäilyttää</AccordionTrigger>
                                    <AccordionContent className="space-y-2 text-muted-foreground">
                                        <p>1. <strong>Ala kirjata tapahtumia heti ylös.</strong> Älä luota muistiisi. Päivämäärät ja tarkat sanat ovat tärkeitä.</p>
                                        <p>2. <strong>Ota asia puheeksi.</strong> Jos mahdollista, sano kiusaajalle rauhallisesti mutta jämäkästi: "En pidä tuosta käytöksestä, lopeta."</p>
                                        <p>3. <strong>Selvitä onko muita uhreja.</strong> Usein kiusaaja kohdistaa käytöksensä useampaan henkilöön.</p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="ongoing">
                                    <AccordionTrigger>Tilanne on jatkunut pidempään</AccordionTrigger>
                                    <AccordionContent className="space-y-2 text-muted-foreground">
                                        <p>1. <strong>Ota yhteys esihenkilöön.</strong> Jos esihenkilö on kiusaaja, ota yhteys hänen esihenkilöönsä tai luottamusmieheen.</p>
                                        <p>2. <strong>Älä jää yksin.</strong> Puhu työterveydelle tai työsuojeluvaltuutetulle.</p>
                                        <p>3. <strong>Tee virallinen ilmoitus.</strong> Käytä sovelluksen raportointityökalua ilmoituksen tekemiseen kirjallisesti.</p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="sickleave">
                                    <AccordionTrigger>Olen sairauslomalla uupumuksen vuoksi</AccordionTrigger>
                                    <AccordionContent className="space-y-2 text-muted-foreground">
                                        <p>1. <strong>Keskity vain toipumiseen.</strong> Älä lue työsähköposteja.</p>
                                        <p>2. <strong>Työterveysneuvottelu.</strong> Ennen paluuta vaadi neuvottelua, jossa sovitaan turvallisesta paluusta.</p>
                                        <p>3. <strong> Hae ammattiapua.</strong> Työterveyspsykologi voi auttaa käsittelemään traumaa.</p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="exercises" className="space-y-6 mt-6">
                    {/* Breathing Exercise */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-primary" />
                                Rauhoittava hengitys
                            </CardTitle>
                            <CardDescription>3 minuutin neliöhengitys (4-4-4-4) laskee vireystilaa.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center py-10">
                            {!breathingActive ? (
                                <Button size="lg" onClick={() => setBreathingActive(true)} className="gap-2">
                                    Aloita harjoitus
                                </Button>
                            ) : (
                                <div className="flex flex-col items-center gap-8">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.5, 1.5, 1],
                                            rotate: [0, 0, 180, 180],
                                            borderRadius: ["20%", "50%", "50%", "20%"],
                                        }}
                                        transition={{
                                            duration: 16, // 4s inhale, 4s hold, 4s exhale, 4s hold
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                            times: [0, 0.25, 0.5, 0.75, 1]
                                        }}
                                        className="w-32 h-32 bg-primary/30 border-4 border-primary rounded-full flex items-center justify-center relative"
                                    >
                                        <motion.div
                                            className="text-primary font-bold"
                                            animate={{ opacity: [0, 1, 1, 0] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                        >
                                            Hengitä
                                        </motion.div>
                                    </motion.div>
                                    <p className="text-muted-foreground animate-pulse">
                                        Hengitä sisään... Pidätä... Hengitä ulos... Pidätä...
                                    </p>
                                    <Button variant="outline" onClick={() => setBreathingActive(false)}>Lopeta</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Self Compassion */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Heart className="w-5 h-5 text-red-400" />
                                Itsemyötätunto tänään
                            </CardTitle>
                            <CardDescription>Pienet teot riittävät. Oletko muistanut...</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { id: "rest", label: "Levätä hetken tekemättä mitään?" },
                                    { id: "talk", label: "Puhua jollekulle, johon luotat?" },
                                    { id: "eat", label: "Syödä ravitsevan aterian?" },
                                    { id: "exercise", label: "Liikkua edes vähän (esim. lyhyt kävely)?" },
                                ].map((item) => (
                                    <div
                                        key={item.id}
                                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${checklist[item.id as keyof typeof checklist] ? "bg-green-50 border-green-200" : "hover:bg-secondary/50"
                                            }`}
                                        onClick={() => toggleCheck(item.id as keyof typeof checklist)}
                                    >
                                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${checklist[item.id as keyof typeof checklist] ? "bg-green-500 border-green-500 text-white" : "border-gray-300"
                                            }`}>
                                            {checklist[item.id as keyof typeof checklist] && <CheckCircle2 className="w-4 h-4" />}
                                        </div>
                                        <span className={checklist[item.id as keyof typeof checklist] ? "line-through text-muted-foreground" : ""}>
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
