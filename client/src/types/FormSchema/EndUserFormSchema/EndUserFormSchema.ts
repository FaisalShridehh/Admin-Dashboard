import { z } from 'zod'

// The regular expression matches phone numbers in various formats.
// Here's the breakdown of the expression:
// - `^` asserts the start of the string.
// - `([+]?[\s0-9]+)?` optionally matches a plus sign or whitespace followed by one or more digits.
// - `(\d{3}|[(]?[0-9]+[)])?` optionally matches a group of three digits or a sequence of digits enclosed in parentheses.
// - `([-]?[\s]?[0-9])+` matches one or more digits optionally preceded by a hyphen or whitespace.
// The `$` asserts the end of the string.
const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)
export const createNewEndUserFormSchema = z.object({
    firstName: z.string().min(2, {
        message: 'First name is required and must be at least 2 character ',
    }),
    lastName: z.string().min(2, {
        message: 'Last name is required and must be at least 2 character ',
    }),
    email: z.string().email({ message: 'Invalid email address' }),
    phoneNumber: z.string().regex(phoneRegex, 'Invalid phone number'),
    username: z.string().min(4, {
        message: 'Username is required and must be at least 4 character ',
    }),
    password: z
        .string()
        .min(8, {
            message: 'Password must be at least 8 characters long',
        })
        .regex(/[A-Z]/, {
            message: 'Password must contain at least one uppercase letter',
        }),
})

export const endUserChangePasswordFormSchema = z
    .object({
        id: z.coerce
            .number()
            .min(1, { message: 'EndUser Id is required' }),
        oldPassword: z
            .string()
            .min(8, {
                message: 'Password must be at least 8 characters long',
            })
            .regex(/[A-Z]/, {
                message: 'Password must contain at least one uppercase letter',
            }),
        newPassword: z
            .string()
            .min(8, {
                message: 'Password must be at least 8 characters long',
            })
            .regex(/[A-Z]/, {
                message: 'Password must contain at least one uppercase letter',
            }),
        confirmPassword: z
            .string()
            .min(8, {
                message: 'Password must be at least 8 characters long',
            })
            .regex(/[A-Z]/, {
                message: 'Password must contain at least one uppercase letter',
            }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'New password and confirm password must match',
    })

export const endUserUpdateFormSchema = z.object({
    id: z.coerce.number().min(1, { message: 'EndUser Id is required' }),
    firstName: z.string().min(2, {
        message: 'First name is required and must be at least 2 character ',
    }),
    lastName: z.string().min(2, {
        message: 'Last name is required and must be at least 2 character ',
    }),
    username: z.string().min(4, {
        message: 'Username is required and must be at least 4 character ',
    }),
    email: z.string().email({ message: 'Invalid email address' }),
    phoneNumber: z.string().regex(phoneRegex, 'Invalid phone number'),
    roleId: z.coerce.number().min(1, { message: 'Role Id is required' }),
})
