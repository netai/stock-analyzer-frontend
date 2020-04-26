import { NgModule } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AnalyzerRoutingModule } from './analyzer.routing';
import { SharedModule } from '../shared/shared.module';
import { AnalyzerComponent } from './analyzer.component';
import {
    DashboardComponent,
    WatchlistComponent,
    FundsComponent,
    HoldingsComponent,
    OrdersComponent,
    InstrumentComponent
} from './components';
import { StockService, ServerService } from './services';

@NgModule({
    imports: [
        SharedModule,
        AnalyzerRoutingModule,
        TypeaheadModule.forRoot(),
        BsDropdownModule.forRoot(),
        ModalModule.forRoot()
    ],
    declarations: [
        DashboardComponent,
        AnalyzerComponent,
        WatchlistComponent,
        FundsComponent,
        HoldingsComponent,
        OrdersComponent,
        InstrumentComponent
    ],
    providers: [
        StockService,
        ServerService
    ],
    exports: []
})
export class AnalyzerModule {
    constructor() {}
}
