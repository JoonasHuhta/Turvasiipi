"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ManagerEndingProps {
    onExit: () => void;
}

export function ManagerEnding({ onExit }: ManagerEndingProps) {
    return (
        <div className="fixed inset-0 z-[100] bg-slate-950 text-white flex items-center justify-center p-4 overflow-y-auto no-scrollbar">
            <Card className="max-w-3xl w-full bg-slate-900 border-red-900/30 p-6 md:p-12 text-center space-y-6 shadow-2xl shadow-red-900/10 relative">
                <div className="text-6xl mb-4 grayscale opacity-50">
                    📉
                </div>

                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                    Simulaatio päättynyt
                </h1>

                <div className="prose prose-invert prose-lg mx-auto text-slate-400">
                    <p>
                        Olet nähnyt, miten "tehokas" johtaminen voi tuhota työyhteisön.
                        Pienet, rationalisoidut valinnat kasautuivat järjestelmäviaksi.
                    </p>
                </div>

                <div className="bg-red-950/30 p-4 md:p-6 rounded-xl text-left space-y-6 border border-red-900/30">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Tuhon Anatomia
                    </h3>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Inhimillinen */}
                        <div className="space-y-2">
                            <div className="text-xs text-red-300/60 uppercase font-semibold">Inhimillinen romahdus</div>
                            <div className="text-lg font-medium text-red-200">Vakava työuupumus</div>
                            <p className="text-xs text-red-300/70 leading-relaxed">
                                Antti jäi 6 kk sairauslomalle. Kaksi muuta tiimiläistä on irtisanoutunut pelon ilmapiirin takia.
                            </p>
                        </div>

                        {/* Taloudellinen */}
                        <div className="space-y-2">
                            <div className="text-xs text-red-300/60 uppercase font-semibold">Taloudellinen isku</div>
                            <div className="text-2xl font-mono text-white">~112 000 €</div>
                            <div className="text-xs text-slate-500 space-y-1 bg-black/20 p-2 rounded">
                                <div className="flex justify-between"><span>Sairauspoissaolot:</span> <span className="text-slate-400">35 000€</span></div>
                                <div className="flex justify-between"><span>Rekrytointi (2 hlö):</span> <span className="text-slate-400">25 000€</span></div>
                                <div className="flex justify-between"><span>Tuottavuusvaje:</span> <span className="text-slate-400">52 000€</span></div>
                            </div>
                        </div>

                        {/* Mainehaitta */}
                        <div className="space-y-2">
                            <div className="text-xs text-red-300/60 uppercase font-semibold">Mainehaitta</div>
                            <div className="text-lg font-medium text-red-200">Korjaamaton vahinko</div>
                            <p className="text-xs text-red-300/70 leading-relaxed">
                                Sisäpiirin tiedot huonosta johtamisesta ovat levinneet. Rekrytointi on vaikeutunut ja brändimielikuva on romahtanut.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Button size="lg" variant="default" className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 h-12 rounded-full px-8" onClick={onExit}>
                        Palaa etusivulle
                    </Button>
                    <Button size="lg" variant="outline" className="border-red-900/30 text-red-400 hover:bg-red-950/30 hover:text-red-300 h-12 rounded-full px-8" onClick={() => window.location.reload()}>
                        Yritä uudelleen
                    </Button>
                </div>
            </Card>
        </div>
    );
}
