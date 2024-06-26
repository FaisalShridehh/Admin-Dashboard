import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { SupplierActionButtons } from '@/components/Actions/SupplierActions/SupplierActions'
import { Supplier } from '@/types/models/SuppliersTypes/SuppliersTypes'
interface SuppliersColumnsProps {
    onUpdatePassword: (supplier: Supplier) => void
    onEdit: (supplier: Supplier) => void
}
export const getSuppliersColumns = ({
    onUpdatePassword,
    onEdit,
}: SuppliersColumnsProps) => {
    const SupplierColumns: ColumnDef<Supplier>[] = [
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

            size: 50,
        },
        {
            accessorKey: 'firstName',
            header: () => <div className="">First Name</div>,
            size: 150,
        },
        {
            accessorKey: 'lastName',
            header: () => <div className="">Last Name</div>,
            size: 150,
        },
        {
            accessorKey: 'username',
            header: () => <div className="">User Name</div>,
            size: 150,
        },
        {
            accessorKey: 'email',
            header: () => <div className="">Email</div>,
            size: 150,
        },
        {
            accessorKey: 'phoneNumber',
            header: () => <div className="">Phone Number</div>,
            size: 150,
        },
        {
            accessorKey: 'roleId',
            header: () => <div className="">Role Id</div>,
            size: 100,
        },
        {
            accessorKey: 'roleName',
            header: () => <div className="">Role Name</div>,
            size: 150,
        },
        {
            accessorKey: 'isActive',
            header: () => <div className="">Status</div>,
            cell: ({ row }) => {
                return (
                    <div className=" ">
                        {row.getValue('isActive') ? 'Active' : 'Inactive'}
                    </div>
                )
            },
            size: 100,
        },
        {
            id: 'actions',
            header: () => <div className="">Actions</div>,
            cell: ({ row }) => (
                <SupplierActionButtons
                    data={row.original}
                    onUpdatePassword={onUpdatePassword}
                    onEdit={onEdit}
                />
            ),
            size: 150,
        },
    ]

    return SupplierColumns
}
