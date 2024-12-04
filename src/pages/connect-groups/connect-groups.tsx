import { cn } from "@/libs/cn"
import { useEffect, useState } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useGetConnectGroups } from "@/services/hooks/queries"
import { SearchInput, Table, TableAction } from "@/components/core"
import { useLocation, useNavigate, useSearchParams } from "react-router"
import { CreateConnectGroupModal } from "@/components/pages/connect-groups"
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams"

export const ConnectGroupsPage: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [createGroup, setCreateGroup] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const { data } = useGetConnectGroups<any[]>({})
    const { data: count } = useGetConnectGroups<any>({ component: "count" })

    const columns = [
        {
            header: () => "Name",
            accessorKey: "name",
        },
        {
            header: () => "Description",
            accessorKey: "description",
        },
        {
            header: () => "Members",
            accessorKey: "members",
        },
        {
            header: () => "Status",
            accessorKey: "status",
            cell: ({ row }: { row: any }) => {
                const item = row?.original;
                return (
                    <span className={cn(item?.status?.toLowerCase() === "active" ? "text-green-base" : "text-accent-primary", "font-medium text-sm")}>{item?.status}</span>
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
    
    const requestCards = [
        { label: "Total Connect Groups", value: "340", icon: "lucide:life-buoy" },
        { label: "Members", value: "23", icon: "lucide:users" },
        { label: "Head of Group", value: "23", icon: "lucide:users" },
    ]
    return (
        <div className="flex flex-col gap-5 px-4 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                {
                    requestCards.map((item, index) => 
                        <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-light-blue-4">
                            <div className="grid place-content-center rounded-full size-12 bg-light-blue-3">
                                <Icon icon={item.icon} className="size-6 text-text-secondary" />
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
                    <SearchInput placeholder="Search connect group name" />
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <TableAction theme="grey" block>
                        Export
                        <Icon icon="lucide:cloud-download" className="size-4 text-accent-primary" />
                    </TableAction>
                    <TableAction type="button" theme="primary" onClick={() => setCreateGroup(true)} block>
                        <Icon icon="lucide:plus" className="size-4" />
                        Add New Group
                    </TableAction>
                </div>
            </div>
            <div>
                <Table
                    columns={columns}
                    data={data ?? []}
                    page={page}
                    perPage={itemsPerPage}
                    totalCount={count?.total}
                    onPageChange={handlePageChange}
                    onClick={() => navigate("/connect-groups/1")}
                    emptyStateText="We couldn't find any connect groups."
                />
            </div>
            <CreateConnectGroupModal isOpen={createGroup} onClose={() => setCreateGroup(false)} />
        </div>
    )
}