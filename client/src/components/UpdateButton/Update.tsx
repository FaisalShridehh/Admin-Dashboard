import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Edit } from 'lucide-react'
import { Admin } from '@/types/models/AdminTypes/AdminTypes'

export default function Update({ rowData }: { rowData: Admin }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="flex items-center">
                    <Edit className="mr-2 h-4 w-4" /> Update
                </span>
            </DialogTrigger>
            <DialogContent className="text-text sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Update{' '}
                        <strong>
                            {rowData.firstName + ' ' + rowData.lastName}
                        </strong>
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to{' '}
                        <strong>
                            {rowData.firstName + ' ' + rowData.lastName}
                        </strong>{' '}
                        here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            First Name
                        </Label>
                        <Input
                            id="FirstName"
                            defaultValue={rowData.firstName}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Last Name
                        </Label>
                        <Input
                            id="FirstName"
                            defaultValue={rowData.lastName}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            defaultValue={rowData.email}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
