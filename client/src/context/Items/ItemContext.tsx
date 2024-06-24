import { useToast } from '@/components/ui/use-toast'
import { useScopedSearchParams } from '@/hooks/useScopedSearchParams'
import {
    CreateItemInput,
    ItemsProviderProps,
    ItemsProviderState,
    UpdateItemDataInput,
} from '@/types/models/ItemsTypes/ItemsTypes'
import {
    createItem,
    deleteItem,
    fetchItems,
    updateItem,
} from '@/utils/itemsApi'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { createContext } from 'react'

export const ItemsProviderContext = createContext<
    ItemsProviderState | undefined
>(undefined)

export default function ItemsProvider({ children }: ItemsProviderProps) {
    const { toast } = useToast()
    const { page, setPage, size, setSize, isActive, setIsActive } =
        useScopedSearchParams(0, 20, undefined)

    const { isLoading, data, error } = useQuery({
        queryKey: ['items', page, size, isActive],
        queryFn: async () => {
            const params: {
                page: number
                size: number
                isActive?: boolean
            } = { page, size }
            if (isActive !== undefined) {
                params.isActive = isActive
            }
            return await fetchItems(params)
        },
        // StaleTime  can be adjusted based on your requirements
        staleTime: 300000, // 5 minutes
    })

    const queryClient = useQueryClient()

    const invalidateQueries = async () => {
        await queryClient.invalidateQueries({ queryKey: ['items'] })
    }

    const deleteItemMutation = useMutation({
        mutationFn: async (id: number) => {
            // console.log(id)
            return await deleteItem(id)
        },
        onSuccess: () => {
            // console.log(data)
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: `Item deleted successfully`,
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

    const createItemMutation = useMutation({
        mutationFn: async (ItemData: CreateItemInput) => {
            return createItem(ItemData)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: 'Item created successfully',
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

    const updateItemMutation = useMutation({
        mutationFn: async ({
            itemUpdateData,
            id,
        }: {
            itemUpdateData: UpdateItemDataInput
            id: number | undefined
        }) => {
            if (!id) {
                throw new Error('Item ID is required')
            }
            return updateItem(itemUpdateData, id)
        },
        onSuccess: () => {
            invalidateQueries().then(() => {
                if (toast) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: 'Item updated successfully',
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
        <ItemsProviderContext.Provider
            value={{
                isLoading,
                data,
                error,
                setPage,
                setSize,
                setIsActive,
                page,
                size,
                isActive,
                deleteItem: deleteItemMutation,
                createItem: createItemMutation,
                updateItem: updateItemMutation,
            }}
        >
            {children}
        </ItemsProviderContext.Provider>
    )
}
