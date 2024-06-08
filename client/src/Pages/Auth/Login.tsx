// src/components/LoginForm.tsx

import { useAuth } from '@/hooks/useAuth'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const { login, user, error, isLoading } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState<string | null>(null)
    const navigate = useNavigate()
    useEffect(() => {
        // Set the form error when the error state changes
        if (error) {
            // console.log(error);
            setFormError('Login failed')
        } else {
            setFormError(null)
        }
    }, [error])

    if (user) {
        return <Navigate to="/dashboard" />
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (!username || !password) {
                throw new Error('Username and password are required')
            }
            await login(username, password)
            setFormError(null)
            navigate('/dashboard')
        } catch (err) {
            if (err instanceof Error) {
                console.error('err', err)
                setFormError(err.message)
            } else {
                console.error('err', err)
                setFormError('An unexpected error occurred')
            }
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
                <h2 className="text-center text-2xl font-bold text-gray-900">
                    Sign in to your account
                </h2>
                {formError && (
                    <p className="text-center text-red-500">{formError}</p>
                )}
                {isLoading && (
                    <p className="text-center text-blue-500">Logging in...</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            disabled={isLoading} 
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
