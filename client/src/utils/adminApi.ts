// src/utils/api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from '@/api/axios'
import {
    // Admin,
    ApiResponse,
    PassDataInput,
    UpdateDataInput,
} from '@/types/models/AdminTypes/AdminTypes'
import { AxiosError, AxiosResponse } from 'axios'

export const fetchAdmins = async (params: {
    page: number
    size: number
    isActive?: boolean
}): Promise<ApiResponse> => {
    try {
        const res = await apiClient.get<ApiResponse>('super-admin/admins/all', {
            params,
        })
        // console.log(res.data)
        if (res.status !== 200)
            throw new Error('Something went wrong while fetching data')
        // console.log('admins => ', res.data)
        return res.data
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrow to be handled by the caller
    }
}

export const deleteAdmin = async (id: number): Promise<AxiosResponse<any>> => {
    try {
        const res = await apiClient.delete(
            `super-admin/admins/delete/${id}`,
        )
        // console.log('res from delete admin', res)
        return res
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}
export const deActivateAdmin = async (
    id: number
): Promise<AxiosResponse<any>> => {
    try {
        const res = await apiClient.delete(`super-admin/admins/${id}`)
        return res
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}
export const activateAdmin = async (
    id: number
): Promise<AxiosResponse<any>> => {
    const body = {
        adminId: id,
        isActive: true,
    }

    try {
        const res = await apiClient.put(`super-admin/admins/active`, body)
        return res
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const createAdmin = async (adminData: {
    firstName: string
    lastName: string
    username: string
    email: string
    phoneNumber: string
    password: string
}): Promise<AxiosResponse<any>> => {
    const body = { ...adminData, roleId: 2 }
    try {
        return await apiClient.post(`super-admin/admins`, body)
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const ChangeAdminPassword = async (
    adminPassData: PassDataInput
): Promise<AxiosResponse<any>> => {
    const body = { ...adminPassData }
    try {
        return await apiClient.put(`super-admin/admins/password`, body)
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const updateAdmin = async (
    adminUpdateData: UpdateDataInput
): Promise<AxiosResponse<any>> => {
    const { id, ...rest } = adminUpdateData
    const body = { ...rest }
    try {
        return await apiClient.patch(`super-admin/admins/${id}`, body)
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}
const handleError = (error: any) => {
    if (error instanceof AxiosError) {
        console.error('AxiosError => ', error.response?.data.message)
    } else if (error instanceof Error) {
        console.error(error.message)
    } else {
        console.error('An unknown error occurred', error)
    }
}
