import { useState } from "react";
import { Icon } from "@iconify/react";
import { SearchInput, Table, TableAction } from "@/components/core";
import { setPaginationParams } from "@/hooks/usePaginationParams";
import { UsersFilter } from "@/components/pages/users";

export const PupilsTab: React.FC = () => {
  const pupilStatistics = [
    { id: 1, label: "Classes", icon: "lucide:users", value: "5" },
    { id: 2, label: "Pupils", icon: "lucide:users", value: "12,345" },
    { id: 3, label: "Teacher", icon: "lucide:life-buoy", value: "2" },
  ];

  const pupils = [
    {
      id: 1,
      firstName: "Albert",
      lastName: "Flores",
      profileImg:
        "https://plus.unsplash.com/premium_photo-1682144187125-b55e638cf286?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      gender: "Male",
      class: "Teenagers",
    },
    {
      id: 2,
      firstName: "Theresa",
      lastName: "Webb",
      profileImg:
        "https://images.unsplash.com/photo-1636406269177-4827c00bb263?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      gender: "Female",
      class: "Teenagers",
    },
    {
      id: 3,
      firstName: "Ronals",
      lastName: "Richards",
      profileImg:
        "https://images.unsplash.com/photo-1715029005043-e88d219a3c48?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      gender: "Male",
      class: "Teenagers",
    },
    {
      id: 4,
      firstName: "Bessie",
      lastName: "Cooper",
      profileImg:
        "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      gender: "Male",
      class: "Teenagers",
    },
    {
      id: 5,
      firstName: "Floyd",
      lastName: "Miles",
      profileImg:
        "https://images.unsplash.com/photo-1636377985931-898218afd306?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      gender: "Male",
      class: "Teenagers",
    },
  ];

  const columns = [
    {
      header: () => "Reg. Date & Time",
      accessorKey: "reg_date",
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
      header: () => "Name",
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
      header: () => "Gender",
      accessorKey: "gender",
    },
    {
      header: () => "Class",
      accessorKey: "class",
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
    <div className="flex flex-col gap-5 px-4 py-5 view-page-container overflow-y-scroll">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6">
        {pupilStatistics.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-lg bg-light-blue-4"
          >
            <div className="grid place-content-center rounded-full size-12 bg-light-blue-3">
              <Icon icon={item.icon} className="size-6 text-text-secondary" />
            </div>
            <div className="grid gap-1">
              <h1 className="text-sm text-text-secondary">{item.label}</h1>
              <p className="text-2xl text-text-primary">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
        <div className="flex-1 md:max-w-96">
          <SearchInput placeholder="Search member name" />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <UsersFilter theme="grey" setFilters={undefined} isLoading={false} />
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
          data={pupils ?? []}
          page={page}
          perPage={itemsPerPage}
          totalCount={pupils.length}
          onPageChange={handlePageChange}
          emptyStateText="We couldn't find any pupil."
        />
      </div>
    </div>
  );
};
