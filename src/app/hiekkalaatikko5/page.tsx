'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';

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
        cta: 'Lähisuhdevävalta ja kontrolli',
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

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HiekkalaatikkoHero() {
    const [activeSituation, setActiveSituation] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false);

    return (
        <div className="min-h-screen" style={{ background: '#FDFBF7' }}>
            {/* Prototype badge */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-amber-400 text-amber-900 text-center text-xs font-mono py-1 tracking-wider">
                PROTOTYYPPI — ei tuotantosivusto
            </div>

            <div className="max-w-screen-lg mx-auto px-6 sm:px-8 pt-20 pb-32 space-y-32">

                {/* ── HERO ── */}
                <header className="space-y-12 max-w-2xl">
                    {/* Bird logo */}
                    <div className="flex justify-start">
                        <img
                            src="/bird-logo-new.png"
                            alt="Turvasiipi"
                            className="w-20 h-20 object-contain opacity-90"
                        />
                    </div>

                    {/* Headline */}
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-[#2B2B2B]">
                            Vallan väärinkäytön ja<br />
                            <span className="text-[#4A4A4A] font-normal italic">kiusaamisen opas.</span>
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
                    </div>

                    {/* Subtitle */}
                    <div className="space-y-6 max-w-xl">
                        <h2 className="text-xl sm:text-2xl font-serif text-[#4A4A4A] leading-relaxed">
                            Kun jokin tuntuu väärältä,<br />
                            <span className="italic">mutta et saa siitä kiinni.</span>
                        </h2>

                        <div className="bg-[#F8F4F0] border-l-4 border-[#5B4B8A] p-4 my-6">
                            <p className="text-lg font-medium text-[#2B2B2B]">
                                Kun sanot itsellesi: &ldquo;Ehkä ylireagoin.&rdquo;
                            </p>
                            <p className="text-[#5B4B8A] font-bold">Emme usko sitä.</p>
                        </div>

                        <div className="space-y-4 text-base text-[#4A4A4A] leading-relaxed">
                            <p>
                                Tämä on paikka, johon tulla, kun jokin on vialla – työssä, kouluissa,
                                parisuhteessa, perheessä tai verkossa. Kun et ole varma, mitä tapahtuu
                                – tai saatko edes puhua siitä.
                            </p>
                            <p>
                                Tämä ei ole ohjeistus muille. Tämä on työkalu sinulle.
                                Saat kielen kokemuksellesi, välineet tilanteen jäsentämiseen
                                ja tavan edetä – askel kerrallaan.
                            </p>
                        </div>
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
                            className="px-4 py-4 text-[#5B4B8A] hover:bg-[#5B4B8A]/5 rounded-sm font-medium transition-colors text-sm"
                        >
                            Miten tämä toimii?
                        </button>
                    </div>

                    {/* Safety note */}
                    <div className="text-[11px] font-mono text-[#4A4A4A] uppercase tracking-wider space-y-1 border-l-2 border-[#E8DDD0] pl-4">
                        <p>Voit keskeyttää milloin tahansa</p>
                        <p>Mitään ei tallenneta ilman lupaasi</p>
                    </div>
                </header>

                {/* ── WHO IS THIS FOR ── */}
                <section className="space-y-10">
                    <div className="space-y-3">
                        <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest">
                            Kenelle tämä on?
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2B2B] leading-tight">
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

                {/* ── WHAT WE OFFER ── */}
                <section className="space-y-10 max-w-2xl">
                    <div className="space-y-3">
                        <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest">
                            Mitä löydät täältä
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2B2B]">
                            Järjestelmä tunnistamiseen.<br />
                            <span className="font-normal italic text-[#4A4A4A]">Välineet ja kieli toimintaan.</span>
                        </h2>
                    </div>

                    <div className="space-y-px border border-[#E8DDD0] rounded-sm overflow-hidden">
                        {[
                            { icon: '🔍', label: 'Tunnistustyökalut', desc: 'Kyselyt jotka auttavat nimeämään mitä tapahtuu' },
                            { icon: '🎮', label: 'Simulaattorit', desc: 'Harjoittele reagoimista turvallisessa ympäristössä' },
                            { icon: '📂', label: 'Dokumentointi', desc: 'Kirjaa tapahtumat selkeästi — muistia ei pidä luottaa' },
                            { icon: '🧠', label: 'Tietopankki', desc: 'Vallan dynamiikka, taktikat, kiusaamisen mekanismit' },
                            { icon: '🛡', label: 'Turvalauseharjoitukset', desc: 'Sanat tilanteisiin, joissa sanat loppuvat' },
                        ].map((item, i) => (
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

                {/* ── QUOTE ── */}
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

            </div>

            {/* ── DIALOG: How it works ── */}
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
                            <button onClick={() => setShowDialog(false)} className="text-[#8A8A8A] hover:text-[#2B2B2B]">
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
