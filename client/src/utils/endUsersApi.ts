// src/utils/api.ts
import apiClient from '@/api/axios'
import { EndUser } from '@/types/models/EndUsersTypes/endUsersTypes'
import { AxiosResponse } from 'axios'

export const fetchEndUsers = async (
    params: { page: number; size: number; isActive?: boolean },
    token: string
): Promise<EndUser[]> => {
    const res = await apiClient.get('admin/user/all', {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
        },
        params,
    })
    // console.log(res.data.data)
    if (res.status !== 200)
        throw new Error('Something went wrong while fetching data')

    console.log(res.data)
    return res.data.data
}

export const createEndUser = async (
    EndUserData: {
        firstName: string
        lastName: string
        username: string
        email: string
        phoneNumber: string
        password: string
    },
    token: string
): Promise<AxiosResponse<any>> => {
    const body = { ...EndUserData, roleId: 4 }
    try {
        return await apiClient.post(`admin/user`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        } else {
            console.log('An unknown error occurred', error)
        }
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const deleteEndUser = async (
    id: number,
    token: string
): Promise<AxiosResponse<any>> => {
    try {
        const res = await apiClient.delete(`admin/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the header
            },
        })
        console.log('res from delete EndUser', res)
        return res
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        } else {
            console.log('An unknown error occurred', error)
        }
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const deActivateEndUser = async (
    id: number,
    token: string
): Promise<AxiosResponse<any>> => {
    const res = await apiClient.delete(`admin/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
        },
    })
    return res
}
export const activateEndUser = async (
    id: number,
    token: string
): Promise<AxiosResponse<any>> => {
    const body = {
        endUserId: id,
        isActive: true,
    }
    try {
        const res = await apiClient.patch(`admin/user/active`, body, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the header
            },
        })
        return res
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        } else {
            console.log('An unknown error occurred', error)
        }
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}
