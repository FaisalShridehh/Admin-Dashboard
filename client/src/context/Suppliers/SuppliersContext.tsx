import { createContext, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/hooks/useAuth'

import {
    Supplier,
    SupplierProviderProps,
    SupplierProviderState,
} from '@/types/models/SuppliersTypes/SuppliersTypes'

import { getAuthToken } from '@/utils/apiAuth'
import { fetchSuppliers } from '@/utils/suppliersApi'

import { useSearchParams } from 'react-router-dom'
import apiClient from '@/api/axios'

export const SupplierProviderContext = createContext<
    SupplierProviderState | undefined
>(undefined)

export default function SupplierProvider({ children }: SupplierProviderProps) {
    const { user } = useAuth() // Access the current user
    const { toast } = useToast()

    const [searchParams, setSearchParams] = useSearchParams()

    const [page, setPage] = useState<number>(
        Number(searchParams.get('page')) || 0
    )
    const [size, setSize] = useState<number>(
        Number(searchParams.get('size')) || 20
    )
    const [isActive, setIsActive] = useState<boolean | undefined>(
        searchParams.get('isActive') === 'true' ? true : undefined
    )

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

    const { isLoading, data, error } = useQuery<Supplier[], Error>(
        // <Supplier[], Error>
        {
            queryKey: ['suppliers', page, size, isActive],
            queryFn: async () => {
                const token = getAuthToken()

                const params = { page, size }
                if (isActive !== undefined) {
                    params.isActive = isActive
                }
                return await fetchSuppliers(params, token)
            },
            // StaleTime  can be adjusted based on your requirements
            staleTime: 300000, // 5 minutes
        }
    )

    const { data: suppliersData } = useQuery<Supplier[], Error>({
        queryKey: ['allSuppliers'],
        queryFn: async () => {
            const token = getAuthToken()

            try {
                const res = await apiClient.get(
                    'admin/supplier/all-suppliers',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include the token in the header
                        },
                    }
                )
                if (res.status !== 200) {
                    throw new Error('Failed to fetch EndUser data')
                }
                console.log(res.data.data)

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
        await queryClient.invalidateQueries({ queryKey: ['suppliers'] })
        await queryClient.invalidateQueries({ queryKey: ['allSuppliers'] })
    }

    return (
        <SupplierProviderContext.Provider
            value={{
                isLoading,
                data,
                suppliersLength: suppliersData?.length,
                page,
                setPage,
                size,
                setSize,
                isActive,
                setIsActive,
                error,
                setSearchParams,
            }}
        >
            {children}
        </SupplierProviderContext.Provider>
    )
}
