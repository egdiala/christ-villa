import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button, SearchInput, Table, TableAction } from "@/components/core";
import { setPaginationParams } from "@/hooks/usePaginationParams";
import { DateFilter, RequestsFilter } from "@/components/pages/requests";
import { AttendanceModal } from "@/components/pages/dashboard";

export const AttendanceTab: React.FC = () => {
  const attendanceList = [
    {
      id: 1,
      firstName: "Albert",
      lastName: "Flores",
      profileImg:
        "https://plus.unsplash.com/premium_photo-1682144187125-b55e638cf286?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      description: "20 of 21 present",
    },
    {
      id: 2,
      firstName: "Theresa",
      lastName: "Webb",
      profileImg:
        "https://images.unsplash.com/photo-1636406269177-4827c00bb263?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      description: "20 of 21 present",
    },
    {
      id: 3,
      firstName: "Ronals",
      lastName: "Richards",
      profileImg:
        "https://images.unsplash.com/photo-1715029005043-e88d219a3c48?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      description: "20 of 21 present",
    },
    {
      id: 4,
      firstName: "Bessie",
      lastName: "Cooper",
      profileImg:
        "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      description: "20 of 21 present",
    },
    {
      id: 5,
      firstName: "Floyd",
      lastName: "Miles",
      profileImg:
        "https://images.unsplash.com/photo-1636377985931-898218afd306?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      description: "20 of 21 present",
    },
  ];

  const [openAttendanceModal, setOpenAttendanceModal] = useState(false);

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
      header: () => "Taken By",
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
          <Button
            theme="ghost"
            className="!text-accent-primary !text-sm font-bold !p-1.5"
            onClick={() => setOpenAttendanceModal(true)}
          >
            View
          </Button>
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
    <div className="flex flex-col gap-5 px-4">
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
          data={attendanceList ?? []}
          page={page}
          perPage={itemsPerPage}
          totalCount={attendanceList.length}
          onPageChange={handlePageChange}
          emptyStateText="We couldn't find any attendance record."
        />
      </div>

      <AttendanceModal
        isOpen={openAttendanceModal}
        onClose={() => setOpenAttendanceModal(false)}
      />
    </div>
  );
};
