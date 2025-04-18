import { Icon } from "@iconify/react";
import { Button, SelectInput } from "@/components/core";
import type { FetchedRequestType } from "@/types/requests";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { updateRequestStatusSchema } from "@/validations/request";
import { useUpdateRequestStatus } from "@/services/hooks/mutations";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface UpdateRequestStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRequest: FetchedRequestType;
}

export const UpdateRequestStatusModal = ({
  isOpen,
  onClose,
  activeRequest,
}: UpdateRequestStatusModalProps) => {
  const { mutate, isPending } = useUpdateRequestStatus(() => close());
  const genders = [
    { label: "Approve", value: "1" },
    { label: "Reject", value: "2" },
  ];

  const { handleSubmit, isValid, register, resetForm, values } =
    useFormikWrapper({
      initialValues: {
        status: activeRequest?.status?.toString(),
      },
      enableReinitialize: true,
      validationSchema: updateRequestStatusSchema,
      onSubmit: () => {
        mutate({ request_id: activeRequest?.request_id, ...values });
      },
    });

  const close = () => {
    onClose();
    resetForm();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      as="div"
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide duration-300 ease-out transition-opacity data-[closed]:opacity-0 bg-grey-dark-4/70">
        <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
          <DialogPanel
            as="form"
            onSubmit={handleSubmit}
            transition
            className="flex flex-col gap-5 justify-between w-full max-w-[30.8125rem] rounded-lg bg-white p-4 md:p-5 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
          >
            <div className="flex items-center justify-between gap-3">
              <DialogTitle className="font-bold text-text-primary text-xl">
                Update Request Status
              </DialogTitle>
              <button
                type="button"
                onClick={close}
                className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-grey-dark-4 rounded-full ease-out duration-300 transition-all"
              >
                <Icon icon="ph:x-bold" />
              </button>
            </div>

            <div className="space-y-6">
              <SelectInput
                label="Select New Status"
                options={genders}
                {...register("status")}
              />
            </div>

            <div className="flex items-center justify-end gap-4 w-full md:w-5/6 ml-auto pt-10">
              <Button type="button" theme="tertiary" onClick={close} block>
                Cancel
              </Button>
              <Button
                type="submit"
                theme="primary"
                disabled={!isValid || isPending}
                loading={isPending}
                block
              >
                Update
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
