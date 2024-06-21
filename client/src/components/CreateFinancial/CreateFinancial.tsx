/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

// * components
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button, buttonVariants } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
//* ############################################################################
import { cn } from '@/lib/utils'
import { createNewFinancialFormSchema } from '@/types/FormSchema/FinancialFormSchema/FinancialFormSchema'
import { useFinancial } from '@/hooks/useFinancial'

// interface CreateNewProps {
//     onSubmitFn: (
//         values: z.infer<typeof createNewFinancialFormSchema>
//     ) => Promise<void>
//     form: UseFormReturn<
//         {
//             statement: string
//             amount: number
//             date: Date
//             paymentType: 'كاش'
//             comment: string
//             type: 'INCOME' | 'OUTCOME'
//             orderId: number
//         },
//         any,
//         undefined
//     >
//     isSubmitting: boolean
// }

export default function CreateNewFinancial() {
    const { createFinancialTransaction } = useFinancial()
    const { toast } = useToast()

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    // 1. Define your form.
    const createNewFinancialForm = useForm<
        z.infer<typeof createNewFinancialFormSchema>
    >({
        resolver: zodResolver(createNewFinancialFormSchema),
        defaultValues: {
            statement: '',
            amount: 0,
            date: new Date(),
            paymentType: 'كاش',
            comment: '',
            type: 'INCOME',
            orderId: 1,
        },
        mode: 'onChange',
    })

    // 2. Define a submit handler.
    async function onCreateNewFinancialSubmit(
        values: z.infer<typeof createNewFinancialFormSchema>
    ) {
        setIsSubmitting(true)
        try {
            await createFinancialTransaction.mutateAsync(values)
            toast({
                variant: 'default',
                title: 'Success',
                description: 'Financial created successfully',
                duration: 3000,
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to create Financial: ${error.response?.data.message}`,
                    duration: 3000,
                })
            } else if (error instanceof Error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to create Financial: ${(error as Error).message}`,
                    duration: 3000,
                })
            } else {
                console.error(error)
            }
        } finally {
            createNewFinancialForm.reset()
            setIsSubmitting(false)
        }
    }
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
                    <DialogTitle>
                        Create New Financial Transaction Here.
                    </DialogTitle>
                </DialogHeader>

                <Form {...createNewFinancialForm}>
                    <form
                        onSubmit={createNewFinancialForm.handleSubmit(
                            onCreateNewFinancialSubmit
                        )}
                        className="grid grid-cols-2 items-center gap-4 p-3 "
                    >
                        <FormField
                            control={createNewFinancialForm.control}
                            name="statement"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Statement</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="statement"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={createNewFinancialForm.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Amount"
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={createNewFinancialForm.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'w-[240px] pl-3 text-left font-normal',
                                                        !field.value &&
                                                            'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            'PPP'
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() ||
                                                    date <
                                                        new Date('1900-01-01')
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={createNewFinancialForm.control}
                            name="paymentType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payment Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a payment type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="كاش">
                                                كاش
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={createNewFinancialForm.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comment</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="comment"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={createNewFinancialForm.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="INCOME">
                                                INCOME
                                            </SelectItem>
                                            <SelectItem value="OUTCOME">
                                                OUTCOME
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={createNewFinancialForm.control}
                            name="orderId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Order Id</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Order Id"
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
