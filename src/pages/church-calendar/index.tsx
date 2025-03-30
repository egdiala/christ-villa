import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { Loader } from "@/components/core/Button/Loader";
import { useGetCalendars } from "@/services/hooks/queries";
import type { FetchedCalendarType } from "@/types/calendar";
import { useLocation, useSearchParams } from "react-router";
import { RenderIf, Table, TableAction } from "@/components/core";
import {
  getPaginationParams,
  setPaginationParams,
} from "@/hooks/usePaginationParams";
import {
  Menu,
  MenuButton,
  MenuHeading,
  MenuItem,
  MenuItems,
  MenuSection,
} from "@headlessui/react";
import {
  CreateChurchCalendarModal,
  DeleteChurchCalendarModal,
} from "@/components/pages/church-calendar";
import { getAdminData } from "@/utils/authUtil";

export const ChurchCalendarPage = () => {
  const { permission, user_type } = getAdminData();

  const location = useLocation();
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: calendarsCount, isLoading: isLoadingCount } = useGetCalendars<{
    total: number;
  }>({ component: "count" });
  const { data: calendars, isLoading } = useGetCalendars<FetchedCalendarType[]>(
    { page: page.toString(), item_per_page: itemsPerPage.toString() }
  );
  const [toggleModals, setToggleModals] = useState({
    openCreateCalendar: false,
    openDeleteCalendar: false,
    activeCalendar: null as FetchedCalendarType | null,
  });

  const columns = [
    {
      header: () => "Title",
      accessorKey: "title",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedCalendarType;
        return <div className="capitalize">{item?.title}</div>;
      },
    },
    {
      header: () => "Date & Time",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedCalendarType;
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
      header: () => "Actions",
      accessorKey: "actions",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedCalendarType;
        return (
          <div className="text-right">
            <Menu>
              <MenuButton
                type="button"
                className="group p-2 grid place-content-center rounded-lg bg-red-5 hover:bg-red-2 transition-colors duration-300 ease-out"
              >
                <Icon
                  icon="lucide:ellipsis"
                  className="group-hover:text-white text-text-secondary size-4"
                />
              </MenuButton>
              <MenuItems
                transition
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl bg-white px-2.5 py-3.5 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuSection className="space-y-4">
                  <MenuHeading
                    as="h1"
                    className="font-semibold text-base text-grey-dark-1"
                  >
                    Actions
                  </MenuHeading>
                  <div className="grid gap-1">
                    <MenuItem
                      as="button"
                      type="button"
                      className="flex items-center w-full rounded hover:bg-red-5 px-2 py-1.5 text-sm/6 text-text-secondary"
                      onClick={() => window.open(item?.url, "_blank")}
                    >
                      View
                    </MenuItem>

                    <RenderIf
                      condition={
                        permission.includes("delete") ||
                        user_type?.toLowerCase() === "superadmin"
                      }
                    >
                      <MenuItem
                        as="button"
                        type="button"
                        className="flex items-center w-full rounded hover:bg-red-5 px-2 py-1.5 text-sm/6 text-text-secondary"
                        onClick={() =>
                          setToggleModals((prev) => ({
                            ...prev,
                            openDeleteCalendar: true,
                            activeCalendar: item,
                          }))
                        }
                      >
                        Delete
                      </MenuItem>
                    </RenderIf>
                  </div>
                </MenuSection>
              </MenuItems>
            </Menu>
          </div>
        );
      },
    },
  ];

  const handlePageChange = (page: number) => {
    // in a real page, this function would paginate the data from the backend
    setPage(page);
    setPaginationParams(page, itemsPerPage, searchParams, setSearchParams);
  };

  useEffect(() => {
    getPaginationParams(location, setPage, () => {});
  }, [location, setPage]);
  return (
    <div className="flex flex-col gap-5 px-4 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-end">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <TableAction theme="grey" block>
            Export
            <Icon
              icon="lucide:cloud-download"
              className="size-4 text-accent-primary"
            />
          </TableAction>

          <RenderIf
            condition={
              permission.includes("create") ||
              user_type?.toLowerCase() === "superadmin"
            }
          >
            <TableAction
              type="button"
              theme="primary"
              onClick={() =>
                setToggleModals((prev) => ({
                  ...prev,
                  openCreateCalendar: true,
                }))
              }
              block
            >
              <Icon icon="lucide:plus" className="size-4" />
              Create Calendar
            </TableAction>
          </RenderIf>
        </div>
      </div>
      <RenderIf condition={!isLoading && !isLoadingCount}>
        <Table
          columns={columns}
          data={calendars ?? []}
          page={page}
          perPage={itemsPerPage}
          totalCount={calendarsCount?.total}
          onPageChange={handlePageChange}
          emptyStateText="We couldn't find any calendar."
        />
      </RenderIf>
      <RenderIf condition={isLoading || isLoadingCount}>
        <div className="flex w-full h-96 items-center justify-center">
          <Loader className="spinner size-6 text-accent-primary" />
        </div>
      </RenderIf>
      <CreateChurchCalendarModal
        isOpen={toggleModals?.openCreateCalendar}
        onClose={() =>
          setToggleModals((prev) => ({ ...prev, openCreateCalendar: false }))
        }
      />
      <DeleteChurchCalendarModal
        isOpen={toggleModals?.openDeleteCalendar}
        item={toggleModals.activeCalendar!}
        onClose={() =>
          setToggleModals((prev) => ({
            ...prev,
            openDeleteCalendar: false,
            activeCalendar: null,
          }))
        }
      />
    </div>
  );
};
