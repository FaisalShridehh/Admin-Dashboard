import { useToast } from '@/components/ui/use-toast'
import { useScopedSearchParams } from '@/hooks/useScopedSearchParams'
import {
    ApiResponse,
    CreateEndUserInput,
    // EndUser,
    EndUsersProviderProps,
    EndUsersProviderState,
    PassDataInput,
    UpdateDataInput,
} from '@/types/models/EndUsersTypes/endUsersTypes'
import {
    activateEndUser as activateEndUserApi,
    ChangeEndUserPassword,
    createEndUser,
    deActivateEndUser,
    deleteEndUser,
    fetchEndUsers,
    updateEndUser,
} from '@/utils/endUsersApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { createContext } from 'react'

export const EndUsersProviderContext = createContext<
    EndUsersProviderState | undefined
>(undefined)

export default function EndUsersProvider({ children }: EndUsersProviderProps) {
    const { toast } = useToast()
    const { page, setPage, size, setSize, isActive, setIsActive } =
        useScopedSearchParams(0, 20, undefined)

    const { isLoading, data, error } = useQuery<ApiResponse, Error>({
        queryKey: ['endUsers', page, size, isActive],
        queryFn: async () => {
            const params: {
                page: number
                size: number
                isActive?: boolean
            } = { page, size }
            if (isActive !== undefined) {
                params.isActive = isActive
            }
            return await fetchEndUsers(params)
        },
        // StaleTime  can be adjusted based on your requirements
        staleTime: 300000, // 5 minutes
    })

    const queryClient = useQueryClient()

    const invalidateQueries = async () => {
        await queryClient.invalidateQueries({ queryKey: ['endUsers'] })
    }


    const deleteEndUserMutation = useMutation({
        mutationFn: async (id: number) => {
            // console.log(id)
            return await deleteEndUser(id)
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
                if (error instanceof AxiosError) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.response?.data.message}`,
                        duration: 3000,
                    })
                } else if (error instanceof Error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.message}`,
                        duration: 3000,
                    })
                } else {
                    console.log(error)
                }
            }
            console.log(error)
        },
    })

    const createEndUserMutation = useMutation({
        mutationFn: async (EndUserData: CreateEndUserInput) => {
            return createEndUser(EndUserData)
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
                if (error instanceof AxiosError) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.response?.data.message}`,
                        duration: 3000,
                    })
                } else if (error instanceof Error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.message}`,
                        duration: 3000,
                    })
                } else {
                    console.log(error)
                }
            }
            console.error(error)
        },
    })

    const ActivateEndUserMutation = useMutation({
        mutationFn: async (id: number) => {
            return await activateEndUserApi(id)
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
                if (error instanceof AxiosError) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.response?.data.message}`,
                        duration: 3000,
                    })
                } else if (error instanceof Error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.message}`,
                        duration: 3000,
                    })
                } else {
                    console.log(error)
                }
            }
            console.log(error)
        },
    })

    const deActivateEndUserMutation = useMutation({
        mutationFn: async (id: number) => {
            return await deActivateEndUser(id)
        },
        onSuccess: () => {
            // console.log(data)
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'success',
                        description: `EndUser deactivated successfully`,
                        duration: 3000,
                    })
                }
            })
        },
        onError: (error) => {
            if (toast) {
                if (error instanceof AxiosError) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.response?.data.message}`,
                        duration: 3000,
                    })
                } else if (error instanceof Error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.message}`,
                        duration: 3000,
                    })
                } else {
                    console.log(error)
                }
            }
            console.log(error)
        },
    })

    const ChangePasswordMutation = useMutation({
        mutationFn: async (endUserPassData: PassDataInput) => {
            return ChangeEndUserPassword(endUserPassData)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: 'Password changed successfully',
                        duration: 3000,
                    })
                }
            })
        },
        onError: (error) => {
            if (toast) {
                if (error instanceof AxiosError) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.response?.data.message}`,
                        duration: 3000,
                    })
                } else if (error instanceof Error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.message}`,
                        duration: 3000,
                    })
                } else {
                    console.log(error)
                }
            }
            console.error(error)
        },
    })

    const updateEndUserMutation = useMutation({
        mutationFn: async (endUserUpdateData: UpdateDataInput) => {
            return updateEndUser(endUserUpdateData)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: 'EndUser updated successfully',
                        duration: 3000,
                    })
                }
            })
        },
        onError: (error) => {
            if (toast) {
                if (error instanceof AxiosError) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.response?.data.message}`,
                        duration: 3000,
                    })
                } else if (error instanceof Error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Something went wrong: ${error.message}`,
                        duration: 3000,
                    })
                } else {
                    console.log(error)
                }
            }
            console.error(error)
        },
    })
    return (
        <EndUsersProviderContext.Provider
            value={{
                isLoading,
                data: data?.data || [],
                endUserLength: data?.allRecords || 0,
                error,
                deleteEndUser: deleteEndUserMutation,
                createEndUser: createEndUserMutation,
                activateEndUser: ActivateEndUserMutation,
                deactivateEndUser: deActivateEndUserMutation,
                handleChangeEndUserPassword: ChangePasswordMutation,
                updateEndUser: updateEndUserMutation,
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
