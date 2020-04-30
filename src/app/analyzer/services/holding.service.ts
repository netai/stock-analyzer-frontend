import { Injectable } from '@angular/core';
import { HoldingModel } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class HoldingService {
  private _holdingList: HoldingModel[] = [];

  constructor() { }

  public setHoldingList(holdingList: any): void {
      this._holdingList = holdingList;
  }

  public getHoldingList(): HoldingModel[] {
      return this._holdingList;
  }

}