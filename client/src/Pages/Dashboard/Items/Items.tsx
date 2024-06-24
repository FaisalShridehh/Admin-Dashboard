import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { getItemsColumns } from '@/components/Columns/ItemsColumns/columns'
import CreateItem from '@/components/CreateItem/CreateItem'
import { AlertError } from '@/components/ErrorAlert/ErrorAlert'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import UpdateItem from '@/components/UpdateItem/UpdateItem'
import { useItems } from '@/hooks/useItems'
import { Item } from '@/types/models/ItemsTypes/ItemsTypes'
import { useCallback, useMemo, useState } from 'react'
const breadcrumbItems = [{ title: 'Items', link: '/items' }]
export default function Items() {
    const { data, isLoading, error, setPage, setSize, page, size } = useItems()
    const totalItems = data?.length || 0
    const pageCount = Math.ceil(totalItems / size)

    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)

    const onEdit = useCallback(
        (items: Item) => {
            if (selectedItem) setSelectedItem(null)

            setSelectedItem(items)
            setIsUpdateFormOpen(true)
        },
        [selectedItem, setIsUpdateFormOpen]
    )

    const ItemsColumns = useMemo(() => getItemsColumns({ onEdit }), [onEdit])

    if (isLoading) return <LoadingSpinner />
    if (error) return <AlertError message={error.message} />
    return (
        <div className="flex-[11] space-y-4  p-4  pt-6 text-text md:p-8">
            <BreadCrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between">
                <Heading
                    title={`Items (${totalItems})`}
                    description="Manage Items."
                />

                <CreateItem />
                <UpdateItem
                    item={selectedItem}
                    isUpdateFormOpen={isUpdateFormOpen}
                    setIsUpdateFormOpen={setIsUpdateFormOpen}
                    setSelectedItem={setSelectedItem}
                />
            </div>
            <Separator />

            <DataTable
                columns={ItemsColumns}
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
