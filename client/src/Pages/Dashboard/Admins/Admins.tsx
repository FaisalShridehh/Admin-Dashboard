import { useCallback, useMemo, useState } from 'react'

//* hooks
import { useAdmins } from '@/hooks/useAdmins'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { formSchema } from '@/types/FormSchema/AdminFormSchema/AdminFormSchema'
import { Eye, EyeOff } from 'lucide-react'
import { getAdminColumns } from '@/components/Columns/AdminColumns/columns'
import { Admin } from '@/types/models/AdminTypes/AdminTypes'
import ChangePasswordForm from '@/components/ChangePassword/ChangePasswordForm'
//* --------------------------------------------

const breadcrumbItems = [{ title: 'Admins', link: '/Admins' }]

export default function Admins() {
    const {
        data,
        isLoading,
        error,
        createAdmin,
        AdminsLength,
        page,
        size,
        setPage,
        setSize,
    } = useAdmins()
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isChangePasswordOpen, setIsChangePasswordOpen] =
        useState<boolean>(false)
    const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)
    const { user } = useAuth() // Get the logged-in user from the context
    const isSuperAdmin = user?.role === 'super_admin'
    const totalUsers = AdminsLength || 0
    const pageCount = Math.ceil(totalUsers / size)

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
            toast({
                variant: 'default',
                title: 'Success',
                description: 'Admin created successfully',
                duration: 3000,
            })
            form.reset()
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: `Failed to create admin: ${(error as Error).message}`,
                duration: 3000,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const onEdit = useCallback((admin: Admin) => {
        setSelectedAdmin(admin)
        setIsChangePasswordOpen(true)
    }, [])

    const adminColumns = useMemo(
        () => getAdminColumns({ onEdit, isSuperAdmin }),
        [isSuperAdmin, onEdit]
    )
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
                {isSuperAdmin ? (
                    <>
                        <CreateNew
                            form={form}
                            onSubmitFn={onSubmit}
                            isSubmitting={isSubmitting}
                            type="Admin"
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
                                                            setIsVisible(
                                                                !isVisible
                                                            )
                                                        }
                                                        className="h-4 w-4 text-text"
                                                    />
                                                ) : (
                                                    <Eye
                                                        onClick={() =>
                                                            setIsVisible(
                                                                !isVisible
                                                            )
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

                        <ChangePasswordForm
                            admin={selectedAdmin}
                            isChangePasswordOpen={isChangePasswordOpen}
                            setIsChangePasswordOpen={setIsChangePasswordOpen}
                            setSelectedAdmin={setSelectedAdmin}
                        />
                    </>
                ) : null}
            </div>
            <Separator />

            <DataTable
                columns={adminColumns}
                data={data || []}
                searchKey="email"
                pageCount={pageCount}
                page={page}
                size={size}
                onPageChange={setPage}
                onSizeChange={setSize}
            />
        </div>
    )
}
