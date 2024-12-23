import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import { Icon } from "@iconify/react";
import blankImage from "@/assets/blank.svg";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader } from "@/components/core/Button/Loader";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import {
  getPaginationParams,
  setPaginationParams,
} from "@/hooks/usePaginationParams";
import { useGetChurchLeadership } from "@/services/hooks/queries/useChurchLeaders";
import {
  FetchedChurchLeadersCountType,
  FetchedChurchLeadersType,
} from "@/types/church-leaders";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  AddChurchLeadershipModal,
  EditChurchLeadershipModal,
  DeleteChurchLeaderModal,
} from "@/components/pages/church-leaders";
import { AnimatePresence, motion } from "motion/react";

export const ChurchLeadershipPage: React.FC = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isGridView, setIsGridView] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const { value, onChangeHandler } = useDebounce(300);

  const { data, isLoading } = useGetChurchLeadership<
    FetchedChurchLeadersType[]
  >({
    q: value,
    page: page.toString(),
    item_per_page: itemsPerPage.toString(),
  });

  const { data: leadersCount, isLoading: loadingLeadersCount } =
    useGetChurchLeadership<FetchedChurchLeadersCountType>({
      component: "count",
      q: value,
    });

  const [openUpdateLeaderModal, setOpenUpdateLeaderModal] = useState<{
    leader: FetchedChurchLeadersType;
    isOpen: boolean;
  }>({
    leader: {} as FetchedChurchLeadersType,
    isOpen: false,
  });
  const [openDeleteLeaderModal, setOpenDeleteLeaderModal] = useState<{
    leader: FetchedChurchLeadersType;
    isOpen: boolean;
  }>({
    leader: {} as FetchedChurchLeadersType,
    isOpen: false,
  });
  const [openAddLeaderModal, setOpenAddLeaderModal] = useState(false);

  const actions = [
    {
      label: "Update Leader",
      icon: "lucide:pencil-line",
      onClick: (leader: FetchedChurchLeadersType) =>
        setOpenUpdateLeaderModal({ leader: leader, isOpen: true }),
    },
    {
      label: "Delete Leader",
      icon: "lucide:trash-2",
      onClick: (leader: FetchedChurchLeadersType) =>
        setOpenDeleteLeaderModal({ leader: leader, isOpen: true }),
    },
  ];

  const columns = [
    {
      header: () => "Leader Name",
      accessorKey: "leader_name",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className="size-12">
              <img
                src={item?.url || blankImage}
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <p className="text-sm text-text-secondary capitalize">
              {item?.leader_name}
            </p>
          </div>
        );
      },
    },
    {
      header: () => "Position",
      accessorKey: "leader_position",
      cell: ({ row }: { row: any }) => {
        const item = row?.original;
        return (
          <div className="capitalize">
            {item?.leader_position}
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
            placeholder="Search leader name"
            onChange={onChangeHandler}
          />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <TableAction theme="ghost" onClick={() => setIsGridView(!isGridView)}>
            <Icon
              icon={isGridView ? "lucide:list" : "lucide:grid-2x2"}
              className="size-4 group-hover:text-white text-accent-primary"
            />
          </TableAction>
          <TableAction theme="grey" block>
            Export
            <Icon
              icon="lucide:cloud-download"
              className="size-4 text-accent-primary"
            />
          </TableAction>
          <TableAction
            type="button"
            theme="primary"
            onClick={() => setOpenAddLeaderModal(true)}
            block
          >
            <Icon icon="lucide:plus" className="size-4" />
            Add Leader
          </TableAction>
        </div>
      </div>
      <RenderIf condition={!isLoading && !loadingLeadersCount}>
        <AnimatePresence>
          {
            isGridView ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-4 gap-6">
                {
                  data?.map((leader) =>
                    <div key={leader?.request_id} className="flex flex-col items-center gap-4">
                      <div className="size-40 rounded-full overflow-hidden">
                        <img src={leader?.url} alt={leader?.leader_name} className="size-40 object-cover" />
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <h2 className="text-grey-dark-1 text-xl font-medium">{leader?.leader_name}</h2>
                        <p className="text-grey-dark-2 text-base">{leader?.leader_position}</p>
                      </div>
                      <div className="flex items-center gap-2 justify-center">
                      {
                        actions.map((action) =>
                          <button key={action?.label} type="button" onClick={() => action?.onClick(leader)} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-grey-dark-4 rounded-full ease-out duration-300 transition-all">
                            <Icon icon={action?.icon} />
                          </button>
                        )
                      }
                      </div>
                    </div>
                  )
                }
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Table
                  columns={columns}
                  data={data ?? []}
                  page={page}
                  perPage={itemsPerPage}
                  totalCount={leadersCount?.total}
                  onPageChange={handlePageChange}
                  emptyStateText="We couldn't find any leader."
                />
              </motion.div>
            )
          }
        </AnimatePresence>
      </RenderIf>
      <RenderIf condition={isLoading || loadingLeadersCount}>
        <div className="flex w-full h-96 items-center justify-center">
          <Loader className="spinner size-6 text-accent-primary" />
        </div>
      </RenderIf>

      <AddChurchLeadershipModal
        isOpen={openAddLeaderModal}
        onClose={() => setOpenAddLeaderModal(false)}
      />

      <EditChurchLeadershipModal
        value={openUpdateLeaderModal}
        onClose={() =>
          setOpenUpdateLeaderModal({
            leader: {} as FetchedChurchLeadersType,
            isOpen: false,
          })
        }
      />

      <DeleteChurchLeaderModal
        value={openDeleteLeaderModal}
        onClose={() =>
          setOpenDeleteLeaderModal({
            leader: {} as FetchedChurchLeadersType,
            isOpen: false,
          })
        }
      />
    </div>
  );
};
