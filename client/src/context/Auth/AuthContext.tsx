/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from '@/api/axios'
import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

type LoginData = { username: string; password: string }
interface AuthContextIF {
    user: UserType | null
    isLoading: boolean
    error: AxiosError | Error | null
    login: UseMutationResult<
        { token: string; userData: UserType },
        Error,
        LoginData,
        unknown
    >
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
    token: string
}

export const AuthContext = createContext<AuthContextIF | undefined>(undefined)

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<UserType | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = Cookies.get('token')
        const userData = Cookies.get('user')

        if (token && userData) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setUser(JSON.parse(userData))
        }
    }, [])

    const loginMutation = useMutation({
        mutationFn: async (loginData: LoginData) => {
            return loginForm(loginData)
        },
        onSuccess: ({ token, userData }) => {
            setUser({ ...userData, token })
            navigate('/dashboard')
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                return error.response?.data?.message
            } else if (error instanceof Error) {
                return error.message
            } else {
                return 'An unexpected error occurred'
            }
        },
    })

    const logout = () => {
        Cookies.remove('token')
        Cookies.remove('user')
        setUser(null)
        navigate('/login')
    }
    return (
        <AuthContext.Provider
            value={{
                isLoading: loginMutation.isPending,
                user,
                error: loginMutation?.error,
                login: loginMutation,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const loginForm = async (
    loginData: LoginData
): Promise<{ token: string; userData: UserType }> => {
    try {
        const response = await apiClient.post('auth/login', loginData)

        if (response.status !== 200)
            throw new Error('Something went wrong while logging in')

        const { token, ...userData } = response.data.data

        Cookies.set('token', token, { expires: 1 })
        Cookies.set('user', JSON.stringify(userData), { expires: 1 })
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        return { token, userData }
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('AxiosError => ', error.response?.data.message)
        } else if (error instanceof Error) {
            console.error(error.message)
        } else {
            console.error('An unknown error occurred', error)
        }
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}
