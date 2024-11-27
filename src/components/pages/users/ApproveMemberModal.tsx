import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/core";

interface ApproveMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
}

export const ApproveMemberModal = ({
  isOpen,
  onClose,
  onApprove,
}: ApproveMemberModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogPanel className="max-w-[350px] space-y-4 bg-white p-5 rounded-lg">
        <DialogTitle className="font-bold">
          <Icon icon="lucide:octagon-alert" className="size-12 text-green-1" />
        </DialogTitle>

        <Description>
          <h4 className="font-bold text-xl text-text-primary">
            Approve [user name]?
          </h4>
          <p className="text-sm text-text-secondary">
            This action would approve [user name] to be a member of the church
          </p>
        </Description>

        <div className="flex gap-4 w-full">
          <Button theme="tertiary" onClick={onClose} className="w-full">
            Cancel
          </Button>
          <Button theme="primary" onClick={onApprove} className="w-full">
            Approve
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};
