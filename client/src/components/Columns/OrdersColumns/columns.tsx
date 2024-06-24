import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { Order } from '@/types/models/OrdersTypes/OrdersTypes'

import { ItemsCell } from './ExportedCells/ItemsCell'
import { OrderActionButtons } from '@/components/Actions/OrderActionButtons/OrderActionButtons'

interface OrdersColumnsProps {
    onEdit: (orders: Order) => void
}

export const getOrdersColumns = ({ onEdit }: OrdersColumnsProps) => {
    const OrdersColumns: ColumnDef<Order>[] = [
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
            size: 100,
        },
        {
            accessorKey: 'userId',
            header: () => <div className="">User Id</div>,
            size: 150,
        },
        {
            accessorKey: 'items',
            header: () => <div className="">Items</div>,
            cell: ({ row }) => <ItemsCell row={row} />,
            size: 250,
        },
        {
            accessorKey: 'paymentMethod',
            header: () => <div className="">Payment Method</div>,
        },
        {
            accessorKey: 'totalAmount',
            header: () => <div className="">Total Amount</div>,
        },

        {
            id: 'actions',
            header: () => <div className="">Actions</div>,
            cell: ({ row }) => (
                <OrderActionButtons data={row.original} onEdit={onEdit} />
            ),
            size: 150,
        },
    ]
    return OrdersColumns
}
