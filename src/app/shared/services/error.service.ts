import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services';

@Injectable({
    providedIn: 'root',
})
export class ErrorService {

    constructor(
        private _ms: MessageService,
        private _as: AuthService,
        private _router: Router
        ) {}

    public errorHandler(error: any): void {
        if(error.status === 0 && error.statusText === 'Unknown Error') {
            this._notFoundErrorHandler();
        }
        else if(error.status === 401 && error.statusText === 'UNAUTHORIZED') {
            this._authErrorHandler();
        }
        else if(error.status === 400 && error.statusText === 'BAD REQUEST') {
            this._badRequestErrorHandler(error.error);
        }
        else {
            this._otherErrorHandler(error.error);
        }
    }

    private _badRequestErrorHandler(error: any): void {
        let errStr = '';
        if(typeof error.message === 'object'){
            Object.keys(error.message).forEach((value) => {
                errStr += value + ': ' + error.message[value];
            });
        } else {
            errStr = error.message;
        }
        
        this._ms.addMessage({ message: errStr, title: 'Bade Request', type: 'error' });
        this._ms.showMessage();
    }

    private _authErrorHandler(): void {
        this._as.setRedirectUrl(this._router.routerState.snapshot.url);
        this._router.navigateByUrl('/login');
    }

    private _notFoundErrorHandler(): void {
        this._ms.addMessage({ message: 'Unknown error has occurred, please reload page', title: 'Error', type: 'error' });
        this._ms.showMessage();
    }

    private _otherErrorHandler(error: any): void {
        console.log(error);
        if(error.status === 'fail') {
            this._ms.addMessage({ message: error.message, title: 'Error', type: 'error' });
        }
        else if(error.status === 'info') {
            this._ms.addMessage({ message: error.message, title: 'Information', type: 'info' });
        }
        else if(error.status === 'warning') {
            this._ms.addMessage({ message: error.message, title: 'Warning!', type: 'warning' });
        }
        this._ms.showMessage();
    }
}