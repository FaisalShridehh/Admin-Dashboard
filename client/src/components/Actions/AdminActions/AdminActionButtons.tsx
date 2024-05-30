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
import DeActivate from '@/components/DeActivateBtn/DeActivate'
import { useAdmins } from '@/hooks/useAdmins'
import Activate from '@/components/ActivateBtn/Activate'
import { Admin } from '@/types/models/AdminTypes/AdminTypes'

export const AdminActionButtons = ({ data } : { data: Admin }) => {
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
