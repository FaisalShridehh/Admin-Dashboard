import { AppProviderContext } from '@/context/AppContext'
import { useContext } from 'react'

export const usePage = () => {
    const context = useContext(AppProviderContext)

    if (context === undefined)
        throw new Error('usePage must be used within a PageProvider')

    return context
}
