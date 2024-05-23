import {
    ColumnDef,
    PaginationState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useEndUsers } from '@/hooks/useEndUsers'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey: string
    totalUsers: number
    pageCount: number
    pageSizeOptions?: number[]
}

/**
 * Renders a table component for displaying end-user data.
 *
 * @param {DataTableProps<TData, TValue>} props - The component props.
 * @param {ColumnDef<TData, TValue>[]} props.columns - The column definitions for the table.
 * @param {TData[]} props.data - The data to be displayed in the table.
 * @param {string} props.searchKey - The key to be used for searching in the table.
 * @param {number} props.totalUsers - The total number of users.
 * @param {number} props.pageCount - The total number of pages.
 * @param {number[]} [props.pageSizeOptions=5, 20, 30, 40, 50] - The options for the number of rows per page.
 * @return {JSX.Element} The rendered table component.
 */

export function EndUserTable<TData, TValue>({
    columns,
    data,
    searchKey,
    totalUsers,
    pageCount,
    pageSizeOptions = [5, 20, 30, 40, 50],
}: DataTableProps<TData, TValue>) {
    console.log('Rendering EndUserTable component')
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const { setPage, setSize, page, size } = useEndUsers()

    const fallbackPage = Number(searchParams.get('page')) || page
    const fallbackPerPage = Number(searchParams.get('size')) || size

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: fallbackPage,
        pageSize: fallbackPerPage,
    })

    useEffect(() => {
        console.log('Updating page and size')
        setPage(pageIndex)
        setSize(pageSize)
    }, [pageIndex, pageSize, setPage, setSize])

    useEffect(() => {
        const params = {
            page: String(pageIndex),
            size: String(pageSize),
        }
        setSearchParams(params)
    }, [pageIndex, pageSize, setSearchParams])

    const table = useReactTable({
        data,
        columns,
        pageCount,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            pagination: { pageIndex, pageSize },
        },
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        manualFiltering: true,
    })

    const searchValue = table.getColumn(searchKey)?.getFilterValue() as string

    useEffect(() => {
        console.log('Updating search params')
        if (searchValue) {
            searchParams.set('search', searchValue)
        } else {
            searchParams.delete('search')
        }
        navigate(`?${searchParams.toString()}`, { replace: true })
    }, [searchValue, navigate, searchParams])

    console.log('End of EndUserTable render')

    return (
        <>
            <Input
                placeholder={`Search ${searchKey}...`}
                value={searchValue || ''}
                onChange={(event) =>
                    table
                        .getColumn(searchKey)
                        ?.setFilterValue(event.target.value)
                }
                className="w-full md:max-w-sm"
            />
            <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
                <Table className="relative">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected()
                                            ? 'selected'
                                            : undefined
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

            <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
                <div className="flex w-full items-center justify-between">
                    <div className="text-muted-foreground flex-1 text-sm">
                        {table.getFilteredSelectedRowModel().rows.length} of{' '}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
                    </div>
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                        <div className="flex items-center space-x-2">
                            <p className="whitespace-nowrap text-sm font-medium">
                                Rows per page
                            </p>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value))
                                }}
                            >
                                <SelectTrigger className="h-8 w-[70px]">
                                    <SelectValue
                                        placeholder={
                                            table.getState().pagination.pageSize
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {pageSizeOptions.map((pageSize) => (
                                        <SelectItem
                                            key={pageSize}
                                            value={`${pageSize}`}
                                        >
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            aria-label="Go to first page"
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                        </Button>
                        <Button
                            aria-label="Go to previous page"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                        </Button>
                        <Button
                            aria-label="Go to next page"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                        </Button>
                        <Button
                            aria-label="Go to last page"
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
