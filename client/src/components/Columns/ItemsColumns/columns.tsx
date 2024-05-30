import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { Items } from '@/types/models/ItemsTypes/ItemsTypes'

export const ItemsColumns: ColumnDef<Items>[] = [
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
    },
    {
        accessorKey: 'id',
        header: () => <div className="">Id</div>,
    },
    {
        accessorKey: 'itemName',
        header: () => <div className="">Item Name</div>,
    },
    {
        accessorKey: 'price',
        header: () => <div className="">Price</div>,
    },
   
    // {
    //     id: 'actions',
    //     header: () => <div className="">Actions</div>,
    //     cell: ({ row }) => <EndUsersActionButtons data={row.original} />,
    // },
]
