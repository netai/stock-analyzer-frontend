import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    ImportComponent,
    DashboardComponent
} from './components';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {path: '', component: DashboardComponent},
            {path: 'import', component: ImportComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }