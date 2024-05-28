import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'

export type Users = {
    id: number
    role: string
    // isEnabled: 'Active' | 'Inactive' | 'success' | 'failed'
    isEnabled: boolean
    email: string
    firstName: string
    lastName: string
    userName: string
}

export const columns: ColumnDef<Users>[] = [
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
        header: () => <div className="">ID</div>,
    },
    {
        accessorKey: 'firstName',
        header: () => <div className="">First Name</div>,
    },
    {
        accessorKey: 'lastName',
        header: () => <div className="">Last Name</div>,
    },
    {
        accessorKey: 'userName',
        header: () => <div className="">User Name</div>,
    },
    {
        accessorKey: 'email',
        header: () => <div className="">Email</div>,
    },
    {
        accessorKey: 'isEnabled',
        header: () => <div className="">Status</div>,
        cell: ({ row }) => {
            // const amount = parseFloat(row.getValue('isEnabled'))
            // const formatted = new Intl.NumberFormat('en-US', {
            //     style: 'currency',
            //     currency: 'USD',
            // }).format(amount)
            // console.log(row.getValue('isEnabled'))

            return (
                <div className=" ">
                    {row.getValue('isEnabled') ? 'Active' : 'Inactive'}
                </div>
            )
        },
    },
    {
        accessorKey: 'role',
        header: () => <div className="">Role</div>,
    },
    {
        id: 'actions',
        header: () => <div className="">Actions</div>,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="flex ">
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(payment.id)
                            }
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>
                            View payment details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
