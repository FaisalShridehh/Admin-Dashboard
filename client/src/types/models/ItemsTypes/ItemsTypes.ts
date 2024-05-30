export type ItemsProviderProps = {
    children: React.ReactNode
}

export type ItemsProviderState = {
    isLoading: boolean
    data: Items[] | undefined
    error: Error | null
}

export interface Items {
    id: number
    itemName: string
    price: number
}


type ItemResponse = Items[]

interface ApiResponse {
    data: ItemResponse
    code: number
    allRecords: number
    message: string
    success: boolean
}
