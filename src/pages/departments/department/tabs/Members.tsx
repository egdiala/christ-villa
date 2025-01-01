import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import blankImage from "@/assets/blank.svg";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import {
  getPaginationParams,
  setPaginationParams,
} from "@/hooks/usePaginationParams";
import { UsersFilter } from "@/components/pages/users";
import { cn } from "@/libs/cn";
import {
  ApproveMemberRequestModal,
  RemoveMemberModal,
} from "@/components/pages/departments";
import { useGetAllUsers } from "@/services/hooks/queries/useDepartments";
import {
  FetchedUserCountType,
  FetchedUsersStatisticsType,
  FetchedUsersType,
} from "@/types/departments";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader } from "@/components/core/Button/Loader";
import { UsersStatus } from "@/types/users";
import * as XLSX from "xlsx";

interface MembersTabProps {
  isChildrenDept?: boolean;
}

export const MembersTab: React.FC = ({
  isChildrenDept = false,
}: MembersTabProps) => {
  const { id } = useParams();
  const departmentId = id as string;

  const [userFilter, setUserFilter] = useState({});

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [component, setComponent] = useState<"count" | "export">("count");

  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    setPage(page);
    setPaginationParams(page, itemsPerPage, searchParams, setSearchParams);
  };

  const { value, onChangeHandler } = useDebounce(300);

  const { data: deptMembers, isLoading: isLoadingMembers } = useGetAllUsers<
    FetchedUsersType[]
  >({
    q: value,
    department_id: departmentId,
    page: page.toString(),
    item_per_page: itemsPerPage.toString(),
    ...userFilter,
  });

  const { data: deptMembersCount, isLoading: isLoadingCount, isSuccess } =
    useGetAllUsers<FetchedUserCountType | any>({
      q: value,
      department_id: departmentId,
      ...userFilter,
      component,
    });

  const { data: deptMembersStatistics } =
    useGetAllUsers<FetchedUsersStatisticsType>({
      department_id: departmentId,
      component: "count-department",
    });

  const deptStatistics = [
    {
      id: 1,
      label: "All Members",
      icon: "lucide:users",
      value: deptMembersStatistics?.total_member ?? 0,
    },
    {
      id: 2,
      label: "Pending Members",
      icon: "lucide:users",
      value: deptMembersStatistics?.pending_member ?? 0,
    },
    {
      id: 3,
      label: "Approved Members",
      icon: "lucide:users",
      value: deptMembersStatistics?.approve_member ?? 0,
    },
    {
      id: 4,
      label: "Declined Members",
      icon: "lucide:life-buoy",
      value: deptMembersStatistics?.decline_member ?? 0,
    },
  ];

  const childrenDeptStatistics = [
    { id: 1, label: "Members", icon: "lucide:users", value: "12,345" },
    { id: 2, label: "Teachers", icon: "lucide:users", value: "12,345" },
    { id: 3, label: "HODS", icon: "lucide:life-buoy", value: "2" },
  ];

  const [openApproveMemberRequestModal, setOpenApproveMemberRequestModal] =
    useState({ isOpen: false, member: {} as FetchedUsersType, deptId: "" });
  const [openRemoveMemberModal, setOpenRemoveMemberModal] = useState({
    isOpen: false,
    member: {} as FetchedUsersType,
    deptId: "",
  });

  const actions = [
    {
      label: (member: FetchedUsersType) => {
        return member.status !== 1 ? "Approve" : "Suspend";
      },
      onClick: (member: FetchedUsersType) =>
        setOpenApproveMemberRequestModal({
          isOpen: true,
          member: member,
          deptId: departmentId,
        }),
    },
    {
      label: () => {
        return "Remove";
      },
      onClick: (member: FetchedUsersType) =>
        setOpenRemoveMemberModal({
          isOpen: true,
          member: member,
          deptId: departmentId,
        }),
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
            {item?.gender}
          </p>
        );
      },
    },
    {
      header: () => "Role",
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
      header: () => "Membership Status",
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
    {
      header: () => "Action",
      accessorKey: "action",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
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
                    onClick={() => action.onClick(item)}
                    key={action.label(item)}
                    className="text-start px-2 py-[6.5px] text-sm text-text-secondary hover:bg-red-5 hover:rounded-md"
                  >
                    {action.label(item)}
                  </button>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
        );
      },
    },
  ];
      
  useEffect(() => {
    if (component === "export" && !isLoadingCount && isSuccess) {
      const handleXlsx = async () => {
        // Map data to exclude fields like `avatar`
        const formattedData = (deptMembersCount as FetchedUsersType[]).map(({ ...rest }) => rest);

        // Create a new workbook and worksheet
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Departments");

        // Export to Excel
        XLSX.writeFile(workbook, `${deptMembersStatistics?.depart_data?.name}_members_data.xlsx`);
      }
      const exportData = async () => {
        await handleXlsx()
        await setComponent("count")
      }
      exportData()
    }
  },[component, deptMembersCount, deptMembersStatistics?.depart_data?.name, isLoadingCount, isSuccess])

  const location = useLocation();

  useEffect(() => {
    getPaginationParams(location, setPage, () => {});
  }, [location, setPage]);

  return (
    <div className="flex flex-col gap-5">
      <div
        className={cn(
          "grid grid-cols-1 gap-4 pb-5",
          isChildrenDept ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"
        )}
      >
        {[...(isChildrenDept ? childrenDeptStatistics : deptStatistics)].map(
          (item) => (
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
          )
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
        <div className="flex-1 md:max-w-96">
          <SearchInput
            placeholder="Search member name"
            onChange={onChangeHandler}
          />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <UsersFilter
            theme="grey"
            setFilters={setUserFilter}
            isLoading={isLoadingMembers}
          />
          <TableAction theme="grey" type="button" block onClick={() => setComponent("export")}>
            Export
            <Icon
              icon="lucide:cloud-download"
              className="size-4 text-accent-primary"
            />
          </TableAction>
        </div>
      </div>

      <div>
        <RenderIf condition={!isLoadingMembers && !isLoadingCount}>
          <Table
            columns={columns}
            data={deptMembers ?? []}
            page={page}
            perPage={itemsPerPage}
            totalCount={deptMembersCount?.total}
            onPageChange={handlePageChange}
            emptyStateText="We couldn't find any member."
          />
        </RenderIf>
        <RenderIf condition={isLoadingMembers || isLoadingCount}>
          <div className="flex w-full h-96 items-center justify-center">
            <Loader className="spinner size-6 text-accent-primary" />
          </div>
        </RenderIf>
      </div>

      <ApproveMemberRequestModal
        value={openApproveMemberRequestModal}
        onClose={() =>
          setOpenApproveMemberRequestModal({
            isOpen: false,
            member: {} as FetchedUsersType,
            deptId: "",
          })
        }
      />

      <RemoveMemberModal
        value={openRemoveMemberModal}
        onClose={() =>
          setOpenRemoveMemberModal({
            isOpen: false,
            member: {} as FetchedUsersType,
            deptId: "",
          })
        }
      />
    </div>
  );
};
