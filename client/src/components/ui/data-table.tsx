import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    PaginationState,
    useReactTable,
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { DataTablePagination } from './DataTablePagination'
import { ScrollArea, ScrollBar } from './scroll-area'
import { DataTableViewOptions } from './DataTableViewOptions'
import { Input } from './input'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey: string
    page: number
    size: number
    pageCount: number
    setPagination?: (
        value: React.SetStateAction<{
            pageIndex: number
            pageSize: number
        }>
    ) => void
    pagination?: PaginationState | undefined
    onPageChange: (page: number) => void
    onSizeChange: (size: number) => void
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    page,
    size,
    onPageChange,
    onSizeChange,
    pageCount,
    // pagination,
    // setPagination,
}: DataTableProps<TData, TValue>) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [pagination, setPagination] = useState(() => {
        return {
            pageIndex: page || 0,
            pageSize: size || 20,
        }
    })

    const handleColumnFiltersChange = useCallback(
        (filters) => setColumnFilters(filters),
        []
    )

    const handleRowSelectionChange = useCallback(
        (selection) => setRowSelection(selection),
        []
    )

    const handlePaginationChange = useCallback(
        (updater) => {
            setPagination((old) => {
                const newPaginationValue =
                    updater instanceof Function ? updater(old) : updater
                onPageChange(newPaginationValue.pageIndex)
                onSizeChange(newPaginationValue.pageSize)
                return newPaginationValue
            })
        },
        [onPageChange, onSizeChange]
    )
    useEffect(() => {
        setSearchParams({})
    }, [setSearchParams])

    const table = useReactTable({
        data,
        columns,
        pageCount,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: handleColumnFiltersChange,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: handleRowSelectionChange,
        state: {
            columnFilters,
            rowSelection,
            pagination,
        },
        onPaginationChange: handlePaginationChange,
        manualPagination: true,
    })

    useEffect(() => {
        setSearchParams({
            page: table.getState().pagination.pageIndex.toString(),
            size: table.getState().pagination.pageSize.toString(),
        })
    }, [pagination, setSearchParams, table])

    // console.log(table.getState().pagination)
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between gap-3">
                    <Input
                        placeholder={`Filter ${searchKey.charAt(0).toUpperCase() + searchKey.slice(1)}s...`}
                        value={
                            (table
                                .getColumn(searchKey)
                                ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(event) =>
                            table
                                .getColumn(searchKey)
                                ?.setFilterValue(event.target.value)
                        }
                        className="w-full md:max-w-sm"
                    />
                    <DataTableViewOptions table={table} />
                </div>
            </div>

            <div>
                <ScrollArea className="h-[calc(80vh-230px)] rounded-md border md:h-[calc(80vh-220px)]">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && 'selected'
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            <DataTablePagination table={table} />
        </>
    )
}
