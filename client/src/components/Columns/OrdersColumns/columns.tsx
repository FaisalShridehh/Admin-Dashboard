import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { Orders } from '@/types/models/OrdersTypes/OrdersTypes'
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
// } from '@/components/ui/tooltip'
import { ItemsCell } from './ExportedCells/ItemsCell'
import { EndUserNameCell } from './ExportedCells/EndUserNameCell'

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
        accessorKey: 'endUserId',
        header: () => <div className="">EndUser Id</div>,
    },
    {
        accessorKey: 'endUserName',
        header: () => <div className="">EndUser Name</div>,
        cell: ({ row }) => <EndUserNameCell row={row} />,
    },
    {
        accessorKey: 'items',
        header: () => <div className="">Items</div>,
        cell: ({ row }) => <ItemsCell row={row} />,
    },
    {
        accessorKey: 'paymentMethod',
        header: () => <div className="">Payment Method</div>,
    },
    {
        accessorKey: 'totalAmount',
        header: () => <div className="">Total Amount</div>,
    },

    // {
    //     id: 'actions',
    //     header: () => <div className="">Actions</div>,
    //     cell: ({ row }) => <EndUsersActionButtons data={row.original} />,
    // },
]




// {
//     accessorKey: 'items',
//     header: () => <div className="">Items</div>,
//     cell: ({ row }) => (
//         <TooltipProvider>
//             <Tooltip>
//                 <TooltipTrigger>
//                     <div
//                         style={{
//                             cursor: 'pointer',
//                             textDecoration: 'underline',
//                         }}
//                     >
//                         {row.original.items.slice(0, 2).join(', ')}
//                         {row.original.items.length > 2
//                             ? `, +${row.original.items.length - 2} more`
//                             : ''}
//                     </div>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                     <p>{row.original.items.join(', ')}</p>
//                 </TooltipContent>
//             </Tooltip>
//         </TooltipProvider>
//     ),
// },
