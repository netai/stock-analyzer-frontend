import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../../services';
import { MessageModel } from 'src/app/models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-message',
    templateUrl: 'message.component.html',
    styleUrls: ['message.component.less']
})
export class MessageComponent implements OnInit {

    @Input() position: string;
    messages: MessageModel[] = [];
    msgSubscription: Subscription;

    constructor(private _ms: MessageService) {
        if(!this.position) {
            this.position = 'bottom-right';
        }
        this.msgSubscription = this._ms.getMessages().subscribe(messages => { this.messages = messages; });
    }

    ngOnDestroy() {
        this.msgSubscription.unsubscribe();
    }

    ngOnInit() {}

    public close(idx: number) {
        this._ms.clearSingleMessage(idx);
    }

}