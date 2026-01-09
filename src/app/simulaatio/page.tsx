"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Info, ArrowRight, Gamepad2, Brain, HeartPulse, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

            {/* Profession Selection */}
            <section id="professions" className="py-24 bg-white/40 backdrop-blur-sm border-t border-slate-100 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Valitse näkökulma</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg">Kiusaaminen ja syrjintä näyttäytyvät eri tavoin eri rooleissa. Valitse skenaario aloittaaksesi.</p>

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

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Nurse */}
                        <Link href="/simulaatio/hoitaja">
                            <div className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
                                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 text-4xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                    🏥
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">Sairaanhoitaja</h3>
                                <p className="text-slate-500 mb-10 leading-relaxed font-medium">"Nurses eat their young." Koe hierarkkinen väkivalta ja osaston kovat paineet.</p>
                                <div className="flex items-center text-indigo-600 font-black uppercase text-xs tracking-widest mt-auto">
                                    Pelaa skenaario <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                                </div>
                                <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-indigo-500 group-hover:w-full transition-all duration-500" />
                            </div>
                        </Link>

                        {/* Teacher */}
                        <Link href="/simulaatio/opettaja">
                            <div className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
                                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 text-4xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                                    👩‍🏫
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">Opettaja</h3>
                                <p className="text-slate-500 mb-10 leading-relaxed font-medium">Paineet vanhemmilta ja puutteellinen tuki johdolta. Koe opetusalan vaiettu arki.</p>
                                <div className="flex items-center text-emerald-600 font-black uppercase text-xs tracking-widest mt-auto">
                                    Pelaa skenaario <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                                </div>
                                <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-emerald-500 group-hover:w-full transition-all duration-500" />
                            </div>
                        </Link>

                        {/* Manager */}
                        <Link href="/simulaatio/esimies">
                            <div className="group relative bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 hover:shadow-2xl hover:shadow-red-900/40 transition-all duration-500 cursor-pointer overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-red-500/20 transition-colors" />
                                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-8 text-4xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                    👔
                                </div>
                                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight">Esimies</h3>
                                <p className="text-slate-400 mb-10 leading-relaxed font-medium">"Management Trap." Koe paine, joka pakottaa toimimaan vastoin omia arvoja.</p>
                                <div className="flex items-center text-red-400 font-black uppercase text-xs tracking-widest mt-auto">
                                    Pelaa skenaario <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                                </div>
                                <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-red-600 group-hover:w-full transition-all duration-500" />
                            </div>
                        </Link>

                        {/* Neuro */}
                        <Link href="/simulaatio/neuro">
                            <div className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-amber-500/10 transition-colors" />
                                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-8 text-4xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                                    🧩
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">Neurokirjo</h3>
                                <p className="text-slate-500 mb-10 leading-relaxed font-medium">Aistiyliherkkyydet ja "masking". Koe työpäivä neuromoninaisen silmin.</p>
                                <div className="flex items-center text-amber-600 font-black uppercase text-xs tracking-widest mt-auto">
                                    Pelaa skenaario <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                                </div>
                                <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-amber-500 group-hover:w-full transition-all duration-500" />
                            </div>
                        </Link>

                        {/* Youth */}
                        <Link href="/simulaatio/nuoret">
                            <div className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-cyan-500/10 transition-colors" />
                                <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center mb-8 text-4xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                    🌱
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">Nuori tekijä</h3>
                                <p className="text-slate-500 mb-10 leading-relaxed font-medium">Ensimmäinen kesätyö vai hyväksikäyttö? Opi tunnistamaan hälytysmerkit ajoissa.</p>
                                <div className="flex items-center text-cyan-600 font-black uppercase text-xs tracking-widest mt-auto">
                                    Pelaa skenaario <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                                </div>
                                <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-cyan-500 group-hover:w-full transition-all duration-500" />
                            </div>
                        </Link>

                        {/* IT Expert */}
                        <Link href="/simulaatio/it">
                            <div className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-slate-500/10 transition-colors" />
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 text-4xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                    💻
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">IT-asiantuntija</h3>
                                <p className="text-slate-500 mb-10 leading-relaxed font-medium">Crunch-kulttuuri ja epärealistiset aikataulut. Koe teknisen alan vaiettu puoli.</p>
                                <div className="flex items-center text-slate-600 font-black uppercase text-xs tracking-widest mt-auto">
                                    Pelaa skenaario <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                                </div>
                                <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-slate-500 group-hover:w-full transition-all duration-500" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
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
