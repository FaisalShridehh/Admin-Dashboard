import { ColumnDef } from '@tanstack/react-table'


import { Checkbox } from '@/components/ui/checkbox'

import { EndUser } from '@/types/models/EndUsersTypes/endUsersTypes'
import { EndUsersActionButtons } from '@/components/Actions/EndUserActionButtons/EndUserActionButtons'

export const EndUsersColumns: ColumnDef<EndUser>[] = [
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
                <div className="">
                    {row.getValue('isActive') ? 'Active' : 'Inactive'}
                </div>
            )
        },
    },
    {
        id: 'actions',
        header: () => <div className="">Actions</div>,
        cell: ({ row }) => <EndUsersActionButtons data={row.original} />,
    },
]







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
