import {
    useMutation,
    UseMutationResult,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { Toast } from 'primereact/toast'
import { createContext, RefObject, useRef } from 'react'

type EndUsersProviderProps = {
    children: React.ReactNode
}

type EndUsersProviderState = {
    isLoading: boolean
    data: EndUser[]
    error: Error | null
    deleteEndUser: UseMutationResult<
        AxiosResponse<any, any>,
        Error,
        void,
        unknown
    >
    toast: RefObject<Toast>
}

interface EndUser {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    phoneNumber: string
    password: string
    roleId: number
    roleName: string
    isActive: boolean
}

export const EndUsersProviderContext = createContext<
    EndUsersProviderState | undefined
>(undefined)

export default function EndUsersProvider({ children }: EndUsersProviderProps) {
    // const [loading, setLoading] = useState<boolean>(true)
    const toast = useRef<Toast>(null)

    const { isLoading, data, error } = useQuery({
        queryKey: ['endUsers'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/endUsers')
            if (res.status !== 200)
                throw new Error('Something went wrong while fetching data')
            return res.data
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
            }}
        >
            {children}
        </EndUsersProviderContext.Provider>
    )
}
