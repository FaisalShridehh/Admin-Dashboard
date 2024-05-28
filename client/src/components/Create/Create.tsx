import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
// import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAdmins } from '@/hooks/useAdmins'
import { Toast } from 'primereact/toast'
import { useRef, useState } from 'react'

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
const formSchema = z.object({
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

export default function CreateAdmin() {
    const { createAdmin } = useAdmins()
    const toastRef = useRef<Toast>(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
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
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        try {
            await createAdmin.mutateAsync(values)
            toastRef.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Admin created successfully',
            })
            form.reset()
        } catch (error) {
            toastRef.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: `Failed to create admin: ${(error as Error).message}`,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'default'} className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Create
                </Button>
            </DialogTrigger>
            <DialogContent className="text-text sm:max-w-[800px]  ">
                <DialogHeader>
                    <DialogTitle>Create New Admin Here.</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-2 items-center gap-4 p-3 "
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="First Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is public first name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Last Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is public last name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is public display Email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Phone Number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is public display Phone Number.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a valid password.
                                    </FormDescription>
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

// ;<DialogContent className="text-text sm:max-w-[500px]">
//     <DialogHeader>
//         <DialogTitle>Create New Admin Here.</DialogTitle>
//     </DialogHeader>
//     <div className="grid gap-4 py-4">
//         <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//                 First Name
//             </Label>
//             <Input id="FirstName" defaultValue={''} className="col-span-3" />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//                 Last Name
//             </Label>
//             <Input id="FirstName" defaultValue={''} className="col-span-3" />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//                 User Name
//             </Label>
//             <Input id="username" defaultValue={''} className="col-span-3" />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="email" className="text-right">
//                 Email
//             </Label>
//             <Input id="email" defaultValue={''} className="col-span-3" />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="phoneNumber" className="text-right">
//                 Phone Number
//             </Label>
//             <Input id="phoneNumber" defaultValue={''} className="col-span-3" />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="password" className="text-right">
//                 Password
//             </Label>
//             <Input id="password" defaultValue={''} className="col-span-3" />
//         </div>
//     </div>
//     <DialogFooter>
//         <Button type="submit">Save changes</Button>
//     </DialogFooter>
// </DialogContent>
