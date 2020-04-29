export interface OrderModel {
    id: number;
    date: Date;
    executed_date: Date;
    order_type: string;
    is_sell: boolean;
    price: number;
    qty: number;
    sl_price: number;
    status: string;
    stock: OrderStockModel
}

export interface OrderStockModel {
    symbol: string,
    last_price: number,
    exchange_name: string
}