export type OrdersProviderProps = {
    children: React.ReactNode
}

export type OrdersProviderState = {
    isLoading: boolean
    data: Orders[] | undefined
    error: Error | null

    setPage: React.Dispatch<React.SetStateAction<number>>
    setSize: React.Dispatch<React.SetStateAction<number>>
    setIsActive: React.Dispatch<React.SetStateAction<boolean | undefined>>
    page: number
    size: number
    isActive: boolean | undefined
}

type OrderItem = string

export interface Order {
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
