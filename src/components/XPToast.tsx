'use client';

import { useState, useEffect } from 'react';
import { useProgress } from '@/context/ProgressContext';

interface ToastItem {
    id: string;
    type: 'xp' | 'badge';
    message: string;
    icon: string;
}

/**
 * XPToast — listens to changes in progress.points and progress.earnedBadgeIds.
 * Whenever points increase, shows a "+N pistettä" pop-in toast.
 * Whenever a new badge is earned, shows a larger badge-unlock toast.
 *
 * Mount this once in layout.tsx (inside <ProgressProvider>).
 */
export function XPToast() {
    const { progress } = useProgress();
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const [prevPoints, setPrevPoints] = useState<number | null>(null);
    const [prevBadges, setPrevBadges] = useState<string[] | null>(null);

    useEffect(() => {
        if (prevPoints === null) {
            // First render — initialise silently
            setPrevPoints(progress.points);
            setPrevBadges([...progress.earnedBadgeIds]);
            return;
        }

        const newToasts: ToastItem[] = [];

        // XP gain
        const gained = progress.points - prevPoints;
        if (gained > 0) {
            newToasts.push({
                id: `xp-${Date.now()}`,
                type: 'xp',
                message: `+${gained} pistettä`,
                icon: '⭐',
            });
        }

        // New badges
        if (prevBadges) {
            const newBadgeIds = progress.earnedBadgeIds.filter(id => !prevBadges.includes(id));
            newBadgeIds.forEach(badgeId => {
                // Find badge definition (we import lazily via dynamic lookup isn't possible here —
                // we just use the id to show a nice message without importing BADGES to keep this component light)
                newToasts.push({
                    id: `badge-${badgeId}-${Date.now()}`,
                    type: 'badge',
                    message: `Ansaitsit merkin!`,
                    icon: '🏅',
                });
            });
        }

        if (newToasts.length > 0) {
            setToasts(prev => [...prev, ...newToasts]);
        }

        setPrevPoints(progress.points);
        setPrevBadges([...progress.earnedBadgeIds]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress.points, progress.earnedBadgeIds]);

    // Auto-dismiss after 3s
    useEffect(() => {
        if (toasts.length === 0) return;
        const timer = setTimeout(() => {
            setToasts(prev => prev.slice(1));
        }, 3000);
        return () => clearTimeout(timer);
    }, [toasts]);

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-24 right-5 z-[200] flex flex-col gap-2 pointer-events-none">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`
                        flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-lg
                        text-sm font-semibold animate-slide-up
                        ${toast.type === 'badge'
                            ? 'bg-purple-600 text-white min-w-[180px]'
                            : 'bg-white border border-amber-300 text-amber-700'
                        }
                    `}
                    style={{
                        animation: 'xpSlideUp 0.3s ease-out forwards',
                    }}
                >
                    <span className="text-base">{toast.icon}</span>
                    <span>{toast.message}</span>
                </div>
            ))}
            <style>{`
                @keyframes xpSlideUp {
                    from { opacity: 0; transform: translateY(8px) scale(0.95); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
}
