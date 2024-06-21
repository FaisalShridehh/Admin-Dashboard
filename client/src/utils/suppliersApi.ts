/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from '@/api/axios'
import {
    ApiResponse,
    PassDataInput,
    UpdateDataInput,
} from '@/types/models/SuppliersTypes/SuppliersTypes'
import { AxiosError, AxiosResponse } from 'axios'

export const fetchSuppliers = async (params: {
    page: number
    size: number
    isActive?: boolean
}): Promise<ApiResponse> => {
    try {
        const res = await apiClient.get<ApiResponse>('admin/supplier/all', {
            params,
        })
        // console.log(res.data.data)
        if (res.status !== 200)
            throw new Error('Something went wrong while fetching data')
        // console.log(res.data)
        return res.data
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const deleteSupplier = async (
    id: number
): Promise<AxiosResponse<any>> => {
    try {
        const res = await apiClient.delete(`admin/supplier/${id}`)
        // console.log('res from delete Supplier', res)
        return res
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}
export const deActivateSupplier = async (
    id: number
): Promise<AxiosResponse<any>> => {
    try {
        const res = await apiClient.delete(`admin/supplier/${id}`)
        return res
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}
export const activateSupplier = async (
    id: number
): Promise<AxiosResponse<any>> => {
    const body = {
        supplierId: id,
        isActive: true,
    }

    try {
        const res = await apiClient.put(`admin/supplier/active`, body)
        return res
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const createSupplier = async (SupplierData: {
    firstName: string
    lastName: string
    username: string
    email: string
    phoneNumber: string
    password: string
}): Promise<AxiosResponse<any>> => {
    const body = { ...SupplierData, roleId: 2 }
    try {
        return await apiClient.post(`admin/supplier`, body)
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const ChangeSupplierPassword = async (
    SupplierPassData: PassDataInput
): Promise<AxiosResponse<any>> => {
    const body = { ...SupplierPassData }
    try {
        return await apiClient.put(`admin/supplier/password`, body)
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const updateSupplier = async (
    SupplierUpdateData: UpdateDataInput
): Promise<AxiosResponse<any>> => {
    const { id, ...rest } = SupplierUpdateData
    const body = { ...rest }
    try {
        return await apiClient.patch(`admin/supplier/${id}`, body)
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
