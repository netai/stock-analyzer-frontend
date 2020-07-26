export interface StockModel {
    id: number;
    symbol: string;
    company_name: string;
    series: string;
    listing_date: string;
    isin_number: string;
    face_value: number;
    company_detail: string;
    comapany_website: string;
    exchange_name: string;
    stock_report?: StockReport;
}

export interface StockReport {
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
    change_per: number;
}