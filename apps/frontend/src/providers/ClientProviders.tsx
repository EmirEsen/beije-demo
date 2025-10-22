"use client";

import ThemeProvider from './ThemeProvider';
import ReduxProvider from './ReduxProvider';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </ReduxProvider>
    );
}
