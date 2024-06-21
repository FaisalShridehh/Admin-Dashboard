import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AxiosError } from 'axios'

import { useSuppliers } from '../useSuppliers'
import {
    createNewSupplierFormSchema,
    SupplierChangePasswordFormSchema,
    SupplierUpdateFormSchema,
} from '@/types/FormSchema/SupplierFormSchema/SupplierFormSchema'

export function useAdmin_Supplier_Form() {
    const { toast } = useToast()
    const { createSupplier, handleChangeSupplierPassword, updateSupplier } =
        useSuppliers()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false)

    // 1. Define your form.
    const createNewSupplierForm = useForm<
        z.infer<typeof createNewSupplierFormSchema>
    >({
        resolver: zodResolver(createNewSupplierFormSchema),
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
    async function onCreateNewSupplierSubmit(
        values: z.infer<typeof createNewSupplierFormSchema>
    ) {
        setIsSubmitting(true)
        try {
            await createSupplier.mutateAsync(values)
            toast({
                variant: 'default',
                title: 'Success',
                description: 'Supplier created successfully',
                duration: 3000,
            })
            createNewSupplierForm.reset()
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to create Supplier: ${error.response?.data.message}`,
                    duration: 3000,
                })
            } else if (error instanceof Error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to create Supplier: ${error.message}`,
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
        z.infer<typeof SupplierChangePasswordFormSchema>
    >({
        resolver: zodResolver(SupplierChangePasswordFormSchema),
        defaultValues: {
            id: 0,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    })
    async function onChangePasswordSubmit(
        values: z.infer<typeof SupplierChangePasswordFormSchema>
    ) {
        setIsSubmitting(true)
        try {
            await handleChangeSupplierPassword.mutateAsync(values)
            toast({
                variant: 'default',
                title: 'Success',
                description: `Supplier password changed successfully`,
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

    const UpdateSupplierForm = useForm<
        z.infer<typeof SupplierUpdateFormSchema>
    >({
        resolver: zodResolver(SupplierUpdateFormSchema),
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

    async function onUpdateSupplierSubmit(
        values: z.infer<typeof SupplierUpdateFormSchema>
    ) {
        setIsSubmitting(true)
        try {
            await updateSupplier.mutateAsync(values)
            toast({
                variant: 'default',
                title: 'Success',
                description: `Supplier Updated successfully`,
                duration: 3000,
            })
        } catch (error) {
            console.log('error => ', error)
            if (error instanceof AxiosError) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to Update Supplier: ${error.response?.data.message}`,
                    duration: 3000,
                })
            } else if (error instanceof Error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed toUpdate Supplier: ${(error as Error).message}`,
                    duration: 3000,
                })
            } else {
                console.error(error)
            }
        } finally {
            UpdateSupplierForm.reset()
            setIsSubmitting(false)
            setIsUpdateFormOpen(false)
        }
    }
    return {
        createNewSupplierForm,
        onCreateNewSupplierSubmit,
        isSubmitting,
        setIsSubmitting,
        changePasswordForm,
        onChangePasswordSubmit,
        UpdateSupplierForm,
        onUpdateSupplierSubmit,
        isUpdateFormOpen,
        setIsUpdateFormOpen,
    }
}
