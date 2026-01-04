import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShieldCheck, Check, Star } from "lucide-react";

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
            ⏱️ Kestää vain 2 minuuttia • Ei vaadi kirjautumista
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
              <h4 className="font-bold text-lg opacity-90">Suojasiiven Lupaus</h4>
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

      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-12">Yksinkertainen polku parempaan</h2>

          <div className="relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-slate-200 -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              <div className="flex flex-col items-center gap-4 bg-slate-50 z-10">
                <div className="w-24 h-24 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-4xl font-bold text-slate-300">1</div>
                <h3 className="font-bold text-slate-900">Tunnista</h3>
                <p className="text-sm text-slate-500 max-w-[200px]">Tee nopea testi ja varmista, mistä on kyse.</p>
              </div>
              <div className="flex flex-col items-center gap-4 bg-slate-50 z-10">
                <div className="w-24 h-24 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-4xl font-bold text-slate-300">2</div>
                <h3 className="font-bold text-slate-900">Kirjaa</h3>
                <p className="text-sm text-slate-500 max-w-[200px]">Tallenna tapahtumat heti kun ne tapahtuvat.</p>
              </div>
              <div className="flex flex-col items-center gap-4 bg-slate-50 z-10">
                <div className="w-24 h-24 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-4xl font-bold text-slate-300">3</div>
                <h3 className="font-bold text-slate-900">Ratkaise</h3>
                <p className="text-sm text-slate-500 max-w-[200px]">Käytä raporttia todisteena ja lopeta kiusaaminen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
