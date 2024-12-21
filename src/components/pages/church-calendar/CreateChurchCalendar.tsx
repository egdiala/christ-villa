import { Icon } from "@iconify/react";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, FileUpload, Input } from "@/components/core";
import { useCreateCalendar } from "@/services/hooks/mutations";
import { createChurchCalendarSchema } from "@/validations/church-calendar";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface CreateChurchCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateChurchCalendarModal: React.FC<CreateChurchCalendarModalProps> = ({ isOpen, onClose }) => {
    const { mutate, isPending } = useCreateCalendar(() => handleClose());

    const { handleSubmit, register, isValid, resetForm, setFieldValue, values } = useFormikWrapper({
        validateOnMount: true,
        initialValues: {
            title: "",
            file: null as File | null,
        },
        validationSchema: createChurchCalendarSchema,
        onSubmit:() => {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("file", values?.file as File);
            mutate(formData)
        },
    });

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            as="div"
            className="relative z-10 focus:outline-none"
        >
        <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide duration-300 ease-out transition-opacity data-[closed]:opacity-0 bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel
                    as="form"
                    onSubmit={handleSubmit}
                    transition
                    className="max-w-[493px] w-full lg:w-[493px] space-y-4 bg-white rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
                >
                    <DialogTitle className="flex justify-between bg-white rounded-t-lg z-[9] pt-6 px-6 ">
                        <h2 className="font-bold text-xl text-text-primary">
                            Add New Church Calendar
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-grey-dark-4 rounded-full ease-out duration-300 transition-all"
                        >
                            <Icon icon="ph:x-bold" />
                        </button>
                    </DialogTitle>

                    <Description className="px-6 grid gap-y-4">
                        <Input placeholder="Title" label="Name" type="text" {...register("title")} />
                        <FileUpload label="File" accept=".pdf, .xls, .xlsx, .csv" value={values?.file?.name} onChange={(v) => setFieldValue("file", v)} />
                    </Description>

                    <div className="flex gap-4 pt-10 justify-end px-6 pb-6">
                        <div className="flex gap-4 w-full md:w-auto">
                            <Button theme="tertiary" onClick={handleClose} className="w-1/2 md:w-auto" disabled={isPending} >
                                Cancel
                            </Button>
                            <Button type="submit" theme="primary" className="w-1/2 md:w-auto" loading={isPending} disabled={!isValid || isPending} >
                                Add Calendar
                            </Button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    );
};
