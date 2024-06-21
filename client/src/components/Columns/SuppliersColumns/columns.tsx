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
                // const amount = parseFloat(row.getValue('isEnabled'))
                // const formatted = new Intl.NumberFormat('en-US', {
                //     style: 'currency',
                //     currency: 'USD',
                // }).format(amount)
                // console.log(row.getValue('isEnabled'))

                return (
                    <div className=" ">
                        {row.getValue('isActive') ? 'Active' : 'Inactive'}
                    </div>
                )
            },
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
        },
    ]

    return SupplierColumns
}
