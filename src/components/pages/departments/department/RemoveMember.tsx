import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import caution from "@/assets/caution.gif";
import { Button } from "@/components/core";
import { FetchedUsersType } from "@/types/users";
import { useUpdateMemberStatus } from "@/services/hooks/mutations/useDepartments";
import { successToast } from "@/utils/createToast";

interface RemoveMemberModalProps {
  value: { isOpen: boolean; member: FetchedUsersType; deptId: string };
  onClose: () => void;
}

export const RemoveMemberModal = ({
  value,
  onClose,
}: RemoveMemberModalProps) => {
  const handleClose = () => {
    successToast({
      message: `${value.member.name} has been successfully removed from this department`,
    });
    onClose();
  };

  const { mutate, isPending } = useUpdateMemberStatus(handleClose);

  const handleRemoveMember = () => {
    mutate({
      request_type: "2",
      user_id: value.member.user_id,
      status: value.member.status?.toString(),
      department_id: value.deptId,
    });
  };

  return (
    <Dialog
      open={value.isOpen}
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
              <img src={caution} alt="caution" className="size-12" />
            </DialogTitle>

            <Description className="grid gap-y-2">
              <h4 className="font-bold text-xl text-text-primary">
                Remove {value.member.name}?
              </h4>
              <p className="text-sm text-text-secondary">
                This action would remove {value.member.name} from this
                department and is irreversible.
              </p>
            </Description>

            <div className="flex gap-4 w-full">
              <Button
                theme="tertiary"
                disabled={isPending}
                onClick={onClose}
                block
              >
                Cancel
              </Button>
              <Button
                theme="primary"
                onClick={handleRemoveMember}
                loading={isPending}
                disabled={isPending}
                block
              >
                Remove
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
