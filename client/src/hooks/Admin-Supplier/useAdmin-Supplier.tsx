import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AxiosError } from 'axios'

import { createNewEndUserFormSchema } from '@/types/FormSchema/EndUserFormSchema/EndUserFormSchema'
import { useSuppliers } from '../useSuppliers'

export function useAdmin_Supplier_Form() {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    // const {  } = useSuppliers()
    // 1. Define your form.
    const createNewSupplierForm = useForm<
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
            createNewSupplierForm.reset()
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

    return {
        createNewSupplierForm,
        onCreateNewEndUserSubmit,
        isSubmitting,
        setIsSubmitting,
    }
}
