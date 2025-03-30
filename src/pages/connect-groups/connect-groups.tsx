import { format } from "date-fns";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Loader } from "@/components/core/Button/Loader";
import { useGetConnectGroups } from "@/services/hooks/queries";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { CreateConnectGroupModal } from "@/components/pages/connect-groups";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import {
  getPaginationParams,
  setPaginationParams,
} from "@/hooks/usePaginationParams";
import type {
  FetchedConnectGroupCountStatusType,
  FetchedConnectGroupCountType,
  FetchedConnectGroupType,
} from "@/types/connect-group";
import { getAdminData } from "@/utils/authUtil";

export const ConnectGroupsPage: React.FC = () => {
  const { permission } = getAdminData();

  const location = useLocation();
  const navigate = useNavigate();
  const { value, onChangeHandler } = useDebounce(300);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [createGroup, setCreateGroup] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: count, isLoading: isLoadingGroupsCount } =
    useGetConnectGroups<FetchedConnectGroupCountType>({
      q: value,
      component: "count",
    });
  const { data: countStatus } =
    useGetConnectGroups<FetchedConnectGroupCountStatusType>({
      component: "count-status",
    });
  const { data, isLoading } = useGetConnectGroups<FetchedConnectGroupType[]>({
    q: value,
    page: page.toString(),
    item_per_page: itemsPerPage.toString(),
  });

  const columns = [
    {
      header: () => "Name",
      accessorKey: "name",
      cell: ({ row }: { row: any }) => {
        const item = row.original as FetchedConnectGroupType;
        return <div className="capitalize">{item?.name}</div>;
      },
    },
    {
      header: () => "Date Created",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedConnectGroupType;
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
      header: () => "Members",
      accessorKey: "total_member",
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

  const requestCards = useMemo(() => {
    return [
      {
        label: "Total Connect Groups",
        value: countStatus?.total_count || 0,
        icon: "lucide:life-buoy",
      },
      {
        label: "Members",
        value: countStatus?.total_member || 0,
        icon: "lucide:users",
      },
      {
        label: "Head of Group",
        value: countStatus?.total_admin || 0,
        icon: "lucide:users",
      },
    ];
  }, [
    countStatus?.total_admin,
    countStatus?.total_count,
    countStatus?.total_member,
  ]);

  return (
    <div className="flex flex-col gap-5 px-4 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        {requestCards.map((item, index) => (
          <div
            key={index}
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
          <SearchInput
            onChange={onChangeHandler}
            placeholder="Search connect group name"
          />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <TableAction theme="grey" block>
            Export
            <Icon
              icon="lucide:cloud-download"
              className="size-4 text-accent-primary"
            />
          </TableAction>

          <RenderIf condition={permission.includes("create")}>
            <TableAction
              type="button"
              theme="primary"
              onClick={() => setCreateGroup(true)}
              block
            >
              <Icon icon="lucide:plus" className="size-4" />
              Add New Group
            </TableAction>
          </RenderIf>
        </div>
      </div>
      <RenderIf condition={!isLoading && !isLoadingGroupsCount}>
        <Table
          columns={columns}
          data={data ?? []}
          page={page}
          perPage={itemsPerPage}
          totalCount={count?.total}
          onPageChange={handlePageChange}
          onClick={({ original }) =>
            navigate(`/connect-groups/${original?.connectgroup_id}`)
          }
          emptyStateText="We couldn't find any connect groups."
        />
      </RenderIf>
      <RenderIf condition={isLoading || isLoadingGroupsCount}>
        <div className="flex w-full h-96 items-center justify-center">
          <Loader className="spinner size-6 text-accent-primary" />
        </div>
      </RenderIf>
      <CreateConnectGroupModal
        isOpen={createGroup}
        onClose={() => setCreateGroup(false)}
      />
    </div>
  );
};
