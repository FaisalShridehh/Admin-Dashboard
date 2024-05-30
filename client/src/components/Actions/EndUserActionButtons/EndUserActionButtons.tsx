import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Trash } from 'lucide-react'
import DeActivate from '@/components/DeActivateBtn/DeActivate'
import Activate from '@/components/ActivateBtn/Activate'
import { useEndUsers } from '@/hooks/useEndUsers'
import { EndUser } from '@/types/models/EndUsersTypes/endUsersTypes'

export const EndUsersActionButtons = ({ data }: { data: EndUser }) => {
    const EndUserData = data
    const { deleteEndUser } = useEndUsers()
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
                <DropdownMenuItem>
                    {/* EndUserData.userId !== -1 && */}
                    {/* {EndUserData.isActive ? (
                        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                            <DeActivate
                                // handleOnClick={() =>
                                //     deActivateEndUser.mutate(EndUser.id)
                                // }
                                // fn={deActivateEndUser}
                                rowData={EndUserData}
                            />
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                            <Activate
                                // handleOnClick={() =>
                                //     ActivateEndUser.mutate(EndUser.id)
                                // }
                                // fn={ActivateEndUser}
                                rowData={EndUserData}
                            />
                        </DropdownMenuItem>
                    )} */}
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => deleteEndUser.mutate(EndUserData.id)}
                >
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
