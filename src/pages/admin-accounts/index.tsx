import { cn } from "@/libs/cn"
import { Fragment, useState } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useGetAdmins } from "@/services/hooks/queries/useAdmins"
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core"
import { CreateAdminAccountModal } from "@/components/pages/admin-accounts"
import { AdminStatus, FetchedAdminCountType, FetchedAdminType } from "@/types/admin"
import { useDebounce } from "@/hooks/useDebounce"
import { setPaginationParams } from "@/hooks/usePaginationParams"
import { useSearchParams } from "react-router"
import { Loader } from "@/components/core/Button/Loader"

export const AdminAccountsPage: React.FC = () => {

    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [searchParams, setSearchParams] = useSearchParams()
    const [createAdmin, setCreateAdmin] = useState(false)
    const { value, onChangeHandler } = useDebounce(300)
    const { data, isLoading } = useGetAdmins<FetchedAdminType[]>({ q: value, page: page.toString(), item_per_page: itemsPerPage.toString() })
    const { data: adminsCount, isLoading: loadingAdminsCount } = useGetAdmins<FetchedAdminCountType>({ component: "count", q: value })

    const columns = [
        {
            header: () => "Admin Name",
            accessorKey: "name",
        },
        {
            header: () => "Email",
            accessorKey: "email",
        },
        {
            header: () => "Gender",
            accessorKey: "gender",
            cell: ({ row }: { row: any }) => {
                const item = row.original as FetchedAdminType
                return (
                    <div className="capitalize">{item.gender}</div>
                )
            }
        },
        {
            header: () => "Permissions",
            accessorKey: "permissions",
            cell: ({ row }: { row: any }) => {
                const item = row.original as FetchedAdminType
                return (
                    <div className="capitalize">{item.permission.join(", ")}</div>
                )
            }
        },
        {
            header: () => "Status",
            accessorKey: "status",
            cell: ({ row }: { row: any }) => {
                const item = row.original as FetchedAdminType
                return (
                    <div className={cn("font-semibold capitalize", item.status === 0 ? "text-semantics-amber" : "", item.status === 1 ? "text-green-base" : "", item.status === 2 ? "text-accent-primary" : "")}>{AdminStatus[item.status]}</div>
                )
            }
        },
        {
            header: () => "Action",
            accessorKey: "action",
            cell: ({ row }: { row: any }) => {
                const item = row.original as FetchedAdminType
                return (
                    <Fragment>
                        <RenderIf condition={item.status === 1}>
                            <button type="button">Suspend</button>
                        </RenderIf>
                        <RenderIf condition={item.status === 2}>
                            <button type="button">Activate</button>
                        </RenderIf>
                    </Fragment>
                )
            }
        },
    ];

    const handlePageChange = (page: number) => {
        // in a real page, this function would paginate the data from the backend
        setPage(page)
        setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };
    
    return (
        <div className="flex flex-col gap-5 px-4 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
            <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                <div className="flex-1 md:max-w-96">
                    <SearchInput placeholder="Search admin name" onChange={onChangeHandler} />
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
            <RenderIf condition={!isLoading && !loadingAdminsCount}>
                <Table
                    columns={columns}
                    data={data ?? []}
                    page={page}
                    perPage={itemsPerPage}
                    totalCount={adminsCount?.total}
                    onPageChange={handlePageChange}
                    emptyStateText="We couldn't find any admin."
                />
            </RenderIf>
            <RenderIf condition={isLoading || loadingAdminsCount}>
                <div className="flex w-full h-96 items-center justify-center">
                    <Loader className="spinner size-6 text-green-1" />
                </div>
            </RenderIf>
            <CreateAdminAccountModal isOpen={createAdmin} onClose={() => setCreateAdmin(false)} />
        </div>
    )
}