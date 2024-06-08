import { useApp } from '@/hooks/useApp'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar/Navbar'

export default function Dashboard() {
    const { isMinimized } = useApp()

    return (
        <section
            className={`dashboard ${isMinimized ? 'flex-[10.5] md:flex-[11]' : 'flex-[10]'} relative  overflow-hidden font-poppins `}
        >
            <Navbar />
            <Outlet />
        </section>
    )
}
