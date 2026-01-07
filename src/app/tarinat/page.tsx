"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Heart, Shield, Filter, Mail, Send, Calendar, Clock, Lock, Sparkles, Star, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { STORIES, StoryCategory, getStoryCounts } from "@/data/stories";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";

const categories: StoryCategory[] = [
    "Sote-ala",
    "IT ja teknologia",
    "Opetus ja koulutus",
    "Toimistotyö ja hallinto",
    "Ravintola ja kauppa",
    "Teollisuus ja rakentaminen",
    "Luova ala",
    "Neuromoninaisuus",
    "Muut"
];

const ReactionButton = ({ storyId, type, initialCount, serverCount }: { storyId: string, type: 'like' | 'heart', initialCount?: number, serverCount?: number }) => {
    const [reacted, setReacted] = useLocalStorage<boolean>(`reaction_${type}_${storyId}`, false);

    // Use server count if available (for likes), otherwise fallback to initial
    const baseCount = (type === 'like' && serverCount !== undefined) ? serverCount : (initialCount || 0);

    // Determines if we should optimistically add +1 (if user reacted but server doesn't know yet/we want instant feedback)
    // For simplicity: If we have a server count, we assume it *doesn't* include our current session's reaction yet IF we just clicked it. 
    // But to keep it simple: Just show baseCount + (reacted ? 1 : 0) is a bit naive if baseCount already has it.
    // Let's stick to the simple optimistic UI: 
    // Count = ServerCount + (Did I just react locally?) -> Actually, easier is just to trust ServerCount eventual consistency, 
    // but for instant feedback we render (baseCount) AND highlight the button. 
    // If I click, I increment locally.

    // Let's effectively ignore 'reacted' for the count number to avoid double counting if server updates fast, 
    // OR we can just assume server is truth.
    // Let's go with: display = baseCount. If I am 'reacted', I highlight button. 
    // When I click, I hit API. API updates DB. SWR/Polling would update baseCount.
    // Since we don't have SWR here, let's just increment a local offset.
    const [localOffset, setLocalOffset] = useState(0);

    const displayCount = baseCount + localOffset;

    const handleReact = async () => {
        if (type === 'like') {
            // Optimistic update
            const isReacting = !reacted;
            setReacted(isReacting);
            setLocalOffset(prev => isReacting ? prev + 1 : prev - 1); // allow toggle

            try {
                // Fire and forget (or await if we wanted to revert on error)
                await fetch('/api/stories/likes', {
                    method: 'POST',
                    body: JSON.stringify({ storyId }),
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (err) {
                console.error("Failed to like", err);
                // Revert
                setReacted(!isReacting);
                setLocalOffset(prev => isReacting ? prev - 1 : prev + 1);
            }
        } else {
            // Local only for hearts/views for now
            setReacted(!reacted);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleReact}
            className={cn(
                "gap-2 text-xs font-medium transition-colors hover:bg-slate-100",
                reacted && type === 'like' && "text-indigo-600 bg-indigo-50 hover:bg-indigo-100",
                reacted && type === 'heart' && "text-rose-600 bg-rose-50 hover:bg-rose-100"
            )}
        >
            {type === 'like' ? (
                <ThumbsUp className={cn("w-4 h-4", reacted && "fill-current")} />
            ) : (
                <Heart className={cn("w-4 h-4", reacted && "fill-current")} />
            )}
            {displayCount > 0 ? displayCount : ""}
        </Button>
    );
};

export default function TarinatPage() {
    const [selectedCategory, setSelectedCategory] = useState<StoryCategory | "Kaikki">("Kaikki");
    const [formName, setFormName] = useState("");
    const [formCategory, setFormCategory] = useState("");
    const [formText, setFormText] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [mounted, setMounted] = useState(false);
    const [serverLikes, setServerLikes] = useState<Record<string, number>>({});

    useEffect(() => {
        setMounted(true);
        // Fetch likes
        fetch('/api/stories/likes')
            .then(res => res.json())
            .then(data => setServerLikes(data))
            .catch(err => console.error("Failed to fetch likes", err));
    }, []);

    const storyCounts = useMemo(() => getStoryCounts(), []);

    const filteredStories = useMemo(() => {
        let stories = [...STORIES];
        if (selectedCategory !== "Kaikki") {
            stories = stories.filter(s => s.category === selectedCategory);
        }
        // Sort newest first
        return stories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [selectedCategory]);

    const handleMailtoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalAuthor = authorName.trim() || "Anonyymi";
        const subject = `Uusi tarina: ${formCategory} - ${formName}`;
        const body = `Nimi/Otsikko: ${formName}\nNimimerkki: ${finalAuthor}\nKategoria: ${formCategory}\n\nTarinani:\n${formText}`;
        const mailtoLink = `mailto:turvasiipi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Create a temporary link element and click it - this prevents blank tabs and is reliable
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!mounted) return <div className="p-10 text-center opacity-50">Ladataan...</div>;

    return (
        <div className="space-y-12 py-8 animate-in fade-in duration-700 pb-24">
            {/* --- HEADER --- */}
            <section className="text-center space-y-6 px-4">
                <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="secondary" className="px-3 py-1 text-xs uppercase tracking-widest font-bold">
                        <Users className="w-3 h-3 mr-2" /> Yhteisö
                    </Badge>
                </div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-slate-900 uppercase leading-none drop-shadow-sm"
                >
                    Yhteisön <span className="text-indigo-600">tarinat</span>
                </motion.h1>

                <div className="max-w-2xl mx-auto space-y-6">
                    <p className="text-xl text-slate-600 font-medium leading-relaxed">
                        Et ole yksin. Lue muiden kokemuksia ja jaa omasi.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start gap-3">
                            <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm">Validoi kokemuksesi</h3>
                                <p className="text-xs text-slate-500 mt-1">Huomaat, että ongelma ei ole sinussa.</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start gap-3">
                            <div className="bg-rose-100 p-2 rounded-lg text-rose-600">
                                <Heart className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm">Vähennä häpeää</h3>
                                <p className="text-xs text-slate-500 mt-1">Hiljaisuus murretaan puhumalla.</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start gap-3">
                            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm">Löydä voimaa</h3>
                                <p className="text-xs text-slate-500 mt-1">Selviytymistarinat luovat toivoa.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FILTERS --- */}
            <section className="px-4">
                <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                    <Button
                        variant={selectedCategory === "Kaikki" ? "default" : "outline"}
                        onClick={() => setSelectedCategory("Kaikki")}
                        className="rounded-full"
                    >
                        Kaikki
                    </Button>
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            onClick={() => setSelectedCategory(cat)}
                            className="rounded-full border-slate-200"
                        >
                            {cat} <span className="ml-2 opacity-60 text-xs">({storyCounts[cat] || 0})</span>
                        </Button>
                    ))}
                </div>
            </section>

            {/* --- STORIES GRID --- */}
            <section className="px-4 max-w-5xl mx-auto">
                {filteredStories.length === 0 ? (
                    <Card className="bg-slate-50 border-dashed border-2 text-center py-16">
                        <CardContent className="space-y-4">
                            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-sm">
                                <MessageSquare className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-700">Yhteisö kasvaa!</h3>
                            <p className="text-slate-500 max-w-md mx-auto">
                                Ensimmäiset tarinat ovat tulossa pian.
                                Ole ensimmäinen ja jaa tarinasi alla olevalla lomakkeella.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {filteredStories.map((story, index) => (
                            <motion.div
                                key={story.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 border-slate-100 overflow-hidden group">
                                    <CardHeader className="bg-slate-50/50 border-b border-slate-50 pb-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant="outline" className="bg-white hover:bg-white text-slate-600 border-slate-200">
                                                {story.category}
                                            </Badge>
                                            {index === 0 && selectedCategory === 'Kaikki' && (
                                                <Badge className="bg-indigo-600 hover:bg-indigo-700">UUSIN</Badge>
                                            )}
                                        </div>
                                        <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                                            {story.title}
                                        </CardTitle>
                                        <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {story.date}
                                            </div>
                                            {story.author && (
                                                <div className="flex items-center gap-1 font-medium text-indigo-600">
                                                    <Users className="w-3 h-3" /> {story.author}
                                                </div>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6 grow">
                                        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                            {story.text}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="border-t border-slate-50 p-2 bg-slate-50/30 flex justify-between items-center text-xs text-slate-400">
                                        <div className="flex gap-2">
                                            <ReactionButton storyId={story.id} type="like" initialCount={story.likes} serverCount={serverLikes[story.id]} />
                                            <ReactionButton storyId={story.id} type="heart" initialCount={story.views} />
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* --- SUBMIT STORY --- */}
            <section className="px-4 max-w-3xl mx-auto pt-12">
                <Card className="bg-slate-900 text-white border-0 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <MessageSquare className="w-64 h-64" />
                    </div>

                    <CardHeader className="relative z-10 text-center pb-2">
                        <CardTitle className="text-3xl font-black uppercase tracking-tight">Jaa oma tarinasi</CardTitle>
                        <CardDescription className="text-slate-400 text-lg">
                            Julkaisemme tarinat täysin anonyymisti. Emme tallenna IP-osoitteita.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10 p-6 sm:p-10 pt-4">
                        <form onSubmit={handleMailtoSubmit} className="space-y-6 bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10">

                            {/* NEW: Author Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-slate-200">Otsikko / Aihe</Label>
                                    <Input
                                        id="title"
                                        placeholder="Esim. Hyväksikäyttö harjoittelussa..."
                                        className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600"
                                        value={formName}
                                        onChange={(e) => setFormName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="author" className="text-slate-200 flex items-center justify-between">
                                        Nimimerkki <span className="text-xs opacity-50 font-normal uppercase">(Valinnainen)</span>
                                    </Label>
                                    <Input
                                        id="author"
                                        placeholder="Jätä tyhjäksi jos haluat olla anonyymi"
                                        className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600"
                                        value={authorName}
                                        onChange={(e) => setAuthorName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-200">Kategoria</Label>
                                <Select onValueChange={setFormCategory} required>
                                    <SelectTrigger className="bg-slate-950/50 border-slate-700 text-white">
                                        <SelectValue placeholder="Valitse toimiala" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(cat => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="story" className="text-slate-200">Tarinasi</Label>
                                <Textarea
                                    id="story"
                                    placeholder="Kirjoita vapaasti. Moderoimme tekstin ja poistamme nimet ennen julkaisua."
                                    className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 min-h-[150px]"
                                    value={formText}
                                    onChange={(e) => setFormText(e.target.value)}
                                    required
                                />
                            </div>

                            <Button type="submit" size="lg" className="w-full bg-indigo-600 hover:bg-indigo-500 font-bold text-lg h-14 shadow-lg shadow-indigo-900/50">
                                <Send className="w-5 h-5 mr-2" /> Avaa sähköposti & Lähetä
                            </Button>

                            <div className="text-center text-xs text-slate-500 mt-4">
                                Tai lähetä suoraan: <a href="mailto:turvasiipi@gmail.com" className="text-indigo-400 hover:text-indigo-300 underline font-bold">turvasiipi@gmail.com</a>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
