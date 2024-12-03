import { useState } from "react";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router";
import { SearchInput, Table, TableAction } from "@/components/core";
import { setPaginationParams } from "@/hooks/usePaginationParams";
import { DateFilter, RequestsFilter } from "@/components/pages/requests";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { DeleteActivityModal } from "@/components/pages/departments/department/DeleteActivity";
import { useGetDepartmentMaterials } from "@/services/hooks/queries/useDepartments";

export const ActivitiesTab: React.FC = () => {
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");
  const departmentId = pathArray[2];

  const { data: departmentActivities } = useGetDepartmentMaterials({
    department_id: departmentId,
  });
  console.log({ departmentActivities });

  const activities = [
    {
      id: 1,
      firstName: "Albert",
      lastName: "Flores",
      profileImg:
        "https://plus.unsplash.com/premium_photo-1682144187125-b55e638cf286?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      activity: "Uploaded a document",
      description: "Training material",
    },
    {
      id: 2,
      firstName: "Theresa",
      lastName: "Webb",
      profileImg:
        "https://images.unsplash.com/photo-1636406269177-4827c00bb263?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      activity: "Uploaded a document",
      description: "Training material",
    },
    {
      id: 3,
      firstName: "Ronals",
      lastName: "Richards",
      profileImg:
        "https://images.unsplash.com/photo-1715029005043-e88d219a3c48?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      activity: "Uploaded a document",
      description: "Training material",
    },
    {
      id: 4,
      firstName: "Bessie",
      lastName: "Cooper",
      profileImg:
        "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      activity: "Uploaded a document",
      description: "Training material",
    },
    {
      id: 5,
      firstName: "Floyd",
      lastName: "Miles",
      profileImg:
        "https://images.unsplash.com/photo-1636377985931-898218afd306?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      activity: "Uploaded a document",
      description: "Training material",
    },
  ];

  const [_, setOpenFile] = useState(false);
  const [openDeleteFileModal, setOpenDeleteFileModal] = useState(false);

  const actions = [
    { label: "View File", onClick: () => setOpenFile(true) },
    { label: "Delete File", onClick: () => setOpenDeleteFileModal(true) },
  ];

  const columns = [
    {
      header: () => "Date & Time",
      accessorKey: "date_time",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <p className="text-sm text-text-secondary whitespace-nowrap">
            {item?.date} • {item?.time}
          </p>
        );
      },
    },
    {
      header: () => "Activity By",
      accessorKey: "name",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className="size-8">
              <img
                src={item?.profileImg}
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <p className="text-sm text-text-secondary">
              {item?.firstName} {item?.lastName}
            </p>
          </div>
        );
      },
    },
    {
      header: () => "Activity",
      accessorKey: "activity",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <p className="text-sm text-text-secondary whitespace-nowrap">
            {item?.activity}
          </p>
        );
      },
    },
    {
      header: () => "Description",
      accessorKey: "description",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <p className="text-sm text-text-secondary whitespace-nowrap">
            {item?.description}
          </p>
        );
      },
    },
    {
      header: () => "Action",
      accessorKey: "action",
      cell: () => {
        // const item = row?.original;
        return (
          <Popover className="relative">
            <PopoverButton>
              <TableAction
                theme="tertiary"
                className="!text-accent-primary !bg-red-5 !text-sm font-bold !p-1.5"
              >
                <Icon
                  icon="lucide:ellipsis"
                  className="size-4 text-text-secondary"
                />
              </TableAction>
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
                    onClick={action.onClick}
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

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [searchParams, setSearchParams] = useState("");

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
          <DateFilter theme="grey" setFilters={undefined} isLoading={false} />
          <RequestsFilter
            theme="grey"
            setFilters={undefined}
            isLoading={false}
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
          data={activities ?? []}
          page={page}
          perPage={itemsPerPage}
          totalCount={activities.length}
          onPageChange={handlePageChange}
          emptyStateText="We couldn't find any activity."
        />
      </div>

      <DeleteActivityModal
        isOpen={openDeleteFileModal}
        onClose={() => setOpenDeleteFileModal(false)}
        onDelete={() => {}}
      />
    </div>
  );
};
