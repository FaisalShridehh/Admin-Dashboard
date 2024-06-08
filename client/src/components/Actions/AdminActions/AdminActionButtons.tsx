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
import DeleteAdminBtn from '@/components/DeleteAdminBtn/DeleteAdminBtn'
import ChangePassword from '@/components/ChangePassword/ChangePassword'
import Update from '@/components/UpdateButton/Update'

export const AdminActionButtons = ({ data }: { data: Admin }) => {
    const admin = data
    const { deActivateAdmin, ActivateAdmin, deleteAdmin } = useAdmins()
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
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                    {admin.userId !== -1 && admin.isActive ? (
                        <DeActivate
                            handleOnClick={() =>
                                deActivateAdmin.mutate(admin.id)
                            }
                            fn={deActivateAdmin}
                            rowData={admin}
                        />
                    ) : (
                        <Activate
                            handleOnClick={() => ActivateAdmin.mutate(admin.id)}
                            fn={ActivateAdmin}
                            rowData={admin}
                        />
                    )}
                </DropdownMenuItem>

                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                    <Update rowData={data} />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                    <ChangePassword data={data} />
                </DropdownMenuItem>

                {admin.isActive && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                            <DeleteAdminBtn
                                rowData={admin}
                                fn={deleteAdmin}
                                handleOnClick={() =>
                                    deleteAdmin.mutate(admin.id)
                                }
                            />
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
