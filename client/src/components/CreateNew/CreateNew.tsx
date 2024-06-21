/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'

import { z } from 'zod'

import { Button, buttonVariants } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { cn } from '@/lib/utils'
import { createNewAdminFormSchema } from '@/types/FormSchema/AdminFormSchema/AdminFormSchema'
import { UseFormReturn } from 'react-hook-form'

interface CreateNewProps {
    onSubmitFn: (
        values: z.infer<typeof createNewAdminFormSchema>
    ) => Promise<void>
    form: UseFormReturn<
        {
            username: string
            password: string
            firstName: string
            lastName: string
            email: string
            phoneNumber: string
        },
        any,
        undefined
    >
    type: 'Admin' | 'End User' | 'Supplier'
    isSubmitting: boolean
    children: React.ReactNode
}

export default function CreateNew({
    onSubmitFn,
    form,
    isSubmitting,
    type,
    children,
}: CreateNewProps) {
    // console.log(form);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={'default'}
                    className={`flex items-center ${cn(buttonVariants({ variant: 'default' }))}`}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </DialogTrigger>
            <DialogContent className="text-text sm:max-w-[800px]  ">
                <DialogHeader>
                    <DialogTitle>Create New {type} Here.</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmitFn)}
                        className="grid grid-cols-2 items-center gap-4 p-3 "
                    >
                        {children}
                        <Button
                            type="submit"
                            className="w-fit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

// ;<DialogContent className="text-text sm:max-w-[500px]">
//     <DialogHeader>
//         <DialogTitle>Create New Admin Here.</DialogTitle>
//     </DialogHeader>
//     <div className="grid gap-4 py-4">
//         <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//                 First Name
//             </Label>
//             <Input id="FirstName" defaultValue={''} className="col-span-3" />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//                 Last Name
//             </Label>
//             <Input id="FirstName" defaultValue={''} className="col-span-3" />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//                 User Name
//             </Label>
//             <Input id="username" defaultValue={''} className="col-span-3" />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="email" className="text-right">
//                 Email
//             </Label>
//             <Input id="email" defaultValue={''} className="col-span-3" />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="phoneNumber" className="text-right">
//                 Phone Number
//             </Label>
//             <Input id="phoneNumber" defaultValue={''} className="col-span-3" />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="password" className="text-right">
//                 Password
//             </Label>
//             <Input id="password" defaultValue={''} className="col-span-3" />
//         </div>
//     </div>
//     <DialogFooter>
//         <Button type="submit">Save changes</Button>
//     </DialogFooter>
// </DialogContent>
