/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShieldBan } from 'lucide-react'
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
import { UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { Supplier } from '@/types/models/SuppliersTypes/SuppliersTypes'
import { Admin } from '@/types/models/AdminTypes/AdminTypes'
import { EndUser } from '@/types/models/EndUsersTypes/endUsersTypes'
export default function Activate({
    handleOnClick,
    fn,
    rowData,
}: {
    handleOnClick: () => void
    fn: UseMutationResult<AxiosResponse<any, any>, Error, number, unknown>
    rowData: Admin | EndUser | Supplier
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span className="flex items-center">
                    <ShieldBan className="mr-2 h-4 w-4" />
                    Activate
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent className="text-text">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to Activate{' '}
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
                        {fn.isPending ? 'Activate...' : 'Continue'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
