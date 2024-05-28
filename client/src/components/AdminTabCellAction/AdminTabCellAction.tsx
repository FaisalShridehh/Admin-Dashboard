import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Trash } from 'lucide-react'

import { Admin } from '@/types/models/AdminTypes/AdminTypes'
import DeActivate from '../DeActivateBtn/DeActivate'
import Update from '../UpdateButton/Update'
import { useAdmins } from '@/hooks/useAdmins'
import Activate from '../ActivateBtn/Activate'

interface CellActionProps {
    data: Admin
}

export const AdminTabCellAction: React.FC<CellActionProps> = ({ data }) => {
    const { deActivateAdmin, ActivateAdmin , deleteAdmin} = useAdmins()
    // const onConfirm = async () => {}

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {data.userId !== -1 && data.isActive ? (
                        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                            <DeActivate
                                handleOnClick={() =>
                                    deActivateAdmin.mutate(data.id)
                                }
                                fn={deActivateAdmin}
                                rowData={data}
                            />
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                            <Activate
                                handleOnClick={() =>
                                    ActivateAdmin.mutate(data.id)
                                }
                                fn={ActivateAdmin}
                                rowData={data}
                            />
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                        <Update rowData={data} />
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                        <Delete
                            handleOnClick={() => deleteAdmin.mutate(data.id)}
                            fn={deleteAdmin}
                            rowData={data}
                        />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}



import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog'
export default function Delete({ handleOnClick, fn, rowData }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span className="flex items-center">
                    <Trash className="mr-2 h-4 w-4" /> Delete
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent className="text-text">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to Delete{' '}
                        <strong>
                            {rowData.firstName + ' ' + rowData.lastName}
                        </strong>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleOnClick}
                        disabled={fn.isPending}
                    >
                        {fn.isPending ? 'Delete...' : 'Continue'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

