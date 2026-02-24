'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X, ChevronDown } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const ENVIRONMENTS = [
    { icon: '💼', label: 'Työ' },
    { icon: '🎓', label: 'Opinnot' },
    { icon: '❤️', label: 'Suhteet' },
    { icon: '👨‍👩‍👧‍👦', label: 'Perhe' },
    { icon: '🌐', label: 'Verkko' },
];

const SITUATIONS = [
    {
        id: 'target',
        icon: '🤐',
        title: 'Jotain menee pieleen',
        subtitle: 'mutta en osaa sanoa mitä',
        text: 'Selitän itselleni, että ehkä ylireagin. Ehkä olen liian herkkä. Kuitenkin jotain tuntuu väärältä — joka päivä.',
        cta: 'Tunnista tilanne',
        href: '/quiz',
        color: '#5B4B8A',
    },
    {
        id: 'bystander',
        icon: '👀',
        title: 'Näin sen tapahtuvan',
        subtitle: 'enkä sanonut mitään',
        text: 'Seisoin vieressä. Naurahdin hermostuneena. Lähdin pois huoneesta. Nyt mietin, mitä olisin voinut sanoa.',
        cta: 'Harjoittele puuttumista',
        href: '/simulaatio/bystander',
        color: '#3B6E8C',
    },
    {
        id: 'neuro',
        icon: '🧠',
        title: 'Reagoin eri tavalla',
        subtitle: 'kuin muut odottavat',
        text: 'Tunteeni ovat intensiivisiä. Hylkääminen sattuu eri tavalla. Minua helposti pidetään "yliherkkänä" — mutta ehkä kyse on muustakin.',
        cta: 'Neurodiversiteetti ja kiusaaminen',
        href: '/neuromoninaisuus',
        color: '#2D7A5E',
    },
    {
        id: 'youth',
        icon: '🏫',
        title: 'Jokin on muuttunut',
        subtitle: 'eikä hän halua puhua siitä',
        text: 'Lapsi keksii syitä. Ei halua lähteä kouluun tai harrastukseen. Sinä tiedät, että kyse ei ole vain "lasten välisestä nahistelusta", vaan jostain syvemmästä.',
        cta: 'Nuoret ja kiusaaminen',
        href: '/nuoret',
        color: '#9B6B3A',
    },
    {
        id: 'relationship',
        icon: '🏠',
        title: 'Säännöt muuttuvat',
        subtitle: 'en enää tiedä mikä on normaalia',
        text: 'Toinen määrittää todellisuuden uudelleen joka päivä. Joudun varomaan sanojani. Kotona tuntuu siltä kuin kävelisi lasinsiruilla.',
        cta: 'Lähisuhdeväkivalta ja kontrolli',
        href: '/valmennus/kontrolloiva-suhde',
        color: '#8A4B4B',
    },
    {
        id: 'professional',
        icon: '📋',
        title: 'Minun pitäisi tehdä jotain',
        subtitle: 'mutta en tiedä mitä tai miten',
        text: 'Olen esihenkilö, opettaja, valmentaja. Huomaan tilanteen. En halua lietsoa enkä sivuuttaa. Tarvitsen rungon toimia.',
        cta: 'Ammattilaisen polku',
        href: '/valmennus',
        color: '#6B5B3A',
    },
];

const TOOLS = [
    { icon: '🔍', label: 'Tunnistustyökalut', desc: 'Kyselyt jotka auttavat nimeämään mitä tapahtuu' },
    { icon: '🎮', label: 'Simulaattorit', desc: 'Harjoittele reagoimista turvallisessa ympäristössä' },
    { icon: '📂', label: 'Dokumentointi', desc: 'Kirjaa tapahtumat selkeästi — muistia ei pidä luottaa' },
    { icon: '🧠', label: 'Tietopankki', desc: 'Vallan dynamiikka, taktikat, kiusaamisen mekanismit' },
    { icon: '🛡', label: 'Turvalauseharjoitukset', desc: 'Sanat tilanteisiin, joissa sanat loppuvat' },
];

const FAQ_ITEMS = [
    {
        q: 'Tallentuuko tietoni johonkin?',
        a: 'Ei. Kaikki tiedot tallentuvat vain selaimesi muistiin (Local Storage). Meillä ei ole tietokantaa, emmekä näe mitä kirjoitat. Jos tyhjennät selaushistorian, tiedot katoavat.',
    },
    {
        q: 'Voiko työnantaja nähdä, että käytän tätä?',
        a: 'Ei voi. Sivusto toimii kuten mikä tahansa verkkosivu. Suosittelemme käyttämään yksityistä selausta (Incognito) ja henkilökohtaista laitetta.',
    },
    {
        q: 'Onko tämä lakineuvontaa?',
        a: 'Ei. Tämä on vertaistuellinen ja informatiivinen työkalu. Emme tarjoa lakipalveluita. Vakavissa tilanteissa ota yhteys liittoon tai juristiin.',
    },
    {
        q: 'Mitä jos kiusaaja on esihenkilö?',
        a: 'Tämä on yleistä. Siksi dokumentointi on erityisen tärkeää. Työsuojeluorganisaatio on tällöin oikea taho auttamaan.',
    },
    {
        q: 'Voinko käyttää raporttia oikeudessa?',
        a: 'Kyllä. Itse tuottamasi päiväkirja on todistusaineistoa. PDF-raportti on selkeä tapa esittää tapahtumien kulku.',
    },
    {
        q: 'Maksaako tämä?',
        a: 'Ei. Turvasiipi on ilmainen työkalu.',
    },
    {
        q: 'Mistä saan ulkopuolista apua?',
        a: 'Emme jätä sinua yksin. Virallisia reittejä: Aluehallintovirasto (AVI) · Luottamusmies · Työterveyshuolto.',
    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SituationCard({ situation, active, onClick }: {
    situation: typeof SITUATIONS[0];
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="text-left w-full group transition-all duration-200"
        >
            <div className={[
                'border rounded-sm p-5 transition-all duration-200',
                active
                    ? 'bg-white border-[#5B4B8A] shadow-md'
                    : 'bg-white/60 border-[#E8DDD0] hover:border-[#C8C0D8] hover:bg-white',
            ].join(' ')}>
                <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{situation.icon}</span>
                    <div className="space-y-1 min-w-0">
                        <p className="text-sm font-bold text-[#2B2B2B] leading-tight">
                            {situation.title}
                        </p>
                        <p className="text-xs text-[#5B4B8A] italic">
                            {situation.subtitle}
                        </p>
                    </div>
                </div>
                {active && (
                    <div className="mt-4 space-y-3 animate-[fadeIn_0.2s_ease]">
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            {situation.text}
                        </p>
                        <Link
                            href={situation.href}
                            onClick={e => e.stopPropagation()}
                            className="inline-flex items-center gap-2 text-xs font-semibold text-white px-4 py-2 rounded-sm transition-opacity hover:opacity-90"
                            style={{ background: situation.color }}
                        >
                            {situation.cta} <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                )}
            </div>
        </button>
    );
}

function FAQItem({ item, open, onClick }: {
    item: typeof FAQ_ITEMS[0];
    open: boolean;
    onClick: () => void;
}) {
    return (
        <div className="border border-[#E8DDD0] bg-white rounded-sm">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className="text-lg font-medium text-[#2B2B2B] pr-4">{item.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#8A8A8A] flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="px-6 pb-6 text-[#4A4A4A] leading-relaxed animate-[fadeIn_0.15s_ease]">
                    {item.a}
                </div>
            )}
        </div>
    );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function FullLandingPrototype() {
    const [activeSituation, setActiveSituation] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    return (
        <div className="min-h-screen" style={{ background: '#FDFBF7' }}>
            {/* Prototype badge */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-amber-400 text-amber-900 text-center text-xs font-mono py-1 tracking-wider">
                PROTOTYYPPI v6 — Kokonainen etusivu
            </div>

            <div className="max-w-screen-md mx-auto px-6 sm:px-8 pt-20 pb-32 space-y-32 overflow-x-hidden">

                {/* ═══════════════════════════════════════════════════════════
                    1. HERO — Kapea sisäänkäynti, laaja konteksti
                ═══════════════════════════════════════════════════════════ */}
                <header className="space-y-12 text-left">
                    {/* Bird logo */}
                    <div className="flex justify-start mb-8">
                        <img
                            src="/bird-logo-new.png"
                            alt="Turvasiipi"
                            className="w-24 h-24 md:w-32 md:h-32 object-contain opacity-90"
                        />
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-[#2B2B2B] tracking-tight leading-[1.1] sm:leading-none">
                            Vallan väärinkäytön ja<br />
                            <span className="text-[#4A4A4A]/80 italic font-medium">kiusaamisen opas.</span>
                        </h1>

                        {/* Environment chips */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            {ENVIRONMENTS.map(env => (
                                <span
                                    key={env.label}
                                    className="text-xs border border-[#D8CFC8] text-[#5A4A3A] px-3 py-1 rounded-full bg-white/80"
                                >
                                    {env.icon} {env.label}
                                </span>
                            ))}
                        </div>

                        <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#4A4A4A]">
                            Kun jokin tuntuu väärältä,<br />
                            <span className="italic">mutta et saa siitä kiinni.</span>
                        </p>
                    </div>

                    {/* Validation block */}
                    <div className="bg-[#F8F4F0] border-l-4 border-[#5B4B8A] p-4 max-w-2xl">
                        <p className="text-lg font-medium text-[#2B2B2B]">
                            Kun sanot itsellesi: &ldquo;Ehkä ylireagoin.&rdquo;
                        </p>
                        <p className="text-[#5B4B8A] font-bold">Emme usko sitä.</p>
                    </div>

                    <div className="space-y-6 max-w-2xl text-lg leading-relaxed text-[#4A4A4A]">
                        <p>
                            Tämä on paikka, johon tulla, kun jokin on vialla – työssä, opinnoissa,
                            suhteissa, perheessä tai verkossa. Kun et ole varma, mitä tapahtuu
                            – tai saatko edes puhua siitä.
                        </p>
                        <p>
                            Tämä ei ole ohjeistus muille. Tämä on työkalu sinulle.
                            Saat kielen kokemuksellesi, välineet tilanteen jäsentämiseen
                            ja tavan edetä – askel kerrallaan.
                        </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-2">
                        <Link
                            href="/aloita"
                            className="px-8 py-4 bg-[#2B2B2B] text-white hover:bg-[#5B4B8A] transition-colors rounded-sm font-medium tracking-wide flex items-center gap-3 shadow-lg shadow-black/5"
                        >
                            Tunnista tilanne <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/quiz"
                            className="px-6 py-4 text-[#4A4A4A] border-2 border-[#E8DDD0] hover:border-[#5B4B8A] hover:bg-[#5B4B8A]/5 transition-all rounded-sm font-medium tracking-wide flex items-center gap-3"
                        >
                            Tee tunnistuskysely <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                            onClick={() => setShowDialog(true)}
                            className="px-4 py-4 text-[#5B4B8A] hover:bg-[#5B4B8A]/5 rounded-sm font-medium transition-colors text-sm cursor-pointer"
                        >
                            Miten tämä toimii?
                        </button>
                    </div>

                    {/* Safety notes */}
                    <div className="text-[11px] font-mono text-[#4A4A4A] uppercase tracking-wider space-y-1 border-l-2 border-[#E8DDD0] pl-4">
                        <p>Voit keskeyttää milloin tahansa</p>
                        <p>Mitään ei tallenneta ilman lupaasi</p>
                    </div>
                </header>

                {/* ═══════════════════════════════════════════════════════════
                    2. TILANTEET — "Ehkä tunnistit itsesi"
                ═══════════════════════════════════════════════════════════ */}
                <section className="space-y-10">
                    <div className="space-y-3">
                        <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest">
                            Kenelle tämä on?
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#2B2B2B] leading-tight">
                            Ehkä tunnistit itsesi<br />
                            <span className="font-normal italic text-[#4A4A4A]">
                                yhdessä näistä tilanteista.
                            </span>
                        </h2>
                        <p className="text-sm text-[#6A6A6A] max-w-md">
                            Klikkaa tilannetta nähdäksesi lisää.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {SITUATIONS.map(s => (
                            <SituationCard
                                key={s.id}
                                situation={s}
                                active={activeSituation === s.id}
                                onClick={() => setActiveSituation(
                                    activeSituation === s.id ? null : s.id
                                )}
                            />
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    3. TUNNISTA — "Onko tämä kiusaamista?" (laajennettu)
                ═══════════════════════════════════════════════════════════ */}
                <section className="space-y-12 pt-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2B2B2B]">
                        Onko tämä kiusaamista?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12 text-[#4A4A4A] leading-relaxed">
                        <div className="space-y-6">
                            <p>
                                Kiusaaminen ei aina ole huutamista. Se on usein hiljaista:
                                katseiden välttelyä, tiedon pimittämistä, palavereista unohtamista.
                            </p>
                            <p>
                                Se on sitä, kun tunnet vatsassasi, että jokin on vialla,
                                mutta sinulle sanotaan, että &quot;kuvittelet vain&quot;.
                            </p>
                            <p className="font-semibold text-[#2B2B2B]">Se on systemaattista.</p>
                        </div>

                        <div className="space-y-6">
                            <p>
                                Kyse ei ole aina yhdestä kontekstista. Sama vallan dynamiikka
                                toistuu työpaikoilla, oppilaitoksissa, suhteissa ja perheissä.
                            </p>
                            <p>
                                Jos joudut jatkuvasti varuillesi — on kyseessä työ, koulu
                                tai koti — kyse ei ole enää &quot;kemiasta&quot; tai &quot;huumorista&quot;.
                            </p>

                            <div className="pt-8 flex justify-end">
                                <div className="bg-white border border-[#E8DDD0] p-6 max-w-xs shadow-sm">
                                    <p className="text-[#5B4B8A] italic font-serif text-lg">
                                        &ldquo;Se ei ole riita, jos vain toista lyödään.&rdquo;
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    4. VÄLINEET — "Mitä löydät täältä"
                ═══════════════════════════════════════════════════════════ */}
                <section className="space-y-10">
                    <div className="space-y-3">
                        <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest">
                            Mitä löydät täältä
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#2B2B2B]">
                            Järjestelmä tunnistamiseen.<br />
                            <span className="font-normal italic text-[#4A4A4A]">Välineet ja kieli toimintaan.</span>
                        </h2>
                    </div>

                    <div className="space-y-px border border-[#E8DDD0] rounded-sm overflow-hidden">
                        {TOOLS.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 p-5 bg-white hover:bg-[#F8F4F0] transition-colors"
                            >
                                <span className="text-xl flex-shrink-0">{item.icon}</span>
                                <div>
                                    <p className="text-sm font-bold text-[#2B2B2B]">{item.label}</p>
                                    <p className="text-xs text-[#6A6A6A] mt-0.5">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    5. LOKI — Yksityinen dokumentointi (yhdistetty)
                ═══════════════════════════════════════════════════════════ */}
                <section className="space-y-8 pt-12">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2B2B2B]">
                            Yksityinen loki
                        </h2>
                        <p className="text-xl text-[#4A4A4A]">
                            Kirjoita se ylös. Heti.
                        </p>
                    </div>

                    <div className="bg-[#FDFBF7] border border-[#E8DDD0] p-8 md:p-12 rounded-sm space-y-12">
                        <div className="space-y-4 relative">
                            <div className="absolute -top-14 right-0 bg-[#FDFBF7] px-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#5B4B8A] border border-[#E8DDD0] py-1">
                                YKSITYINEN &amp; SALATTU
                            </div>
                            <p className="text-lg text-[#2B2B2B] leading-relaxed max-w-2xl">
                                Kun olet stressaantunut, muistisi pätkii. Kiusaaja luottaa siihen.
                                Älä anna heille sitä etua.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-y-8 md:gap-x-12">
                            {[
                                'Mitä tapahtui?',
                                'Milloin se tapahtui?',
                                'Kuka oli paikalla?',
                                'Miltä se tuntui?',
                            ].map((q, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 border-2 border-[#E8DDD0] rounded-sm" />
                                    <span className="text-[#4A4A4A] font-medium">{q}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Integrated documentation importance */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="text-sm text-[#4A4A4A] space-y-3 leading-relaxed">
                            <p>
                                Työsuojelu, lääkäri ja liitto kysyvät ensimmäisenä:
                                &quot;Onko sinulla ylhäällä esimerkkejä?&quot;
                            </p>
                            <p>
                                Kun sinulla on mustaa valkoisella, keskustelu muuttuu
                                &quot;sana sanaa vastaan&quot; -väittelystä faktapohjaiseksi.
                            </p>
                        </div>
                        <div className="bg-white border border-[#E8DDD0] p-6 rounded-sm">
                            <h3 className="font-bold text-xs uppercase tracking-widest text-[#5B4B8A] mb-4">
                                Tutkittua tietoa:
                            </h3>
                            <ul className="space-y-3 text-sm text-[#4A4A4A]">
                                <li className="flex gap-3"><span className="text-[#E8DDD0] font-bold">•</span><span>Dokumentointi palauttaa kontrollin tunteen.</span></li>
                                <li className="flex gap-3"><span className="text-[#E8DDD0] font-bold">•</span><span>Päiväkirjan pitäminen vähentää stressioireita.</span></li>
                                <li className="flex gap-3"><span className="text-[#E8DDD0] font-bold">•</span><span>Kirjallinen todiste on oikeudellisesti vahva.</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 text-xs font-mono text-[#4A4A4A] pt-4">
                        <p>Emme tallenna tietojasi pilveen. Kaikki pysyy laitteellasi.</p>
                        <p className="font-bold text-[#2B2B2B]">Voit ladata PDF-raportin milloin vain. Tämä on sinun todistusaineistosi.</p>
                    </div>

                    <div className="pt-4">
                        <Link
                            href="/loki"
                            className="inline-flex items-center gap-3 bg-[#5B4B8A] text-white px-8 py-4 rounded-sm font-bold tracking-wide hover:bg-[#483B6F] transition-colors shadow-lg shadow-[#5B4B8A]/20"
                        >
                            Avaa päiväkirja <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    6. LUPAUS — "Sinulla on päätösvalta"
                ═══════════════════════════════════════════════════════════ */}
                <section className="space-y-12 pt-12 border-t border-transparent">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2B2B2B]">
                        Sinulla on valta
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <p className="text-lg text-[#4A4A4A] leading-relaxed">
                                Me emme päätä puolestasi. Emme kehota sinua irtisanoutumaan,
                                emmekä pakota sinua taistelemaan.
                            </p>

                            <div className="bg-[#FDFBF7] p-8 border-l-4 border-[#E8DDD0]">
                                <p className="text-[#5B4B8A] italic font-serif text-lg leading-relaxed">
                                    &ldquo;Rohkeutta ei ole se, että ei pelkää.
                                    Rohkeutta on se, että toimii pelosta huolimatta.&rdquo;
                                </p>
                            </div>

                            <p className="font-bold text-xl text-[#2B2B2B]">
                                Annamme sinulle kartan ja kompassin. Sinä valitset reitin.
                            </p>
                        </div>

                        <div className="bg-white border border-[#E8DDD0] p-8 rounded-sm h-fit">
                            <h3 className="font-bold text-xs uppercase tracking-widest text-[#2B2B2B] mb-6">
                                Lupauksemme:
                            </h3>
                            <ul className="space-y-4 text-[#4A4A4A] font-mono text-sm">
                                {['Emme painosta.', 'Emme tuomitse.', 'Olemme puolellasi.', 'Sinä päätät.'].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-center">
                                        <div className="w-1.5 h-1.5 bg-[#4A4A4A] rounded-full" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    7. QUOTE — Tunnelma-ankkuri
                ═══════════════════════════════════════════════════════════ */}
                <section className="border-l-4 border-[#5B4B8A] pl-8 max-w-xl space-y-4">
                    <p className="text-2xl font-serif italic text-[#2B2B2B] leading-relaxed">
                        &ldquo;Kiusaaminen ei ole konflikti.
                        Se on vallan epätasapaino,
                        jonka vain toinen osapuoli on valinnut.&rdquo;
                    </p>
                    <p className="text-xs font-mono text-[#8A7A6A] uppercase tracking-widest">
                        Turvasiipi
                    </p>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    8. FOOTER CTA
                ═══════════════════════════════════════════════════════════ */}
                <section className="text-center space-y-12 pt-12 pb-24 border-t border-transparent">
                    <div className="w-16 h-px bg-[#5B4B8A] mx-auto mb-8" />

                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#2B2B2B] leading-tight max-w-2xl mx-auto">
                            Et ole velvollinen tietämään vielä, mitä tämä on.
                        </h2>
                        <p className="text-2xl font-serif italic text-[#4A4A4A]">
                            Riittää, että huomaat sen.
                        </p>
                    </div>

                    <div className="pt-8 flex flex-col items-center gap-8">
                        <Link
                            href="/quiz"
                            className="text-xl font-bold text-[#2B2B2B] border-b-2 border-[#2B2B2B] pb-1 hover:text-[#5B4B8A] hover:border-[#5B4B8A] transition-all flex items-center gap-3"
                        >
                            Tee rauhallinen tilannekartoitus <ArrowRight className="w-5 h-5" />
                        </Link>

                        <div className="text-[10px] uppercase tracking-widest text-[#4A4A4A] space-y-1 opacity-60">
                            <p>Voit lopettaa milloin tahansa.</p>
                            <p>Mitään ei tallennu ilman lupaasi.</p>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    9. FAQ
                ═══════════════════════════════════════════════════════════ */}
                <section className="space-y-12 border-t border-[#E8DDD0] pt-24 mb-24">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-[#2B2B2B]">Usein kysytyt kysymykset</h2>
                        <p className="text-lg text-[#4A4A4A]">Etsimme vastauksia, jotta sinun ei tarvitse.</p>
                    </div>

                    <div className="space-y-4">
                        {FAQ_ITEMS.map((item, i) => (
                            <FAQItem
                                key={i}
                                item={item}
                                open={openFAQ === i}
                                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                            />
                        ))}
                    </div>
                </section>

            </div>

            {/* ═══ DIALOG: How it works ═══ */}
            {showDialog && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.5)' }}
                    onClick={() => setShowDialog(false)}
                >
                    <div
                        className="bg-[#FDFBF7] border border-[#E8DDD0] rounded-sm max-w-xl w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between">
                            <h3 className="text-xl font-bold text-[#2B2B2B]">Miten Turvasiipi toimii?</h3>
                            <button onClick={() => setShowDialog(false)} className="text-[#8A8A8A] hover:text-[#2B2B2B] cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-5">
                            {[
                                { n: '1', title: 'Tunnista järjestelmällisesti', text: 'Tee kyselyt, jotka auttavat nimeämään mekanismit (gaslighting, ulossulkeminen, vallan väärinkäyttö).' },
                                { n: '2', title: 'Sanoita kokemus', text: 'Löydä kieli sille, mikä on tähän asti ollut vain epämääräinen tunne "jostain väärästä".' },
                                { n: '3', title: 'Harjoittele ja tallenna', text: 'Käytä simulaattoreita reaktioiden testaamiseen ja dokumentointityökaluja faktatiedon keräämiseen.' },
                                { n: '4', title: 'Rakenna polku ulos', text: 'Valmennus ja välineet auttavat rakentamaan selkeän, turvallisen polun eteenpäin.' },
                            ].map(step => (
                                <div key={step.n} className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#5B4B8A] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {step.n}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#2B2B2B] text-sm">{step.title}</p>
                                        <p className="text-sm text-[#4A4A4A] mt-0.5">{step.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
