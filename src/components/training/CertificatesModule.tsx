"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Award,
    ArrowLeft,
    Download,
    Lock,
    CheckCircle2,
    FileText,
    Share2,
    Printer
} from "lucide-react";
import { useProgress } from "@/context/ProgressContext";

interface CertificatesModuleProps {
    onExit: () => void;
}

export const CertificatesModule: React.FC<CertificatesModuleProps> = ({ onExit }) => {
    const { isModuleCompleted, getCertificationProgress } = useProgress();
    const progress = getCertificationProgress();

    // Define certificates based on completion logic
    const certificates = [
        {
            id: 'cert_literacy',
            title: "Kiusaamisen Lukutaito",
            description: "Perustason ymmärrys kiusaamisen dynamiikasta ja taktiikoista.",
            date: "Suoritettu",
            requirements: "Suorita Kiusaamisen Lukutaito -peruskurssi",
            isEarned: isModuleCompleted('valmennus_easy') || progress.percentage > 30, // Simplified logic for demo
            color: "indigo"
        },
        {
            id: 'cert_bystander',
            title: "Aktiivinen Bystander",
            description: "Valmius puuttua turvallisesti ja tehokkaasti häirintätilanteisiin.",
            date: "Suoritettu",
            requirements: "Läpäise Bystander-simulaatio",
            isEarned: isModuleCompleted('valmennus_bystander_sim'),
            color: "emerald"
        },
        {
            id: 'cert_protection',
            title: "Suojelija & Turvan Rakentaja",
            description: "Syvällinen osaaminen toipumisen ja yhteisön turvallisuuden tukemisessa.",
            date: "Suoritettu",
            requirements: "Suorita Toipuminen & Hyvinvointi -moduuli",
            isEarned: isModuleCompleted('recovery_main'),
            color: "rose"
        }
    ];

    return (
        <div className="min-h-full p-6 md:p-12 max-w-5xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-slate-400 hover:text-slate-900 gap-2">
                    <ArrowLeft className="w-4 h-4" /> Takaisin
                </Button>
                <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider">
                    <Award className="w-4 h-4" /> Sertifiointi
                </div>
            </div>

            <div className="space-y-4 pb-6 border-b border-slate-200">
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
                    Sertifikaatit & <span className="text-blue-600">Todistukset</span>
                </h1>
                <p className="text-slate-500 max-w-2xl text-lg">
                    Täältä löydät ansaitsemasi todistukset. Voit ladata ne PDF-muodossa tai jakaa suoraan työnantajalle osoituksena osaamisestasi.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {certificates.map((cert) => (
                    <div key={cert.id} className="relative group">
                        <Card className={`p-8 border-2 transition-all duration-300 relative overflow-hidden ${cert.isEarned ? 'border-slate-200 hover:border-blue-300 hover:shadow-xl' : 'border-slate-100 bg-slate-50 opacity-80'}`}>

                            {/* Background decoration */}
                            <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-5 transition-colors ${cert.isEarned ? `bg-${cert.color}-500` : 'bg-slate-300'}`} />

                            <div className="flex items-start justify-between mb-6 relative z-10">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cert.isEarned ? `bg-${cert.color}-50 text-${cert.color}-600` : 'bg-slate-200 text-slate-400'}`}>
                                    <Award className="w-7 h-7" />
                                </div>
                                {cert.isEarned ? (
                                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none gap-1 pl-1 pr-3 py-1">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Ansaittu
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="text-slate-400 border-slate-300 gap-1 pl-1 pr-3 py-1 bg-white">
                                        <Lock className="w-3 h-3" /> Lukittu
                                    </Badge>
                                )}
                            </div>

                            <div className="space-y-3 relative z-10">
                                <h3 className={`text-2xl font-black uppercase tracking-tight ${cert.isEarned ? 'text-slate-900' : 'text-slate-400'}`}>
                                    {cert.title}
                                </h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                    {cert.description}
                                </p>

                                {!cert.isEarned && (
                                    <div className="mt-4 pt-4 border-t border-slate-200/50">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vaatimus:</p>
                                        <p className="text-xs text-slate-500 mt-1">{cert.requirements}</p>
                                    </div>
                                )}
                            </div>

                            {cert.isEarned && (
                                <div className="mt-8 flex gap-3">
                                    <Button className="flex-1 bg-slate-900 text-white hover:bg-blue-600 transition-colors gap-2 rounded-xl h-12 font-bold text-xs uppercase tracking-widest shadow-lg shadow-slate-200/50">
                                        <Download className="w-4 h-4" /> Lataa PDF
                                    </Button>
                                    <Button variant="outline" className="h-12 w-12 rounded-xl border-slate-200 hover:border-blue-300 hover:text-blue-600 p-0">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </Card>
                    </div>
                ))}
            </div>

            {/* Employers Section */}
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 shadow-xl shadow-blue-200">
                    <FileText className="w-9 h-9" />
                </div>
                <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-black text-blue-900 uppercase tracking-tight">Työnantajalle</h3>
                    <p className="text-blue-800/80 max-w-xl">
                        Voit ladata koosteen kaikista suoritetuista opinnoista. Tämä dokumentti toimii virallisena todistuksena Turvasiipi-valmennuksen suorittamisesta.
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 rounded-full font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 text-xs">
                    <Printer className="w-4 h-4 mr-2" /> Luo Emoyhteenveto
                </Button>
            </div>
        </div>
    );
};
