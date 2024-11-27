import {
  DashboardAnnouncementCard,
  DashboardChildrenChurchCard,
  DashboardGraph,
  DashboardPendingMembersTable,
  DashboardStatCard,
} from "@/components/pages";

export const DashboardPage: React.FC = () => {
  const dashboardStatistics = [
    { id: 1, icon: "lucide:users", title: "Total Members", count: 340 },
    { id: 2, icon: "lucide:users", title: "HoDs", count: 340 },
    { id: 3, icon: "lucide:users", title: "Partners", count: 340 },
    {
      id: 4,
      icon: "lucide:loader-pinwheel",
      title: "Connect groups",
      count: 340,
    },
    { id: 5, icon: "lucide:component", title: "Departments", count: 340 },
  ];

  return (
    <div className="px-4 pt-[35px] flex flex-col gap-y-6 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-6 ">
        {dashboardStatistics.map((dbStat) => (
          <DashboardStatCard
            icon={dbStat.icon}
            title={dbStat.title}
            count={dbStat.count}
            key={dbStat.id}
            className="sm:last-of-type:col-span-2 md:last-of-type:col-span-3 lg:last-of-type:col-span-2 md:col-span-3 lg:col-span-2"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-10 lg:grid-cols-12 gap-6">
        <div className="md:col-span-6 lg:col-span-7">
          <DashboardGraph totalRequests={4535} />
        </div>
        <div className="md:col-span-4 lg:col-span-5">
          <DashboardChildrenChurchCard />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-11 xl:grid-cols-12 gap-6">
        <div className="lg:col-span-5 xl:col-span-5">
          <DashboardAnnouncementCard />
        </div>
        <div className="lg:col-span-6 xl:col-span-7">
          <DashboardPendingMembersTable />
        </div>
      </div>
    </div>
  );
};
