import { UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { RefObject } from 'react'
import { Toast } from 'primereact/toast'

export type AdminProviderProps = {
    children: React.ReactNode
}

export type AdminProviderState = {
    isLoading: boolean
    data: Admin[] | undefined
    error: Error | null
    deActivateAdmin: UseMutationResult<AxiosResponse, Error, number, unknown>
    ActivateAdmin: UseMutationResult<AxiosResponse, Error, number, unknown>
    deleteAdmin: UseMutationResult<AxiosResponse, Error, number, unknown>
    createAdmin: UseMutationResult<
        AxiosResponse,
        Error,
        CreateAdminInput,
        unknown
    >
    toast: RefObject<Toast>
    setPage: React.Dispatch<React.SetStateAction<number>>
    setSize: React.Dispatch<React.SetStateAction<number>>
    setIsActive: React.Dispatch<React.SetStateAction<boolean | undefined>>
    page: number
    size: number
    isActive: boolean | undefined
}

export interface Admin {
    id: number
    firstName: string
    lastName: string
    email: string
    userId: number
    roleId: number
    roleName: string
    isActive: boolean
}

export type CreateAdminInput = {
    firstName: string
    lastName: string
    username: string
    email: string
    phoneNumber: string
    password: string
}
