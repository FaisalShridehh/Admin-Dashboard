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
            header: () => <div className="">user Name</div>,
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
            accessorKey: 'userId',
            header: () => <div className="">User Id</div>,
            size: 100,
        },
        {
            accessorKey: 'roleId',
            header: () => <div className="">Role Id</div>,
            size: 150,
        },
        {
            accessorKey: 'roleName',
            header: () => <div className="">Role Name</div>,
            size: 100,
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
            size: 150,
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
