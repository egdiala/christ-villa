import caution from "@/assets/caution.gif";
import { Button } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { FetchedConnectGroupMemberType } from "@/types/connect-group";
import { useUpdateConnectGroupMember } from "@/services/hooks/mutations";

interface RemoveMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: FetchedConnectGroupMemberType
}

export const RemoveMemberModal = ({ isOpen, onClose, member }: RemoveMemberModalProps) => {
  const { mutate, isPending } = useUpdateConnectGroupMember(`${member?.name} ${member?.status === 1 ? "suspended" : "approved"} successfully!`, () => onClose())
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
                    <img src={caution} alt="caution" className="size-12" />

                    <div className="grid gap-2">
                        <DialogTitle className="font-bold text-xl text-text-primary">
                          {member?.status === 1 ? "Suspend" : "Approve"} {member?.name}?
                        </DialogTitle>
                        <p className="text-sm text-text-secondary">
                            This action would {member?.status === 1 ? "suspend" : "approve"} {member?.name} {member?.status === 1 ? "from" : "into"} this connect group
                        </p>
                    </div>

                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button type="button" theme="tertiary" onClick={onClose} block>
                            Cancel
                        </Button>
                        <Button type="button" theme="primary" loading={isPending} disabled={isPending} onClick={() => mutate({ id: member?.connect_group_id, status: member?.status === 1 ? "2" : "1", user_id: member?.user_id, request_type: "1" })} block>
                            {member?.status === 1 ? "Suspend" : "Approve"}
                        </Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
  );
};
