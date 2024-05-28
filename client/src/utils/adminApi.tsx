// src/utils/api.ts
import apiClient from '@/api/axios'
import { Admin } from '@/types/models/AdminTypes/AdminTypes'
import { AxiosResponse } from 'axios'

export const fetchAdmins = async (
    params: { page: number; size: number; isActive?: boolean },
    token: string
): Promise<Admin[]> => {
    const res = await apiClient.get('super-admin/admins/all', {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
        },
        params,
    })
    // console.log(res.data.data)
    if (res.status !== 200)
        throw new Error('Something went wrong while fetching data')
    // console.log(res.data)
    return res.data.data
}

export const deleteAdmin = async (
    id: number,
    token: string
): Promise<AxiosResponse<any>> => {
    const res = await apiClient.delete(`super-admin/admins/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
        },
    })
    console.log('res from delete admin', res)
    return res
}
export const deActivateAdmin = async (
    id: number,
    token: string
): Promise<AxiosResponse<any>> => {
    const res = await apiClient.delete(`super-admin/admins/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
        },
    })
    return res
}
export const activateAdmin = async (
    id: number,
    token: string
): Promise<AxiosResponse<any>> => {
    const body = {
        adminId: id,
        isActive: true,
    }

    const res = await apiClient.put(`super-admin/admins/active`, body, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
        },
    })
    return res
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
    return await apiClient.post(`super-admin/admins`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
