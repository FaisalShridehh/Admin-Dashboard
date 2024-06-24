/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

// * components

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
//* ############################################################################
import { updateItemSchema } from '@/types/FormSchema/ItemFormSchema/ItemFormSchema'
import { Item } from '@/types/models/ItemsTypes/ItemsTypes'
import { Modal } from '../ui/modal'
import { useItems } from '@/hooks/useItems'
interface UpdateItemProps {
    item: Item | null
    isUpdateFormOpen: boolean
    setIsUpdateFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedItem: React.Dispatch<React.SetStateAction<Item | null>>
}

export default function UpdateItem({
    item,
    isUpdateFormOpen,
    setIsUpdateFormOpen,
    setSelectedItem,
}: UpdateItemProps) {
    const { updateItem } = useItems()
    const { toast } = useToast()

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    // 1. Define your form.
    const updateItemForm = useForm<z.infer<typeof updateItemSchema>>({
        resolver: zodResolver(updateItemSchema),
        defaultValues: {
            itemName: '',
            price: 0,
        },
        mode: 'onChange',
    })

    // 2. Define a submit handler.
    async function onUpdateItemSubmit(
        values: z.infer<typeof updateItemSchema>
    ) {
        console.log('update Item values => ', values)

        setIsSubmitting(true)
        try {
            await updateItem.mutateAsync({
                itemUpdateData: values,
                id: item?.id,
            })
            toast({
                variant: 'default',
                title: 'Success',
                description: 'Item updated successfully',
                duration: 3000,
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to update Item: ${error.response?.data.message}`,
                    duration: 3000,
                })
            } else if (error instanceof Error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to update Item: ${error.message}`,
                    duration: 3000,
                })
            } else {
                console.error(error)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        if (item) {
            updateItemForm.reset({
                itemName: item?.itemName,
                price: item?.price,
            })
        }
    }, [item, updateItemForm])

    return (
        <>
            <Modal
                isOpen={isUpdateFormOpen}
                onClose={() => {
                    setIsUpdateFormOpen(false)
                    setSelectedItem(null)
                    updateItemForm.reset()
                }}
                title={`Update for Item`}
                description={`Update for Item ${item ? item.id : ''} `}
                dialogClassName="max-w-3xl   "
                className=" text-text "
            >
                <Form {...updateItemForm}>
                    <form
                        onSubmit={updateItemForm.handleSubmit(
                            onUpdateItemSubmit
                        )}
                        className="flex flex-col space-y-4   p-4"
                    >
                        <FormField
                            name={`itemName`}
                            control={updateItemForm.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Item Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Item Name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name={`price`}
                            control={updateItemForm.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Price"
                                            step={0.01}
                                            min="1"
                                        />
                                    </FormControl>
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
