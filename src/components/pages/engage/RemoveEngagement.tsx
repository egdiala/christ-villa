import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/core";

interface RemoveEngagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const RemoveEngagementModal = ({
  isOpen,
  onClose,
  onDelete,
}: RemoveEngagementModalProps) => {
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
            <DialogTitle className="font-bold">
              <Icon
                icon="lucide:triangle-alert"
                className="size-12 text-accent-primary"
              />
            </DialogTitle>

            <Description className="grid gap-y-2">
              <h4 className="font-bold text-xl text-text-primary">
                Delete [announcement name]?
              </h4>
              <p className="text-sm text-text-secondary">
                This action would remove [announcement name] from the system and
                is irreversible.
              </p>
            </Description>

            <div className="flex gap-4 w-full">
              <Button theme="tertiary" onClick={onClose} className="w-full">
                Cancel
              </Button>
              <Button theme="primary" onClick={onDelete} className="w-full">
                Delete
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
