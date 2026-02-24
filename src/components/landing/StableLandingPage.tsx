"use client";

import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { ArrowRight, X, ChevronDown } from "lucide-react";

// ─── Static data (contains routes & colors — not translatable) ────────────────

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
                'border rounded-sm p-4 sm:p-5 transition-all duration-200',
                active
                    ? 'bg-white border-[#5B4B8A] shadow-md'
                    : 'bg-white/60 border-[#E8DDD0] hover:border-[#C8C0D8] hover:bg-white',
            ].join(' ')}>
                <div className="flex items-start gap-3">
                    <span className="text-xl sm:text-2xl flex-shrink-0 mt-0.5">{situation.icon}</span>
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

// ─── Main Component ──────────────────────────────────────────────────────────

export function StableLandingPage() {
    const { t } = useTranslation('landing');
    const [activeSituation, setActiveSituation] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    // Helper to safely get array from translations
    const getList = (key: string): string[] => {
        const result = t(key, { returnObjects: true });
        return Array.isArray(result) ? result : [];
    };

    // FAQ items from translations
    const faqItems = [
        { q: t('landing.faq.q1'), a: t('landing.faq.a1') },
        { q: t('landing.faq.q2'), a: t('landing.faq.a2') },
        { q: t('landing.faq.q3'), a: t('landing.faq.a3') },
        { q: t('landing.faq.q4'), a: t('landing.faq.a4') },
        { q: t('landing.faq.q5'), a: t('landing.faq.a5') },
        { q: t('landing.faq.q6'), a: t('landing.faq.a6') },
        { q: t('landing.faq.q9'), a: t('landing.faq.a9_text') + ' ' + t('landing.faq.a9_list_1') + ' · ' + t('landing.faq.a9_list_2') + ' · ' + t('landing.faq.a9_list_3') },
    ];

    return (
        <div className="min-h-screen" style={{ background: '#FDFBF7' }}>


            <div className="px-6 sm:px-8 max-w-screen-md mx-auto space-y-24 sm:space-y-32 pb-32 pt-20 overflow-x-hidden">

                {/* ═══════════════════════════════════════════════════════════
                1. HERO — Kapea sisäänkäynti, laaja konteksti
            ═══════════════════════════════════════════════════════════ */}
                <header className="space-y-8 sm:space-y-12 text-left">
                    {/* Bird logo */}
                    <div className="flex justify-start mb-4 sm:mb-8">
                        <img
                            src="/bird-logo.png"
                            alt="Turvasiipi"
                            className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain opacity-90"
                        />
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif text-[#2B2B2B] tracking-tight leading-[1.15]">
                            {t('landing.hero.title_start')}{' '}
                            <br className="hidden sm:block" />
                            <span className="text-[#4A4A4A]/80 italic font-medium">{t('landing.hero.title_end')}</span>
                        </h1>

                        {/* Environment chips */}
                        <div className="flex flex-wrap gap-2 pt-1 sm:pt-2">
                            {ENVIRONMENTS.map(env => (
                                <span
                                    key={env.label}
                                    className="text-[11px] sm:text-xs border border-[#D8CFC8] text-[#5A4A3A] px-2.5 sm:px-3 py-1 rounded-full bg-white/80"
                                >
                                    {env.icon} {env.label}
                                </span>
                            ))}
                        </div>

                        <p className="text-lg sm:text-2xl md:text-3xl font-serif italic text-[#4A4A4A] leading-relaxed">
                            {t('landing.hero.subtitle')}
                        </p>
                    </div>

                    {/* Validation block */}
                    <div className="bg-[#F8F4F0] border-l-4 border-[#5B4B8A] p-4 max-w-2xl">
                        <p className="text-base sm:text-lg font-medium text-[#2B2B2B]">
                            {t('landing.hero.subtitle_validation')}
                        </p>
                        <p className="text-[#5B4B8A] font-bold">{t('landing.hero.subtitle_validation_response')}</p>
                    </div>

                    <div className="space-y-4 sm:space-y-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#4A4A4A]">
                        <p>{t('landing.hero.p1')}</p>
                        <p>{t('landing.hero.p2')}</p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center pt-2">
                        <Link
                            href="/aloita"
                            className="px-6 sm:px-8 py-4 bg-[#2B2B2B] text-white hover:bg-[#5B4B8A] transition-colors rounded-sm font-medium tracking-wide flex items-center justify-center gap-3 shadow-lg shadow-black/5"
                        >
                            {t('landing.hero.cta_start')} <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/quiz"
                            className="px-6 py-4 text-[#4A4A4A] border-2 border-[#E8DDD0] hover:border-[#5B4B8A] hover:bg-[#5B4B8A]/5 transition-all rounded-sm font-medium tracking-wide flex items-center justify-center gap-3"
                        >
                            {t('landing.hero.cta_main')} <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                            onClick={() => setShowDialog(true)}
                            className="px-4 py-3 sm:py-4 text-[#5B4B8A] hover:bg-[#5B4B8A]/5 rounded-sm font-medium transition-colors text-sm cursor-pointer"
                        >
                            {t('landing.hero.cta_how')}
                        </button>
                    </div>

                    {/* Safety notes */}
                    <div className="text-[11px] font-mono text-[#4A4A4A] uppercase tracking-wider space-y-1 border-l-2 border-[#E8DDD0] pl-4">
                        <p>{t('landing.hero.read_first')}</p>
                        <p>{t('landing.hero.quit_anytime')}</p>
                    </div>
                </header>

                {/* ═══════════════════════════════════════════════════════════
                2. TILANTEET — "Ehkä tunnistit itsesi"
            ═══════════════════════════════════════════════════════════ */}
                <section className="space-y-8 sm:space-y-10">
                    <div className="space-y-3">
                        <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest">
                            {t('landing.situations.label')}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#2B2B2B] leading-tight">
                            {t('landing.situations.title')}<br />
                            <span className="font-normal italic text-[#4A4A4A]">
                                {t('landing.situations.title_span')}
                            </span>
                        </h2>
                        <p className="text-sm text-[#6A6A6A] max-w-md">
                            {t('landing.situations.hint')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <section className="space-y-8 sm:space-y-12 pt-8 sm:pt-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#2B2B2B]">
                        {t('landing.comparison.title')}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 sm:gap-12 text-[#4A4A4A] leading-relaxed">
                        <div className="space-y-4 sm:space-y-6">
                            <p>{t('landing.comparison.col1_p1')}</p>
                            <p>{t('landing.comparison.col1_p2')}</p>
                            <p className="font-semibold text-[#2B2B2B]">{t('landing.comparison.col1_p3')}</p>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            <p>{t('landing.comparison.col2_p1')}</p>
                            <p>{t('landing.comparison.col2_p2')}</p>

                            <div className="pt-4 sm:pt-8 flex justify-start md:justify-end">
                                <div className="bg-white border border-[#E8DDD0] p-5 sm:p-6 max-w-xs shadow-sm">
                                    <p className="text-[#5B4B8A] italic font-serif text-base sm:text-lg">
                                        {t('landing.comparison.quote')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                4. VÄLINEET — "Mitä löydät täältä"
            ═══════════════════════════════════════════════════════════ */}
                <section className="space-y-8 sm:space-y-10">
                    <div className="space-y-3">
                        <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest">
                            {t('landing.tools.label')}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#2B2B2B]">
                            {t('landing.tools.title')}<br />
                            <span className="font-normal italic text-[#4A4A4A]">{t('landing.tools.title_span')}</span>
                        </h2>
                    </div>

                    <div className="space-y-px border border-[#E8DDD0] rounded-sm overflow-hidden">
                        {TOOLS.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 p-4 sm:p-5 bg-white hover:bg-[#F8F4F0] transition-colors"
                            >
                                <span className="text-lg sm:text-xl flex-shrink-0">{item.icon}</span>
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
                <section className="space-y-6 sm:space-y-8 pt-8 sm:pt-12">
                    <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#2B2B2B]">
                            {t('landing.log.title')}
                        </h2>
                        <p className="text-lg sm:text-xl text-[#4A4A4A]">
                            {t('landing.log.subtitle')}
                        </p>
                    </div>

                    <div className="bg-[#FDFBF7] border border-[#E8DDD0] p-6 sm:p-8 md:p-12 rounded-sm space-y-8 sm:space-y-12">
                        <div className="space-y-4 relative">
                            <div className="absolute -top-10 sm:-top-14 right-0 bg-[#FDFBF7] px-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#5B4B8A] border border-[#E8DDD0] py-1">
                                {t('landing.log.badge')}
                            </div>
                            <p className="text-base sm:text-lg text-[#2B2B2B] leading-relaxed max-w-2xl">
                                {t('landing.log.box_text')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-y-8 md:gap-x-12">
                            {[
                                t('landing.log.questions.what'),
                                t('landing.log.questions.when'),
                                t('landing.log.questions.who'),
                                t('landing.log.questions.how'),
                            ].map((q, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-[#E8DDD0] rounded-sm flex-shrink-0" />
                                    <span className="text-[#4A4A4A] font-medium text-sm sm:text-base">{q}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Integrated documentation importance */}
                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                        <div className="text-sm text-[#4A4A4A] space-y-3 leading-relaxed">
                            <p>{t('landing.log.importance_p1')}</p>
                            <p>{t('landing.log.importance_p2')}</p>
                        </div>
                        <div className="bg-white border border-[#E8DDD0] p-5 sm:p-6 rounded-sm">
                            <h3 className="font-bold text-xs uppercase tracking-widest text-[#5B4B8A] mb-4">
                                {t('landing.log.research_title')}
                            </h3>
                            <ul className="space-y-3 text-sm text-[#4A4A4A]">
                                {getList('landing.log.research').map((item, i) => (
                                    <li key={i} className="flex gap-3">
                                        <span className="text-[#E8DDD0] font-bold">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 text-xs font-mono text-[#4A4A4A] pt-2 sm:pt-4">
                        <p>{t('landing.log.privacy.local')}</p>
                        <p className="font-bold text-[#2B2B2B]">{t('landing.log.privacy.pdf')}</p>
                    </div>

                    <div className="pt-2 sm:pt-4">
                        <Link
                            href="/loki"
                            className="inline-flex items-center gap-3 bg-[#5B4B8A] text-white px-6 sm:px-8 py-4 rounded-sm font-bold tracking-wide hover:bg-[#483B6F] transition-colors shadow-lg shadow-[#5B4B8A]/20"
                        >
                            {t('landing.log.cta')} <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                6. LUPAUS — "Sinulla on päätösvalta"
            ═══════════════════════════════════════════════════════════ */}
                <section className="space-y-8 sm:space-y-12 pt-8 sm:pt-12 border-t border-transparent">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#2B2B2B]">
                        {t('landing.power.title')}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
                        <div className="space-y-6 sm:space-y-8">
                            <p className="text-base sm:text-lg text-[#4A4A4A] leading-relaxed">
                                {t('landing.power.text')}
                            </p>

                            <div className="bg-[#FDFBF7] p-6 sm:p-8 border-l-4 border-[#E8DDD0]">
                                <p className="text-[#5B4B8A] italic font-serif text-base sm:text-lg leading-relaxed">
                                    {t('landing.power.quote')}
                                </p>
                            </div>

                            <p className="font-bold text-lg sm:text-xl text-[#2B2B2B]">
                                {t('landing.power.text_bold')}
                            </p>
                        </div>

                        <div className="bg-white border border-[#E8DDD0] p-6 sm:p-8 rounded-sm h-fit">
                            <h3 className="font-bold text-xs uppercase tracking-widest text-[#2B2B2B] mb-4 sm:mb-6">
                                {t('landing.power.box_title')}
                            </h3>
                            <ul className="space-y-3 sm:space-y-4 text-[#4A4A4A] font-mono text-sm">
                                {getList('landing.power.list').map((item, i) => (
                                    <li key={i} className="flex gap-3 items-center">
                                        <div className="w-1.5 h-1.5 bg-[#4A4A4A] rounded-full flex-shrink-0" />
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
                <section className="border-l-4 border-[#5B4B8A] pl-6 sm:pl-8 max-w-xl space-y-4">
                    <p className="text-xl sm:text-2xl font-serif italic text-[#2B2B2B] leading-relaxed">
                        &ldquo;{t('landing.quote.text')}&rdquo;
                    </p>
                    <p className="text-xs font-mono text-[#8A7A6A] uppercase tracking-widest">
                        {t('landing.quote.author')}
                    </p>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                8. FOOTER CTA
            ═══════════════════════════════════════════════════════════ */}
                <section className="text-center space-y-8 sm:space-y-12 pt-8 sm:pt-12 pb-16 sm:pb-24 border-t border-transparent">
                    <div className="w-16 h-px bg-[#5B4B8A] mx-auto mb-6 sm:mb-8" />

                    <div className="space-y-4 sm:space-y-6">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-serif text-[#2B2B2B] leading-tight max-w-2xl mx-auto">
                            {t('landing.footer_slogan.title')}
                        </h2>
                        <p className="text-xl sm:text-2xl font-serif italic text-[#4A4A4A]">
                            {t('landing.footer_slogan.subtitle')}
                        </p>
                    </div>

                    <div className="pt-4 sm:pt-8 flex flex-col items-center gap-6 sm:gap-8">
                        <Link
                            href="/quiz"
                            className="text-lg sm:text-xl font-bold text-[#2B2B2B] border-b-2 border-[#2B2B2B] pb-1 hover:text-[#5B4B8A] hover:border-[#5B4B8A] transition-all flex items-center gap-3"
                        >
                            {t('landing.footer_slogan.cta')} <ArrowRight className="w-5 h-5" />
                        </Link>

                        <div className="text-[10px] uppercase tracking-widest text-[#4A4A4A] space-y-1 opacity-60">
                            <p>{t('landing.footer_slogan.disclaimer_1')}</p>
                            <p>{t('landing.footer_slogan.disclaimer_2')}</p>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                9. FAQ
            ═══════════════════════════════════════════════════════════ */}
                <section className="space-y-8 sm:space-y-12 border-t border-[#E8DDD0] pt-16 sm:pt-24 mb-16 sm:mb-24">
                    <div className="text-center space-y-3 sm:space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2B2B]">{t('landing.faq.title')}</h2>
                        <p className="text-base sm:text-lg text-[#4A4A4A]">{t('landing.faq.subtitle')}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        {faqItems.map((item, i) => (
                            <div key={i} className="border border-[#E8DDD0] bg-white rounded-sm">
                                <button
                                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                                    className="w-full flex items-center justify-between p-4 sm:p-6 text-left cursor-pointer"
                                >
                                    <span className="text-base sm:text-lg font-medium text-[#2B2B2B] pr-4">{item.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-[#8A8A8A] flex-shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180' : ''}`} />
                                </button>
                                {openFAQ === i && (
                                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base text-[#4A4A4A] leading-relaxed animate-[fadeIn_0.15s_ease]">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══ DIALOG: How it works ═══ */}
                {showDialog && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(0,0,0,0.5)' }}
                        onClick={() => setShowDialog(false)}
                    >
                        <div
                            className="bg-[#FDFBF7] border border-[#E8DDD0] rounded-sm max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-start justify-between">
                                <h3 className="text-lg sm:text-xl font-bold text-[#2B2B2B]">{t('landing.hero.dialog.title')}</h3>
                                <button onClick={() => setShowDialog(false)} className="text-[#8A8A8A] hover:text-[#2B2B2B] cursor-pointer">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-4 sm:space-y-5">
                                {[
                                    { n: '1', title: t('landing.hero.dialog.step1_title'), text: t('landing.hero.dialog.step1_text') },
                                    { n: '2', title: t('landing.hero.dialog.step2_title'), text: t('landing.hero.dialog.step2_text') },
                                    { n: '3', title: t('landing.hero.dialog.step3_title'), text: t('landing.hero.dialog.step3_text') },
                                    { n: '4', title: t('landing.hero.dialog.step4_title'), text: t('landing.hero.dialog.step4_text') },
                                ].map(step => (
                                    <div key={step.n} className="flex gap-3 sm:gap-4">
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
        </div>
    );
}

