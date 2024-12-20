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
import { setPaginationParams } from "@/hooks/usePaginationParams";
import { PostAnnouncementModal } from "@/components/pages/dashboard";
import { useGetAnnouncements } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import type { FetchedAnnouncementType } from "@/types/engage";
import { format } from "date-fns";
import { useDebounce } from "@/hooks/useDebounce";
import { RemoveEngagementModal, ViewEngagementModal } from "@/components/pages/engage";

export const EngagePage: React.FC = () => {

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [openPostAnnouncementModal, setOpenPostAnnouncementModal] = useState(false);
  const { value, onChangeHandler } = useDebounce(300)
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: announcements, isLoading } = useGetAnnouncements<FetchedAnnouncementType[]>({ page: page.toString(), item_per_page: itemsPerPage.toString(), q: value })
  const { data: announcementCount, isLoading: isLoadingCount } = useGetAnnouncements<{ total: number }>({ component: "count", q: value })
  const [toggleModals, setToggleModals] = useState({
    openViewAnnouncement: false,
    openDeleteAnnouncement: false,
    activeAnnouncement: null as FetchedAnnouncementType | null
  })

  const columns = [
    {
      header: () => "Sent by",
      accessorKey: "name",
      cell: () => {
        // const item = row?.original as FetchedAnnouncementType;
        return (
          <div className="flex items-center gap-x-3 whitespace-nowrap">
            {/* <div className="size-8">
              <img
                src={item?.avatar}
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <p className="text-sm text-text-secondary">{item?.name}</p> */}
          </div>
        );
      },
    },
    {
      header: () => "Sent Date & Time",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedAnnouncementType;
        return (
          <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">
            <span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}
          </div>
        );
      },
    },
    {
      header: () => "Type",
      accessorKey: "type",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedAnnouncementType;
        return (
          <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">
            {item?.type}
          </div>
        );
      },
    },
  ];

  const handlePageChange = (page: number) => {
    setPage(page);
    setPaginationParams(page, itemsPerPage, searchParams, setSearchParams);
  };


  return (
    <div className="flex flex-col gap-5 px-4 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
      <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
        <div className="flex-1 md:max-w-96">
          <SearchInput placeholder="Search by name or email" onChange={onChangeHandler} />
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
            onClick={() => setOpenPostAnnouncementModal(true)}
          >
            <Icon icon="lucide:volume-2" />
            Post/Send a Message
          </Button>
        </div>
      </div>

      <div>
        <RenderIf condition={!isLoading && !isLoadingCount}>
          <Table
            columns={columns}
            data={announcements ?? []}
            page={page}
            perPage={itemsPerPage}
            totalCount={announcementCount?.total}
            onPageChange={handlePageChange}
            emptyStateText="We couldn't find any engagement."
            onClick={({ original }) => setToggleModals((prev) => ({ ...prev, openViewAnnouncement: true, activeAnnouncement: original }))}
          />
        </RenderIf>
        <RenderIf condition={isLoading || isLoadingCount}>
            <div className="flex w-full h-96 items-center justify-center">
                <Loader className="spinner size-6 text-accent-primary" />
            </div>
        </RenderIf>
      </div>

      <ViewEngagementModal
        isOpen={toggleModals.openViewAnnouncement}
        announcement={toggleModals.activeAnnouncement!}
        onClose={() => setToggleModals((prev) => ({ ...prev, openViewAnnouncement: false, activeAnnouncement: null }))}
        onDelete={() => setToggleModals((prev) => ({ ...prev, openViewAnnouncement: false, openDeleteAnnouncement: true }))}
      />

      <RemoveEngagementModal
        isOpen={toggleModals.openDeleteAnnouncement}
        announcement={toggleModals.activeAnnouncement!}
        onClose={() => setToggleModals((prev) => ({ ...prev, openDeleteAnnouncement: false, activeAnnouncement: null }))}
      />

      <PostAnnouncementModal
        isOpen={openPostAnnouncementModal}
        onClose={() => setOpenPostAnnouncementModal(false)}
      />
    </div>
  );
};
