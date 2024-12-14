export interface FetchDashboardStatsQuery {
  component?:
    | "dashboard-children-church"
    | "dashboard-pending-user"
    | "dashboard-user-count"
    | "dashboard-request-monthly";
}

export type FetchedDashboardUsersStatisticsType = {
  total_user: number;
  total_department: number;
  total_connectgroup: number;
  total_request: number;
};

export type FetchedDashboardChildrenChurchStatsType = {
  total_teacher: number;
  total_pupil: number;
  total_male: number;
  total_female: number;
};
