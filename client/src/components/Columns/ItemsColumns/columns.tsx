import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { Item } from '@/types/models/ItemsTypes/ItemsTypes'
import { ItemActionButtons } from '@/components/Actions/ItemActionButtons/ItemActionButtons'
interface ItemColumnsProps {
    onEdit: (item: Item) => void
}
export const getItemsColumns = ({ onEdit }: ItemColumnsProps) => {
    const ItemsColumns: ColumnDef<Item>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
            size: 50,
        },
        {
            accessorKey: 'id',
            header: () => <div className="">Id</div>,
            size: 200,
        },
        {
            accessorKey: 'itemName',
            header: () => <div className="">Item Name</div>,
            size: 300,
        },
        {
            accessorKey: 'price',
            header: () => <div className="">Price</div>,
            size: 300,
        },

        {
            id: 'actions',
            header: () => <div className="">Actions</div>,
            cell: ({ row }) => (
                <ItemActionButtons data={row.original} onEdit={onEdit} />
            ),
            size: 300,
        },
    ]
    return ItemsColumns
}
