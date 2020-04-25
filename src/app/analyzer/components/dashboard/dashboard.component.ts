import { Component, OnInit} from '@angular/core';
import { MessageService } from '../../../shared/services';

@Component({
  selector: 'analyzer-dashboard',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  constructor(private _ms: MessageService){
    this._ms.addMessage({message: 'Message from app Component to message Component!', title: 'Information', type: 'info'});
  }

  ngOnInit(){}

  public showMessage() {
    this._ms.addMessage({message: 'Message from app Component to message Component!', title: 'Information', type: 'success'});
    this._ms.showMessage();
  }

}
