// import { UseMutationResult } from '@tanstack/react-query'
// import { AxiosResponse } from 'axios'
// import { RefObject } from 'react'

export type SupplierProviderProps = {
    children: React.ReactNode
}

export type SupplierProviderState = {
    isLoading: boolean
    data: Supplier[] | undefined
    suppliersLength: number | undefined

    error: Error | null
    setPage: React.Dispatch<React.SetStateAction<number>>
    setSize: React.Dispatch<React.SetStateAction<number>>
    setIsActive: React.Dispatch<React.SetStateAction<boolean | undefined>>
    page: number
    size: number
    isActive: boolean | undefined
    setSearchParams: SetURLSearchParams
}

export interface Supplier {
    id: number
    firstName: string
    lastName: string
    email: string
    userId: number
    roleId: number
    roleName: string
    phoneNumber: string
    username: string
    isActive: boolean
}

// export type CreateSupplierInput = {
//     firstName: string
//     lastName: string
//     username: string
//     email: string
//     phoneNumber: string
//     password: string
// }
