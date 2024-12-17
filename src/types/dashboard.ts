export interface FetchDashboardStatsQuery {
  component?:
    | "dashboard-children-church"
    | "dashboard-pending-user"
    | "dashboard-user-count"
    | "dashboard-request-monthly";
  year?: string;
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

export type FetchedDashboardPendingMembersType = {
  avatar: string;
  createdAt: string;
  gender: string;
  name: string;
  status: number;
  user_id: string;
};

export type FetchedDashboardGraphType = {
  total_pending: number;
  total_completed: number;
  total_rejected: number;
  month: number;
};

export enum PendingMembersStatus {
  Pending = 0,
  Approved = 1,
  Suspended = 2,
}
