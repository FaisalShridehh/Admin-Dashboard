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
// import DeActivate from '@/components/DeActivateBtn/DeActivate'
// import Activate from '@/components/ActivateBtn/Activate'
// import { EndUser } from '@/types/models/EndUsersTypes/endUsersTypes'
// import { useEndUsers } from '@/hooks/useEndUsers'

export const SupplierActionButtons = ({ data }) => {
    const supplier = data
    // const { deActivate, Activate } = useEndUsers()
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
                    Copy supplier ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>
                    {supplier.userId !== -1 && supplier.isActive ? (
                        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                            <DeActivate
                                // handleOnClick={() =>
                                //     deActivatesupplier.mutate(supplier.id)
                                // }
                                // fn={deActivatesupplier}
                                rowData={supplier}
                            />
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                            <Activate
                                // handleOnClick={() =>
                                //     Activatesupplier.mutate(supplier.id)
                                // }
                                // fn={Activatesupplier}
                                rowData={supplier}
                            />
                        </DropdownMenuItem>
                    )}
                </DropdownMenuItem> */}
                <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
