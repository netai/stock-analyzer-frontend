import { Injectable } from '@angular/core';
import { OrderModel } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _executedOrderList: OrderModel[] = [];
  private _openOrderList: OrderModel[] = [];

  constructor() { }

  public setOrderList(orderList: any): void {
      this._openOrderList = orderList.open_order?orderList.open_order:[];
      this._executedOrderList = orderList.executed_order?orderList.executed_order:[];
  }

  public getExecutedOrderList(): OrderModel[] {
      return this._executedOrderList;
  }

  public getOpenOrderList(): OrderModel[] {
      return this._openOrderList;
  }

}