import React from "react";
import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker";
import { useUpdateSermonNote } from "@/services/hooks/mutations";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, Input, TextArea } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { format, subDays } from "date-fns";
import { createSermonSchema } from "@/validations/sermon";
import { FetchedSermonType } from "@/types/sermon";

interface EditSermonModalProps {
  sermon: FetchedSermonType;
  isOpen: boolean;
  onClose: () => void;
}

export const EditSermonModal: React.FC<EditSermonModalProps> = ({ isOpen, onClose, sermon }) => {
    const { mutate, isPending } = useUpdateSermonNote(() => close())

    const { handleSubmit, isValid, register, resetForm, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            sermon_date: sermon?.sermon_date || "",
            preacher_name: sermon?.preacher_name || "",
            description: sermon?.description || "",
        },
        validationSchema: createSermonSchema,
        enableReinitialize: true,
        onSubmit: () => {
            const { sermon_date, ...rest } = values
            mutate({ sermon_date: format(sermon_date, "yyyy-MM-dd"), ...rest, id: sermon?.sermon_id as string })
        }
    })
    const close = () => {
        onClose();
        resetForm();
    }

    return (
        <Dialog
        open={isOpen}
        onClose={close}
        as="div"
        className="relative z-10 focus:outline-none"
        >
            <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide duration-300 ease-out transition-opacity data-[closed]:opacity-0 bg-grey-dark-4/70">
                <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                    <DialogPanel as="form" onSubmit={handleSubmit} transition className="flex flex-col gap-5 justify-between w-full max-w-[37.75rem] rounded-lg bg-white p-4 md:p-5 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                        <div className="flex items-center justify-between gap-3">
                            <DialogTitle className="font-bold text-text-primary text-xl">Edit Sermon Note</DialogTitle>
                            <button type="button" onClick={close} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-grey-dark-4 rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                        </div>

                        <div className="space-y-6">
                            <Input label="Preacher Name" type="text" placeholder="Enter preacher name" {...register("preacher_name")} />
                            <div className="grid">
                                <DatePicker
                                    selected={values?.sermon_date as any}
                                    onChange={(date) => setFieldValue("sermon_date", date)}
                                    customInput={<Input type="text" iconLeft="solar:calendar-bold" />}
                                    dateFormat="yyyy-MM-dd"
                                    minDate={subDays(new Date(), -1)}
                                    placeholderText="Select a date from today"
                                />
                            </div>
                            <TextArea label="Description" placeholder="Enter a sermon description" {...register("description")} />
                        </div>

                        <div className="flex items-center justify-end gap-4 w-full md:w-5/6 ml-auto pt-10">
                            <Button type="button" theme="tertiary" onClick={close} block>
                                Cancel
                            </Button>
                            <Button type="submit" theme="primary" loading={isPending} disabled={!isValid || isPending} block>
                                Edit Sermon
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};
