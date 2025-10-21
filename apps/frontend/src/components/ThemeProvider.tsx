'use client';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

const theme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
});

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
}
