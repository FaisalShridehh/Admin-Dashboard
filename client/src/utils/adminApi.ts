// src/utils/api.ts
import apiClient from '@/api/axios'
import { Admin, PassDataInput } from '@/types/models/AdminTypes/AdminTypes'
import { AxiosResponse } from 'axios'

export const fetchAdmins = async (
    params: { page: number; size: number; isActive?: boolean },
    token: string
): Promise<Admin[]> => {
    try {
        const res = await apiClient.get('super-admin/admins/all', {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the header
            },
            params,
        })
        // console.log(res.data.data)
        if (res.status !== 200)
            throw new Error('Something went wrong while fetching data')
        console.log('admins => ', res.data.data)
        return res.data.data
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        } else {
            console.log('An unknown error occurred', error)
        }
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const deleteAdmin = async (
    id: number,
    token: string
): Promise<AxiosResponse<any>> => {
    try {
        const res = await apiClient.delete(`super-admin/admins/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the header
            },
        })
        console.log('res from delete admin', res)
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
export const deActivateAdmin = async (
    id: number,
    token: string
): Promise<AxiosResponse<any>> => {
    try {
        const res = await apiClient.delete(`super-admin/admins/${id}`, {
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
export const activateAdmin = async (
    id: number,
    token: string
): Promise<AxiosResponse<any>> => {
    const body = {
        adminId: id,
        isActive: true,
    }

    try {
        const res = await apiClient.put(`super-admin/admins/active`, body, {
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

export const createAdmin = async (
    adminData: {
        firstName: string
        lastName: string
        username: string
        email: string
        phoneNumber: string
        password: string
    },
    token: string
): Promise<AxiosResponse<any>> => {
    const body = { ...adminData, roleId: 2 }
    try {
        return await apiClient.post(`super-admin/admins`, body, {
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
export const ChangeAdminPassword = async (
    adminPassData: PassDataInput,
    token: string
): Promise<AxiosResponse<any>> => {
    const body = { ...adminPassData }
    try {
        return await apiClient.put(`super-admin/admins/password`, body, {
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
