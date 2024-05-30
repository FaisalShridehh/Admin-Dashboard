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
import { Checkbox } from '@/components/ui/checkbox'
import { Admin } from '@/types/models/AdminTypes/AdminTypes'
import DeActivate from '@/components/DeActivateBtn/DeActivate'
import { useAdmins } from '@/hooks/useAdmins'
import Activate from '@/components/ActivateBtn/Activate'

export const adminColumns: ColumnDef<Admin>[] = [
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
        accessorKey: 'email',
        header: () => <div className="">Email</div>,
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
        cell: ({ row }) => <AdminActionButtons data={row.original} />,
    },
]



const AdminActionButtons = ({ data }) => {
    const admin = data
    const { deActivateAdmin, ActivateAdmin } = useAdmins()
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
                        navigator.clipboard.writeText(admin.id.toString())
                    }
                >
                    Copy Admin ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    {admin.userId !== -1 && admin.isActive ? (
                        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                            <DeActivate
                                handleOnClick={() =>
                                    deActivateAdmin.mutate(admin.id)
                                }
                                fn={deActivateAdmin}
                                rowData={admin}
                            />
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                            <Activate
                                handleOnClick={() =>
                                    ActivateAdmin.mutate(admin.id)
                                }
                                fn={ActivateAdmin}
                                rowData={admin}
                            />
                        </DropdownMenuItem>
                    )}
                </DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
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
