import { Icon } from "@iconify/react";
import { Button, Input } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface CreateConnectGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateConnectGroupModal = ({
  isOpen,
  onClose,
}: CreateConnectGroupModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogPanel className="w-full max-w-[30.8125rem] space-y-6 bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between gap-3">
            <DialogTitle className="font-bold text-text-primary text-xl">Add New Connect Group</DialogTitle>
            <button type="button" onClick={onClose} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-grey-dark-4 rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
        </div>

        <form className="space-y-6">
            <Input label="Name" placeholder="Enter name here" />
            <Input label="Description" placeholder="Enter description here" />
        </form>

        <div className="flex items-center justify-end gap-4 w-5/6 float-right pt-10">
          <Button type="button" theme="tertiary" onClick={onClose} block>
            Cancel
          </Button>
          <Button type="submit" theme="primary" block>
            Add Connect Group
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};
