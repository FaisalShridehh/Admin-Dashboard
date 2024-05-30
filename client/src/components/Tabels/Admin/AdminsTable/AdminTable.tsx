import { useState } from 'react'
import { FilterMatchMode } from 'primereact/api'
import { useAdmins } from '@/hooks/useAdmins'
import { useAuth } from '@/hooks/useAuth'

import { Admin } from '@/types/models/AdminTypes/AdminTypes'
import { MultiStateCheckbox } from 'primereact/multistatecheckbox'
import { Ban, Check, X } from 'lucide-react'
import { DataTableFilterMeta } from 'primereact/datatable'
import { AdminTabCellAction } from '../../../AdminTabCellAction/AdminTabCellAction'
import AdminDataTable from '../DataTable/DataTable'
import CreateAdmin from '@/components/Create/Create'
import { InputText } from 'primereact/inputtext'

export default function AdminTable() {
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('')

    const { user } = useAuth()
    const isSuperAdmin = user?.role === 'super_admin'

    const {
        isLoading,
        error,
        data: admin,
        // deActivateAdmin,
        // toast,
        setPage,
        setSize,
        page,
        size,
    } = useAdmins()

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        isActive: { value: null, matchMode: FilterMatchMode.EQUALS },
    })

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFilters((prevFilters) => ({
            ...prevFilters,
            global: { ...prevFilters.global, value },
        }))
        setGlobalFilterValue(value)
    }
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
            filterElement: (options: {
                value: null
                filterApplyCallback: (arg0: unknown) => void
            }) => (
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
            body: (rowData: { isActive: unknown }) =>
                rowData.isActive ? 'Active' : 'Inactive',
            dataType: 'boolean',
        },
    ]

    const AdminActionButtons = (rowData: Admin) => (
        <div className="mr-4 flex justify-end gap-4">
            {isSuperAdmin && (
                <>
                    <AdminTabCellAction data={rowData} />
                </>
            )}
        </div>
    )

    const renderHeader = () => (
        <div className="flex items-center justify-between">
            <CreateAdmin />
            <InputText
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                placeholder="Search"
            />
        </div>
    )

    return (
        <AdminDataTable
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
            AdminActionButtons={AdminActionButtons}
            // toastRef={toast}
            renderHeader={renderHeader}
        />
    )
}
