"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface YouthEndingProps {
    currentPhaseId: string;
    onExit: () => void;
}

export function YouthEnding({ currentPhaseId, onExit }: YouthEndingProps) {
    const isGrowth = currentPhaseId === 'END_GROWTH';
    const isBurnout = currentPhaseId === 'END_BURNOUT';

    return (
        <div className="fixed inset-0 z-[100] bg-slate-50 text-slate-900 flex items-center justify-center p-4 overflow-y-auto no-scrollbar">
            <Card className="max-w-2xl w-full border-0 shadow-2xl overflow-hidden bg-white relative">
                <div className={cn("h-3 w-full", isGrowth ? "bg-emerald-500" : "bg-rose-500")} />

                <div className="p-8 md:p-12 text-center space-y-8">
                    <div className="text-6xl mb-4 animate-in zoom-in duration-500">
                        {isGrowth ? '🌱' : '📉'}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        {isGrowth ? "Toimijuus palautettu" : (isBurnout ? "Lopputulos: Uupumus" : "Lopputulos: Leimautuminen")}
                    </h1>

                    <div className="prose prose-slate prose-lg mx-auto text-slate-600 leading-relaxed">
                        {isGrowth && (
                            <p>
                                <strong>Onneksi olkoon.</strong> Tämä oli vaikein mahdollinen valinta. Kieltäydyit ottamasta syytä niskoillesi asiasta,
                                joka kuului johdon vastuulle. Vaikka tilanne oli epämukava, säilytit itsekunnioituksesi.
                                Tämä taito suojaa sinua koko loppu-urasi ajan.
                            </p>
                        )}
                        {isBurnout && (
                            <p>
                                Jäit odottamaan, että tilanne paranisi itsestään. Valitettavasti myrkyllisessä ympäristössä hiljaisuus tulkitaan luvaksi jatkaa.
                                Moni nuori uupuu juuri näin. Muista: sinulla on lupa lähteä.
                            </p>
                        )}
                        {!isGrowth && !isBurnout && (
                            <p>
                                Annoit tunteiden viedä. Se on inhimillistä, mutta valitettavasti tässä ympäristössä se antoi heille aseen sinua vastaan.
                                Seuraavalla kerralla: kirjaa faktat, ja puhu rakenteista.
                            </p>
                        )}
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-left">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                            <Brain className="w-4 h-4" />
                            Oppimiskokemus
                        </h3>
                        <div className="space-y-3 text-sm text-slate-700">
                            <p>✅ <strong>Tärkein oppi:</strong> Jos työpaikka vaatii sinua kestämään huonoa kohtelua, vika ei ole sinussa.</p>
                            <p>🛡️ <strong>Suojakeino:</strong> Dokumentoi aina perehdytyksen puutteet sähköpostiin ("Varmistan vain, että ymmärsin oikein...").</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-full px-8" onClick={onExit}>
                            Palaa Nuoret-sivulle
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 rounded-full px-8" onClick={() => window.location.reload()}>
                            Kokeile toisella valinnalla
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
