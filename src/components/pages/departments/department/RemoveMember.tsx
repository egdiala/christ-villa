import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/core";

interface RemoveMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
}

export const RemoveMemberModal = ({
  isOpen,
  onClose,
  onRemove,
}: RemoveMemberModalProps) => {
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
            Remove [member name]?
          </h4>
          <p className="text-sm text-text-secondary">
            This action would remove [member name] from this department and is
            irreversible.
          </p>
        </Description>

        <div className="flex gap-4 w-full">
          <Button theme="tertiary" onClick={onClose} block>
            Cancel
          </Button>
          <Button theme="primary" onClick={onRemove} block>
            Remove
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};
