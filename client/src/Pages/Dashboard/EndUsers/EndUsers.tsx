import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import EndUserTable from '../../../components/Tabels/EndUsers/EndUserTable/EndUserTable'
import { AlertError } from '@/components/ErrorAlert/ErrorAlert'
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { Heading } from '@/components/ui/Heading'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { EndUsersColumns } from '@/components/Columns/EndUsersColumns/columns'
import { useEndUsers } from '@/hooks/useEndUsers'
const breadcrumbItems = [{ title: 'EndUsers', link: '/EndUsers' }]

export default function EndUsers() {
    const { data, isLoading, error } = useEndUsers()
    const totalUsers = data?.length || 0

    if (isLoading) return <LoadingSpinner />
    if (error) return <AlertError message={error.message} />
    return (
        <div className="flex-[11] space-y-4  p-4  pt-6 text-text md:p-8">
            <BreadCrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between">
                <Heading
                    title={`Test Users (${totalUsers})`}
                    description="Manage Test Users."
                />

                <Button className={cn(buttonVariants({ variant: 'default' }))}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />

            <DataTable
                columns={EndUsersColumns}
                data={data || []}
                searchKey="email"
            />
        </div>
    )
}
