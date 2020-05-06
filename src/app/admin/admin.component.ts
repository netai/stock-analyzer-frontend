import { Component } from '@angular/core';
import { ServerService } from './services';
import { MessageService, ErrorService } from '../shared/services';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.less']
})

export class AdminComponent {

  loading: boolean = true;

    constructor(
      private _ss: ServerService,
      private _ms: MessageService,
      private _es: ErrorService
      ){
        this.loading = false;
      }

    private _errorHandler(error: any): void {
      this._es.errorHandler(error);
      this.loading = false;
    }
}
