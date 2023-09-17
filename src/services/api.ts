import axios, { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import { DashboardData, DateParams, GetCartData, GetProductDataParams, GetTransactionDataParams, GraphData, InsertProductData, InsertTransactionData, ProductData, ProductStockData, SingleNumber, TransactionData } from "./dto";

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
    
    const authenticateUser = (username: string, password: string) => {
        if (username === "" || password === "") return;

        const params = {
            username: username,
            password: password,
        }
        const response = Post("/login", false, {params: params});

        return response
    }

    const register = (username: string, password: string) => {
        if (username === "" || password === "") return;

        const params = {
            username: username,
            password: password,
        }

        const response = Post("/register", true, {params: params});

        return response
    }
    
    const getTransactionData = (params: GetTransactionDataParams, deps?: any[]) => {
        const [data, setData] = useState<TransactionData[] | null>(null)
        const [error, setError] = useState("");
        const [message, setMessage] = useState("");
        const [isLoading, setIsLoading] = useState(true);
        const [status, setStatus] = useState(0)
        
        useEffect(() => {
            Get<TransactionData>("/transaction", true, {params})
            .then(
                (response) => {
                    const data = response.data
                    setData(data.data);
                    setMessage(data.message);
                    setStatus(data.status);
                    setIsLoading(false);
                }
            )
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err)
                setIsLoading(false)
                
            })
        }, deps? [...deps]: []);
        
        return { data, error, message, status, isLoading }
    }
    
    const createNewTransaction = (data: InsertTransactionData) => {
        if (data === null || data === undefined) return;
        
        const response = Post("/transaction", true, {}, data);
        return response;
    }
    
    const getProductData = (params: GetProductDataParams, deps?: any[]) => {
        const [data, setData] = useState<ProductData[] | null>(null)
        const [error, setError] = useState("");
        const [message, setMessage] = useState("");
        const [isLoading, setIsLoading] = useState(true);
        const [status, setStatus] = useState(0)
        
        useEffect(() => {
            Get<ProductData>("/product", true, {params})
            .then(
                (response) => {
                    const data = response.data
                    setData(data.data);
                    setMessage(data.message);
                    setStatus(data.status);
                    setIsLoading(false);
                }
            )
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err)
                setIsLoading(false)
                
            })
        }, deps? [...deps]: []);
        
        return { data, error, message, status, isLoading }
    }
    
    const createNewProduct = (data: InsertProductData) => {
        if (data === null || data === undefined) return;
        
        const response = Post("/product", true, {}, data);
        return response;
    }
    
    const getCartData = (deps?: any[]) => {
        const [data, setData] = useState<GetCartData[] | null>(null)
        const [error, setError] = useState("");
        const [message, setMessage] = useState("");
        const [isLoading, setIsLoading] = useState(true);
        const [status, setStatus] = useState(0)
        
        useEffect(() => {
            Get<GetCartData>("/cart", true)
            .then(
                (response) => {
                    const data = response.data
                    setData(data.data);
                    setMessage(data.message);
                    setStatus(data.status);
                    setIsLoading(false);
                }
            )
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err)
                setIsLoading(false)
                
            })
        }, deps? [...deps]: []);
        
        return { data, error, message, status, isLoading }
    }
    
    const insertCartData = (product_stock_id: string) => {
        if (product_stock_id === "" || product_stock_id === null || product_stock_id === undefined) return;
        
        const response = Post("/cart/add", true, 
        {
            params: {
                product_stock_id: product_stock_id,
            }
        });
        
        return response;
    }
    
    const deleteCartData = (product_stock_id: string) => {
        if (product_stock_id === "" || product_stock_id === null || product_stock_id === undefined) return;
        
        const response = Delete("/cart/remove", true, 
        {
            params: {
                product_stock_id: product_stock_id,
            }
        });
        
        return response;
    }
    
    const searchProductStock = (product_id: string) => {
        if (product_id === "" || product_id === null || product_id === undefined) return;

        const response = Get<ProductStockData>("/product/search", true, 
            {
                params: {
                    product_id: product_id,
                }
            })
            
        return response;
    }
    
    const getProductOption = (deps?: any) => {
        const [data, setData] = useState<ProductData[] | null>(null)
        const [error, setError] = useState("");
        const [message, setMessage] = useState("");
        const [isLoading, setIsLoading] = useState(true);
        const [status, setStatus] = useState(0)
        
        useEffect(() => {
            Get<ProductData>("/product/option", true)
            .then(
                (response) => {
                    const data = response.data
                    setData(data.data);
                    setMessage(data.message);
                    setStatus(data.status);
                    setIsLoading(false);
                }
            )
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err)
                setIsLoading(false)
                
            })
        }, deps? [...deps]: []);
        
        return { data, error, message, status, isLoading }
    }
        
    const getTransactionGraph = (params: DateParams, deps?: any) => {
        const [data, setData] = useState<GraphData[] | null>(null)
        const [error, setError] = useState("");
        const [message, setMessage] = useState("");
        const [isLoading, setIsLoading] = useState(true);
        const [status, setStatus] = useState(0)
        
        useEffect(() => {
            Get<GraphData>("/dashboard/graph", true, {params})
            .then(
                (response) => {
                    const data = response.data
                    setData(data.data);
                    setMessage(data.message);
                    setStatus(data.status);
                    setIsLoading(false);
                }
            )
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err)
                setIsLoading(false)
                
            })
        }, deps? [...deps]: []);
        
        return { data, error, message, status, isLoading }
    }
    
    const getDashboardData = (params: DateParams, deps?: any) => {
        const [data, setData] = useState<DashboardData[] | null>(null)
        const [error, setError] = useState("");
        const [message, setMessage] = useState("");
        const [isLoading, setIsLoading] = useState(true);
        const [status, setStatus] = useState(0)
        
        useEffect(() => {
            Get<DashboardData>("/dashboard", true, {params})
            .then(
                (response) => {
                    const data = response.data
                    setData(data.data);
                    setMessage(data.message);
                    setStatus(data.status);
                    setIsLoading(false);
                }
            )
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err)
                setIsLoading(false)
                
            })
        }, deps? [...deps]: []);
        
        return { data, error, message, status, isLoading }
    }
    
    const getStockValue = (deps?: any) => {
        const [data, setData] = useState<SingleNumber[] | null>(null)
        const [error, setError] = useState("");
        const [message, setMessage] = useState("");
        const [isLoading, setIsLoading] = useState(true);
        const [status, setStatus] = useState(0)
        
        useEffect(() => {
            Get<SingleNumber>("/dashboard/stock_value", true)
            .then(
                (response) => {
                    const data = response.data
                    setData(data.data);
                    setMessage(data.message);
                    setStatus(data.status);
                    setIsLoading(false);
                }
            )
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err)
                setIsLoading(false)
                
            })
        }, deps? [...deps]: []);
        
        return { data, error, message, status, isLoading }
    }

    return {
        authenticateUser,
        register,
        getTransactionData,
        createNewTransaction,
        getProductData,
        createNewProduct,
        getCartData,
        insertCartData,
        deleteCartData,
        searchProductStock,
        getProductOption,
        getTransactionGraph,
        getDashboardData,
        getStockValue,
    }
}

export default { create }