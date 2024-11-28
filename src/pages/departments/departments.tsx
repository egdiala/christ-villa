import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import { Button, SearchInput, Table, TableAction } from "@/components/core";
import { setPaginationParams } from "@/hooks/usePaginationParams";
import { AddNewDepartmentModal } from "@/components/pages/departments";

export const DepartmentsPage: React.FC = () => {
  const dashboardStatistics = [
    { id: 1, label: "Total departments", value: "340" },
    { id: 2, label: "Members", value: "23" },
    { id: 3, label: "HoDs", value: "23" },
  ];

  const departments = [
    {
      id: 1,
      department_name: "Ushering",
      description: "lorem ipsum dolor",
      members: 5935,
      total_requests: 824,
      pending_requests: 342,
      completed_requests: 5120,
    },
    {
      id: 2,
      department_name: "Choir",
      description: "lorem ipsum dolor",
      members: 5935,
      total_requests: 824,
      pending_requests: 342,
      completed_requests: 5120,
    },
    {
      id: 3,
      department_name: "Children",
      description: "lorem ipsum dolor",
      members: 5935,
      total_requests: 824,
      pending_requests: 342,
      completed_requests: 5120,
    },
    {
      id: 4,
      department_name: "Choir",
      description: "lorem ipsum dolor",
      members: 5935,
      total_requests: 824,
      pending_requests: 342,
      completed_requests: 5120,
    },
    {
      id: 5,
      department_name: "Choir",
      description: "lorem ipsum dolor",
      members: 5935,
      total_requests: 824,
      pending_requests: 342,
      completed_requests: 5120,
    },
  ];

  const columns = [
    {
      header: () => "Department Name",
      accessorKey: "department_name",
    },
    {
      header: () => "Description",
      accessorKey: "description",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <p className="text-sm text-text-secondary max-w-[13ch] truncate">
            {item?.description}
          </p>
        );
      },
    },
    {
      header: () => "Members",
      accessorKey: "members",
    },
    {
      header: () => "Total Requests",
      accessorKey: "total_requests",
    },
    {
      header: () => "Pending Requests",
      accessorKey: "pending_requests",
    },
    {
      header: () => "Completed Req.",
      accessorKey: "completed_requests",
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

  const [openAddNewDepartmentModal, setOpenAddNewDepartmentModal] =
    useState(false);

  return (
    <div className="flex flex-col gap-5 px-4 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6">
        {dashboardStatistics.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-lg bg-light-blue-4"
          >
            <div className="grid place-content-center rounded-full size-12 bg-light-blue-3">
              <Icon
                icon="lucide:component"
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
          <SearchInput placeholder="Search department name" />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <TableAction theme="grey" block>
            Export
            <Icon
              icon="lucide:cloud-download"
              className="size-4 text-accent-primary"
            />
          </TableAction>
          <Button
            theme="primary"
            onClick={() => setOpenAddNewDepartmentModal(true)}
          >
            <Icon icon="lucide:plus" className="" />
            Add Department
          </Button>
        </div>
      </div>

      <div>
        <Table
          columns={columns}
          data={departments ?? []}
          page={page}
          perPage={itemsPerPage}
          totalCount={departments.length}
          onPageChange={handlePageChange}
          emptyStateText="We couldn't find any department."
          onClick={({ original }) => navigate(`/departments/${original?.id}`)}
        />
      </div>

      <AddNewDepartmentModal
        isOpen={openAddNewDepartmentModal}
        onClose={() => setOpenAddNewDepartmentModal(false)}
        onAddDepartment={() => {}}
      />
    </div>
  );
};
