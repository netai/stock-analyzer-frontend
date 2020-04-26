export interface WatchlistModel {
    watchlist_no: number;
    stocks: WatchlistStockModel[];
}

export interface WatchlistStockModel {
    id: number;
    symbol: string,
    exchange_name: string;
    prev_price: number;
    last_price: number;
    company_name: string;
    change_per: number;
    note: string;
}