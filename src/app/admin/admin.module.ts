import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin.routing';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import {
    ImportComponent,
    DashboardComponent
} from './components';
import { ServerService } from './services';

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule
    ],
    declarations: [
        AdminComponent,
        DashboardComponent,
        ImportComponent,
    ],
    providers: [
        ServerService
    ],
    exports: []
})
export class AdminModule {
    constructor() {}
}
