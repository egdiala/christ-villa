import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { RenderIf } from "@/components/core";
import { cn } from "@/libs/cn";

interface TimeOffRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TimeOffRequestModal = ({
  isOpen,
  onClose,
}: TimeOffRequestModalProps) => {
  const timeOffDetails = [
    { id: 1, label: "Start date", value: "Jul 12, 2024" },
    { id: 2, label: "End date", value: "Jul 12, 2024" },
    { id: 3, label: "No. of days", value: "23" },
    { id: 4, label: "Status", value: "pending" },
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
            className="max-w-[361px] w-full md:w-[361px] space-y-3 bg-white p-4 rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
          >
            <DialogTitle className="flex items-center justify-between">
              <h3 className="font-bold text-text-primary text-2xl">
                Time off Request
              </h3>
              <p className="text-xs text-text-tertiary">Jul 12, 2024</p>
            </DialogTitle>

            <Description className="grid gap-y-3">
              <div className="flex gap-x-2 items-center">
                <img
                  src="https://images.unsplash.com/photo-1693039537350-3bba6975add7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="size-8 object-cover rounded-full"
                  alt="woman"
                />

                <div>
                  <h4 className="text-sm font-medium text-text-primary">
                    Increase James
                  </h4>
                  <p className="text-xs text-text-tertiary">+1 234 5678 9012</p>
                </div>
              </div>

              <span className="border-t border-dashed border-[#808D9763]"></span>

              <div className="grid gap-y-2">
                {timeOffDetails.map((detail) => (
                  <div key={detail.id} className="text-xs flex justify-between">
                    <p className="text-text-secondary">{detail.label}</p>
                    <RenderIf condition={detail.label !== "Status"}>
                      <p className="font-medium text-text-primary text-end">
                        {detail.value}
                      </p>
                    </RenderIf>
                    <RenderIf condition={detail.label === "Status"}>
                      <p
                        className={cn(
                          "font-medium text-end",
                          detail.value?.toLowerCase() === "pending"
                            ? "text-amber"
                            : detail.value?.toLowerCase() === "approved"
                            ? "text-green-2"
                            : "text-red-2"
                        )}
                      >
                        {detail.value}
                      </p>
                    </RenderIf>
                  </div>
                ))}
              </div>

              <div className="grid gap-y-1 text-xs">
                <h4 className="text-text-tertiary">Reason</h4>
                <p className="text-text-secondary">
                  Lorem ipsum dolor sit amet consectetur. In nascetur eleifend
                  nunc tortor a neque mauris eu senectus. Scelerisque aliquet
                  sociis nec id.{" "}
                </p>
              </div>

              <span className="border-t border-dashed border-[#808D9763]"></span>
            </Description>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
