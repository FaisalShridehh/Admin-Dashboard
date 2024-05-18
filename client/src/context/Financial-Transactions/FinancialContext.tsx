import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Toast } from 'primereact/toast'
import { createContext, RefObject, useRef } from 'react'

type FinancialProviderProps = {
    children: React.ReactNode
}

type FinancialProviderState = {
    isLoading: boolean
    data: EndUser[]
    error: Error | null
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

export const FinancialProviderContext = createContext<
    FinancialProviderState | undefined
>(undefined)

export default function FinancialProvider({
    children,
}: FinancialProviderProps) {
    // const [loading, setLoading] = useState<boolean>(true)
    const toast = useRef<Toast>(null)

    const { isLoading, data, error } = useQuery({
        queryKey: ['financials'],
        queryFn: async () => {
            const res = await axios.get(
                'http://localhost:3000/financialTransactions'
            )
            console.log(res.data)
            if (res.status !== 200)
                throw new Error('Something went wrong while fetching data')
            return res.data.data
        },
        // StaleTime  can be adjusted based on your requirements
        staleTime: 300000, // 5 minutes
    })

    return (
        <FinancialProviderContext.Provider
            value={{
                isLoading,
                data,
                error,
                toast,
            }}
        >
            {children}
        </FinancialProviderContext.Provider>
    )
}
