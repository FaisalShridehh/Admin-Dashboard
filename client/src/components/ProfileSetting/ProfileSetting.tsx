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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'
import apiClient from '@/api/axios'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { AlertError } from '../ErrorAlert/ErrorAlert'
import { useEffect } from 'react'
const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)
const formSchema = z.object({
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
})

export default function ProfileSetting() {
    const { isLoading, data, error } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const res = await apiClient.get('admin/profile')
            if (res.status !== 200) {
                throw new Error(res.statusText)
            }
            return res.data.data
        },
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    // Update form default values when data is loaded
    useEffect(() => {
        if (data) {
            form.reset({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                username: data.username,
            })
        }
    }, [data, form])

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    if (isLoading) return <LoadingSpinner />
    if (error) return <AlertError message={error.message} />
    return (
        <div className="container mx-auto  px-4 py-4 font-poppins text-text md:px-6 lg:px-8">
            <div className="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold">Profile</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Update your personal information.
                    </p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0">
                    Change Password
                </Button>
            </div>
            <div className="flex flex-col gap-4 rounded-lg p-6 text-text ">
                {/* Avatar and name */}
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 font-semibold text-accent ">
                        <AvatarImage src="" alt={data?.username ?? ''} />
                        <AvatarFallback>
                            {data?.username?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">
                            {' '}
                            {data?.username}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            {data?.username}
                        </p>
                    </div>
                </div>
                {/* Avatar and name */}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className=" flex flex-col space-y-2 text-text"
                    >
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                                            This is your public First Name.
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
                                            This is your public Last Name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
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
                                        This is your public display Username.
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
                                        This is your public email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {data.phoneNumber && (
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
                                            This is your public Phone Number.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        <Button
                            variant={'ghost'}
                            className="bg-accent-800 text-white dark:bg-accent dark:text-white "
                            type="submit"
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
