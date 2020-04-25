import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    MessageComponent
} from './components';
import { MessageService } from './services';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        LoaderComponent,
        MessageComponent
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        HeaderComponent,
        FooterComponent,
        LoaderComponent,
        MessageComponent
    ],
    providers: [
        MessageService
    ]
})
export class SharedModule { }