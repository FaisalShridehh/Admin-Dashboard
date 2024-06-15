import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AxiosError } from 'axios'

import {
    createNewEndUserFormSchema,
    endUserChangePasswordFormSchema,
    endUserUpdateFormSchema,
} from '@/types/FormSchema/EndUserFormSchema/EndUserFormSchema'
import { useEndUsers } from '../useEndUsers'

export function useAdmin_EndUser_Form() {
    const { toast } = useToast()
    const { createEndUser, handleChangeEndUserPassword, updateEndUser } =
        useEndUsers()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false)

    // 1. Define your form.
    const createNewEndUserForm = useForm<
        z.infer<typeof createNewEndUserFormSchema>
    >({
        resolver: zodResolver(createNewEndUserFormSchema),
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
    async function onCreateNewEndUserSubmit(
        values: z.infer<typeof createNewEndUserFormSchema>
    ) {
        setIsSubmitting(true)
        try {
            await createEndUser.mutateAsync(values)
            toast({
                variant: 'default',
                title: 'Success',
                description: 'EndUser created successfully',
                duration: 3000,
            })
            createNewEndUserForm.reset()
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to create EndUser: ${error.response?.data.message}`,
                    duration: 3000,
                })
            } else if (error instanceof Error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to create EndUser: ${error.message}`,
                    duration: 3000,
                })
            } else {
                console.error(error)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const changePasswordForm = useForm<
        z.infer<typeof endUserChangePasswordFormSchema>
    >({
        resolver: zodResolver(endUserChangePasswordFormSchema),
        defaultValues: {
            id: 0,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    })
    async function onChangePasswordSubmit(
        values: z.infer<typeof endUserChangePasswordFormSchema>
    ) {
        setIsSubmitting(true)
        try {
            await handleChangeEndUserPassword.mutateAsync(values)
            toast({
                variant: 'default',
                title: 'Success',
                description: `EndUser password changed successfully`,
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

    const UpdateEndUserForm = useForm<z.infer<typeof endUserUpdateFormSchema>>({
        resolver: zodResolver(endUserUpdateFormSchema),
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

    async function onUpdateEndUserSubmit(
        values: z.infer<typeof endUserUpdateFormSchema>
    ) {
        setIsSubmitting(true)
        try {
            await updateEndUser.mutateAsync(values)
            toast({
                variant: 'default',
                title: 'Success',
                description: `EndUser Updated successfully`,
                duration: 3000,
            })
        } catch (error) {
            console.log('error => ', error)
            if (error instanceof AxiosError) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to Update EndUser: ${error.response?.data.message}`,
                    duration: 3000,
                })
            } else if (error instanceof Error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed toUpdate EndUser: ${(error as Error).message}`,
                    duration: 3000,
                })
            } else {
                console.error(error)
            }
        } finally {
            UpdateEndUserForm.reset()
            setIsSubmitting(false)
            setIsUpdateFormOpen(false)
        }
    }
    return {
        createNewEndUserForm,
        onCreateNewEndUserSubmit,
        isSubmitting,
        setIsSubmitting,
        changePasswordForm,
        onChangePasswordSubmit,
        UpdateEndUserForm,
        onUpdateEndUserSubmit,
        isUpdateFormOpen,
        setIsUpdateFormOpen,
    }
}
