import { z } from 'zod'

export const createNewFinancialFormSchema = z.object({
    statement: z
        .string()
        .min(6, { message: 'Statement must be at least 6 character' }),
    amount: z.coerce.number().min(1, { message: 'Amount is required' }),
    date: z.date({
        required_error: 'A date of birth is required.',
    }),
    paymentType: z.enum(['كاش']).default('كاش'),
    comment: z.string().min(2, { message: 'Comment is required' }),
    type: z.enum(['INCOME', 'OUTCOME']).default('INCOME'),
    orderId: z.coerce.number().min(1, { message: 'Order Id is required' }),
})
export const updateFinancialFormSchema = z.object({
    statement: z
        .string()
        .min(6, { message: 'Statement must be at least 6 character' }),
    amount: z.coerce.number().min(1, { message: 'Amount is required' }),
    date: z.date({
        required_error: 'A date of birth is required.',
    }),
    paymentType: z.enum(['كاش']).default('كاش'),
    comment: z.string().min(2, { message: 'Comment is required' }),
    type: z.enum(['INCOME', 'OUTCOME']).default('INCOME'),
    orderId: z.coerce.number().min(1, { message: 'Order Id is required' }),
})
