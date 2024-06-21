/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from '@/api/axios'
import {
    CreateFinancialInput,
    UpdateDataInput,
} from '@/types/models/Financial/Financial'
import { AxiosError, AxiosResponse } from 'axios'

export const fetchFinancial = async (params: {
    page: number
    size: number
    isActive?: boolean
}): Promise<any> => {
    try {
        const res = await apiClient.get('financial/transaction/all', {
            params,
        })
        console.log(res.data.data)
        if (res.status !== 200)
            throw new Error('Something went wrong while fetching data')
        console.log(res.data)
        return res.data.data
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const deleteFinancial = async (
    id: number
): Promise<AxiosResponse<any>> => {
    try {
        const res = await apiClient.delete(`financial/transaction/${id}`)
        // console.log('res from delete admin', res)
        return res
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}
export const createFinancial = async (
    financialData: CreateFinancialInput
): Promise<AxiosResponse<any>> => {
    const body = financialData
    try {
        return await apiClient.post(`financial/transaction`, body)
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const updateFinancial = async (
    financialUpdateData: UpdateDataInput,
    id: number | undefined
): Promise<AxiosResponse<any>> => {
    if (!id) {
        return Promise.reject(new Error('Invalid id'))
    }
    const body = financialUpdateData
    try {
        return await apiClient.patch(`financial/transaction/${id}`, body)
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
