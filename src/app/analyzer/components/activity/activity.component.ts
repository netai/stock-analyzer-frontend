import { Component, OnInit} from '@angular/core';
import { MessageService, ErrorService } from '../../../shared/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../../services';

@Component({
  selector: 'analyzer-activity',
  templateUrl: 'activity.component.html',
  styleUrls: ['activity.component.less']
})

export class ActivityComponent implements OnInit{

  activityForm: FormGroup;
  isSubmitted = false;
  loading: boolean;
  get formControls() { return this.activityForm.controls; }
  activityData: any = {
    top_delivery: [],
    top_volumn: [],
    top_gainer: [],
    top_loser: []
  };

  constructor(
    private _ms: MessageService,
    private _fb: FormBuilder,
    private _ss: ServerService,
    private _es: ErrorService,
  ){
    this.loading = true;
  }

  ngOnInit(){
    this.activityForm = this._fb.group({
      delivery_limit: [20, Validators.required],
      volumn_limit: [20, Validators.required],
      gainer_limit: [20, Validators.required],
      loser_limit: [20, Validators.required],
    });
    this.loadActivity();
  }

  public loadActivity(): void {
    this.isSubmitted = true;
    if(this.activityForm.valid) {
      this.loading = true;
      this._ss.getActivityDetail(this.activityForm.value)
      .subscribe(
        activityDetail => {
          if (activityDetail.status === 'success') {
            this.activityData = activityDetail.data;
          } else {
            this._ms.addMessage({ message: activityDetail.message, title: 'Error', type: 'error' });
            this._ms.showMessage();
          }
          this.loading = false;
        },
        error => {
          this._errorHandler(error);
        }
      );
    }
  }

  private _errorHandler(error: any): void {
    this._es.errorHandler(error);
    this.loading = false;
  }

}
