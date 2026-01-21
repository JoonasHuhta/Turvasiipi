"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
    Building2,
    ArrowLeft,
    ShieldAlert,
    Users,
    Activity,
    Briefcase,
    BookOpen,
    Scale,
    AlertTriangle,
    CheckCircle2
} from "lucide-react";

interface OrganizationResourcesProps {
    onExit: () => void;
    onComplete: () => void;
}

export const OrganizationResources: React.FC<OrganizationResourcesProps> = ({ onExit, onComplete }) => {



    const resources = [
        {
            id: "systemic-risks",
            title: "1. Organisaatioriskit (5 kriittistä tekijää)",
            icon: ShieldAlert,
            content: (
                <div className="space-y-6 text-slate-700">
                    <div className="space-y-2">
                        <h4 className="font-bold text-slate-900 italic underline">1. Epäselvät roolit ja valta-alueet</h4>
                        <p>Syntyy ”harmaa alue”, jossa epäviralliset valtasuhteet ja epäoikeudenmukainen kuormituksen jakaminen normalisoituvat. LMX-näkökulmasta osa saa tukea, osa jää syntipukiksi.</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-slate-900 italic underline">2. Heikko tai hajautunut tiedonkulku</h4>
                        <p>Vain ”lähiverkolle” kulkeva informaatio ruokkii epäluottamusta. Psykologinen sopimus rikkoutuu, kun ihminen kokee tulevansa ohitetuksi päätöksissä.</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-slate-900 italic underline">3. Epäoikeudenmukainen johtaminen (Sisäpiirit)</h4>
                        <p>Kun esihenkilöllä on selkeä suosikki- vs. ulkoryhmä-jako, syntyy rakenteellinen kiusaamisalttius. Interactional Justice -vaje ennustaa konflikteja.</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-slate-900 italic underline">4. Näennäiset puuttumisprosessit</h4>
                        <p>Jos prosessit ovat hukkuneet paperille tai koetaan hitaiksi, viesti on: kiusaaminen kannattaa. Tämä on organisaation suurin luottamusrikkomus.</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-slate-900 italic underline">5. Korkea kuormitus + Matala vaikutusvalta</h4>
                        <p>Turhautuminen purkautuu henkilöihin eikä rakenteisiin. Syntyy ”oppinut avuttomuus”, jossa kukaan ei enää usko muutokseen.</p>
                    </div>
                </div>
            )
        },
        {
            id: "financial-impact",
            title: "2. Taloudellinen vaikutus ja laskenta",
            icon: Scale,
            content: (
                <div className="space-y-4 text-slate-700">
                    <p>Yksi pitkittynyt kiusaamistapaus keskijohtajatasolla voi maksaa organisaatiolle <strong>80 000 – 150 000 €</strong>.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                            <h5 className="font-bold text-orange-950 text-sm mb-1">X-kustannukset</h5>
                            <p className="text-xs">Sairauspoissaolot, sairausloman palkka + sivukulut (~400€/pv).</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                            <h5 className="font-bold text-orange-950 text-sm mb-1">Presenteeismi</h5>
                            <p className="text-xs">Tehon lasku (20-40%) työntekijän ollessa paikalla.</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                            <h5 className="font-bold text-orange-950 text-sm mb-1">Vaihtuvuus</h5>
                            <p className="text-xs">0.5 - 1.5 x vuosipalkka (haku, perehdytys, tuottavuuden menetys).</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                            <h5 className="font-bold text-orange-950 text-sm mb-1">Johto & HR</h5>
                            <p className="text-xs">20-80 tuntia selvitystyötä ja juridiikkaa tapausta kohden.</p>
                        </div>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg font-medium text-sm">
                        Kaava: Kokonaishinta ≈ SA + Presenteeismi + Vaihtuvuus + HR/Johto + Maine
                    </div>
                </div>
            )
        },
        {
            id: "decisive-moments",
            title: "3. Johdon ratkaisevat hetket",
            icon: Briefcase,
            content: (
                <div className="space-y-6 text-slate-700">
                    <div className="space-y-2">
                        <h4 className="font-bold text-slate-900">1. Ensimmäinen signaali</h4>
                        <p className="text-sm">Vitsit, eristäminen, hämmennys. Valinta: <strong>Pysäytä</strong> (reagoi heti) vai <strong>Mahdollista</strong> (vähättele huumoriksi).</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-slate-900">2. Ensimmäinen ilmoitus</h4>
                        <p className="text-sm">Valinta: <strong>Pysäytä</strong> (kiitä, dokumentoi, selvitä) vai <strong>Mahdollista</strong> (syyllistä herkkydestä).</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-slate-900">3. Seurannan jatkuvuus</h4>
                        <p className="text-sm">Valinta: <strong>Pysäytä</strong> (tarkista toimet 1, 3 ja 6kk välein) vai <strong>Mahdollista</strong> (oletus että asia on ohi).</p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-full p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-slate-400 hover:text-slate-900 gap-2">
                    <ArrowLeft className="w-4 h-4" /> Takaisin
                </Button>
                <div className="flex items-center gap-2 text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider">
                    <Building2 className="w-4 h-4" /> Organisaatioille
                </div>
            </div>

            <div className="space-y-4 pb-4 border-b border-slate-200">
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
                    Tietopankki: <span className="text-slate-600">Työyhteisön Hyvinvointi</span>
                </h1>
                <p className="text-slate-500 max-w-2xl text-lg">
                    Rakenteelliset riskit, johdon vastuu ja tutkittu tieto turvallisen työyhteisön rakentamiseksi.
                </p>
            </div>

            <Card className="p-0 border-slate-200 shadow-lg overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                    {resources.map((item, i) => (
                        <AccordionItem key={item.id} value={item.id} className="border-b border-slate-100 last:border-0 px-6">
                            <AccordionTrigger className="hover:no-underline py-6 group">
                                <div className="flex items-center gap-4 text-left">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600 transition-colors">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-slate-800 text-lg group-hover:text-slate-900">{item.title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-6 pl-[4.5rem] pr-4">
                                {item.content}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Card>

            <div className="bg-slate-50 p-8 rounded-2xl text-center space-y-4 mt-4 border border-slate-100">
                <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm">Organisaatiot ovat ihmisiä</h3>
                <p className="text-slate-600 italic max-w-xl mx-auto">
                    "Kun työyhteisö on turvallinen, ihmiset uskaltavat tehdä työnsä hyvin. Kun turvallisuus puuttuu, seuraukset näkyvät kaikkialla."
                </p>
            </div>
        </div>
    );
};
