import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { OrdersColumns } from '@/components/Columns/OrdersColumns/columns'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
const breadcrumbItems = [{ title: 'Orders', link: '/orders' }]

export default function Orders() {
    // const { data, isLoading, error } = useOrders()
    // const totalItems = data?.length || 0
    //
    // if (isLoading) return <LoadingSpinner />
    // if (error) return <AlertError message={error.message} />
    return (
        <div className="flex-[11] space-y-4  p-4  pt-6 text-text md:p-8">
            <BreadCrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between">
                <Heading
                    // title={`Financial Transactions (${totalItems})`}
                    description="Manage Financial Transactions."
                />

                {/* <Button className={cn(buttonVariants({ variant: 'default' }))}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button> */}
            </div>
            <Separator />

            <DataTable
                columns={OrdersColumns}
                // data ||
                data={[]}
                searchKey="orderStatus"
            />
        </div>
    )
}
