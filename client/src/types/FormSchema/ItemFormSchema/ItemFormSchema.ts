import { z } from 'zod'

export const createItemFormSchema = z.object({
    itemName: z.string().min(1, { message: 'Item Name is required' }),
    price: z.coerce.number().positive(),
})

export const updateItemSchema = z.object({
    itemName: z.string().min(1, { message: 'Item Name is required' }),
    price: z.coerce.number().positive(),
})
