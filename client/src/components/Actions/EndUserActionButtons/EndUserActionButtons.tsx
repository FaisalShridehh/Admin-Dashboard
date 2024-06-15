import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit, Key, MoreHorizontal, Trash } from 'lucide-react'
import DeActivate from '@/components/DeActivateBtn/DeActivate'
import Activate from '@/components/ActivateBtn/Activate'
import { useEndUsers } from '@/hooks/useEndUsers'
import { EndUser } from '@/types/models/EndUsersTypes/endUsersTypes'

export const EndUsersActionButtons = ({
    data,
    onUpdatePassword,
    onEdit,
}: {
    data: EndUser
    onUpdatePassword: (endUser: EndUser) => void
    onEdit: (endUser: EndUser) => void
}) => {
    const EndUserData = data
    const { deleteEndUser, activateEndUser, deactivateEndUser } = useEndUsers()
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
                        navigator.clipboard.writeText(EndUserData.id.toString())
                    }
                >
                    Copy EndUser ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {EndUserData.isActive ? (
                    <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                        <DeActivate
                            handleOnClick={() =>
                                deactivateEndUser.mutate(EndUserData.id)
                            }
                            fn={deactivateEndUser}
                            rowData={EndUserData}
                        />
                        {/* <span>DeActivate</span> */}
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                        <Activate
                            handleOnClick={() =>
                                activateEndUser.mutate(EndUserData.id)
                            }
                            fn={activateEndUser}
                            rowData={EndUserData}
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
                {EndUserData.isActive && (
                    <>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={() => deleteEndUser.mutate(EndUserData.id)}
                        >
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
