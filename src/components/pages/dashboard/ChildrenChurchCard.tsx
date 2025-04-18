import { useGetDashboardStatistics } from "@/services/hooks/queries/useDashboard";
import { FetchedDashboardChildrenChurchStatsType } from "@/types/dashboard";
import { Icon } from "@iconify/react";

export const DashboardChildrenChurchCard = () => {
  const { data: childrenChurchStatistics } =
    useGetDashboardStatistics<FetchedDashboardChildrenChurchStatsType>({
      component: "dashboard-children-church",
    });

  const childrenChurchStats = [
    {
      id: 1,
      icon: "lucide:presentation",
      title: "Teachers",
      count: childrenChurchStatistics?.total_teacher ?? 0,
    },
    {
      id: 2,
      icon: "lucide:baby",
      title: "Pupils",
      count: childrenChurchStatistics?.total_pupil ?? 0,
    },
    {
      id: 3,
      icon: "lucide:baby",
      title: "Male Pupils",
      count: childrenChurchStatistics?.total_male ?? 0,
    },
    {
      id: 4,
      icon: "lucide:baby",
      title: "Female Pupils",
      count: childrenChurchStatistics?.total_female ?? 0,
    },
  ];

  return (
    <div className="border border-blue-4 p-4 rounded-2xl flex flex-col gap-y-[25.33px] justify-between content-start h-full">
      <div className="grid gap-y-[25.33px]">
        <h3 className="font-bold text-xl text-text-primary">Children church</h3>

        <div className="flex flex-col gap-y-[25.33px]">
          {childrenChurchStats.map((ccStat) => (
            <div className="flex items-center gap-x-[17px]" key={ccStat.id}>
              <div className="flex justify-center items-center bg-blue-5 rounded-full p-3 size-12">
                <Icon icon={ccStat.icon} className="size-6" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">{ccStat.title}</p>
                <h3 className="text-2xl text-text-primary">{ccStat.count}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="p-4 bg-light-blue-4 rounded-2xl grid gap-y-4">
        <div className="grid gap-y-1">
          <p className="text-sm text-text-secondary font-medium">
            Last Attendance
          </p>
          <p className="text-xs text-text-secondary">Sun. 21 June, 2024</p>
        </div>
        <p className="font-bold text-lg text-text-primary">20 of 21 Present</p>
        <div className="flex justify-end">
          <Button
            className="text-accent-primary text-sm font-bold"
            onClick={() => setOpenAttendanceModal(true)}
          >
            View
          </Button>
        </div>
      </div> */}

      {/* <AttendanceModal
        isOpen={openAttendanceModal}
        onClose={() => setOpenAttendanceModal(false)}
      /> */}
    </div>
  );
};
