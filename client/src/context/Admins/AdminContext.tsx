import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/hooks/useAuth'
import {
    AdminProviderProps,
    AdminProviderState,
    ApiResponse,
    CreateAdminInput,
    PassDataInput,
    UpdateDataInput,
} from '@/types/models/AdminTypes/AdminTypes'
import {
    activateAdmin,
    ChangeAdminPassword,
    createAdmin as createAdminAPI,
    deActivateAdmin,
    deleteAdmin,
    fetchAdmins,
    updateAdmin,
} from '@/utils/adminApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createContext } from 'react'
import { useScopedSearchParams } from '@/hooks/useScopedSearchParams'
import { AxiosError } from 'axios'

export const AdminProviderContext = createContext<
    AdminProviderState | undefined
>(undefined)

export default function AdminProvider({ children }: AdminProviderProps) {
    const { user } = useAuth() // Access the current user
    const { toast } = useToast()
    // const [isChangePasswordOpen, setIsChangePasswordOpen] =
    //     useState<boolean>(false)
    // const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)
    const { page, setPage, size, setSize, isActive, setIsActive } =
        useScopedSearchParams(0, 20, undefined)

    const { isLoading, data, error } = useQuery<ApiResponse, Error>({
        queryKey: ['admins', page, size, isActive],
        queryFn: async () => {
            const params: {
                page: number
                size: number
                isActive?: boolean
            } = { page, size }
            if (isActive !== undefined) {
                params.isActive = isActive
            }
            return await fetchAdmins(params)
        },
        // StaleTime  can be adjusted based on your requirements
        staleTime: 300000, // 5 minutes
    })

    const queryClient = useQueryClient()

    const invalidateQueries = async () => {
        await queryClient.invalidateQueries({ queryKey: ['admins'] })
    }

    const deleteAdminMutation = useMutation({
        mutationFn: async (id: number) => {
            if (user?.role !== 'super_admin') {
                throw new Error('Unauthorized')
            }
            return await deleteAdmin(id)
        },
        onSuccess: () => {
            // console.log(data)
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: 'Admin deleted successfully',
                        duration: 3000,
                    })
                }
            })
        },
        onError: (error) => {
            if (toast) {
                if (error instanceof AxiosError) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.response?.data.message}`,
                        duration: 3000,
                    })
                } else if (error instanceof Error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.message}`,
                        duration: 3000,
                    })
                } else {
                    console.log(error)
                }
            }
            console.log(error)
        },
    })

    const deActivateAdminMutation = useMutation({
        mutationFn: async (id: number) => {
            if (user?.role !== 'super_admin') {
                throw new Error('Unauthorized')
            }

            return await deActivateAdmin(id)
        },
        onSuccess: () => {
            // console.log(data)
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'success',
                        description: `Admin deactivated successfully`,
                        duration: 3000,
                    })
                }
            })
        },
        onError: (error) => {
            if (toast) {
                if (error instanceof AxiosError) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.response?.data.message}`,
                        duration: 3000,
                    })
                } else if (error instanceof Error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.message}`,
                        duration: 3000,
                    })
                } else {
                    console.log(error)
                }
            }
            console.log(error)
        },
    })

    const ActivateAdminMutation = useMutation({
        mutationFn: async (id: number) => {
            if (user?.role !== 'super_admin') {
                throw new Error('Unauthorized')
            }

            return await activateAdmin(id)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: `Admin activated successfully`,
                        duration: 3000,
                    })
                }
            })
        },
        onError: (error) => {
            if (toast) {
                if (error instanceof AxiosError) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.response?.data.message}`,
                        duration: 3000,
                    })
                } else if (error instanceof Error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.message}`,
                        duration: 3000,
                    })
                } else {
                    console.log(error)
                }
            }
            console.log(error)
        },
    })

    const createAdminMutation = useMutation({
        mutationFn: async (adminData: CreateAdminInput) => {
            if (user?.role !== 'super_admin') {
                throw new Error('Unauthorized')
            }
            return createAdminAPI(adminData)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: 'Admin created successfully',
                        duration: 3000,
                    })
                }
            })
        },
        onError: (error) => {
            if (toast) {
                if (error instanceof AxiosError) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.response?.data.message}`,
                        duration: 3000,
                    })
                } else if (error instanceof Error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.message}`,
                        duration: 3000,
                    })
                } else {
                    console.log(error)
                }
            }
            console.error(error)
        },
    })

    const ChangePasswordMutation = useMutation({
        mutationFn: async (adminPassData: PassDataInput) => {
            if (user?.role !== 'super_admin') {
                throw new Error('Unauthorized')
            }
            return ChangeAdminPassword(adminPassData)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: 'Password changed successfully',
                        duration: 3000,
                    })
                }
            })
        },
        onError: (error) => {
            if (toast) {
                if (error instanceof AxiosError) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.response?.data.message}`,
                        duration: 3000,
                    })
                } else if (error instanceof Error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.message}`,
                        duration: 3000,
                    })
                } else {
                    console.log(error)
                }
            }
            console.error(error)
        },
    })

    const updateAdminMutation = useMutation({
        mutationFn: async (adminUpdateData: UpdateDataInput) => {
            // Rest of your code
            if (user?.role !== 'super_admin') {
                throw new Error('Unauthorized')
            }
            return updateAdmin(adminUpdateData)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: 'Admin updated successfully',
                        duration: 3000,
                    })
                }
            })
        },
        onError: (error) => {
            if (toast) {
                if (error instanceof AxiosError) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.response?.data.message}`,
                        duration: 3000,
                    })
                } else if (error instanceof Error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.message}`,
                        duration: 3000,
                    })
                } else {
                    console.log(error)
                }
            }
            console.error(error)
        },
    })

    return (
        <AdminProviderContext.Provider
            value={{
                isLoading,
                data: data?.data || [],
                AdminsLength: data?.allRecords || 0,
                error,
                deActivateAdmin: deActivateAdminMutation,
                ActivateAdmin: ActivateAdminMutation,
                deleteAdmin: deleteAdminMutation,
                createAdmin: createAdminMutation,
                updateAdmin: updateAdminMutation,
                handleChangePassword: ChangePasswordMutation,
                setPage,
                setSize,
                setIsActive,
                page,
                size,
                isActive,
                // isChangePasswordOpen,
                // setIsChangePasswordOpen,
                // selectedAdmin,
                // setSelectedAdmin,
            }}
        >
            {children}
        </AdminProviderContext.Provider>
    )
}
