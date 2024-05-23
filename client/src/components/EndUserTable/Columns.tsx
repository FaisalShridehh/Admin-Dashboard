import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
import { Checkbox } from '@/components/ui/checkbox'
import { EndUser } from '@/types/models/EndUsersTypes/endUsersTypes'

export const columns: ColumnDef<EndUser>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
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
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'username',
        header: 'Username',
    },
    {
        accessorKey: 'firstName',
        header: 'First Name',
    },
    {
        accessorKey: 'lastName',
        header: 'Last Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
    },
    {
        accessorKey: 'roleId',
        header: 'Role Id',
    },
    {
        accessorKey: 'roleName',
        header: 'Role Name',
    },
    {
        accessorKey: 'isActive',
        header: 'Status',
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />,
    },
]
