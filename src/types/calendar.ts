export interface FetchCalendarsQuery {
    page?: string;
    item_per_page?: string;
    component?: "count";
}

export type CreateCalendarType = {
    title: string;
    file: File
}

export interface FetchedCalendarType {
    title: string;
    url: string;
    uploaded_by: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    request_id: string;
}