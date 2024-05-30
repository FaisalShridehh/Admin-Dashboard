// import { UseMutationResult } from '@tanstack/react-query'
// import { AxiosResponse } from 'axios'
// import { RefObject } from 'react'
// import { Toast } from 'primereact/toast'

export type FinancialProviderProps = {
    children: React.ReactNode
}

export type FinancialProviderState = {
    isLoading: boolean
    data: Supplier[] | undefined
    error: Error | null
}

export interface Financial {
    id: number
    statement: string
    amount: number
    date: string
    paymentType: string
    comment: string
    type: string
    orderId: number
}

