import React, { Fragment, useState } from "react";
import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker";
import {
  CloseButton,
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Button, Input, TableAction } from "@/components/core";

interface GraphFilterProps {
  // eslint-disable-next-line no-unused-vars
  setFilters: any;
  isLoading: boolean;
  theme?: string;
}

export const GraphFilter: React.FC<GraphFilterProps> = ({
  isLoading,
  setFilters,
  theme = "grey",
}) => {
  const [yearFilter, setYearFilter] = useState<Date>(new Date());

  const applyFilter = (fn?: () => void) => {
    setFilters({
      year: yearFilter?.getFullYear()?.toString(),
    });
    fn?.();
  };

  return (
    <Popover className="relative">
      <PopoverButton as={TableAction} theme={theme} block>
        Date
        <Icon
          icon="lucide:chevron-down"
          className="size-4 text-accent-primary"
        />
      </PopoverButton>
      <PopoverBackdrop className="fixed inset-0 bg-black/15 z-10" />
      <PopoverPanel
        as="section"
        transition
        anchor="bottom end"
        className="bg-white p-6 rounded origin-top-right flex flex-col gap-6 w-96 md:w-lg transition duration-300 ease-out [--anchor-padding:16px] data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {({ close }) => (
          <Fragment>
            <h1 className="font-bold text-xl text-grey-dark-1">Filter</h1>
            <div className="grid gap-5 md:gap-8">
              <div className="flex flex-col gap-1 w-2/3">
                <span className="uppercase text-text-tertiary text-xs">
                  YEAR
                </span>

                <DatePicker
                  selected={yearFilter}
                  onChange={(date) => setYearFilter(date as Date)}
                  showYearPicker
                  customInput={
                    <Input
                      type="text"
                      inputMode="numeric"
                      iconLeft="solar:calendar-bold"
                    />
                  }
                  dateFormat="yyyy"
                />
              </div>
            </div>
            <div className="w-full max-w-80 ml-auto pt-10 flex items-center justify-end gap-4">
              <CloseButton
                as={Button}
                theme="tertiary"
                block
                onClick={() => close()}
              >
                Close
              </CloseButton>
              <Button
                type="button"
                theme="primary"
                loading={isLoading}
                disabled={isLoading}
                block
                onClick={() => applyFilter(close)}
              >
                Apply
              </Button>
            </div>
          </Fragment>
        )}
      </PopoverPanel>
    </Popover>
  );
};
