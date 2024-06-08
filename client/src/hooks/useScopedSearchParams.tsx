import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useScopedSearchParams = (
    initialPage: number = 0,
    initialSize: number = 20,
    initialIsActive: boolean | undefined = undefined
) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(initialPage)
    const [size, setSize] = useState(initialSize)
    const [isActive, setIsActive] = useState(
        searchParams.get('isActive') === 'true' ? true : initialIsActive
    )

    useEffect(() => {
        const newSearchParams = {
            page: String(page),
            size: String(size),
        }

        if (isActive !== undefined) {
            newSearchParams.isActive = String(isActive)
        }

        setSearchParams(newSearchParams)

        return () => {
            searchParams.delete('page')
            searchParams.delete('size')

            setSearchParams(searchParams)
        }
    }, [page, size, isActive, setSearchParams, searchParams])

    return { page, setPage, size, setSize, isActive, setIsActive }
}
