import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
import { Edit, MoreHorizontal } from 'lucide-react'
import { Item } from '@/types/models/ItemsTypes/ItemsTypes'
import { useItems } from '@/hooks/useItems'

export const ItemActionButtons = ({
    data,
    onEdit,
}: {
    data: Item
    onEdit: (item: Item) => void
}) => {
    const ItemData = data
    const { deleteItem } = useItems()
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
                        navigator.clipboard.writeText(ItemData.id.toString())
                    }
                >
                    Copy Item ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onEdit(data)}>
                    <span className="flex items-center">
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
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
                                    <strong>{ItemData.id}</strong>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() =>
                                        deleteItem.mutate(ItemData.id)
                                    }
                                    disabled={deleteItem.isPending}
                                >
                                    {deleteItem.isPending
                                        ? 'Delete...'
                                        : 'Continue'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
