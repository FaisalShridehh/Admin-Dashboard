import {
    EndUser,
    EndUsersProviderProps,
    EndUsersProviderState,
} from '@/types/models/EndUsersTypes/endUsersTypes'
import { getAuthToken } from '@/utils/apiAuth'
import { fetchEndUsers } from '@/utils/endUsersApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Toast } from 'primereact/toast'
import { createContext, useRef, useState } from 'react'

export const EndUsersProviderContext = createContext<
    EndUsersProviderState | undefined
>(undefined)

export default function EndUsersProvider({ children }: EndUsersProviderProps) {
    const [page, setPage] = useState<number>(0)
    const [size, setSize] = useState<number>(20)
    const [isActive, setIsActive] = useState<boolean | undefined>(undefined)

    const toast = useRef<Toast>(null)

    const { isLoading, data, error } = useQuery<EndUser[], Error>({
        queryKey: ['endUsers', page, size, isActive],
        queryFn: async () => {
            const token = getAuthToken()

            const params = { page, size }
            if (isActive !== undefined) {
                params.isActive = isActive
            }
            return await fetchEndUsers(params, token)
        },
        staleTime: 300000, // 5 minutes
    })

    const queryClient = useQueryClient()

    const invalidateQueries = async () =>
        await queryClient.invalidateQueries({ queryKey: ['endUsers'] })

    const deleteEndUserMutation = useMutation({
        mutationFn: async (id) => {
            return await axios.delete(`http://localhost:3000/endUsers/${id}`)
        },
        onSuccess: (data) => {
            invalidateQueries().then(() => {
                if (toast.current) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: `User deleted successfully ${data.data.username}`,
                        life: 3000,
                    })
                }
            })
        },
        onError: (error) => {
            if (toast.current) {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Something went wrong ${error.message}`,
                    life: 3000,
                })
            }
            console.log(error)
        },
    })

    return (
        <EndUsersProviderContext.Provider
            value={{
                isLoading,
                data,
                error,
                deleteEndUser: deleteEndUserMutation,
                toast,
                setPage,
                setSize,
                setIsActive,
                page,
                size,
                isActive,
            }}
        >
            {children}
        </EndUsersProviderContext.Provider>
    )
}
