"use client";

import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export function PanicButton() {
    const handlePanic = () => {
        // Option 1: Just redirect immediately (Fastest)
        window.location.href = "https://www.google.fi";

        // Option 2 (Optional): Clear sensitive session data if needed
        // sessionStorage.clear();
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 group">
            <Button
                variant="destructive"
                size="icon"
                className="h-14 w-14 rounded-full shadow-2xl bg-red-600 hover:bg-red-700 border-4 border-white/20 transition-transform hover:scale-110"
                onClick={handlePanic}
                title="Hätäpoistuminen (Panic Button)"
            >
                <XCircle className="h-8 w-8 text-white" />
            </Button>
            <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold uppercase tracking-wider">
                Sulje heti
            </div>
        </div>
    );
}
