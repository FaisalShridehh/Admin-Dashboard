import apiClient from '@/api/axios'
import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

type LoginData = { username: string; password: string }
interface AuthContextIF {
    user: UserType | null
    isLoading: boolean
    error: string | null
    login: (data: LoginData) => Promise<void>
    logout: () => void
}

export interface UserType {
    id: number
    firstName: string
    lastName: string
    userName: string
    email: string
    role: string
    isEnabled: boolean
}

export const AuthContext = createContext<AuthContextIF | undefined>(undefined)

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<UserType | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = Cookies.get('token')
        const userData = Cookies.get('user')

        if (token && userData) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setUser(JSON.parse(userData))
        }

        setIsLoading(false)
    }, [])

    const login = async (loginData: LoginData) => {
        setIsLoading(true)
        setError(null) // Reset error state before login attempt
        console.time('login')

        try {
            console.time('apiCall') // Start timing the API call

            const response = await apiClient.post('auth/login', loginData)

            console.timeEnd('apiCall') // End timing the API call

            if (response.status !== 200)
                throw new Error('Something went wrong while logging in')
            console.time('setCookies') // Start timing the set cookies operation

            const { token, ...userData } = response.data.data

            Cookies.set('token', token, { expires: 1 })
            Cookies.set('user', JSON.stringify(userData), { expires: 1 })
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            console.timeEnd('setCookies') // End timing the set cookies operation
            console.time('setUser') // Start timing the set user state operation

            setUser({ ...userData, token })
            console.timeEnd('setUser') // End timing the set user state operation

            console.time('navigation') // Start timing the navigation

            navigate('/dashboard')
            console.timeEnd('navigation') // End timing the navigation
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || 'An error occurred')
            } else if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('An unexpected error occurred')
            }
        } finally {
            setIsLoading(false)
            console.timeEnd('login') // End overall timing
        }
    }

    const logout = () => {
        Cookies.remove('token')
        Cookies.remove('user')
        setUser(null)
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{ isLoading, user, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
