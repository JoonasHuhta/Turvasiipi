import Link from "next/link";
import { ArrowLeft, Shield, Lock, Database, EyeOff, Key, Smartphone, AlertTriangle } from "lucide-react";
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
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Ei pilvipalvelua</h3>
                        <p className="text-slate-600">
                            Emme tallenna merkintöjäsi, testituloksiasi tai päiväkirjaasi palvelimillemme. Kaikki arkaluonteinen data tallennetaan vain sinun laitteesi selaimeen (Local Storage).
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <EyeOff className="w-8 h-8 text-indigo-500 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Täysi anonymiteetti</h3>
                        <p className="text-slate-600">
                            Sovelluksen käyttö ei vaadi sähköpostia, nimeä tai rekisteröitymistä. Olet meille tuntematon käyttäjä. Emme kerää analytiikkaa tai seurantatietoja.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <Key className="w-8 h-8 text-emerald-500 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Salaus ja lukitus</h3>
                        <p className="text-slate-600">
                            Voit suojata dokumentointisi PIN-koodilla. Data salataan AES-256 salauksella, ja vain sinä tiedät koodin. Ilman koodia dataa ei voi purkaa.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <Smartphone className="w-8 h-8 text-rose-500 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Panic Button</h3>
                        <p className="text-slate-600">
                            Hätätilanteessa voit piilottaa sovelluksen sisällön välittömästi painamalla Panic Button -nappia. Sovellus näyttää vaarattomalta sisällöltä.
                        </p>
                    </div>
                </div>

                {/* Detailed Sections */}
                <div className="space-y-8">
                    <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <Shield className="w-6 h-6 text-emerald-500" />
                            Miten AI-analyysi toimii? (BETA)
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p>
                                Kun luot yhteenvedon tilanteestasi tekoälyn avulla (ilmainen beta-testauksen ajan), prosessi toimii seuraavasti:
                            </p>
                            <ol className="list-decimal pl-5 space-y-2 mt-4">
                                <li>Sovellus anonymisoi automaattisesti nimet ja tunnistetiedot ennen lähetystä.</li>
                                <li>Anonymisoitu teksti lähetetään suojattua HTTPS-yhteyttä pitkin tekoälypalveluun (OpenAI GPT-4).</li>
                                <li>Tekoäly lukee tekstin, muotoilee sen raportiksi ja palauttaa sen.</li>
                                <li><strong>Data on tilatonta (stateless).</strong> Tekstiä ei tallenneta tekoälypalvelun tai meidän toimestamme prosessoinnin jälkeen. Se "unohdetaan" välittömästi.</li>
                                <li>Valmis raportti palautetaan vain sinulle ja tallennetaan vain sinun laitteellesi.</li>
                            </ol>
                            <div className="mt-6 p-4 bg-amber-50 rounded-xl text-amber-800 text-sm font-medium border border-amber-100">
                                <AlertTriangle className="w-4 h-4 inline mr-2" />
                                <strong>Beta-vaihe:</strong> AI-analyysi on ilmainen testausvaiheessa. Emme myy tai jaa tietojasi kolmansille osapuolille. Käyttämällä AI-analyysiä hyväksyt, että anonymisoitu data lähetetään OpenAI:lle prosessointia varten.
                            </div>
                            <div className="mt-4 p-4 bg-emerald-50 rounded-xl text-emerald-800 text-sm font-medium border border-emerald-100">
                                💡 <strong>Vinkki:</strong> Jos olet erityisen varovainen, älä kirjoita merkintöihin oikeita nimiä (esim. kirjoita "Esimies X" nimen sijaan). Automaattinen anonymisointi ei ole 100% varma.
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <Database className="w-6 h-6 text-blue-500" />
                            Mitä tietoja tallennamme?
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p className="font-semibold text-slate-900">Paikallisesti laitteellasi (Local Storage):</p>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li>Dokumentoidut tapahtumat (Loki, Aikajana)</li>
                                <li>Valmennuksen edistyminen ja ansaitut merkit</li>
                                <li>Kielivalinta ja sovelluksen asetukset</li>
                                <li>PIN-koodi (salattu) jos käytössä</li>
                            </ul>

                            <p className="font-semibold text-slate-900 mt-6">Palvelimillamme (Vercel):</p>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li>Yhteisön tarinat (anonyymit, ei henkilötietoja)</li>
                                <li>Tarinoiden tykkäyslaskurit (ei käyttäjätunnistusta)</li>
                                <li>Tekninen logi (IP-osoitteet, käyttöajat) - automaattinen Vercel-analytiikka</li>
                            </ul>

                            <p className="mt-4 text-sm italic">
                                <strong>Tärkeää:</strong> Emme yhdistä teknistä logia käyttäjiin. Emme tiedä kuka olet tai mitä olet dokumentoinut.
                            </p>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <Lock className="w-6 h-6 text-rose-500" />
                            Datan poistaminen
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p>
                                Koska arkaluonteinen data on vain sinun laitteellasi, sinulla on täysi valta siihen.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-4">
                                <li>Voit tyhjentää kaiken tiedon sovelluksen Vault-asetuksista painamalla "Tyhjennä tiedot".</li>
                                <li>Jos tyhjennät selaimesi välimuistin (cache/Local Storage), tiedot poistuvat.</li>
                                <li>Voit poistaa yksittäisiä merkintöjä Aikajana-näkymästä.</li>
                                <li><strong>Huomio:</strong> Koska meillä ei ole varmuuskopiota, poistettua tietoa ei voi palauttaa. Suosittelemme lataamaan raportit PDF-muodossa talteen säännöllisesti.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">
                            Evästeet ja seuranta
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p>
                                <strong>Turvasiipi ei käytä evästeitä (cookies) tai seurantaskriptejä.</strong>
                            </p>
                            <p className="mt-4">
                                Vercel (hosting-palvelumme) saattaa kerätä perustason teknistä dataa (IP-osoitteet, käyttöajat) palvelun ylläpitoa varten, mutta emme käytä tätä dataa käyttäjien tunnistamiseen tai profilointiin.
                            </p>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">
                            Yhteystiedot
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p>
                                Jos sinulla on kysymyksiä tietosuojasta tai haluat raportoida turvallisuusongelman, ota yhteyttä:
                            </p>
                            <p className="mt-4 font-mono text-sm bg-slate-100 p-3 rounded-lg">
                                privacy@turvasiipi.fi
                            </p>
                            <p className="text-xs mt-4 text-slate-500">
                                Viimeksi päivitetty: 12.1.2026
                            </p>
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
