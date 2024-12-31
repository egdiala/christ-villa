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

export interface DeleteConnectGroupQuery {
    id: string;
    user_id?: string; // Used when removing a memeber from the group
}

export type CreateConnectGroupType = {
    name: string;
}

export type EditConnectGroupType = {
    id: string;
    name: string;
}

export type UpdateConnectGroupMemberType = {
    id: string;
    request_type: "1" | "2"; // 1=Status Update | 2=Make Admin
    user_id: string;
    status: "1" | "2"; // Status (1=Approve | 2=Suspend/Reject) Make Admin (1=Admin | 2=Member)
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

export interface FetchedConnectGroupMemberType {
    name: string;
    account_type: "member" | "hod";
    gender: "male" | "female";
    user_id: string;
    connect_group_id: string;
    is_admin: number;
    status: number;
    alert: number;
    createdAt: Date | string;
}