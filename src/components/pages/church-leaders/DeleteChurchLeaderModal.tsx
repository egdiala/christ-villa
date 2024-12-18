import {
  Description,
  Dialog,
  DialogPanel,
} from "@headlessui/react";
import caution from "@/assets/caution.gif";
import { Button } from "@/components/core";
import { useDeleteChurchLeader } from "@/services/hooks/mutations/useChurchLeaders";
import { FetchedChurchLeadersType } from "@/types/church-leaders";

interface DeleteChurchLeaderProps {
  value: {
    leader: FetchedChurchLeadersType;
    isOpen: boolean;
  };
  onClose: () => void;
}

export const DeleteChurchLeaderModal = ({
  value,
  onClose,
}: DeleteChurchLeaderProps) => {
  const { mutate, isPending } = useDeleteChurchLeader(() => onClose());
  const handleDeleteChurchLeader = () => {
    mutate(value.leader?.request_id);
  };

  return (
    <Dialog
      open={value.isOpen}
      onClose={onClose}
      as="div"
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide duration-300 ease-out transition-opacity data-[closed]:opacity-0 bg-grey-dark-4/70">
        <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
          <DialogPanel
            transition
            className="max-w-[350px] h-full space-y-5 bg-white p-5 rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
          >
            <img src={caution} alt="caution" className="size-12" />

            <Description className="grid gap-y-2">
              <h4 className="font-bold text-xl text-text-primary">
                Delete {value.leader?.leader_name}?
              </h4>
              <p className="text-sm text-text-secondary">
                This action would remove {value.leader?.leader_name} from the
                system and is irreversible.
              </p>
            </Description>

            <div className="flex gap-4 w-full">
              <Button
                theme="tertiary"
                onClick={onClose}
                className="w-full"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                theme="primary"
                onClick={handleDeleteChurchLeader}
                className="w-full"
                loading={isPending}
                disabled={isPending}
              >
                Delete
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};