import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeProvider from './context/ThemeProvider.tsx'
import AppProvider from './context/AppContext.tsx'
import AuthProvider from './context/Auth/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <AppProvider>
                        <ThemeProvider
                            defaultTheme="dark"
                            storageKey="vite-ui-theme"
                        >
                            <App />
                        </ThemeProvider>
                    </AppProvider>
                </AuthProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
)
