export class AppConfig {

    public static API_BASE_URL = 'http://localhost:5000/api';

    public static API_SERVICE = {
        LOGIN: '/login',
        USER: '/user',
        STOCK: '/stock',
        WATCHLIST: '/watchlist',
        ORDER: '/order',
        HOLDING: '/holding',
        STOCK_REPORT: '/stock/report',
        ACTIVITY: '/activity',
        IMPORT: {
            DAY_REPORT: '/import/report/day',
            STOCKS: '/import/stock'
        }
    }
}