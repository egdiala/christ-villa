import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { Icon } from "@iconify/react";
import { Pagination, RenderIf } from "..";
import { EmptyState } from "./EmptyState";
import { TableLoader } from "./TableLoader";
import { useLocation } from "react-router";
import { getPaginationParams } from "@/hooks/usePaginationParams";
import { cn } from "@/libs/cn";

interface TableProps {
  columns: ColumnDef<any>[]; // table columns; see Table.stories.tsx for sample use
  data: any[]; // table data
  page?: number;
  loading?: boolean;
  perPage?: number;
  paginateData?: boolean; // show pagination
  config?: Partial<TableOptions<any>>
  totalCount?: number; // total count of table data
  emptyStateText?: string;
  // eslint-disable-next-line no-unused-vars
  getData?: (page: number, rowsPerPage: number) => void; // handle pagination on page mount
  // eslint-disable-next-line no-unused-vars
  onClick?: (row: any) => void; // on click event for table row
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number, rowsPerPage: number) => void; // handle pagination change
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  page,
  perPage,
  loading = false,
  getData,
  totalCount,
  emptyStateText = "",
  onPageChange,
  onClick,
  paginateData = true,
  config
}) => {
  const location = useLocation();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(page as number);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
    ...config
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page, (perPage as number));
  };

  // Function to navigate to a specific page
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalCount!) {
      handlePageChange(page);
    }
  };

  // Function to navigate to previous page
  const prev = () => {
    if ((page as number) > 1) {
      handlePageChange((page as number) - 1);
    }
  };

  // Function to navigate to next page
  const next = () => {
    if ((page as number) < totalCount!) {
      handlePageChange((page as number) + 1);
    }
  };

  React.useEffect(() => {
    if (paginateData) {
      getPaginationParams(location, setCurrentPage, () => {});
      getData?.(currentPage, (perPage as number));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <div className="grid gap-8">
      <div className="lg:w-full lg:left-auto lg:relative lg:right-auto left-0 right-0 overflow-x-scroll scrollbar-hide">
        <table className="table-auto w-full">
          {/* Table Head */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-grey-dark-4 rounded-lg cursor-pointer"
              >
                {headerGroup.headers.map((header, index) => {
                  return (
                    <th
                      key={header.id}
                      className={`text-left px-2 py-2.5 last:text-right ${header.column.getCanSort() && "cursor-pointer select-none"}`}
                      onClick={index === 0 ? header.column.getToggleSortingHandler() : () => { }}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                              ? "Sort descending"
                              : "Clear sort"
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-1 text-grey-dark-1 text-sm font-medium whitespace-nowrap">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        <RenderIf condition={index === 0}>
                          <Icon
                            icon="ph:caret-up-down-fill"
                            className="text-neutral-40"
                          />
                        </RenderIf>
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {/* Table Body */}
          <RenderIf condition={loading}>
            <tbody className="min-h-[20rem]">
              <TableLoader />
            </tbody>
          </RenderIf>
          <RenderIf condition={data.length > 0}>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={row.id}
                    onClick={() => onClick?.(row)}
                    className={cn("hover:bg-green-4", !onClick ? "cursor-default" : "cursor-pointer", row?.getIsSelected() && "bg-green-4")}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="text-left pl-2 pr-3 py-3.5 text-grey-dark-2 text-sm font-normal"
                          onClick={(e) => {
                            if (
                              cell.column.id === "action" ||
                              cell.column.id === "status"
                            ) {
                              e.stopPropagation();
                            }
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </RenderIf>
        </table>
        <RenderIf condition={data.length < 1 && !loading}>
            <div className="flex items-center justify-center">
              <EmptyState emptyStateText={emptyStateText} />
            </div>
        </RenderIf>
      </div>
      <RenderIf condition={paginateData && (totalCount as number) > 0 && !loading}>
        <Pagination
          className="px-0 py-3"
          count={totalCount as number}
          currentPage={page as number}
          dataLength={totalCount as number}
          totalPages={Math.ceil((totalCount as number) / (perPage as number))}
          prev={prev}
          next={next}
          goToPage={(v) => goToPage(Number(v))}
        />
      </RenderIf>
    </div>
  );
};