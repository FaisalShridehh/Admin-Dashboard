import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { adminUpdateFormSchema } from '@/types/FormSchema/AdminFormSchema/AdminFormSchema'
import { Admin } from '@/types/models/AdminTypes/AdminTypes'
import { EndUser } from '@/types/models/EndUsersTypes/endUsersTypes'
import { Supplier } from '@/types/models/SuppliersTypes/SuppliersTypes'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Modal } from '../ui/modal'
import { useEffect } from 'react'
// Define a base type that all user types will extend
type BaseUser = Admin | EndUser | Supplier
interface UpdateFormProps<T extends BaseUser> {
    isUpdateFormOpen: boolean
    setIsUpdateFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedUser: React.Dispatch<React.SetStateAction<T | null>>
    user: T | null
    userType: 'Admin' | 'EndUser' | 'Supplier'
    onSubmitFn: (values: z.infer<typeof adminUpdateFormSchema>) => Promise<void>
    form: UseFormReturn<
        {
            id: number
            firstName: string
            lastName: string
            username: string
            email: string
            phoneNumber: string
            roleId: number
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any,
        undefined
    >

    isSubmitting: boolean
    UpdateFormReset: (user: T) => void
}
export default function Update<T extends BaseUser>({
    isUpdateFormOpen,
    setIsUpdateFormOpen,
    setSelectedUser,
    user,
    userType,
    form,
    onSubmitFn,
    isSubmitting,
    UpdateFormReset,
}: UpdateFormProps<T>) {
    useEffect(() => {
        if (user) {
            UpdateFormReset(user)
        }
    }, [user, form, UpdateFormReset])
    return (
        <>
            <Modal
                isOpen={isUpdateFormOpen}
                onClose={() => {
                    setIsUpdateFormOpen(false)
                    setSelectedUser(null)
                    form.reset()
                }}
                title={`Update  ${userType}`}
                description={`Update for ${user ? user.firstName : ''} ${user ? user.lastName : ''}`}
                className="text-text"
                dialogClassName="max-w-3xl"
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmitFn)}
                        className="grid grid-cols-2 items-center gap-4 p-3"
                    >
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{`${userType} Id`}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={`${userType} Id`}
                                            type="number"
                                            readOnly
                                            disabled
                                            {...field}
                                        />
                                    </FormControl>
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
                                            placeholder={`First Name`}
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
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
                                            type={'text'}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="User Name"
                                            type={'text'}
                                            {...field}
                                        />
                                    </FormControl>

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
                                            type={'text'}
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="roleId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role Id</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Role Id"
                                            type="number"
                                            min={1}
                                            max={6}
                                            disabled={
                                                userType === 'EndUser' ||
                                                userType === 'Supplier'
                                                    ? true
                                                    : false
                                            }
                                            {...field}
                                        />
                                    </FormControl>

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
            </Modal>
        </>
    )
}
