import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import caution from "@/assets/caution.gif";
import { Button } from "@/components/core";
import { useUpdateMemberStatus } from "@/services/hooks/mutations/useDepartments";
import { FetchedUsersType } from "@/types/users";
import { successToast } from "@/utils/createToast";

interface ApproveMemberModalProps {
  value: { isOpen: boolean; member: FetchedUsersType; deptId: string };
  onClose: () => void;
}

export const ApproveMemberRequestModal = ({
  value,
  onClose,
}: ApproveMemberModalProps) => {
  const handleClose = () => {
    successToast({
      message: `${value.member.name} has been successfully ${
        value.member.status !== 1 ? "Approved" : "Suspended"
      }`,
    });
    onClose();
  };

  const { mutate, isPending } = useUpdateMemberStatus(handleClose);

  const handleApproveOrSuspendMember = () => {
    mutate({
      request_type: "1",
      user_id: value.member.user_id,
      status: value.member.status !== 1 ? "1" : "2",
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
              {value.member.status !== 1 ? (
                <Icon
                  icon="lucide:octagon-alert"
                  className="size-12 text-green-1"
                />
              ) : (
                <img src={caution} alt="caution" className="size-12" />
              )}
            </DialogTitle>

            <Description className="grid gap-y-2">
              <h4 className="font-bold text-xl text-text-primary">
                {value.member.status !== 1 ? "Approve" : "Suspend"} member in
                this Department?
              </h4>
              <p className="text-sm text-text-secondary">
                This action would{" "}
                {value.member.status !== 1 ? "approve" : "suspend"}{" "}
                {value.member.name} in this department. You can{" "}
                {value.member.status === 2 ? "suspend" : "approve"} this member
                anytime.
              </p>
            </Description>

            <div className="flex gap-4 w-full">
              <Button
                disabled={isPending}
                theme="tertiary"
                onClick={onClose}
                block
              >
                Cancel
              </Button>
              <Button
                theme="primary"
                onClick={handleApproveOrSuspendMember}
                loading={isPending}
                disabled={isPending}
                block
              >
                {value.member.status !== 1 ? "Approve" : "Suspend"}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
