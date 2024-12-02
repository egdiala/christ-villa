export interface FetchDepartmentsQuery {
  q?: string; // Search for name
  page?: string;
  item_per_page?: string;
  component?: "count" | "count-status" | "request-area";
}

export interface CreateDepartmentType {
  name: string;
}

export interface FetchedDepartmentCountType {
  total: number;
}

export interface FetchedDepartmentType {
  name: string;
  department_id: string;
  total_count: number;
  total_pending_req: number;
  total_approved_req: number;
  total_declined_req: number;
}
