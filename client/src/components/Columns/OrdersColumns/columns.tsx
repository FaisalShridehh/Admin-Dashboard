import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { Orders } from '@/types/models/OrdersTypes/OrdersTypes'

export const OrdersColumns: ColumnDef<Orders>[] = [
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
        accessorKey: 'orderStatus',
        header: () => <div className="">Order Status</div>,
    },
    {
        accessorKey: 'totalAmount',
        header: () => <div className="">Total Amount</div>,
    },
    {
        accessorKey: 'deliveredAt',
        header: () => <div className="">Delivered At</div>,
    },
    {
        accessorKey: 'supplierId',
        header: () => <div className="">Supplier Id</div>,
    },
    {
        accessorKey: 'endUserId',
        header: () => <div className="">End User Id</div>,
    },
    {
        accessorKey: 'items',
        header: () => <div className="">Items</div>,
    },
    {
        accessorKey: 'paymentMethod',
        header: () => <div className="">Payment Method</div>,
    },

    // {
    //     id: 'actions',
    //     header: () => <div className="">Actions</div>,
    //     cell: ({ row }) => <EndUsersActionButtons data={row.original} />,
    // },
]
