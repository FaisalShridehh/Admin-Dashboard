import AsideBar from '@/components/AsideBar/AsideBar'
import Dashboard from '@/components/Dashboard/Dashboard'
import { Toaster } from '@/components/ui/toaster'
import { useAuthProtected } from '@/hooks/useAuthProtected'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function DashboardLayout() {
    const navigate = useNavigate()

    const { isAuthenticated, isLoading, user } = useAuthProtected()
    // console.log('isLoading => ', isLoading)
    // console.log('isAuthenticated => ', isAuthenticated)

    useEffect(() => {
        if (!user && !isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate, user])

    if (isLoading) {
        return <span>Loading...</span>
    }

    return isAuthenticated ? (
        <div className="wrapper-container h-screen w-screen overflow-x-hidden bg-background relative">
            <Toaster  />
            <main className="main-container flex flex-col md:flex-row">
                <AsideBar />
                <Dashboard />
            </main>
        </div>
    ) : (
        <Navigate to="/login" />
    )
}
