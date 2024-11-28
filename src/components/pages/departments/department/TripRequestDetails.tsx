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
      as="div"
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide duration-300 ease-out transition-opacity data-[closed]:opacity-0 bg-grey-dark-4/70">
        <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
          <DialogPanel
            transition
            className="max-w-[393px] w-full md:w-[393px] space-y-3 bg-white pt-6 pb-9 px-4 rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
          >
            <span className="absolute w-10 h-1 bg-grey-dark-3 rounded-[20px] opacity-[21%] top-2 left-[45%]"></span>
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
        </div>
      </div>
    </Dialog>
  );
};
