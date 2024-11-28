import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Button, Input } from "@/components/core";

interface AddNewDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDepartment: () => void;
}

export const AddNewDepartmentModal = ({
  isOpen,
  onClose,
  onAddDepartment,
}: AddNewDepartmentModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogPanel className="max-w-[493px] w-[calc(100%-20px)] lg:w-[493px] space-y-4 bg-white rounded-lg overflow-hidden">
        <DialogTitle className="flex justify-between sticky top-0 bg-white z-[9] pt-6 px-6 ">
          <h2 className="font-bold text-xl text-text-primary">
            Add New Department
          </h2>
          <Button theme="ghost" className="!p-3" onClick={onClose}>
            <Icon icon="lucide:x" className="size-4 text-text-tertiary" />
          </Button>
        </DialogTitle>

        <Description className="grid gap-y-6 px-6">
          <Input placeholder="Name" label="Name" />
          <Input placeholder="Description" label="Description" />
        </Description>

        <div className="flex gap-4 pt-10 justify-end px-6 pb-6">
          <div className="flex gap-4">
            <Button theme="tertiary" onClick={onClose}>
              Cancel
            </Button>
            <Button theme="primary" onClick={onAddDepartment}>
              Add Department
            </Button>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};
