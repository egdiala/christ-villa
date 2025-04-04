import React, { Fragment, useState } from "react";
import { Icon } from "@iconify/react";
import {
  CloseButton,
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Button, Checkbox, TableAction } from "@/components/core";
import { cn } from "@/libs/cn";

interface EngageFilterProps {
  setFilters: any;
  isLoading: boolean;
  theme?: string;
}

export const EngageFilter: React.FC<EngageFilterProps> = ({
  isLoading,
  setFilters,
  theme = "grey",
}) => {
  const status = [
    { label: "Active", value: "0" },
    { label: "Inactive", value: "1" },
  ];

  const engagementTypes = [
    { label: "Announcement", value: "ANNOUNCEMENT" },
    { label: "Push notification", value: "PUSH_NOTIFICATION" },
  ];

  const [statusFilters, setStatusFilters] = useState("");
  const [userEngagementFilters, setEngagementTypeFilters] = useState("");

  const applyFilter = (fn?: () => void) => {
    setFilters({
      status: statusFilters,
      type: userEngagementFilters,
    });
    fn?.();
  };

  return (
    <Popover className="relative">
      <PopoverButton as={TableAction} theme={theme} block>
        Filter
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
        className="bg-white p-6 rounded origin-top-right flex flex-col gap-6 w-96 md:w-[493px] transition duration-300 ease-out [--anchor-padding:16px] data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {({ close }) => (
          <Fragment>
            <h1 className="font-bold text-xl text-grey-dark-1">Filter</h1>
            <div className="grid grid-cols-2">
              <div className="grid col-span-1 gap-5 md:gap-8">
                <div className="flex flex-col gap-1 w-4/5">
                  <span className="uppercase text-text-tertiary text-xs">
                    ENGAGEMENT TYPE
                  </span>
                  {engagementTypes.map((item) => (
                    <div
                      key={item.label}
                      role="button"
                      onClick={() =>
                        setEngagementTypeFilters(
                          userEngagementFilters !== item.value ? item.value : ""
                        )
                      }
                      className={cn(
                        "flex w-full whitespace-nowrap items-center gap-2 cursor-pointer rounded bg-transparent py-2.5 px-2 transition duration-300 ease-out",
                        userEngagementFilters === item.value
                          ? "bg-red-5 font-medium text-red-2"
                          : "text-grey-dark-2"
                      )}
                    >
                      <Checkbox
                        name={item.label.toLowerCase()}
                        value={item.value}
                        checked={userEngagementFilters === item.value}
                        onChange={() =>
                          setEngagementTypeFilters(
                            userEngagementFilters !== item.value
                              ? item.value
                              : ""
                          )
                        }
                      />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid col-span-1 gap-5 md:gap-8">
                <div className="flex flex-col gap-1 w-2/3">
                  <span className="uppercase text-text-tertiary text-xs">
                    STATUS
                  </span>
                  {status.map((item) => (
                    <div
                      key={item.label}
                      role="button"
                      onClick={() =>
                        setStatusFilters(
                          statusFilters !== item.value ? item.value : ""
                        )
                      }
                      className={cn(
                        "flex w-full whitespace-nowrap items-center gap-2 cursor-pointer rounded bg-transparent py-2.5 px-2 transition duration-300 ease-out",
                        statusFilters === item.value
                          ? "bg-red-5 font-medium text-red-2"
                          : "text-grey-dark-2"
                      )}
                    >
                      <Checkbox
                        name={item.label.toLowerCase()}
                        value={item.value}
                        checked={statusFilters === item.value}
                        onChange={() =>
                          setStatusFilters(
                            statusFilters !== item.value ? item.value : ""
                          )
                        }
                      />
                      {item.label}
                    </div>
                  ))}
                </div>
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
