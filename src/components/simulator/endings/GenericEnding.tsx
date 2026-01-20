"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { GameStats, LogEntry } from "@/lib/simulator/types";

interface GenericEndingProps {
    currentPhaseId: string;
    stats: GameStats;
    logEntries: LogEntry[];
    allies: string[];
    onExit: () => void;
}

export function GenericEnding({ currentPhaseId, stats, logEntries, allies, onExit }: GenericEndingProps) {
    return (
        <div className="fixed inset-0 z-[100] bg-slate-950 text-white flex items-center justify-center p-4 overflow-y-auto no-scrollbar">
            <Card className="max-w-2xl w-full bg-slate-900 border-white/10 p-8 md:p-12 text-center space-y-8 shadow-2xl relative">
                <div className="text-6xl mb-4 animate-in zoom-in duration-700">
                    {currentPhaseId === 'END_C' ? '🛡️' : '💔'}
                </div>

                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                    {currentPhaseId === 'END_A' && "Lopputulos: Uupumus"}
                    {currentPhaseId === 'END_B' && "Lopputulos: Irtisanoutuminen"}
                    {currentPhaseId === 'END_C' && "Lopputulos: Selviytyminen"}
                </h1>

                <div className="prose prose-invert prose-lg mx-auto text-slate-300">
                    {currentPhaseId === 'END_A' && (
                        <p>Jatkoit sinnittelyä ilman tukea. Terveytesi petti ennen kuin ehdit reagoida. Tämä on valitettavan yleinen tarina hoitoalalla.</p>
                    )}
                    {currentPhaseId === 'END_B' && (
                        <p>Päätit suojella itseäsi poistumalla tilanteesta. Se on rohkea teko, mutta samalla menetys alalle.</p>
                    )}
                    {currentPhaseId === 'END_C' && (
                        <p>Otit Turvasiiven käyttöösi. Dokumentointi antoi sinulle faktatietoa, ja yhteisön tuki voimaa. Taistelu ei ole ohi, mutta et ole enää yksin.</p>
                    )}
                </div>

                <div className="bg-white/5 p-6 rounded-2xl text-left space-y-2 border border-white/5 backdrop-blur-sm shadow-inner">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Sinun tarinasi tilastot
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Logimerkintöjä</div>
                            <div className="text-4xl font-black text-white">{logEntries.length}<span className="text-lg text-slate-700 ml-2">kpl</span></div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Liittolaisia</div>
                            <div className="text-4xl font-black text-white">{allies.length}</div>
                        </div>
                        <div>
                            <div className="text-xs text-emerald-500 uppercase font-bold tracking-widest mb-1">Suoritus</div>
                            <div className="text-4xl font-black text-white">
                                {Math.round((stats.selfEsteem * 0.4) + (stats.hope * 0.4) + (stats.teamAcceptance * 0.2))}
                                <span className="text-lg text-slate-700 ml-1">/100</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Button size="lg" variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-full px-8 font-bold" onClick={onExit}>
                        Palaa etusivulle
                    </Button>
                    <Button size="lg" variant="outline" className="border-white/10 text-slate-400 hover:bg-white/5 h-12 rounded-full px-8" onClick={() => window.location.reload()}>
                        Yritä uudelleen
                    </Button>
                </div>
            </Card>
        </div>
    );
}
