export type OrdersProviderProps = {
    children: React.ReactNode
}

export type OrdersProviderState = {
    isLoading: boolean
    data: Orders[] | undefined
    error: Error | null
}

type OrderItem = string

export interface Orders {
    id: number
    totalAmount: number
    endUserId: number
    items: OrderItem[]
    paymentMethod: string
}

interface ApiResponse {
    data: Orders[]
    code: number
    message: string
    success: boolean
}


