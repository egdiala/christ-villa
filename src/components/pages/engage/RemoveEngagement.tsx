import {
  Description,
  Dialog,
  DialogPanel,
} from "@headlessui/react";
import caution from "@/assets/caution.gif";
import { Button } from "@/components/core";
import type { FetchedAnnouncementType } from "@/types/engage";
import { useDeleteAnnouncement } from "@/services/hooks/mutations";

interface RemoveEngagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcement: FetchedAnnouncementType;
}

export const RemoveEngagementModal = ({
  isOpen,
  onClose,
  announcement
}: RemoveEngagementModalProps) => {
  const { mutate, isPending } = useDeleteAnnouncement(() => onClose())
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
            className="max-w-[350px] h-full space-y-5 bg-white p-5 rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
          >
            <img src={caution} alt="caution" className="size-12" />

            <Description className="grid gap-y-2">
              <h4 className="font-bold text-xl text-text-primary">
                Delete {announcement?.title}?
              </h4>
              <p className="text-sm text-text-secondary">
                This action would remove {announcement?.title} from the system and
                is irreversible.
              </p>
            </Description>

            <div className="flex gap-4 w-full">
              <Button theme="tertiary" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button theme="primary" disabled={isPending} loading={isPending} onClick={() => mutate(announcement?.request_id)} type="button">
                Delete
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
