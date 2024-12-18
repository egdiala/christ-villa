import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import blankImage from "@/assets/blank.svg";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { setPaginationParams } from "@/hooks/usePaginationParams";
import { DateFilter, RequestsFilter } from "@/components/pages/requests";
import {
  AcademicAssistanceRequestModal,
  TimeOffRequestModal,
  TripRequestModal,
} from "@/components/pages/departments";
import { useGetDepartmentRequests } from "@/services/hooks/queries/useDepartments";
import { useLocation, useSearchParams } from "react-router";
import { useDebounce } from "@/hooks/useDebounce";
import { FetchedDepartmentRequestCountStatusType, FetchedDepartmentRequestType } from "@/types/departments";
import { Loader } from "@/components/core/Button/Loader";
import { format } from "date-fns";
import { cn } from "@/libs/cn";
import { RequestStatus } from "@/types/requests";

export const RequestsTab: React.FC = () => {
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");
  const departmentId = pathArray[2];

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [searchParams, setSearchParams] = useSearchParams();
  const { value, onChangeHandler } = useDebounce(300);

  const { data: departmentRequests, isLoading } = useGetDepartmentRequests<FetchedDepartmentRequestType[]>({
    q: value,
    department_id: departmentId,
    page: page.toString(),
    item_per_page: itemsPerPage.toString(),
  });

  const { data: departmentRequestsCount, isLoading: isLoadingCount } = useGetDepartmentRequests<{ total: number; }>({
    q: value,
    department_id: departmentId,
    component: "count"
  });

  const { data: departmentRequestsCountStatus } = useGetDepartmentRequests<FetchedDepartmentRequestCountStatusType>({
    department_id: departmentId,
    component: "count-status",
  });


  const requestStatistics = useMemo(() => {
    return [
      { id: 1, label: "Total requests", value: departmentRequestsCountStatus?.total_count || 0 },
      { id: 2, label: "Pending requests", value: departmentRequestsCountStatus?.pending_req || 0 },
      { id: 3, label: "Completed req.", value: departmentRequestsCountStatus?.pending_req || 0 },
      {
        id: 4,
        label: "Rejected req.",
        value: departmentRequestsCountStatus?.decline_req || 0,
      },
    ]
  },[departmentRequestsCountStatus?.decline_req, departmentRequestsCountStatus?.pending_req, departmentRequestsCountStatus?.total_count])

  const columns = [
    {
      header: () => "Requester Name",
      accessorKey: "name",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedDepartmentRequestType;
        return (
          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className="size-8">
              <img
                src={blankImage}
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <p className="text-sm text-text-secondary capitalize">
              {item?.user_data?.name}
            </p>
          </div>
        );
      },
    },
    {
      header: () => "Reg. Date & Time",
      accessorKey: "reg_date",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedDepartmentRequestType;
        return (
          <p className="text-sm text-text-secondary whitespace-nowrap">
                      {format(item?.createdAt, "dd MMM, yyyy")} •{" "}
                      {format(item?.createdAt, "p")}
          </p>
        );
      },
    },
    {
      header: () => "Request type",
      accessorKey: "request_type",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedDepartmentRequestType;
        return (
          <p className="text-sm text-text-secondary capitalize truncate">
            {item?.request_type?.replace(/_/g, " ") || item?.request_area?.replace(/_/g, " ")}
          </p>
        );
      },
    },
    {
      header: () => "Status",
      accessorKey: "status",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedDepartmentRequestType;
        return (
          <div className={cn("capitalize", item?.status === 0 ? "text-amber" : "", item?.status === 1 ? "text-green-base" : "", item?.status === 2 ? "text-accent-primary" : "")}>{RequestStatus[item?.status]}</div>
        );
      },
    },
  ];

  const handlePageChange = (page: number) => {
    setPage(page);
    setPaginationParams(page, itemsPerPage, searchParams, setSearchParams);
  };

  const [openTripDetails, setOpenTripDetails] = useState(false);
  const [openAcademicAssistanceDetails, setOpenAcademicAssistanceDetails] =
    useState(false);
  const [openTimeOffDetails, setOpenTimeOffDetails] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-5">
        {requestStatistics.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-lg bg-light-blue-4"
          >
            <div className="grid place-content-center rounded-full size-12 bg-light-blue-3">
              <Icon
                icon="lucide:life-buoy"
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
            placeholder="Search requester name"
            onChange={onChangeHandler}
          />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <DateFilter theme="grey" setFilters={undefined} isLoading={false} />
          <RequestsFilter
            theme="grey"
            setFilters={undefined}
            isLoading={false}
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
        <RenderIf condition={!isLoading && !isLoadingCount}>
          <Table
            columns={columns}
            data={departmentRequests ?? []}
            page={page}
            perPage={itemsPerPage}
            totalCount={departmentRequestsCount?.total}
            onPageChange={handlePageChange}
            emptyStateText="We couldn't find any requests."
            onClick={({ original }) => {
              if (original?.request_type?.toLowerCase() === "ride request") {
                setOpenTripDetails(true);
              } else if (
                original?.request_type?.toLowerCase() === "academic assistance"
              ) {
                setOpenAcademicAssistanceDetails(true);
              } else {
                setOpenTimeOffDetails(true);
              }
            }}
          />
        </RenderIf>
        <RenderIf condition={isLoading || isLoadingCount}>
            <div className="flex w-full h-96 items-center justify-center">
                <Loader className="spinner size-6 text-accent-primary" />
            </div>
        </RenderIf>
      </div>

      <AcademicAssistanceRequestModal
        isOpen={openAcademicAssistanceDetails}
        onClose={() => setOpenAcademicAssistanceDetails(false)}
      />

      <TimeOffRequestModal
        isOpen={openTimeOffDetails}
        onClose={() => setOpenTimeOffDetails(false)}
      />

      <TripRequestModal
        isOpen={openTripDetails}
        onClose={() => setOpenTripDetails(false)}
      />
    </div>
  );
};
