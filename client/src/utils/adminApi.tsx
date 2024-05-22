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
    return res.data.data
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
// export const activateAdmin = async (
//     id: number,
//     token: string
// ): Promise<AxiosResponse<any>> => {
//     const res = await apiClient.patch(`super-admin/admins/${id}`, {
//         headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the header
//         },
//     })
//     return res
// }
