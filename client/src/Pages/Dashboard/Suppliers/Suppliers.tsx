import { useCallback, useMemo, useState } from 'react'

//* hooks
import { useSuppliers } from '@/hooks/useSuppliers'
import { useAdmin_Supplier_Form } from '@/hooks/Admin-Supplier/useAdmin-Supplier'
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
import { Eye, EyeOff } from 'lucide-react'
import { getSuppliersColumns } from '@/components/Columns/SuppliersColumns/columns'
import ChangePasswordForm from '@/components/ChangePassword/ChangePasswordForm'
import Update from '@/components/UpdateButton/Update'
//* --------------------------------------------
import { Supplier } from '@/types/models/SuppliersTypes/SuppliersTypes'

const breadcrumbItems = [{ title: 'Admins', link: '/Admins' }]

export default function Suppliers() {
    const {
        data,
        isLoading,
        error,
        suppliersLength,
        page,
        size,
        setPage,
        setSize,
    } = useSuppliers()
    const {
        createNewSupplierForm,
        onCreateNewSupplierSubmit,
        isSubmitting,
        changePasswordForm,
        onChangePasswordSubmit,
        UpdateSupplierForm,
        onUpdateSupplierSubmit,
        isUpdateFormOpen,
        setIsUpdateFormOpen,
    } = useAdmin_Supplier_Form()

    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isChangePasswordOpen, setIsChangePasswordOpen] =
        useState<boolean>(false)
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
        null
    )

    const totalUsers = suppliersLength || 0
    const pageCount = Math.ceil(totalUsers / size)

    const onEdit = useCallback(
        (Supplier: Supplier) => {
            if (selectedSupplier) setSelectedSupplier(null)

            setSelectedSupplier(Supplier)
            setIsUpdateFormOpen(true)
        },
        [selectedSupplier, setIsUpdateFormOpen]
    )
    const onUpdatePassword = useCallback(
        (Supplier: Supplier) => {
            if (selectedSupplier) setSelectedSupplier(null)
            setSelectedSupplier(Supplier)
            setIsChangePasswordOpen(true)
        },
        [selectedSupplier]
    )

    const SuppliersColumns = useMemo(
        () => getSuppliersColumns({ onUpdatePassword, onEdit }),
        [onEdit, onUpdatePassword]
    )
    const ChangePasswordFormReset = useCallback(
        (user: Supplier) => {
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
        (user: Supplier) => {
            UpdateSupplierForm.reset({
                id: user?.id,
                firstName: user?.firstName,
                lastName: user?.lastName,
                username: user?.username,
                email: user?.email,
                phoneNumber: user?.phoneNumber,
                roleId: user?.roleId,
            })
        },
        [UpdateSupplierForm]
    )
    if (isLoading) return <LoadingSpinner />
    if (error) return <AlertError message={error.message} />

    return (
        <div className="flex-[11] space-y-4  p-4  pt-6 text-text md:p-8">
            <BreadCrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between">
                <Heading
                    title={`Suppliers (${totalUsers})`}
                    description="Manage Suppliers."
                />

                <CreateNew
                    form={createNewSupplierForm}
                    onSubmitFn={onCreateNewSupplierSubmit}
                    isSubmitting={isSubmitting}
                    type="End User"
                >
                    <FormField
                        control={createNewSupplierForm.control}
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
                        control={createNewSupplierForm.control}
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
                        control={createNewSupplierForm.control}
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
                        control={createNewSupplierForm.control}
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
                        control={createNewSupplierForm.control}
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
                        control={createNewSupplierForm.control}
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
                    user={selectedSupplier}
                    form={changePasswordForm}
                    onSubmitFn={onChangePasswordSubmit}
                    isChangePasswordOpen={isChangePasswordOpen}
                    setIsChangePasswordOpen={setIsChangePasswordOpen}
                    setSelectedUser={setSelectedSupplier}
                    userType="Supplier"
                    isSubmitting={isSubmitting}
                    ChangePasswordFormReset={ChangePasswordFormReset}
                    idFieldName="supplierId"
                />

                <Update
                    isUpdateFormOpen={isUpdateFormOpen}
                    setIsUpdateFormOpen={setIsUpdateFormOpen}
                    user={selectedSupplier}
                    setSelectedUser={setSelectedSupplier}
                    userType={'Supplier'}
                    form={UpdateSupplierForm}
                    onSubmitFn={onUpdateSupplierSubmit}
                    isSubmitting={isSubmitting}
                    UpdateFormReset={UpdateFormReset}
                />
            </div>
            <Separator />

            <DataTable
                columns={SuppliersColumns}
                data={data || []}
                searchKey="email"
                page={page}
                size={size}
                onPageChange={setPage}
                onSizeChange={setSize}
                pageCount={pageCount}
            />
        </div>
        // <div>
        //     <AdminTable />
        // </div>
    )
}
