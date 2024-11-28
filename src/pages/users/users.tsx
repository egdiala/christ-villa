import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { DateFilter } from "@/components/pages/requests";
import { UsersFilter } from "@/components/pages/users";
import { setPaginationParams } from "@/hooks/usePaginationParams";

export const UsersPage: React.FC = () => {
  const userStatistics = [
    { id: 1, label: "Total users", value: "340" },
    { id: 2, label: "Members", value: "23" },
    { id: 3, label: "HoDs", value: "23" },
    { id: 4, label: "Partners", value: "23" },
  ];

  const users = [
    {
      id: 1,
      firstName: "Albert",
      lastName: "Flores",
      profileImg:
        "https://plus.unsplash.com/premium_photo-1682144187125-b55e638cf286?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      gender: "Male",
      department: "Choir",
      user_type: "Member",
      status: "pending",
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
      department: "Ushering",
      user_type: "Partner",
      status: "approved",
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
      department: "Ushering",
      user_type: "HOD",
      status: "suspended",
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
      department: "Ushering",
      user_type: "Member",
      status: "suspended",
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
      department: "Ushering",
      user_type: "Member",
      status: "suspended",
    },
  ];

  const columns = [
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
      header: () => "Gender",
      accessorKey: "gender",
    },
    {
      header: () => "Department",
      accessorKey: "department",
    },
    {
      header: () => "User Type",
      accessorKey: "user_type",
    },
    {
      header: () => "Profile Status",
      accessorKey: "status",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <div className="font-medium text-sm">
            <RenderIf condition={item?.status?.toLowerCase() === "pending"}>
              <p className="text-amber">{item?.status}</p>
            </RenderIf>
            <RenderIf condition={item?.status?.toLowerCase() === "approved"}>
              <p className="text-green-base">{item?.status}</p>
            </RenderIf>
            <RenderIf condition={item?.status?.toLowerCase() === "suspended"}>
              <p className="text-accent-primary">{item?.status}</p>
            </RenderIf>
          </div>
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

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 px-4 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-6">
        {userStatistics.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-lg bg-light-blue-4"
          >
            <div className="grid place-content-center rounded-full size-12 bg-light-blue-3">
              <Icon
                icon="lucide:users"
                className="size-6 text-text-secondary"
              />
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
          <SearchInput placeholder="Search by name or email" />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <DateFilter theme="grey" setFilters={undefined} isLoading={false} />
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
          data={users ?? []}
          page={page}
          perPage={itemsPerPage}
          totalCount={users.length}
          onPageChange={handlePageChange}
          emptyStateText="We couldn't find any user."
          onClick={({ original }) => navigate(`/users/${original?.id}`)}
        />
      </div>
    </div>
  );
};
