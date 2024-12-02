import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { DateFilter } from "@/components/pages/requests";
import { UsersFilter } from "@/components/pages/users";
import { setPaginationParams } from "@/hooks/usePaginationParams";
import { useGetAllUsers } from "@/services/hooks/queries";
import { format } from "date-fns";

export const UsersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [dateFilter, setDateFilter] = useState({
    start_date: "",
    end_date: "",
  });

  const [userFilter, setUserFilter] = useState({
    status: -1,
    account_type: "",
  });

  const [searchParams, setSearchParams] = useState("");

  const handlePageChange = (page: number) => {
    setPage(page);
    setPaginationParams(page, itemsPerPage, searchParams, setSearchParams);
  };

  const { data: users, isLoading } = useGetAllUsers({
    query: {
      page: page,
      start_date: dateFilter.start_date,
      end_date: dateFilter.end_date,
      user_type: userFilter.account_type,
      ...(userFilter.status === -1 ? {} : { status: userFilter.status }),
    },
  });

  const userStatistics = [
    { id: 1, label: "Total users", value: "340" },
    { id: 2, label: "Members", value: "23" },
    { id: 3, label: "HoDs", value: "23" },
    { id: 4, label: "Partners", value: "23" },
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
                src={item?.avatar}
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <p className="text-sm text-text-secondary capitalize">
              {item?.name}
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
            {format(item?.createdAt, "yyyy-MM-dd")} •{" "}
            {format(item?.createdAt, "p")}
          </p>
        );
      },
    },
    {
      header: () => "Gender",
      accessorKey: "gender",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <p className="text-sm text-text-secondary whitespace-nowrap capitalize">
            {item?.gender}
          </p>
        );
      },
    },
    {
      header: () => "Department",
      accessorKey: "department",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <p className="text-sm text-text-secondary whitespace-nowrap capitalize">
            {item?.department ?? "N/A"}
          </p>
        );
      },
    },
    {
      header: () => "User Type",
      accessorKey: "account_type",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <p className="text-sm text-text-secondary whitespace-nowrap capitalize">
            {item?.account_type}
          </p>
        );
      },
    },
    {
      header: () => "Profile Status",
      accessorKey: "status",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <div className="font-medium text-sm">
            <RenderIf condition={item?.status === 0}>
              <p className="text-amber">Pending</p>
            </RenderIf>
            <RenderIf condition={item?.status === 1}>
              <p className="text-green-base">Active</p>
            </RenderIf>
            <RenderIf condition={item?.status === 2}>
              <p className="text-accent-primary">Suspended</p>
            </RenderIf>
          </div>
        );
      },
    },
  ];

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
          <DateFilter
            theme="grey"
            setFilters={setDateFilter}
            isLoading={isLoading}
          />
          <UsersFilter
            theme="grey"
            setFilters={setUserFilter}
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
          data={users ?? []}
          page={page}
          perPage={itemsPerPage}
          totalCount={users?.length}
          onPageChange={handlePageChange}
          emptyStateText="We couldn't find any user."
          onClick={({ original }) => navigate(`/users/${original?.user_id}`)}
          loading={isLoading}
        />
      </div>
    </div>
  );
};
