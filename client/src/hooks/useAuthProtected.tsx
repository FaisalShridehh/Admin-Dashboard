import { useAuth } from './useAuth'

export function useAuthProtected() {
    const { user, isLoading } = useAuth()
    console.log('user => ', user)

    // If data is still loading, return null or a loading indicator
    if (isLoading) {
        return { isAuthenticated: false, isLoading: true }
    }

    return { isAuthenticated: !!user, isLoading: false , user }
}
