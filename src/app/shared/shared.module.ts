import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    MessageComponent
} from './components';
import { MessageService } from './services';
import { BuySellComponent } from './modal';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        LoaderComponent,
        MessageComponent,
        BuySellComponent
    ],
    providers: [
        MessageService
    ],
    entryComponents: [
        BuySellComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HeaderComponent,
        FooterComponent,
        LoaderComponent,
        MessageComponent
    ],
})
export class SharedModule { }