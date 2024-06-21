import { useEndUsers } from '@/hooks/useEndUsers'
import { Orders } from '@/types/models/OrdersTypes/OrdersTypes'
import { Row } from '@tanstack/react-table'

export function EndUserNameCell({ row }: { row: Row<Orders> }) {
    const { data } = useEndUsers()
    const endUser = data?.find((user) => user.id === row.original.userId)
    return endUser ? <span>{endUser.username}</span> : null
}
