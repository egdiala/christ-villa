import { SearchInput, Table, TableAction } from "@/components/core"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"

export const RequestsPage: React.FC = () => {
    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)

    const columns = [
        {
            header: () => "Requester Name",
            accessorKey: "requester_name",
        },
        {
            header: () => "Request Date & Time",
            accessorKey: "createdAt",
        },
        {
            header: () => "Request type",
            accessorKey: "request_type",
        },
        {
            header: () => "Department",
            accessorKey: "department",
        },
        {
            header: () => "Status",
            accessorKey: "status",
        },
        {
            header: () => "Actions",
            accessorKey: "actions",
        },
    ];

    const handlePageChange = (page: number) => {
        // in a real page, this function would paginate the data from the backend
        setPage(page)
        // setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };
    
    const requestCards = [
        { label: "Total requests", value: "340" },
        { label: "Pending requests", value: "23" },
        { label: "Completed requests", value: "23" },
        { label: "Rejected requests", value: "23" },
    ]
    return (
        <div className="flex flex-col gap-5 px-4 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
                {
                    requestCards.map((item, index) => 
                        <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-light-blue-4">
                            <div className="grid place-content-center rounded-full size-12 bg-light-blue-3">
                                <Icon icon="lucide:life-buoy" className="size-6 text-text-secondary" />
                            </div>
                            <div className="grid gap-1">
                                <h1 className="text-sm text-text-secondary">{item.label}</h1>
                                <p className="text-2xl text-text-primary">{item.value}</p>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="flex items-center justify-between">
                <div className="flex-1 md:max-w-96">
                    <SearchInput placeholder="Search requester name" />
                </div>
                
                <div className="flex items-center gap-4">
                    <TableAction theme="grey">
                        Date
                        <Icon icon="lucide:chevron-down" className="size-4 text-accent-primary" />
                    </TableAction>
                    <TableAction theme="grey">
                        Filter
                        <Icon icon="lucide:chevron-down" className="size-4 text-accent-primary" />
                    </TableAction>
                    <TableAction theme="grey">
                        Export
                        <Icon icon="lucide:cloud-download" className="size-4 text-accent-primary" />
                    </TableAction>
                </div>
            </div>
            <div>
                <Table
                    columns={columns}
                    data={[]}
                    page={page}
                    perPage={itemsPerPage}
                    totalCount={0}
                    onPageChange={handlePageChange}
                    emptyStateText="We couldn't find any request."
                />
            </div>
        </div>
    )
}