import { useToast } from '@/components/ui/use-toast'
import { useScopedSearchParams } from '@/hooks/useScopedSearchParams'
import {
    OrdersProviderProps,
    OrdersProviderState,
} from '@/types/models/OrdersTypes/OrdersTypes'
import { fetchOrders } from '@/utils/ordersApi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext } from 'react'

export const OrdersProviderContext = createContext<
    OrdersProviderState | undefined
>(undefined)

export default function OrdersProvider({ children }: OrdersProviderProps) {
    const { toast } = useToast()
    const { page, setPage, size, setSize, isActive, setIsActive } =
        useScopedSearchParams(0, 20, undefined)

    const { isLoading, data, error } = useQuery({
        queryKey: ['orders', page, size, isActive],
        queryFn: async () => {
            const params: {
                page: number
                size: number
                isActive?: boolean
            } = { page, size }
            if (isActive !== undefined) {
                params.isActive = isActive
            }
            return await fetchOrders(params)
        },
        // StaleTime  can be adjusted based on your requirements
        staleTime: 300000, // 5 minutes
    })

    const queryClient = useQueryClient()

    const invalidateQueries = async () => {
        await queryClient.invalidateQueries({ queryKey: ['orders'] })
    }

    return (
        <OrdersProviderContext.Provider
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
            }}
        >
            {children}
        </OrdersProviderContext.Provider>
    )
}
