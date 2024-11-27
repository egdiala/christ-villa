import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/core";
import { AttendanceModal } from "./AttendanceModal";

export const DashboardChildrenChurchCard = () => {
  const childrenChurchStats = [
    { id: 1, icon: "lucide:presentation", title: "Teachers", count: 340 },
    { id: 2, icon: "lucide:baby", title: "Pupils", count: 340 },
  ];

  const [openAttendanceModal, setOpenAttendanceModal] = useState(false);

  return (
    <div className="border border-blue-4 p-4 rounded-2xl grid gap-y-[25.33px]">
      <h3 className="font-bold text-xl leading-8">Children church</h3>

      <div className="flex flex-col">
        {childrenChurchStats.map((ccStat) => (
          <div className="flex items-center gap-x-[17px]" key={ccStat.id}>
            <div className="flex justify-center items-center bg-blue-5 rounded-full p-3 size-12">
              <Icon icon={ccStat.icon} className="size-6" />
            </div>
            <div>
              <p className="text-sm text-text-secondary leading-[23.8px]">
                {ccStat.title}
              </p>
              <h3 className="text-2xl text-text-primary leading-[31.2px]">
                {ccStat.count}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-light-blue-4 rounded-2xl grid gap-y-4">
        <div className="grid gap-y-1">
          <p className="text-sm text-text-secondary font-medium">
            Last Attendance
          </p>
          <p className="text-xs text-text-secondary">Sun. 21 June, 2024</p>
        </div>
        <p className="font-bold text-lg leading-[28.8px]">20 of 21 Present</p>
        <div className="flex justify-end">
          <Button
            className="text-accent-primary text-sm font-bold"
            onClick={() => setOpenAttendanceModal(true)}
          >
            View
          </Button>
        </div>
      </div>

      <AttendanceModal
        isOpen={openAttendanceModal}
        onClose={() => setOpenAttendanceModal(false)}
      />
    </div>
  );
};
