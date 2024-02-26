
export type FetchStatusType = "idle" | "pending" | "fulfilled" | "rejected";

export type CustomError = {
    response?: {
        data?: {
            message?: string;
            data:{}
        };
        status?:number
    };
    message?: string;
};

export type HttpResponse<T> = {
    data: T,
    message: string,
    page: number,
    totalData: number,
}
