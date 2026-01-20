"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Construction, Lock } from "lucide-react";
import { useRouter } from 'next/navigation';

interface ComingSoonModuleProps {
    moduleId: string;
    title?: string;
    description?: string;
    onExit: () => void;
}

export default function ComingSoonModule({ moduleId, title, description, onExit }: ComingSoonModuleProps) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-8 text-center space-y-6 bg-white/50 backdrop-blur-sm border-slate-200 shadow-xl rounded-3xl">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Construction className="w-10 h-10 text-slate-400" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                        Tulossa Pian
                    </h2>
                    {title && (
                        <p className="text-lg font-medium text-slate-600">
                            {title}
                        </p>
                    )}
                    <p className="text-slate-500 leading-relaxed text-sm">
                        Tämä valmennusmoduuli on vielä kehityksessä.
                        Tiimimme työskentelee parhaillaan sisällön parissa.
                    </p>
                </div>

                <div className="pt-4 flex justify-center gap-4">
                    <Button
                        onClick={onExit}
                        variant="ghost"
                        size="lg"
                        className="rounded-xl hover:bg-slate-100 text-slate-600"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Palaa listaukseen
                    </Button>
                </div>

                <div className="text-[10px] text-slate-300 uppercase tracking-widest font-mono pt-8">
                    Module ID: {moduleId}
                </div>
            </Card>
        </div>
    );
}
