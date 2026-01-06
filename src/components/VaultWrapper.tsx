"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Unlock, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface VaultWrapperProps {
    isLocked: boolean;
    hasData: boolean;
    onUnlock: (pin: string) => boolean;
    children: React.ReactNode;
}

export function VaultWrapper({ isLocked, hasData, onUnlock, children }: VaultWrapperProps) {
    const [pinInput, setPinInput] = useState("");
    const [error, setError] = useState(false);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        const success = onUnlock(pinInput);
        if (!success) {
            setError(true);
            setPinInput("");
        } else {
            setError(false);
        }
    };

    if (!isLocked) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[500px] animate-in fade-in duration-500">
            <Card className="w-full max-w-md border-indigo-100 shadow-xl bg-white/90 backdrop-blur">
                <CardHeader className="text-center space-y-4 pb-2">
                    <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                        <Lock className="w-8 h-8 text-slate-600" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold text-slate-800">Turvaholvi suljettu</CardTitle>
                        <CardDescription className="text-slate-500 mt-2">
                            {hasData
                                ? "Tietosi on salattu. Syötä PIN-koodi avataksesi holvin."
                                : "Luo suojattu PIN-koodi aloittaaksesi salatun session."
                            }
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUnlock} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder={hasData ? "Syötä PIN-koodisi..." : "Keksi uusi PIN-koodi (4-8 numeroa)"}
                                value={pinInput}
                                onChange={(e) => {
                                    setPinInput(e.target.value);
                                    setError(false);
                                }}
                                className={`text-center text-lg h-14 tracking-widest ${error ? "border-red-400 bg-red-50" : "border-slate-200"}`}
                                maxLength={8}
                                autoFocus
                            />
                            {error && (
                                <p className="text-xs text-red-500 text-center font-medium animate-pulse flex items-center justify-center gap-1">
                                    <ShieldAlert className="w-3 h-3" /> Väärä PIN-koodi
                                </p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all shadow-lg hover:shadow-xl"
                            disabled={pinInput.length < 4}
                        >
                            {hasData ? <><Unlock className="w-4 h-4 mr-2" /> Avaa Holvi</> : <><Lock className="w-4 h-4 mr-2" /> Aseta PIN ja Aloita</>}
                        </Button>
                        <p className="text-xs text-center text-slate-400">
                            Huom: Jos unohdat PIN-koodin, tietoja ei voida palauttaa.
                            <br />Koodi ei tallennu palvelimelle.
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
