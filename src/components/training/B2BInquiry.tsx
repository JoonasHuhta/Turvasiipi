"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Mail,
    ArrowRight,
    Sparkles,
    Microscope,
    MessagesSquare,
    Rocket
} from "lucide-react";
import { useProgress } from "@/context/ProgressContext";

interface B2BInquiryProps {
    onExit: () => void;
    onComplete: () => void;
}

export const B2BInquiry: React.FC<B2BInquiryProps> = ({ onExit, onComplete }) => {
    const { completeModule } = useProgress();

    const handleEmailClick = () => {
        completeModule("b2b");
        window.location.href = "mailto:joonas@turvasiipi.fi?subject=Yhteistyö / Turvasiipi";
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4 animate-in fade-in duration-500">
            <div className="text-center mb-12 space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mx-auto flex items-center justify-center shadow-sm">
                    <Rocket className="w-8 h-8 text-slate-700" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 font-serif">Matkalla parempaan</h2>
                <p className="text-slate-600 max-w-lg mx-auto leading-relaxed">
                    Tämä sovellus on intohimoprojekti ja tutkimusmatka turvallisempaan työelämään.
                    En ole konsultti, vaan kehittäjä ja oppija.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <Microscope className="w-6 h-6 text-indigo-600 mb-2" />
                        <CardTitle className="text-lg">Pilotointi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-600">
                            Haluaisitko kokeilla Turvasiipeä tiimisi kanssa? Etsin organisaatioita,
                            jotka haluavat testata työkaluja ja antaa palautetta.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <MessagesSquare className="w-6 h-6 text-emerald-600 mb-2" />
                        <CardTitle className="text-lg">Sparrailu</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-600">
                            Kaipaatko ulkopuolista näkökulmaa tai haluatko räätälöidyn version
                            "Kulttuuri-lämpömittarista"? Jutellaan ja ideoidaan.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center space-y-6">
                <h3 className="font-bold text-xl text-slate-900">Ota rohkeasti yhteyttä</h3>
                <p className="text-slate-600 text-sm max-w-sm mx-auto">
                    Ei myyntipuheita, ei sitoumuksia. Vain keskustelua siitä, miten voimme rakentaa inhimillisempää työelämää.
                </p>

                <div className="flex flex-col gap-3 justify-center items-center">
                    <Button
                        size="lg"
                        onClick={handleEmailClick}
                        className="bg-slate-900 hover:bg-slate-800 text-white min-w-[200px]"
                    >
                        <Mail className="w-4 h-4 mr-2" />
                        Lähetä sähköpostia
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onExit}
                        className="text-slate-500 hover:text-slate-700"
                    >
                        Palaa etusivulle
                    </Button>
                </div>
            </div>
        </div>
    );
};
