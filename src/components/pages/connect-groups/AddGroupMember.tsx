import { Icon } from "@iconify/react";
import { Button, SelectInput } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface AddGroupMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddGroupMemberModal = ({
  isOpen,
  onClose,
}: AddGroupMemberModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      as="div"
      className="relative z-10 focus:outline-none"
    >
        <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide duration-300 ease-out transition-opacity data-[closed]:opacity-0 bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel transition className="flex flex-col gap-5 justify-between w-full max-w-[30.8125rem] rounded-lg bg-white p-4 md:p-5 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <div className="flex items-center justify-between gap-3">
                        <DialogTitle className="font-bold text-text-primary text-xl">Add Group member</DialogTitle>
                        <button type="button" onClick={onClose} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-grey-dark-4 rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                    </div>

                    <form className="space-y-6">
                        <SelectInput label="Select Member" options={[]} placeholder="Enter name here" />
                        <SelectInput label="Select Member Type" options={[]} placeholder="Enter description here" />
                    </form>

                    <div className="flex items-center justify-end gap-4 w-full md:w-5/6 ml-auto pt-10">
                        <Button type="button" theme="tertiary" onClick={onClose} block>
                            Cancel
                        </Button>
                        <Button type="submit" theme="primary" block>
                            Add Member
                        </Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
  );
};
