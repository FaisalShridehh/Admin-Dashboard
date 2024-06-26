import { useAuth } from '@/hooks/useAuth'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'

const loginFormSchema = z.object({
    username: z.string().min(2).max(50),
    password: z
        .string()
        .min(8, {
            message: 'Password must be at least 8 characters long',
        })
        .regex(/[A-Z]/, {
            message: 'Password must contain at least one uppercase letter',
        }),
})

const LoginForm = () => {
    const { login, user, error, isLoading } = useAuth()
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    if (user) {
        return <Navigate to="/dashboard" />
    }

    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        // setFormError(null)
        try {
            if (!values.username || !values.password) {
                throw new Error('Username and password are required')
            }
            await login.mutateAsync(values)
            navigate('/dashboard')
        } catch (err) {
            if (err instanceof AxiosError) {
                console.error('AxiosError err', err)
            } else if (err instanceof Error) {
                console.error('err', err)
            } else {
                console.error('err', err)
            }
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
                <h2 className="text-center text-2xl font-bold text-gray-900">
                    Sign in to your account
                </h2>
                {error && (
                    <p className="text-center text-red-500">
                        {error instanceof AxiosError
                            ? error.response?.data.message
                            : error}
                    </p>
                )}
                {isLoading && (
                    <p className="text-center text-blue-500">Logging in...</p>
                )}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter Your Username.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                placeholder="Your Password"
                                                type={
                                                    isPasswordVisible
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <div
                                            className="absolute inset-y-0 right-0 flex cursor-pointer select-none items-center pr-3"
                                            onClick={() =>
                                                setIsPasswordVisible(
                                                    (prev) => !prev
                                                )
                                            }
                                        >
                                            {isPasswordVisible ? (
                                                <EyeOff className="h-4 w-4 text-secondaryText" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-secondaryText" />
                                            )}
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            variant={null}
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Sign In
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default LoginForm

