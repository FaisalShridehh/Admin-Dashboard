/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
// import { z } from 'zod'

import { Eye, EyeOff } from 'lucide-react'
import { Input } from '../ui/input'
import { Modal } from '../ui/modal'
import { Admin } from '@/types/models/AdminTypes/AdminTypes'
import { EndUser } from '@/types/models/EndUsersTypes/endUsersTypes'
import { Supplier } from '@/types/models/SuppliersTypes/SuppliersTypes'

// Define a base type that all user types will extend
type BaseUser = Admin | EndUser | Supplier

type FormValues = {
    id: number
    oldPassword: string
    newPassword: string
    confirmPassword: string
}
interface ChangePasswordFormProps<T extends BaseUser> {
    isChangePasswordOpen: boolean
    setIsChangePasswordOpen: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedUser: React.Dispatch<React.SetStateAction<T | null>>
    user: T | null
    userType: 'Admin' | 'EndUser' | 'Supplier'
    onSubmitFn: (values: Record<string, any>) => Promise<void>
    form: UseFormReturn<
        {
            id: number
            oldPassword: string
            newPassword: string
            confirmPassword: string
        },
        any,
        undefined
    >
    ChangePasswordFormReset: (user: T) => void
    isSubmitting: boolean
    idFieldName: 'userId' | 'adminId' | 'supplierId'
}
export default function ChangePasswordForm<T extends BaseUser>({
    isChangePasswordOpen,
    setIsChangePasswordOpen,
    setSelectedUser,
    user,
    userType,
    form,
    onSubmitFn,
    isSubmitting,
    ChangePasswordFormReset,
    idFieldName,
}: ChangePasswordFormProps<T>) {
    const [isOldPasswordVisible, setIsOldPasswordVisible] =
        useState<boolean>(false)
    const [isNewPasswordVisible, setIsNewPasswordVisible] =
        useState<boolean>(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState<boolean>(false)

    useEffect(() => {
        if (user) {
            ChangePasswordFormReset(user)
        }
    }, [user, form, ChangePasswordFormReset])

    const handleSubmit = (data: FormValues) => {
        const transformedData: Record<string, any> = {
            [idFieldName]: data.id,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
        }
        onSubmitFn(transformedData)
        setIsChangePasswordOpen(false)
    }

    return (
        <>
            <Modal
                isOpen={isChangePasswordOpen}
                onClose={() => {
                    setIsChangePasswordOpen(false)
                    setSelectedUser(null)
                    form.reset()
                }}
                title={`Update Password for ${userType}`}
                description={`Change password for ${user ? user.firstName : ''} ${user ? user.lastName : ''}`}
                className="text-text"
                dialogClassName="max-w-3xl"
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="grid grid-cols-2 items-center gap-4 p-3"
                    >
                        <FormField
                            control={form.control}
                            name={'id'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Admin Id</FormLabel>
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
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Old Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                placeholder="Old Password"
                                                type={
                                                    isOldPasswordVisible
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <div
                                            className="absolute inset-y-0 right-0 flex cursor-pointer select-none items-center pr-3"
                                            onClick={() =>
                                                setIsOldPasswordVisible(
                                                    !isOldPasswordVisible
                                                )
                                            }
                                        >
                                            {isOldPasswordVisible ? (
                                                <EyeOff className="h-4 w-4 text-text" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-text" />
                                            )}
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                placeholder="New Password"
                                                type={
                                                    isNewPasswordVisible
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <div
                                            className="absolute inset-y-0 right-0 flex cursor-pointer select-none items-center pr-3"
                                            onClick={() =>
                                                setIsNewPasswordVisible(
                                                    !isNewPasswordVisible
                                                )
                                            }
                                        >
                                            {isNewPasswordVisible ? (
                                                <EyeOff className="h-4 w-4 text-text" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-text" />
                                            )}
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                placeholder="Confirm Password"
                                                type={
                                                    isConfirmPasswordVisible
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <div
                                            className="absolute inset-y-0 right-0 flex cursor-pointer select-none items-center pr-3"
                                            onClick={() =>
                                                setIsConfirmPasswordVisible(
                                                    !isConfirmPasswordVisible
                                                )
                                            }
                                        >
                                            {isConfirmPasswordVisible ? (
                                                <EyeOff className="h-4 w-4 text-text" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-text" />
                                            )}
                                        </div>
                                    </div>
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
