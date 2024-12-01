import { Icon } from "@iconify/react";
import { Button } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface SuspendConnectGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuspendConnectGroupModal = ({
  isOpen,
  onClose,
}: SuspendConnectGroupModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      as="div"
      className="relative z-10 focus:outline-none"
    >
        <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide duration-300 ease-out transition-opacity data-[closed]:opacity-0 bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel transition className="flex flex-col gap-5 justify-between w-full md:max-w-[21.875rem] rounded-lg bg-white p-4 md:p-5 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <Icon icon="lucide:triangle-alert" className="size-12 text-accent-primary"/>

                    <div className="grid gap-2">
                        <DialogTitle className="font-bold text-xl text-text-primary">
                            Suspend [group name]?
                        </DialogTitle>
                        <p className="text-sm text-text-secondary">
                            This action would suspend [group name]. You can reactivate group.
                        </p>
                    </div>

                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button type="button" theme="tertiary" onClick={onClose} block>
                            Cancel
                        </Button>
                        <Button type="button" theme="primary" block>
                            Suspend Group
                        </Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
  );
};
