"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/types/domain';
import fiCommon from '../translations/fi/common.json';
import enCommon from '../translations/en/common.json';
import fiLanding from '../translations/fi/landing.json';
import enLanding from '../translations/en/landing.json';

// Translation JSON structures are complex and deeply nested.
// Using 'any' here to avoid fighting TypeScript with massive type definitions.
// Runtime validation happens in the t() function instead.
const loaders: Record<Language, Record<string, () => Promise<{ default: any }>>> = {
    fi: {
        quiz: () => import('../translations/fi/quiz.json'),
        tactics: () => import('../translations/fi/tactics.json'),
        training: () => import('../translations/fi/training.json'),
        support: () => import('../translations/fi/support.json'),
        community_page: () => import('../translations/fi/community_page.json'),
        stories: () => import('../translations/fi/stories.json'),
        timeline: () => import('../translations/fi/timeline.json'),
        lukutaito: () => import('../translations/fi/lukutaito.json'),
        feeling_quiz: () => import('../translations/fi/feeling_quiz.json'),
        impact_profile: () => import('../translations/fi/impact_profile.json'),
        empathy_test: () => import('../translations/fi/empathy_test.json'),
        neuromoninaisuus: () => import('../translations/fi/neuromoninaisuus.json'),
        nuoret: () => import('../translations/fi/nuoret.json'),
        faktapankki: () => import('../translations/fi/faktapankki.json'),
        start_here: () => import('../translations/fi/start_here.json'),
        simulation: () => import('../translations/fi/simulation.json'),
        landing: () => import('../translations/fi/landing.json'),
    },
    en: {

        quiz: () => import('../translations/en/quiz.json'),
        tactics: () => import('../translations/en/tactics.json'),
        training: () => import('../translations/en/training.json'),
        support: () => import('../translations/en/support.json'),
        community_page: () => import('../translations/en/community_page.json'),
        stories: () => import('../translations/en/stories.json'),
        timeline: () => import('../translations/en/timeline.json'),
        lukutaito: () => import('../translations/en/lukutaito.json'),
        feeling_quiz: () => import('../translations/en/feeling_quiz.json'),
        impact_profile: () => import('../translations/en/impact_profile.json'),
        empathy_test: () => import('../translations/en/empathy_test.json'),
        neuromoninaisuus: () => import('../translations/en/neuromoninaisuus.json'),
        nuoret: () => import('../translations/en/nuoret.json'),
        faktapankki: () => import('../translations/en/faktapankki.json'),
        start_here: () => import('../translations/en/start_here.json'),
        simulation: () => import('../translations/en/simulation.json'),
        landing: () => import('../translations/en/landing.json'),
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    // Intentionally returns 'any' to handle complex translation structures
    // Consumers will cast to their expected type
    t: (key: string, params?: Record<string, string | number> | { returnObjects: boolean }) => any;
    loadNamespace: (ns: string) => Promise<void>;
    isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize language from localStorage synchronously
    const getInitialLanguage = (): Language => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('turvasiipi_lang') as Language;
            if (saved && (saved === 'fi' || saved === 'en')) {
                return saved;
            }
        }
        return 'fi';
    };

    const [language, setLanguage] = useState<Language>(getInitialLanguage());
    const [translations, setTranslations] = useState<Record<string, any>>({
        fi: { ...fiCommon, landing: fiLanding },
        en: { ...enCommon, landing: enLanding }
    });
    const [loadedNamespaces, setLoadedNamespaces] = useState<Record<Language, Set<string>>>({
        fi: new Set(['common', 'landing']),
        en: new Set(['common', 'landing'])
    });
    const [isLoading, setIsLoading] = useState(false);



    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('turvasiipi_lang', lang);
    };

    const loadNamespace = async (ns: string) => {
        if (loadedNamespaces[language].has(ns)) return;
        if (!loaders[language][ns]) {
            console.warn(`Loader not found for namespace: ${ns}`);
            return;
        }

        setIsLoading(true);
        try {
            const module = await loaders[language][ns]();
            setTranslations(prev => ({
                ...prev,
                [language]: {
                    ...prev[language],
                    [ns]: module.default
                }
            }));
            setLoadedNamespaces(prev => {
                const newSet = new Set(prev[language]);
                newSet.add(ns);
                return { ...prev, [language]: newSet };
            });
        } catch (error) {
            console.error(`Failed to load namespace ${ns}:`, error);
        } finally {
            setIsLoading(false);
        }
    };

    const t = (path: string, params?: Record<string, string | number> | { returnObjects: boolean }): any => {
        const keys = path.split('.');
        let current: any = translations[language];

        for (const key of keys) {
            if (current[key] === undefined) {
                // If fetching a root key that matches a known namespace, warn that it might not be loaded
                if (keys.length > 0 && loaders[language][keys[0]] && !loadedNamespaces[language].has(keys[0])) {
                    if (process.env.NODE_ENV === 'development') {
                        console.warn(`Translation key '${path}' not found. Namespace '${keys[0]}' may not be loaded. Use loadNamespace('${keys[0]}') first.`);
                    }
                }

                if (params && 'returnObjects' in params && params.returnObjects) {
                    return null;
                }
                // Return empty string instead of key to prevent flash
                return '';
            }
            current = current[key];
        }

        if (params && 'returnObjects' in params && params.returnObjects) {
            return typeof current === 'object' ? current : null;
        }

        let translation = current as string;

        if (params && !('returnObjects' in params)) {
            Object.entries(params as Record<string, string | number>).forEach(([key, value]) => {
                translation = translation.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
            });
        }

        return translation;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, loadNamespace, isLoading }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
