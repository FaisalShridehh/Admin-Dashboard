/* eslint-disable @typescript-eslint/no-explicit-any */
// import { UseMutationResult } from '@tanstack/react-query'
// import { AxiosResponse } from 'axios'
// import { RefObject } from 'react'

import { UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export type FinancialProviderProps = {
    children: React.ReactNode
}

export type FinancialProviderState = {
    isLoading: boolean
    data: Financial[] | undefined
    error: Error | null
    setPage: React.Dispatch<React.SetStateAction<number>>
    setSize: React.Dispatch<React.SetStateAction<number>>
    setIsActive: React.Dispatch<React.SetStateAction<boolean | undefined>>
    page: number
    size: number
    isActive: boolean | undefined

    deleteFinancialTransaction: UseMutationResult<
        AxiosResponse<any, any>,
        Error,
        number,
        unknown
    >
    createFinancialTransaction: UseMutationResult<
        AxiosResponse<any, any>,
        Error,
        CreateFinancialInput,
        unknown
    >
    updateFinancialTransaction: UseMutationResult<
        AxiosResponse<any, any>,
        Error,
        {
            FinancialUpdateData: UpdateDataInput
            id: number | undefined
        },
        unknown
    >
}

export interface Financial {
    id: number
    statement: string
    amount: number
    date: Date
    paymentType: 'كاش'
    comment: string
    paymentMethod: 'Income' | 'Outcome'
    orderId: number
}

export interface CreateFinancialInput {
    statement: string
    amount: number
    date: Date
    paymentType: string
    comment: string
    type: string
    orderId: number
}
export interface UpdateDataInput {
    statement: string
    amount: number
    date: Date
    paymentType: string
    comment: string
    type: string
    orderId: number
}
