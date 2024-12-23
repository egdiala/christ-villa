import { useState } from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { useParams } from "react-router";
import blankImage from "@/assets/blank.svg";
import { setPaginationParams } from "@/hooks/usePaginationParams";
import { SearchInput, Table, TableAction } from "@/components/core";
import type { FetchedDepartmentActivities } from "@/types/departments";
import { DateFilter, RequestsFilter } from "@/components/pages/requests";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useGetDepartmentMaterials } from "@/services/hooks/queries/useDepartments";
import { DeleteActivityModal } from "@/components/pages/departments/department/DeleteActivity";

export const ActivitiesTab: React.FC = () => {
  const { id } = useParams();
  const departmentId = id as string;

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [searchParams, setSearchParams] = useState("");
  const [activitiesFilter, setActivitiesFilter] = useState({});
  const [dateFilter, setDateFilter] = useState({
    start_date: "",
    end_date: "",
  });

  const { data: departmentActivities, isLoading } = useGetDepartmentMaterials<
    FetchedDepartmentActivities[]
  >({
    department_id: departmentId,
    page: page.toString(),
    item_per_page: itemsPerPage.toString(),
    ...dateFilter,
    ...activitiesFilter,
  });

  const { data: departmentActivitiesCount } = useGetDepartmentMaterials<{
    total: number;
  }>({
    component: "count",
    department_id: departmentId,
    ...dateFilter,
    ...activitiesFilter,
  });

  const [toggleModals, setToggleModals] = useState({
    openDeleteFileModal: false,
    activeItem: null as FetchedDepartmentActivities | null,
  });

  const actions = [
    {
      label: "View File",
      onClick: (item: FetchedDepartmentActivities) =>
        window.open(item?.url, "_blank"),
    },
    {
      label: "Delete File",
      onClick: (item: FetchedDepartmentActivities) =>
        setToggleModals((prev) => ({
          ...prev,
          openDeleteFileModal: true,
          activeItem: item,
        })),
    },
  ];

  const columns = [
    {
      header: () => "Date & Time",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedDepartmentActivities;
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
      header: () => "Activity By",
      accessorKey: "user_data.name",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedDepartmentActivities;
        return (
          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className="size-8">
              <img
                src={blankImage}
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <p className="text-sm text-text-secondary">
              {item?.user_data?.name}
            </p>
          </div>
        );
      },
    },
    {
      header: () => "Activity",
      accessorKey: "title",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedDepartmentActivities;
        return (
          <p className="text-sm text-text-secondary whitespace-nowrap">
            {item?.title}
          </p>
        );
      },
    },
    {
      header: () => "Action",
      accessorKey: "action",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedDepartmentActivities;
        return (
          <Popover className="relative">
            <PopoverButton
              as={TableAction}
              theme="tertiary"
              className="!text-accent-primary !bg-red-5 !text-sm font-bold !p-1.5"
            >
              <Icon
                icon="lucide:ellipsis"
                className="size-4 text-text-secondary"
              />
            </PopoverButton>
            <PopoverPanel
              anchor="bottom end"
              className="flex flex-col gap-y-4 rounded-lg shadow-[0px_10px_153px_-32px_#00000033] [--anchor-gap:-3px]  bg-white px-2.5 py-3.5 w-[200px]"
            >
              <h3 className="font-semibold text-base text-grey-dark-1">
                Actions
              </h3>
              <div className="grid gap-y-1">
                {actions.map((action) => (
                  <button
                    onClick={() => action.onClick(item)}
                    key={action.label}
                    className="text-start px-2 py-[6.5px] text-sm text-text-secondary hover:bg-red-5 hover:rounded-md"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
        );
      },
    },
  ];

  const handlePageChange = (page: number) => {
    setPage(page);
    setPaginationParams(page, itemsPerPage, searchParams, setSearchParams);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
        <div className="flex-1 md:max-w-96">
          <SearchInput placeholder="Search name" />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <DateFilter
            theme="grey"
            setFilters={setDateFilter}
            isLoading={isLoading}
          />
          <RequestsFilter
            theme="grey"
            setFilters={setActivitiesFilter}
            isLoading={isLoading}
          />
          <TableAction theme="grey" block>
            Export
            <Icon
              icon="lucide:cloud-download"
              className="size-4 text-accent-primary"
            />
          </TableAction>
        </div>
      </div>

      <div>
        <Table
          columns={columns}
          data={departmentActivities ?? []}
          page={page}
          perPage={itemsPerPage}
          totalCount={departmentActivitiesCount?.total}
          onPageChange={handlePageChange}
          emptyStateText="We couldn't find any activity."
        />
      </div>

      <DeleteActivityModal
        item={toggleModals.activeItem!}
        isOpen={toggleModals.openDeleteFileModal}
        onClose={() =>
          setToggleModals((prev) => ({
            ...prev,
            openDeleteFileModal: false,
            activeItem: null,
          }))
        }
      />
    </div>
  );
};
