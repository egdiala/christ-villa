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
      as="div"
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide duration-300 ease-out transition-opacity data-[closed]:opacity-0 bg-grey-dark-4/70">
        <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
          <DialogPanel
            transition
            className="max-w-[350px] space-y-5 bg-white p-5 rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
          >
            <DialogTitle className="font-bold">
              <Icon
                icon="lucide:octagon-alert"
                className="size-12 text-green-1"
              />
            </DialogTitle>

            <Description className="grid gap-y-2">
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
        </div>
      </div>
    </Dialog>
  );
};
