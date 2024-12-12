export interface FetchRequestsQuery {
    start_date?: string;
    end_date?: string;
    department_id?: string;
    status?: string; // 0=Pending | 1=Completed | 2=Rejected
    page?: string;
    item_per_page?: string;
    component?: "count" | "count-status";
}

export type UpdateRequestStatusType = {
    request_id: string;
    status: string; // 1=Approve | 2=Reject/Suspend
}

export enum RequestStatus {
    Pending = 0,
    Completed = 1,
    Rejected = 2,
}

export interface FetchedRequestType {
    user_id: string;
    status: RequestStatus.Completed | RequestStatus.Pending | RequestStatus.Rejected;
    user_data: {
        name: string;
        phone_number: string;
        user_type: string;
    },
    data: {
        url: string;
        notice_reason: string;
        comment: string;
        title: string;
        description: string;
        user_data: {
            name: string;
            phone_number: string;
        }
    };
    createdAt: Date | string;
    updatedAt: Date | string;
    request_area: string;
    request_type?: string;
    request_id: string;
}

export interface FetchedRequestCountType {
    total: number;
}

export interface FetchedRequestCountStatusType {
    total_count: number;
    pending_req: number;
    approve_req: number;
    decline_req: number;
}