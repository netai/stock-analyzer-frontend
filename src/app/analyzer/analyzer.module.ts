import { NgModule } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';

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
        FormsModule,
        TypeaheadModule.forRoot(),
        BsDropdownModule.forRoot()
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
