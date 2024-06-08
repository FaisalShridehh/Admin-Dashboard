import { OrdersProviderContext } from '@/context/Orders/OrderContext'
import { useContext } from 'react'

export const useItems = () => {
    const context = useContext(OrdersProviderContext)

    if (context === undefined)
        throw new Error('useItems must be used within a ItemsProvider')

    return context
}
