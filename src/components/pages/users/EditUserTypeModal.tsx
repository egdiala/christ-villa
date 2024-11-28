import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Button, ComboBox } from "@/components/core";

interface EditUserTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateUser: () => void;
}

export const EditUserTypeModal = ({
  isOpen,
  onClose,
  onUpdateUser,
}: EditUserTypeModalProps) => {
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
            Update User Type
          </h2>
          <Button theme="ghost" className="!p-3" onClick={onClose}>
            <Icon icon="lucide:x" className="size-4 text-text-tertiary" />
          </Button>
        </DialogTitle>

        <Description className="grid gap-y-6 px-6">
          <ComboBox
            options={[]}
            setSelected={() => {}}
            onChange={() => {}}
            optionLabel={() => {}}
            label="Select Department"
            placeholder="Select Department"
          />
          <ComboBox
            options={[]}
            setSelected={() => {}}
            onChange={() => {}}
            optionLabel={() => {}}
            label="Select User type"
            placeholder="Select User type"
          />
        </Description>

        <div className="flex gap-4 pt-10 justify-end px-6 pb-6">
          <div className="flex gap-4">
            <Button theme="tertiary" onClick={onClose}>
              Cancel
            </Button>
            <Button theme="primary" onClick={onUpdateUser}>
              Update User Type
            </Button>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};
