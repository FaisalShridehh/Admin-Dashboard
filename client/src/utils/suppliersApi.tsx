import apiClient from '@/api/axios'

export const fetchSuppliers = async (
    params: { page: number; size: number; isActive?: boolean },
    token: string
): Promise<any> => {
    try {
        const res = await apiClient.get('admin/supplier/all', {
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
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        } else {
            console.log('An unknown error occurred', error)
        }
        throw error // Ensure the error is rethrown to be handled by the caller
    }
}
