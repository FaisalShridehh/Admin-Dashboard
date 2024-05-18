import { AdminProviderContext } from '@/context/Admins/AdminContext'
import { useContext } from 'react'

export const useAdmins = () => {
    const context = useContext(AdminProviderContext)

    if (context === undefined)
        throw new Error('useAdmins must be used within a AdminProvider')

    return context
}
