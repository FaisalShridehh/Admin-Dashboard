import React, { Dispatch, SetStateAction, useState } from 'react'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'
import { AlertError } from '../../../ErrorAlert/ErrorAlert'
import { Admin } from '@/types/models/AdminTypes/AdminTypes'
import { EndUser } from '@/types/models/EndUsersTypes/endUsersTypes'
import { Button } from '../../../ui/button'
import CreateAdmin from '../../../CreateNew/Create'

interface DataTableComponentProps {
    data: Admin[] | EndUser[]
    columns: {
        field: string
        header: string
        body?: (rowData: Admin | EndUser) => React.ReactNode
    }[]
    globalFilterFields: string[]
    setFilters: Dispatch<SetStateAction<DataTableFilterMeta>>
    filters: DataTableFilterMeta
    size: number
    page: number
    setPage: (page: number) => void
    setSize: (size: number) => void
    isLoading: boolean
    error: Error | null
    AdminActionButtons?: (rowData: Admin) => React.ReactNode
    EndUserActionButtons?: (rowData: EndUser) => React.ReactNode
    toastRef: React.RefObject<Toast>
    renderHeader: () => JSX.Element
}

export function AdminDataTable({
    data = [],
    columns,
    globalFilterFields,
    setFilters,
    filters,
    size,
    page,
    setPage,
    setSize,
    isLoading,
    error,
    AdminActionButtons,
    EndUserActionButtons,
    // toastRef,
    renderHeader,
}: DataTableComponentProps) {
    const onPageChange = (e: { first: number; rows: number }) => {
        setPage(e.first / e.rows)
        setSize(e.rows)
    }

    if (isLoading) return <LoadingSpinner />
    if (error) return <AlertError message={error.message} />

    return (
        <div className="card h-[calc(100vh-75px)] overflow-x-hidden">
            {/* <Toast ref={toastRef} /> */}
            <DataTable
                value={data}
                tableStyle={{ minWidth: '50rem' }}
                scrollable
                scrollHeight="100%"
                paginator
                rows={size}
                first={page * size}
                onPage={onPageChange}
                rowsPerPageOptions={[5, 10, 25, 50]}
                header={renderHeader}
                filters={filters}
                globalFilterFields={globalFilterFields}
                emptyMessage="No data found."
                filterDisplay="row"
            >
                {columns.map((col, index) => (
                    <Column key={index} {...col} />
                ))}
                {AdminActionButtons && (
                    <Column
                        body={(rowData: Admin) => AdminActionButtons(rowData)}
                        header="Actions"
                        style={{ width: 'fit-content' }}
                    />
                )}
                {EndUserActionButtons && (
                    <Column
                        body={(rowData: EndUser) =>
                            EndUserActionButtons(rowData)
                        }
                        header="Actions"
                        style={{ width: 'fit-content' }}
                    />
                )}
            </DataTable>
        </div>
    )
}

export default AdminDataTable
