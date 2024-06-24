import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { Financial } from '@/types/models/Financial/Financial'
import { FinancialActionButtons } from '@/components/Actions/FinancialActionButtons/FinancialActionButtons'
interface FinancialColumnsProps {
    onEdit: (financial: Financial) => void
}
export const getFinancialColumns = ({ onEdit }: FinancialColumnsProps) => {
    const FinancialTransactionsColumns: ColumnDef<Financial>[] = [
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
            size: 70,
        },
        {
            accessorKey: 'orderId',
            header: () => <div className="">Order Id</div>,
            size: 100,
        },
        {
            accessorKey: 'date',
            header: () => <div className="">Date</div>,
            cell: ({ row }) => {
                const options: Intl.DateTimeFormatOptions = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true, // This makes the time format 12-hour with AM/PM
                }
                return (
                    <>
                        {/* {new Date(row.getValue('date')).toLocaleDateString(
                        'en-US',
                        { year: 'numeric', month: '2-digit', day: '2-digit' }
                    )} */}
                        {new Date(row.getValue('date')).toLocaleDateString(
                            'en-US',
                            options
                        )}
                    </>
                )
            },
            size: 200,
        },
        {
            accessorKey: 'amount',
            header: () => <div className="">Amount</div>,
            size: 100,
        },
        {
            accessorKey: 'paymentMethod',
            header: () => <div className="">Payment Method</div>,
            size: 150,
        },

        {
            accessorKey: 'paymentType',
            header: () => <div className="">Payment Type</div>,
            size: 150,
        },
        {
            accessorKey: 'comment',
            header: () => <div className="">Comment</div>,
            size: 300,
        },
        {
            accessorKey: 'statement',
            header: () => <div className="">Statement </div>,
            size: 300,
        },

        {
            id: 'actions',
            header: () => <div className="">Actions</div>,
            cell: ({ row }) => (
                <FinancialActionButtons data={row.original} onEdit={onEdit} />
            ),
            size: 150,
        },
    ]

    return FinancialTransactionsColumns
}
