import { format } from "date-fns"
import { Icon } from "@iconify/react/dist/iconify.js"
import { FetchedAdminCountType } from "@/types/admin"
import type { FetchedSermonType } from "@/types/sermon"
import { useCallback, useEffect, useState } from "react"
import { Loader } from "@/components/core/Button/Loader"
import { useLocation, useSearchParams } from "react-router"
import { useGetSermonNotes } from "@/services/hooks/queries"
import { RenderIf, Table, TableAction } from "@/components/core"
import { AdminsFilter } from "@/components/pages/admin-accounts"
import { CreateSermonModal, DeleteSermonModal, EditSermonModal } from "@/components/pages/sermon-notes"
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams"
import { Menu, MenuButton, MenuHeading, MenuItem, MenuItems, MenuSection } from "@headlessui/react"

export const SermonNotesPage: React.FC = () => {
    const location = useLocation()
    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [filters, setFilters] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()
    const { data, isLoading } = useGetSermonNotes<FetchedSermonType[]>({ ...filters, page: page.toString(), item_per_page: itemsPerPage.toString() })
    const { data: adminsCount, isLoading: loadingSermonsCount } = useGetSermonNotes<FetchedAdminCountType>({ component: "count", ...filters })
    const [toggleModals, setToggleModals] = useState({
        openCreateSermon: false,
        openEditSermon: false,
        openDeleteSermon: false,
        activeSermon: null as FetchedSermonType | null
    })

    const toggleEditSermon = useCallback((item: FetchedSermonType | null) => {
        setToggleModals((prev) => ({
            ...prev,
            activeSermon: item,
            openEditSermon: !toggleModals.openEditSermon,
        }))
    }, [toggleModals.openEditSermon])

    const toggleDeleteSermon = useCallback((item: FetchedSermonType | null) => {
        setToggleModals((prev) => ({
            ...prev,
            activeSermon: item,
            openDeleteSermon: !toggleModals.openDeleteSermon,
        }))
    }, [toggleModals.openDeleteSermon])

    const columns = [
        {
          header: () => "Created Date & Time",
          accessorKey: "createdAt",
          cell: ({ row }: { row: any }) => {
            const item = row?.original as FetchedSermonType;
            return (
              <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">
                <span className="capitalize">
                  {format(item?.createdAt, "dd MMM, yyyy")}
                </span>{" "}
                • {format(item?.createdAt, "p")}
              </div>
            );
          },
        },
        {
          header: () => "Sermon Date",
          accessorKey: "sermon_date",
          cell: ({ row }: { row: any }) => {
            const item = row?.original as FetchedSermonType;
            return (
              <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">
                <span className="capitalize">
                  {format(item?.sermon_date, "dd MMM, yyyy")}
                </span>
              </div>
            );
          },
        },
        {
            header: () => "Preacher Name",
            accessorKey: "preacher_name",
        },
        {
            header: () => "Description",
            accessorKey: "description",
            cell: ({ row }: { row: any }) => {
                const item = row?.original as FetchedSermonType;
                return (
                <div className="text-sm text-grey-dark-2 line-clamp-2 text-ellipsis whitespace-nowrap">
                    {item?.description}
                </div>
                );
            },
        },
        {
            header: () => "Actions",
            accessorKey: "actions",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedSermonType
                return (
                    <div className="text-right">
                        <Menu>
                            <MenuButton type="button" className="group p-2 grid place-content-center rounded-lg bg-red-5 hover:bg-red-2 transition-colors duration-300 ease-out"><Icon icon="lucide:ellipsis" className="group-hover:text-white text-text-secondary size-4" /></MenuButton>
                            <MenuItems transition anchor="bottom end" className="w-52 origin-top-right rounded-xl bg-white px-2.5 py-3.5 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
                                <MenuSection className="space-y-4">
                                    <MenuHeading as="h1" className="font-semibold text-base text-grey-dark-1">Actions</MenuHeading>
                                    <div className="grid gap-1">
                                        <MenuItem as="button" type="button" className="flex items-center w-full rounded hover:bg-red-5 px-2 py-1.5 text-sm/6 text-text-secondary" onClick={() => toggleEditSermon(item)}>
                                            Edit
                                        </MenuItem>
                                        <MenuItem as="button" type="button" className="flex items-center w-full rounded hover:bg-red-5 px-2 py-1.5 text-sm/6 text-text-secondary" onClick={() => toggleDeleteSermon(item)}>
                                            Delete
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
    
    return (
        <div className="flex flex-col gap-5 px-4 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
            <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-end">                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <AdminsFilter setFilters={setFilters} isLoading={isLoading} />
                    <TableAction theme="grey" block>
                        Export
                        <Icon icon="lucide:cloud-download" className="size-4 text-accent-primary" />
                    </TableAction>
                    <TableAction type="button" theme="primary" onClick={() => setToggleModals((prev) => ({ ...prev, openCreateAdmin: true }))} block>
                        <Icon icon="lucide:plus" className="size-4" />
                        Create Sermon
                    </TableAction>
                </div>
            </div>
            <RenderIf condition={!isLoading && !loadingSermonsCount}>
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
            <RenderIf condition={isLoading || loadingSermonsCount}>
                <div className="flex w-full h-96 items-center justify-center">
                    <Loader className="spinner size-6 text-accent-primary" />
                </div>
            </RenderIf>
            <CreateSermonModal isOpen={toggleModals.openCreateSermon} onClose={() => setToggleModals((prev) => ({ ...prev, openCreateAdmin: false }))} />
            <DeleteSermonModal isOpen={toggleModals.openDeleteSermon} onClose={() => toggleDeleteSermon(null)} sermon={toggleModals.activeSermon as FetchedSermonType} />
            <EditSermonModal isOpen={toggleModals.openEditSermon} onClose={() => toggleEditSermon(null)} sermon={toggleModals.activeSermon as FetchedSermonType} />
        </div>
    )
}