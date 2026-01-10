"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import fi from '../translations/fi.json';
import en from '../translations/en.json';

type Language = 'fi' | 'en';
type Translations = typeof fi;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, params?: Record<string, string | number> | { returnObjects: boolean }) => any;
}

const translations: Record<Language, Translations> = { fi, en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('fi');

    useEffect(() => {
        const savedLang = localStorage.getItem('turvasiipi_lang') as Language;
        if (savedLang && (savedLang === 'fi' || savedLang === 'en')) {
            setLanguage(savedLang);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('turvasiipi_lang', lang);
    };

    const t = (path: string, params?: Record<string, string | number> | { returnObjects: boolean }): any => {
        const keys = path.split('.');
        let current: any = translations[language];

        for (const key of keys) {
            if (current[key] === undefined) {
                console.warn(`Translation key not found: ${path}`);
                if (params && 'returnObjects' in params && params.returnObjects) {
                    return null;
                }
                return path;
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
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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
