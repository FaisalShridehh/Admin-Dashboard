import { OrdersProviderContext } from '@/context/Orders/OrderContext'
import { useContext } from 'react'

export const useOrders = () => {
    const context = useContext(OrdersProviderContext)

    if (context === undefined)
        throw new Error('useOrders must be used within a OrdersProvider')

    return context
}
