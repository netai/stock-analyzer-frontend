import { NgModule } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
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
import { BuySellComponent } from './modal';

@NgModule({
    imports: [
        SharedModule,
        AnalyzerRoutingModule,
        TypeaheadModule.forRoot(),
        ModalModule.forRoot()
    ],
    declarations: [
        DashboardComponent,
        AnalyzerComponent,
        WatchlistComponent,
        FundsComponent,
        HoldingsComponent,
        OrdersComponent,
        InstrumentComponent,
        BuySellComponent
    ],
    entryComponents: [
        BuySellComponent
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
