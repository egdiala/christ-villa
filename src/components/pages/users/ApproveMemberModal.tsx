import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/core";
import { useUpdateUserStatus } from "@/services/hooks/mutations/useUsers";
import { FetchedUserType } from "@/types/users";

interface ApproveMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: FetchedUserType;
}

export const ApproveMemberModal = ({
  isOpen,
  onClose,
  user,
}: ApproveMemberModalProps) => {
  const { mutate, isPending } = useUpdateUserStatus(() => onClose());
  const handleApproveMember = () => {
    mutate({ user_id: user?.user_id, status: 1 });
  };

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
            className="max-w-[350px] h-full space-y-4 bg-white p-5 rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
          >
            <DialogTitle className="font-bold">
              <Icon
                icon="lucide:octagon-alert"
                className="size-12 text-green-1"
              />
            </DialogTitle>

            <Description>
              <h4 className="font-bold text-xl text-text-primary">
                Approve {user?.name}?
              </h4>
              <p className="text-sm text-text-secondary">
                This action would approve {user?.name} to be a member of the
                church
              </p>
            </Description>

            <div className="flex gap-4 w-full">
              <Button
                theme="tertiary"
                onClick={onClose}
                className="w-full"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                theme="primary"
                onClick={handleApproveMember}
                className="w-full"
                loading={isPending}
                disabled={isPending}
              >
                Approve
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
