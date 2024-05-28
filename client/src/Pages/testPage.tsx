import AsideBar from '@/components/AsideBar/AsideBar'
import DashboardNav from '@/components/DashboardNav/DashboardNav'
import { columns } from '@/components/Test/columns'
import { Button, buttonVariants } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'

const breadcrumbItems = [{ title: 'Test', link: '/test' }]

export default function TestPage() {
    const [users, setUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState([])

    useEffect(() => {
        async function getUsers(): Promise<void> {
            try {
                const res = await axios.get(
                    'https://665533a63c1d3b6029388aa5.mockapi.io/api/v1/test/users'
                )
                if (res.status !== 200) {
                    throw new Error('Failed to fetch data')
                }
                // console.log(res.data)
                setUsers(res.data)
                setTotalUsers(res.data.length)
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message)
                }
            }
        }
        getUsers()
    }, [])
    return (
        <div className="wrapper-container h-screen w-screen overflow-x-hidden bg-background">
            <main className="main-container flex flex-col md:flex-row">
                <AsideBar />
                <section
                    // ${isMinimized ? 'flex-[10.5] md:flex-[11]' : 'flex-[10]'}
                    className={`dashboard  flex-[10] font-poppins  `}
                >
                    <DashboardNav />
                    <div className="flex-1  space-y-4  p-4  pt-6 text-text md:p-8">
                        <BreadCrumb items={breadcrumbItems} />

                        <div className="flex items-start justify-between">
                            <Heading
                                title={`Test Users (${totalUsers})`}
                                description="Manage Test Users."
                            />

                            <Button
                                className={cn(
                                    buttonVariants({ variant: 'default' })
                                )}
                            >
                                <Plus className="mr-2 h-4 w-4" /> Add New
                            </Button>
                        </div>
                        <Separator  />

                        <DataTable columns={columns} data={users} />
                    </div>
                </section>
            </main>
        </div>
    )
}
