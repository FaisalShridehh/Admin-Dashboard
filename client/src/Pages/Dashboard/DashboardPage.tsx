import AsideBar from '@/components/AsideBar/AsideBar'
import Dashboard from '@/components/Dashboard/Dashboard'

export default function DashboardPage() {
    return (
        <div className="wrapper-container h-screen w-screen overflow-x-hidden bg-background">
            <main className="main-container flex flex-col md:flex-row">
                <AsideBar />
                <Dashboard />
            </main>
        </div>
    )
}
