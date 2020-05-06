import { Component, OnInit} from '@angular/core';
import { MessageService } from '../../../shared/services';

@Component({
  selector: 'admin-dashboard',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  loading: boolean = true;

  constructor(private _ms: MessageService){}

  ngOnInit(){
    this.loading = false;
  }

}
