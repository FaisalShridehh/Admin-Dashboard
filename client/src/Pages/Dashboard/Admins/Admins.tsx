import { useCallback, useMemo, useState } from 'react'

//* hooks
import { useAdmins } from '@/hooks/useAdmins'
import { useAuth } from '@/hooks/useAuth'
import { useSuperAdmin_Admin_Form } from '@/hooks/SuperAdmin-Admin/useSuperAdmin-Admin_Form'
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
import { getAdminColumns } from '@/components/Columns/AdminColumns/columns'
import ChangePasswordForm from '@/components/ChangePassword/ChangePasswordForm'
import Update from '@/components/UpdateButton/Update'
import { Eye, EyeOff } from 'lucide-react'

//* --------------------------------------------
//* types

import { Admin } from '@/types/models/AdminTypes/AdminTypes'
//* --------------------------------------------

const breadcrumbItems = [{ title: 'Admins', link: '/Admins' }]

export default function Admins() {
    const {
        data,
        isLoading,
        error,
        AdminsLength,
        page,
        size,
        setPage,
        setSize,
    } = useAdmins()

    const {
        createNewAdminForm,
        onCreateNewAdminSubmit,
        isSubmitting,
        changePasswordForm,
        onChangePasswordSubmit,
        UpdateAdminForm,
        onUpdateAdminSubmit,
        isUpdateFormOpen,
        setIsUpdateFormOpen,
    } = useSuperAdmin_Admin_Form()

    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isChangePasswordOpen, setIsChangePasswordOpen] =
        useState<boolean>(false)
    const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)
    const { user } = useAuth() // Get the logged-in user from the context
    const isSuperAdmin = user?.role === 'super_admin'
    const totalUsers = AdminsLength || 0
    const pageCount = Math.ceil(totalUsers / size)

    const onEdit = useCallback(
        (admin: Admin) => {
            if (selectedAdmin) setSelectedAdmin(null)

            setSelectedAdmin(admin)
            setIsUpdateFormOpen(true)
        },
        [selectedAdmin, setIsUpdateFormOpen]
    )
    const onUpdatePassword = useCallback(
        (admin: Admin) => {
            if (selectedAdmin) setSelectedAdmin(null)
            setSelectedAdmin(admin)
            setIsChangePasswordOpen(true)
        },
        [selectedAdmin]
    )

    const adminColumns = useMemo(
        () => getAdminColumns({ onUpdatePassword, isSuperAdmin, onEdit }),
        [isSuperAdmin, onEdit, onUpdatePassword]
    )
    // console.log(data);
    const ChangePasswordFormReset = useCallback(
        (user: Admin) => {
            changePasswordForm.reset({
                id: user.id, // Cast to any to access id
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
        },
        [changePasswordForm]
    )
    const UpdateFormReset = useCallback(
        (user: Admin) => {
            UpdateAdminForm.reset({
                id: user?.id,
                firstName: user?.firstName,
                lastName: user?.lastName,
                username: user?.username,
                email: user?.email,
                phoneNumber: user?.phoneNumber,
                roleId: user?.roleId,
            })
        },
        [UpdateAdminForm]
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

                {isSuperAdmin ? (
                    <>
                        <CreateNew
                            form={createNewAdminForm}
                            onSubmitFn={onCreateNewAdminSubmit}
                            isSubmitting={isSubmitting}
                            type="Admin"
                        >
                            <FormField
                                control={createNewAdminForm.control}
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
                                control={createNewAdminForm.control}
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
                                control={createNewAdminForm.control}
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
                                control={createNewAdminForm.control}
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
                                control={createNewAdminForm.control}
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
                                control={createNewAdminForm.control}
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
                                                        className="h-4 w-4 text-secondaryText"
                                                    />
                                                ) : (
                                                    <Eye
                                                        onClick={() =>
                                                            setIsVisible(
                                                                !isVisible
                                                            )
                                                        }
                                                        className="h-4 w-4 text-secondaryText"
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
                            user={selectedAdmin}
                            form={changePasswordForm}
                            onSubmitFn={onChangePasswordSubmit}
                            isChangePasswordOpen={isChangePasswordOpen}
                            setIsChangePasswordOpen={setIsChangePasswordOpen}
                            setSelectedUser={setSelectedAdmin}
                            userType="Admin"
                            isSubmitting={isSubmitting}
                            ChangePasswordFormReset={ChangePasswordFormReset}
                            idFieldName="adminId"
                        />

                        <Update
                            isUpdateFormOpen={isUpdateFormOpen}
                            setIsUpdateFormOpen={setIsUpdateFormOpen}
                            setSelectedUser={setSelectedAdmin}
                            user={selectedAdmin}
                            userType={'Admin'}
                            form={UpdateAdminForm}
                            onSubmitFn={onUpdateAdminSubmit}
                            isSubmitting={isSubmitting}
                            UpdateFormReset={UpdateFormReset}
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
