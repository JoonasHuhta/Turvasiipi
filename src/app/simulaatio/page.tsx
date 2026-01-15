import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, Brain, Briefcase, Info, MapPin, Stethoscope, GraduationCap, Laptop, Users, Zap, EyeOff, TrendingUp, Ghost, Infinity } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SimulatorPage() {
    return (
        <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-32 space-y-32">

            {/* Header / Intro - Maximum Whitespace */}
            <header className="space-y-12 max-w-2xl">
                <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1">
                    Simulaatio ympäristö
                </span>

                <h1 className="text-4xl md:text-5xl font-bold text-[#2B2B2B] leading-[1.1] tracking-tight">
                    Tämä ei ole peli. <br />
                    <span className="text-[#4A4A4A] font-normal italic">Se on yritys selvitä mahdollisimman vähin vaurioin.</span>
                </h1>

                <div className="space-y-6 max-w-xl">
                    <p className="text-lg text-[#4A4A4A] leading-relaxed">
                        Simulaatioissa kohtaat työelämän tilanteita, joissa ei ole oikeita vastauksia.
                        Valinnat kasaantuvat. Pienet teot voivat lopulta murentaa toimintakyvyn.
                    </p>
                    <p className="text-lg text-[#4A4A4A] leading-relaxed">
                        Täällä voit kokeilla, ymmärtää ja valmistautua – turvallisesti.
                    </p>
                </div>

                <div className="pt-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="text-[12px] font-mono uppercase tracking-wider text-[#4A4A4A] hover:text-[#5B4B8A] border-b border-[#E8DDD0] hover:border-[#5B4B8A] transition-colors pb-0.5 ml-1">
                                [ Miten tämä toimii? ]
                            </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xl bg-[#FDFBF7] border-[#E8DDD0] p-12">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-serif text-[#2B2B2B] mb-6">Simulaation periaatteet</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 text-[#4A4A4A] leading-relaxed">
                                <p>
                                    <strong>Ei voittamista.</strong> Et voi "läpäistä" kiusaamista. Voit vain yrittää selviytyä mahdollisimman vähin vaurioin.
                                </p>
                                <p>
                                    <strong>Pienet teot kasaantuvat.</strong> Yksittäinen tapahtuma voi tuntua mitättömältä. Sata sellaista murentaa toimintakyvyn.
                                </p>
                                <p>
                                    <strong>Tarkoitus on ymmärtää.</strong> Tunnista rakenteet, jotta voit suojata itseäsi oikeassa elämässä.
                                </p>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </header>

            {/* NEUROMONINAISUUS - The Core Experience */}
            <section className="space-y-16 border-t border-[#E8DDD0] pt-24">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                    <h2 className="text-2xl font-bold text-[#2B2B2B] flex items-center gap-3">
                        <Infinity className="w-6 h-6 text-[#5B4B8A]" />
                        Neuromoninaisuus
                    </h2>
                    <p className="text-[#4A4A4A] italic max-w-md">
                        Työelämä on rakennettu neurotyypillisille. Koe, miltä "tavallinen" päivä tuntuu ilman tätä suodinta.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <Link href="/simulaatio/neuro">
                        <SimulationCard
                            icon={<Infinity className="w-5 h-5" />}
                            title="Päivä neurokirjolla"
                            description="Aistiyliherkkyydet ja 'masking'. Koe energian hinta."
                        />
                    </Link>
                    <Link href="/simulaatio/performance-trap">
                        <SimulationCard
                            icon={<TrendingUp className="w-5 h-5" />}
                            title="Suoritusloukku"
                            description="Kun tunnollisuus kääntyy aseeksi sinua vastaan."
                            isNew
                        />
                    </Link>
                    <Link href="/simulaatio/information-shadow">
                        <SimulationCard
                            icon={<Ghost className="w-5 h-5" />}
                            title="Informaatiovarjo"
                            description="Hiljainen ulossulkeminen. Kun tieto yksinkertaisesti 'unohtuu'."
                            isNew
                        />
                    </Link>
                </div>
            </section>

            {/* AMMATTIALAT - Context Specific */}
            <section className="space-y-16 border-t border-[#E8DDD0] pt-24">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                    <h2 className="text-2xl font-bold text-[#2B2B2B] flex items-center gap-3">
                        <Briefcase className="w-6 h-6 text-[#5B4B8A]" />
                        Ammattialat
                    </h2>
                    <p className="text-[#4A4A4A] italic max-w-md">
                        Eri aloilla vallankäyttö saa erilaisia muotoja.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <Link href="/simulaatio/hoitaja">
                        <SimulationCard
                            icon={<Stethoscope className="w-5 h-5" />}
                            title="Sairaanhoitaja"
                            description="Hierarkkinen väkivalta ja osaston kirjoittamattomat säännöt."
                        />
                    </Link>
                    <Link href="/simulaatio/opettaja">
                        <SimulationCard
                            icon={<GraduationCap className="w-5 h-5" />}
                            title="Opettaja"
                            description="Kun paine tulee sekä johdolta, vanhemmilta että oppilailta."
                        />
                    </Link>
                    <Link href="/simulaatio/it">
                        <SimulationCard
                            icon={<Laptop className="w-5 h-5" />}
                            title="IT-asiantuntija"
                            description="Epärealistiset aikataulut ja 'crunch'-kulttuurin uupumus."
                        />
                    </Link>
                    <Link href="/simulaatio/esimies">
                        <SimulationCard
                            icon={<Users className="w-5 h-5" />}
                            title="Esimies"
                            description="Puun ja kuoren välissä. Kun joudut toteuttamaan arvojesi vastaisia päätöksiä."
                        />
                    </Link>
                </div>
            </section>

            {/* NUORET - Vulnerability Context */}
            <section className="space-y-16 border-t border-[#E8DDD0] pt-24">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                    <h2 className="text-2xl font-bold text-[#2B2B2B] flex items-center gap-3">
                        <Zap className="w-6 h-6 text-[#5B4B8A]" />
                        Nuoret työelämässä
                    </h2>
                    <p className="text-[#4A4A4A] italic max-w-md">
                        Ensimmäiset kokemukset muokkaavat käsitystä siitä, mikä on normaalia.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <Link href="/simulaatio/nuoret">
                        <SimulationCard
                            icon={<Zap className="w-5 h-5" />}
                            title="Nuori tekijä"
                            description="Ensimmäinen kesätyö. Missä menee hyväksikäytön raja?"
                        />
                    </Link>
                </div>
            </section>

        </div>
    );
}

function SimulationCard({ title, description, icon, isNew = false }: { title: string, description: string, icon?: React.ReactNode, isNew?: boolean }) {
    return (
        <div className="group block h-full space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8DDD0] pb-2 group-hover:border-[#5B4B8A] transition-colors">
                <div className="flex items-center gap-3">
                    {icon && <span className="text-[#5B4B8A] opacity-70 group-hover:opacity-100 transition-opacity">{icon}</span>}
                    <h3 className="text-lg font-bold text-[#2B2B2B] group-hover:text-[#5B4B8A] transition-colors">{title}</h3>
                </div>
                {isNew && <span className="text-[9px] uppercase tracking-widest font-bold text-[#5B4B8A] bg-[#5B4B8A]/5 px-2 py-0.5 rounded-sm">Uusi</span>}
            </div>
            <p className="text-sm text-[#4A4A4A] leading-relaxed group-hover:text-[#2B2B2B] transition-colors pr-4">
                {description}
            </p>
            <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#5B4B8A]">
                Aloita <ArrowRight className="w-3 h-3" />
            </div>
        </div>
    );
}
