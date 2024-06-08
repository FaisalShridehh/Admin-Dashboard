import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
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
import { useEffect, useState } from 'react'
import { SetURLSearchParams } from 'react-router-dom'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey: string
    page: number
    size: number
    pageCount: number
    setSearchParams: SetURLSearchParams
    setPagination: (
        value: React.SetStateAction<{
            pageIndex: number
            pageSize: number
        }>
    ) => void
    pagination: PaginationState | undefined
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
    setSearchParams,
    pagination,
    setPagination,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})


    const table = useReactTable({
        data,
        columns,
        pageCount: pageCount,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,

        state: {
            columnFilters,
            rowSelection,
            pagination,
        },
        onPaginationChange: (updater) => {
            setPagination((old) => {
                const newPaginationValue =
                    updater instanceof Function ? updater(old) : updater
                setSearchParams({
                    page: newPaginationValue.pageIndex.toString(),
                    size: newPaginationValue.pageSize.toString(),
                })
                onPageChange(newPaginationValue.pageIndex)
                onSizeChange(newPaginationValue.pageSize)
                return newPaginationValue
            })
        },
        manualPagination: true,
        // manualFiltering: true,
    })

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
