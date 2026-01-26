"use client";

import { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] p-6">
                    <div className="max-w-md w-full space-y-6 text-center">
                        <div className="text-6xl">⚠️</div>
                        <h2 className="text-2xl font-serif font-bold text-[#2B2B2B]">
                            Jotain meni pieleen
                        </h2>
                        <p className="text-[#4A4A4A]">
                            Sovelluksessa tapahtui odottamaton virhe. Yritä ladata sivu uudelleen.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-[#5B4B8A] text-white rounded-sm font-medium hover:bg-[#483B6F] transition-colors"
                        >
                            Lataa sivu uudelleen
                        </button>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-4 text-left">
                                <summary className="cursor-pointer text-sm text-[#5B4B8A]">
                                    Tekninen virheviesti
                                </summary>
                                <pre className="mt-2 p-4 bg-red-50 border border-red-200 rounded text-xs overflow-auto">
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
