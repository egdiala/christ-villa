import { useEffect, useMemo, useState } from "react"
import { cn } from "@/libs/cn"
import { format } from "date-fns"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Loader } from "@/components/core/Button/Loader"
import { useGetRequests } from "@/services/hooks/queries"
import { useLocation, useSearchParams } from "react-router"
import { RenderIf, Table, TableAction } from "@/components/core"
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams"
import { Menu, MenuButton, MenuHeading, MenuItem, MenuItems, MenuSection } from '@headlessui/react'
import { DateFilter, RequestsFilter, UpdateRequestStatusModal, ViewRequestModal } from "@/components/pages/requests"
import { RequestStatus, type FetchedRequestCountStatusType, type FetchedRequestCountType, type FetchedRequestType } from "@/types/requests"

export const RequestsPage: React.FC = () => {
    const location = useLocation()
    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [searchParams, setSearchParams] = useSearchParams()
    const [requestFilters, setRequestFilters] = useState({})
    const [dateFilters, setDateFilters] = useState({})
    const { data: requests, isLoading } = useGetRequests<FetchedRequestType[]>({ page: page.toString(), item_per_page: itemsPerPage.toString(), ...requestFilters, ...dateFilters }) 
    const { data: requestsCount, isLoading: isLoadingCount } = useGetRequests<FetchedRequestCountType>({ component: "count", ...requestFilters, ...dateFilters }) 
    const { data: requestsCountStatus } = useGetRequests<FetchedRequestCountStatusType>({ component: "count-status" }) 
    const [toggleModals, setToggleModals] = useState({
        openRequestStatusModal: false,
        openViewRequestModal: false,
        activeRequest: null as FetchedRequestType | null
    })

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
            cell: ({ row }: { row: any }) => {
                const item = row.original as FetchedRequestType
                return (
                    <div className="capitalize">{item?.department || "-"}</div>
                )
            }
        },
        {
            header: () => "Status",
            accessorKey: "status",
            cell: ({ row }: { row: any }) => {
                const item = row.original as FetchedRequestType
                return (
                    <div className={cn("capitalize", item?.status === 0 ? "text-amber" : "", item?.status === 1 ? "text-green-base" : "", item?.status === 2 ? "text-accent-primary" : "")}>{RequestStatus[item?.status]}</div>
                )
            }
        },
        {
            header: () => "Actions",
            accessorKey: "actions",
            cell: ({ row }: { row: any }) => {
                const item = row.original as FetchedRequestType
                return (
                    <div className="text-right">
                        <Menu>
                            <MenuButton type="button" className="group p-2 grid place-content-center rounded-lg bg-red-5 hover:bg-red-2 transition-colors duration-300 ease-out"><Icon icon="lucide:ellipsis" className="group-hover:text-white text-text-secondary size-4" /></MenuButton>
                            <MenuItems transition anchor="bottom end" className="w-52 origin-top-right rounded-xl bg-white px-2.5 py-3.5 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
                                <MenuSection className="space-y-4">
                                    <MenuHeading as="h1" className="font-semibold text-base text-grey-dark-1">Actions</MenuHeading>
                                    <div className="grid gap-1">
                                        <MenuItem as="button" type="button" className="flex items-center w-full rounded hover:bg-red-5 px-2 py-1.5 text-sm/6 text-text-secondary" onClick={() => setToggleModals((prev) => ({ ...prev, openViewRequestModal: true, activeRequest: item }))}>
                                            View
                                        </MenuItem>
                                        <MenuItem as="button" type="button" className="flex items-center w-full rounded hover:bg-red-5 px-2 py-1.5 text-sm/6 text-text-secondary" onClick={() => setToggleModals((prev) => ({ ...prev, openRequestStatusModal: true, activeRequest: item }))}>
                                            Update Status
                                        </MenuItem>
                                    </div>
                                </MenuSection>
                            </MenuItems>
                        </Menu>
                    </div>
                )
            }
        },
    ];

    const handlePageChange = (page: number) => {
        // in a real page, this function would paginate the data from the backend
        setPage(page)
        setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };
    
    useEffect(() => {
        getPaginationParams(location, setPage, () => {})
    }, [location, setPage])
    
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
            <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-end">
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <DateFilter theme="grey" setFilters={setDateFilters} isLoading={isLoading} />
                    <RequestsFilter theme="grey" setFilters={setRequestFilters} isLoading={isLoading} />
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
            <ViewRequestModal activeRequest={toggleModals.activeRequest!} isOpen={toggleModals.openViewRequestModal} onClose={() => setToggleModals((prev) => ({ ...prev, openViewRequestModal: false, activeRequest: null }))} />
            <UpdateRequestStatusModal activeRequest={toggleModals.activeRequest!} isOpen={toggleModals.openRequestStatusModal} onClose={() => setToggleModals((prev) => ({ ...prev, openRequestStatusModal: false, activeRequest: null }))} />
        </div>
    )
}