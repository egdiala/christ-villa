/* eslint-disable no-unused-vars */
import React from "react";
import { Icon } from "@iconify/react";
import "./pagination.css";

export interface PaginationProps {
  /**
   * Current page.
   */
  currentPage: number;
  /**
   * Total pages.
   */
  totalPages: number;
  /**
   * Go to previous page.
   */
  prev: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Go to next page.
   */
  next: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Go to specific page.
   */
  goToPage: (v: string | number) => void;
  /**
   * Other unknown attributes
   */
  [key: PropertyKey]: any;
}

/**
 * Pagination component for iterating through data on a table
 */

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages,
  goToPage,
  prev,
  next,
  className,
}) => {

  return (
    <div
      className={`ego-pagination-container ${className ?? "pt-4 px-4 pb-2.5"}`}
    >
      <div className="relative inline-block text-left">
        <div className="text-sm text-grey-dark-3 inline-flex justify-center w-full focus:outline-none items-center gap-2">
            Showing page 
            <span className="text-grey-dark-1 font-normal">
                {currentPage} of {totalPages}
            </span>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-start">
        <button
          type="button"
          onClick={prev}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "ego-pagination-arrow-button-inactive" : "ego-pagination-arrow-button-active"}
        >
          <Icon
            icon="heroicons:chevron-left-solid"
            className="text-base"
          />
        </button>
        <div className="relative flex flex-col items-center gap-2">
          <input value={currentPage} type="text" inputMode="numeric" onChange={(e) => goToPage(e.target.value)} className="rounded-md text-base text-center border border-blue-4 bg-grey-dark-4 focus:border-light-blue-1 focus:bg-light-blue-4 text-text-primary placeholder:text-text-tertiary disabled:bg-grey-dark-4 disabled:border-transparent disabled:text-text-tertiary caret-text-primary transition-all duration-300 ease-out px-2 max-w-11 w-full block h-7" />
          <span className="absolute -bottom-4 text-grey-dark-3 text-[0.625rem]/3 whitespace-nowrap">Click to Edit</span>
        </div>
        <button
          type="button"
          onClick={next}
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? "ego-pagination-arrow-button-inactive" : "ego-pagination-arrow-button-active"}
        >
          <Icon
            icon="heroicons:chevron-right-solid"
            className="text-base"
          />
        </button>
      </div>
    </div>
  );
};