import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { EndUser } from '@/types/models/EndUsersTypes/endUsersTypes'
import { EndUsersActionButtons } from '@/components/Actions/EndUserActionButtons/EndUserActionButtons'

interface EndUsersColumnsProps {
    onUpdatePassword: (endUser: EndUser) => void
    onEdit: (endUser: EndUser) => void
}
export const getEndUsersColumns = ({
    onUpdatePassword,
    onEdit,
}: EndUsersColumnsProps) => {
    const EndUsersColumns: ColumnDef<EndUser>[] = [
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
            enableResizing: false,
        },
        {
            accessorKey: 'id',
            header: () => <div className="">Id</div>,
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
            accessorKey: 'username',
            header: () => <div className="">User Name</div>,
        },
        {
            accessorKey: 'email',
            header: () => <div className="">Email</div>,
        },
        {
            accessorKey: 'phoneNumber',
            header: () => <div className="">Phone Number</div>,
        },
        {
            accessorKey: 'roleId',
            header: () => <div className="">Role Id</div>,
        },
        {
            accessorKey: 'roleName',
            header: () => <div className="">Role Name</div>,
        },
        {
            accessorKey: 'isActive',
            header: () => <div className="">Status</div>,
            cell: ({ row }) => {
                return (
                    <div className="">
                        {row.getValue('isActive') ? 'Active' : 'Inactive'}
                    </div>
                )
            },
        },
        {
            id: 'actions',
            header: () => <div className="">Actions</div>,
            cell: ({ row }) => (
                <EndUsersActionButtons
                    data={row.original}
                    onUpdatePassword={onUpdatePassword}
                    onEdit={onEdit}
                />
            ),
        },
    ]

    return EndUsersColumns
}
