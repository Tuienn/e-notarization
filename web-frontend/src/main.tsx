import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ThemeProvider from './components/providers/ThemeProvider.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import TanstackQueryProvider from './components/providers/TanstackQueryProvider.tsx'
import NotificationProvider from './components/providers/NotificationProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <CssBaseline />
            <TanstackQueryProvider>
                <NotificationProvider>
                    <App />
                </NotificationProvider>
            </TanstackQueryProvider>
        </ThemeProvider>
    </StrictMode>
)
