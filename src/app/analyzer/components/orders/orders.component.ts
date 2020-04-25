import { Component, OnInit} from '@angular/core';
import { MessageService } from '../../../shared/services';

@Component({
  selector: 'analyzer-orders',
  templateUrl: 'orders.component.html'
})

export class OrdersComponent implements OnInit{

  constructor(private _ms: MessageService){}

  ngOnInit(){
    this._ms.showMessage();
  }

}