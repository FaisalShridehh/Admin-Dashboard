import apiClient from '@/api/axios'
import {
    useMutation,
    UseMutationResult,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { Toast } from 'primereact/toast'
import { createContext, RefObject, useRef } from 'react'

type AdminProviderProps = {
    children: React.ReactNode
}

type AdminProviderState = {
    isLoading: boolean
    data: EndUser[]
    error: Error | null
    deleteAdmin: UseMutationResult<
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

export const AdminProviderContext = createContext<
    AdminProviderState | undefined
>(undefined)

export default function AdminProvider({ children }: AdminProviderProps) {
    // const [loading, setLoading] = useState<boolean>(true)
    const toast = useRef<Toast>(null)

    const { isLoading, data, error } = useQuery({
        queryKey: ['admins'],
        queryFn: async () => {
            const res = await apiClient.get('super-admin/admins/all')
            console.log(res);
            if (res.status !== 200)
                throw new Error('Something went wrong while fetching data')
            return res.data
        },
        // StaleTime  can be adjusted based on your requirements
        staleTime: 300000, // 5 minutes
    })

    const queryClient = useQueryClient()

    const invalidateQueries = async () =>
        await queryClient.invalidateQueries({ queryKey: ['admins'] })

    const deleteAdminMutation = useMutation({
        mutationFn: async (id) =>
            await axios.delete(`http://localhost:3000/Admin/${id}`),
        onSuccess: (data) => {
            // console.log(data)
            invalidateQueries().then(() => {
                if (toast.current) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Admin deleted successfully ${data.data.username}`,
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
        <AdminProviderContext.Provider
            value={{
                isLoading,
                data,
                error,
                deleteAdmin: deleteAdminMutation,
                toast,
            }}
        >
            {children}
        </AdminProviderContext.Provider>
    )
}
