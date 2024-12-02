import { cn } from "@/libs/cn"
import { useState } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useGetAdmins } from "@/services/hooks/queries/useAdmins"
import { SearchInput, Table, TableAction } from "@/components/core"
import { CreateAdminAccountModal } from "@/components/pages/admin-accounts"

export const AdminAccountsPage: React.FC = () => {

    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [createAdmin, setCreateAdmin] = useState(false)
    const { data, isLoading } = useGetAdmins<any[]>({})
    const { data: adminsCount, isLoading: loadingAdminsCount } = useGetAdmins({ component: "count" })

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
        // setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };
    
    return (
        <div className="flex flex-col gap-5 px-4 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
            <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                <div className="flex-1 md:max-w-96">
                    <SearchInput placeholder="Search admin name" />
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <TableAction theme="grey" block>
                        Export
                        <Icon icon="lucide:cloud-download" className="size-4 text-accent-primary" />
                    </TableAction>
                    <TableAction type="button" theme="primary" onClick={() => setCreateAdmin(true)} block>
                        <Icon icon="lucide:plus" className="size-4" />
                        Add Admin
                    </TableAction>
                </div>
            </div>
            <div>
                <Table
                    columns={columns}
                    data={data ?? []}
                    page={page}
                    perPage={itemsPerPage}
                    totalCount={sampleData.length}
                    onPageChange={handlePageChange}
                    emptyStateText="We couldn't find any admin."
                />
            </div>
            <CreateAdminAccountModal isOpen={createAdmin} onClose={() => setCreateAdmin(false)} />
        </div>
    )
}