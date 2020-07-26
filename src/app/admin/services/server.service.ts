import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppConfig } from '../../app.config'

@Injectable({
    providedIn: 'root',
})
export class ServerService {

    httpOptions = {
        headers: {}
    };

    constructor(private _http: HttpClient, private _zone: NgZone) {
        this.httpOptions.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('AUTH_TOKEN') ? localStorage.getItem('AUTH_TOKEN') : 'none'
        });
    }

    public importData(postData: any): Observable<any> {
        let url: string = '';
        if(postData.importType === 'day_report_nse') {
            url = AppConfig.API_SERVICE.IMPORT.DAY_REPORT;
        }
        else if(postData.importType === 'stock_nse') {
            url = AppConfig.API_SERVICE.IMPORT.STOCKS;
        }
        return this._http.get(AppConfig.API_BASE_URL + url, this.httpOptions)
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
