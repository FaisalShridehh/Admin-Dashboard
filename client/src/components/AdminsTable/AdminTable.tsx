import React, { useState } from 'react'
import { FilterMatchMode } from 'primereact/api'
import { useAdmins } from '@/hooks/useAdmins'
import { useAuth } from '@/hooks/useAuth'
import { DataTableComponent } from './DataTableComponent'
import Update from '../UpdateButton/Update'
import DeActivate from '../DeActivateBtn/DeActivate'
import { Admin } from '@/types/models/AdminTypes/AdminTypes'
import { MultiStateCheckbox } from 'primereact/multistatecheckbox'
import { Ban, Check, X } from 'lucide-react'
import { DataTableFilterMeta } from 'primereact/datatable'

export default function AdminTable() {
    const { user } = useAuth()
    const isSuperAdmin = user?.role === 'super_admin'

    const {
        isLoading,
        error,
        data: admin,
        deActivateAdmin,
        toast,
        setPage,
        setSize,
        page,
        size,
    } = useAdmins()

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        isActive: { value: null, matchMode: FilterMatchMode.EQUALS },
    })

    const columns = [
        { field: 'id', header: 'Id' },
        { field: 'userId', header: 'User Id' },
        { field: 'firstName', header: 'First Name' },
        { field: 'lastName', header: 'Last Name' },
        { field: 'email', header: 'Email' },
        { field: 'roleId', header: 'Role Id' },
        { field: 'roleName', header: 'Role Name' },
        {
            field: 'isActive',
            header: 'Status',
            body: (rowData: Admin) =>
                rowData.isActive ? 'Active' : 'InActive',
            filterElement: (options: any) => (
                <div className="flex items-center gap-2">
                    <MultiStateCheckbox
                        value={options.value}
                        options={[
                            {
                                value: null,
                                icon: <X className="text-text" />,
                                tooltip: 'All',
                            },
                            {
                                value: true,
                                icon: <Check className="text-text" />,
                                tooltip: 'Active',
                            },
                            {
                                value: false,
                                icon: <Ban className="text-text" />,
                                tooltip: 'Inactive',
                            },
                        ]}
                        optionValue="value"
                        optionIcon="icon"
                        onChange={(e) => options.filterApplyCallback(e.value)}
                        className="custom-checkbox"
                        tooltip={
                            options.value === null
                                ? 'All'
                                : options.value
                                  ? 'Active'
                                  : 'Inactive'
                        }
                        tooltipOptions={{ position: 'top' }}
                    />
                </div>
            ),
        },
    ]

    const ActionButtons = (rowData: Admin) => (
        <div className="mr-4 flex justify-end gap-4">
            {isSuperAdmin && (
                <>
                    {rowData.userId !== -1 && rowData.isActive ? (
                        <DeActivate
                            handleOnClick={() =>
                                deActivateAdmin.mutate(rowData.id)
                            }
                            fn={deActivateAdmin}
                            rowData={rowData}
                        />
                    ) : null}
                    <Update rowData={rowData} />
                </>
            )}
        </div>
    )

    return (
        <DataTableComponent
            data={admin || []}
            columns={columns}
            globalFilterFields={['firstName', 'lastName', 'userId']}
            isLoading={isLoading}
            error={error}
            filters={filters}
            setFilters={setFilters}
            page={page}
            setPage={setPage}
            size={size}
            setSize={setSize}
            actionButtons={ActionButtons}
        />
    )
}
