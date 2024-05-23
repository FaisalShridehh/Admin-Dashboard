import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

// pages
import PageNotFound from './Pages/PageNotFound/PageNotFound'
import DashboardPage from './Pages/Dashboard/DashboardPage'
// ---------------------
import EndUsers from './components/EndUsers/EndUsers'
import Admins from './components/Admins/Admins'
import SuperAdmin from './components/SuperAdmin/SuperAdmin'
import FinancialTransactions from './components/FinancialTransactions/FinancialTransactions'
import AllUsers from './components/AllUsers/AllUsers'
import { useAuth } from './hooks/useAuth'
import Orders from './components/Orders/Orders'
import Items from './components/Items/Items'
import LoginForm from './Pages/Auth/Login'
import AdminProvider from './context/Admins/AdminContext'
import EndUsersProvider from './context/EndUsers/EndUsersContext'

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Navigate to={'/dashboard'} />} />
            <Route path="/dashboard" element={<AuthProtectedRoute />}>
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
                    element={<FinancialTransactions />}
                />
                <Route path="orders" element={<Orders />} />
                <Route path="items" element={<Items />} />
            </Route>
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    )
}

export default App

function useAuthProtected() {
    const { user, isLoading } = useAuth()

    // If data is still loading, return null or a loading indicator
    if (isLoading) {
        return { isAuthenticated: false, isLoading: true }
    }

    return { isAuthenticated: !!user, isLoading: false }
}

function AuthProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuthProtected()

    if (isLoading) {
        return <span>Loading...</span>
    }

    return isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
}

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
