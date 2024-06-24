/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from '@/api/axios'
import {
    CreateItemInput,
    UpdateItemDataInput,
} from '@/types/models/ItemsTypes/ItemsTypes'
import { AxiosError, AxiosResponse } from 'axios'

export const fetchItems = async (params: {
    page: number
    size: number
    isActive?: boolean
}): Promise<any> => {
    try {
        const res = await apiClient.get('item/all', {
            params,
        })
        // console.log(res.data.data)
        if (res.status !== 200)
            throw new Error('Something went wrong while fetching data')
        console.log(res.data)
        return res.data.data
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const deleteItem = async (id: number): Promise<AxiosResponse<any>> => {
    try {
        const res = await apiClient.delete(`item/${id}`)
        // console.log('res from delete Item', res)
        return res
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}
export const createItem = async (
    ItemData: CreateItemInput
): Promise<AxiosResponse<any>> => {
    const body = ItemData
    console.log('Item data body => ', body)
    try {
        return await apiClient.post(`item`, body)
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const updateItem = async (
    itemUpdateData: UpdateItemDataInput,
    id: number | undefined
): Promise<AxiosResponse<any>> => {
    if (!id) {
        return Promise.reject(new Error('Invalid id'))
    }
    const body = itemUpdateData
    try {
        return await apiClient.patch(`item/${id}`, body)
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
