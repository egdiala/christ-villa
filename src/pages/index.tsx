import {
  DashboardChildrenChurchCard,
  DashboardGraph,
  DashboardPendingMembersTable,
  DashboardStatCard,
} from "@/components/pages/dashboard";
import { useGetDashboardStatistics } from "@/services/hooks/queries/useDashboard";
import { FetchedDashboardUsersStatisticsType } from "@/types/dashboard";

export const DashboardPage: React.FC = () => {
  const { data: userStats } =
    useGetDashboardStatistics<FetchedDashboardUsersStatisticsType>({
      component: "dashboard-user-count",
    });

  const dashboardStatistics = [
    {
      id: 1,
      icon: "lucide:users",
      title: "Total Users",
      count: userStats?.total_user,
    },
    {
      id: 2,
      icon: "lucide:component",
      title: "Total Departments",
      count: userStats?.total_department,
    },
    {
      id: 3,
      icon: "lucide:loader-pinwheel",
      title: "Total Connect Groups",
      count: userStats?.total_connectgroup,
    },
    {
      id: 4,
      icon: "lucide:life-buoy",
      title: "Total Requests",
      count: userStats?.total_request,
    },
  ];

  return (
    <div className="px-4 pt-[35px] flex flex-col gap-y-6 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
        {dashboardStatistics.map((dbStat) => (
          <DashboardStatCard
            icon={dbStat.icon}
            title={dbStat.title}
            count={dbStat.count ?? 0}
            key={dbStat.id}
            className="col-span-1"
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

      {/* <div className="grid grid-cols-1 lg:grid-cols-11 xl:grid-cols-12 gap-6"> */}
      {/* <div className="lg:col-span-5 xl:col-span-5">
          <DashboardAnnouncementCard />
        </div> */}
      {/* <div className="lg:col-span-6 xl:col-span-7"> */}
      <DashboardPendingMembersTable />
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};
