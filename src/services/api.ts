import axios, { AxiosRequestConfig } from "axios";

interface FetchResponse<T> {
    data: T[];
    error: string | null;
    message: string;
    status: number;
}

const create = (url: string) => {
    const apiWrapper = axios.create({
        baseURL: url,
        timeout: 60000,
    })

    const Get = <T>(endpoint: string, needAuthorization: boolean, requestConfig?: AxiosRequestConfig) => {
        const controller = new AbortController();
        const headers = {
            'Content-Type': 'application/json',

            'x-access-token': 'goldapi-dne8yrlm4hltqk-io'
        }
        const response = apiWrapper.get<FetchResponse<T>>(
            endpoint,
            {
                signal: controller.signal,
                ...requestConfig,
                headers,
                withCredentials: needAuthorization,

            }
        )

        return response
    }

    const Post = <T>(endpoint: string, needAuthorization: boolean, requestConfig?: AxiosRequestConfig, body?: any) => {

        const controller = new AbortController();
        const headers = {
            'Content-Type': 'application/json',
        }
        const response = apiWrapper.post<FetchResponse<T>>(
            endpoint,
            body ? body : "",
            {
                signal: controller.signal,
                params: {
                    store_id: body ? body.store_id : "",
                },
                ...requestConfig,
                headers,
                withCredentials: needAuthorization,
            }
        )

        return response
    }

    const Put = <T>(endpoint: string, needAuthorization: boolean, requestConfig?: AxiosRequestConfig, body?: any) => {
        const controller = new AbortController();
        const headers = {
            'Content-Type': 'application/json',
        }
        const response = apiWrapper.put<FetchResponse<T>>(
            endpoint,
            body ? body : "",
            {
                signal: controller.signal,
                params: {
                    store_id: body ? body.store_id : "",
                },
                ...requestConfig,
                headers,
                withCredentials: needAuthorization,
            }
        )

        return response
    }

    const Delete = <T>(endpoint: string, needAuthorization: boolean, requestConfig?: AxiosRequestConfig, body?: any) => {
        const controller = new AbortController();
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = apiWrapper.delete<FetchResponse<T>>(
            endpoint,
            {
                signal: controller.signal,
                ...requestConfig,
                headers,
                withCredentials: needAuthorization,
            }
        )

        return response
    }

    return {
        Get, Post, Put, Delete
    }
}

export default { create }