/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'
import { useFieldArray, useForm } from 'react-hook-form'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
//* ############################################################################
import { cn } from '@/lib/utils'
import { useOrders } from '@/hooks/useOrders'
import { createOrderSchemaFormSchema } from '@/types/FormSchema/OrderFormSchema/OrderFormSchema'

export default function CreateOrder() {
    const { createOrder } = useOrders()
    const { toast } = useToast()

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    // 1. Define your form.
    const createNewOrderForm = useForm<
        z.infer<typeof createOrderSchemaFormSchema>
    >({
        resolver: zodResolver(createOrderSchemaFormSchema),
        defaultValues: {
            items: [{ itemName: '', quantity: 1 }],
            paymentMethod: 'كاش',
        },
        mode: 'onChange',
    })

    // 2. Define useFieldArray for dynamic items
    const { fields, append, remove } = useFieldArray({
        control: createNewOrderForm.control,
        name: 'items',
    })

    // 3. Define a submit handler.
    async function onCreateNewOrderSubmit(
        values: z.infer<typeof createOrderSchemaFormSchema>
    ) {
        console.log('new order values => ', values)
        setIsSubmitting(true)
        try {
            await createOrder.mutateAsync(values)
            toast({
                variant: 'default',
                title: 'Success',
                description: 'Order created successfully',
                duration: 3000,
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to create Order: ${error.response?.data.message}`,
                    duration: 3000,
                })
            } else if (error instanceof Error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to create Order: ${(error as Error).message}`,
                    duration: 3000,
                })
            } else {
                console.error(error)
            }
        } finally {
            createNewOrderForm.reset()
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
                    <DialogTitle>Create New Order Here.</DialogTitle>
                </DialogHeader>

                <Form {...createNewOrderForm}>
                    <form
                        onSubmit={createNewOrderForm.handleSubmit(
                            onCreateNewOrderSubmit
                        )}
                        className="flex flex-col space-y-4 p-4"
                    >
                        <div className="max-h-64 space-y-4 overflow-y-auto">
                            {fields.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex items-center space-x-4 rounded-md p-2 shadow-sm"
                                >
                                    <FormField
                                        name={`items.${index}.itemName`}
                                        control={createNewOrderForm.control}
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
                                        name={`items.${index}.quantity`}
                                        control={createNewOrderForm.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Quantity</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        placeholder="Quantity"
                                                        min="1"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                        variant="destructive"
                                        className="self-end"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button
                            type="button"
                            onClick={() =>
                                append({ itemName: '', quantity: 1 })
                            }
                        >
                            Add Item
                        </Button>

                        <FormField
                            name="paymentMethod"
                            control={createNewOrderForm.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payment Method</FormLabel>
                                    <FormControl>
                                        <Select {...field}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select payment method" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="كاش">
                                                    كاش
                                                </SelectItem>
                                                {/* Add other payment methods here */}
                                            </SelectContent>
                                        </Select>
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
