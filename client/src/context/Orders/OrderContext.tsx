import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { useScopedSearchParams } from '@/hooks/useScopedSearchParams'
import {
    OrdersProviderProps,
    OrdersProviderState,
} from '@/types/models/OrdersTypes/OrdersTypes'
import { getAuthToken } from '@/utils/apiAuth'
import { fetchOrders } from '@/utils/ordersApi'
import { useQuery } from '@tanstack/react-query'
import { createContext} from 'react'

export const OrdersProviderContext = createContext<
    OrdersProviderState | undefined
>(undefined)

export default function OrdersProvider({ children }: OrdersProviderProps) {
    const { user } = useAuth() // Access the current user
    const { toast } = useToast()

    const { page, setPage, size, setSize, isActive, setIsActive } =
        useScopedSearchParams(0, 20, undefined)

    const { isLoading, data, error } = useQuery({
        queryKey: ['orders', page, size, isActive],
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
            return await fetchOrders(params, token)
        },
        // StaleTime  can be adjusted based on your requirements
        staleTime: 300000, // 5 minutes
    })

    return (
        <OrdersProviderContext.Provider
            value={{
                isLoading,
                data,
                error,
            }}
        >
            {children}
        </OrdersProviderContext.Provider>
    )
}
