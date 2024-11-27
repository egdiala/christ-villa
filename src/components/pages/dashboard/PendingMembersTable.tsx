import { useState } from "react";
import { RenderIf, Table } from "@/components/core";
import { useNavigate } from "react-router";
import { setPaginationParams } from "@/hooks/usePaginationParams";

export const DashboardPendingMembersTable = () => {
  const imgUrl =
    "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const pendingMembers = [
    {
      id: 1,
      firstName: "Albert",
      lastName: "Flores",
      profileImg: imgUrl,
      date: "Today",
      time: "12:34pm",
      gender: "Male",
      type: "Member",
      status: "pending",
    },
    {
      id: 2,
      firstName: "Albert",
      lastName: "Flores",
      profileImg: imgUrl,
      date: "Today",
      time: "12:34pm",
      gender: "Male",
      type: "Member",
      status: "pending",
    },
    {
      id: 3,
      firstName: "Albert",
      lastName: "Flores",
      profileImg: imgUrl,
      date: "Today",
      time: "12:34pm",
      gender: "Male",
      type: "Member",
      status: "pending",
    },
    {
      id: 4,
      firstName: "Albert",
      lastName: "Flores",
      profileImg: imgUrl,
      date: "Today",
      time: "12:34pm",
      gender: "Male",
      type: "Member",
      status: "pending",
    },
    {
      id: 5,
      firstName: "Albert",
      lastName: "Flores",
      profileImg: imgUrl,
      date: "Today",
      time: "12:34pm",
      gender: "Male",
      type: "Member",
      status: "pending",
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
      header: () => "User Type",
      accessorKey: "type",
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
            <RenderIf condition={item?.status?.toLowerCase() === "completed"}>
              <p className="text-green-base">{item?.status}</p>
            </RenderIf>
            <RenderIf condition={item?.status?.toLowerCase() === "rejected"}>
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
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    setPage(page);
    setPaginationParams(page, itemsPerPage, searchParams, setSearchParams);
  };

  //   const prev = () => {
  //     if (page > 1) {
  //       handlePageChange(page - 1);
  //     }
  //   };

  //   const next = () => {
  //     if (page < pendingMembers.length) {
  //       handlePageChange(page + 1);
  //     }
  //   };

  return (
    <div className="border border-blue-4 p-4 rounded-2xl grid gap-y-5">
      <h2>Pending Members</h2>
      <Table
        columns={columns}
        data={pendingMembers ?? []}
        onPageChange={handlePageChange}
        page={page}
        perPage={itemsPerPage}
        totalCount={pendingMembers?.length}
        emptyStateText="No pending members."
        onClick={({ original }) => navigate(`/users/${original?.id}`)}
      />
    </div>
  );
};
