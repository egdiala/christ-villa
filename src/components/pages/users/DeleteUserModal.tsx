import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/core";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteUserModal = ({
  isOpen,
  onClose,
  onDelete,
}: DeleteUserModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogPanel className="max-w-[350px] space-y-4 bg-white p-5 rounded-lg">
        <DialogTitle className="font-bold">
          <Icon
            icon="lucide:triangle-alert"
            className="size-12 text-accent-primary"
          />
        </DialogTitle>

        <Description>
          <h4 className="font-bold text-xl text-text-primary">
            Delete [user name]?
          </h4>
          <p className="text-sm text-text-secondary">
            This action would remove [user name] from the system and is
            irreversible.
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
    </Dialog>
  );
};
