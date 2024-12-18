import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Button, RenderIf } from "@/components/core";
import { cn } from "@/libs/cn";

interface AcademicAssistanceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AcademicAssistanceRequestModal = ({
  isOpen,
  onClose,
}: AcademicAssistanceRequestModalProps) => {
  const academicAssistanceDetails = [
    { id: 1, label: "Request. Date & Time", value: "Today • 12:34pm" },
    { id: 2, label: "Approved. Date & Time", value: "Today • 12:34pm" },
    { id: 3, label: "Subject", value: "Philosophy" },
    { id: 4, label: "Status", value: "rejected" },
    { id: 5, label: "Topic", value: "Topic" },
    {
      id: 6,
      label: "Description",
      value:
        "Lorem ipsum dolor sit amet consectetur. Purus ac varius libero aliquet. Lacus amet justo pellentesque lectus lectus. Lacus pulvinar varius risus diam eget.",
    },
    { id: 7, label: "Department", value: "Ushering" },
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
            className="max-w-[392px] w-full md:w-[392px] space-y-6 bg-white py-6 px-4 rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
          >
            <DialogTitle className="font-bold text-text-primary text-2xl">
              Academic Assistance
            </DialogTitle>

            <Description className="grid gap-y-4">
              {academicAssistanceDetails.map((acadDetails) => (
                <div className="grid gap-y-1 text-sm" key={acadDetails.id}>
                  <h5 className="text-text-tertiary">{acadDetails.label}</h5>

                  <RenderIf condition={acadDetails.label !== "Status"}>
                    <p className="font-medium text-text-primary capitalize">
                      {acadDetails.value}
                    </p>
                  </RenderIf>

                  <RenderIf condition={acadDetails.label === "Status"}>
                    <div
                      className={cn(
                        "py-0.5 px-1 rounded text-white capitalize text-xs w-fit",
                        acadDetails.value?.toLowerCase() === "pending"
                          ? "bg-amber"
                          : acadDetails.value?.toLowerCase() === "approved"
                          ? "bg-green-2"
                          : "bg-red-2"
                      )}
                    >
                      {acadDetails.value}
                    </div>
                  </RenderIf>
                </div>
              ))}
            </Description>

            <Button theme="primary" onClick={onClose} block>
              Close
            </Button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
