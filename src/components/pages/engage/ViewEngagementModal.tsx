import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Button, RenderIf } from "@/components/core";
import type { FetchedAnnouncementType } from "@/types/engage";

interface ViewEngagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  announcement: FetchedAnnouncementType;
}

export const ViewEngagementModal = ({
  isOpen,
  onClose,
  onDelete,
  announcement
}: ViewEngagementModalProps) => {
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
            className="w-full max-w-[34.6875rem] h-full space-y-5 bg-white p-5 rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
          >
            <div className="flex items-center justify-between gap-3">
                <DialogTitle className="font-bold text-text-primary text-xl">View Announcement</DialogTitle>
                <button type="button" onClick={onClose} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-grey-dark-4 rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
            </div>

            <div className="bg-blue-5 flex flex-col gap-6 p-4 rounded-lg">
              <div className="grid gap-1">
                <span className="text-xs text-grey-dark-3">Engagement type</span>
                <p className="text-sm text-grey-dark-1 capitalize">{announcement?.type}</p>
              </div>
              <div className="grid gap-1">
                <span className="text-xs text-grey-dark-3">Receipients</span>
                <p className="text-sm text-grey-dark-1 capitalize">{announcement?.account_type}</p>
              </div>
              <div className="grid gap-1">
                <span className="text-xs text-grey-dark-3">Message title</span>
                <p className="text-sm text-grey-dark-1 capitalize">{announcement?.title}</p>
              </div>
              <div className="grid gap-1">
                <span className="text-xs text-grey-dark-3">Message body</span>
                <p className="text-sm text-grey-dark-1">{announcement?.comment || "-"}</p>
              </div>
            </div>

            <RenderIf condition={!!announcement?.url}>
              <div className="grid gap-1">
                <span className="text-xs text-grey-dark-3">Files</span>
                <div className="w-full h-28">
                  <img src={announcement?.url} className="object-cover h-28 w-full" />
                </div>
              </div>
            </RenderIf>

            <div className="flex gap-4 w-full">
              <Button theme="tertiary" onClick={onClose} type="button" block>
                Close
              </Button>
              <Button theme="primary" onClick={onDelete} type="button" block>
                Unpublish Post
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
