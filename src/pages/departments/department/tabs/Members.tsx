import { useState } from "react";
import { Icon } from "@iconify/react";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { setPaginationParams } from "@/hooks/usePaginationParams";
import { UsersFilter } from "@/components/pages/users";
import { cn } from "@/libs/cn";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  ApproveMemberRequestModal,
  RemoveMemberModal,
} from "@/components/pages/departments";

interface MembersTabProps {
  isChildrenDept?: boolean;
}

export const MembersTab: React.FC = ({
  isChildrenDept = false,
}: MembersTabProps) => {
  const deptStatistics = [
    { id: 1, label: "All Members", icon: "lucide:users", value: "12,345" },
    { id: 2, label: "Pending Members", icon: "lucide:users", value: "12,345" },
    { id: 3, label: "Approved Members", icon: "lucide:users", value: "12,345" },
    { id: 4, label: "HODS", icon: "lucide:life-buoy", value: "2" },
  ];

  const childrenDeptStatistics = [
    { id: 1, label: "Members", icon: "lucide:users", value: "12,345" },
    { id: 2, label: "Teachers", icon: "lucide:users", value: "12,345" },
    { id: 3, label: "HODS", icon: "lucide:life-buoy", value: "2" },
  ];

  const deptMembers = [
    {
      id: 1,
      firstName: "Albert",
      lastName: "Flores",
      profileImg:
        "https://plus.unsplash.com/premium_photo-1682144187125-b55e638cf286?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      gender: "Male",
      role: "Member",
      membership_status: "pending",
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
      role: "HOD",
      membership_status: "approved",
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
      role: "Member",
      membership_status: "approved",
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
      role: "HOD",
      membership_status: "approved",
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
      role: "Member",
      membership_status: "approved",
    },
  ];

  const [openApproveMemberRequestModal, setOpenApproveMemberRequestModal] =
    useState(false);
  const [openRemoveMemberModal, setOpenRemoveMemberModal] = useState(false);

  const actions = [
    { label: "Approve", onClick: () => setOpenApproveMemberRequestModal(true) },
    { label: "Remove", onClick: () => setOpenRemoveMemberModal(true) },
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
      header: () => "Role",
      accessorKey: "role",
    },
    {
      header: () => "Membership Status",
      accessorKey: "membership_status",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <div className="font-medium text-sm capitalize">
            <RenderIf
              condition={item?.membership_status?.toLowerCase() === "pending"}
            >
              <p className="text-amber">{item?.membership_status}</p>
            </RenderIf>
            <RenderIf
              condition={item?.membership_status?.toLowerCase() === "approved"}
            >
              <p className="text-[#008E5B]">{item?.membership_status}</p>
            </RenderIf>
            <RenderIf
              condition={item?.membership_status?.toLowerCase() === "suspended"}
            >
              <p className="text-accent-primary">{item?.membership_status}</p>
            </RenderIf>
          </div>
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
    <div className="flex flex-col gap-5 px-4">
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
          data={deptMembers ?? []}
          page={page}
          perPage={itemsPerPage}
          totalCount={deptMembers.length}
          onPageChange={handlePageChange}
          emptyStateText="We couldn't find any member."
        />
      </div>

      <ApproveMemberRequestModal
        isOpen={openApproveMemberRequestModal}
        onClose={() => setOpenApproveMemberRequestModal(false)}
        onApprove={() => {}}
      />

      <RemoveMemberModal
        isOpen={openRemoveMemberModal}
        onClose={() => setOpenRemoveMemberModal(false)}
        onRemove={() => {}}
      />
    </div>
  );
};
