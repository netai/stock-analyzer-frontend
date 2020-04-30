export interface HoldingModel {
    id: number;
    qty: number;
    avg_price: number;
    inv_amount: number;
    cur_value: number;
    pl_value: number;
    net_change: number;
    is_sell: boolean;
    stock: HoldingStockModel;
}

export interface HoldingStockModel {
    symbol: string;
    last_price: number;
    prev_price: number;
    per_change: number;
}