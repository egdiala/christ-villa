export interface FetchSermonsQuery {
    sermon_date?: string; // Search for name, email
    page?: string;
    item_per_page?: string;
    component?: "count" | "export";
}

export type CreateSermonType = {
    sermon_date: string;
    preacher_name: string;
    description: string;
}

export interface FetchedSermonType {
    preacher_name: string;
    sermon_date: string | Date;
    description: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    sermon_id: string;
}

export type UpdateSermonType =  {
    sermon_date: string;
    preacher_name: string;
    description: string;
    id: string
}