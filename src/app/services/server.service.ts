import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppConfig } from '../app.config'

@Injectable({
    providedIn: 'root',
})
export class ServerService {

    httpOptions = {
        headers: {}
    };

    constructor(private _http: HttpClient) {
        this.httpOptions.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('AUTH_TOKEN')?localStorage.getItem('AUTH_TOKEN'):'none'
        });
    }

    public loginUser(postData: any): Observable<any> {
        return this._http.post(AppConfig.API_BASE_URL + AppConfig.API_SERVICE.LOGIN, postData, this.httpOptions)
            .pipe(
                tap((response: Response) => {
                    return response;
                }),
                catchError((serverError: Response) => {
                    return throwError(serverError)
                })
            );
    }

    public getUserDetail(userId: string): Observable<any> {
        return this._http.get(AppConfig.API_BASE_URL + AppConfig.API_SERVICE.USER+'/'+userId, this.httpOptions)
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
