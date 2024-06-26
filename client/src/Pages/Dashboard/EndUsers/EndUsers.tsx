import { useCallback, useMemo, useState } from 'react'
//* hooks
import { useEndUsers } from '@/hooks/useEndUsers'
import { useAdmin_EndUser_Form } from '@/hooks/Admin-EndUser/useAdmin-EndUser'

//* components

import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { AlertError } from '@/components/ErrorAlert/ErrorAlert'
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { getEndUsersColumns } from '@/components/Columns/EndUsersColumns/columns'
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
import { Eye, EyeOff } from 'lucide-react'
//* --------------------------------------------
//* types
import { EndUser } from '@/types/models/EndUsersTypes/endUsersTypes'
import ChangePasswordForm from '@/components/ChangePassword/ChangePasswordForm'
import Update from '@/components/UpdateButton/Update'
//* --------------------------------------------

const breadcrumbItems = [{ title: 'EndUsers', link: '/EndUsers' }]

export default function EndUsers() {
    const {
        data,
        endUserLength,
        isLoading,
        error,
        page,
        size,
        setPage,
        setSize,
    } = useEndUsers()
    const {
        createNewEndUserForm,
        onCreateNewEndUserSubmit,
        isSubmitting,
        changePasswordForm,
        onChangePasswordSubmit,
        UpdateEndUserForm,
        onUpdateEndUserSubmit,
        isUpdateFormOpen,
        setIsUpdateFormOpen,
    } = useAdmin_EndUser_Form()
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isChangePasswordOpen, setIsChangePasswordOpen] =
        useState<boolean>(false)
    const [selectedEndUser, setSelectedEndUser] = useState<EndUser | null>(null)

    const totalUsers = endUserLength || 0
    const pageCount = Math.ceil(totalUsers / size)

    const onEdit = useCallback(
        (endUser: EndUser) => {
            if (selectedEndUser) setSelectedEndUser(null)

            setSelectedEndUser(endUser)
            setIsUpdateFormOpen(true)
        },
        [selectedEndUser, setIsUpdateFormOpen]
    )
    const onUpdatePassword = useCallback(
        (endUser: EndUser) => {
            if (selectedEndUser) setSelectedEndUser(null)
            setSelectedEndUser(endUser)
            setIsChangePasswordOpen(true)
        },
        [selectedEndUser]
    )

    const endUsersColumns = useMemo(
        () => getEndUsersColumns({ onUpdatePassword, onEdit }),
        [onEdit, onUpdatePassword]
    )
    const ChangePasswordFormReset = useCallback(
        (user: EndUser) => {
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
        (user: EndUser) => {
            UpdateEndUserForm.reset({
                id: user?.id,
                firstName: user?.firstName,
                lastName: user?.lastName,
                username: user?.username,
                email: user?.email,
                phoneNumber: user?.phoneNumber,
                roleId: user?.roleId,
            })
        },
        [UpdateEndUserForm]
    )
    if (isLoading) return <LoadingSpinner />
    if (error) return <AlertError message={error.message} />
    return (
        <div className="flex-[11] space-y-4  p-4  pt-6 text-text md:p-8">
            <BreadCrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between">
                <Heading
                    title={`End Users (${totalUsers})`}
                    description="Manage End Users."
                />

                <CreateNew
                    form={createNewEndUserForm}
                    onSubmitFn={onCreateNewEndUserSubmit}
                    isSubmitting={isSubmitting}
                    type="End User"
                >
                    <FormField
                        control={createNewEndUserForm.control}
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
                        control={createNewEndUserForm.control}
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
                        control={createNewEndUserForm.control}
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
                        control={createNewEndUserForm.control}
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
                        control={createNewEndUserForm.control}
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
                        control={createNewEndUserForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            placeholder="password"
                                            type={
                                                isVisible ? 'text' : 'password'
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
                                                className="h-4 w-4 text-secondaryText"
                                            />
                                        ) : (
                                            <Eye
                                                onClick={() =>
                                                    setIsVisible(!isVisible)
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
                    user={selectedEndUser}
                    form={changePasswordForm}
                    onSubmitFn={onChangePasswordSubmit}
                    isChangePasswordOpen={isChangePasswordOpen}
                    setIsChangePasswordOpen={setIsChangePasswordOpen}
                    setSelectedUser={setSelectedEndUser}
                    userType="EndUser"
                    isSubmitting={isSubmitting}
                    ChangePasswordFormReset={ChangePasswordFormReset}
                    idFieldName="userId"
                />

                <Update
                    isUpdateFormOpen={isUpdateFormOpen}
                    setIsUpdateFormOpen={setIsUpdateFormOpen}
                    user={selectedEndUser}
                    setSelectedUser={setSelectedEndUser}
                    userType={'EndUser'}
                    form={UpdateEndUserForm}
                    onSubmitFn={onUpdateEndUserSubmit}
                    isSubmitting={isSubmitting}
                    UpdateFormReset={UpdateFormReset}
                />
            </div>
            <Separator />

            <DataTable
                columns={endUsersColumns}
                data={data || []}
                searchKey="email"
                pageCount={pageCount}
                page={page}
                size={size}
                onPageChange={setPage}
                onSizeChange={setSize}
                // pagination={pagination}
                // setPagination={setPagination}
            />
        </div>
    )
}
