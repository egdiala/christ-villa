import caution from "@/assets/caution.gif";
import { Button } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { FetchedConnectGroupMemberType } from "@/types/connect-group";
import { useUpdateConnectGroupMember } from "@/services/hooks/mutations";

interface MakeAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: FetchedConnectGroupMemberType
}

export const MakeAdminModal = ({ isOpen, onClose, member }: MakeAdminModalProps) => {
  const { mutate, isPending } = useUpdateConnectGroupMember(`${member?.name} ${member?.is_admin === 0 ? "made admin" : "removed as admin"} successfully!`, () => onClose())
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
                          {member?.is_admin === 0 ? "Make" : "Remove"} Admin?
                        </DialogTitle>
                        <p className="text-sm text-text-secondary">
                            This action would {member?.is_admin === 0 ? "make" : "rescind"} {member?.name} as admin in this connect group
                        </p>
                    </div>

                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button type="button" theme="tertiary" onClick={onClose} block>
                            Cancel
                        </Button>
                        <Button type="button" theme="primary" loading={isPending} disabled={isPending} onClick={() => mutate({ id: member?.connect_group_id, status: member?.is_admin === 0 ? "1" : "2", user_id: member?.user_id, request_type: "2" })} block>
                            {member?.is_admin === 0 ? "Make Admin" : "Remove Admin"}
                        </Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
  );
};
