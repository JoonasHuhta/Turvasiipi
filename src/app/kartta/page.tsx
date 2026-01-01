"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Sun, Cloud, CloudRain, Zap, MapPin, Building2, Info,
    ArrowUpRight, ShieldCheck, Users, MessageSquare,
    TrendingUp, BarChart3, PieChart, Activity, X, Search, Star, MessageSquarePlus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { calculateSafetyScore, getMockReports, RawReport } from "@/lib/map-logic";

const allIndustries = ["Kaikki", "Sote", "IT", "Opetus", "Teollisuus", "Kauppa", "Hallinto"];

// --- Mock Data ---
const mockRegionalData = [
    { city: "Helsinki", status: "cloudy", reports: 154, severity: 6.5 },
    { city: "Tampere", status: "stormy", reports: 89, severity: 8.2 },
    { city: "Turku", status: "rainy", reports: 72, severity: 5.8 },
    { city: "Oulu", status: "sunny", reports: 45, severity: 3.2 },
];

const mockIndustryTrends = [
    { sector: "Sote", trend: [20, 35, 45, 40, 60, 85], severity: 8.5 },
    { sector: "IT", trend: [15, 12, 18, 25, 22, 28], severity: 4.8 },
];

const bullyingTypes = [
    { type: "Ulkopuolelle jättäminen", value: 35, color: "bg-blue-500" },
    { type: "Sanallinen häirintä", value: 25, color: "bg-purple-500" },
    { type: "Työn rajoittaminen", value: 20, color: "bg-yellow-500" },
    { type: "Aseman väärinkäyttö", value: 15, color: "bg-red-500" },
    { type: "Muu", value: 5, color: "bg-slate-400" },
];

const mockStories = [
    { user: "Heidikka", text: "Kun näin sääkartalla, että muillakin on vaikeaa, tunsin herääväni unesta. En ole yksin.", industry: "Sote" },
    { user: "Matti82", text: "Dokumentointi auttoi saamaan otteen todellisuudesta. Nyt kartta näyttää totuuden.", industry: "Teollisuus" },
];

// --- Helpers ---
const getStatusIcon = (status: string, size = "w-6 h-6") => {
    switch (status) {
        case "sunny": return <Sun className={`${size} text-yellow-500`} />;
        case "cloudy": return <Cloud className={`${size} text-slate-400`} />;
        case "rainy": return <CloudRain className={`${size} text-blue-400`} />;
        case "stormy": return <Zap className={`${size} text-purple-500`} />;
        default: return <Sun className={`${size} text-yellow-500`} />;
    }
};

const getStatusLabel = (status: string) => {
    switch (status) {
        case "sunny": return "Reilu";
        case "cloudy": return "Vaihteleva";
        case "rainy": return "Haasteita";
        case "stormy": return "Myrsky";
        default: return "Normaali";
    }
};

// --- Components ---

const FinlandMap = ({ onCitySelect, selectedCity }: { onCitySelect: (city: string) => void, selectedCity: string | null }) => {
    // Simplified SVG paths for a stylized Finland map
    return (
        <div className="relative w-full aspect-[2/3] max-h-[500px] flex items-center justify-center p-4">
            <svg viewBox="0 0 200 400" className="w-full h-full text-slate-200 fill-current drop-shadow-2xl">
                <path d="M100,5 C120,20 130,50 140,80 C150,110 160,130 150,160 C140,190 130,220 120,250 C110,280 100,310 90,340 C80,370 70,390 60,395 C50,390 40,370 35,340 C30,310 35,280 45,250 C55,220 65,190 60,160 C55,130 45,110 55,80 C65,50 80,20 100,5 Z" />
            </svg>
            {/* City Markers */}
            <motion.button
                whileHover={{ scale: 1.2 }}
                onClick={() => onCitySelect("Helsinki")}
                className={`absolute top-[80%] left-[45%] p-2 rounded-full border-2 border-white shadow-lg cursor-pointer group transition-colors ${selectedCity === "Helsinki" ? "bg-primary text-white scale-125 z-10" : "bg-primary"}`}
            >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white p-2 rounded text-xs whitespace-nowrap font-bold">Helsinki (6.5)</div>
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.2 }}
                onClick={() => onCitySelect("Tampere")}
                className={`absolute top-[75%] left-[40%] p-2 rounded-full border-2 border-white shadow-lg cursor-pointer group transition-colors ${selectedCity === "Tampere" ? "bg-red-500 text-white scale-125 z-10" : "bg-red-500"}`}
            >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white p-2 rounded text-xs whitespace-nowrap font-bold">Tampere (8.2)</div>
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.2 }}
                onClick={() => onCitySelect("Turku")}
                className={`absolute top-[78%] left-[30%] p-1.5 rounded-full border-2 border-white shadow-lg cursor-pointer group transition-colors ${selectedCity === "Turku" ? "bg-blue-500 text-white scale-125 z-10" : "bg-blue-500"}`}
            >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white p-2 rounded text-xs whitespace-nowrap font-bold">Turku (5.8)</div>
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.2 }}
                onClick={() => onCitySelect("Oulu")}
                className={`absolute top-[50%] left-[55%] p-1 rounded-full border-2 border-white shadow-lg cursor-pointer group transition-colors ${selectedCity === "Oulu" ? "bg-yellow-400 text-white scale-125 z-10" : "bg-yellow-400"}`}
            >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white p-2 rounded text-xs whitespace-nowrap font-bold">Oulu (3.2)</div>
            </motion.button>
        </div>
    );
};

const SimpleLineChart = ({ data, color }: { data: number[], color: string }) => {
    const max = Math.max(...data);
    const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d / max) * 100}`).join(" ");
    return (
        <svg viewBox="0 0 100 100" className={`w-full h-16 ${color}`}>
            <motion.polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
            />
        </svg>
    );
};

const DonutChart = ({ value, color = "stroke-slate-900" }: { value: number, color?: string }) => {
    return (
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="15" fill="none" />
                <motion.circle
                    cx="50" cy="50" r="40"
                    className={color}
                    strokeWidth="15" fill="none"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 * (1 - value / 100) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black">{value}%</span>
                <span className="text-[10px] uppercase text-muted-foreground">Osuus</span>
            </div>
        </div>
    );
};

// --- Main Component ---

export default function KarttaPage() {
    const [mounted, setMounted] = useState(false);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [selectedSector, setSelectedSector] = useState("Kaikki");

    useEffect(() => {
        setMounted(true);
    }, []);

    // Generate simulated DB reports for each city
    const allReports: RawReport[] = useMemo(() => {
        return [
            ...getMockReports("Helsinki"),
            ...getMockReports("Tampere"),
            ...getMockReports("Turku"),
            ...getMockReports("Oulu"),
            ...getMockReports("Jyväskylä"),
            ...getMockReports("Kuopio"),
        ];
    }, []);

    // Active data based on filters
    const regionalFinalData = useMemo(() => {
        return ["Helsinki", "Tampere", "Turku", "Oulu", "Jyväskylä", "Kuopio"].map(city => {
            const cityReports = allReports.filter(r => r.city === city && (selectedSector === "Kaikki" || r.industry === selectedSector));
            return {
                city,
                ...calculateSafetyScore(cityReports),
                reports: cityReports.length
            };
        });
    }, [allReports, selectedSector]);

    const cityDetails = useMemo(() => {
        if (!selectedCity) return null;
        const base = regionalFinalData.find(d => d.city === selectedCity);
        if (!base) return null;

        // Calculate industry ranking for this city
        const rankings = allIndustries.filter(i => i !== "Kaikki").map(ind => {
            const indReports = allReports.filter(r => r.city === selectedCity && r.industry === ind);
            return {
                sector: ind,
                score: calculateSafetyScore(indReports).score
            };
        }).sort((a, b) => b.score - a.score);

        return {
            ...base,
            rankings,
            hope: base.score > 8.5 ? "Tämä työyhteisö on saanut kiitosta avoimuudesta." : null,
            isGold: base.score > 9.0
        };
    }, [selectedCity, regionalFinalData, allReports]);

    const getColorClass = (color: string) => {
        if (color === "red") return "bg-red-500 text-white";
        if (color === "yellow") return "bg-yellow-400 text-slate-900";
        return "bg-emerald-500 text-white";
    };

    if (!mounted) return <div className="min-h-screen animate-pulse bg-slate-50/50" />;

    return (
        <div className="space-y-8 py-8 animate-in fade-in duration-700">
            {/* --- HEADER --- */}
            <section className="text-center space-y-4 px-4">
                <div className="flex flex-wrap justify-center gap-2">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                        <ShieldCheck className="w-3.5 h-3.5" /> 100% Anonyymi
                    </div>
                    <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg overflow-hidden">
                        <Activity className="w-3.5 h-3.5 text-primary animate-pulse shrink-0" /> <span className="truncate">Live-todellisuus</span>
                    </div>
                </div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-3xl sm:text-4xl md:text-7xl font-black tracking-tight text-primary uppercase leading-none drop-shadow-sm break-words"
                >
                    Totuus<span className="text-slate-900">kartta</span>
                </motion.h1>

                <div className="max-w-3xl mx-auto space-y-4">
                    <p className="text-lg md:text-2xl text-slate-900 font-bold leading-tight">
                        Värikoodattu reaaliaikainen näkymä Suomen työpaikkojen ilmapiiriin.
                    </p>
                    <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed px-2">
                        Tieto on suoja, ranking on muutosvoima. Tunnista, dokumentoi ja vaikuta.
                    </p>
                </div>
            </section>

            {/* --- FILTERS --- */}
            <div className="flex flex-wrap justify-center gap-3 py-2">
                {allIndustries.map(ind => (
                    <button
                        key={ind}
                        onClick={() => setSelectedSector(ind)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all border-2 ${selectedSector === ind
                            ? "bg-primary border-primary text-white shadow-md scale-105"
                            : "bg-white border-slate-100 text-slate-500 hover:border-primary/30"
                            }`}
                    >
                        {ind}
                    </button>
                ))}
            </div>

            {/* --- BENTO GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 auto-rows-max">

                {/* MAP WIDGET (Left) */}
                <Card className="md:col-span-4 md:row-span-2 border-2 shadow-xl overflow-hidden bg-slate-100/30">
                    <CardHeader className="p-6 pb-0">
                        <CardTitle className="flex items-center gap-2 text-xl font-black uppercase tracking-tight">
                            <MapPin className="w-5 h-5 text-primary" /> Alueellinen tilanne
                        </CardTitle>
                        <CardDescription>Indeksi: 🟢 Turvallinen 🟡 Neutraali 🔴 Myrsky</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="relative w-full aspect-[2/3] max-h-[500px] flex items-center justify-center p-4">
                            <svg viewBox="0 0 200 400" className="w-full h-full text-white fill-current drop-shadow-md">
                                <path d="M100,5 C120,20 130,50 140,80 C150,110 160,130 150,160 C140,190 130,220 120,250 C110,280 100,310 90,340 C80,370 70,390 60,395 C50,390 40,370 35,340 C30,310 35,280 45,250 C55,220 65,190 60,160 C55,130 45,110 55,80 C65,50 80,20 100,5 Z" />
                            </svg>
                            {regionalFinalData.map((d, i) => (
                                <motion.button
                                    key={d.city}
                                    whileHover={{ scale: 1.2 }}
                                    onClick={() => setSelectedCity(d.city)}
                                    style={{
                                        top: `${[80, 75, 78, 50, 68, 60][i]}%`,
                                        left: `${[45, 40, 30, 55, 48, 58][i]}%`
                                    }}
                                    className={`absolute p-2 rounded-full border-2 border-white shadow-xl cursor-pointer transition-all group ${getColorClass(d.color)} ${selectedCity === d.city ? "scale-150 ring-4 ring-primary/20 z-20" : "scale-100"}`}
                                >
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white p-2 rounded text-[10px] whitespace-nowrap font-black">
                                        {d.city} ({d.score})
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                        <div className="p-6 pt-0 space-y-2 max-h-[300px] overflow-y-auto">
                            {regionalFinalData.map((data) => (
                                <button
                                    key={data.city}
                                    onClick={() => setSelectedCity(data.city)}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all hover:bg-slate-50 text-left ${selectedCity === data.city ? "border-primary bg-primary/5" : "border-slate-100 bg-white"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${getColorClass(data.color)} shadow-sm`} />
                                        <span className="font-black text-sm uppercase tracking-tighter">{data.city}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {data.score > 9 && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                                        <Badge className={`font-black ${getColorClass(data.color)}`}>
                                            {data.score}
                                        </Badge>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* DYNAMIC CONTENT AREA (Middle) */}
                <div className="md:col-span-8 space-y-6">
                    {selectedCity && cityDetails ? (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <Card className="border-4 border-slate-900 shadow-2xl relative overflow-hidden bg-white">
                                <div className="absolute top-0 right-0 p-4 z-10">
                                    <Button variant="outline" size="icon" onClick={() => setSelectedCity(null)} className="rounded-full shadow-lg">
                                        <X className="w-6 h-6" />
                                    </Button>
                                </div>
                                <CardHeader className="bg-slate-900 text-white p-4 sm:p-8 pb-10 sm:pb-12 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <MapPin className="w-64 h-64" />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter break-words max-w-full">{selectedCity}</h2>
                                                {cityDetails.isGold && (
                                                    <Badge className="bg-yellow-500 text-black font-black flex items-center gap-1 py-1 shrink-0">
                                                        <Star className="w-3 h-3 fill-black" /> KULTA
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-lg sm:text-xl opacity-80 font-light italic">"{cityDetails.label}"</p>
                                        </div>
                                        <div className="text-right flex md:block items-baseline justify-between md:justify-end gap-2">
                                            <div className="text-5xl sm:text-7xl font-black text-primary leading-none">{cityDetails.score}</div>
                                            <div className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-60">Indeksi</div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-8 -mt-6 sm:-mt-8 relative z-20">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Left: Stats & Ranking */}
                                        <div className="space-y-6">
                                            <div className="bg-slate-50 border-2 border-slate-900/5 p-6 rounded-3xl space-y-4">
                                                <h3 className="font-black uppercase text-sm tracking-widest flex items-center gap-2">
                                                    <TrendingUp className="w-4 h-4 text-primary" /> Toimialojen Ranking
                                                </h3>
                                                <div className="space-y-3">
                                                    {cityDetails.rankings.slice(0, 5).map((r, i) => (
                                                        <div key={r.sector} className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-xs font-black text-slate-400 w-4">#{i + 1}</span>
                                                                <span className="font-bold text-sm">{r.sector}</span>
                                                            </div>
                                                            <Badge className={r.score > 8 ? "bg-emerald-500" : r.score > 5 ? "bg-yellow-400" : "bg-red-500"}>
                                                                {r.score.toFixed(1)}
                                                            </Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {cityDetails.hope && (
                                                <div className="bg-emerald-50 border-2 border-emerald-500/20 p-6 rounded-3xl flex items-center gap-4 animate-bounce-subtle">
                                                    <div className="bg-emerald-500 text-white p-3 rounded-2xl">
                                                        <Sun className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-emerald-900 text-sm uppercase">Toivon pilkahdus</h4>
                                                        <p className="text-emerald-800 text-xs italic">
                                                            "{cityDetails.hope}"
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right: Issues & CTA */}
                                        <div className="space-y-6">
                                            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
                                                <div>
                                                    <h3 className="font-black uppercase text-xs tracking-widest opacity-60 mb-4">Tyypillisimmät oireet</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {cityDetails.topIssues.map(issue => (
                                                            <Badge key={issue} className="bg-white/10 text-white border-white/20 px-3 py-1">
                                                                {issue}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-xs font-black uppercase tracking-tighter opacity-60">
                                                        <span>Aktiivisuus</span>
                                                        <span>{cityDetails.recentCount} uutta / 30pv</span>
                                                    </div>
                                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary" style={{ width: `${(cityDetails.recentCount / cityDetails.reports) * 100}%` }} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* CALL TO ACTIONS */}
                                            <div className="grid grid-cols-1 gap-3">
                                                <button className="flex items-center justify-between w-full p-5 bg-primary text-white rounded-2xl font-black uppercase text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all group">
                                                    <span>Olen kokenut tätä täällä</span>
                                                    <MessageSquarePlus className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                                </button>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <button className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-[10px] font-black uppercase tracking-tighter text-slate-600 transition-all">
                                                        Liity keskusteluun
                                                    </button>
                                                    <button className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-[10px] font-black uppercase tracking-tighter text-slate-600 transition-all">
                                                        Lue selviytymistarinoita
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
                            {/* DEFAULT DASHBOARD (Same as before but refined) */}
                            <div className="md:col-span-12 space-y-8">
                                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-slate-900 p-8 rounded-3xl text-white space-y-2 border-b-8 border-primary relative overflow-hidden">
                                        <div className="absolute -right-4 -bottom-4 opacity-10">
                                            <Users className="w-32 h-32" />
                                        </div>
                                        <div className="text-5xl font-black uppercase tracking-tighter">12.4k</div>
                                        <p className="text-xs uppercase font-black tracking-widest text-primary/80">Kansallinen voima</p>
                                    </div>
                                    <div className="bg-white border-2 border-slate-100 p-8 rounded-3xl space-y-2 relative overflow-hidden shadow-sm">
                                        <div className="absolute -right-4 -bottom-4 opacity-5">
                                            <Activity className="w-32 h-32" />
                                        </div>
                                        <div className="text-5xl font-black uppercase tracking-tighter text-slate-800">82%</div>
                                        <p className="text-xs uppercase font-black tracking-widest text-slate-400">Sote-paine nousussa</p>
                                    </div>
                                    <div className="bg-white border-2 border-slate-100 p-8 rounded-3xl space-y-2 relative overflow-hidden shadow-sm">
                                        <div className="absolute -right-4 -bottom-4 opacity-5">
                                            <Sun className="w-32 h-32" />
                                        </div>
                                        <div className="text-5xl font-black uppercase tracking-tighter text-slate-800">14</div>
                                        <p className="text-xs uppercase font-black tracking-widest text-slate-400">Kultan status -aluetta</p>
                                    </div>
                                </section>

                                <Card className="border-2 shadow-lg overflow-hidden">
                                    <CardHeader className="bg-slate-50 flex flex-row items-center justify-between border-b bg-gradient-to-r from-slate-50 to-white">
                                        <div>
                                            <CardTitle className="uppercase font-black text-xl">Kansallinen Toimialavaikutus</CardTitle>
                                            <CardDescription>Miten eri alat pärjäävät suhteessa toisiinsa</CardDescription>
                                        </div>
                                        <Badge className="bg-slate-900">Päivittyy live-datalla</Badge>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {mockIndustryTrends.map((trend) => (
                                                <div key={trend.sector} className="p-6 rounded-2xl border-2 border-slate-100 hover:border-primary/20 transition-all bg-white shadow-sm space-y-4">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{trend.sector}</h4>
                                                        <Badge className={trend.severity > 7 ? "bg-red-500" : "bg-emerald-500"}>
                                                            {10 - (trend.severity - 1)} / 10
                                                        </Badge>
                                                    </div>
                                                    <SimpleLineChart data={trend.trend} color={trend.severity > 7 ? "text-red-500" : "text-primary"} />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* --- IMPACT INFO BLOCK (Footer) --- */}
            <div className="bg-slate-900 text-white p-8 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <Zap className="w-64 h-64 text-primary" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                    <div className="lg:col-span-8 space-y-8">
                        <div className="inline-flex items-center gap-2 bg-white/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            <ShieldCheck className="w-3 h-3" /> 100% Anonyymi
                        </div>
                        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                            Tieto on <br />
                            <span className="text-primary">muutosvoimaa</span>
                        </h2>
                        <p className="text-lg md:text-xl font-light text-slate-400 leading-relaxed max-w-xl">
                            Työelämän sääkartta tekee "näkymättömästä epidemiasta" tilastollisen tosiasian.
                            Mitä enemmän meillä on dataa, sitä vaikeampi kiusaamista on sivuuttaa yhteiskunnallisessa keskustelussa.
                        </p>
                    </div>

                    <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-sm space-y-2 hover:bg-white/10 transition-colors">
                            <div className="text-4xl md:text-5xl font-black text-primary">82%</div>
                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-60">SOTE-paine</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-sm space-y-2 hover:bg-white/10 transition-colors">
                            <div className="text-4xl md:text-5xl font-black text-white">124k</div>
                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-60">Vaikuttavuus</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
