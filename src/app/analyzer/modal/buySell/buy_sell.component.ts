import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { WatchlistStockModel } from '../../../models';
import { MessageService, ErrorService } from '../../../shared/services';
import { ServerService } from '../../services';

@Component({
  selector: 'app-buy-sell-modal',
  templateUrl: 'buy_sell.component.html',
  styleUrls: ['buy_sell.component.less']
})

export class BuySellComponent implements OnInit {

  stock: WatchlistStockModel;
  is_sell: boolean;
  oredrFrm: FormGroup;
  isSubmitted: boolean = false;
  errorMessage: string[] = [];
  loading: boolean = false;
  get formControls() { return this.oredrFrm.controls; }

  constructor(
    public bsModalRef: BsModalRef,
    private _fb: FormBuilder,
    private _ms: MessageService,
    private _ss: ServerService,
    private _es: ErrorService
  ) { }

  ngOnInit() {
    this.oredrFrm = this._fb.group({
      qty: [1, Validators.required],
      price: [{ value: this.stock.last_price, disabled: true }, Validators.required],
      sl_price: [{ value: 0, disabled: true }, Validators.required],
      order_type: ['market', Validators.required],
      is_sell: [this.is_sell, Validators.required],
      stock_id: [this.stock.id, Validators.required],
    });
  }

  public placeOrder(): void {
    this.isSubmitted = true;
    if (this.oredrFrm.valid && this._isValidateValue()) {
      this.loading = true;
      this._ss.submitOrder(this.oredrFrm.getRawValue())
        .subscribe(
          respData => {
            if (respData.status === 'success') {
              this._ms.addMessage({ message: 'Your order has been placed successfully, refresh orderbook for status', title: 'Successfull', type: 'success' });
              this.bsModalRef.hide();
            } else {
              this._ms.addMessage({ message: respData.message, title: 'Error', type: 'error' });
            }
            this._ms.showMessage();
            this.loading = false;
          },
          error => {
            this._errorHandler(error);
          }
        );
    } else {
      this.loading = false;
    }
  }

  private _isValidateValue(): boolean {
    let returnValue = true;
    this.errorMessage = [];
    let priceReg = new RegExp(/^\d+(?:\.\d)?[05]?$/, 'i')
    if (this.formControls.order_type.value !== '') {
      if (this.oredrFrm.get('price').value === '' || parseFloat(this.oredrFrm.get('price').value) <= 0 || !priceReg.test(this.oredrFrm.get('price').value)) {
        this.errorMessage.push('Price should be a multiple of 0.05');
        returnValue = false;
      }
      if ((this.oredrFrm.get('order_type').value === 'sl' || this.oredrFrm.get('order_type').value === 'slm') && 
        (this.oredrFrm.get('sl_price').value === '' || parseFloat(this.oredrFrm.get('sl_price').value) <= 0 || !priceReg.test(this.oredrFrm.get('sl_price').value))) {
        this.errorMessage.push('Stop Loss Price should be a multiple of 0.05');
        returnValue = false;
      }
      if (this.oredrFrm.get('qty').value === '' || parseFloat(this.oredrFrm.get('qty').value) <= 0 || parseFloat(this.oredrFrm.get('qty').value) % 1 !== 0) {
        this.errorMessage.push('Quantity should be a multiple of 1');
        returnValue = false;
      }
      if (this.oredrFrm.get('is_sell').value && (this.oredrFrm.get('order_type').value === 'sl' || this.oredrFrm.get('order_type').value === 'slm') && (parseFloat(this.oredrFrm.get('price').value) >= parseFloat(this.oredrFrm.get('sl_price').value))) {
        this.errorMessage.push('Stop Loss Price should be greater than price');
        returnValue = false;
      }
      if (!this.oredrFrm.get('is_sell').value && (this.oredrFrm.get('order_type').value === 'sl' || this.oredrFrm.get('order_type').value === 'slm') && (parseFloat(this.oredrFrm.get('price').value) <= parseFloat(this.oredrFrm.get('sl_price').value))) {
        this.errorMessage.push('Stop Loss Price should be lower than price');
        returnValue = false;
      }
    } else {
      this.errorMessage.push('Order Type is Invalid.');
      returnValue = false;
    }
    return returnValue;
  }

  public selectOrderType(): void {
    if (this.formControls.order_type.value === 'market') {
      this.oredrFrm.patchValue({
        'price': this.stock.last_price,
        'sl_price': 0
      });
      this.formControls.price.disable();
      this.formControls.sl_price.disable();
    }
    else if (this.formControls.order_type.value === 'limit') {
      this.oredrFrm.patchValue({
        'sl_price': 0
      });
      this.formControls.price.enable();
      this.formControls.sl_price.disable();
    }
    else if (this.formControls.order_type.value === 'sl') {
      this.formControls.price.enable();
      this.formControls.sl_price.enable();
    }
    else if (this.formControls.order_type.value === 'slm') {
      this.oredrFrm.patchValue({
        'price': this.stock.last_price
      });
      this.formControls.price.disable();
      this.formControls.sl_price.enable();
    }
  }

  private _errorHandler(error: any): void {
    this._es.errorHandler(error);
    this.loading = false;
  }

}
