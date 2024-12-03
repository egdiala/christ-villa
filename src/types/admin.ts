export interface FetchAdminsQuery {
    q?: string; // Search for name, email
    status?: string; // 0=Pending | 1=Active | 2=suspended
    page?: string;
    item_per_page?: string;
    component?: "count" | "profile";
}