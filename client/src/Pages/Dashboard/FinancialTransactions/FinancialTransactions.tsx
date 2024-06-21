import { useFinancial } from '@/hooks/useFinancial'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { AlertError } from '@/components/ErrorAlert/ErrorAlert'
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { getFinancialColumns } from '@/components/Columns/FinancialColumns/columns'
import CreateNewFinancial from '@/components/CreateFinancial/CreateFinancial'
import { useCallback, useMemo, useState } from 'react'
import { Financial } from '@/types/models/Financial/Financial'
import UpdateFinancial from '@/components/UpdateFinancial/UpdateFinancial'
const breadcrumbItems = [
    { title: 'FinancialTransactions', link: '/financial-transactions' },
]

export default function FinancialTransactions() {
    const { data, isLoading, error, setPage, setSize, page, size } =
        useFinancial()
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false)
    const [selectedFinancial, setSelectedFinancial] =
        useState<Financial | null>(null)

    const totalData = data?.length || 0
    const pageCount = Math.ceil(totalData / size)

    const onEdit = useCallback(
        (financial: Financial) => {
            if (selectedFinancial) setSelectedFinancial(null)

            setSelectedFinancial(financial)
            setIsUpdateFormOpen(true)
        },
        [selectedFinancial, setIsUpdateFormOpen]
    )

    const FinancialTransactionsColumns = useMemo(
        () => getFinancialColumns({ onEdit }),
        [onEdit]
    )

    if (isLoading) return <LoadingSpinner />
    if (error) return <AlertError message={error.message} />
    return (
        <div className="flex-[11] space-y-4  p-4  pt-6 text-text md:p-8">
            <BreadCrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between">
                <Heading
                    title={`Financial Transactions (${totalData})`}
                    description="Manage Financial Transactions."
                />

                <CreateNewFinancial />
                <UpdateFinancial
                    financial={selectedFinancial}
                    isUpdateFormOpen={isUpdateFormOpen}
                    setIsUpdateFormOpen={setIsUpdateFormOpen}
                    setSelectedFinancial={setSelectedFinancial}
                />
            </div>
            <Separator />

            <DataTable
                columns={FinancialTransactionsColumns}
                data={data || []}
                searchKey="paymentMethod"
                pageCount={pageCount}
                page={page}
                size={size}
                onPageChange={setPage}
                onSizeChange={setSize}
            />
        </div>
    )
}
