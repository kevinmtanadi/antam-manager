import { UtcToGmt } from "./helper";

export interface GetTransactionDataParams {
    start_date: Date;
    end_date: Date;
    limit: number;
    offset: number;
}

export const ConvertTimezoneTransaction = (params: GetTransactionDataParams): GetTransactionDataParams => {
    return {
        start_date: UtcToGmt(params.start_date),
        end_date: UtcToGmt(params.end_date),
        limit: params.limit,
        offset: params.offset
    }
}


export interface SingleNumber {
    count: number
}

export interface TransactionData {
    transaction_id: string;
    created_at: string;
    total_sale: number | null;
    total_buy: number | null;
    purchase: TransactionPurchaseData[];
    sales: TransactionSaleData[];
}

export interface TransactionPurchaseData {
    transaction_purchase_id?: string;
    transaction_id?: string;
    product_id?: string;
    product_stock_id: string;
    product_name?: string;
    buy_price: number;
    note?: string;
}

export interface TransactionSaleData {
   transaction_sale_id?: string;
   transaction_id?: string;
   product_id?: string;
   product_stock_id: string;
   product_name?: string;
   buy_price: number;
   sale_price: number;
}

export interface InsertTransactionData {
    purchase: TransactionPurchaseData[];
    sales: TransactionSaleData[];
}

export interface GetProductDataParams {
    limit?: number;
    offset?: number;
}

export interface ProductData {
    product_id: string;
    product_name: string;
    weight: number;
    stock: number;
    avg_price: number;
    total_stock: number;
    items: ProductStockData[]
}

export interface ProductStockData {
    product_stock_id: string;
    product_id: string;
    product_name: string;
    buy_price: number;
    buy_at: string;
    status: string;
    note: string;
}

export interface InsertProductData {
    product_id: string;
    product_name: string;
    weight: number;
}

export interface EditProductData {
    product_id: string;
    new_product_id: string;
    product_name: string;
    weight: number;
}

export interface GetCartData {
    cart_item_id: string;
    product_stock_id: string;
    product_id: string;
    product_name: string;
    buy_price: number;
    sale_price: number;
}

export interface DateParams {
    start_date: Date;
    end_date: Date;
}

export const ConvertTimezone = (dateParams: DateParams): DateParams => {
    return {
        start_date: UtcToGmt(dateParams.start_date),
        end_date: UtcToGmt(dateParams.end_date),
    }
}

export interface GraphData {
    date: string;
    transaction_count: number;
    total_purchase: number;
    total_sale: number;
}

export interface DashboardData {
    profit: number;
    total_sale: number;
    total_buy: number;
    top_sold_product: string;
    amount_sold: number;
}