import { AppProviderContext } from '@/context/AppContext'
import { useContext } from 'react'

export const useApp = () => {
    const context = useContext(AppProviderContext)

    if (context === undefined)
        throw new Error('useApp must be used within a AppProvider')

    return context
}
