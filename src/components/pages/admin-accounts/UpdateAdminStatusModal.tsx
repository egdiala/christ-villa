import caution from "@/assets/caution.gif";
import type { FetchedAdminType } from "@/types/admin";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { updateAdminStatusSchema } from "@/validations/admin";
import { Button, RenderIf, TextArea } from "@/components/core";
import { useUpdateAdminStatus } from "@/services/hooks/mutations";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface UpdateAdminStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    admin: FetchedAdminType;
}

export const UpdateAdminStatusModal = ({ admin, isOpen, onClose }: UpdateAdminStatusModalProps) => {
    const { mutate, isPending } = useUpdateAdminStatus(() => close())
    const action = admin?.status === 1 ? "suspend" : "activate"

    const { handleSubmit, isValid, register, resetForm, values } = useFormikWrapper({
        initialValues: {
            reason: ""
        },
        validationSchema: updateAdminStatusSchema,
        onSubmit: () => {
            mutate({ user_id: admin?.user_id, status: "2", reason: values.reason })
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
                    <DialogPanel as="form" onSubmit={handleSubmit} transition className="flex flex-col gap-5 justify-between w-full md:max-w-[21.875rem] rounded-lg bg-white p-4 md:p-5 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                        <img src={caution} alt="caution" className="size-12" />

                        <div className="grid gap-2">
                            <DialogTitle className="capitalize font-bold text-xl text-text-primary">
                                { action } {admin?.name}
                            </DialogTitle>
                            <p className="text-sm text-text-secondary">
                                This action would {action} {admin?.name}. Admin will not be able to access this platform.
                            </p>
                        </div>
                        <RenderIf condition={admin?.status === 1}>
                            <TextArea label="Reason" placeholder="Type your reason" {...register("reason")} />
                        </RenderIf>

                        <div className="flex items-center justify-end gap-4 w-full">
                            <Button type="button" theme="tertiary" onClick={close} block>
                                Cancel
                            </Button>
                            <RenderIf condition={admin?.status === 1}>
                                <Button type="submit" theme="primary" disabled={!isValid || isPending} loading={isPending}>
                                    Suspend Admin
                                </Button>
                            </RenderIf>
                            <RenderIf condition={admin?.status === 2}>
                                <Button type="button" theme="primary" disabled={isPending} loading={isPending} block onClick={() => mutate({ user_id: admin?.user_id, status: "1" })}>
                                    Activate Admin
                                </Button>
                            </RenderIf>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};
