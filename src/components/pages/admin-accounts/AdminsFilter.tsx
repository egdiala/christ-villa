import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import React, { Fragment, useState } from "react";
import { Button, Checkbox, TableAction } from "@/components/core";
import { CloseButton, Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from "@headlessui/react";

interface AdminsFilterProps {
    // eslint-disable-next-line no-unused-vars
    setFilters: any;
    isLoading: boolean;
    theme?: string;
}

export const AdminsFilter: React.FC<AdminsFilterProps> = ({ isLoading, setFilters, theme = "grey" }) => {
    const profileStatus = [
        { label: "Pending", name: "pending", value: "0" },
        { label: "Active", name: "active", value: "1" },
        { label: "Suspended", name: "suspended", value: "2" }
    ]

    const [statusFilters, setStatusFilters] = useState("");

    const applyFilter = (fn?: () => void) => {
        setFilters({
            request_status: statusFilters,
        });
        fn?.();
    };


    return (
        <Popover className="relative">
            <PopoverButton as={TableAction} theme={theme} block>
                Filter
                <Icon icon="lucide:chevron-down" className="size-4 text-accent-primary" />
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
                            
                            {/* User Type Filters */}
                            <div className="flex flex-col gap-1 w-2/3">
                                <span className="uppercase text-text-tertiary text-xs">USER TYPE</span>
                                {profileStatus.map((item) => (
                                    <div
                                        key={item.label}
                                        role="button"
                                        onClick={() => setStatusFilters(statusFilters !== item.value ? item.value : "")}
                                        className={cn(
                                            "flex w-full whitespace-nowrap items-center gap-2 cursor-pointer rounded bg-transparent py-2.5 px-2 transition duration-300 ease-out",
                                            statusFilters === item.value ? "bg-red-5 font-medium text-red-2" : "text-grey-dark-2"
                                        )}
                                    >
                                        <Checkbox
                                            name={item.label.toLowerCase()}
                                            value={item.value}
                                            checked={statusFilters === item.value}
                                            onChange={() => setStatusFilters(statusFilters !== item.value ? item.value : "")}
                                        />
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full max-w-80 ml-auto pt-10 flex items-center justify-end gap-4">
                            <CloseButton as={Button} theme="tertiary" block onClick={() => close()}>
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