import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ServerService, HoldingService } from '../../services';
import { MessageService, ErrorService } from '../../../shared/services';
import { HoldingModel, HoldingStockModel } from '../../../models';
import { BuySellComponent } from '../../modal';

@Component({
  selector: 'analyzer-holdings',
  templateUrl: 'holdings.component.html',
  styleUrls: ['holdings.component.less']
})

export class HoldingsComponent implements OnInit {

  holdingList: HoldingModel[] = [];
  loading: boolean = true;
  totalCurrentValue: number = 0;
  totalInvValue: number = 0;
  bsModalRef: BsModalRef;

  constructor(
    private _ss: ServerService,
    private _ms: MessageService,
    private _hs: HoldingService,
    private _es: ErrorService,
    private _mmodser: BsModalService,
  ) { }

  ngOnInit() {
    this._loadHoldingList()
  }

  private _loadHoldingList(): void {
    this.loading = true;
    this._ss.getHoldingList()
      .subscribe(
        holdingList => {
          if (holdingList.status === 'success') {
            this._hs.setHoldingList(holdingList.data.holding);
            this.holdingList = this._hs.getHoldingList();
            this._calculateTotalPrice(this.holdingList)
          } else {
            this._ms.addMessage({ message: holdingList.message, title: 'Error', type: 'error' });
            this._ms.showMessage();
          }
          this.loading = false;
        },
        error => {
          this._errorHandler(error);
        }
      );
  }

  private _calculateTotalPrice(holdingList: HoldingModel[]): void {
    this.totalCurrentValue = 0;
    this.totalInvValue = 0;
    for(let i=0;i<holdingList.length;i++) {
      this.totalCurrentValue += holdingList[i].cur_value;
      this.totalInvValue += holdingList[i].inv_amount;;
    }
  }

  public buySell(holding: HoldingModel): void {
    const modalConfig = {
      animated: true,
      backdrop: false,
      ignoreBackdropClick: true,
      class: 'buy-sell-modal',
      initialState: {
        stock: holding.stock,
        is_sell: !holding.is_sell,
        qty: holding.qty
      }
    };
    this.bsModalRef = this._mmodser.show(BuySellComponent, modalConfig);
  }

  private _errorHandler(error: any): void {
    this._es.errorHandler(error);
    this.loading = false;
  }

}
