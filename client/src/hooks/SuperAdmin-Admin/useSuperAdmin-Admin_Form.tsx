import { useToast } from '@/components/ui/use-toast'
import {
    adminChangePasswordFormSchema,
    adminUpdateFormSchema,
    createNewAdminFormSchema,
} from '@/types/FormSchema/AdminFormSchema/AdminFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAdmins } from '../useAdmins'
import { AxiosError } from 'axios'

export function useSuperAdmin_Admin_Form() {
    const { handleChangePassword, createAdmin, updateAdmin } = useAdmins()
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false)

    // 1. Define your form.
    const createNewAdminForm = useForm<
        z.infer<typeof createNewAdminFormSchema>
    >({
        resolver: zodResolver(createNewAdminFormSchema),
        defaultValues: {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
        },
        mode: 'onChange',
    })

    // 2. Define a submit handler.
    async function onCreateNewAdminSubmit(
        values: z.infer<typeof createNewAdminFormSchema>
    ) {
        setIsSubmitting(true)
        try {
            await createAdmin.mutateAsync(values)
            toast({
                variant: 'default',
                title: 'Success',
                description: 'Admin created successfully',
                duration: 3000,
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to change password: ${error.response?.data.message}`,
                    duration: 3000,
                })
            } else if (error instanceof Error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to create admin: ${(error as Error).message}`,
                    duration: 3000,
                })
            } else {
                console.error(error)
            }
        } finally {
            createNewAdminForm.reset()
            setIsSubmitting(false)
        }
    }

    const changePasswordForm = useForm<
        z.infer<typeof adminChangePasswordFormSchema>
    >({
        resolver: zodResolver(adminChangePasswordFormSchema),
        defaultValues: {
            id: 0,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    })
    async function onChangePasswordSubmit(
        values: z.infer<typeof adminChangePasswordFormSchema>
    ) {
        setIsSubmitting(true)
        try {
            await handleChangePassword.mutateAsync(values)
            toast({
                variant: 'default',
                title: 'Success',
                description: `Admin password changed successfully`,
                duration: 3000,
            })
        } catch (error) {
            console.log('error => ', error)
            if (error instanceof AxiosError) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to change password: ${error.response?.data.message}`,
                    duration: 3000,
                })
            } else if (error instanceof Error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to change password: ${(error as Error).message}`,
                    duration: 3000,
                })
            } else {
                console.error(error)
            }
        } finally {
            changePasswordForm.reset()
            setIsSubmitting(false)
        }
    }

    const UpdateAdminForm = useForm<z.infer<typeof adminUpdateFormSchema>>({
        resolver: zodResolver(adminUpdateFormSchema),
        defaultValues: {
            id: 0,
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            roleId: 0,
        },
        mode: 'onChange',
    })

    async function onUpdateAdminSubmit(
        values: z.infer<typeof adminUpdateFormSchema>
    ) {
        setIsSubmitting(true)
        try {
            await updateAdmin.mutateAsync(values)
            toast({
                variant: 'default',
                title: 'Success',
                description: `Admin Updated successfully`,
                duration: 3000,
            })
        } catch (error) {
            console.log('error => ', error)
            if (error instanceof AxiosError) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to Update Admin: ${error.response?.data.message}`,
                    duration: 3000,
                })
            } else if (error instanceof Error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed toUpdate Admin: ${(error as Error).message}`,
                    duration: 3000,
                })
            } else {
                console.error(error)
            }
        } finally {
            UpdateAdminForm.reset()
            setIsSubmitting(false)
            setIsUpdateFormOpen(false)
        }
    }

    return {
        changePasswordForm,
        onChangePasswordSubmit,
        isSubmitting,
        createNewAdminForm,
        onCreateNewAdminSubmit,
        UpdateAdminForm,
        onUpdateAdminSubmit,
        isUpdateFormOpen,
        setIsUpdateFormOpen,
    }
}
