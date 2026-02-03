import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Custom hook for loading and using a specific translation namespace
 * @param namespace - The namespace to load (e.g., 'landing', 'training')
 * @returns Translation function and loading state
 */
export function useTranslation(namespace: string) {
    const { t, loadNamespace, isLoading, language } = useLanguage();

    useEffect(() => {
        loadNamespace(namespace);
    }, [namespace, loadNamespace]);

    return {
        t,
        isLoading,
        language
    };
}
