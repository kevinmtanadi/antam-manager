export interface GetTransactionDataParams {
    start_date: string;
    end_date: string;
    limit: number;
    offset: number;
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