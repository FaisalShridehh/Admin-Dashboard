import { useToast } from '@/components/ui/use-toast'
import { useScopedSearchParams } from '@/hooks/useScopedSearchParams'
import {
    CreateOrderInput,
    OrdersProviderProps,
    OrdersProviderState,
    UpdateOrderDataInput,
} from '@/types/models/OrdersTypes/OrdersTypes'
import {
    createOrder,
    deleteOrder,
    fetchOrders,
    updateOrder,
} from '@/utils/ordersApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
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
    const deleteOrderMutation = useMutation({
        mutationFn: async (id: number) => {
            // console.log(id)
            return await deleteOrder(id)
        },
        onSuccess: () => {
            // console.log(data)
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: `Order deleted successfully`,
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

    const createOrderMutation = useMutation({
        mutationFn: async (OrderData: CreateOrderInput) => {
            return createOrder(OrderData)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: 'Order created successfully',
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

    const updateOrderMutation = useMutation({
        mutationFn: async ({
            OrderUpdateData,
            id,
        }: {
            OrderUpdateData: UpdateOrderDataInput
            id: number | undefined
        }) => {
            if (!id) {
                throw new Error('Order ID is required')
            }
            return updateOrder(OrderUpdateData, id)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: 'Order updated successfully',
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
                deleteOrder: deleteOrderMutation,
                createOrder: createOrderMutation,
                updateOrder: updateOrderMutation,
            }}
        >
            {children}
        </OrdersProviderContext.Provider>
    )
}
