import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Button, Input, SelectInput } from "@/components/core";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import {
  FetchedChurchLeadersType,
  leaderPositions,
} from "@/types/church-leaders";
import { useUpdateChurchLeader } from "@/services/hooks/mutations/useChurchLeaders";
import { createChurchLeaderSchema } from "@/validations/church-leaders";

interface EditChurchLeadershipModalProps {
  value: {
    leader: FetchedChurchLeadersType;
    isOpen: boolean;
  };
  onClose: () => void;
}

export const EditChurchLeadershipModal = ({
  value,
  onClose,
}: EditChurchLeadershipModalProps) => {
  const { handleSubmit, register, isValid, resetForm } = useFormikWrapper({
    validateOnMount: true,
    initialValues: {
      leader_name: value?.leader?.leader_name,
      leader_position: value?.leader?.leader_position,
    },
    validationSchema: createChurchLeaderSchema,
    enableReinitialize: true,
    onSubmit(values) {
      mutate({
        ...values,
        request_id: value.leader?.request_id,
      });
    },
  });

  const handleClose = () => {
    resetForm();
    onClose();
  };
  const { mutate, isPending } = useUpdateChurchLeader(handleClose);

  return (
    <Dialog
      open={value.isOpen}
      onClose={handleClose}
      as="div"
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide duration-300 ease-out transition-opacity data-[closed]:opacity-0 bg-grey-dark-4/70">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center"
        >
          <DialogPanel
            transition
            className="max-w-[493px] w-full lg:w-[493px] space-y-4 bg-white rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
          >
            <DialogTitle className="flex justify-between bg-white rounded-t-lg z-[9] pt-6 px-6 ">
              <h2 className="font-bold text-xl text-text-primary">
                Update Leader
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
              <Input
                placeholder="Name"
                label="Name" type="text"
                {...register("leader_name")}
              />
              <SelectInput
                options={leaderPositions}
                label="Position"
                {...register("leader_position")}
              />
            </Description>

            <div className="flex gap-4 pt-10 justify-end px-6 pb-6">
              <div className="flex gap-4 w-full md:w-auto">
                <Button
                  theme="tertiary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  theme="primary"
                  loading={isPending}
                  disabled={!isValid || isPending}
                >
                  Update Leader
                </Button>
              </div>
            </div>
          </DialogPanel>
        </form>
      </div>
    </Dialog>
  );
};
