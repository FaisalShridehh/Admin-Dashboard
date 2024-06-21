/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash } from 'lucide-react'
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
} from '@/components/ui/alert-dialog'
import { EndUser } from '@/types/models/EndUsersTypes/endUsersTypes'
import { Supplier } from '@/types/models/SuppliersTypes/SuppliersTypes'
import { Admin } from '@/types/models/AdminTypes/AdminTypes'
import { UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
type BaseUser = Admin | EndUser | Supplier

interface DeleteBtnProps<T extends BaseUser> {
    handleOnClick: () => void
    fn: UseMutationResult<AxiosResponse<any, any>, Error, number, unknown>
    rowData: T
}

export default function DeleteBtn({
    handleOnClick,
    fn,
    rowData,
}: DeleteBtnProps<BaseUser>) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span className="flex items-center">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
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
