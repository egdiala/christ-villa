import { SearchInput, Table, TableAction } from "@/components/core"
import { ConnectGroupFilter, AddGroupMemberModal, EditConnectGroupModal } from "@/components/pages/connect-groups"
import { cn } from "@/libs/cn"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"
import { useNavigate } from "react-router"

export const ConnectGroupPage: React.FC = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [toggleModals, setToggleModals] = useState({
        openAddMember: false,
        openEditGroup: false
    })

    const sampleData = [
        {
            name: "Project Alpha",
            description: "A cutting-edge AI research project.",
            members: 12,
            status: "Active",
        },
        {
            name: "Marketing Campaign X",
            description: "A digital marketing initiative for Q4.",
            members: 8,
            status: "Suspended",
        },
        {
            name: "Website Redesign",
            description: "Overhaul the company website for better UX.",
            members: 5,
            status: "Active",
        },
    ];

    const columns = [
        {
            header: () => "Name",
            accessorKey: "name",
        },
        {
            header: () => "Reg. Date & Time",
            accessorKey: "createdAt",
        },
        {
            header: () => "Gender",
            accessorKey: "gender",
        },
        {
            header: () => "Role",
            accessorKey: "role",
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
        {
            header: () => "Action",
            accessorKey: "action",
        },
    ];

    const handlePageChange = (page: number) => {
        // in a real page, this function would paginate the data from the backend
        setPage(page)
        // setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };
    
    const requestCards = [
        { label: "Members", value: "23", icon: "lucide:users" },
        { label: "HODs", value: "2", icon: "lucide:life-buoy" },
    ]
    return (
        <div className="flex flex-col gap-5 px-4 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
            <div className="flex items-center gap-3 justify-between">
                <h1 className="font-bold text-xl text-text-primary">Technology Connect Group</h1>
                <div className="flex items-center gap-2">
                    <TableAction theme="ghost" className="group">
                        <Icon icon="lucide:trash" className="group-hover:text-white text-accent-primary size-4" />
                        <span className="group-hover:text-white text-accent-primary">Delete Group</span>
                    </TableAction>
                    <TableAction type="button" theme="grey" className="group" onClick={() => setToggleModals((prev) => ({ ...prev, openEditGroup: true }))}>
                        <Icon icon="lucide:pen" className="size-4" />
                        Edit Group
                    </TableAction>
                    <TableAction theme="grey" className="group">
                        <Icon icon="lucide:ban" className="size-4" />
                        Suspend Group
                    </TableAction>
                    <TableAction type="button" theme="primary" onClick={() => setToggleModals((prev) => ({ ...prev, openAddMember: true }))} block>
                        <Icon icon="lucide:plus" className="size-4" />
                        Add Member
                    </TableAction>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
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
                    <SearchInput placeholder="Search member name" />
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <ConnectGroupFilter setFilters={undefined} isLoading={false} />
                    <TableAction theme="grey" block>
                        Export
                        <Icon icon="lucide:cloud-download" className="size-4 text-accent-primary" />
                    </TableAction>
                </div>
            </div>
            <div>
                <Table
                    columns={columns}
                    data={sampleData}
                    page={page}
                    perPage={itemsPerPage}
                    totalCount={sampleData.length}
                    onPageChange={handlePageChange}
                    onClick={() => navigate("/connect-groups/1")}
                    emptyStateText="We couldn't find any connect groups."
                />
            </div>
            <EditConnectGroupModal isOpen={toggleModals.openEditGroup} onClose={() => setToggleModals((prev) => ({ ...prev, openEditGroup: false }))} />
            <AddGroupMemberModal isOpen={toggleModals.openAddMember} onClose={() => setToggleModals((prev) => ({ ...prev, openAddMember: false }))} />
        </div>
    )
}