/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export type OrdersProviderProps = {
    children: React.ReactNode
}

export type OrdersProviderState = {
    isLoading: boolean
    data: Order[] | undefined
    error: Error | null
    deleteOrder: UseMutationResult<
        AxiosResponse<any, any>,
        Error,
        number,
        unknown
    >
    createOrder: UseMutationResult<
        AxiosResponse<any, any>,
        Error,
        CreateOrderInput,
        unknown
    >
    updateOrder: UseMutationResult<
        AxiosResponse<any, any>,
        Error,
        {
            OrderUpdateData: UpdateOrderDataInput
            id: number | undefined
        },
        unknown
    >
    setPage: React.Dispatch<React.SetStateAction<number>>
    setSize: React.Dispatch<React.SetStateAction<number>>
    setIsActive: React.Dispatch<React.SetStateAction<boolean | undefined>>
    page: number
    size: number
    isActive: boolean | undefined
}

export interface CreateOrderInput {
    items: Item[]
    paymentMethod: string
}

export interface Item {
    itemName: string
    quantity: number
}

export interface UpdateOrderDataInput {
    orderStatus: 'NEW' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'
    totalAmount: number
    supplierId: number
    items: string[]
    paymentMethod: string
}

type OrderItem = string

export interface Order {
    id: number
    totalAmount: number
    userId: number
    items: OrderItem[]
    paymentMethod: string
}

// interface ApiResponse {
//     data: Order[]
//     code: number
//     message: string
//     success: boolean
// }
