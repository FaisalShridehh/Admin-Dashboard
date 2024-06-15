import { lazy, Suspense } from 'react'
import { Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom'

//* hooks
import { useAuth } from './hooks/useAuth'
//* ---------------------
//* providers
import AdminProvider from './context/Admins/AdminContext'
// import EndUsersProvider from './context/EndUsers/EndUsersContext'
import FinancialProvider from './context/Financial-Transactions/FinancialContext'
import SupplierProvider from './context/Suppliers/SuppliersContext'
import OrdersProvider from './context/Orders/OrderContext'
//* ---------------------

//* lazy pages
const LoginForm = lazy(() => import('./Pages/Auth/Login'))
const DashboardLayout = lazy(() => import('./Pages/Dashboard/DashboardLayout'))
const EndUsers = lazy(() => import('./Pages/Dashboard/EndUsers/EndUsers'))
const Admins = lazy(() => import('./Pages/Dashboard/Admins/Admins'))
const SuperAdmin = lazy(() => import('./Pages/Dashboard/SuperAdmin/SuperAdmin'))
const Suppliers = lazy(() => import('./Pages/Dashboard/Suppliers/Suppliers'))
const FinancialTransactions = lazy(
    () =>
        import('./Pages/Dashboard/FinancialTransactions/FinancialTransactions')
)
const Orders = lazy(() => import('./Pages/Dashboard/Orders/Orders'))
const Items = lazy(() => import('./Pages/Dashboard/Items/Items'))
const TestPage = lazy(() => import('./Pages/testPage'))
const Profile = lazy(() => import('./Pages/Profile/Profile'))

const PageNotFound = lazy(() => import('./Pages/PageNotFound/PageNotFound'))
//* ---------------------
const GasExpressLoader = lazy(
    () => import('./components/GasExpressLoader/GasExpressLoader')
)

function App() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <Suspense fallback={<GasExpressLoader />}>
                        <LoginForm />
                    </Suspense>
                }
            />
            <Route path="/" element={<Navigate to={'/dashboard'} />} />
            <Route
                path="/dashboard"
                element={
                    <Suspense fallback={<GasExpressLoader />}>
                        <DashboardLayout />{' '}
                    </Suspense>
                }
            >
                <Route index element={<Navigate replace to={'end-users'} />} />
                <Route
                    path="end-users"
                    element={
                        // <Suspense fallback={<GasExpressLoader />}>
                        // <EndUsersProvider>
                            <EndUsers />
                        // {/* </EndUsersProvider> */}
                        // {/* </Suspense> */}
                    }
                />

                <Route
                    element={
                        // <Suspense fallback={<GasExpressLoader />}>
                            <RoleProtectedRoute
                                allowedRoles={['super_admin']}
                                redirectTo="/dashboard"
                            />
                        // {/* </Suspense> */}
                    }
                >
                    <Route
                        path="admins"
                        element={
                            // <Suspense fallback={<GasExpressLoader />}>
                            <AdminProvider>
                                <Admins />
                            </AdminProvider>
                            // {/* </Suspense> */}
                        }
                    />
                    <Route
                        path="super-admin"
                        element={
                            // <Suspense fallback={<GasExpressLoader />}>
                            <SuperAdmin />
                            // {/* </Suspense> */}
                        }
                    />
                </Route>

                <Route
                    path="suppliers"
                    element={
                        // <Suspense fallback={<GasExpressLoader />}>
                        <SupplierProvider>
                            <Suppliers />
                        </SupplierProvider>
                        // {/* </Suspense> */}
                    }
                />
                <Route
                    path="financial-transactions"
                    element={
                        // <Suspense fallback={<GasExpressLoader />}>
                        <FinancialProvider>
                            <FinancialTransactions />
                        </FinancialProvider>
                        // {/* </Suspense> */}
                    }
                />
                <Route
                    path="orders"
                    element={
                        // <Suspense fallback={<GasExpressLoader />}>
                        <OrdersProvider>
                            <Orders />
                        </OrdersProvider>
                        // {/* </Suspense> */}
                    }
                />
                <Route
                    path="items"
                    element={
                        // <Suspense fallback={<GasExpressLoader />}>
                        <Items />
                        // {/* </Suspense> */}
                    }
                />
            </Route>
            <Route path="/profile/:id" element={<ProfileRoute />} />

            <Route
                path="/test"
                element={
                    <Suspense fallback={<GasExpressLoader />}>
                        <TestPage />
                    </Suspense>
                }
            />
            <Route
                path="/*"
                element={
                    <Suspense fallback={<GasExpressLoader />}>
                        <PageNotFound />
                    </Suspense>
                }
            />
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

function ProfileRoute() {
    const { id } = useParams()
    const { user, isLoading } = useAuth()

    console.log('id => ', id)
    if (isLoading) {
        return <GasExpressLoader />
    }

    // Redirect to the current user's profile if no id is provided
    return id ? (
        <Suspense fallback={<GasExpressLoader />}>
            <Profile />
        </Suspense>
    ) : (
        <Navigate to={`/profile/${user?.id}`} />
    )
}

//* pages
// import LoginForm from './Pages/Auth/Login'
// import DashboardLayout from './Pages/Dashboard/DashboardLayout'
// import EndUsers from './Pages/Dashboard/EndUsers/EndUsers'
// import Admins from './Pages/Dashboard/Admins/Admins'
// import SuperAdmin from './Pages/Dashboard/SuperAdmin/SuperAdmin'
// import AllUsers from './Pages/Dashboard/AllUsers/AllUsers'
// import FinancialTransactions from './Pages/Dashboard/FinancialTransactions/FinancialTransactions'
// import Orders from './Pages/Dashboard/Orders/Orders'
// import Items from './Pages/Dashboard/Items/Items'
// import PageNotFound from './Pages/PageNotFound/PageNotFound'
// import TestPage from './Pages/testPage'

//* ---------------------

