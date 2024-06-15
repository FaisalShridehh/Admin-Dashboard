import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '../../ui/checkbox'
import { Admin } from '@/types/models/AdminTypes/AdminTypes'

import { AdminActionButtons } from '../../Actions/AdminActions/AdminActionButtons'

interface AdminColumnsProps {
    onUpdatePassword: (admin: Admin) => void
    onEdit: (admin: Admin) => void
    isSuperAdmin: boolean
}
export const getAdminColumns = ({
    onUpdatePassword,
    isSuperAdmin,
    onEdit,
}: AdminColumnsProps) => {
    const adminColumns: ColumnDef<Admin>[] = [
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
            header: () => <div className="">user Name</div>,
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
            accessorKey: 'userId',
            header: () => <div className="">User Id</div>,
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

                return <>{row.getValue('isActive') ? 'Active' : 'Inactive'}</>
            },
        },
    ]

    if (isSuperAdmin) {
        adminColumns.push({
            id: 'actions',
            header: () => <div className="">Actions</div>,
            cell: ({ row }) =>
                row.original.roleName !== 'super_admin' ? (
                    <AdminActionButtons
                        data={row.original}
                        onUpdatePassword={onUpdatePassword}
                        onEdit={onEdit}
                    />
                ) : null,
        })
    }

    return adminColumns
}

// <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                     {data.userId !== -1 && data.isActive ? (
//                         <DropdownMenuItem onClick={(e) => e.preventDefault()}>
//                             <DeActivate
//                                 handleOnClick={() =>
//                                     deActivateAdmin.mutate(data.id)
//                                 }
//                                 fn={deActivateAdmin}
//                                 rowData={data}
//                             />
//                         </DropdownMenuItem>
//                     ) : (
//                         <DropdownMenuItem onClick={(e) => e.preventDefault()}>
//                             <Activate
//                                 handleOnClick={() =>
//                                     ActivateAdmin.mutate(data.id)
//                                 }
//                                 fn={ActivateAdmin}
//                                 rowData={data}
//                             />
//                         </DropdownMenuItem>
//                     )}
//                     <DropdownMenuItem onClick={(e) => e.preventDefault()}>
//                         <Update rowData={data} />
//                     </DropdownMenuItem>
//                     <DropdownMenuItem onClick={(e) => e.preventDefault()}>
//                         <Delete
//                             handleOnClick={() => deleteAdmin.mutate(data.id)}
//                             fn={deleteAdmin}
//                             rowData={data}
//                         />
//                     </DropdownMenuItem>
