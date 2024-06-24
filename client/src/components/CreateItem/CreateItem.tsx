/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

// * components
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
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
import { cn } from '@/lib/utils'
import { useItems } from '@/hooks/useItems'
import { createItemFormSchema } from '@/types/FormSchema/ItemFormSchema/ItemFormSchema'

export default function CreateItem() {
    const { createItem } = useItems()
    const { toast } = useToast()

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    // 1. Define your form.
    const createNewItemForm = useForm<z.infer<typeof createItemFormSchema>>({
        resolver: zodResolver(createItemFormSchema),
        defaultValues: {
            itemName: '',
            price: 0,
        },
        mode: 'onChange',
    })

    // 2. Define a submit handler.
    async function onCreateNewItemSubmit(
        values: z.infer<typeof createItemFormSchema>
    ) {
        console.log('new Item values => ', values)
        setIsSubmitting(true)
        try {
            await createItem.mutateAsync(values)
            toast({
                variant: 'default',
                title: 'Success',
                description: 'Item created successfully',
                duration: 3000,
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to create Item: ${error.response?.data.message}`,
                    duration: 3000,
                })
            } else if (error instanceof Error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to create Item: ${(error as Error).message}`,
                    duration: 3000,
                })
            } else {
                console.error(error)
            }
        } finally {
            createNewItemForm.reset()
            setIsSubmitting(false)
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={'default'}
                    className={`flex items-center ${cn(buttonVariants({ variant: 'default' }))}`}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </DialogTrigger>
            <DialogContent className=" text-text sm:max-w-[800px]  ">
                <DialogHeader>
                    <DialogTitle>Create New Item Here.</DialogTitle>
                </DialogHeader>

                <Form {...createNewItemForm}>
                    <form
                        onSubmit={createNewItemForm.handleSubmit(
                            onCreateNewItemSubmit
                        )}
                        className="flex flex-col space-y-4 p-4"
                    >
                        <FormField
                            name={`itemName`}
                            control={createNewItemForm.control}
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
                            control={createNewItemForm.control}
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
            </DialogContent>
        </Dialog>
    )
}
