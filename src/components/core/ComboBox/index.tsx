import React from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { RenderIf } from "@/components/core";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Field } from "@headlessui/react";

interface ComboBoxProps<T> {
  /**
   * Label for select element
   */
  label?: string;
  /**
   * styles for select element
   */
  containerVariant?: string;
  /**
   * Help text for select element
   */
  help?: string;
  /**
   * Error message
   */
  error?: string | boolean;
  /**
   * Options for select
   */
  options: T[];
  /**
   * Disabled props
   */
  disabled?: boolean;
  selected?: T;
  multiple?: boolean;
  defaultValue?: T;
  // eslint-disable-next-line no-unused-vars
  setSelected: (value: T) => void;
  onClose?: () => void;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  // eslint-disable-next-line no-unused-vars
  displayValue?: (item: T) => string;
  // eslint-disable-next-line no-unused-vars
  optionLabel: (item: T) => any;
  /**
   * Other unknown attributes
   */
  [key: PropertyKey]: unknown;
}

export const ComboBox: React.FC<ComboBoxProps<any>> = ({ label, help, error, selected, options, onChange, displayValue, defaultValue, optionLabel, setSelected, onClose, disabled = false, multiple = false, ...props }) => {
    return (
        <Field disabled={disabled} className="relative ego-input--outer">
            <RenderIf condition={!!label}>
                <label className="ego-input--label">{label}</label>
            </RenderIf>
            <Combobox disabled={disabled} multiple={multiple} value={selected} defaultValue={defaultValue} virtual={{ options }} onChange={(value) => setSelected(value)} onClose={onClose}>
                <div className="relative">
                <ComboboxInput
                    className="ego-input pl-2 pr-8"
                    displayValue={(item: any) => displayValue?.(item) as string}
                    onChange={(event) => onChange(event.target.value)}
                    {...props}
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                    <Icon icon="lucide:chevron-down" className="size-5 text-grey-dark-3 group-data-[hover]:fill-grey-dark-2" />
                </ComboboxButton>
                </div>
                
                <RenderIf condition={options.length > 0}>
                    <ComboboxOptions
                        as="section"
                        portal={false}
                        anchor="bottom"
                        transition
                        className={cn(
                            "w-[var(--input-width)] rounded-b-lg border border-grey-dark-4 z-10 hover:bg-white bg-white mt-2 p-1 [--anchor-gap:var(--spacing-1)] [--anchor-max-height:24rem]",
                            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                        )}
                    >
                        {({ option }) => (
                            <ComboboxOption
                            value={option}
                            className="group flex w-full cursor-pointer justify-between items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-green-1/10"
                            >
                            <div className="text-sm/6 text-grey-dark-2">{optionLabel(option)}</div>
                            <Icon icon="lucide:check" className="invisible size-4 text-green-1 group-data-[selected]:visible" />
                            </ComboboxOption>
                        )}
                    </ComboboxOptions>
                </RenderIf>
                <RenderIf condition={options.length === 0}>
                    <ComboboxOptions
                        as="section"
                        portal={false}
                        anchor="bottom"
                        transition
                        className={cn(
                            "w-[var(--input-width)] rounded-b-lg hover:bg-white border border-grey-dark-4 z-10 bg-white mt-2 p-1 [--anchor-gap:var(--spacing-1)] ",
                            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                        )}
                    >
                        <div className="flex items-center justify-center text-center font-medium text-gray-500 py-1 text-sm w-full">No items found</div>
                    </ComboboxOptions>
                </RenderIf>
            </Combobox>
            <RenderIf condition={!!help}>
                <span className="ego-input--help">{help}</span>
            </RenderIf>
            <RenderIf condition={!!error}>
                <span className='ego-input--error'>{error}</span>
            </RenderIf>
        </Field>
    )
}