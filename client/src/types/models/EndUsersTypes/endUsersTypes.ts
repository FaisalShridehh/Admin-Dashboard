import { UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
export type EndUsersProviderProps = {
    children: React.ReactNode
}

export type EndUsersProviderState = {
    isLoading: boolean
    data: EndUser[] | undefined
    endUserLength: number | undefined
    error: Error | null
    activateEndUser: UseMutationResult<AxiosResponse, Error, number, unknown>
    deleteEndUser: UseMutationResult<AxiosResponse, Error, number, unknown>
    createEndUser: UseMutationResult<
        AxiosResponse,
        Error,
        CreateEndUserInput,
        unknown
    >
    // updateEndUser: UseMutationResult<AxiosResponse, Error, EndUser, unknown>
    // refetch: () => Promise<void>
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

export type CreateEndUserInput = {
    firstName: string
    lastName: string
    username: string
    email: string
    phoneNumber: string
    password: string
}
