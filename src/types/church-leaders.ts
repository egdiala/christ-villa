export interface FetchChurchLeadersQuery {
  q?: string; // Search for name, email
  page?: string;
  item_per_page?: string;
  component?: "count";
}

export interface FetchedChurchLeadersType {
  url: string;
  leader_name: string;
  leader_position: string;
  request_id: string;
}

export interface FetchedChurchLeadersCountType {
  total: number;
}

export type CreateChurchLeaderType = {
  leader_name: string;
  leader_position: string;
  file?: string;
};

export type UpdateChurchLeaderType = {
  leader_name: string;
  leader_position: string;
  request_id: string;
};

export const leaderPositions = [
  { label: "All", value: "all" },
  { label: "Partner", value: "partner" },
  { label: "Pastor", value: "pastor" },
  { label: "Member", value: "member" },
  { label: "HOD", value: "hod" },
  { label: "Minister", value: "minister" },
];
