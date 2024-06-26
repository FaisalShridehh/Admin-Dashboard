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
import { Admin } from '@/types/models/AdminTypes/AdminTypes'
import { EndUser } from '@/types/models/EndUsersTypes/endUsersTypes'
import { Supplier } from '@/types/models/SuppliersTypes/SuppliersTypes'
export default function DeActivate({
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
                    Deactivate
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent className="text-text">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to Deactivate{' '}
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
                        {fn.isPending ? 'Deactivate...' : 'Continue'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
