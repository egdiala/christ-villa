import { RenderIf, SearchInput, Table, TableAction } from "@/components/core"
import { Loader } from "@/components/core/Button/Loader"
import { DateFilter, RequestsFilter } from "@/components/pages/requests"
import { useGetRequests } from "@/services/hooks/queries"
import { RequestStatus, type FetchedRequestCountStatusType, type FetchedRequestCountType, type FetchedRequestType } from "@/types/requests"
import { Icon } from "@iconify/react/dist/iconify.js"
import { format } from "date-fns"
import { useMemo, useState } from "react"

export const RequestsPage: React.FC = () => {
    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const { data: requests, isLoading } = useGetRequests<FetchedRequestType[]>({ page: page.toString(), item_per_page: itemsPerPage.toString() }) 
    const { data: requestsCount, isLoading: isLoadingCount } = useGetRequests<FetchedRequestCountType>({ component: "count" }) 
    const { data: requestsCountStatus } = useGetRequests<FetchedRequestCountStatusType>({ component: "count-status" }) 

    const columns = [
        {
            header: () => "Requester Name",
            accessorKey: "user_data.name",
            cell: ({ row }: { row: any }) => {
                const item = row.original as FetchedRequestType
                return (
                    <div className="capitalize">{item.user_data.name}</div>
                )
            }
        },
        {
            header: () => "Request Date & Time",
            accessorKey: "createdAt",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedRequestType
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">
                        <span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
                )
            }
        },
        {
            header: () => "Request type",
            accessorKey: "request_type",
            cell: ({ row }: { row: any }) => {
                const item = row.original as FetchedRequestType
                return (
                    <div className="capitalize">{item?.request_type?.replace(/_/g, " ") || item?.request_area?.replace(/_/g, " ")}</div>
                )
            }
        },
        {
            header: () => "Department",
            accessorKey: "department",
        },
        {
            header: () => "Status",
            accessorKey: "status",
            cell: ({ row }: { row: any }) => {
                const item = row.original as FetchedRequestType
                return (
                    <div className="capitalize">{RequestStatus[item?.status]}</div>
                )
            }
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
    
    const requestCards = useMemo(() => {
        return [
            { label: "Total requests", value: requestsCountStatus?.total_count || 0 },
            { label: "Pending requests", value: requestsCountStatus?.pending_req || 0 },
            { label: "Approved requests", value: requestsCountStatus?.approve_req || 0 },
            { label: "Rejected requests", value: requestsCountStatus?.decline_req || 0 },
        ]
    },[requestsCountStatus?.total_count, requestsCountStatus?.pending_req, requestsCountStatus?.approve_req, requestsCountStatus?.decline_req])
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
            <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                <div className="flex-1 md:max-w-96">
                    <SearchInput placeholder="Search requester name" />
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <DateFilter theme="grey" setFilters={undefined} isLoading={false} />
                    <RequestsFilter theme="grey" setFilters={undefined} isLoading={false} />
                    <TableAction theme="grey" block>
                        Export
                        <Icon icon="lucide:cloud-download" className="size-4 text-accent-primary" />
                    </TableAction>
                </div>
            </div>
            <RenderIf condition={!isLoading && !isLoadingCount}>
                <Table
                    columns={columns}
                    data={requests ?? []}
                    page={page}
                    perPage={itemsPerPage}
                    totalCount={requestsCount?.total}
                    onPageChange={handlePageChange}
                    emptyStateText="We couldn't find any request."
                />
            </RenderIf>
            <RenderIf condition={isLoading || isLoadingCount}>
                <div className="flex w-full h-96 items-center justify-center">
                    <Loader className="spinner size-6 text-accent-primary" />
                </div>
            </RenderIf>
        </div>
    )
}