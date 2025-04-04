import caution from "@/assets/caution.gif";
import { Button } from "@/components/core";
import type { FetchedSermonType } from "@/types/sermon";
import { useDeleteSermonNote } from "@/services/hooks/mutations";
import { Description, Dialog, DialogPanel } from "@headlessui/react";

interface DeleteSermonModalProps {
  isOpen: boolean;
  onClose: () => void;
  sermon: FetchedSermonType;
}

export const DeleteSermonModal = ({ isOpen, onClose, sermon }: DeleteSermonModalProps) => {
  const { mutate, isPending } = useDeleteSermonNote(() => onClose())
  return (
    <Dialog
      open={isOpen}
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
                Delete Sermon?
              </h4>
              <p className="text-sm text-text-secondary">
                This action would remove this sermon from the system and
                is irreversible.
              </p>
            </Description>

            <div className="flex gap-4 w-full">
              <Button theme="tertiary" onClick={onClose} type="button" block>
                Cancel
              </Button>
              <Button theme="primary" disabled={isPending} loading={isPending} onClick={() => mutate(sermon?.sermon_id)} type="button" block>
                Delete
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
