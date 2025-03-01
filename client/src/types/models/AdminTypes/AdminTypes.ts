/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
export type AdminProviderProps = {
    children: React.ReactNode
}

export type AdminProviderState = {
    isLoading: boolean
    data: Admin[] | undefined
    AdminsLength: number | undefined
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
    handleChangePassword: UseMutationResult<
        AxiosResponse,
        Error,
        PassDataInput,
        unknown
    >
    updateAdmin: UseMutationResult<
        AxiosResponse<any, any>,
        Error,
        UpdateDataInput,
        unknown
    >

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
    username: string
    phoneNumber: string
}

export type CreateAdminInput = {
    firstName: string
    lastName: string
    username: string
    email: string
    phoneNumber: string
    password: string
}
export type PassDataInput = {
    adminId: number
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

export interface ApiResponse {
    allRecords: number
    code: number
    data: Admin[]
    message: string
    success: boolean
}
