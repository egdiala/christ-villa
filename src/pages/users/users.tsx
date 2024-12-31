import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import blankImage from "@/assets/blank.svg";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { DateFilter } from "@/components/pages/requests";
import { UsersFilter } from "@/components/pages/users";
import {
  getPaginationParams,
  setPaginationParams,
} from "@/hooks/usePaginationParams";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetAllUsers } from "@/services/hooks/queries";
import {
  FetchedUserCountType,
  FetchedUsersStatisticsType,
  FetchedUsersType,
} from "@/types/users";
import { Loader } from "@/components/core/Button/Loader";
import { cn } from "@/libs/cn";
import { UsersStatus } from "../../types/users";
import * as XLSX from "xlsx";

export const UsersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [component, setComponent] = useState<"count" | "export">("count");
  const [dateFilter, setDateFilter] = useState({
    start_date: "",
    end_date: "",
  });

  const [userFilter, setUserFilter] = useState({});

  const { value, onChangeHandler } = useDebounce(300);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const handlePageChange = (page: number) => {
    setPage(page);
    setPaginationParams(page, itemsPerPage, searchParams, setSearchParams);
  };

  const { data: users, isLoading } = useGetAllUsers<FetchedUsersType[]>({
    q: value,
    page: page.toString(),
    item_per_page: itemsPerPage.toString(),
    ...dateFilter,
    ...userFilter,
  });

  const { data: usersCount, isLoading: isLoadingCount, isSuccess } =
    useGetAllUsers<FetchedUserCountType | any>({
      q: value,
      ...dateFilter,
      ...userFilter,
      component,
    });

  const { data: usersStatistics, isLoading: isLoadingStatistics } =
    useGetAllUsers<FetchedUsersStatisticsType>({
      component: "count-status",
    });

  const userStatistics = [
    { id: 1, label: "Total users", value: usersStatistics?.total_users ?? 0 },
    { id: 2, label: "Members", value: usersStatistics?.total_members ?? 0 },
    { id: 3, label: "HoDs", value: usersStatistics?.total_hods ?? 0 },
    { id: 4, label: "Pastors", value: usersStatistics?.total_pastors ?? 0 },
    { id: 5, label: "Ministers", value: usersStatistics?.total_ministers ?? 0 },
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
          <p className="text-sm text-text-secondary whitespace-nowrap capitalize">
            {item?.gender || "-"}
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
            {UsersStatus[item?.status]}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (component === "export" && !isLoadingCount && isSuccess) {
      const handleXlsx = async () => {
        // Map data to exclude fields like `avatar`
        const formattedData = (usersCount as FetchedUsersType[]).map(({ ...rest }) => rest);

        // Create a new workbook and worksheet
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        // Export to Excel
        XLSX.writeFile(workbook, "users_data.xlsx");
      }
      const exportData = async () => {
        await handleXlsx()
        await setComponent("count")
      }
      exportData()
    }
  },[component, isLoadingCount, isSuccess, usersCount])

  useEffect(() => {
    getPaginationParams(location, setPage, () => {});
  }, [location, setPage]);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 px-4 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pb-6">
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
          <SearchInput
            placeholder="Search by name or email"
            onChange={onChangeHandler}
          />
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
          <TableAction type="button" theme="grey" block onClick={() => setComponent("export")}>
            Export
            <Icon
              icon="lucide:cloud-download"
              className="size-4 text-accent-primary"
            />
          </TableAction>
        </div>
      </div>

      <RenderIf condition={isLoading || isLoadingCount || isLoadingStatistics}>
        <div className="flex w-full h-96 items-center justify-center">
          <Loader className="spinner size-6 text-green-1" />
        </div>
      </RenderIf>

      <RenderIf
        condition={!isLoading && !isLoadingCount && !isLoadingStatistics}
      >
        <Table
          columns={columns}
          data={users ?? []}
          page={page}
          perPage={itemsPerPage}
          totalCount={usersCount?.total}
          onPageChange={handlePageChange}
          emptyStateText="We couldn't find any user."
          onClick={({ original }) => navigate(`/users/${original?.user_id}`)}
          loading={isLoading}
        />
      </RenderIf>
    </div>
  );
};
