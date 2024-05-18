import React, { useState } from 'react'
import 'primeicons/primeicons.css'
import { FilterMatchMode } from 'primereact/api'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import 'primereact/resources/primereact.css'
import { useEndUsers } from '@/hooks/useEndUsers'

import { Toast } from 'primereact/toast'
import Update from '../UpdateButton/Update'
import Delete from '../Delete/Delete'

interface EndUser {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    phoneNumber: string
    password: string
    roleId: number
    roleName: string
    isActive: boolean
}

export default function Table() {
    const { isLoading, error, data, deleteEndUser, toast } = useEndUsers()
    // const [customers, setCustomers] = useState<Customer[]>([])
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    })
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('')

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const _filters = { ...filters }

        _filters.global.value = value

        setFilters(_filters)
        setGlobalFilterValue(value)
    }

    if (isLoading) return <p>Loading...</p>

    if (error) return <p>An error has occurred: {error.message}</p>

    const renderHeader = () => {
        return (
            <div className="flex justify-end">
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Search"
                />
            </div>
        )
    }
    const ActionButtons = (rowData: EndUser) => {
        function handleOnClick() {
            deleteEndUser.mutate(rowData.id)
        }
        return (
            <div className="mr-4 flex justify-end gap-4">
                <Delete
                    handleOnClick={handleOnClick}
                    fn={deleteEndUser}
                    rowData={rowData}
                />
                {/* <Button
                    className="bg-red-500 px-3 py-5"
                    onClick={() => deleteEndUser.mutate(rowData.id)}
                    disabled={deleteEndUser.isPending}

                    // onClick={() => deleteUser.mutateAsync()}
                >
                    {deleteEndUser.isPending ? 'Deleting...' : 'Delete'}
                </Button> */}
                <Update rowData={rowData} />
            </div>
        )
    }

    return (
        <div className="card h-[calc(100vh-75px)] overflow-x-hidden   ">
            <Toast ref={toast} />

            <DataTable
                value={data}
                tableStyle={{ minWidth: '50rem' }}
                scrollable
                scrollHeight="100%"
                className=" "
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                header={renderHeader}
                // size={"small"}
                // pt={}
                filters={filters}
                // filterDisplay="row"
                loading={isLoading}
                globalFilterFields={['username', 'id']}
            >
                <Column field="id" header="Id" style={{ width: '5%' }}></Column>
                <Column
                    field="username"
                    header="Name"
                    style={{ width: '15%' }}
                ></Column>
                <Column
                    field="email"
                    header="Email"
                    style={{ width: '25%' }}
                ></Column>
                <Column
                    field="phoneNumber"
                    header="Phone Number"
                    style={{ width: '10%' }}
                ></Column>
                <Column
                    field="roleId"
                    header="Role Id"
                    style={{ width: '10%' }}
                ></Column>
                <Column
                    field="roleName"
                    header="Role Name"
                    style={{ width: '10%' }}
                ></Column>
                <Column
                    field="isActive"
                    header="Status"
                    style={{ width: '10%' }}
                ></Column>
                <Column
                    // field="button"
                    body={ActionButtons}
                    header="buttons"
                    style={{ width: '10%' }}
                ></Column>
            </DataTable>
        </div>
    )
}
