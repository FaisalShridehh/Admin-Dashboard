import { useEndUsers } from '@/hooks/useEndUsers'
import BreadCrumb from '../BreadCrumb/BreadCrumb'
import { EndUserTable } from '../EndUserTable/EndUserTable'
import { Link } from 'react-router-dom'
import { Separator } from '../ui/separator'
import { Plus } from 'lucide-react'
import { Heading } from '../Heading/Heading'
import { columns } from '../EndUserTable/Columns'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { AlertError } from '../ErrorAlert/ErrorAlert'
const breadcrumbItems = [{ title: 'User', link: '/dashboard/user' }]

export default function EndUsers() {
    const {
        data,
        page,
        size,
        isActive,
        setPage,
        setSize,
        setIsActive,
        isLoading,
        error,
    } = useEndUsers()
    const totalUsers = data?.length || 0
    const pageCount = Math.ceil(totalUsers / size)

    if (isLoading) return <LoadingSpinner />
    if (error) return <AlertError message={error.message} />

    return (
        <>
            <div className="h-[calc(100vh-75px)] flex-1 space-y-4 bg-background p-4 pt-6 text-text md:p-8">
                <BreadCrumb items={breadcrumbItems} />

                <div className="flex items-start justify-between">
                    <Heading
                        title={`End Users (${totalUsers})`}
                        description="End Users Table with detailed information about end users."
                    />

                    <Link to={'/dashboard/employee/new'}>
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Link>
                </div>
                <Separator />

                <EndUserTable
                    columns={columns}
                    searchKey="email"
                    pageNo={page}
                    // totalUsers={totalUsers}
                    data={data || []}
                    pageCount={pageCount}
                />
            </div>
        </>
    )
}
