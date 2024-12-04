import { useState } from "react";
import { Icon } from "@iconify/react";
import { useSearchParams } from "react-router";
import {
  Button,
  RenderIf,
  SearchInput,
  Table,
  TableAction,
} from "@/components/core";
import { EngageFilter } from "@/components/pages/engage";
import { setPaginationParams } from "@/hooks/usePaginationParams";
import { PostAnnouncementModal } from "@/components/pages/dashboard";

export const EngagePage: React.FC = () => {
  const engagementStatistics = [
    { id: 1, label: "Total Announcement", value: "12,345" },
    { id: 2, label: "Total Push Notifications", value: "2" },
  ];

  const engagement = [
    {
      id: 1,
      name: "Albert Flores",
      avatar:
        "https://plus.unsplash.com/premium_photo-1682144187125-b55e638cf286?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      type: "Announcement",
      content_type: "Text/Image",
      status: "active",
    },
    {
      id: 2,
      name: "Theresa Webb",
      avatar:
        "https://images.unsplash.com/photo-1636406269177-4827c00bb263?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      type: "Announcement",
      content_type: "Text/Image",
      status: "inactive",
    },
    {
      id: 3,
      name: "Ronald Richards",
      avatar:
        "https://images.unsplash.com/photo-1715029005043-e88d219a3c48?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      gender: "Male",
      type: "Announcement",
      content_type: "Text/Image",
      status: "inactive",
    },
    {
      id: 4,
      name: "Bessie Cooper",
      avatar:
        "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      type: "Push notification",
      content_type: "Text/Image",
      status: "inactive",
    },
    {
      id: 5,
      name: "Floyd Miles",
      avatar:
        "https://images.unsplash.com/photo-1636377985931-898218afd306?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Today",
      time: "12:34pm",
      type: "Announcement",
      content_type: "Text/Image",
      status: "inactive",
    },
  ];

  const columns = [
    {
      header: () => "Sent by",
      accessorKey: "name",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className="size-8">
              <img
                src={item?.avatar}
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <p className="text-sm text-text-secondary">{item?.name}</p>
          </div>
        );
      },
    },
    {
      header: () => "Sent Date & Time",
      accessorKey: "sent_date",
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
      header: () => "Type",
      accessorKey: "type",
    },
    {
      header: () => "Content type",
      accessorKey: "content_type",
    },
    {
      header: () => "Status",
      accessorKey: "status",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <div className="font-medium text-sm capitalize">
            <RenderIf condition={item?.status?.toLowerCase() === "active"}>
              <p className="text-green-base">{item?.status}</p>
            </RenderIf>
            <RenderIf condition={item?.status?.toLowerCase() === "inactive"}>
              <p className="text-accent-primary">{item?.status}</p>
            </RenderIf>
          </div>
        );
      },
    },
  ];

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    setPage(page);
    setPaginationParams(page, itemsPerPage, searchParams, setSearchParams);
  };

  const [openPostAnnouncementModal, setOpenPostAnnouncementModal] =
    useState(false);

  return (
    <div className="flex flex-col gap-5 px-4 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
        {engagementStatistics.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-lg bg-light-blue-4"
          >
            <div className="grid place-content-center rounded-full size-12 bg-light-blue-3">
              <Icon
                icon="lucide:volume-2"
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
          <SearchInput placeholder="Search by name or email" />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <EngageFilter theme="grey" setFilters={undefined} isLoading={false} />

          <TableAction theme="grey" block>
            Export
            <Icon
              icon="lucide:cloud-download"
              className="size-4 text-accent-primary"
            />
          </TableAction>

          <Button
            theme="primary"
            onClick={() => setOpenPostAnnouncementModal(true)}
          >
            <Icon icon="lucide:volume-2" />
            Post/Send a Message
          </Button>
        </div>
      </div>

      <div>
        <Table
          columns={columns}
          data={engagement ?? []}
          page={page}
          perPage={itemsPerPage}
          totalCount={engagement.length}
          onPageChange={handlePageChange}
          emptyStateText="We couldn't find any engagement."
        />
      </div>

      <PostAnnouncementModal
        isOpen={openPostAnnouncementModal}
        onClose={() => setOpenPostAnnouncementModal(false)}
      />
    </div>
  );
};
