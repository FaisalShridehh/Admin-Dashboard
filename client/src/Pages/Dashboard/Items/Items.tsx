import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { ItemsColumns } from '@/components/Columns/ItemsColumns/columns'
import { AlertError } from '@/components/ErrorAlert/ErrorAlert'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
const breadcrumbItems = [{ title: 'Items', link: '/items' }]
export default function Items() {
    // const { data, isLoading, error } = useItems()
    // const totalItems = data?.length || 0
    //
    // if (isLoading) return <LoadingSpinner />
    // if (error) return <AlertError message={error.message} />
    return (
        <div className="flex-[11] space-y-4  p-4  pt-6 text-text md:p-8">
            <BreadCrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between">
                <Heading
                    // title={`Items (${totalItems})`}
                    description="Manage Items."
                />

                {/* <Button className={cn(buttonVariants({ variant: 'default' }))}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button> */}
            </div>
            <Separator />

            <DataTable
                columns={ItemsColumns}
                // data ||
                data={[]}
                searchKey="itemName"
            />
        </div>
    )
}
