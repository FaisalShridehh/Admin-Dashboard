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
export default function Activate({ handleOnClick, fn, rowData }) {
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
                        <strong>{rowData.firstName + " " + rowData.lastName}</strong>
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
