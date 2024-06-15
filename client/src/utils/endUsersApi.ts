// src/utils/api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import apiClient from '@/api/axios'
import {
    ApiResponse,
    PassDataInput,
    UpdateDataInput,
    // EndUser,
} from '@/types/models/EndUsersTypes/endUsersTypes'
import { AxiosError, AxiosResponse } from 'axios'

export const fetchEndUsers = async (params: {
    page: number
    size: number
    isActive?: boolean
}): Promise<ApiResponse> => {
    try {
        const res = await apiClient.get<ApiResponse>('admin/user/all', {
            params,
        })
        // console.log(res.data.data)
        if (res.status !== 200)
            throw new Error('Something went wrong while fetching data')

        return res.data
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const createEndUser = async (EndUserData: {
    firstName: string
    lastName: string
    username: string
    email: string
    phoneNumber: string
    password: string
}): Promise<AxiosResponse<any>> => {
    const body = { ...EndUserData, roleId: 4 }
    try {
        return await apiClient.post(`admin/user`, body, {})
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const deleteEndUser = async (
    id: number
): Promise<AxiosResponse<any>> => {
    try {
        const res = await apiClient.delete(`admin/user/${id}`, {})
        // console.log('res from delete EndUser', res)
        return res
    } catch (error) {
        handleError(error)

        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const deActivateEndUser = async (
    id: number
): Promise<AxiosResponse<any>> => {
    try {
        const res = await apiClient.delete(`admin/user/${id}`, {})
        return res
    } catch (error) {
        handleError(error)

        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const activateEndUser = async (
    id: number
): Promise<AxiosResponse<any>> => {
    const body = {
        endUserId: id,
        isActive: true,
    }
    try {
        const res = await apiClient.patch(`admin/user/active`, body, {})
        // console.log('res from activate EndUser', res)
        return res
    } catch (error) {
        handleError(error)

        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const ChangeEndUserPassword = async (
    endUserPassData: PassDataInput
): Promise<AxiosResponse<any>> => {
    const { endUserId, ...rest } = endUserPassData
    const body = { ...rest }

    try {
        return await apiClient.put(`admin/user/password/${endUserId}`, body)
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const updateEndUser = async (
    endUserUpdateData: UpdateDataInput
): Promise<AxiosResponse<any>> => {
    const { id, ...rest } = endUserUpdateData
    const body = { ...rest }
    try {
        return await apiClient.patch(`admin/user/${id}`, body)
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
