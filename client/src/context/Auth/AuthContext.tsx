import apiClient from '@/api/axios'
// import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

interface AuthContextIF {
    user: UserType | null
    isLoading: boolean
    error: Error | null
    login: (username: string, password: string) => Promise<void>
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
    const [error, setError] = useState<Error | null>(null)
    const navigate = useNavigate()

    // const queryClient = useQueryClient()

    useEffect(() => {
        const token = Cookies.get('token')
        const userData = Cookies.get('user')

        if (token && userData) {
            axios.defaults.headers.common['Authorization'] = token
            setUser(JSON.parse(userData))
        }

        setIsLoading(false)
    }, [])

    const login = async (username: string, password: string) => {
        setIsLoading(true)
        console.time('login')
        try {
            console.time('apiCall') // Start timing the API call

            const response = await apiClient.post('auth/login', {
                username,
                password,
            })
            console.timeEnd('apiCall') // End timing the API call

            if (response.status !== 200)
                throw new Error('Something went wrong while logging in')

            // console.log('response => ', response)
            console.time('setCookies') // Start timing the set cookies operation

            const { token, ...userData } = response.data.data

            Cookies.set('token', token, { expires: 2 })
            Cookies.set('user', JSON.stringify(userData), { expires: 2 })
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            console.timeEnd('setCookies') // End timing the set cookies operation
            console.time('setUser') // Start timing the set user state operation

            setUser({ ...userData, token })
            // setIsLoading(false)
            console.timeEnd('setUser') // End timing the set user state operation
            console.time('navigation') // Start timing the navigation

            navigate('/dashboard')
            console.timeEnd('navigation') // End timing the navigation

            // console.log(Cookies.get("token"));
            // console.log(Cookies.get("user"));
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error)
            }
            console.log(error)
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

// info@gasexpress.com.jo
// GasExpress123


