import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
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
import { Eye, EyeOff, Key } from 'lucide-react'
import { Input } from '../ui/input'
import { Admin } from '@/types/models/AdminTypes/AdminTypes'
import { useAdmins } from '@/hooks/useAdmins'

const formSchema = z
    .object({
        adminId: z.number().min(1, { message: 'Admin is required' }),
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

export default function ChangePassword({ data }: { data: Admin }) {
    const { handleChangePassword } = useAdmins()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isOldPasswordVisible, setIsOldPasswordVisible] =
        useState<boolean>(false)
    const [isNewPasswordVisible, setIsNewPasswordVisible] =
        useState<boolean>(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState<boolean>(false)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            adminId: data.id,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        try {
            console.log('Submit button clicked')
            console.log('Form values:', values)
            await handleChangePassword.mutateAsync(values)
            toast({
                variant: 'default',
                title: 'Success',
                description: 'Password changed successfully',
                duration: 3000,
            })
            form.reset()
        } catch (error) {
            console.error('Error occurred:', error)
            toast({
                variant: 'destructive',
                title: 'Error',
                description: `Failed to change password: ${(error as Error).message}`,
                duration: 3000,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="flex cursor-pointer items-center">
                    <Key className="mr-2 h-4 w-4" />
                    Change Password
                </span>
            </DialogTrigger>
            <DialogContent className="text-text sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>
                        Change password for {data.firstName} {data.lastName}
                    </DialogTitle>
                </DialogHeader>

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
                                            {...field}
                                            readOnly
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
            </DialogContent>
        </Dialog>
    )
}
