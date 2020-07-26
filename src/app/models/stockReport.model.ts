export interface StockReportModel {
    id: number;
    date: Date;
    prev_price: number;
    open_price: number;
    high_price: number;
    low_price: number;
    last_price: number;
    close_price: number;
    avg_price: number;
    traded_qty: number;
    delivery_qty: number;
    delivery_per: number;
}