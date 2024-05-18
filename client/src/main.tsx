import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PrimeReactProvider } from 'primereact/api'
import { Tailwind } from './reactPrimeDesign.tsx'
import ThemeProvider from './context/ThemeProvider.tsx'
import AppProvider from './context/AppContext.tsx'
import EndUsersProvider from './context/EndUsers/EndUsersContext.tsx'
import AuthProvider from './context/Auth/AuthContext.tsx'
import AdminProvider from './context/Admins/AdminContext.tsx'
import FinancialProvider from './context/Financial-Transactions/FinancialContext.tsx'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <PrimeReactProvider
                        value={{ unstyled: false, pt: Tailwind }}
                    >
                        <AdminProvider>
                            <EndUsersProvider>
                                <FinancialProvider>
                                    <AppProvider>
                                        <ThemeProvider
                                            defaultTheme="dark"
                                            storageKey="vite-ui-theme"
                                        >
                                            <App />
                                        </ThemeProvider>
                                    </AppProvider>
                                </FinancialProvider>
                            </EndUsersProvider>
                        </AdminProvider>
                    </PrimeReactProvider>
                </AuthProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
)
