import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'analyzer-instrument',
  templateUrl: 'instrument.component.html',
  styleUrls: ['instrument.component.less']
})

export class InstrumentComponent implements OnInit {

  loading: boolean = true;

  constructor() {
    this.loading = false;
  }

  ngOnInit() {}

}
