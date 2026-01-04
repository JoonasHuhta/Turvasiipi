import Link from "next/link";
import { ArrowLeft, Shield, Lock, Database, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
            <div className="max-w-3xl mx-auto space-y-12">
                {/* Header */}
                <div className="space-y-6">
                    <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Takaisin etusivulle
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                        Tietosuoja ja Turvallisuus
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Turvasiipi on rakennettu yhden periaatteen varaan: <strong className="text-indigo-600">sinun tietosi kuuluvat vain sinulle.</strong> Emme voi vuotaa tietoja, joita meillä ei ole.
                    </p>
                </div>

                {/* Core Principles */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <Database className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Ei tietokantaa</h3>
                        <p className="text-slate-600">
                            Emme tallenna merkintöjäsi, testituloksiasi tai päiväkirjaasi palvelimillemme. Kaikki data tallennetaan vain sinun laitteesi selaimeen (Local Storage).
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <EyeOff className="w-8 h-8 text-indigo-500 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Täysi anonymiteetti</h3>
                        <p className="text-slate-600">
                            Sovelluksen käyttö ei vaadi sähköpostia, nimeä tai rekisteröitymistä. Olet meille tuntematon käyttäjä.
                        </p>
                    </div>
                </div>

                {/* Detailed Sections */}
                <div className="space-y-8">
                    <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <Shield className="w-6 h-6 text-emerald-500" />
                            Miten AI-raportointi toimii?
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p>
                                Kun luot yhteenvedon tilanteestasi tekoälyn avulla, prosessi toimii seuraavasti:
                            </p>
                            <ol className="list-decimal pl-5 space-y-2 mt-4">
                                <li>Lähetämme tekstisi suojattua yhteyttä pitkin prosessoitavaksi.</li>
                                <li>Tekoäly (LLM) lukee tekstin, muotoilee sen raportiksi ja palauttaa sen.</li>
                                <li><strong>Datan prosessointi on tilatonta (stateless).</strong> Tekstiä ei tallenneta tekoälypalvelun tai meidän toimestamme prosessoinnin jälkeen. Se "unohdetaan" välittömästi.</li>
                            </ol>
                            <div className="mt-6 p-4 bg-emerald-50 rounded-xl text-emerald-800 text-sm font-medium border border-emerald-100">
                                Vinkki: Jos olet erityisen varovainen, älä kirjoita merkintöihin oikeita nimiä (esim. kirjoita "Esimies X" nimen sijaan).
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <Lock className="w-6 h-6 text-rose-500" />
                            Datan poistaminen
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p>
                                Koska data on vain sinun laitteellasi, sinulla on täysi valta siihen.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-4">
                                <li>Voit tyhjentää kaiken tiedon sovelluksen asetuksista painamalla "Tyhjennä tiedot".</li>
                                <li>Jos tyhjennät selaimesi välimuistin (cache/cookies), tiedot poistuvat.</li>
                                <li><strong>Huomio:</strong> Koska meillä ei ole varmuuskopiota, poistettua tietoa ei voi palauttaa. Suosittelemme lataamaan raportit PDF-muodossa talteen säännöllisesti.</li>
                            </ul>
                        </div>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-center pt-8">
                    <Link href="/">
                        <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800">
                            Ymmärrän, palaa etusivulle
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
