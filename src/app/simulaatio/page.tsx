"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Info, ArrowRight, Gamepad2, Brain, HeartPulse, User, Briefcase, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SimulatorPage() {
    return (
        <main className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-900 text-white py-24">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-black opacity-95" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

                <div className="relative container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center space-y-8">
                        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-xs font-black tracking-widest backdrop-blur-sm uppercase">
                            <Gamepad2 className="w-4 h-4" />
                            Interaktiivinen kokemus
                        </div>

                        <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[0.9] uppercase">
                            Koe kiusaamisen <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">todellisuus</span>
                        </h1>

                        <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-light">
                            Kokemus, joka avaa silmät kiusaamisen dynamiikalle.
                            Astu eri rooleihin ja koe, miten pienet teot kasaantuvat ja vaikuttavat terveyteen.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button
                                size="lg"
                                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black uppercase tracking-widest h-14 px-10 rounded-full shadow-2xl shadow-indigo-500/20 transition-all hover:scale-105"
                                onClick={() => document.getElementById('professions')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Aloita koe
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features / Pillars */}
            <section className="py-20 container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={Brain}
                        title="Ymmärrä dynamiikka"
                        description="Näe miten hierarkia, vaikenemisen kulttuuri ja gaslighting toimivat käytännössä."
                        color="text-purple-600"
                        bg="bg-purple-100/50"
                    />
                    <FeatureCard
                        icon={HeartPulse}
                        title="Koe vaikutukset"
                        description="Seuraa miten henkinen ja fyysinen terveys rapautuu paineen alla 90 päivän aikana."
                        color="text-rose-600"
                        bg="bg-rose-100/50"
                    />
                    <FeatureCard
                        icon={User}
                        title="Rakenna empatiaa"
                        description="Astu toisen asemaan. Koe tunteet, joita pelkkä teksti ei voi välittää."
                        color="text-indigo-600"
                        bg="bg-indigo-100/50"
                    />
                </div>
            </section>

            {/* Categories Selection */}
            <section id="professions" className="py-24 bg-white/40 backdrop-blur-sm border-t border-slate-100 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Valitse näkökulma</h2>
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Kiusaaminen ja syrjintä näyttäytyvät eri tavoin. Valitse kategoria syventyäksesi eri kokemuksiin.</p>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="ghost" className="gap-2 rounded-full text-slate-400 hover:text-indigo-600 transition-colors uppercase text-xs font-black tracking-widest">
                                        <Info className="w-4 h-4" /> Lue lisää tästä
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-[2rem] border-none shadow-2xl">
                                    <DialogHeader>
                                        <DialogTitle className="text-3xl font-black tracking-tight mb-4 text-slate-900 uppercase">
                                            Työkiusaamissimulaattori
                                        </DialogTitle>
                                        <DialogDescription className="space-y-4 text-base text-slate-600 text-left pb-6" asChild>
                                            <div>
                                                <div className="mb-4 leading-relaxed">
                                                    <strong>Simulaattori ei ole peli, jossa voitetaan.</strong> Se on kokemus, jossa ymmärretään, miksi niin moni jää, vaikka kaikki kehossa huutaa lähteä.
                                                </div>
                                                <div className="mb-4 leading-relaxed">
                                                    Simulaattori vie pelaajan tilanteisiin, joissa mikään yksittäinen asia ei ole “tarpeeksi vakava” – mutta kaikki yhdessä syövät hiljalleen toimintakyvyn ja itsetunnon.
                                                </div>

                                                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 my-6">
                                                    <p className="font-bold text-indigo-900 mb-3 uppercase text-xs tracking-wider">Pelaajan haasteet:</p>
                                                    <ul className="space-y-2 text-indigo-800 font-medium">
                                                        <li className="flex gap-2"><span>•</span> Puututko vai nieletkö?</li>
                                                        <li className="flex gap-2"><span>•</span> Valitatko vai leimaannutko hankalaksi?</li>
                                                        <li className="flex gap-2"><span>•</span> Jaksatko vielä – vai onko aika lähteä?</li>
                                                    </ul>
                                                </div>

                                                <h4 className="font-black text-xl text-slate-900 pt-4 uppercase tracking-tight">Mitä opit:</h4>
                                                <ul className="space-y-4 mt-4">
                                                    <li className="flex gap-4">
                                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 font-bold text-slate-900">1</div>
                                                        <p><strong>Tunnistat rakenteet:</strong> Kiusaaminen näyttää usein vain huonolta kulttuurilta.</p>
                                                    </li>
                                                    <li className="flex gap-4">
                                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 font-bold text-slate-900">2</div>
                                                        <p><strong>Ymmärrät vastuun:</strong> Ongelma on ympäristössä, ei sinun kestävyydessäsi.</p>
                                                    </li>
                                                    <li className="flex gap-4">
                                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 font-bold text-slate-900">3</div>
                                                        <p><strong>Toimit ajoissa:</strong> Aikainen tunnistaminen on mielenterveysteko.</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    <div className="space-y-24">
                        {/* 1. NEUROMONINAISUUS */}
                        <div className="space-y-10">
                            <div className="flex items-center gap-4 border-b border-amber-500/20 pb-4">
                                <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
                                    <Brain className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Neuromoninaisuus</h3>
                                    <p className="text-slate-500 font-medium italic">Koe työpaikka aistiyliherkkyyden ja erilaisten prosessointitapojen kautta.</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
                                <Link href="/simulaatio/neuro">
                                    <SimulationCard
                                        emoji="🧩"
                                        title="Päivä neurokirjolla"
                                        description="Aistiyliherkkyydet ja 'masking'. Koe työpäivä neuromoninaisen silmin."
                                        color="amber"
                                    />
                                </Link>
                                <Link href="/simulaatio/performance-trap">
                                    <SimulationCard
                                        emoji="📉"
                                        title="Suoritusloukku"
                                        description="Kun 'kohtuulliset mukautukset' kääntyvät sinua vastaan. Tactical Self-Defense."
                                        color="amber"
                                        isNew
                                    />
                                </Link>
                                <Link href="/simulaatio/information-shadow">
                                    <SimulationCard
                                        emoji="👤"
                                        title="Informaatiovarjo"
                                        description="Näkymätön ulossulkeminen ja tietokatkokset. Opi murtamaan eristys."
                                        color="amber"
                                        isNew
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* 2. AMMATTIALAT */}
                        <div className="space-y-10">
                            <div className="flex items-center gap-4 border-b border-indigo-500/20 pb-4">
                                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
                                    <Briefcase className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Ammattialat</h3>
                                    <p className="text-slate-500 font-medium italic">Tietyille aloille ominaiset kiusaamisen ja vallankäytön tavat.</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
                                <Link href="/simulaatio/hoitaja">
                                    <SimulationCard
                                        emoji="🏥"
                                        title="Sairaanhoitaja"
                                        description="'Nurses eat their young.' Koe hierarkkinen väkivalta ja osaston kovat paineet."
                                        color="indigo"
                                    />
                                </Link>
                                <Link href="/simulaatio/opettaja">
                                    <SimulationCard
                                        emoji="👩‍🏫"
                                        title="Opettaja"
                                        description="Paineet vanhemmilta ja puutteellinen tuki johdolta. Koe opetusalan vaiettu arki."
                                        color="emerald"
                                    />
                                </Link>
                                <Link href="/simulaatio/it">
                                    <SimulationCard
                                        emoji="💻"
                                        title="IT-asiantuntija"
                                        description="Crunch-kulttuuri ja epärealistiset aikataulut. Koe teknisen alan vaiettu puoli."
                                        color="slate"
                                    />
                                </Link>
                                <Link href="/simulaatio/esimies">
                                    <SimulationCard
                                        emoji="👔"
                                        title="Esimies"
                                        description="'Management Trap.' Koe paine, joka pakottaa toimimaan vastoin omia arvoja."
                                        color="rose"
                                        dark
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* 3. ELÄMÄNVAIHEET */}
                        <div className="space-y-10">
                            <div className="flex items-center gap-4 border-b border-cyan-500/20 pb-4">
                                <div className="p-3 bg-cyan-100 text-cyan-600 rounded-2xl">
                                    <MapPin className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Elämänvaiheet</h3>
                                    <p className="text-slate-500 font-medium italic">Kokemattomuutta ja kynnyksiä hyödyntävät kiusaamisen muodot.</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
                                <Link href="/simulaatio/nuoret">
                                    <SimulationCard
                                        emoji="🌱"
                                        title="Nuori tekijä"
                                        description="Ensimmäinen kesätyö vai hyväksikäyttö? Opi tunnistamaan hälytysmerkit ajoissa."
                                        color="cyan"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function SimulationCard({ emoji, title, description, color, dark = false, isNew = false }: { emoji: string, title: string, description: string, color: string, dark?: boolean, isNew?: boolean }) {
    const bgClass = dark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100";
    const titleClass = dark ? "text-white" : "text-slate-900";
    const descClass = dark ? "text-slate-400" : "text-slate-500";

    // Mapping colors to tailwind classes to avoid dynamic string interpolation issues
    const colorVariants: Record<string, string> = {
        amber: "bg-amber-50 text-amber-600 border-amber-500",
        indigo: "bg-indigo-50 text-indigo-600 border-indigo-500",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-500",
        slate: "bg-slate-50 text-slate-600 border-slate-500",
        rose: "bg-rose-50 text-rose-600 border-rose-500",
        cyan: "bg-cyan-50 text-cyan-600 border-cyan-500",
        red: "bg-red-50 text-red-600 border-red-500",
    };

    const variant = colorVariants[color] || colorVariants.slate;
    const [bg, text, border] = variant.split(" ");

    return (
        <div className={cn("group relative border rounded-[2.5rem] p-10 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden h-full", bgClass)}>
            {isNew && (
                <div className="absolute top-6 right-6 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full z-20">
                    Uusi
                </div>
            )}
            <div className={cn("absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl transition-colors opacity-5 group-hover:opacity-10", border)} />
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-4xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500", dark ? "bg-slate-800" : bg)}>
                {emoji}
            </div>
            <h3 className={cn("text-2xl font-black mb-3 uppercase tracking-tight", titleClass)}>{title}</h3>
            <p className={cn("mb-10 leading-relaxed font-medium", descClass)}>{description}</p>
            <div className={cn("flex items-center font-black uppercase text-xs tracking-widest mt-auto", dark ? "text-rose-400" : text)}>
                Pelaa skenaario <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
            <div className={cn("absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-500", border)} />
        </div>
    );
}

function FeatureCard({ icon: Icon, title, description, color, bg }: any) {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className={`${bg} ${color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{description}</p>
        </div>
    );
}
