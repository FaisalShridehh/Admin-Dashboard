import Navbar from '@/components/Navbar/Navbar'
import ProfileSetting from '@/components/ProfileSetting/ProfileSetting'
import { useAuthProtected } from '@/hooks/useAuthProtected'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Profile() {
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
        <div className="wrapper-container relative h-screen w-screen overflow-x-hidden bg-background text-text">
            <Navbar />
            <ProfileSetting />
        </div>
    ) : (
        <Navigate to="/login" />
    )
}
