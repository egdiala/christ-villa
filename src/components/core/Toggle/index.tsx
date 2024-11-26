import React from "react"
import { Field, Switch } from "@headlessui/react"

interface ToggleProps {
    checked: boolean
    disabled?: boolean;
    name?: string;
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: boolean) => void
    value?: string
}

export const Toggle: React.FC<ToggleProps> = ({ checked, disabled, name, onChange, value }) => {
    return (
        <Field disabled={disabled}>
            <Switch
                checked={checked}
                onChange={onChange}
                name={name}
                value={value}
                className="group relative flex h-[1.375rem] w-10 cursor-pointer rounded-full bg-grey-dark-3 p-0 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-dark-green-1"
            >
                <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-6 -mt-px -ml-px border-2 translate-x-0 rounded-full bg-grey-dark-1 group-data-[checked]:bg-green-1 ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-[1.2rem]"
                />
            </Switch>
        </Field>
    )
}