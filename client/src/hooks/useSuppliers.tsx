import { SupplierProviderContext } from '@/context/Suppliers/SuppliersContext'
import { useContext } from 'react'

export const useSuppliers = () => {
    const context = useContext(SupplierProviderContext)

    if (context === undefined)
        throw new Error('useSuppliers must be used within a SupplierProvider')

    return context
}
