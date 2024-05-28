import React, { useState } from 'react'
import 'primeicons/primeicons.css'
import { FilterMatchMode } from 'primereact/api'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import 'primereact/resources/primereact.css'

import { Toast } from 'primereact/toast'
import { useFinancial } from '@/hooks/useFinancial'

export default function FinancialTable() {
    const { isLoading, error, data, toast } = useFinancial()
    console.log(data)
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
            <div className="flex justify-between items-center">
                {/* <Create/> */}
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Search"
                />
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
                    field="statement"
                    header="Statement"
                    style={{ width: '10%' }}
                ></Column>
                <Column
                    field="amount"
                    header="Amount"
                    style={{ width: '5%' }}
                ></Column>
                <Column
                    field="date"
                    header="Date"
                    style={{ width: '10%' }}
                ></Column>
                <Column
                    field="paymentType"
                    header="Payment Type"
                    style={{ width: '10%' }}
                ></Column>
                <Column
                    field="comment"
                    header="Comment"
                    style={{ width: '10%' }}
                ></Column>
                <Column
                    field="type"
                    header="type"
                    style={{ width: '10%' }}
                ></Column>
                <Column
                    field="orderId"
                    header="Order Id"
                    style={{ width: '5%' }}
                ></Column>
            </DataTable>
        </div>
    )
}
