import { Component, OnInit } from '@angular/core';
import { MessageService, ErrorService } from '../../../shared/services';
import { OrderModel } from '../../../models';
import { ServerService, OrderService } from '../../services';

@Component({
  selector: 'analyzer-orders',
  templateUrl: 'orders.component.html',
  styleUrls: ['orders.component.less']
})

export class OrdersComponent implements OnInit {

  executedOrderList: OrderModel[] = [];
  openOrderList: OrderModel[] = [];
  loading: boolean = true;

  constructor(
    private _ms: MessageService,
    private _ss: ServerService,
    private _os: OrderService,
    private _es: ErrorService
  ) { }

  ngOnInit() {
    this._loadOrderList();
  }

  private _loadOrderList(): void {
    this.loading = true;
    this._ss.getOrderList()
      .subscribe(
        orderList => {
          if (orderList.status === 'success') {
            this._os.setOrderList(orderList.data.order);
            this.executedOrderList = this._os.getExecutedOrderList();
            this.openOrderList = this._os.getOpenOrderList();
          } else {
            this._ms.addMessage({ message: orderList.message, title: 'Error', type: 'error' });
            this._ms.showMessage();
          }
          this.loading = false;
        },
        error => {
          this._errorHandler(error);
        }
      );
  }

  public cancelOrder(row: OrderModel): void {
    this.loading = true;
    this._ss.cancelOrder(row)
      .subscribe(
        orderList => {
          this.loading = false;
          if (orderList.status === 'success') {
            this._loadOrderList();
            this._ms.addMessage({ message: orderList.message, title: 'Cancelled Order', type: 'success' });
          } else {
            this._ms.addMessage({ message: orderList.message, title: 'Error', type: 'error' });
          }
          this._ms.showMessage();
        },
        error => {
          this._errorHandler(error);
        }
      );
  }

  private _errorHandler(error: any): void {
    this._es.errorHandler(error);
    this.loading = false;
  }

}
