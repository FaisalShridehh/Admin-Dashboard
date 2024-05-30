import { useState } from 'react'

//* hooks
import { useAuth } from '@/hooks/useAuth'
//* --------------------------------------------

//* components
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { AlertError } from '@/components/ErrorAlert/ErrorAlert'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import CreateNew from '@/components/CreateNew/CreateNew'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

//* --------------------------------------------
//* for Add New Button
import { useToast } from '@/components/ui/use-toast'
import { Eye, EyeOff } from 'lucide-react'
import { useSuppliers } from '@/hooks/useSuppliers'
import { SupplierColumns } from '@/components/Columns/SuppliersColumns/columns'
//* --------------------------------------------

const breadcrumbItems = [{ title: 'Admins', link: '/Admins' }]

export default function Suppliers() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const { data, isLoading, error } = useSuppliers()
    const { user } = useAuth() // Get the logged-in user from the context

    const totalUsers = data?.length || 0
    const isSuperAdmin = user?.role === 'super_admin'
   

    // const { toast } = useToast()

    if (isLoading) return <LoadingSpinner />
    if (error) return <AlertError message={error.message} />

    return (
        <div className="flex-[11] space-y-4  p-4  pt-6 text-text md:p-8">
            <BreadCrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between">
                <Heading
                    title={`Admins (${totalUsers})`}
                    description="Manage Admins."
                />

                {/* <Button className={cn(buttonVariants({ variant: 'default' }))}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button> */}
                {/* {isSuperAdmin ? (
                    <CreateNew
                        form={form}
                        onSubmitFn={onSubmit}
                        isSubmitting={isSubmitting}
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
                                            type="text"
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
                                            type="text"
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
                                            type="text"
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
                                        <Input
                                            placeholder="Email"
                                            type="email"
                                            {...field}
                                        />
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
                                            type="text"
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
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                placeholder="password"
                                                type={
                                                    isVisible
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <div
                                            className="absolute inset-y-0 right-0 flex cursor-pointer select-none items-center pr-3"
                                            // onClick={() =>
                                            //     setIsVisible(!isVisible)
                                            // }
                                        >
                                            {isVisible ? (
                                                <EyeOff
                                                    onClick={() =>
                                                        setIsVisible(!isVisible)
                                                    }
                                                    className="h-4 w-4 text-text"
                                                />
                                            ) : (
                                                <Eye
                                                    onClick={() =>
                                                        setIsVisible(!isVisible)
                                                    }
                                                    className="h-4 w-4 text-text"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <FormDescription>
                                        Enter a valid password.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CreateNew>
                ) : null} */}
            </div>
            <Separator />

            <DataTable columns={SupplierColumns} data={data || []} />
        </div>
        // <div>
        //     <AdminTable />
        // </div>
    )
}
