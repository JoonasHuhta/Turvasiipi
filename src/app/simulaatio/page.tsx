"use client";

import React, { useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, Briefcase, Ghost, Infinity, Laptop, Stethoscope, GraduationCap, Users, Zap, TrendingUp, Swords, Eye, MessageSquare, UserCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { simulatorRegistry, getTypeLabel, getPersonaLabel } from "@/lib/simulator-registry";
// LOCKED: DO NOT EDIT WITHOUT EXPLICIT PERMISSION

import { useLanguage } from "@/context/LanguageContext";

export default function SimulatorPage() {
    const { t, loadNamespace } = useLanguage();

    useEffect(() => {
        loadNamespace('simulation');
    }, [loadNamespace]);


    return (
        <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-32 space-y-32">

            {/* Header / Intro - Maximum Whitespace */}
            <header className="space-y-12 max-w-2xl">
                <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1">
                    {t('simulation.header.label')}
                </span>

                <h1 className="text-4xl md:text-5xl font-bold text-[#2B2B2B] leading-[1.1] tracking-tight">
                    {t('simulation.header.title')} <br />
                    <span className="text-[#4A4A4A] font-normal italic">{t('simulation.header.title_span')}</span>
                </h1>

                <div className="space-y-6 max-w-xl">
                    <p className="text-lg text-[#4A4A4A] leading-relaxed">
                        {t('simulation.header.p1')}
                    </p>
                    <p className="text-lg text-[#4A4A4A] leading-relaxed">
                        {t('simulation.header.p2')}
                    </p>
                </div>

                <div className="pt-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="text-[12px] font-mono uppercase tracking-wider text-[#4A4A4A] hover:text-[#5B4B8A] border-b border-[#E8DDD0] hover:border-[#5B4B8A] transition-colors pb-0.5 ml-1">
                                {t('simulation.header.cta_how')}
                            </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xl bg-[#FDFBF7] border-[#E8DDD0] p-12">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-serif text-[#2B2B2B] mb-6">{t('simulation.header.dialog.title')}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 text-[#4A4A4A] leading-relaxed">
                                <p>
                                    <strong>{t('simulation.header.dialog.p1_bold')}</strong> {t('simulation.header.dialog.p1_text')}
                                </p>
                                <p>
                                    <strong>{t('simulation.header.dialog.p2_bold')}</strong> {t('simulation.header.dialog.p2_text')}
                                </p>
                                <p>
                                    <strong>{t('simulation.header.dialog.p3_bold')}</strong> {t('simulation.header.dialog.p3_text')}
                                </p>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </header>

            {/* ─── Kategoria-navigaatio ─── */}
            <nav className="flex flex-wrap gap-2 border-t border-[#E8DDD0] pt-8" aria-label="Simulaattorikatalogin kategoriat">
                {[
                    { href: '#kiusaaminen', label: 'Kiusaamissimulaattorit', emoji: '⚔️' },
                    { href: '#sivullinen', label: 'Sivullisen rooli', emoji: '👁' },
                    { href: '#tekija', label: 'Tekijän rooli', emoji: '🎭' },
                    { href: '#neuro', label: 'Neuromoninaisuus', emoji: '∞' },
                    { href: '#ammattialat', label: 'Ammattialat', emoji: '💼' },
                    { href: '#nuoret', label: 'Nuoret', emoji: '⚡' },
                ].map(({ href, label, emoji }) => (
                    <a
                        key={href}
                        href={href}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#5B4B8A] border border-[#5B4B8A]/30 bg-[#5B4B8A]/5 hover:bg-[#5B4B8A]/15 hover:border-[#5B4B8A]/60 rounded-full px-3 py-1 transition-colors"
                    >
                        <span>{emoji}</span>
                        <span>{label}</span>
                    </a>
                ))}
            </nav>

            {/* KIUSAAMISSIMULAATTORIT — Primary simulator suite */}
            <section id="kiusaaminen" className="space-y-16 border-t border-[#E8DDD0] pt-24">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                    <h2 className="text-2xl font-bold text-[#2B2B2B] flex items-center gap-3">
                        <Swords className="w-6 h-6 text-[#5B4B8A]" />
                        Kiusaamissimulaattorit
                    </h2>
                    <p className="text-[#4A4A4A] italic max-w-md">
                        Harjoittele tunnistamaan ja reagoimaan — uhrina, todistajana tai viestijänä.
                    </p>
                </div>

                {/* Learning arc label */}
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716C]">Oppimispolku</span>
                    <div className="flex items-center gap-1.5">
                        {[
                            { label: 'Tunnista', active: true },
                            { label: 'Reagoi', active: true },
                            { label: 'Puutu', active: true },
                            { label: 'Viesti', active: true },
                            { label: 'Dokumentoi', active: false },
                            { label: 'Toivu', active: false },
                        ].map((step, i, arr) => (
                            <React.Fragment key={step.label}>
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm border ${step.active
                                    ? 'text-[#5B4B8A] bg-[#5B4B8A]/8 border-[#5B4B8A]/30'
                                    : 'text-[#C4B5A5] border-[#E8DDD0]'
                                    }`}>
                                    {step.label}
                                </span>
                                {i < arr.length - 1 && (
                                    <span className="text-[#D0C4B8] text-[10px]">→</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Link href="/simulaatio/kiusaaminen/isolation-dialogue-1" className="block h-full">
                        <SimulationCard
                            icon={<Eye className="w-5 h-5" />}
                            title="Hiljainen eristäminen"
                            description="Olet uusi IT-tiimissä. Kutsuja ei tule, huomioita ei saa. Milloin kyse on kiusaamisesta?"
                            simulatorType="dialogue-tree"
                            arcLabel="Tunnista"
                            arcLevel={1}
                            persona="Uhrin rooli"
                            durationMinutes={5}
                        />
                    </Link>
                    <Link href="/simulaatio/kiusaaminen/micromanagement-dialogue-1" className="block h-full">
                        <SimulationCard
                            icon={<Swords className="w-5 h-5" />}
                            title="Mikromanagerointi"
                            description="Uusi esimies vaatii mahdottomia ja muuttaa sääntöjä jälkikäteen. Miten reagoit?"
                            simulatorType="dialogue-tree"
                            arcLabel="Reagoi"
                            arcLevel={2}
                            persona="Uhrin rooli"
                            durationMinutes={6}
                        />
                    </Link>
                    <Link href="/simulaatio/kiusaaminen/bystander-dialogue-1" className="block h-full">
                        <SimulationCard
                            icon={<UserCheck className="w-5 h-5" />}
                            title="Palaverin lasiseinä"
                            description="Kollega nöyryytetään julkisesti. Et ole kohde — olet todistaja. Mitä teet?"
                            simulatorType="dialogue-tree"
                            arcLabel="Puutu"
                            arcLevel={3}
                            persona="Sivustakatsojan rooli"
                            durationMinutes={7}
                            isNew
                        />
                    </Link>
                    <Link href="/simulaatio/kiusaaminen/biff-email-scenario" className="block h-full">
                        <SimulationCard
                            icon={<MessageSquare className="w-5 h-5" />}
                            title="Sähköpostimyrsky"
                            description="Saat syyttävän sähköpostin koko tiimin nähden. Harjoittele BIFF-vastausta."
                            simulatorType="dialogue-tree"
                            arcLabel="Viesti"
                            arcLevel={4}
                            persona="Uhrin rooli"
                            durationMinutes={4}
                        />
                    </Link>
                </div>
            </section>

            {/* SIVULLISEN ROOLI — Bystander Simulator */}
            <section id="sivullinen" className="space-y-8 border-t border-[#E8DDD0] pt-24">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                    <h2 className="text-2xl font-bold text-[#2B2B2B] flex items-center gap-3">
                        <ShieldCheck className="w-6 h-6 text-[#5B4B8A]" />
                        Sivullisen rooli
                    </h2>
                    <p className="text-[#4A4A4A] italic max-w-md">
                        Et ole kohde, et ole tekijä — olet todistaja. Mitä teet?
                    </p>
                </div>

                {/* Featured card */}
                <Link href="/simulaatio/bystander" className="block group">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 group-hover:border-indigo-400 rounded-2xl p-8 transition-all duration-200 group-hover:shadow-lg">
                        <div className="flex items-start justify-between gap-6">
                            <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 bg-white border border-indigo-200 px-2 py-0.5 rounded-sm">
                                        🎮 5 harjoitusta
                                    </span>
                                    <span className="text-[10px] font-mono text-[#6B7280]">
                                        Hollaback! 5D-malli
                                    </span>
                                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-sm uppercase tracking-wide">
                                        Uusi
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-[#2B2B2B] group-hover:text-indigo-700 transition-colors">
                                    Bystander-treeni
                                </h3>
                                <p className="text-[#4A4A4A] leading-relaxed max-w-xl">
                                    Viisiosainen harjoitusohjelma, joka kulkee psykologisesti turvallisesti:
                                    tunnista tilanne, sääde hermosto, valitse strategia, harjoittele sanoaminen,
                                    suunnitele suojautuminen.
                                </p>
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {['🔍 Tunnista', '🌬 Säädä', '🎯 Valitse', '💬 Sano', '🛡 Suojaa'].map(s => (
                                        <span key={s} className="text-xs bg-white text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3 text-[11px] text-[#78716C] pt-1">
                                    <span>👁 Sivustakatsojan rooli</span>
                                    <span>🕐 ~12 min / harjoitus</span>
                                    <span>📊 5 skenaariota</span>
                                </div>
                            </div>
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-12 h-12 rounded-full bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                                    <ArrowRight className="w-5 h-5 text-indigo-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </section>

            {/* TEKIJÄN ROOLI — Perpetrator Simulator */}
            <section id="tekija" className="space-y-8 border-t border-[#E8DDD0] pt-24">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                    <h2 className="text-2xl font-bold text-[#2B2B2B] flex items-center gap-3">
                        <Swords className="w-6 h-6 text-amber-600" />
                        Tekijän rooli
                    </h2>
                    <p className="text-[#4A4A4A] italic max-w-md">
                        Ei kenestäkään tulee paha yhdessä yössä. Ymmärrä — äläkä toista.
                    </p>
                </div>

                {/* Featured card */}
                <Link href="/simulaatio/tekija" className="block group">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 group-hover:border-amber-400 rounded-2xl p-8 transition-all duration-200 group-hover:shadow-lg">
                        <div className="flex items-start justify-between gap-6">
                            <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 bg-white border border-amber-200 px-2 py-0.5 rounded-sm">
                                        🎮 5 skenaariota
                                    </span>
                                    <span className="text-[10px] font-mono text-[#6B7280]">
                                        Trauma-tietoinen · Ei stigmatisoiva
                                    </span>
                                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-sm uppercase tracking-wide">
                                        Uusi
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-[#2B2B2B] group-hover:text-amber-700 transition-colors">
                                    Tekijä-treeni
                                </h3>
                                <p className="text-[#4A4A4A] leading-relaxed max-w-xl">
                                    Viisiosainen harjoitus joka vie sinut tilanteisiin joissa ihminen tekee väärin —
                                    stressin, ryhmäpaineen tai uupumuksen ajamana. Tunnistamalla polku, voi muuttaa suunnan.
                                </p>
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {['😤 Tunnista paine', '⚠️ Vaaravyöhyke', '↩️ Rewind', '🌱 Korjaava liike'].map(s => (
                                        <span key={s} className="text-xs bg-white text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3 text-[11px] text-[#78716C] pt-1">
                                    <span>🎭 Tekijän rooli</span>
                                    <span>🕐 ~20 min / skenaario</span>
                                    <span>📊 5 skenaariota</span>
                                </div>
                            </div>
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                                    <ArrowRight className="w-5 h-5 text-amber-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </section>

            {/* NEUROMONINAISUUS - The Core Experience */}
            <section id="neuro" className="space-y-16 border-t border-[#E8DDD0] pt-24">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                    <h2 className="text-2xl font-bold text-[#2B2B2B] flex items-center gap-3">
                        <Infinity className="w-6 h-6 text-[#5B4B8A]" />
                        {t('simulation.neuro.title')}
                    </h2>
                    <p className="text-[#4A4A4A] italic max-w-md">
                        {t('simulation.neuro.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <Link href="/simulaatio/neuro" className="block h-full">
                        <SimulationCard
                            icon={<Infinity className="w-5 h-5" />}
                            title={t('simulation.neuro.cards.neuro.title')}
                            description={t('simulation.neuro.cards.neuro.desc')}
                            simulatorType="dialogue-tree"
                            arcLabel="Tunnista"
                            arcLevel={1}
                            persona="Uhrin rooli"
                            durationMinutes={5}
                        />
                    </Link>
                    <Link href="/simulaatio/performance-trap" className="block h-full">
                        <SimulationCard
                            icon={<TrendingUp className="w-5 h-5" />}
                            title={t('simulation.neuro.cards.performance.title')}
                            description={t('simulation.neuro.cards.performance.desc')}
                            simulatorType="dialogue-tree"
                            arcLabel="Tunnista"
                            arcLevel={1}
                            persona="Uhrin rooli"
                            durationMinutes={6}
                        />
                    </Link>
                    <Link href="/simulaatio/information-shadow" className="block h-full">
                        <SimulationCard
                            icon={<Ghost className="w-5 h-5" />}
                            title={t('simulation.neuro.cards.shadow.title')}
                            description={t('simulation.neuro.cards.shadow.desc')}
                            simulatorType="dialogue-tree"
                            arcLabel="Tunnista"
                            arcLevel={1}
                            persona="Uhrin rooli"
                            durationMinutes={5}
                        />
                    </Link>
                </div>
            </section>

            {/* AMMATTIALAT - Context Specific */}
            <section id="ammattialat" className="space-y-16 border-t border-[#E8DDD0] pt-24">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                    <h2 className="text-2xl font-bold text-[#2B2B2B] flex items-center gap-3">
                        <Briefcase className="w-6 h-6 text-[#5B4B8A]" />
                        {t('simulation.sector.title')}
                    </h2>
                    <p className="text-[#4A4A4A] italic max-w-md">
                        {t('simulation.sector.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <Link href="/simulaatio/hoitaja" className="block h-full">
                        <SimulationCard
                            icon={<Stethoscope className="w-5 h-5" />}
                            title={t('simulation.sector.cards.nurse.title')}
                            description={t('simulation.sector.cards.nurse.desc')}
                            simulatorType="dialogue-tree"
                            arcLabel="Tunnista"
                            arcLevel={1}
                            persona="Uhrin rooli"
                            durationMinutes={6}
                        />
                    </Link>
                    <Link href="/simulaatio/opettaja" className="block h-full">
                        <SimulationCard
                            icon={<GraduationCap className="w-5 h-5" />}
                            title={t('simulation.sector.cards.teacher.title')}
                            description={t('simulation.sector.cards.teacher.desc')}
                            simulatorType="dialogue-tree"
                            arcLabel="Tunnista"
                            arcLevel={1}
                            persona="Uhrin rooli"
                            durationMinutes={5}
                        />
                    </Link>
                    <Link href="/simulaatio/it" className="block h-full">
                        <SimulationCard
                            icon={<Laptop className="w-5 h-5" />}
                            title={t('simulation.sector.cards.it.title')}
                            description={t('simulation.sector.cards.it.desc')}
                            simulatorType="dialogue-tree"
                            arcLabel="Tunnista"
                            arcLevel={1}
                            persona="Uhrin rooli"
                            durationMinutes={5}
                        />
                    </Link>
                    <Link href="/simulaatio/esimies" className="block h-full">
                        <SimulationCard
                            icon={<Users className="w-5 h-5" />}
                            title={t('simulation.sector.cards.manager.title')}
                            description={t('simulation.sector.cards.manager.desc')}
                            simulatorType="dialogue-tree"
                            arcLabel="Puutu"
                            arcLevel={3}
                            persona="Esihenkilön rooli"
                            durationMinutes={7}
                        />
                    </Link>
                </div>
            </section>

            {/* NUORET - Vulnerability Context */}
            <section id="nuoret" className="space-y-16 border-t border-[#E8DDD0] pt-24">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                    <h2 className="text-2xl font-bold text-[#2B2B2B] flex items-center gap-3">
                        <Zap className="w-6 h-6 text-[#5B4B8A]" />
                        {t('simulation.youth.title')}
                    </h2>
                    <p className="text-[#4A4A4A] italic max-w-md">
                        {t('simulation.youth.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <Link href="/simulaatio/nuoret" className="block h-full">
                        <SimulationCard
                            icon={<Zap className="w-5 h-5" />}
                            title={t('simulation.youth.cards.new.title')}
                            description={t('simulation.youth.cards.new.desc')}
                            simulatorType="dialogue-tree"
                            arcLabel="Tunnista"
                            arcLevel={1}
                            persona="Uhrin rooli"
                            durationMinutes={5}
                        />
                    </Link>
                </div>
            </section>

        </div>
    );
}

interface SimulationCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    isNew?: boolean;
    // Registry metadata — all optional for backwards compatibility
    simulatorType?: 'dialogue-tree' | 'scenario' | 'text-only';
    arcLabel?: string;
    arcLevel?: number;
    persona?: string;
    durationMinutes?: number;
}

function SimulationCard({
    title,
    description,
    icon,
    isNew = false,
    simulatorType,
    arcLabel,
    arcLevel,
    persona,
    durationMinutes,
}: SimulationCardProps) {
    const { t } = useLanguage();

    const typeLabel =
        simulatorType === 'dialogue-tree'
            ? '🎮 Simulaattori'
            : simulatorType === 'scenario'
                ? '📖 Harjoitus'
                : simulatorType === 'text-only'
                    ? '💭 Reflektio'
                    : null;

    return (
        <div className="group relative flex flex-col h-full cursor-pointer bg-white/60 hover:bg-white border border-[#E8DDD0] hover:border-[#5B4B8A]/40 rounded-lg p-5 transition-all duration-200 hover:shadow-md">
            {/* Top badges row */}
            <div className="flex items-center justify-between mb-3 min-h-[22px]">
                <div className="flex items-center gap-2 flex-wrap">
                    {typeLabel && (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#5B4B8A] bg-[#5B4B8A]/8 border border-[#5B4B8A]/20 px-2 py-0.5 rounded-sm">
                            {typeLabel}
                        </span>
                    )}
                    {arcLevel !== undefined && arcLabel && (
                        <span className="text-[10px] font-mono text-[#6B7280] tracking-wide">
                            Taso {arcLevel} · {arcLabel}
                        </span>
                    )}
                </div>
                {isNew && (
                    <span className="text-[9px] uppercase tracking-widest font-bold text-[#5B4B8A] bg-[#5B4B8A]/5 px-2 py-0.5 rounded-sm flex-shrink-0">
                        {t('simulation.card.new')}
                    </span>
                )}
            </div>

            {/* Title with icon */}
            <div className="flex items-center gap-2.5 mb-2 border-b border-[#E8DDD0] pb-3 group-hover:border-[#5B4B8A]/30 transition-colors">
                {icon && (
                    <span className="text-[#5B4B8A] opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        {icon}
                    </span>
                )}
                <h3 className="text-base font-bold text-[#2B2B2B] group-hover:text-[#5B4B8A] transition-colors leading-tight">
                    {title}
                </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-[#4A4A4A] leading-relaxed flex-1 group-hover:text-[#2B2B2B] transition-colors">
                {description}
            </p>

            {/* Meta row — persona + duration */}
            {(persona || durationMinutes) && (
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#E8DDD0]/60">
                    {persona && (
                        <span className="text-[11px] text-[#78716C]">👁 {persona}</span>
                    )}
                    {durationMinutes && (
                        <span className="text-[11px] text-[#78716C]">🕐 ~{durationMinutes} min</span>
                    )}
                </div>
            )}

            {/* Hover CTA */}
            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#5B4B8A]">
                {t('simulation.card.start')} <ArrowRight className="w-3 h-3" />
            </div>
        </div>
    );
}
