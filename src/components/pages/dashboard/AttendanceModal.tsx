import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Checkbox } from "@/components/core";

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
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 w-screen">
        <div className="flex h-full items-center justify-end">
          <DialogPanel className="h-full max-w-[420px] min-w-full sm:min-w-[420px] space-y-4 border bg-white overflow-y-scroll">
            <DialogTitle className="bg-light-blue-4 px-4 pt-8 pb-4 sticky top-0">
              <div className="grid gap-y-2">
                <h2 className="font-bold text-2xl leading-[31.2px]">
                  Attendance
                </h2>
                <p className="font-medium text-sm leading-[19.6px] text-text-secondary">
                  Tue. 12 July, 2024 • 12:23pm
                </p>
                <p className="text-sm leading-[23.8px] text-text-secondary">
                  20 of 21 present
                </p>
              </div>
              <div
                className="rounded-lg bg-white absolute top-8 right-4 p-[6px] cursor-pointer"
                onClick={onClose}
              >
                <Icon icon="lucide:x" className="size-7" />
              </div>
            </DialogTitle>
            <Description className="px-4 grid gap-y-2">
              {attendanceList.map((attendance) => (
                <div className="flex justify-between items-center py-4 border-b border-[#808D974D]">
                  <p className="font-medium text-sm leading-[19.6px]">
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
