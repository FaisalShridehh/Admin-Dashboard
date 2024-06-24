/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from '@/api/axios'
import {
    CreateOrderInput,
    UpdateOrderDataInput,
} from '@/types/models/OrdersTypes/OrdersTypes'
import { AxiosError, AxiosResponse } from 'axios'

export const fetchOrders = async (params: {
    page: number
    size: number
    isActive?: boolean
}): Promise<any> => {
    try {
        const res = await apiClient.get('admin/order/all', {
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

export const deleteOrder = async (id: number): Promise<AxiosResponse<any>> => {
    try {
        const res = await apiClient.delete(`admin/order/${id}`)
        // console.log('res from delete order', res)
        return res
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}
export const createOrder = async (
    orderData: CreateOrderInput
): Promise<AxiosResponse<any>> => {
    const body = orderData
    console.log('order data body => ', body)
    try {
        return await apiClient.post(`admin/order`, body)
    } catch (error) {
        handleError(error)
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}

export const updateOrder = async (
    OrderUpdateData: UpdateOrderDataInput,
    id: number | undefined
): Promise<AxiosResponse<any>> => {
    if (!id) {
        return Promise.reject(new Error('Invalid id'))
    }
    const body = OrderUpdateData
    try {
        return await apiClient.patch(`admin/order/${id}`, body)
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
