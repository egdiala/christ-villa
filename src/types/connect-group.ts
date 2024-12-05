export interface FetchConnectGroupsQuery {
    q?: string; // Search for name, email
    page?: string;
    item_per_page?: string;
    component?: "count" | "count-status";
}

export interface FetchConnectGroupQuery {
    id: string;
    q?: string; // Search for name, email
    page?: string;
    item_per_page?: string;
    component?: "count" | "count-status";
}

export type CreateConnectGroupType = {
    name: string;
}

export interface FetchedConnectGroupType {
    name: string;
    comment: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    connectgroup_id: string;
    total_member: number;
}

export interface FetchedConnectGroupCountStatusType {
    name: string;
    total_count: number;
    total_member: number;
    total_admin: number;
}

export interface FetchedConnectGroupCountType {
    total: number;
}