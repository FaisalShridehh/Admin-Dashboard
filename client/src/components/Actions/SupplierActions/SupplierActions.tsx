import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Supplier } from '@/types/models/SuppliersTypes/SuppliersTypes'
import { Edit, Key, MoreHorizontal } from 'lucide-react'
import DeActivate from '@/components/DeActivateBtn/DeActivate'
import Activate from '@/components/ActivateBtn/Activate'
import { useSuppliers } from '@/hooks/useSuppliers'
import DeleteBtn from '@/components/DeleteBtn/DeleteBtn'

export const SupplierActionButtons = ({
    data,
    onUpdatePassword,
    onEdit,
}: {
    data: Supplier
    onUpdatePassword: (supplier: Supplier) => void
    onEdit: (supplier: Supplier) => void
}) => {
    const supplier = data
    const { deleteSupplier, activateSupplier, deactivateSupplier } =
        useSuppliers()
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
                        navigator.clipboard.writeText(supplier.id.toString())
                    }
                >
                    Copy Supplier ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {supplier.isActive ? (
                    <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                        <DeActivate
                            handleOnClick={() =>
                                deactivateSupplier.mutate(supplier.id)
                            }
                            fn={deactivateSupplier}
                            rowData={supplier}
                        />
                        {/* <span>DeActivate</span> */}
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                        <Activate
                            handleOnClick={() =>
                                activateSupplier.mutate(supplier.id)
                            }
                            fn={activateSupplier}
                            rowData={supplier}
                        />
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => onEdit(data)}>
                    <span className="flex items-center">
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdatePassword(data)}>
                    <span className="flex cursor-pointer items-center">
                        <Key className="mr-2 h-4 w-4" />
                        Change Password
                    </span>
                </DropdownMenuItem>
                {supplier.isActive && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                            <DeleteBtn
                                rowData={supplier}
                                fn={deleteSupplier}
                                handleOnClick={() =>
                                    deleteSupplier.mutate(supplier.id)
                                }
                            />
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
