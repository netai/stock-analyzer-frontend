import { Injectable } from '@angular/core';
import { StockReportModel, StockModel } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class InstrumentService {
  private _stockReportList: StockReportModel[] = [];
  private _stockReportLimit: number = 30;
  private _stockDetail: StockModel;

  constructor() { }

  public setStockReportList(stockReportList: any): void {
    this._stockReportList = stockReportList;
  }

  public getStockReportList(page: number): StockReportModel[] {
    let startItem = (page - 1) * this._stockReportLimit;
    let endItem = page * this._stockReportLimit;
    return this._stockReportList.slice(startItem, endItem);
  }

  public setStockDetail(stockDetail: any): void {
    this._stockDetail = stockDetail;
  }

  public getStockDetail(): StockModel {
     return this._stockDetail;
  }

}