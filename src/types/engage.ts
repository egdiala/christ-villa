export interface FetchEngageQuery {
    q?: string;
    page?: string;
    item_per_page?: string;
    component?: "count";
}

export type CreateEngageType = {
    title: string;
    user_type: "all" | "partner" | "pastor" | "member" | "hod" | "minister";
    comment?: string;
    file: File;
}

export interface FetchedAnnouncementType {
    type: "text" | "media";
    title: string;
    comment: string;
    url: string;
    account_type: "all" | "partner" | "pastor" | "member" | "hod" | "minister";
    createdAt: Date | string;
    updatedAt: Date | string;
    request_id: string;
}