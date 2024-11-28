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

export const ApproveMemberRequestModal = ({
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
            Approve request to join department?
          </h4>
          <p className="text-sm text-text-secondary">
            This action would add [member name] to this department. You can
            remove this member anytime.
          </p>
        </Description>

        <div className="flex gap-4 w-full">
          <Button theme="tertiary" onClick={onClose} block>
            Cancel
          </Button>
          <Button theme="primary" onClick={onApprove} block>
            Approve
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};
