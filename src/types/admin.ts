export interface FetchAdminsQuery {
    q?: string; // Search for name, email
    status?: string; // 0=Pending | 1=Active | 2=suspended
    page?: string;
    item_per_page?: string;
    component?: "count" | "profile";
}

export type CreateAdminType = {
    name: string;
    email: string;
    gender: string;
    permission: string[];
}

export type UpdateAdminStatusType = {
    user_id: string;
    status: string; // 1=Activate | 2=Suspend
    reason?: string; // Required when status is 2
}

export enum AdminStatus {
    Pending = 0,
    Active = 1,
    Suspended = 2
}

export interface FetchedAdminType {
    name: string;
    email: string;
    permission: string[];
    avatar: string;
    user_type: string;
    gender: string;
    status: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    user_id: string;
}

export interface FetchedAdminCountType {
    total: number;
}