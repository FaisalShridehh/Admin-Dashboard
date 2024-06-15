import {
    ColumnDef,
    ColumnFiltersState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ColumnSizingState,
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Updater } from '@tanstack/react-query'

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams()
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})
    // const [colSizing, setColSizing] = useState<ColumnSizingState>({})

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
            // columnSizing: colSizing,
        },
        onPaginationChange: handlePaginationChange,
        manualPagination: true,
        // columnResizeMode: 'onChange',
        // onColumnSizingChange: setColSizing,
        // defaultColumn: {
        //     size: 100, //starting column size
        //     minSize: 50, //enforced during column resizing
        //     maxSize: 250, //enforced during column resizing
        // },
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
                    <Table style={{ width: table.getTotalSize() }}>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                className="relative"
                                                style={{
                                                    width: header.getSize(),
                                                }}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                                {/* <ColumnResizer
                                                    header={header}
                                                /> */}
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

// import { Header } from '@tanstack/react-table'

export const ColumnResizer = ({ header }) => {
    if (header.column.getCanResize() === false) return <></>

    return (
        <div
            {...{
                onMouseDown: header.getResizeHandler(),
                onTouchStart: header.getResizeHandler(),
                className: `absolute top-0 right-0 cursor-col-resize w-px h-full bg-gray-800 hover:bg-gray-700 hover:w-2`,
                style: {
                    userSelect: 'none',
                    touchAction: 'none',
                },
            }}
        />
    )
}
