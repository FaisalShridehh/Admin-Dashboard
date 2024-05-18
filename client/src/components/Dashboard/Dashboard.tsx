import { usePage } from '@/hooks/useApp'
import { Outlet } from 'react-router-dom'

import DashboardNav from '../DashboardNav/DashboardNav'

export default function Dashboard() {
    const { isMinimized } = usePage()

    return (
        <section
            className={`dashboard ${isMinimized ? 'flex-[10.5] md:flex-[11]' : 'flex-[10]'} font-poppins  `}
        >
            <DashboardNav />
            <Outlet />
        </section>
    )
}
