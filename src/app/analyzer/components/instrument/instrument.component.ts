import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../shared/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'analyzer-instrument',
  templateUrl: 'instrument.component.html',
  styleUrls: ['instrument.component.less']
})

export class InstrumentComponent implements OnInit {
  loading: boolean = true;
  stock_id: number;

  constructor(private _ms: MessageService, private _ar: ActivatedRoute) {
    this._ar.paramMap.subscribe(params => {
      this.stock_id = params['params']['stock_id'];
      console.log(this.stock_id);
    });
  }

  ngOnInit() {
    this._ms.showMessage();
  }

}
