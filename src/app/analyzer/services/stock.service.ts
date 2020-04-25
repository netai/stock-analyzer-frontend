import { Injectable } from '@angular/core';
import { StockModel } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class StockService {

    private _stocks: StockModel[] = [];

  constructor() { }

  public setStockList(stockList: StockModel[]) {
      this._stocks = stockList;
  }

  public getStockList(): StockModel[] {
      return this._stocks
  }

}