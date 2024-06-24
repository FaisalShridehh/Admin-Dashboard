/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
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
// import { useOrders } from '@/hooks/useOrders'
import { updateOrderSchema } from '@/types/FormSchema/OrderFormSchema/OrderFormSchema'
import { Order } from '@/types/models/OrdersTypes/OrdersTypes'
import { Modal } from '../ui/modal'
interface UpdateOrderProps {
    order: Order | null
    isUpdateFormOpen: boolean
    setIsUpdateFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedOrder: React.Dispatch<React.SetStateAction<Order | null>>
}

export default function UpdateOrder({
    order,
    isUpdateFormOpen,
    setIsUpdateFormOpen,
    setSelectedOrder,
}: UpdateOrderProps) {
    // const { updateOrder } = useOrders()
    const { toast } = useToast()

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    // 1. Define your form.
    const updateOrderForm = useForm<z.infer<typeof updateOrderSchema>>({
        resolver: zodResolver(updateOrderSchema),
        defaultValues: {
            orderStatus: 'NEW',
            totalAmount: 0,
            supplierId: 1,
            items: [{ itemName: '' }],
            paymentMethod: 'كاش',
        },
        mode: 'onChange',
    })

    // 2. Define useFieldArray for dynamic items
    const { fields, append, remove } = useFieldArray({
        control: updateOrderForm.control,
        name: 'items',
    })

    // 3. Define a submit handler.
    async function onUpdateOrderSubmit(
        values: z.infer<typeof updateOrderSchema>
    ) {
        console.log('update order values => ', values)

        setIsSubmitting(true)
        try {
            // await updateOrder.mutateAsync({
            //     OrderUpdateData: values,
            //     id: orderId,
            // })
            toast({
                variant: 'default',
                title: 'Success',
                description: 'Order updated successfully',
                duration: 3000,
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to update Order: ${error.response?.data.message}`,
                    duration: 3000,
                })
            } else if (error instanceof Error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to update Order: ${error.message}`,
                    duration: 3000,
                })
            } else {
                console.error(error)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    //  useEffect(() => {
    //      if (order) {
    //          updateOrderForm.reset({
    //              statement: order?.statement,
    //              amount: order?.amount,
    //              date: toDate(order?.date),
    //              paymentType: order?.paymentType,
    //              comment: order?.comment,
    //              type: order.paymentMethod === 'Income' ? 'INCOME' : 'OUTCOME',
    //              orderId: order?.orderId,
    //          })
    //      }
    //  }, [order, updateOrderForm])

    return (
        <>
            <Modal
                isOpen={isUpdateFormOpen}
                onClose={() => {
                    setIsUpdateFormOpen(false)
                    setSelectedOrder(null)
                    updateOrderForm.reset()
                }}
                title={`Update for Order`}
                description={`Update for Order ${order ? order.id : ''} `}
                dialogClassName="max-w-3xl h-[90vh]   "
                className="max-h-svh overflow-y-auto text-text "
            >
                <Form {...updateOrderForm}>
                    <form
                        onSubmit={updateOrderForm.handleSubmit(
                            onUpdateOrderSubmit
                        )}
                        className="flex flex-col space-y-4   p-4"
                    >
                        <div className="space-y-4">
                            <FormField
                                name="orderStatus"
                                control={updateOrderForm.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Order Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a payment type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="NEW">
                                                    NEW
                                                </SelectItem>
                                                <SelectItem value="PROCESSING">
                                                    PROCESSING
                                                </SelectItem>
                                                <SelectItem value="COMPLETED">
                                                    COMPLETED
                                                </SelectItem>
                                                <SelectItem value="CANCELLED">
                                                    CANCELLED
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="totalAmount"
                                control={updateOrderForm.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                step="0.01"
                                                min={0}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="supplierId"
                                control={updateOrderForm.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Supplier ID</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="max-h-64 space-y-4 overflow-y-auto">
                                {fields.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center space-x-4 rounded-md p-2 shadow-sm"
                                    >
                                        <FormField
                                            name={`items.${index}.itemName`}
                                            control={updateOrderForm.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Item</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="Item"
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
                                onClick={() => append({ itemName: '' })}
                            >
                                Add Item
                            </Button>

                            <FormField
                                name="paymentMethod"
                                control={updateOrderForm.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Payment Method</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a payment Method" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="كاش">
                                                    كاش
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
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
                        </div>
                    </form>
                </Form>
            </Modal>
        </>
    )
}
