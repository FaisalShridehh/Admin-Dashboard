import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Modal } from '../ui/modal'
import { useEffect, useState } from 'react'
import { Financial } from '@/types/models/Financial/Financial'
import { updateFinancialFormSchema } from '@/types/FormSchema/FinancialFormSchema/FinancialFormSchema'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '../ui/use-toast'
import { AxiosError } from 'axios'
import { format, toDate } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useFinancial } from '@/hooks/useFinancial'

interface UpdateFinancialProps {
    financial: Financial | null
    isUpdateFormOpen: boolean
    setIsUpdateFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedFinancial: React.Dispatch<React.SetStateAction<Financial | null>>
}

export default function UpdateFinancial({
    financial,
    isUpdateFormOpen,
    setIsUpdateFormOpen,
    setSelectedFinancial,
}: UpdateFinancialProps) {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const { updateFinancialTransaction } = useFinancial()

    // 1. Define your form.
    const form = useForm<z.infer<typeof updateFinancialFormSchema>>({
        resolver: zodResolver(updateFinancialFormSchema),
        defaultValues: {
            statement: '',
            amount: 0,
            date: new Date(),
            paymentType: 'كاش',
            comment: '',
            type: 'OUTCOME',
            orderId: 1,
        },
        mode: 'onChange',
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof updateFinancialFormSchema>) {
        setIsSubmitting(true)
        try {
            await updateFinancialTransaction.mutateAsync({
                FinancialUpdateData: values,
                id: financial?.id,
            })
            toast({
                variant: 'default',
                title: 'Success',
                description: 'Financial Updated successfully',
                duration: 3000,
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to Update Financial: ${error.response?.data.message}`,
                    duration: 3000,
                })
            } else if (error instanceof Error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Failed to Update Financial: ${(error as Error).message}`,
                    duration: 3000,
                })
            } else {
                console.error(error)
            }
        } finally {
            form.reset()
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        if (financial) {
            form.reset({
                statement: financial?.statement,
                amount: financial?.amount,
                date: toDate(financial?.date),
                paymentType: financial?.paymentType,
                comment: financial?.comment,
                type:
                    financial.paymentMethod === 'Income' ? 'INCOME' : 'OUTCOME',
                orderId: financial?.orderId,
            })
        }
    }, [financial, form])
    return (
        <>
            <Modal
                isOpen={isUpdateFormOpen}
                onClose={() => {
                    setIsUpdateFormOpen(false)
                    setSelectedFinancial(null)
                    form.reset()
                }}
                title={`Update for Financial`}
                description={`Update for Financial ${financial ? financial.id : ''} `}
                className="text-text"
                dialogClassName="max-w-3xl"
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-2 items-center gap-4 p-3 "
                    >
                        <FormField
                            control={form.control}
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
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Amount"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
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
                            control={form.control}
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
                            control={form.control}
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
                            control={form.control}
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
                            control={form.control}
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
            </Modal>
        </>
    )
}
