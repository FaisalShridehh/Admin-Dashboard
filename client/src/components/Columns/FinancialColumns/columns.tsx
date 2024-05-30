import { ColumnDef } from '@tanstack/react-table'


import { Checkbox } from '@/components/ui/checkbox'

import { Financial } from '@/types/models/Financial/Financial'

export const FinancialTransactionsColumns: ColumnDef<Financial>[] = [
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
        accessorKey: 'statement',
        header: () => <div className="">Statement </div>,
    },
    {
        accessorKey: 'amount',
        header: () => <div className="">Amount</div>,
    },
    {
        accessorKey: 'date',
        header: () => <div className="">Date</div>,
    },
    {
        accessorKey: 'paymentType',
        header: () => <div className="">Payment Type</div>,
    },
    {
        accessorKey: 'comment',
        header: () => <div className="">Comment</div>,
    },
    {
        accessorKey: 'type',
        header: () => <div className="">Type</div>,
    },
    {
        accessorKey: 'orderId',
        header: () => <div className="">Order Id</div>,
    },
    // {
    //     id: 'actions',
    //     header: () => <div className="">Actions</div>,
    //     cell: ({ row }) => <EndUsersActionButtons data={row.original} />,
    // },
]
