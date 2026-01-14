"use client";

import Link from "next/link";
import { ArrowRight, Globe, Trophy, Gamepad2, Search, User, Wrench, Heart, ChevronDown, Feather } from "lucide-react";

export default function Hiekkalaatikko2Page() {
    const currentDate = new Date().toLocaleDateString('fi-FI', { day: 'numeric', month: 'numeric', year: 'numeric' });

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-serif selection:bg-slate-200 antialiased">

            {/* Top Bar - With specific items from user image */}
            <nav className="fixed top-0 w-full bg-[#FDFBF7]/95 backdrop-blur-sm z-50 border-b border-slate-200/50">
                <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">

                    {/* Left side: Logo/Date */}
                    <div className="flex items-center gap-4 mr-8">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 border border-slate-200 shadow-sm">
                            <Feather className="w-5 h-5 stroke-[1.5]" />
                        </div>
                        <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                            Turvasiipi <span className="mx-2">/</span> {currentDate}
                        </div>
                    </div>

                    {/* Middle: Navigation Items */}
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 flex-1 justify-end mr-8">

                        <div className="flex items-center gap-2 hover:text-slate-900 cursor-pointer">
                            <Globe className="w-4 h-4" />
                            <span>EN</span>
                        </div>

                        <div className="h-4 w-px bg-slate-200 mx-2"></div>

                        <Link href="#" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                            <Trophy className="w-4 h-4" />
                        </Link>

                        <Link href="#" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                            <Gamepad2 className="w-4 h-4" />
                            <span>Koe</span>
                        </Link>

                        <div className="flex items-center gap-2 hover:text-slate-900 cursor-pointer group relative">
                            <Search className="w-4 h-4" />
                            <span>Tutki</span>
                            <ChevronDown className="w-3 h-3 text-slate-400" />
                        </div>

                        <Link href="#" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                            <User className="w-4 h-4" />
                            <span>Valmennus</span>
                        </Link>

                        <div className="flex items-center gap-2 hover:text-slate-900 cursor-pointer">
                            <Wrench className="w-4 h-4" />
                            <span>Välineet</span>
                            <ChevronDown className="w-3 h-3 text-slate-400" />
                        </div>

                    </div>

                    {/* Right: Needs help CTA */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                            <Heart className="w-4 h-4" />
                            <span>Apua</span>
                            <ChevronDown className="w-3 h-3 text-slate-500 ml-1" />
                        </div>
                        <Link href="/" className="text-xs font-medium text-slate-400 hover:text-slate-900 transition-colors ml-2">Sulje</Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-screen-lg mx-auto px-6 pt-32 pb-32">

                {/* HERO */}
                <section className="mb-32 md:mb-48 max-w-2xl">
                    <div className="space-y-8">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15] text-slate-900">
                            Ehkä tämä ei ole kiusaamista.<br />
                            <span className="text-slate-500 italic">Mutta miksi minusta tuntuu tältä?</span>
                        </h1>

                        <div className="space-y-6 pt-4 max-w-lg">
                            <p className="text-xl text-slate-700 leading-relaxed">
                                Moni työpaikkakiusattu ajattelee liioittelevansa.
                                Turvasiipi auttaa sinua jäsentämään tilanteen ennen kuin alat epäillä itseäsi.
                            </p>
                            <p className="text-xl text-slate-700 leading-relaxed">
                                Sinun ei tarvitse olla varma.<br />
                                Eikä vielä valmis tekemään mitään.
                            </p>
                        </div>

                        <div className="pt-8">
                            <Link href="/lukutaito-testi" className="group inline-flex items-center text-lg font-medium text-slate-900 border-b-2 border-slate-900 pb-0.5 hover:text-slate-600 hover:border-slate-600 transition-all">
                                Katso, tunnistatko tämän
                                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <p className="mt-4 text-xs font-mono text-slate-400 uppercase tracking-wider">
                                Pieni huomautus: Useimmat käyttäjät aloittavat vain lukemalla.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION 1: MIKSI TÄMÄ ON OLEMASSA */}
                <section className="grid md:grid-cols-12 gap-12 mb-32 border-t border-slate-200 pt-16">
                    <div className="md:col-span-4">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 sticky top-24">
                            Konteksti 01
                        </h2>
                    </div>
                    <div className="md:col-span-7 md:col-start-6 space-y-8">
                        <h3 className="text-2xl font-medium text-slate-900">
                            Työpaikkakiusaaminen ei yleensä ala selvästi.
                        </h3>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Se alkaa epämääräisenä tunteena, joka on vaikea selittää toisille — ja lopulta myös itselle.
                        </p>
                        <div className="bg-white p-8 border border-slate-100 shadow-sm space-y-4">
                            <p className="font-mono text-sm text-slate-500 uppercase tracking-wide mb-2">Usein käy näin:</p>
                            <ul className="space-y-3 text-lg text-slate-800">
                                <li className="flex items-start gap-3">
                                    <span className="opacity-30 select-none">—</span> asiat jäävät kirjaamatta
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="opacity-30 select-none">—</span> muistikuvat hämärtyvät
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="opacity-30 select-none">—</span> myöhemmin joku kysyy: <span className="italic text-slate-500">"miksi et sanonut aiemmin?"</span>
                                </li>
                            </ul>
                        </div>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Turvasiipi on olemassa tätä hetkeä varten.<br />
                            Sitä ennen kuin tiedät, mitä ajattelet.<br />
                            Sitä ennen kuin tiedät, mitä teet.
                        </p>
                    </div>
                </section>

                {/* SECTION 2: ONKO TÄMÄ KIUSAAMISTA? */}
                <section className="grid md:grid-cols-12 gap-12 mb-32 border-t border-slate-200 pt-16">
                    <div className="md:col-span-4">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 sticky top-24">
                            Määrittely 02
                        </h2>
                    </div>
                    <div className="md:col-span-7 md:col-start-6 space-y-8">
                        <h3 className="text-2xl font-medium text-slate-900">
                            Onko tämä kiusaamista vai vain huonoa huumoria?
                        </h3>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Entä jos muut eivät koe tätä ongelmana?
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Turvasiipi auttaa sinua nimeämään kokemuksesi ilman dramatisointia tai vähättelyä.
                            Et saa diagnoosia etkä tuomiota — saat jäsennyksen.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Tarkoitus ei ole vakuuttaa ketään.<br />
                            Vaan nähdä itse, mitä on tapahtunut.
                        </p>
                        <div className="pt-4">
                            <Link href="/lukutaito-testi" className="group inline-flex items-center font-medium text-slate-900 hover:text-slate-600 transition-colors">
                                Tunnista merkkejä rauhassa
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: YKSITYINEN LOKI */}
                <section className="grid md:grid-cols-12 gap-12 mb-32 border-t border-slate-200 pt-16">
                    <div className="md:col-span-4">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 sticky top-24">
                            Todistusaineisto 03
                        </h2>
                    </div>
                    <div className="md:col-span-7 md:col-start-6 space-y-8">
                        <h3 className="text-2xl font-medium text-slate-900">
                            Kirjoita ylös ennen kuin alat unohtaa.
                        </h3>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Muisti ei ole puolueeton.<br />
                            Se muuttuu ajan, stressin ja selittelyn mukana.
                        </p>

                        <div className="relative pl-6 border-l border-slate-300 my-8">
                            <p className="text-lg text-slate-600 leading-relaxed italic">
                                Turvasiipi tarjoaa henkilökohtaisen lokin, johon voit kirjata tapahtumat silloin kun ne ovat vielä tuoreita: mitä tapahtui, milloin, ketkä olivat paikalla, miltä se tuntui.
                            </p>
                        </div>

                        <p className="text-lg text-slate-600 leading-relaxed">
                            Vain sinä hallitset tietoja. Merkintöjä ei voi muokata jälkikäteen.
                        </p>
                        <p className="text-lg font-medium text-slate-900">
                            Tämä ei ole kertomus. Tämä on muistia varten.
                        </p>

                        <div className="pt-4">
                            <Link href="/timeline" className="group inline-flex items-center font-medium text-slate-900 hover:text-slate-600 transition-colors">
                                Aloita kirjaaminen
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: MIKSI MERKITSEE / TÄMÄ EI TEE PÄÄTÖKSIÄ */}
                <section className="grid md:grid-cols-12 gap-12 mb-24 border-t border-slate-200 pt-16">
                    <div className="md:col-span-4">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 sticky top-24">
                            Reunaehdot 04
                        </h2>
                    </div>
                    <div className="md:col-span-7 md:col-start-6 space-y-12">

                        {/* Miksi merkitsee */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-slate-900">
                                Miksi varhainen kirjaaminen merkitsee
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Useimmat odottavat liian kauan. Kun tilanne vihdoin tunnistetaan, voimat ovat jo lopussa.
                            </p>
                            <div className="bg-[#F5F5F4] p-6 text-sm font-mono text-slate-700 space-y-2">
                                <p>— Kiusaaminen jatkuu usein 1–3 vuotta ennen toimenpiteitä</p>
                                <p>— Moni ehtii kyseenalaistaa oman kokemuksensa</p>
                                <p>— Konkreettinen näyttö puuttuu ilman kirjaamista</p>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                Varhainen kirjaaminen ei tee tilanteesta vakavampaa.<br />
                                Se tekee siitä selkeämmän.
                            </p>
                        </div>

                        {/* Ei tee päätöksiä */}
                        <div className="space-y-6 pt-8 border-t border-slate-100">
                            <h3 className="text-xl font-medium text-slate-900">
                                Tämä ei tee päätöksiä puolestasi
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Turvasiipi ei kehota sinua toimimaan, ei ota yhteyttä työnantajaan, eikä arvioi ketään ihmisenä.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Se antaa sinulle aineiston, jota voit käyttää — tai olla käyttämättä.
                            </p>
                            <p className="text-slate-600 leading-relaxed italic">
                                Moni ei koskaan vie asiaa eteenpäin. Silti he sanovat jälkeenpäin olevansa tyytyväisiä, että alkoivat ajoissa.
                            </p>
                        </div>

                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="py-24 border-t-2 border-slate-900 text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl font-serif text-slate-900">
                        Et ole velvollinen tietämään vielä, mitä tämä on.<br />
                        <span className="italic text-slate-500">Riittää, että huomaat sen.</span>
                    </h2>

                    <div className="pt-8">
                        <Link href="/lukutaito-testi" className="group inline-flex items-center text-lg font-medium text-slate-900 border-b border-slate-300 pb-0.5 hover:border-slate-900 transition-all">
                            Tee rauhallinen tilannekartoitus
                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="mt-6 text-xs font-mono text-slate-400 uppercase tracking-wider">
                            Pieni huomautus: Voit lopettaa milloin tahansa.<br />
                            Mitään ei tallennu ilman lupaasi.
                        </p>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="pt-12 border-t border-slate-200 text-center">
                    <div className="inline-flex flex-col gap-2 text-xs font-mono text-slate-400 max-w-sm mx-auto">
                        <p>Tämä palvelu ei korvaa työterveyttä tai oikeudellista neuvontaa.</p>
                        <p>Tämä ei ole kriisipalvelu.</p>
                        <p className="text-slate-500 font-bold">Jos olet välittömässä vaarassa, hae apua heti.</p>
                    </div>
                </footer>

            </main>
        </div>
    );
}
