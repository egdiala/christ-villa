import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Button, Checkbox } from "@/components/core";

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AttendanceModal = ({ isOpen, onClose }: AttendanceModalProps) => {
  const attendanceList = [
    { id: 1, name: "Increase James", present: true },
    { id: 2, name: "Increase James", present: true },
    { id: 3, name: "Increase James", present: true },
    { id: 4, name: "Increase James", present: false },
    { id: 5, name: "Increase James", present: true },
    { id: 6, name: "Increase James", present: true },
    { id: 7, name: "Increase James", present: true },
    { id: 8, name: "Increase James", present: true },
    { id: 9, name: "Increase James", present: true },
    { id: 10, name: "Increase James", present: true },
    { id: 11, name: "Increase James", present: true },
    { id: 12, name: "Increase James", present: true },
    { id: 13, name: "Increase James", present: true },
    { id: 14, name: "Increase James", present: true },
    { id: 15, name: "Increase James", present: true },
    { id: 16, name: "Increase James", present: true },
    { id: 17, name: "Increase James", present: false },
    { id: 18, name: "Increase James", present: false },
    { id: 19, name: "Increase James", present: false },
    { id: 20, name: "Increase James", present: false },
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
            <DialogTitle className="bg-light-blue-4 px-4 pt-8 pb-4 sticky top-0">
              <div className="grid gap-y-2">
                <h2 className="font-bold text-2xl text-text-primary">
                  Attendance
                </h2>
                <p className="font-medium text-sm  text-text-secondary">
                  Tue. 12 July, 2024 • 12:23pm
                </p>
                <p className="text-sm text-text-secondary">20 of 21 present</p>
              </div>
              <Button
                className="rounded-lg bg-white absolute top-8 right-4 !p-[6px]"
                onClick={onClose}
                type="button"
              >
                <Icon icon="lucide:x" className="size-7" />
              </Button>
            </DialogTitle>
            <Description className="px-4 grid gap-y-2">
              {attendanceList.map((attendance) => (
                <div
                  key={attendance.id}
                  className="flex justify-between items-center py-4 border-b border-[#808D974D]"
                >
                  <p className="font-medium text-sm text-text-primary">
                    {attendance.name}
                  </p>
                  <Checkbox
                    name={attendance.name}
                    checked={attendance.present}
                    className="checked:!bg-accent-primary checked:!border-accent-primary hover:!border-accent-primary"
                  />
                </div>
              ))}
            </Description>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
