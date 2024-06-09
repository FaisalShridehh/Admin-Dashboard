import apiClient from '@/api/axios'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/hooks/useAuth'
import {
    Admin,
    AdminProviderProps,
    AdminProviderState,
    CreateAdminInput,
    PassDataInput,
} from '@/types/models/AdminTypes/AdminTypes'
import {
    activateAdmin,
    ChangeAdminPassword,
    createAdmin as createAdminAPI,
    deActivateAdmin,
    deleteAdmin,
    fetchAdmins,
} from '@/utils/adminApi'
import { getAuthToken } from '@/utils/apiAuth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createContext } from 'react'
import { useScopedSearchParams } from '@/hooks/useScopedSearchParams'

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

    const { isLoading, data, error } = useQuery<Admin[], Error>({
        queryKey: ['admins', page, size, isActive],
        queryFn: async () => {
            const token = getAuthToken()

            const params: {
                page: number
                size: number
                isActive?: boolean
            } = { page, size }
            if (isActive !== undefined) {
                params.isActive = isActive
            }
            return await fetchAdmins(params, token)
        },
        // StaleTime  can be adjusted based on your requirements
        staleTime: 300000, // 5 minutes
    })

    const { data: adminsData } = useQuery<Admin[], Error>({
        queryKey: ['allAdmins'],
        queryFn: async () => {
            const token = getAuthToken()

            try {
                const res = await apiClient.get(
                    'super-admin/admins/all-admins',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include the token in the header
                        },
                    }
                )
                if (res.status !== 200) {
                    throw new Error('Failed to fetch EndUser data')
                }
                // console.log(res.data.data)

                return res.data.data
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message)
                    return error.message
                }
            }
        },
        // StaleTime  can be adjusted based on your requirements
        staleTime: 300000, // 5 minutes
    })

    const queryClient = useQueryClient()

    const invalidateQueries = async () => {
        await queryClient.invalidateQueries({ queryKey: ['admins'] })
        await queryClient.invalidateQueries({ queryKey: ['allAdmins'] })
    }

    const deleteAdminMutation = useMutation({
        mutationFn: async (id: number) => {
            if (user?.role !== 'super_admin') {
                throw new Error('Unauthorized')
            }
            const token = getAuthToken()

            return await deleteAdmin(id, token)
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
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Something went wrong: ${error.message}`,
                    duration: 3000,
                })
            }
            console.log(error)
        },
    })

    const deActivateAdminMutation = useMutation({
        mutationFn: async (id: number) => {
            if (user?.role !== 'super_admin') {
                throw new Error('Unauthorized')
            }
            const token = getAuthToken()

            return await deActivateAdmin(id, token)
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
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Something went wrong: ${error.message}`,
                    duration: 3000,
                })
            }
            console.log(error)
        },
    })

    const ActivateAdminMutation = useMutation({
        mutationFn: async (id: number) => {
            if (user?.role !== 'super_admin') {
                throw new Error('Unauthorized')
            }
            const token = getAuthToken()

            return await activateAdmin(id, token)
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
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Something went wrong: ${error.message}`,
                    duration: 3000,
                })
            }
            console.log(error)
        },
    })

    const createAdminMutation = useMutation({
        mutationFn: async (adminData: CreateAdminInput) => {
            if (user?.role !== 'super_admin') {
                throw new Error('Unauthorized')
            }
            const token = getAuthToken()
            return createAdminAPI(adminData, token)
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
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Something went wrong: ${error.message}`,
                    duration: 3000,
                })
            }
            console.error(error)
        },
    })

    const ChangePasswordMutation = useMutation({
        mutationFn: async (adminPassData: PassDataInput) => {
            if (user?.role !== 'super_admin') {
                throw new Error('Unauthorized')
            }
            console.log(adminPassData)
            const token = getAuthToken()
            return ChangeAdminPassword(adminPassData, token)
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
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Something went wrong: ${error.message}`,
                    duration: 3000,
                })
            }
            console.error(error)
        },
    })

    return (
        <AdminProviderContext.Provider
            value={{
                isLoading,
                data,
                AdminsLength: adminsData?.length,
                error,
                deActivateAdmin: deActivateAdminMutation,
                ActivateAdmin: ActivateAdminMutation,
                deleteAdmin: deleteAdminMutation,
                createAdmin: createAdminMutation,
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
