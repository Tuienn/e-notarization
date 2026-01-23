import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import ThemeProvider from './components/providers/ThemeProvider.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import TanstackQueryProvider from './components/providers/TanstackQueryProvider.tsx'
import NotificationProvider from './components/providers/NotificationProvider.tsx'
import './assets/styles/index.css'

import './i18n'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <CssBaseline />
            <TanstackQueryProvider>
                <RouterProvider router={router} />
                <NotificationProvider />
            </TanstackQueryProvider>
        </ThemeProvider>
    </StrictMode>
)
