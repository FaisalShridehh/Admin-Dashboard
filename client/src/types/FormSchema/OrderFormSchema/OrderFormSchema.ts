import { z } from 'zod'

const itemSchema = z.object({
    itemName: z.string().min(1, { message: 'Item Name is required' }),
    quantity: z.coerce
        .number()
        .int('Quantity must be an integer')
        .positive('Quantity must be greater than 0')
        .min(1, 'Quantity must be at least 1'),
})
export const createOrderSchemaFormSchema = z.object({
    items: z
        .array(itemSchema)
        .nonempty({ message: 'At least one item is required' }),
    paymentMethod: z.enum(['كاش'], { message: 'Payment Method is required' }),
})


const itemUpdateSchema = z.object({
    itemName: z.string().min(1, { message: 'Item Name is required' }),
})
export const updateOrderSchema = z.object({
    orderStatus: z.enum(['NEW', 'PROCESSING', 'COMPLETED', 'CANCELLED']),
    totalAmount: z.coerce.number().positive(),
    supplierId: z.coerce.number().positive(),
    items: z
        .array(itemUpdateSchema)
        .nonempty({ message: 'At least one item is required' }),
    paymentMethod: z.enum(['كاش'], { message: 'Payment Method is required' }),
})
