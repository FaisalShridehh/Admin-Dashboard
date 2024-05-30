import { z } from "zod"



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
export const formSchema = z.object({
    firstName: z.string().min(4, {
        message: 'First name is required and must be at least 4 character ',
    }),
    lastName: z.string().min(4, {
        message: 'Last name is required and must be at least 4 character ',
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
