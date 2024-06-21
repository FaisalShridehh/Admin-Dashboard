import { useState } from 'react'

export function useAdmin_Financial_Form() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false)

    return {
        isSubmitting,
        setIsSubmitting,
        isUpdateFormOpen,
        setIsUpdateFormOpen,
    }
}
