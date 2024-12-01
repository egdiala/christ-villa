import { RenderIf } from "@/components/core";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal = ({
  isOpen,
  onClose,
}: NotificationsModalProps) => {
  const description =
    "Description lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor";

  const notificationList = [
    {
      id: 1,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: false,
    },
    {
      id: 2,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: true,
    },
    {
      id: 3,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: true,
    },
    {
      id: 4,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: false,
    },
    {
      id: 5,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: false,
    },
    {
      id: 6,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: false,
    },
    {
      id: 7,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: false,
    },
    {
      id: 8,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: false,
    },
    {
      id: 9,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: true,
    },
    {
      id: 10,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: true,
    },
    {
      id: 11,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: true,
    },
    {
      id: 12,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: false,
    },
    {
      id: 13,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: false,
    },
    {
      id: 14,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: true,
    },
    {
      id: 15,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: true,
    },
    {
      id: 16,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: true,
    },
    {
      id: 17,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: false,
    },
    {
      id: 18,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: false,
    },
    {
      id: 19,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: false,
    },
    {
      id: 20,
      title: "Increase James",
      description: description,
      time: "2s ago",
      read: false,
    },
  ];

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      as="div"
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide duration-300 ease-out transition-opacity data-[closed]:opacity-0 bg-grey-dark-4/70">
        <div className="flex flex-col min-h-full items-end justify-end">
          <DialogPanel
            transition
            className="h-full max-w-[420px] min-w-full sm:min-w-[420px] space-y-4 border bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-x-full"
          >
            <DialogTitle className="px-4 pt-8 pb-4 bg-white sticky top-0 flex items-center justify-between">
              <div className="flex gap-y-2">
                <h2 className="font-bold text-2xl text-text-primary">
                  Notifications
                </h2>

                <div className="text-white py-1 flex justify-center items-center px-[5px] h-5 bg-semantics-error text-base font-medium rounded-[20px]">
                  03
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-grey-dark-4 rounded-full ease-out duration-300 transition-all"
              >
                <Icon icon="ph:x-bold" />
              </button>
            </DialogTitle>
            <Description className="px-4">
              {notificationList.map((notification) => (
                <div
                  className="py-4 grid grid-cols-6 md:grid-cols-7 gap-x-4 items-start"
                  key={notification.id}
                >
                  <div className="col-span-5 md:col-span-6 grid gap-y-2">
                    <div className="flex items-center gap-x-2">
                      <RenderIf condition={notification.read === false}>
                        <div className="size-[7px] rounded-full bg-accent-primary"></div>
                      </RenderIf>
                      <h4 className="font-medium text-sm text-text-primary">
                        {notification.title}
                      </h4>
                    </div>

                    <p className="text-sm text-text-tertiary">
                      {notification.description}
                    </p>
                  </div>

                  <p className="col-span-1 italic text-xs text-text-tertiary">
                    {notification.time}
                  </p>
                </div>
              ))}
            </Description>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
