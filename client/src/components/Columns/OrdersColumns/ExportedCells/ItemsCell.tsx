import { Modal } from '@/components/ui/modal'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Order } from '@/types/models/OrdersTypes/OrdersTypes'
import { Row } from '@tanstack/react-table'
import { useState } from 'react'

export function ItemsCell({ row }: { row: Row<Order> }) {
    const [isOpen, setIsOpen] = useState(false)
    // const { data } = useEndUsers()
    // const endUser = data?.find((user) => user.id === row.original.endUserId)
    // const endUser = data?.find((user) => user.id === row.original.userId)

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                style={{
                    cursor: 'pointer',
                    // textDecoration: 'underline',
                }}
                className="underline underline-offset-4"
            >
                {row.original.items.slice(0, 2).join(', ')}
                {row.original.items.length > 2
                    ? `, +${row.original.items.length - 2} more`
                    : ''}
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Items"
                // description={`Details of items for EndUser ${endUser?.username}`}
                description={`Details of items for User with id:  ${row.original.userId}`}
            >
                <ScrollArea className="h-72 w-full ">
                    <ul className="ml-4 grid list-disc grid-cols-4 px-3 py-2 text-text">
                        {row.original.items.map((item, index) => (
                            <li key={index} className="mb-1">
                                {item}
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </Modal>
        </>
    )
}
