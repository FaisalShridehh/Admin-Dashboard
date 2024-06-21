import { useToast } from '@/components/ui/use-toast'
import { useScopedSearchParams } from '@/hooks/useScopedSearchParams'
import {
    CreateFinancialInput,
    FinancialProviderProps,
    FinancialProviderState,
    UpdateDataInput,
} from '@/types/models/Financial/Financial'
import {
    createFinancial,
    deleteFinancial,
    fetchFinancial,
    updateFinancial,
} from '@/utils/financialApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { createContext } from 'react'

export const FinancialProviderContext = createContext<
    FinancialProviderState | undefined
>(undefined)

export default function FinancialProvider({
    children,
}: FinancialProviderProps) {
    const { toast } = useToast()
    const { page, setPage, size, setSize, isActive, setIsActive } =
        useScopedSearchParams(0, 20, undefined)

    const { isLoading, data, error } = useQuery({
        queryKey: ['financial'],
        queryFn: async () => {
            const params: {
                page: number
                size: number
                isActive?: boolean
            } = { page, size }
            if (isActive !== undefined) {
                params.isActive = isActive
            }
            return await fetchFinancial(params)
        },
        // StaleTime  can be adjusted based on your requirements
        staleTime: 300000, // 5 minutes
    })
    const queryClient = useQueryClient()

    const invalidateQueries = async () => {
        await queryClient.invalidateQueries({ queryKey: ['financial'] })
    }
    const deleteFinancialMutation = useMutation({
        mutationFn: async (id: number) => {
            // console.log(id)
            return await deleteFinancial(id)
        },
        onSuccess: () => {
            // console.log(data)
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: `Financial deleted successfully`,
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

    const createFinancialMutation = useMutation({
        mutationFn: async (FinancialData: CreateFinancialInput) => {
            return createFinancial(FinancialData)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: 'Financial created successfully',
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

    const updateFinancialMutation = useMutation({
        mutationFn: async ({
            FinancialUpdateData,
            id,
        }: {
            FinancialUpdateData: UpdateDataInput
            id: number | undefined
        }) => {
            if (!id) {
                throw new Error('Financial ID is required')
            }
            return updateFinancial(FinancialUpdateData, id)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: 'Financial updated successfully',
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
        <FinancialProviderContext.Provider
            value={{
                isLoading,
                data,
                error,
                setPage,
                setSize,
                setIsActive,
                page,
                size,
                isActive,
                deleteFinancialTransaction: deleteFinancialMutation,
                createFinancialTransaction: createFinancialMutation,
                updateFinancialTransaction: updateFinancialMutation,
            }}
        >
            {children}
        </FinancialProviderContext.Provider>
    )
}
