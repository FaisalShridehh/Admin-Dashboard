import { createContext, useState } from 'react'

type AppProviderProps = {
    children: React.ReactNode
}

type AppProviderState = {
    isMinimized: boolean
    toggleSidebar: () => void
}

export const AppProviderContext = createContext<AppProviderState | undefined>(
    undefined
)

export default function AppProvider({ children }: AppProviderProps) {
    const [isMinimized, setIsMinimized] = useState<boolean>(false)

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized)
    }
    return (
        <AppProviderContext.Provider
            value={{
                isMinimized,
                toggleSidebar,
            }}
        >
            {children}
        </AppProviderContext.Provider>
    )
}
