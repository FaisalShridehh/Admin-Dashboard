import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { FinancialProviderProps, FinancialProviderState } from '@/types/models/Financial/Financial'
import { getAuthToken } from '@/utils/apiAuth'
import { fetchFinancial } from '@/utils/financialApi'
import { useQuery } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'



export const FinancialProviderContext = createContext<
    FinancialProviderState | undefined
>(undefined)

export default function FinancialProvider({
    children,
}: FinancialProviderProps) {
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
    const { toast } = useToast()

    // const [loading, setLoading] = useState<boolean>(true)

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

    const { isLoading, data, error } = useQuery({
        queryKey: ['financial'],
        queryFn: async () => {
            const token = getAuthToken()

            const params = { page, size }
            if (isActive !== undefined) {
                params.isActive = isActive
            }
            return await fetchFinancial(params, token)
        },
        // StaleTime  can be adjusted based on your requirements
        staleTime: 300000, // 5 minutes
    })

    return (
        <FinancialProviderContext.Provider
            value={{
                isLoading,
                data,
                error,
            }}
        >
            {children}
        </FinancialProviderContext.Provider>
    )
}
