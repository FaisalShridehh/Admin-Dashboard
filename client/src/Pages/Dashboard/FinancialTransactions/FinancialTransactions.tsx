import { useFinancial } from '@/hooks/useFinancial'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { AlertError } from '@/components/ErrorAlert/ErrorAlert'
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { Heading } from '@/components/ui/Heading'
import { Button, buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { FinancialTransactionsColumns } from '@/components/Columns/FinancialColumns/columns'
const breadcrumbItems = [
    { title: 'FinancialTransactions', link: '/financial-transactions' },
]

export default function FinancialTransactions() {
    const { data, isLoading, error } = useFinancial()
    const totalUsers = data?.length || 0

    if (isLoading) return <LoadingSpinner />
    if (error) return <AlertError message={error.message} />
    return (
        <div className="flex-[11] space-y-4  p-4  pt-6 text-text md:p-8">
            <BreadCrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between">
                <Heading
                    title={`Financial Transactions (${totalUsers})`}
                    description="Manage Financial Transactions."
                />

                <Button className={cn(buttonVariants({ variant: 'default' }))}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />

            <DataTable
                columns={FinancialTransactionsColumns}
                data={data || []}
                searchKey="paymentMethod"
            />
        </div>
    )
}
