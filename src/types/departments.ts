export interface FetchDepartmentsQuery {
  q?: string; // Search for name
  page?: string;
  item_per_page?: string;
  component?: "count" | "count-status" | "request-area";
  department_id?: string;
}

export type CreateDepartmentType = {
  name: string;
};

export type UpdateDepartmentType = {
  name: string;
  department_id: string;
};

export type FetchedDepartmentsCountType = {
  total: number;
};

export type FetchedDepartmentsType = {
  name: string;
  department_id: string;
  total_count: number;
  total_pending_req: number;
  total_approved_req: number;
  total_declined_req: number;
};

export type FetchedDepartmentType = {
  name: string;
  comment: string;
  request_areas: any[];
  createdAt: string;
  updatedAt: string;
  department_id: string;
  total_count: number;
  total_pending_req: number;
  total_approved_req: number;
  total_declined_req: number;
};

export type FetchedDepartmentsStatisticsType = {
  total_count: number;
  total_pending_req: number;
  total_approved_req: number;
  total_declined_req: number;
};

export type UpdateMemberStatusType = {
  request_type: string;
  user_id: string;
  status: string;
  department_id: string;
};

export type AssignDepartmentRequestType = {
  department_id: string;
  request_areas: string[];
};

export interface FetchDepartmentRequestsQuery {
  q?: string; // Search for requester name
  start_date?: string;
  end_date?: string;
  department_id?: string;
  status?: string;
  page?: string;
  item_per_page?: string;
  component?: "count" | "count-status";
  request_id?: string;
}

export type ApproveOrRejectDepartmentRequestType = {
  request_id: string;
  status: string;
};

export interface FetchDepartmentTimeOffsQuery {
  start_date?: string;
  end_date?: string;
  department_id?: string;
  status?: string;
  request_id?: string;
  page?: string;
  item_per_page?: string;
  component?: "count" | "count-status";
}

export interface FetchDepartmentMaterialsQuery {
  start_date?: string;
  end_date?: string;
  department_id?: string;
  request_id?: string;
  page?: string;
  item_per_page?: string;
  component?: "count" | "count-status";
}

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

export type FetchedUsersStatisticsType = {
  total_member: number;
  pending_member: number;
  approve_member: number;
  decline_member: number;
  depart_data: {
    _id: string;
    name: string;
  };
  name: string;
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

export interface FetchedDepartmentRequestCountStatusType {
  total_count: number;
    pending_req: number;
    approve_req: number;
    decline_req: number;
}

export interface FetchedDepartmentRequestType {
  user_id: string;
  status: number;
  data: {
    title: string;
    description: string;
  },
  createdAt: Date | string;
  updatedAt: Date | string;
  request_type?: string;
  request_area: string;
  approved_by: string;
  request_id: string;
  department: string;
  user_data: {
    _id: string;
    name: string;
    email: string;
    phone_number: string;
    user_type: string;
  }
}