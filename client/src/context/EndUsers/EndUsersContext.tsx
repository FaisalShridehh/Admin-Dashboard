import apiClient from '@/api/axios'
import { useToast } from '@/components/ui/use-toast'
import { useScopedSearchParams } from '@/hooks/useScopedSearchParams'
import {
    CreateEndUserInput,
    EndUser,
    EndUsersProviderProps,
    EndUsersProviderState,
} from '@/types/models/EndUsersTypes/endUsersTypes'
import { getAuthToken } from '@/utils/apiAuth'
import {
    activateEndUser as activateEndUserApi,
    createEndUser,
    deleteEndUser,
    fetchEndUsers,
} from '@/utils/endUsersApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext } from 'react'

export const EndUsersProviderContext = createContext<
    EndUsersProviderState | undefined
>(undefined)

export default function EndUsersProvider({ children }: EndUsersProviderProps) {
    const { toast } = useToast()
    const { page, setPage, size, setSize, isActive, setIsActive } =
        useScopedSearchParams(0, 20, undefined)

    const { isLoading, data, error } = useQuery<EndUser[], Error>({
        queryKey: ['endUsers', page, size, isActive],
        queryFn: async () => {
            const token = getAuthToken()

            const params: {
                page: number
                size: number
                isActive?: boolean
            } = { page, size }
            if (isActive !== undefined) {
                params.isActive = isActive
            }
            return await fetchEndUsers(params, token)
        },
        // StaleTime  can be adjusted based on your requirements
        staleTime: 300000, // 5 minutes
    })

    const { data: endUserData } = useQuery<EndUser[], Error>({
        queryKey: ['allEndUsers'],
        queryFn: async () => {
            const token = getAuthToken()

            try {
                const res = await apiClient.get('admin/user/all-EndUsers', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the header
                    },
                })
                if (res.status !== 200) {
                    throw new Error('Failed to fetch EndUser data')
                }
                // console.log(res.data.data)

                return res.data.data
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message)
                    return error.message
                }
            }
        },
        // StaleTime  can be adjusted based on your requirements
        staleTime: 300000, // 5 minutes
    })

    const queryClient = useQueryClient()

    const invalidateQueries = async () => {
        await queryClient.invalidateQueries({ queryKey: ['endUsers'] })
        await queryClient.invalidateQueries({ queryKey: ['allEndUsers'] })
    }

    // await queryClient.invalidateQueries({
    //     queryKey: ['endUsers', 'allEndUsers'],
    // })

    const deleteEndUserMutation = useMutation({
        mutationFn: async (id: number) => {
            const token = getAuthToken()

            // console.log(id)
            return await deleteEndUser(id, token)
        },
        onSuccess: () => {
            // console.log(data)
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: `User deleted successfully`,
                        duration: 3000,
                    })
                }
            })
        },
        onError: (error) => {
            if (toast) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Something went wrong ${error.message}`,
                    duration: 3000,
                })
            }
            console.log(error)
        },
    })

    const createEndUserMutation = useMutation({
        mutationFn: async (EndUserData: CreateEndUserInput) => {
            const token = getAuthToken()
            return createEndUser(EndUserData, token)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: 'EndUser created successfully',
                        duration: 3000,
                    })
                }
            })
        },
        onError: (error) => {
            if (toast) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Something went wrong: ${error.message}`,
                    duration: 3000,
                })
            }
            console.error(error)
        },
    })

    const ActivateEndUserMutation = useMutation({
        mutationFn: async (id: number) => {
            const token = getAuthToken()

            return await activateEndUserApi(id, token)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: `EndUser activated successfully`,
                        duration: 3000,
                    })
                }
            })
        },
        onError: (error) => {
            if (toast) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Something went wrong: ${error.message}`,
                    duration: 3000,
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
                endUserLength: endUserData?.length,
                error,
                deleteEndUser: deleteEndUserMutation,
                createEndUser: createEndUserMutation,
                activateEndUser: ActivateEndUserMutation,
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
