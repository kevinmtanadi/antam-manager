import axios, { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import { ConvertTimezone, ConvertTimezoneTransaction, DashboardData, DateParams, EditProductData, GetCartData, GetProductDataParams, GetTransactionDataParams, GraphData, InsertProductData, InsertTransactionData, ProductData, ProductStockData, SingleNumber, TransactionData } from "./dto";
import { getCookieValue } from "./helper";

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
        const auth = getCookieValue("_auth");
        
        const headers = {
            'Authorization': auth,
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
        const auth = getCookieValue("_auth");
        
        const headers = {
            'Authorization': auth,
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
        const auth = getCookieValue("_auth");
        
        const headers = {
            'Authorization': auth,
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

    const Delete = <T>(endpoint: string, needAuthorization: boolean, requestConfig?: AxiosRequestConfig) => {
        const controller = new AbortController();
        const auth = getCookieValue("_auth");
        
        const headers = {
            'Authorization': auth,
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
        
        params = ConvertTimezoneTransaction(params);
        
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

    const getTransactionCount = (params: GetTransactionDataParams, deps?: any[]) => {
        const [data, setData] = useState<SingleNumber[] | null>(null)
        const [error, setError] = useState("");
        const [message, setMessage] = useState("");
        const [isLoading, setIsLoading] = useState(true);
        const [status, setStatus] = useState(0)
        
        params = ConvertTimezoneTransaction(params);
        
        useEffect(() => {
            Get<SingleNumber>("/transaction/count", true, {
                params: {
                    start_date: params.start_date,
                    end_date: params.end_date
                }
            })
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
        
        params = ConvertTimezone(params)
        
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
        
        params = ConvertTimezone(params)
        
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
    
    const editProduct = (product: EditProductData) => {
        if (product === null || product === undefined) return;
        
        const response = Put("/product", true, {}, product);
        return response;
    }
    
    const deleteProduct = (productId: string) => {
        if (productId === "" || productId === null || productId === undefined) return;
        
        const response = Delete("/product", true, 
        {
            params: {
                product_id: productId,
            }
        });
        
        return response;
    }
    
    const checkUserAuth = async (tries: number): Promise<boolean> => {
        const auth = getCookieValue("_auth");
      
        if (auth === "") {
          await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 500ms
      
          if (tries < 5) {
            return checkUserAuth(tries + 1); // Retry after 500ms delay
          }
      
          return false;
        }
      
        try {
          await Post("/auth", true, {});
          return true;
        } catch (err) {
          if (err instanceof CanceledError) {
            return false;
          }
          if (tries < 5) {
            return checkUserAuth(tries + 1); // Retry after 500ms delay
          }
          return false;
        }
    };

    return {
        Get,
        Post,
        Put,
        Delete,
        authenticateUser,
        register,
        getTransactionData,
        getTransactionCount,
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
        editProduct,
        deleteProduct,
        checkUserAuth,
    }
}

export default { create }