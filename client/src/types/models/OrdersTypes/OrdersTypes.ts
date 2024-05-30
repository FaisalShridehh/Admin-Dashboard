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
    orderStatus: string
    totalAmount: number
    deliveredAt: string // ISO 8601 date string
    supplierId: number
    endUserId: number
    items: OrderItem[]
    paymentMethod: string
}

interface ApiResponse {
    data: Orders[]
    code: number
    allRecords: number
    message: string
    success: boolean
}
