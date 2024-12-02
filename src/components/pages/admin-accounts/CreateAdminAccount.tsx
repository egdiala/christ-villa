import React from "react";
import { Icon } from "@iconify/react";
import { createAdminSchema } from "@/validations/admin";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, Input, SelectInput } from "@/components/core";
import { Checkbox, Dialog, DialogPanel, DialogTitle, Field, Label } from "@headlessui/react";
import { cn } from "@/libs/cn";

interface CreateAdminAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateAdminAccountModal: React.FC<CreateAdminAccountModalProps> = ({ isOpen, onClose }) => {
    const genders = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" }
    ]

    const permissions = [
        { label: "Create", value: "create" },
        { label: "Read/View", value: "read" },
        { label: "Update", value: "update" },
        { label: "Delete", value: "delete" },
    ]
    const { register, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            name: "",
            email: "",
            gender: "",
            permission: [] as string[]
        },
        validationSchema: createAdminSchema,
        onSubmit() {
            
        }
    })
    const togglePermission = (value: string) => {
        if (!values.permission.includes(value)) {
            setFieldValue("permission", [value, ...values.permission])
            return;
        }
        const otherItems = values.permission.filter((item) => item !== value)
        setFieldValue("permission", otherItems)
    }
    return (
        <Dialog
        open={isOpen}
        onClose={onClose}
        as="div"
        className="relative z-10 focus:outline-none"
        >
            <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide duration-300 ease-out transition-opacity data-[closed]:opacity-0 bg-grey-dark-4/70">
                <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                    <DialogPanel transition className="flex flex-col gap-5 justify-between w-full max-w-[37.75rem] rounded-lg bg-white p-4 md:p-5 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                        <div className="flex items-center justify-between gap-3">
                            <DialogTitle className="font-bold text-text-primary text-xl">Add Admin Account</DialogTitle>
                            <button type="button" onClick={onClose} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-grey-dark-4 rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                        </div>

                        <form className="space-y-6">
                            <Input label="Admin Name" type="text" placeholder="Enter admin name" {...register("name")} />
                            <Input label="Email" type="email" placeholder="Enter email" {...register("email")} />
                            <SelectInput label="Gender" options={genders} {...register("gender")} />
                            <div className="ego-input--outer">
                                <span className="ego-input--label">Select Permissions</span>
                                <div className="grid grid-cols-4 gap-4">
                                    {
                                        permissions.map((item) => {
                                            const isChecked = values.permission.includes(item.value)
                                            return (
                                                <Field key={item.value} className={cn("flex items-center gap-2 border py-2 px-4 rounded transition-all duration-300 ease-out", isChecked ? "border-accent-primary bg-light-red" : "border-blue-4")}>
                                                    <Checkbox
                                                        checked={isChecked}
                                                        onChange={() => togglePermission(item.value)}
                                                        className="group block p-0.5 size-4 rounded-[2px] border border-grey-dark-2 data-[checked]:border-accent-primary bg-white data-[checked]:bg-light-red transition-all duration-300 ease-out"
                                                    >
                                                        <div className="size-2.5 rounded-[2px] bg-accent-primary opacity-0 group-data-[checked]:opacity-100 transition-all duration-300 ease-out" />
                                                    </Checkbox>
                                                    <Label className={cn("flex-1 text-sm transition-all duration-300 ease-out", isChecked ? "text-accent-primary font-semibold" : "text-text-primary")}>{item.label}</Label>
                                                </Field>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </form>

                        <div className="flex items-center justify-end gap-4 w-full md:w-5/6 ml-auto pt-10">
                            <Button type="button" theme="tertiary" onClick={onClose} block>
                                Cancel
                            </Button>
                            <Button type="submit" theme="primary" block>
                                Add Admin
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};
