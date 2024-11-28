import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Button } from "@/components/core";
import { cn } from "@/libs/cn";

interface TripRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TripRequestModal = ({
  isOpen,
  onClose,
}: TripRequestModalProps) => {
  const tripStatus = "pending";

  const tripDetails = [
    { id: 1, label: "Zip code", value: "10013" },
    { id: 2, label: "No. of People", value: "2" },
    { id: 3, label: "Ride Type", value: "2 way trip" },
  ];

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogPanel className="max-w-[393px] w-[calc(100%-20px)] md:w-[393px] space-y-3 bg-white pt-6 pb-9 px-4 rounded-lg overflow-y-scroll">
        <span className="absolute w-10 h-1 bg-grey-dark-3 rounded-[20px] opacity-[21%] top-2 left-[50%]"></span>
        <DialogTitle>
          <div className="flex justify-between items-start ">
            <div className="grid gap-y-2">
              <h3 className="font-bold text-text-primary text-2xl">
                Time off Request
              </h3>

              <p className="text-xs text-text-secondary">2nd May, 2024</p>
            </div>
            <p
              className={cn(
                "font-medium capitalize",
                tripStatus?.toLowerCase() === "pending"
                  ? "text-amber"
                  : tripStatus?.toLowerCase() === "approved"
                  ? "text-green-2"
                  : "text-red-2"
              )}
            >
              {tripStatus}
            </p>
          </div>
        </DialogTitle>

        <Description className="grid gap-y-3">
          <span className="border-t-2 border-grey-dark-4"></span>

          <div className="grid gap-y-[5px] text-sm text-text-secondary">
            <div className="flex gap-x-1">
              <img src="/start_location.svg" alt="start location" />
              <p>2301 Putty Hill Avenue, Parkville, MD, 21234</p>
            </div>

            <span className="h-[18.49px] ml-2 border-l border-dashed border-text-tertiary"></span>

            <div className="flex gap-x-1">
              <img src="/map_pin.svg" alt="map pin" />
              <p>2304 Putty Hill Avenue, Parkville, MD, 21238</p>
            </div>
          </div>

          <span className="border-t-2 border-grey-dark-4"></span>

          <div className="grid gap-y-4 pb-6">
            {tripDetails.map((detail) => (
              <div
                key={detail.id}
                className="flex justify-between items-center"
              >
                <p className="text-text-tertiary">{detail.label}</p>
                <p className="text-end font-medium text-base text-text-primary">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>

          <Button theme="primary" onClick={onClose} block>
            Close
          </Button>
        </Description>
      </DialogPanel>
    </Dialog>
  );
};
