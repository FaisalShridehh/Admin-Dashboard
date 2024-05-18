import { FinancialProviderContext } from '@/context/Financial-Transactions/FinancialContext'
import { useContext } from 'react'

export const useFinancial = () => {
    const context = useContext(FinancialProviderContext)

    if (context === undefined)
        throw new Error('useFinancial must be used within a FinancialProvider')

    return context
}
