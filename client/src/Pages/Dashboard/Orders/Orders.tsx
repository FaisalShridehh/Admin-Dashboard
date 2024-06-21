import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { getOrdersColumns } from '@/components/Columns/OrdersColumns/columns'
import { AlertError } from '@/components/ErrorAlert/ErrorAlert'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import { useOrders } from '@/hooks/useOrders'
import { Order } from '@/types/models/OrdersTypes/OrdersTypes'
import { useCallback, useMemo, useState } from 'react'
const breadcrumbItems = [{ title: 'Orders', link: '/orders' }]

export default function Orders() {
    const { data, isLoading, error, setPage, setSize, page, size } = useOrders()
    const totalOrders = data?.length || 0
    const pageCount = Math.ceil(totalOrders / size)

    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    const onEdit = useCallback(
        (orders: Order) => {
            if (selectedOrder) setSelectedOrder(null)

            setSelectedOrder(orders)
            setIsUpdateFormOpen(true)
        },
        [selectedOrder, setIsUpdateFormOpen]
    )

    const OrdersColumns = useMemo(() => getOrdersColumns({ onEdit }), [onEdit])

    if (isLoading) return <LoadingSpinner />
    if (error) return <AlertError message={error.message} />
    return (
        <div className="flex-[11] space-y-4  p-4  pt-6 text-text md:p-8">
            <BreadCrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between">
                <Heading
                    title={`Orders (${totalOrders})`}
                    description="Manage Orders."
                />

                {/* <Button className={cn(buttonVariants({ variant: 'default' }))}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button> */}
            </div>
            <Separator />

            <DataTable
                columns={OrdersColumns}
                data={data || []}
                searchKey="id"
                pageCount={pageCount}
                page={page}
                size={size}
                onPageChange={setPage}
                onSizeChange={setSize}
            />
        </div>
    )
}
