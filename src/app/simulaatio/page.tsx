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
        <main className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-900 text-white py-24">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black opacity-90" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                <div className="relative container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center space-y-8">
                        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                            <Gamepad2 className="w-4 h-4" />
                            INTERAKTIIVINEN KOKEMUS
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                            Koe työpaikkakiusaamisen <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">todellisuus</span>
                        </h1>

                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                            Simulaattori, joka avaa silmät kiusaamisen dynamiikalle.
                            Astu sairaanhoitajan, opettajan tai asiantuntijan saappaisiin ja koe,
                            miten pienet teot kasaantuvat ja vaikuttavat terveyteen.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button
                                size="lg"
                                className="bg-indigo-600 hover:bg-indigo-700 text-lg h-14 px-8 rounded-full shadow-lg shadow-indigo-900/20"
                                onClick={() => document.getElementById('professions')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Aloita simulaatio
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features / Pillars */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={Brain}
                        title="Ymmärrä dynamiikka"
                        description="Näe miten hierarkia, vaikenemisen kulttuuri ja gaslighting toimivat käytännössä."
                        color="text-purple-600"
                        bg="bg-purple-50"
                    />
                    <FeatureCard
                        icon={HeartPulse}
                        title="Koe vaikutukset"
                        description="Seuraa miten henkinen ja fyysinen terveys rapautuu paineen alla 90 päivän aikana."
                        color="text-rose-600"
                        bg="bg-rose-50"
                    />
                    <FeatureCard
                        icon={User}
                        title="Rakenna empatiaa"
                        description="Astu toisen asemaan. Koe tunteet, joita pelkkä teksti ei voi välittää."
                        color="text-indigo-600"
                        bg="bg-indigo-50"
                    />
                </div>
            </section>

            {/* Profession Selection Placeholder */}
            <section id="professions" className="py-20 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold text-slate-900">Valitse ammattisi</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">Jokaisella alalla kiusaaminen saa omat muotonsa.</p>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="gap-2 rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800">
                                    <Info className="w-4 h-4" /> Lisätietoa simulaattorista
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold leading-tight mb-4 text-indigo-950">
                                        Työkiusaamissimulaattori – et ole liian herkkä, tämä on järjestelmävika
                                    </DialogTitle>
                                    <DialogDescription className="space-y-4 text-base text-slate-700 text-left" asChild>
                                        <div>
                                            <div className="mb-4">
                                                <strong>Työkiusaamissimulaattori ei ole peli, jossa voitetaan.</strong> Se on kokemus, jossa ymmärretään, miksi niin moni jää, vaikka kaikki kehossa huutaa lähteä.
                                            </div>
                                            <div className="mb-4">
                                                Simulaattori vie pelaajan suomalaiseen työpaikkaan, jossa mikään yksittäinen asia ei ole “tarpeeksi vakava” – mutta kaikki yhdessä syövät hiljalleen toimintakyvyn, itsetunnon ja ilon. Sivulauseet palavereissa. Vitsiksi naamioitu vähättely. Vastuun kaataminen. Hiljaisuus, kun tarvitset tukea. “Sisu”, joka muuttuu ansaksi.
                                            </div>

                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 my-4">
                                                <p className="font-semibold text-slate-900 mb-2">Pelaaja joutuu tekemään arkipäiväisiä päätöksiä:</p>
                                                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                                                    <li>Puututko vai nieletkö?</li>
                                                    <li>Valitatko vai leimaannutko hankalaksi?</li>
                                                    <li>Jaksatko vielä tämän projektin – vai tämän työpaikan?</li>
                                                </ul>
                                            </div>

                                            <div className="mb-4">
                                                Jokaisella valinnalla on seurauksia, jotka eivät näy heti. Stressimittari nousee. Unet lyhenevät. Itseluottamus murenee. Ja silti ulospäin kaikki näyttää “ihan ok:lta”.
                                            </div>

                                            <h4 className="font-bold text-lg text-slate-900 pt-2">Simulaattori opettaa kolme asiaa:</h4>
                                            <ol className="list-decimal pl-5 space-y-3">
                                                <li>
                                                    <strong>Työkiusaaminen harvoin näyttää kiusaamiselta.</strong> Se näyttää rakenteilta, kulttuurilta ja hiljaiselta hyväksynnältä.
                                                </li>
                                                <li>
                                                    <strong>Ongelma ei ole yksilön kestävyys,</strong> vaan ympäristö, joka palkitsee vääränlaista käytöstä.
                                                </li>
                                                <li>
                                                    <strong>Aikainen tunnistaminen on mielenterveysteko.</strong> Mitä aiemmin ymmärrät, missä olet, sitä vähemmän joudut maksamaan hinnan myöhemmin.
                                                </li>
                                            </ol>

                                            <div className="mt-6 p-4 bg-indigo-50 text-indigo-900 rounded-xl border border-indigo-100 font-medium">
                                                Työkiusaamissimulaattori ei opeta, miten “selviät”.<br />
                                                Se opettaa, mitä ei kuulu sietää.
                                            </div>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {/* Nurse - Active */}
                        <Link href="/simulaatio/hoitaja">
                            <div className="group relative bg-white border-2 border-slate-100 rounded-3xl p-8 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 cursor-pointer text-left h-full">
                                <div className="absolute top-4 right-4 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Beta
                                </div>
                                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                                    🏥
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Sairaanhoitaja</h3>
                                <p className="text-slate-600 mb-6">"Nurses eat their young." Koe hierarkkinen väkivalta ja osaston paineet.</p>
                                <span className="text-indigo-600 font-semibold flex items-center group-hover:gap-2 transition-all absolute bottom-8">
                                    Pelaa skenaario <ArrowRight className="w-4 h-4 ml-2" />
                                </span>
                            </div>
                        </Link>

                        {/* Teacher - Active */}
                        <Link href="/simulaatio/opettaja">
                            <div className="group relative bg-white border-2 border-slate-100 rounded-3xl p-8 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 cursor-pointer text-left h-full">
                                <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Päivitetty
                                </div>
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                                    👩‍🏫
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Opettaja</h3>
                                <p className="text-slate-600 mb-6">Ulkopuolinen paine vanhemmilta ja tuen puute johdolta. Koe opetusalan haasteet.</p>
                                <span className="text-emerald-600 font-semibold flex items-center group-hover:gap-2 transition-all absolute bottom-8">
                                    Pelaa skenaario <ArrowRight className="w-4 h-4 ml-2" />
                                </span>
                            </div>
                        </Link>

                        {/* Manager - Active (New) */}
                        <Link href="/simulaatio/esimies">
                            <div className="group relative bg-slate-900 border-2 border-slate-800 rounded-3xl p-8 hover:border-red-500 hover:shadow-xl hover:shadow-red-900/20 transition-all duration-300 cursor-pointer text-left h-full">
                                <div className="absolute top-4 right-4 bg-red-900/50 text-red-200 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Uusi
                                </div>
                                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                                    👔
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Esimies</h3>
                                <p className="text-slate-400 mb-6">"Management Trap." Koe paine, joka pakottaa sinut kiusaajaksi vastoin tahtoasi.</p>
                                <span className="text-red-400 font-semibold flex items-center group-hover:gap-2 transition-all absolute bottom-8">
                                    Pelaa skenaario <ArrowRight className="w-4 h-4 ml-2" />
                                </span>
                            </div>
                        </Link>

                        {/* Neuro - Active (New) */}
                        <Link href="/simulaatio/neuro">
                            <div className="group relative bg-white border-2 border-slate-100 rounded-3xl p-8 hover:border-amber-500 hover:shadow-xl transition-all duration-300 cursor-pointer text-left h-full">
                                <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Uusi
                                </div>
                                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                                    🧠
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Neuroepätyypillinen</h3>
                                <p className="text-slate-600 mb-6">Aistiyliherkkyydet, sosiaaliset koodit ja "masking". Koe työpäivä Alexin silmin.</p>
                                <span className="text-amber-600 font-semibold flex items-center group-hover:gap-2 transition-all absolute bottom-8">
                                    Pelaa skenaario <ArrowRight className="w-4 h-4 ml-2" />
                                </span>
                            </div>
                        </Link>

                        {/* Developer - Coming Soon */}
                        <div className="bg-slate-50 border-2 border-slate-100 rounded-3xl p-8 opacity-70 cursor-not-allowed">
                            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 text-3xl grayscale">
                                💻
                            </div>
                            <h3 className="text-xl font-bold text-slate-500 mb-2">IT-asiantuntija</h3>
                            <p className="text-slate-400 mb-6">Crunch-kulttuuri, epärealistiset aikataulut ja syyllistäminen.</p>
                            <span className="text-slate-400 font-medium text-sm flex items-center">
                                Tulossa pian
                            </span>
                        </div>
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
