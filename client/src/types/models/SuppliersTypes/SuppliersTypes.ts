/* eslint-disable @typescript-eslint/no-explicit-any */
// import { UseMutationResult } from '@tanstack/react-query'
// import { AxiosResponse } from 'axios'
// import { RefObject } from 'react'

import { UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export type SupplierProviderProps = {
    children: React.ReactNode
}

export type SupplierProviderState = {
    isLoading: boolean
    data: Supplier[] | undefined
    suppliersLength: number | undefined
    deleteSupplier: UseMutationResult<AxiosResponse, Error, number, unknown>
    createSupplier: UseMutationResult<
        AxiosResponse,
        Error,
        CreateSupplierInput,
        unknown
    >
    activateSupplier: UseMutationResult<AxiosResponse, Error, number, unknown>
    deactivateSupplier: UseMutationResult<
        AxiosResponse<any, any>,
        Error,
        number,
        unknown
    >
    handleChangeSupplierPassword: UseMutationResult<
        AxiosResponse,
        Error,
        PassDataInput,
        unknown
    >
    updateSupplier: UseMutationResult<
        AxiosResponse<any, any>,
        Error,
        UpdateDataInput,
        unknown
    >
    error: Error | null
    setPage: React.Dispatch<React.SetStateAction<number>>
    setSize: React.Dispatch<React.SetStateAction<number>>
    setIsActive: React.Dispatch<React.SetStateAction<boolean | undefined>>
    page: number
    size: number
    isActive: boolean | undefined
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

export interface ApiResponse {
    allRecords: number
    code: number
    data: Supplier[]
    message: string
    success: boolean
}
export type CreateSupplierInput = {
    firstName: string
    lastName: string
    username: string
    email: string
    phoneNumber: string
    password: string
}

export type PassDataInput = {
    endUserId: number
    oldPassword: string
    newPassword: string
    confirmPassword: string
}
export type UpdateDataInput = {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    phoneNumber: string
    roleId: number
}
