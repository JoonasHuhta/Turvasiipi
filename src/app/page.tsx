import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShieldCheck, Check, Star, Brain, ClipboardCheck, FileText, Users, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-white">
      {/* Hero Section */}
      <section className="relative px-6 pt-0 -mt-6 pb-12 md:pt-12 md:pb-24 text-center max-w-5xl mx-auto">

        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-200/20 blur-[100px] rounded-full -z-10 pointer-events-none" />

        <div className="flex justify-center mb-8 relative">
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full opacity-100" />
            <img src="/logo.png" alt="Turvasiipi Logo" className="w-28 h-28 md:w-36 md:h-36 object-contain relative z-10 drop-shadow-sm" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
          Kiusaaminen ei johdu sinusta.
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Turvasiipi on henkilökohtainen kumppanisi työpaikkakiusaamisen tunnistamisessa ja dokumentoinnissa. Ota ensimmäinen askel kohti oikeudenmukaisempaa työelämää.
        </p>

        <div className="flex flex-col items-center gap-6">
          <Link href="/quiz">
            <Button className="rounded-full w-full md:w-auto h-14 px-8 text-lg font-semibold shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-105 transition-all bg-primary hover:bg-primary/90" size="lg">
              Aloita tilannekartoitus <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-slate-500 font-medium bg-white/60 backdrop-blur px-4 py-1.5 rounded-full border border-slate-200/50">
            ⏱️ Kestää vain 2 minuuttia • Täysin anonyymi & Turvallinen
          </p>
        </div>
      </section>

      {/* Trust Grid / Statistics - Mobile Optimized */}
      <section className="px-4 pb-16">
        <div className="max-w-md md:max-w-4xl mx-auto bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-6 md:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">!</span>
                Miksi tämä on tärkeää?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Et ole ainoa. Joka neljäs suomalainen kohtaa työpaikkakiusaamista.
                Suurin ongelma on, että <span className="font-semibold text-slate-900">todisteet puuttuvat</span> kun niitä tarvitaan.
              </p>
              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-3 text-sm font-medium text-slate-700 bg-slate-50 p-2 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400" /> 120 000 uhria juuri nyt
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-slate-700 bg-slate-50 p-2 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Kiusaaminen kestää keskimäärin 1-3 vuotta
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center space-y-4 shadow-lg transform md:rotate-1 transition-transform">
              <h4 className="font-bold text-lg opacity-90">Suojasiiven alla</h4>
              <p className="leading-snug">
                "Autamme sinua muuttamaan tunteen faktoiksi ja ahdistuksen toimintasuunnitelmaksi."
              </p>
              <div className="flex justify-center gap-1 pt-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-white/80 text-white/80" />)}
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="space-y-12 py-12 md:py-24 px-4 container mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Kattava työkalupakki</h2>
          <p className="text-slate-600">Kaikki mitä tarvitset tilanteen hallintaan, yhdessä sovelluksessa.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Card className="bg-white/50 backdrop-blur border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">📝</div>
              <CardTitle className="text-xl">Dokumentoi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                Kirjaa tapahtumat turvallisesti aikaleimalla. Kun tarvitset todisteita, sinulla on valmis, uskottava aikajana.
              </p>
              <Link href="/timeline" className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1">
                Avaa Logikirja <ArrowRight className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="bg-white/50 backdrop-blur border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">🧠</div>
              <CardTitle className="text-xl">Ymmärrä</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                Epäiletkö kiusaamista? Tee validoidut testit ja saa selkeys tilanteeseen heti. Et kuvittele tätä.
              </p>
              <Link href="/quiz" className="text-purple-600 font-semibold text-sm hover:underline flex items-center gap-1">
                Tee testi <ArrowRight className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="bg-white/50 backdrop-blur border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">💙</div>
              <CardTitle className="text-xl">Toivu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                Vertaisryhmän ja ammattilaisten tuki. Löydä voimasi takaisin ja opi asettamaan rajat.
              </p>
              <Link href="/yhteiso" className="text-green-600 font-semibold text-sm hover:underline flex items-center gap-1">
                Liity yhteisöön <ArrowRight className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="antigravity-flow" className="py-24 bg-slate-50 border-t border-slate-100 overflow-hidden relative">
        <div className="container mx-auto max-w-5xl px-4 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Näin Turvasiipi toimii</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Neljä askelta, jotka muuttavat epävarmuuden toimintasuunnitelmaksi.
            </p>
          </div>

          <div className="relative space-y-24">
            {/* Connecting Line */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-emerald-200 -translate-x-1/2 rounded-full" />

            {/* Step 1: Validate */}
            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 group">
              <div className="flex-1 md:text-right order-2 md:order-1 space-y-4">
                <div className="inline-flex md:hidden items-center justify-center w-12 h-12 bg-indigo-600 rounded-full text-white font-bold text-xl mb-4 shadow-lg ring-4 ring-indigo-50">1</div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Varmista tunne</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Onko se kiusaamista vai "huonoa huumoria"? Tee nopea, psykologinen testi, joka auttaa tunnistamaan gaslightingin ja väkivallan merkit.
                </p>
                <Link href="/quiz">
                  <span className="inline-flex items-center font-semibold text-indigo-600 hover:text-indigo-700 mt-2">
                    Tee testi <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              </div>

              {/* Number Badge (Desktop) */}
              <div className="hidden md:flex flex-none w-14 h-14 bg-indigo-600 rounded-full items-center justify-center text-white font-bold text-xl shadow-xl ring-8 ring-slate-50 relative z-10 order-1 md:order-2 group-hover:scale-110 transition-transform">
                1
              </div>

              <div className="flex-1 order-3 w-full">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100/50 hover:shadow-md transition-shadow relative overflow-hidden group-hover:-translate-y-1 duration-300">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Brain className="w-24 h-24 text-indigo-600" />
                  </div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                      <Brain className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Objektiivinen arvio</h4>
                      <p className="text-sm text-slate-500">Saat heti palautteen tilanteesi vakavuudesta ilman vähättelyä.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Document */}
            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 group">
              <div className="flex-1 order-3 md:order-1 w-full">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100/50 hover:shadow-md transition-shadow relative overflow-hidden group-hover:-translate-y-1 duration-300">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <ClipboardCheck className="w-24 h-24 text-blue-600" />
                  </div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <ClipboardCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Local-First Turva</h4>
                      <p className="text-sm text-slate-500">Kaikki data tallentuu vain sinun laitteellesi. Me emme näe sitä.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Number Badge (Desktop) */}
              <div className="hidden md:flex flex-none w-14 h-14 bg-blue-600 rounded-full items-center justify-center text-white font-bold text-xl shadow-xl ring-8 ring-slate-50 relative z-10 order-1 md:order-2 group-hover:scale-110 transition-transform">
                2
              </div>

              <div className="flex-1 md:text-left order-2 md:order-3 space-y-4">
                <div className="inline-flex md:hidden items-center justify-center w-12 h-12 bg-blue-600 rounded-full text-white font-bold text-xl mb-4 shadow-lg ring-4 ring-blue-50">2</div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Kerää todisteet</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Sinun sanasi on arvokas, mutta data on voimaa. Kirjaa tapahtumat turvalliseen lokikirjaan heti kun ne tapahtuvat. Aikaleimat luovat uskottavuutta.
                </p>
                <Link href="/timeline">
                  <span className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 mt-2">
                    Avaa lokikirja <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Step 3: Analyze */}
            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 group">
              <div className="flex-1 md:text-right order-2 md:order-1 space-y-4">
                <div className="inline-flex md:hidden items-center justify-center w-12 h-12 bg-purple-600 rounded-full text-white font-bold text-xl mb-4 shadow-lg ring-4 ring-purple-50">3</div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Muuta tunne faktoiksi</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Kun on aika toimia, tekoäly auttaa muotoilemaan hajanaiset merkinnät selkeäksi, juridisesti päteväksi raportiksi.
                </p>
                <Link href="/raportti">
                  <span className="inline-flex items-center font-semibold text-purple-600 hover:text-purple-700 mt-2">
                    Luo raportti <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              </div>

              {/* Number Badge (Desktop) */}
              <div className="hidden md:flex flex-none w-14 h-14 bg-purple-600 rounded-full items-center justify-center text-white font-bold text-xl shadow-xl ring-8 ring-slate-50 relative z-10 order-1 md:order-2 group-hover:scale-110 transition-transform">
                3
              </div>

              <div className="flex-1 order-3 w-full">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100/50 hover:shadow-md transition-shadow relative overflow-hidden group-hover:-translate-y-1 duration-300">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <FileText className="w-24 h-24 text-purple-600" />
                  </div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">AI-avustaja</h4>
                      <p className="text-sm text-slate-500">Stateless-prosessointi takaa, että luottamukselliset tiedot eivät jää palvelimelle.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Recover */}
            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 group">
              <div className="flex-1 order-3 md:order-1 w-full">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100/50 hover:shadow-md transition-shadow relative overflow-hidden group-hover:-translate-y-1 duration-300">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Users className="w-24 h-24 text-emerald-600" />
                  </div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                      <Heart className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Voimaannu</h4>
                      <p className="text-sm text-slate-500">Löydä vertaistukea, ymmärrä oikeutesi ja ota hallinta takaisin.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Number Badge (Desktop) */}
              <div className="hidden md:flex flex-none w-14 h-14 bg-emerald-600 rounded-full items-center justify-center text-white font-bold text-xl shadow-xl ring-8 ring-slate-50 relative z-10 order-1 md:order-2 group-hover:scale-110 transition-transform">
                4
              </div>

              <div className="flex-1 md:text-left order-2 md:order-3 space-y-4">
                <div className="inline-flex md:hidden items-center justify-center w-12 h-12 bg-emerald-600 rounded-full text-white font-bold text-xl mb-4 shadow-lg ring-4 ring-emerald-50">4</div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Löydä ratkaisu</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Et ole yksin. Harjoittele tilanteita simulaattorissa, löydä vertaistukea tai ota yhteys ammattilaisiin valmiin faktapaketin kanssa.
                </p>
                <Link href="/yhteiso">
                  <span className="inline-flex items-center font-semibold text-emerald-600 hover:text-emerald-700 mt-2">
                    Liity yhteisöön <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
