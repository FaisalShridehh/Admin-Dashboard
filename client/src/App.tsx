import { lazy, Suspense } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

//* hooks
import { useAuth } from './hooks/useAuth'
//* ---------------------
//* providers
import AdminProvider from './context/Admins/AdminContext'
// import EndUsersProvider from './context/EndUsers/EndUsersContext'
import FinancialProvider from './context/Financial-Transactions/FinancialContext'
import SupplierProvider from './context/Suppliers/SuppliersContext'
import OrdersProvider from './context/Orders/OrderContext'
import EndUsersProvider from './context/EndUsers/EndUsersContext'
import ItemsProvider from './context/Items/ItemContext'
//* ---------------------

//* lazy pages
const LoginForm = lazy(() => import('./Pages/Auth/Login'))
const DashboardLayout = lazy(() => import('./Pages/Dashboard/DashboardLayout'))
const EndUsers = lazy(() => import('./Pages/Dashboard/EndUsers/EndUsers'))
const Admins = lazy(() => import('./Pages/Dashboard/Admins/Admins'))
const Suppliers = lazy(() => import('./Pages/Dashboard/Suppliers/Suppliers'))
const FinancialTransactions = lazy(
    () =>
        import('./Pages/Dashboard/FinancialTransactions/FinancialTransactions')
)
const Orders = lazy(() => import('./Pages/Dashboard/Orders/Orders'))
const Items = lazy(() => import('./Pages/Dashboard/Items/Items'))
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
                        <EndUsersProvider>
                            <EndUsers />
                        </EndUsersProvider>
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
                        <ItemsProvider>
                            <Items />
                        </ItemsProvider>
                        // {/* </Suspense> */}
                    }
                />
            </Route>
            <Route path="/profile" element={<ProfileLayout />}>
                <Route index element={<NavigateToUserProfile />} />
                <Route path=":id" element={<ProfileRoute />} />
            </Route>

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

function ProfileLayout() {
    return (
        <Suspense fallback={<GasExpressLoader />}>
            <Outlet />
        </Suspense>
    )
}

function NavigateToUserProfile() {
    const { user } = useAuth()

    return <Navigate to={`/profile/${user?.id}`} replace />
}

function ProfileRoute() {
    // const { id } = useParams()
    const { isLoading } = useAuth()

    // console.log('id => ', id)
    if (isLoading) {
        return <GasExpressLoader />
    }

    return (
        <Suspense fallback={<GasExpressLoader />}>
            <Profile />
        </Suspense>
    )
}
