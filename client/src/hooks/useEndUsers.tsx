import { EndUsersProviderContext } from '@/context/EndUsers/EndUsersContext'
import { useContext } from 'react'

export const useEndUsers = () => {
    const context = useContext(EndUsersProviderContext)

    if (context === undefined)
        throw new Error('useEndUsers must be used within a EndUsersProvider')

    return context
}
