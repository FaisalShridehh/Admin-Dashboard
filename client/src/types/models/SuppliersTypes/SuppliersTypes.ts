// import { UseMutationResult } from '@tanstack/react-query'
// import { AxiosResponse } from 'axios'
// import { RefObject } from 'react'
// import { Toast } from 'primereact/toast'

export type SupplierProviderProps = {
    children: React.ReactNode
}

export type SupplierProviderState = {
    isLoading: boolean
    data: Supplier[] | undefined
    error: Error | null
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
