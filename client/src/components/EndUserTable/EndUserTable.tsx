import { useState } from 'react'
import 'primeicons/primeicons.css'
import { FilterMatchMode } from 'primereact/api'

import 'primereact/resources/primereact.css'
import { useEndUsers } from '@/hooks/useEndUsers'

import Update from '../UpdateButton/Update'
import DataTableComponent from '../DataTable/DataTable'
import { MultiStateCheckbox } from 'primereact/multistatecheckbox'
import { useAuth } from '@/hooks/useAuth'
import { EndUser } from '@/types/models/EndUsersTypes/endUsersTypes'
import { DataTableFilterMeta } from 'primereact/datatable'
import { Ban, Check, X } from 'lucide-react'

export default function EndUserTable() {
    const { user } = useAuth()
    const isSuperAdmin = user?.role === 'super_admin' // Assuming 'admin' is the role for admins

    const {
        isLoading,
        error,
        data,
        deleteEndUser,
        toast,
        page,
        setPage,
        size,
        setSize,
    } = useEndUsers()
    console.log(data);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        isActive: { value: null, matchMode: FilterMatchMode.EQUALS },
    })

    const statusOptions = [
        { value: null, icon: <X className="text-text" />, tooltip: 'All' },
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
    ]

    const columns = [
        { field: 'id', header: 'Id', style: { width: 'fit-content' } },
        // { field: 'username', header: 'User Name', style: { width: 'fit-content' } },
        {
            field: 'firstName',
            header: 'First Name',
            style: { width: 'fit-content' },
        },
        {
            field: 'lastName',
            header: 'Last Name',
            style: { width: 'fit-content' },
        },
        { field: 'email', header: 'Email', style: { width: 'fit-content' } },
        { field: 'roleId', header: 'Role Id', style: { width: 'fit-content' } },
        {
            field: 'roleName',
            header: 'Role Name',
            style: { width: 'fit-content' },
        },
        {
            field: 'isActive',
            header: 'Status',
            filterElement: (options) => (
                <div className="flex items-center gap-2">
                    <MultiStateCheckbox
                        value={options.value}
                        options={statusOptions}
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
            filter: true,
            style: { width: 'fit-content' },
            body: (rowData) => (rowData.isActive ? 'Active' : 'Inactive'),
            dataType: 'boolean',
        },
    ]

    const actionButtons = (rowData: EndUser) => (
        <div className="mr-4 flex justify-end gap-4">
            {isSuperAdmin && (
                <>
                    {rowData.userId !== -1 && rowData.isActive ? (
                        // <DeActivate
                        // handleOnClick={}
                        // fn={deActivateAdmin}
                        // rowData={rowData}
                        // />
                        <></>
                    ) : null}
                    <Update rowData={rowData} />
                </>
            )}
        </div>
    )

    return (
        <DataTableComponent
            data={data || []}
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
            actionButtons={actionButtons}
            // toastRef={toast}
        />
    )
}
