import { Injectable } from '@angular/core';
import { MessageModel } from '../../models';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    private msgSubject = new Subject<MessageModel[]>();
    private messages: MessageModel[] = [];

    public showMessage(): void {
        this.msgSubject.next(this.messages);
    }

    public addMessage(message: MessageModel): void {
        console.log(this.msgSubject);
        this.messages.push(message);
    }

    public getMessages(): Observable<MessageModel[]> {
        return this.msgSubject.asObservable();
    }

    public clearMessage(): void {
        this.messages = [];
        this.msgSubject.next();
    }

    public clearSingleMessage(id: number): void {
        this.messages.splice(id, 1);
        this.msgSubject.next(this.messages);
    }
}