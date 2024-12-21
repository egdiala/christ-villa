import { useState } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import blankImage from "@/assets/blank.svg";
import { Table } from "@/components/core";
import { setPaginationParams } from "@/hooks/usePaginationParams";
import { useGetDashboardStatistics } from "@/services/hooks/queries/useDashboard";
import {
  FetchedDashboardPendingMembersType,
  PendingMembersStatus,
} from "@/types/dashboard";
import { cn } from "@/lib/utils";

export const DashboardPendingMembersTable = () => {
  const { data: pendingUserStatistics } = useGetDashboardStatistics<
    FetchedDashboardPendingMembersType[]
  >({
    component: "dashboard-pending-user",
  });

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
                src={item?.avatar || blankImage}
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
            {format(item?.createdAt, "dd MMM, yyyy")} •{" "}
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
          <p className="text-sm text-text-secondary capitalize">
            {item?.gender || "-"}
          </p>
        );
      },
    },
    // {
    //   header: () => "User Type",
    //   accessorKey: "type",
    // },
    {
      header: () => "Profile Status",
      accessorKey: "status",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <div
            className={cn(
              "font-medium text-sm capitalize",
              item?.status === 0
                ? "text-amber"
                : item?.status === 1
                ? "text-green-base"
                : "text-accent-primary"
            )}
          >
            {PendingMembersStatus[item?.status]}
          </div>
        );
      },
    },
  ];

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchParams, setSearchParams] = useState("");
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    setPage(page);
    setPaginationParams(page, itemsPerPage, searchParams, setSearchParams);
  };

  return (
    <div className="border border-blue-4 p-4 rounded-2xl grid gap-y-5">
      <h2 className="font-bold text-xl text-text-primary">Pending Members</h2>
      <Table
        columns={columns}
        data={pendingUserStatistics?.slice(0, 10) ?? []}
        onPageChange={handlePageChange}
        page={page}
        perPage={itemsPerPage}
        totalCount={
          pendingUserStatistics
            ? pendingUserStatistics!.length > 10
              ? 10
              : pendingUserStatistics!.length
            : 0
        }
        emptyStateText="No pending members."
        onClick={({ original }) => navigate(`/users/${original?.user_id}`)}
        paginateData={false}
      />
    </div>
  );
};
