'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { BystanderScene, BystanderCharacter, SceneReply } from './bystander-types';

interface BystanderSceneViewProps {
    scene: BystanderScene;
    characters: BystanderCharacter[];
    /** Called when all dialogue lines have been tapped through */
    onDialogueComplete?: () => void;
    /** Override: if true, show the silence outcome callout. Reacts reactively from parent. */
    showSilenceOutcome?: boolean;
}

// Emotion face by mood keyword
const EMOTION_FACE: Record<string, string> = {
    neutral: '😐',
    smug: '😏',
    aggressive: '😤',
    angry: '😠',
    embarrassed: '😳',
    sad: '😢',
    stressed: '😰',
    distracted: '📱',
    awkward: '😬',
    avoidant: '👀',
    speaking: '🗣',
    targeted: '😟',
};

function getCharFaceForLine(
    line: SceneReply,
    char: BystanderCharacter,
): string {
    if (line.style === 'aggressive') return EMOTION_FACE.aggressive;
    if (line.style === 'thought') return '💭';
    if (char.role === 'victim') return EMOTION_FACE.targeted;
    if (char.role === 'perpetrator') return EMOTION_FACE.smug;
    return EMOTION_FACE.neutral;
}

function getIdleFace(
    charId: string,
    scene: BystanderScene,
    speakerId: string | null,
): string {
    if (charId === speakerId) return EMOTION_FACE.speaking;
    if (charId === scene.victimId) return EMOTION_FACE.targeted;
    if (charId === scene.perpetratorId) return EMOTION_FACE.smug;
    const reaction = scene.bystanderReactions.find(r => r.characterId === charId);
    if (!reaction) return EMOTION_FACE.neutral;
    if (reaction.behavior === 'looks_at_phone') return EMOTION_FACE.distracted;
    if (reaction.behavior === 'laughs_awkwardly') return EMOTION_FACE.awkward;
    if (reaction.behavior === 'avoids_eye_contact') return EMOTION_FACE.avoidant;
    return EMOTION_FACE.neutral;
}

/** Single animated character pawn */
const CharacterPawn: React.FC<{
    char: BystanderCharacter;
    isSpeaking: boolean;
    face: string;
    isActive: boolean;
}> = ({ char, isSpeaking, face, isActive }) => {
    return (
        <div className="flex flex-col items-center gap-0.5 select-none">
            {/* Avatar circle */}
            <div
                className={[
                    'w-9 h-9 rounded-full flex items-center justify-center text-lg border-2',
                    'transition-all duration-300',
                    isSpeaking
                        ? 'ring-2 ring-offset-1 ring-white scale-110 shadow-md border-white'
                        : 'border-transparent',
                    isActive ? '' : 'opacity-50',
                ].join(' ')}
                style={{ background: char.color }}
            >
                <span className={isSpeaking ? 'animate-[bounce_0.5s_ease-in-out_2]' : ''}>
                    {face}
                </span>
            </div>
            {/* Name badge — always readable: dark text, white background */}
            <span
                className={[
                    'text-[9px] font-bold px-1.5 py-0.5 rounded-full truncate max-w-[52px] text-center',
                    'bg-white/95 text-slate-800 shadow-sm',
                    isSpeaking ? 'ring-1 ring-indigo-300' : '',
                ].join(' ')}
            >
                {char.name}
            </span>
        </div>
    );
};

/** Typewriter text renderer */
const TypewriterText: React.FC<{
    text: string;
    speed?: number;
    onDone: () => void;
    skip: boolean;
}> = ({ text, speed = 28, onDone, skip }) => {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);
    const idx = useRef(0);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setDisplayed('');
        setDone(false);
        idx.current = 0;

        const tick = () => {
            idx.current++;
            setDisplayed(text.slice(0, idx.current));
            if (idx.current < text.length) {
                timer.current = setTimeout(tick, speed);
            } else {
                setDone(true);
                onDone();
            }
        };
        timer.current = setTimeout(tick, speed);
        return () => { if (timer.current) clearTimeout(timer.current); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text]);

    useEffect(() => {
        if (skip && !done) {
            if (timer.current) clearTimeout(timer.current);
            setDisplayed(text);
            setDone(true);
            onDone();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skip]);

    return <>{displayed}</>;
};

export const BystanderSceneView: React.FC<BystanderSceneViewProps> = ({
    scene,
    characters,
    onDialogueComplete,
    showSilenceOutcome,
}) => {
    const [lineIndex, setLineIndex] = useState(0);        // which dialogue line is visible
    const [lineTyping, setLineTyping] = useState(true);   // typewriter in progress?
    const [skipCurrent, setSkipCurrent] = useState(false);
    const [allDone, setAllDone] = useState(false);

    const currentLine = scene.dialogue[lineIndex] ?? null;
    const speakerId = currentLine?.characterId ?? null;

    // Reset when scene changes
    useEffect(() => {
        setLineIndex(0);
        setLineTyping(true);
        setSkipCurrent(false);
        setAllDone(false);
    }, [scene.id]);

    const handleTap = useCallback(() => {
        if (allDone) return;
        if (lineTyping) {
            // Skip typewriter — show full text immediately
            setSkipCurrent(true);
            return;
        }
        // Advance to next line
        const next = lineIndex + 1;
        if (next >= scene.dialogue.length) {
            setAllDone(true);
            onDialogueComplete?.();
        } else {
            setLineIndex(next);
            setLineTyping(true);
            setSkipCurrent(false);
        }
    }, [allDone, lineTyping, lineIndex, scene.dialogue.length, onDialogueComplete]);

    const handleTypeDone = useCallback(() => {
        setLineTyping(false);
        setSkipCurrent(false);
    }, []);

    const getChar = (id: string) => characters.find(c => c.id === id);

    // Character layout: perpetrator left, victim right, bystanders middle
    const perpetrator = getChar(scene.perpetratorId);
    const victim = getChar(scene.victimId);
    const bystanders = scene.bystanderIds.map(id => getChar(id)).filter(Boolean) as BystanderCharacter[];

    // All in display order: perp | bystanders | victim
    const displayOrder = [
        ...(perpetrator ? [perpetrator] : []),
        ...bystanders,
        ...(victim ? [victim] : []),
    ];

    const currentChar = speakerId ? getChar(speakerId) : null;
    const isAggressive = currentLine?.style === 'aggressive';
    const isThought = currentLine?.style === 'thought';

    return (
        <div
            className="relative rounded-2xl overflow-hidden shadow-lg border border-white/50 cursor-pointer select-none"
            style={{ background: scene.background }}
            onClick={handleTap}
            role="button"
            aria-label="Klikkaa jatkaaksesi dialogia"
        >
            {/* ── CHARACTER STAGE ── */}
            <div className="flex items-end justify-center gap-2 px-3 pt-3 pb-1 min-h-[90px]">
                {displayOrder.map(char => {
                    const face = getIdleFace(char.id, scene, speakerId);
                    return (
                        <CharacterPawn
                            key={char.id}
                            char={char}
                            isSpeaking={char.id === speakerId}
                            face={face}
                            isActive={!allDone || char.id === speakerId}
                        />
                    );
                })}
            </div>

            {/* ── ACTIVE SPEECH BUBBLE ── */}
            <div
                className={[
                    'mx-2 mb-2 min-h-[56px] rounded-xl px-3 py-2.5 transition-all duration-300 relative',
                    isAggressive
                        ? 'bg-red-50 border-l-4 border-red-500 shadow-sm'
                        : isThought
                            ? 'bg-slate-100/70 border border-slate-300 italic'
                            : 'bg-white/90 border border-white shadow-sm',
                ].join(' ')}
            >
                {currentLine && currentChar ? (
                    <div className="space-y-1">
                        <div
                            className="text-[11px] font-bold"
                            style={{ color: isAggressive ? '#dc2626' : currentChar.color }}
                        >
                            {isThought ? `💭 ${currentChar.name}` : currentChar.name}
                            {currentChar.role === 'perpetrator' && !isThought && (
                                <span className="ml-1 text-[9px] font-normal text-slate-400">(esimies)</span>
                            )}
                        </div>
                        <p className={[
                            'text-xs leading-snug',
                            isAggressive ? 'text-red-800 font-medium' : 'text-slate-800',
                            isThought ? 'text-slate-600 italic' : '',
                        ].join(' ')}>
                            {isThought ? '(' : '"'}
                            <TypewriterText
                                text={currentLine.text}
                                speed={22}
                                onDone={handleTypeDone}
                                skip={skipCurrent}
                            />
                            {isThought ? ')' : '"'}
                        </p>
                    </div>
                ) : allDone ? (
                    <div className="flex items-center gap-2 text-xs text-slate-500 italic h-full">
                        <span className="text-base">🤐</span>
                        <span>Kaikki näkivät — kukaan ei sanonut mitään.</span>
                    </div>
                ) : null}

                {/* Advance hint */}
                {!lineTyping && !allDone && (
                    <div className="absolute bottom-2 right-3 flex items-center gap-1">
                        <span className="text-[9px] text-slate-400 font-mono">napauta jatkaaksesi</span>
                        <span className="text-slate-400 animate-bounce text-xs">▼</span>
                    </div>
                )}
            </div>

            {/* ── BYSTANDER REACTIONS (bottom strip) ── */}
            <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                {scene.bystanderReactions.map(r => (
                    <span
                        key={r.characterId}
                        className="text-[10px] text-white/80 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full italic"
                    >
                        {r.label}
                    </span>
                ))}
            </div>

            {/* ── LINE PROGRESS DOTS ── */}
            <div className="absolute top-2 right-3 flex gap-1">
                {scene.dialogue.map((_, i) => (
                    <div
                        key={i}
                        className={[
                            'w-1.5 h-1.5 rounded-full transition-all duration-300',
                            i < lineIndex ? 'bg-white/70' : i === lineIndex ? 'bg-white scale-125' : 'bg-white/30',
                        ].join(' ')}
                    />
                ))}
            </div>

            {/* ── SILENCE OUTCOME overlay ── */}
            {showSilenceOutcome && (
                <div className="absolute inset-0 bg-amber-900/80 backdrop-blur-sm flex flex-col items-center justify-center p-5 text-center space-y-2 animate-fade-in">
                    <span className="text-3xl">⏰</span>
                    <p className="text-white font-semibold text-sm">{scene.silenceOutcome.text}</p>
                    <p className="text-amber-200 text-xs leading-relaxed">{scene.silenceOutcome.learningPoint}</p>
                </div>
            )}
        </div>
    );
};
