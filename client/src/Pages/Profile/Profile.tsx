import Navbar from '@/components/Navbar/Navbar'
import ProfileSetting from '@/components/ProfileSetting/ProfileSetting'
import { Modal } from '@/components/ui/modal'
import { Toaster } from '@/components/ui/toaster'
import { useAuthProtected } from '@/hooks/useAuthProtected'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import apiClient from '@/api/axios'
import { useToast } from '@/components/ui/use-toast'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { AxiosError } from 'axios'

const formSchema = z
    .object({
        oldPassword: z
            .string()
            .min(8, {
                message: 'Password must be at least 8 characters long',
            })
            .regex(/[A-Z]/, {
                message: 'Password must contain at least one uppercase letter',
            }),
        newPassword: z
            .string()
            .min(8, {
                message: 'Password must be at least 8 characters long',
            })
            .regex(/[A-Z]/, {
                message: 'Password must contain at least one uppercase letter',
            }),
        confirmPassword: z
            .string()
            .min(8, {
                message: 'Password must be at least 8 characters long',
            })
            .regex(/[A-Z]/, {
                message: 'Password must contain at least one uppercase letter',
            }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'New password and confirm password must match',
    })

export default function Profile() {
    const navigate = useNavigate()
    const { toast } = useToast()

    const [isChangePasswordOpen, setIsChangePasswordOpen] =
        useState<boolean>(false)
    const [isOldPasswordVisible, setIsOldPasswordVisible] =
        useState<boolean>(false)
    const [isNewPasswordVisible, setIsNewPasswordVisible] =
        useState<boolean>(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState<boolean>(false)

    const { isAuthenticated, isLoading, user } = useAuthProtected()
    // console.log('isLoading => ', isLoading)
    // console.log('isAuthenticated => ', isAuthenticated)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    })

    useEffect(() => {
        if (!user && !isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate, user])

    const changeProfilePasswordMutation = useMutation({
        mutationFn: async (ProfilePasswordData: z.infer<typeof formSchema>) => {
            return await apiClient.put(
                'admin/profile/password',
                ProfilePasswordData
            )
        },
        onSuccess: () => {
            if (toast) {
                toast({
                    variant: 'default',
                    title: 'Success',
                    description: `password updated successfully`,
                    duration: 3000,
                })
            }
        },
        onError: (error) => {
            if (toast) {
                if (error instanceof AxiosError) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.response?.data.message}`,
                        duration: 3000,
                    })
                } else if (error instanceof Error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.message}`,
                        duration: 3000,
                    })
                } else {
                    console.log(error)
                }
            }
            console.log(error)
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await changeProfilePasswordMutation.mutateAsync(values)
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) return <LoadingSpinner />
    return isAuthenticated ? (
        <div className="wrapper-container relative h-screen w-screen overflow-x-hidden bg-background text-text">
            <Toaster />
            <Navbar />
            <ProfileSetting setIsChangePasswordOpen={setIsChangePasswordOpen} />
            <Modal
                isOpen={isChangePasswordOpen}
                onClose={() => {
                    setIsChangePasswordOpen(false)
                    form.reset()
                }}
                title={`Update Password `}
                description={`Change password for ${user ? user.firstName : ''} ${user ? user.lastName : ''}`}
                className="text-text"
                dialogClassName="max-w-3xl"
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-2 items-center gap-4 p-3"
                    >
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Old Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                placeholder="Old Password"
                                                type={
                                                    isOldPasswordVisible
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <div
                                            className="absolute inset-y-0 right-0 flex cursor-pointer select-none items-center pr-3"
                                            onClick={() =>
                                                setIsOldPasswordVisible(
                                                    !isOldPasswordVisible
                                                )
                                            }
                                        >
                                            {isOldPasswordVisible ? (
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
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                placeholder="New Password"
                                                type={
                                                    isNewPasswordVisible
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <div
                                            className="absolute inset-y-0 right-0 flex cursor-pointer select-none items-center pr-3"
                                            onClick={() =>
                                                setIsNewPasswordVisible(
                                                    !isNewPasswordVisible
                                                )
                                            }
                                        >
                                            {isNewPasswordVisible ? (
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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                placeholder="Confirm Password"
                                                type={
                                                    isConfirmPasswordVisible
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <div
                                            className="absolute inset-y-0 right-0 flex cursor-pointer select-none items-center pr-3"
                                            onClick={() =>
                                                setIsConfirmPasswordVisible(
                                                    !isConfirmPasswordVisible
                                                )
                                            }
                                        >
                                            {isConfirmPasswordVisible ? (
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
                            className="w-fit self-end   "
                            disabled={changeProfilePasswordMutation.isPending}
                        >
                            {changeProfilePasswordMutation.isPending
                                ? 'Submitting...'
                                : 'Submit'}
                        </Button>
                    </form>
                </Form>
            </Modal>
        </div>
    ) : (
        <Navigate to="/login" />
    )
}
