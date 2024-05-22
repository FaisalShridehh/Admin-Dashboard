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
import { createContext, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const EndUsersProviderContext = createContext<
    EndUsersProviderState | undefined
>(undefined)

export default function EndUsersProvider({ children }: EndUsersProviderProps) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState<number>(
        Number(searchParams.get('page')) || 0
    )
    const [size, setSize] = useState<number>(
        Number(searchParams.get('size')) || 20
    )
    const [isActive, setIsActive] = useState<boolean | undefined>(
        searchParams.get('isActive') === 'true' ? true : undefined
    )

    // const [loading, setLoading] = useState<boolean>(true)
    const toast = useRef<Toast>(null)

    useEffect(() => {
        setSearchParams({
            page: String(page),
            size: String(size),
            //* When isActive is defined, add an entry to the searchParams object
            //* with the key "isActive" and the value of isActive as a string.
            //* For example, if isActive is true, this will add "isActive=true" to the
            //* URL search params.
            //* If isActive is undefined, this entry will not be added to the searchParams.
            ...(isActive !== undefined && { isActive: String(isActive) }),
        })
    }, [page, size, isActive, setSearchParams])

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
        // StaleTime  can be adjusted based on your requirements
        staleTime: 300000, // 5 minutes
    })

    const queryClient = useQueryClient()

    const invalidateQueries = async () =>
        await queryClient.invalidateQueries({ queryKey: ['endUsers'] })

    const deleteEndUserMutation = useMutation({
        mutationFn: async (id) => {
            // console.log(id)
            return await axios.delete(`http://localhost:3000/endUsers/${id}`)
        },
        onSuccess: (data) => {
            // console.log(data)
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
