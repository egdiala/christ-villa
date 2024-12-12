import { cn } from "@/libs/cn"
import { Fragment, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Loader } from "@/components/core/Button/Loader"
import { useGetConnectGroup } from "@/services/hooks/queries"
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core"
import type { FetchedConnectGroupCountStatusType } from "@/types/connect-group"
import { Menu, MenuButton, MenuHeading, MenuItem, MenuItems, MenuSection } from '@headlessui/react'
import { ConnectGroupFilter, EditConnectGroupModal, DeleteConnectGroupModal, RemoveMemberModal } from "@/components/pages/connect-groups"

export const ConnectGroupPage: React.FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const { data, isLoading } = useGetConnectGroup<FetchedConnectGroupCountStatusType>({ id: id as string, component: "count-status" })
    const [toggleModals, setToggleModals] = useState({
        openEditGroup: false,
        openDeleteGroup: false,
        openRemoveMember: false
    })

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
            cell: () => {
                return (
                    <div className="text-right">
                        <Menu>
                            <MenuButton type="button" className="group p-2 grid place-content-center rounded-lg bg-red-5 hover:bg-red-2 transition-colors duration-300 ease-out"><Icon icon="lucide:ellipsis" className="group-hover:text-white text-text-secondary size-4" /></MenuButton>
                            <MenuItems transition anchor="bottom end" className="w-52 origin-top-right rounded-xl bg-white px-2.5 py-3.5 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
                                <MenuSection className="space-y-4">
                                    <MenuHeading as="h1" className="font-semibold text-base text-grey-dark-1">Actions</MenuHeading>
                                    <div className="grid gap-1">
                                        <MenuItem as="button" type="button" className="flex items-center w-full rounded hover:bg-red-5 px-2 py-1.5 text-sm/6 text-text-secondary">
                                            Approve
                                        </MenuItem>
                                        <MenuItem as="button" type="button" className="flex items-center w-full rounded hover:bg-red-5 px-2 py-1.5 text-sm/6 text-text-secondary" onClick={() => setToggleModals((prev) => ({ ...prev, openRemoveMember: true }))}>
                                            Remove
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
        // setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };
    
    const requestCards = useMemo(() => {
        return [
            { label: "Members", value: data?.total_member, icon: "lucide:users" },
            { label: "HODs", value: data?.total_admin, icon: "lucide:life-buoy" },
        ]
    },[data?.total_admin, data?.total_member])
    return (
        <Fragment>
            <RenderIf condition={!isLoading}>
                <div className="flex flex-col gap-5 px-4 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
                        <h1 className="font-bold text-xl text-text-primary capitalize">{data?.name}</h1>
                        <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <TableAction type="button" theme="ghost" className="group" onClick={() => setToggleModals((prev) => ({ ...prev, openDeleteGroup: true }))} block>
                                    <Icon icon="lucide:trash" className="group-hover:text-white text-accent-primary size-4" />
                                    <span className="group-hover:text-white text-accent-primary">Delete Group</span>
                                </TableAction>
                                <TableAction type="button" theme="grey" className="group" onClick={() => setToggleModals((prev) => ({ ...prev, openEditGroup: true }))} block>
                                    <Icon icon="lucide:pen" className="size-4" />
                                    Edit Group
                                </TableAction>
                            </div>
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
                            data={[]}
                            page={page}
                            perPage={itemsPerPage}
                            totalCount={0}
                            onPageChange={handlePageChange}
                            onClick={() => navigate("/connect-groups/1")}
                            emptyStateText="We couldn't find any member."
                        />
                    </div>
                    <RemoveMemberModal isOpen={toggleModals.openRemoveMember} onClose={() => setToggleModals((prev) => ({ ...prev, openRemoveMember: false }))} />
                    <DeleteConnectGroupModal isOpen={toggleModals.openDeleteGroup} connectGroup={data!} onClose={() => setToggleModals((prev) => ({ ...prev, openDeleteGroup: false }))} />
                    <EditConnectGroupModal isOpen={toggleModals.openEditGroup} connectGroup={data!} onClose={() => setToggleModals((prev) => ({ ...prev, openEditGroup: false }))} />
                </div>
            </RenderIf>
            <RenderIf condition={isLoading}>
                <div className="flex w-full h-96 items-center justify-center">
                    <Loader className="spinner size-6 text-accent-primary" />
                </div>
            </RenderIf>
        </Fragment>
    )
}