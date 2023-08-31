interface FetchResponse<T> {
    data: T[];
    error: string | null;
    message: string;
    status: number;
}