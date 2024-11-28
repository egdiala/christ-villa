import { useState } from "react";
import { Icon } from "@iconify/react";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { setPaginationParams } from "@/hooks/usePaginationParams";
import { DateFilter, RequestsFilter } from "@/components/pages/requests";
import { AcademicAssistanceRequestModal } from "../AcademicAssistanceRequest";
import { TimeOffRequestModal } from "../TimeOffRequestDetails";
import { TripRequestModal } from "../TripRequestDetails";

export const RequestsTab: React.FC = () => {
  const requestStatistics = [
    { id: 1, label: "Total requests", value: "12,345" },
    { id: 2, label: "Pending requests", value: "35" },
    { id: 3, label: "Completed req.", value: "456" },
    {
      id: 4,
      label: "Rejected req.",
      value: "5",
    },
  ];

  const requests = [
    {
      id: 1,
      firstName: "Albert",
      lastName: "Flores",
      profileImg:
        "https://plus.unsplash.com/premium_photo-1682144187125-b55e638cf286?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      request_type: "Ride request",
      status: "pending",
    },
    {
      id: 2,
      firstName: "Theresa",
      lastName: "Webb",
      profileImg:
        "https://images.unsplash.com/photo-1636406269177-4827c00bb263?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      request_type: "Academic Assistance",
      status: "completed",
    },
    {
      id: 3,
      firstName: "Ronals",
      lastName: "Richards",
      profileImg:
        "https://images.unsplash.com/photo-1715029005043-e88d219a3c48?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      request_type: "Time off Request",
      status: "rejected",
    },
    {
      id: 4,
      firstName: "Bessie",
      lastName: "Cooper",
      profileImg:
        "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      request_type: "Ride request",
      status: "rejected",
    },
    {
      id: 5,
      firstName: "Floyd",
      lastName: "Miles",
      profileImg:
        "https://images.unsplash.com/photo-1636377985931-898218afd306?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      request_type: "Ride request",
      status: "rejected",
    },
  ];

  const columns = [
    {
      header: () => "Requester Name",
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
      header: () => "Request type",
      accessorKey: "request_type",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <p className="text-sm text-text-secondary max-w-[14ch] truncate">
            {item?.request_type}
          </p>
        );
      },
    },
    {
      header: () => "Status",
      accessorKey: "status",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <div className="font-medium text-sm capitalize">
            <RenderIf condition={item?.status?.toLowerCase() === "pending"}>
              <p className="text-amber">{item?.status}</p>
            </RenderIf>
            <RenderIf condition={item?.status?.toLowerCase() === "completed"}>
              <p className="text-[#008E5B]">{item?.status}</p>
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

  const handlePageChange = (page: number) => {
    setPage(page);
    setPaginationParams(page, itemsPerPage, searchParams, setSearchParams);
  };

  const [openTripDetails, setOpenTripDetails] = useState(false);
  const [openAcademicAssistanceDetails, setOpenAcademicAssistanceDetails] =
    useState(false);
  const [openTimeOffDetails, setOpenTimeOffDetails] = useState(false);

  return (
    <div className="flex flex-col gap-5 px-4 py-5 view-page-container overflow-y-scroll">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-6">
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
          <SearchInput placeholder="Search requester name" />
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
        <Table
          columns={columns}
          data={requests ?? []}
          page={page}
          perPage={itemsPerPage}
          totalCount={requests.length}
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
