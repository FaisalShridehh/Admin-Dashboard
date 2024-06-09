import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '../ui/input'
import { Admin } from '@/types/models/AdminTypes/AdminTypes'
import { useAdmins } from '@/hooks/useAdmins'
import { Modal } from '../ui/modal'

const formSchema = z
    .object({
        adminId: z.coerce.number().min(1, { message: 'Admin Id is required' }),
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

interface ChangePasswordFormProps {
    isChangePasswordOpen: boolean
    setIsChangePasswordOpen: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedAdmin: React.Dispatch<React.SetStateAction<Admin | null>>
    admin: Admin | null
}
export default function ChangePasswordForm({
    admin,
    isChangePasswordOpen,
    setIsChangePasswordOpen,
    setSelectedAdmin,
}: ChangePasswordFormProps) {
    const { toast } = useToast()
    const { handleChangePassword } = useAdmins()
    const [isOldPasswordVisible, setIsOldPasswordVisible] =
        useState<boolean>(false)
    const [isNewPasswordVisible, setIsNewPasswordVisible] =
        useState<boolean>(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            adminId: 0,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    })

    // Update default values when admin prop changes
    useEffect(() => {
        if (admin) {
            form.reset({
                adminId: admin.id,
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
        }
    }, [admin, form])

    /**
     * Submits the password change form.
     * Shows a success or error toast based on the result.
     */
    async function onSubmit(passwordData: z.infer<typeof formSchema>) {
        console.log('clicked')
        setIsSubmitting(true)
        console.log(passwordData)
        try {
            await handleChangePassword.mutateAsync(passwordData)
            toast({
                variant: 'default',
                title: 'Success',
                description: 'Password changed successfully',
                duration: 3000,
            })
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: `Failed to change password: ${(error as Error).message}`,
                duration: 3000,
            })
        } finally {
            form.reset()
            setIsSubmitting(false)
        }
    }
    // useEffect(() => {
    //     console.log('i keep rendering')
    //     console.log(admin)
    // }, [admin])

    return (
        <>
            <Modal
                isOpen={isChangePasswordOpen}
                onClose={() => {
                    setIsChangePasswordOpen(false)
                    setSelectedAdmin(null)
                    form.reset()
                }}
                title="Update Password"
                description={`Change password for ${admin?.firstName} ${admin?.lastName}`}
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
                            name="adminId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Admin Id</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Admin Id"
                                            type="number"
                                            readOnly
                                            disabled
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                                <EyeOff className="h-4 w-4 text-text" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-text" />
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
                                                <EyeOff className="h-4 w-4 text-text" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-text" />
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
                                                <EyeOff className="h-4 w-4 text-text" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-text" />
                                            )}
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-fit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                    </form>
                </Form>
            </Modal>
        </>
    )
}
