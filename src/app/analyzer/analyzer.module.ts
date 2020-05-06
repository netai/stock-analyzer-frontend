import { NgModule } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
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
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        TabsModule.forRoot()
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
