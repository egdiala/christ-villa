export interface FetchConnectGroupsQuery {
    q?: string; // Search for name, email
    page?: string;
    item_per_page?: string;
    component?: "count" | "count-status";
}

export type CreateConnectGroupType = {
    name: string;
}