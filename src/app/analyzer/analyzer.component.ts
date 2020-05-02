import { Component } from '@angular/core';
import { AuthService } from '../services';
import { ServerService } from './services';
import { Router } from '@angular/router';
import { MessageService, ErrorService } from '../shared/services';
import { AuthUserModel } from '../models';

@Component({
  selector: 'app-analyzer',
  templateUrl: 'analyzer.component.html',
  styleUrls: ['analyzer.component.less']
})

export class AnalyzerComponent {

  loading: boolean = true;
  userData: AuthUserModel;

    constructor(
      private _as: AuthService,
      private _router: Router,
      private _ss: ServerService,
      private _ms: MessageService,
      private _es: ErrorService
      ){
        this._executeOrder();
        this.userData = this._as.getUserData();
    }

    private _executeOrder(): void {
      this.loading = true;
      this._ss.executeOrder()
        .subscribe(
          orderList => {
            if (orderList.status === 'success') {
              //this._ms.addMessage({ message: orderList.message, title: 'Successfull', type: 'success' });
            } else {
              this._ms.addMessage({ message: orderList.message, title: 'Error', type: 'error' });
            }
            this._ms.showMessage();
            this.loading = false;
          },
          error => {
            this._errorHandler(error);
          }
        );
    }

    public logout(): void {
      this._as.logout();
      this._router.navigateByUrl('/');
    }

    private _errorHandler(error: any): void {
      this._es.errorHandler(error);
      this.loading = false;
    }
}
