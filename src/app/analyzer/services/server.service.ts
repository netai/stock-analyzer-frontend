import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppConfig } from '../../app.config'

@Injectable({
    providedIn: 'root',
})
export class ServerService {

    httpOptions = {
        headers: {},
        params: {}
    };

    constructor(private _http: HttpClient) {
        this.httpOptions.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('AUTH_TOKEN') ? localStorage.getItem('AUTH_TOKEN') : 'none'
        });
    }

    public getStockList(): Observable<any> {
        this.httpOptions.params = null
        return this._http.get(AppConfig.API_BASE_URL + AppConfig.API_SERVICE.STOCK, this.httpOptions)
            .pipe(
                tap((response: Response) => {
                    return response;
                }),
                catchError((serverError: Response) => {
                    return throwError(serverError)
                })
            );
    }

    public getWatchlistStock(): Observable<any> {
        this.httpOptions.params = null
        return this._http.get(AppConfig.API_BASE_URL + AppConfig.API_SERVICE.WATCHLIST, this.httpOptions)
            .pipe(
                tap((response: Response) => {
                    return response;
                }),
                catchError((serverError: Response) => {
                    return throwError(serverError)
                })
            );
    }

    public saveWatchlistStock(postData: any): Observable<any> {
        this.httpOptions.params = null
        return this._http.post(AppConfig.API_BASE_URL + AppConfig.API_SERVICE.WATCHLIST, postData, this.httpOptions)
            .pipe(
                tap((response: Response) => {
                    return response;
                }),
                catchError((serverError: Response) => {
                    return throwError(serverError)
                })
            );
    }

    public deleteWatchlistStock(postData: any): Observable<any> {
        this.httpOptions.params = null
        return this._http.delete(AppConfig.API_BASE_URL + AppConfig.API_SERVICE.WATCHLIST + '/' + postData.watchlist_no + '/stock/' + postData.stock_id, this.httpOptions)
            .pipe(
                tap((response: Response) => {
                    return response;
                }),
                catchError((serverError: Response) => {
                    return throwError(serverError)
                })
            );
    }

    public submitOrder(postData: any): Observable<any> {
        this.httpOptions.params = null
        return this._http.post(AppConfig.API_BASE_URL + AppConfig.API_SERVICE.ORDER, postData, this.httpOptions)
            .pipe(
                tap((response: Response) => {
                    return response;
                }),
                catchError((serverError: Response) => {
                    return throwError(serverError)
                })
            );
    }

    public getOrderList(): Observable<any> {
        this.httpOptions.params = null
        return this._http.get(AppConfig.API_BASE_URL + AppConfig.API_SERVICE.ORDER, this.httpOptions)
            .pipe(
                tap((response: Response) => {
                    return response;
                }),
                catchError((serverError: Response) => {
                    return throwError(serverError)
                })
            );
    }

    public cancelOrder(postData: any): Observable<any> {
        this.httpOptions.params = null
        return this._http.delete(AppConfig.API_BASE_URL + AppConfig.API_SERVICE.ORDER + '/' + postData.id , this.httpOptions)
            .pipe(
                tap((response: Response) => {
                    return response;
                }),
                catchError((serverError: Response) => {
                    return throwError(serverError)
                })
            );
    }

    public executeOrder(): Observable<any> {
        this.httpOptions.params = null
        return this._http.get(AppConfig.API_BASE_URL + AppConfig.API_SERVICE.ORDER+'/execute', this.httpOptions)
            .pipe(
                tap((response: Response) => {
                    return response;
                }),
                catchError((serverError: Response) => {
                    return throwError(serverError)
                })
            );
    }

    public getHoldingList(): Observable<any> {
        this.httpOptions.params = null
        return this._http.get(AppConfig.API_BASE_URL + AppConfig.API_SERVICE.HOLDING, this.httpOptions)
            .pipe(
                tap((response: Response) => {
                    return response;
                }),
                catchError((serverError: Response) => {
                    return throwError(serverError)
                })
            );
    }

    public getStockReportList(public_id: string, postData: any): Observable<any> {
        this.httpOptions.params = postData;
        return this._http.get(AppConfig.API_BASE_URL + AppConfig.API_SERVICE.STOCK_REPORT+'/'+public_id, this.httpOptions)
            .pipe(
                tap((response: Response) => {
                    return response;
                }),
                catchError((serverError: Response) => {
                    return throwError(serverError)
                })
            );
    }

    public getStockDetail(public_id: string): Observable<any> {
        this.httpOptions.params = null
        return this._http.get(AppConfig.API_BASE_URL + AppConfig.API_SERVICE.STOCK + '/' + public_id, this.httpOptions)
            .pipe(
                tap((response: Response) => {
                    return response;
                }),
                catchError((serverError: Response) => {
                    return throwError(serverError)
                })
            );
    }

    public getActivityDetail(postData: any): Observable<any> {
        this.httpOptions.params = postData
        return this._http.get(AppConfig.API_BASE_URL + AppConfig.API_SERVICE.ACTIVITY, this.httpOptions)
            .pipe(
                tap((response: Response) => {
                    return response;
                }),
                catchError((serverError: Response) => {
                    return throwError(serverError)
                })
            );
    }

}
