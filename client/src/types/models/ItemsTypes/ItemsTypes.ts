/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export type ItemsProviderProps = {
    children: React.ReactNode
}

export type ItemsProviderState = {
    isLoading: boolean
    data: Item[] | undefined
    error: Error | null
    deleteItem: UseMutationResult<
        AxiosResponse<any, any>,
        Error,
        number,
        unknown
    >
    createItem: UseMutationResult<
        AxiosResponse<any, any>,
        Error,
        CreateItemInput,
        unknown
    >
    updateItem: UseMutationResult<
        AxiosResponse<any, any>,
        Error,
        {
            itemUpdateData: UpdateItemDataInput
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

export interface Item {
    id: number
    itemName: string
    price: number
}

export interface CreateItemInput {
    itemName: string
    price: number
}
export interface UpdateItemDataInput {
    itemName: string
    price: number
}

// type ItemResponse = Item[]
// interface ApiResponse {
//     data: ItemResponse
//     code: number
//     allRecords: number
//     message: string
//     success: boolean
// }
