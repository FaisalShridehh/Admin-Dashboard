import { UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { Toast } from 'primereact/toast'
import { RefObject } from 'react'

export type EndUsersProviderProps = {
    children: React.ReactNode
}

export type EndUsersProviderState = {
    isLoading: boolean
    data: EndUser[] | undefined
    error: Error | null
    deleteEndUser: UseMutationResult<
        AxiosResponse,
        Error,
        void,
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

export interface EndUser {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    phoneNumber: string
    password: string
    roleId: number
    roleName: string
    isActive: boolean
}
