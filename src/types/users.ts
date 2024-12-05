export interface FetchUsersQuery {
  q?: string; // Search for name, email
  start_date?: string;
  end_date?: string;
  department_id?: string;
  status?: string;
  account_type?: string;
  page?: string;
  item_per_page?: string;
  component?: "count" | "count-status" | "count-department";
}

export interface FetchSingleUserQuery {
  user_id: string;
}

export type UpdateUserStatusType = {
  status: string;
  user_id: string;
};

export type ChangeUserType = {
  user_type: string;
  user_id: string;
};

export type FetchedUsersStatisticsType = {
  total_users: number;
  total_members: number;
  total_hods: number;
  total_ministers: number;
  total_pastors: number;
};

export type FetchedUserCountType = {
  total: number;
};

export type FetchedUsersType = {
  name: string;
  email: string;
  account_type: string;
  status: number;
  avatar: string;
  phone_prefix: string;
  phone_number: string;
  gender: string;
  address: string;
  prefession: string;
  hobbies: string;
  marital_status: string;
  nationality: string;
  birth_month: string;
  birth_day: string;
  profession: string;
  createdAt: string;
  updatedAt: string;
  user_id: string;
};

export type FetchedUserType = {
  name: string;
  email: string;
  account_type: string;
  status: string;
  avatar: string;
  phone_prefix: string;
  phone_number: string;
  gender: string;
  address: string;
  prefession: string;
  hobbies: string;
  marital_status: string;
  nationality: string;
  birth_month: string;
  birth_day: string;
  profession: string;
  createdAt: string;
  updatedAt: string;
  user_id: string;
  department_data: {
    _id: string;
    name: string;
    status: number;
    join_date: string;
  }[];
};

export enum UsersStatus {
  Pending = 0,
  Approved = 1,
  Suspended = 2,
}
