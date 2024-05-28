import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

// pages
import LoginForm from './Pages/Auth/Login'
import DashboardLayout from './Pages/Dashboard/DashboardLayout'
import EndUsers from './Pages/Dashboard/EndUsers/EndUsers'
import Admins from './Pages/Dashboard/Admins/Admins'
import SuperAdmin from './Pages/Dashboard/SuperAdmin/SuperAdmin'
import AllUsers from './Pages/Dashboard/AllUsers/AllUsers'
import FinancialTransactions from './Pages/Dashboard/FinancialTransactions/FinancialTransactions'
import Orders from './Pages/Dashboard/Orders/Orders'
import Items from './Pages/Dashboard/Items/Items'
import PageNotFound from './Pages/PageNotFound/PageNotFound'
// ---------------------

import { useAuth } from './hooks/useAuth'
import AdminProvider from './context/Admins/AdminContext'
import EndUsersProvider from './context/EndUsers/EndUsersContext'
import FinancialProvider from './context/Financial-Transactions/FinancialContext'
import TestPage from './Pages/testPage'

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Navigate to={'/dashboard'} />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Navigate replace to={'end-users'} />} />
                <Route
                    path="end-users"
                    element={
                        <EndUsersProvider>
                            <EndUsers />
                        </EndUsersProvider>
                    }
                />
                <Route
                    path="admins"
                    element={
                        <AdminProvider>
                            <Admins />
                        </AdminProvider>
                    }
                />
                <Route
                    element={
                        <RoleProtectedRoute
                            allowedRoles={['super_admin']}
                            redirectTo="/dashboard"
                        />
                    }
                >
                    <Route path="super-admin" element={<SuperAdmin />} />
                </Route>
                <Route path="suppliers" element={<AllUsers />} />
                <Route
                    path="financial-transactions"
                    element={
                        <FinancialProvider>
                            <FinancialTransactions />
                        </FinancialProvider>
                    }
                />
                <Route path="orders" element={<Orders />} />
                <Route path="items" element={<Items />} />
            </Route>
            <Route path="/test" element={<TestPage />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    )
}

export default App

function RoleProtectedRoute({
    allowedRoles,
    redirectTo,
}: {
    allowedRoles: string[]
    redirectTo: string
}) {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return <span>Loading...</span>
    }

    const isAuthorized = user && allowedRoles.includes(user.role)

    return isAuthorized ? <Outlet /> : <Navigate to={redirectTo} />
}
