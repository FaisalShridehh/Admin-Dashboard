import { createContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'

import {
    ApiResponse,
    CreateSupplierInput,
    PassDataInput,
    SupplierProviderProps,
    SupplierProviderState,
    UpdateDataInput,
} from '@/types/models/SuppliersTypes/SuppliersTypes'

import { activateSupplier, ChangeSupplierPassword, createSupplier, deActivateSupplier, deleteSupplier, fetchSuppliers, updateSupplier } from '@/utils/suppliersApi'

import { useScopedSearchParams } from '@/hooks/useScopedSearchParams'
import { AxiosError } from 'axios'

export const SupplierProviderContext = createContext<
    SupplierProviderState | undefined
>(undefined)

export default function SupplierProvider({ children }: SupplierProviderProps) {
    const { toast } = useToast()

    const { page, setPage, size, setSize, isActive, setIsActive } =
        useScopedSearchParams(0, 20, undefined)

    const { isLoading, data, error } = useQuery<ApiResponse, Error>(
        // <Supplier[], Error>
        {
            queryKey: ['suppliers', page, size, isActive],
            queryFn: async () => {
                const params: {
                    page: number
                    size: number
                    isActive?: boolean
                } = { page, size }
                if (isActive !== undefined) {
                    params.isActive = isActive
                }
                return await fetchSuppliers(params)
            },
            // StaleTime  can be adjusted based on your requirements
            staleTime: 300000, // 5 minutes
        }
    )

    const queryClient = useQueryClient()

    const invalidateQueries = async () => {
        await queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    }

    const deleteSupplierMutation = useMutation({
        mutationFn: async (id: number) => {
            // console.log(id)
            return await deleteSupplier(id)
        },
        onSuccess: () => {
            // console.log(data)
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: `Supplier deleted successfully`,
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

    const createSupplierMutation = useMutation({
        mutationFn: async (SupplierData: CreateSupplierInput) => {
            return createSupplier(SupplierData)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: 'Supplier created successfully',
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

    const ActivateSupplierMutation = useMutation({
        mutationFn: async (id: number) => {
            return await activateSupplier(id)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: `Supplier activated successfully`,
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

    const deActivateSupplierMutation = useMutation({
        mutationFn: async (id: number) => {
            return await deActivateSupplier(id)
        },
        onSuccess: () => {
            // console.log(data)
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'success',
                        description: `Supplier deactivated successfully`,
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

    const ChangePasswordMutation = useMutation({
        mutationFn: async (SupplierPassData: PassDataInput) => {
            return ChangeSupplierPassword(SupplierPassData)
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

    const updateSupplierMutation = useMutation({
        mutationFn: async (SupplierUpdateData: UpdateDataInput) => {
            return updateSupplier(SupplierUpdateData)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: 'Supplier updated successfully',
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
        <SupplierProviderContext.Provider
            value={{
                isLoading,
                data: data?.data || [],
                suppliersLength: data?.allRecords || 0,
                deleteSupplier: deleteSupplierMutation,
                createSupplier: createSupplierMutation,
                activateSupplier: ActivateSupplierMutation,
                deactivateSupplier: deActivateSupplierMutation,
                handleChangeSupplierPassword: ChangePasswordMutation,
                updateSupplier: updateSupplierMutation,
                page,
                setPage,
                size,
                setSize,
                isActive,
                setIsActive,
                error,
            }}
        >
            {children}
        </SupplierProviderContext.Provider>
    )
}
