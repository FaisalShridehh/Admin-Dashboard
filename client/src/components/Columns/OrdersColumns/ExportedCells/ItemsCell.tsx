import { Modal } from '@/components/ui/modal'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEndUsers } from '@/hooks/useEndUsers'
import { Orders } from '@/types/models/OrdersTypes/OrdersTypes'
import { Row } from '@tanstack/react-table'
import { useState } from 'react'

export function ItemsCell({ row }: { row: Row<Orders> }) {
    const [isOpen, setIsOpen] = useState(false)
    const { data } = useEndUsers()
    const endUser = data?.find((user) => user.id === row.original.endUserId)

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                }}
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
                description={`Details of items for EndUser ${endUser?.username}`}
            >
                <ScrollArea className="h-72 w-full " >
                    <ul className="ml-4 list-disc text-text grid grid-cols-4">
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
