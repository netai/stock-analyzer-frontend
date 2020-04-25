import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    DashboardComponent,
    FundsComponent,
    HoldingsComponent,
    OrdersComponent,
    InstrumentComponent
} from './components';
import { AnalyzerComponent } from './analyzer.component';

const routes: Routes = [
    {
        path: '',
        component: AnalyzerComponent,
        children: [
            {path: '', component: DashboardComponent},
            {path: 'funds', component: FundsComponent},
            {path: 'holdings', component: HoldingsComponent},
            {path: 'orders', component: OrdersComponent},
            {path: 'instrument/:stock_id', component: InstrumentComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnalyzerRoutingModule { }