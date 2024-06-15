import { createContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/hooks/useAuth'

import {
    ApiResponse,
    Supplier,
    SupplierProviderProps,
    SupplierProviderState,
} from '@/types/models/SuppliersTypes/SuppliersTypes'

import { getAuthToken } from '@/utils/apiAuth'
import { fetchSuppliers } from '@/utils/suppliersApi'

import apiClient from '@/api/axios'
import { useScopedSearchParams } from '@/hooks/useScopedSearchParams'

export const SupplierProviderContext = createContext<
    SupplierProviderState | undefined
>(undefined)

export default function SupplierProvider({ children }: SupplierProviderProps) {
    const { user } = useAuth() // Access the current user
    const { toast } = useToast()

    const { page, setPage, size, setSize, isActive, setIsActive } =
        useScopedSearchParams(0, 20, undefined)

    const { isLoading, data, error } = useQuery<ApiResponse ,Error>(
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

    return (
        <SupplierProviderContext.Provider
            value={{
                isLoading,
                data: data?.data || [],
                suppliersLength: data?.allRecords || 0,
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
