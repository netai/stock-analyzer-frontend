import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { MessageService, ErrorService, UtilService } from '../../../shared/services';
import { ServerService, InstrumentService } from '../../services';
import { StockReportModel, StockModel } from '../../../models';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'analyzer-instrument',
  templateUrl: 'instrument.component.html',
  styleUrls: ['instrument.component.less']
})

export class InstrumentComponent implements OnInit {

  searchForm: FormGroup;
  isSubmitted = false;
  loading: boolean = true;
  reportLoading: boolean = true;
  get formControls() { return this.searchForm.controls; }
  reportList: StockReportModel[] = [];
  stockDetail: StockModel;
  bsConfig: Partial<BsDatepickerConfig>;
  bsValue: Date;
  public_id: string;
  totalStockReport: number = 0;

  constructor(
    private _ms: MessageService,
    private _fb: FormBuilder,
    private _ss: ServerService,
    private _es: ErrorService,
    private _is: InstrumentService,
    private _route: ActivatedRoute
  ) {
    this.bsConfig = {
      containerClass: 'theme-default',
      maxDate: new Date(),
      dateInputFormat: 'YYYY-MM-DD'
    }
  }

  ngOnInit() {
    this.searchForm = this._fb.group({
      from_date: [(new Date((new Date()).setDate((new Date()).getDate() - 30))), Validators.required],
      to_date: [(new Date()), Validators.required],
    }, {
      validator: this._aditionalValidators
    });
    this._route.paramMap.subscribe(paramObj => {
      this.public_id = paramObj['params']['public_id'];
      this._loadStockDetail();
      this._loadStockReport();
    });
  }

  private _aditionalValidators(c: AbstractControl): { invalid: boolean } {
    if (c.get('from_date').value > c.get('to_date').value) {
      return { invalid: true };
    }
  }

  private _loadStockDetail(): void {
    this.loading = true;
    this._ss.getStockDetail(this.public_id)
      .subscribe(
        stockDetail => {
          if (stockDetail.status === 'success') {
            this._is.setStockDetail(stockDetail.data.stock);
            this.stockDetail = this._is.getStockDetail();
          } else {
            this._ms.addMessage({ message: stockDetail.message, title: 'Error', type: 'error' });
            this._ms.showMessage();
          }
          this.loading = false;
        },
        error => {
          this._errorHandler(error);
        }
      );
  }

  private _loadStockReport(): void {
    this.isSubmitted = true;
    if (this.searchForm.valid) {
      let postData = {
        from_date: UtilService.formateDate(this.searchForm.get('from_date').value),
        to_date: UtilService.formateDate(this.searchForm.get('to_date').value)
      }
      this.reportLoading = true;
      this._ss.getStockReportList(this.public_id, postData)
        .subscribe(
          stockReportList => {
            if (stockReportList.status === 'success') {
              this._is.setStockReportList(stockReportList.data.stock_report);
              this.totalStockReport = stockReportList.data.stock_report.length;
              this.reportList = this._is.getStockReportList(1);
            } else {
              this._ms.addMessage({ message: stockReportList.message, title: 'Error', type: 'error' });
              this._ms.showMessage();
            }
            this.reportLoading = false;
          },
          error => {
            this._errorHandler(error);
          }
        );
    }
  }

  public searchStockReport(): void {
    this._loadStockReport();
  }

  public reportPageChanged(event: any): void {
    console.log(this.totalStockReport);
    this.reportList = this._is.getStockReportList(event.page);
  }

  private _errorHandler(error: any): void {
    this._es.errorHandler(error);
    this.loading = false;
    this.reportLoading = false;
  }

}
