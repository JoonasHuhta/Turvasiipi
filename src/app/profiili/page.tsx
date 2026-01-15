"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Shield,
    Settings,
    Download,
    Trash2,
    User,
    Key,
    Activity,
    Trophy,
    Award,
    Zap,
    Target,
    ChevronRight,
    Star,
    CircleCheck,
    Home,
    Brain,
    Wrench,
    Heart,
    Gamepad,
    Building,
    GraduationCap,
    Sparkles,
    LayoutGrid,
    BarChart3
} from "lucide-react";
import { useProgress, BADGES, MODULES, CategoryId } from "@/context/ProgressContext";
import { EXPERT_LEVELS } from "@/lib/gamification-data";

const CATEGORY_MAP: Record<CategoryId, { label: string, icon: any }> = {
    'CORE': { label: "PERUSTEET", icon: Home },
    'AWARENESS': { label: "TIETOISUUS", icon: Brain },
    'TOOLS': { label: "VÄLINEET", icon: Wrench },
    'SUPPORT': { label: "TUKI", icon: Heart },
    'INTERACTIVE': { label: "VUOROVAIKUTUS", icon: Gamepad },
    'ORGANIZATION': { label: "ORGANISAATIO", icon: Building },
    'LEARNING': { label: "OPPIMINEN", icon: GraduationCap },
    'SPECIAL': { label: "ERITYISET", icon: Sparkles }
};

export default function ProfilePage() {
    const {
        progress,
        getLevel,
        getExpertiseLevel,
        getCertificationProgress,
        getProgressPercentage,
        isModuleCompleted
    } = useProgress();

    const currentLevelNumber = getLevel();
    const { totalScore, level: expertise, subLevel } = getExpertiseLevel();
    const certProgress = getCertificationProgress();
    const overallProgress = getProgressPercentage();

    // Group modules by category
    const modulesByCategory = MODULES.reduce((acc, module) => {
        if (!acc[module.categoryId]) acc[module.categoryId] = [];
        acc[module.categoryId].push(module);
        return acc;
    }, {} as Record<CategoryId, typeof MODULES>);

    // Map badges for display
    const earnedBadgesCount = progress.earnedBadgeIds.length;

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in py-12 px-6">
            {/* Header section remains common */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest">Käyttäjäprofiili</span>
                    <h1 className="text-4xl font-serif font-bold text-[#2B2B2B]">Saavutuksesi</h1>
                    <p className="text-lg text-[#4A4A4A]">Kehityksesi ja keräämäsi asiantuntijuus.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-[#E8DDD0] hover:border-[#5B4B8A] text-[#2B2B2B]">
                        <Download className="w-4 h-4 mr-2" /> Vie tiedot
                    </Button>
                    <Button variant="outline" className="border-[#E8DDD0] hover:border-[#5B4B8A] text-[#2B2B2B]">
                        <Settings className="w-4 h-4 mr-2" /> Asetukset
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="kunniataulu" className="w-full">
                <TabsList className="bg-[#FDFBF7] border border-[#E8DDD0] p-1 mb-8 w-full flex justify-start sm:w-auto h-auto overflow-x-auto overflow-y-hidden no-scrollbar">
                    <TabsTrigger value="kunniataulu" className="data-[state=active]:bg-[#5B4B8A] data-[state=active]:text-white py-2.5 px-6 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <Trophy className="w-3.5 h-3.5" /> Kunniataulu
                    </TabsTrigger>
                    <TabsTrigger value="osiot" className="data-[state=active]:bg-[#5B4B8A] data-[state=active]:text-white py-2.5 px-6 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <LayoutGrid className="w-3.5 h-3.5" /> Osiot
                    </TabsTrigger>
                    <TabsTrigger value="tilastot" className="data-[state=active]:bg-[#5B4B8A] data-[state=active]:text-white py-2.5 px-6 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <BarChart3 className="w-3.5 h-3.5" /> Tilastot
                    </TabsTrigger>
                </TabsList>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-2 space-y-8">
                        {/* Kunniataulu Tab */}
                        <TabsContent value="kunniataulu" className="mt-0 space-y-8">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {BADGES.map((badge) => {
                                    const isEarned = progress.earnedBadgeIds.includes(badge.id);
                                    return (
                                        <Card key={badge.id} className={`border-[#E8DDD0] bg-white transition-all group relative overflow-hidden ${isEarned ? 'hover:border-[#5B4B8A] border-b-2 border-b-emerald-500' : 'opacity-60 saturate-0'}`}>
                                            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                                                <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">{isEarned ? badge.icon : '🔒'}</div>
                                                <div className="space-y-1">
                                                    <div className={`text-[11px] font-black uppercase tracking-tight ${isEarned ? 'text-[#2B2B2B]' : 'text-[#4A4A4A]'}`}>
                                                        {isEarned ? badge.title : 'Lukittu'}
                                                    </div>
                                                    <div className="text-[10px] text-[#4A4A4A] leading-tight min-h-[32px] line-clamp-2">
                                                        {isEarned ? badge.description : 'Jatka käyttöä ansaitaksesi tämän.'}
                                                    </div>
                                                </div>
                                                {isEarned && (
                                                    <div className="absolute top-2 right-2">
                                                        <CircleCheck className="w-3 h-3 text-emerald-500" />
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </TabsContent>

                        {/* Osiot Tab */}
                        <TabsContent value="osiot" className="mt-0 space-y-8">
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {(Object.keys(CATEGORY_MAP) as CategoryId[]).map((catId) => {
                                    const catModules = modulesByCategory[catId] || [];
                                    const completedInCat = catModules.filter(m => isModuleCompleted(m.id)).length;
                                    const Icon = CATEGORY_MAP[catId].icon;

                                    if (catModules.length === 0) return null;

                                    return (
                                        <AccordionItem key={catId} value={catId} className="border border-[#E8DDD0] bg-white rounded-md overflow-hidden shadow-sm px-4">
                                            <AccordionTrigger className="hover:no-underline py-6">
                                                <div className="flex items-center gap-4 text-left">
                                                    <div className="p-3 rounded-md bg-[#FDFBF7] text-[#5B4B8A]">
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[12px] font-black uppercase tracking-widest text-[#2B2B2B]">
                                                            {CATEGORY_MAP[catId].label}
                                                        </div>
                                                        <div className="text-[10px] text-[#5B4B8A] font-bold">
                                                            {completedInCat} / {catModules.length} SUORITETTU
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-6">
                                                <div className="space-y-4 mt-2 pl-2">
                                                    {catModules.map((m) => {
                                                        const isDone = isModuleCompleted(m.id);
                                                        return (
                                                            <div key={m.id} className="flex items-center justify-between text-sm group">
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isDone ? 'bg-emerald-500 border-emerald-500' : 'border-[#E8DDD0]'}`}>
                                                                        {isDone && <CircleCheck className="w-3 h-3 text-white" />}
                                                                    </div>
                                                                    <span className={`${isDone ? 'text-[#2B2B2B] font-medium' : 'text-[#4A4A4A]'}`}>{m.title}</span>
                                                                </div>
                                                                <div className="text-[10px] font-mono font-bold text-[#5B4B8A] opacity-60 group-hover:opacity-100 transition-opacity">
                                                                    +{m.points} pts
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    );
                                })}
                            </Accordion>
                        </TabsContent>

                        {/* Tilastot Tab */}
                        <TabsContent value="tilastot" className="mt-0 space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <Card className="border-[#E8DDD0] bg-white shadow-sm overflow-hidden border-b-4 border-b-[#5B4B8A]">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#5B4B8A]">Pisteet</span>
                                            <Star className="w-4 h-4 text-[#5B4B8A]" />
                                        </div>
                                        <div className="text-4xl font-black text-[#2B2B2B]">{progress.points}</div>
                                        <div className="text-sm text-[#4A4A4A] mt-1">Yhteensä kerätty</div>
                                    </CardContent>
                                </Card>
                                <Card className="border-[#E8DDD0] bg-white shadow-sm overflow-hidden border-b-4 border-b-emerald-500">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600">Edistyminen</span>
                                            <Target className="w-4 h-4 text-emerald-500" />
                                        </div>
                                        <div className="text-4xl font-black text-[#2B2B2B]">{overallProgress}%</div>
                                        <div className="text-sm text-[#4A4A4A] mt-1">Koko sovelluksesta</div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card className="border-[#E8DDD0] bg-white shadow-sm overflow-hidden">
                                <CardHeader className="bg-[#FDFBF7] border-b border-[#E8DDD0]">
                                    <CardTitle className="text-sm font-mono uppercase tracking-widest flex items-center gap-2">
                                        <Trophy className="w-4 h-4 text-[#5B4B8A]" /> Asiantuntijuusprofiili
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="flex items-start gap-6">
                                        <div className="text-6xl">{expertise.icon}</div>
                                        <div className="space-y-2">
                                            <h2 className="text-2xl font-bold text-[#2B2B2B]">{expertise.name}: {subLevel.title}</h2>
                                            <p className="text-[#4A4A4A] leading-relaxed italic">&quot;{subLevel.description}&quot;</p>
                                        </div>
                                    </div>
                                    <div className="mt-8 p-4 bg-emerald-50 border border-emerald-100 rounded-sm">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">Palaute</h4>
                                        <p className="text-sm text-emerald-900 leading-relaxed">{subLevel.feedback}</p>
                                    </div>
                                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {subLevel.hints.map((hint: string, idx: number) => (
                                            <div key={idx} className="flex items-start gap-2 text-sm text-[#4A4A4A]">
                                                <CircleCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                                <span>{hint}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </div>

                    {/* Sidebar Areas (Consistent across tabs) */}
                    <div className="space-y-8">
                        {/* Expertise Summary Card */}
                        <Card className="border-[#E8DDD0] bg-white shadow-sm overflow-hidden border-t-4 border-t-[#5B4B8A]">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#5B4B8A]">Taso {currentLevelNumber}</span>
                                    <div className="text-2xl">{expertise.icon}</div>
                                </div>
                                <div>
                                    <div className="text-xl font-black text-[#2B2B2B] uppercase tracking-tight">{expertise.name}</div>
                                    <div className="text-[11px] text-[#4A4A4A] font-medium italic">{subLevel.title}</div>
                                </div>
                                {expertise.id < 7 && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                                            <span className="text-[#4A4A4A]">Seuraava: {EXPERT_LEVELS[expertise.id].name}</span>
                                            <span className="text-[#5B4B8A]">{EXPERT_LEVELS[expertise.id].minPoints - progress.points} pts</span>
                                        </div>
                                        <Progress value={(progress.points / EXPERT_LEVELS[expertise.id].minPoints) * 100} className="h-1.5" />
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Certification Progress */}
                        <Card className="border-[#E8DDD0] bg-white shadow-sm overflow-hidden">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-mono uppercase tracking-widest text-[#4A4A4A]">Sertifiointi</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-2xl font-black text-[#5B4B8A]">{certProgress.percentage}%</span>
                                    <span className="text-[10px] text-[#4A4A4A] mb-1">{certProgress.completed} / {certProgress.total} moduulia</span>
                                </div>
                                <Progress value={certProgress.percentage} className="h-2 bg-[#FDFBF7]" />
                                <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
                                    Suorita kaikki {certProgress.total} sertifiointimoduulia saadaksesi &quot;Kiusaamisen Lukutaito&quot; -sertifikaatin.
                                </p>
                                <Button variant="link" className="p-0 h-auto text-[11px] font-bold text-[#5B4B8A] uppercase tracking-wider">
                                    Jatka valmennusta <ChevronRight className="w-3 h-3 ml-1" />
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Session Box */}
                        <Card className="border-[#E8DDD0] bg-[#FDFBF7] shadow-sm rounded-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#4A4A4A]">
                                    <Key className="w-3.5 h-3.5" /> Suojaus
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 space-y-4">
                                <div className="text-[10px] text-[#4A4A4A] leading-relaxed">
                                    Tiedot tallennetaan paikallisesti selaimeesi.
                                    Ne eivät poistu istunnon päätyttyä, mutta tyhjentämällä selaustiedot menetät kaiken edistymisen.
                                </div>
                                <Button variant="destructive" className="w-full text-[10px] h-8 font-bold uppercase bg-red-50 text-red-700 border border-red-100 hover:bg-red-100">
                                    <Trash2 className="w-3 h-3 mr-2" /> Tyhjennä profiili
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Tabs>
        </div>
    );
}

