import { useAuth } from '@/hooks/useAuth'
import {
    Admin,
    AdminProviderProps,
    AdminProviderState,
    CreateAdminInput,
} from '@/types/models/AdminTypes/AdminTypes'
import {
    activateAdmin,
    createAdmin as createAdminAPI,
    deActivateAdmin,
    deleteAdmin,
    fetchAdmins,
} from '@/utils/adminApi'
import { getAuthToken } from '@/utils/apiAuth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Toast } from 'primereact/toast'
import { createContext, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const AdminProviderContext = createContext<
    AdminProviderState | undefined
>(undefined)

export default function AdminProvider({ children }: AdminProviderProps) {
    const { user } = useAuth() // Access the current user

    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState<number>(
        () => Number(searchParams.get('page')) || 0
    )
    const [size, setSize] = useState<number>(
        () => Number(searchParams.get('size')) || 20
    )
    const [isActive, setIsActive] = useState<boolean | undefined>(
        searchParams.get('isActive') === 'true' ? true : undefined
    )

    // const [loading, setLoading] = useState<boolean>(true)
    const toast = useRef<Toast>(null)

    useEffect(() => {
        setSearchParams({
            page: String(page),
            size: String(size),
            //* When isActive is defined, add an entry to the searchParams object
            //* with the key "isActive" and the value of isActive as a string.
            //* For example, if isActive is true, this will add "isActive=true" to the
            //* URL search params.
            //* If isActive is undefined, this entry will not be added to the searchParams.
            ...(isActive !== undefined && { isActive: String(isActive) }),
        })
    }, [page, size, isActive, setSearchParams])

    const { isLoading, data, error } = useQuery<Admin[], Error>({
        queryKey: ['admins', page, size, isActive],
        queryFn: async () => {
            const token = getAuthToken()

            const params = { page, size }
            if (isActive !== undefined) {
                params.isActive = isActive
            }
            return await fetchAdmins(params, token)
        },
        // StaleTime  can be adjusted based on your requirements
        staleTime: 300000, // 5 minutes
    })

    const queryClient = useQueryClient()

    const invalidateQueries = async () =>
        await queryClient.invalidateQueries({ queryKey: ['admins'] })

    const deleteAdminMutation = useMutation({
        mutationFn: async (id: number) => {
            if (user?.role !== 'super_admin') {
                throw new Error('Unauthorized')
            }
            const token = getAuthToken()

            return await deleteAdmin(id, token)
        },
        onSuccess: (data) => {
            // console.log(data)
            invalidateQueries().then(() => {
                if (toast.current) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Admin deleted successfully`,
                        life: 3000,
                    })
                }
            })
        },
        onError: (error) => {
            if (toast.current) {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Something went wrong: ${error.message}`,
                    life: 3000,
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
        onSuccess: (data) => {
            // console.log(data)
            invalidateQueries().then(() => {
                if (toast.current) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Admin deactivated successfully`,
                        life: 3000,
                    })
                }
            })
        },
        onError: (error) => {
            if (toast.current) {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Something went wrong: ${error.message}`,
                    life: 3000,
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
        onSuccess: (data) => {
            invalidateQueries().then(() => {
                if (toast.current) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Admin activated successfully`,
                        life: 3000,
                    })
                }
            })
        },
        onError: (error) => {
            if (toast.current) {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Something went wrong: ${error.message}`,
                    life: 3000,
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
                toast.current?.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Admin created successfully',
                    life: 3000,
                })
            })
        },
        onError: (error) => {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: `Something went wrong: ${error.message}`,
                life: 3000,
            })
            console.error(error)
        },
    })

    return (
        <AdminProviderContext.Provider
            value={{
                isLoading,
                data,
                error,
                deActivateAdmin: deActivateAdminMutation,
                ActivateAdmin: ActivateAdminMutation,
                deleteAdmin: deleteAdminMutation,
                createAdmin: createAdminMutation,
                toast,
                setPage,
                setSize,
                setIsActive,
                page,
                size,
                isActive,
            }}
        >
            {children}
        </AdminProviderContext.Provider>
    )
}
