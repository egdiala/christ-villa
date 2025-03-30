import { cn } from "@/libs/cn";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Loader } from "@/components/core/Button/Loader";
import { useLocation, useSearchParams } from "react-router";
import { useGetAdmins } from "@/services/hooks/queries/useAdmins";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import {
  AdminStatus,
  FetchedAdminCountType,
  FetchedAdminType,
} from "@/types/admin";
import {
  getPaginationParams,
  setPaginationParams,
} from "@/hooks/usePaginationParams";
import {
  AdminsFilter,
  CreateAdminAccountModal,
  UpdateAdminStatusModal,
} from "@/components/pages/admin-accounts";
import { getAdminData } from "@/utils/authUtil";

export const AdminAccountsPage: React.FC = () => {
  const { permission } = getAdminData();

  const location = useLocation();
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const { value, onChangeHandler } = useDebounce(300);
  const { data, isLoading } = useGetAdmins<FetchedAdminType[]>({
    q: value,
    ...filters,
    page: page.toString(),
    item_per_page: itemsPerPage.toString(),
  });
  const { data: adminsCount, isLoading: loadingAdminsCount } =
    useGetAdmins<FetchedAdminCountType>({
      component: "count",
      q: value,
      ...filters,
    });
  const [toggleModals, setToggleModals] = useState({
    openCreateAdmin: false,
    openSuspendAdmin: false,
    openActivateAdmin: false,
    activeAdmin: null as FetchedAdminType | null,
  });

  const columns = [
    {
      header: () => "Admin Name",
      accessorKey: "name",
    },
    {
      header: () => "Email",
      accessorKey: "email",
    },
    {
      header: () => "Gender",
      accessorKey: "gender",
      cell: ({ row }: { row: any }) => {
        const item = row.original as FetchedAdminType;
        return <div className="capitalize">{item.gender}</div>;
      },
    },
    {
      header: () => "Permissions",
      accessorKey: "permissions",
      cell: ({ row }: { row: any }) => {
        const item = row.original as FetchedAdminType;
        return <div className="capitalize">{item.permission.join(", ")}</div>;
      },
    },
    {
      header: () => "Status",
      accessorKey: "status",
      cell: ({ row }: { row: any }) => {
        const item = row.original as FetchedAdminType;
        return (
          <div
            className={cn(
              "font-semibold capitalize",
              item.status === 0 ? "text-semantics-amber" : "",
              item.status === 1 ? "text-green-base" : "",
              item.status === 2 ? "text-accent-primary" : ""
            )}
          >
            {AdminStatus[item.status]}
          </div>
        );
      },
    },
    ...(permission.includes("update")
      ? [
          {
            header: () => "Action",
            accessorKey: "action",
            cell: ({ row }: { row: any }) => {
              const item = row.original as FetchedAdminType;
              return (
                <button
                  type="button"
                  className="py-2 px-4 text-sm font-medium text-text-primary bg-grey-dark-4 rounded-lg"
                  onClick={() =>
                    setToggleModals((prev) => ({
                      ...prev,
                      openSuspendAdmin: true,
                      activeAdmin: item,
                    }))
                  }
                >
                  {item.status === 1 ? "Suspend" : "Activate"}
                </button>
              );
            },
          },
        ]
      : []),
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
      <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
        <div className="flex-1 md:max-w-96">
          <SearchInput
            placeholder="Search admin name"
            onChange={onChangeHandler}
          />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <AdminsFilter setFilters={setFilters} isLoading={isLoading} />
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
              onClick={() =>
                setToggleModals((prev) => ({ ...prev, openCreateAdmin: true }))
              }
              block
            >
              <Icon icon="lucide:plus" className="size-4" />
              Add Admin
            </TableAction>
          </RenderIf>
        </div>
      </div>
      <RenderIf condition={!isLoading && !loadingAdminsCount}>
        <Table
          columns={columns}
          data={data ?? []}
          page={page}
          perPage={itemsPerPage}
          totalCount={adminsCount?.total}
          onPageChange={handlePageChange}
          emptyStateText="We couldn't find any admin."
        />
      </RenderIf>
      <RenderIf condition={isLoading || loadingAdminsCount}>
        <div className="flex w-full h-96 items-center justify-center">
          <Loader className="spinner size-6 text-accent-primary" />
        </div>
      </RenderIf>
      <CreateAdminAccountModal
        isOpen={toggleModals.openCreateAdmin}
        onClose={() =>
          setToggleModals((prev) => ({ ...prev, openCreateAdmin: false }))
        }
      />
      <UpdateAdminStatusModal
        isOpen={toggleModals.openSuspendAdmin}
        admin={toggleModals.activeAdmin as FetchedAdminType}
        onClose={() =>
          setToggleModals((prev) => ({
            ...prev,
            openSuspendAdmin: false,
            activeAdmin: null,
          }))
        }
      />
    </div>
  );
};
