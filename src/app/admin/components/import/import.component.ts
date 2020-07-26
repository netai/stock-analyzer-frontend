import { Component, OnInit } from '@angular/core';
import { MessageService, ErrorService } from '../../../shared/services';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServerService } from '../../services';

@Component({
  selector: 'admin-import',
  templateUrl: 'import.component.html',
  styleUrls: ['import.component.less']
})

export class ImportComponent implements OnInit {

  importForm: FormGroup;
  isSubmitted = false;
  loading: boolean = true;
  get formControls() { return this.importForm.controls; }
  importLog: any = [];

  constructor(
    private _ms: MessageService,
    private _fb: FormBuilder,
    private _ss: ServerService,
    private _es: ErrorService
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.importForm = this._fb.group({
      importType: ['stock_nse', Validators.required]
    });
  }

  public import(): void {
    this.loading = true;
    this.importLog = [];
    this.formControls.importType.disable();
    this._ss.importData(this.importForm.value)
      .subscribe(
        importLog => {
          if (importLog.status === 'success') {
            this.importLog = importLog.data.log;
            this._ms.addMessage({ message: importLog.message, title: 'Successfull', type: 'success' });
          } else {
            this._ms.addMessage({ message: importLog.message, title: 'Error', type: 'error' });
          }
          this._ms.showMessage();
          this.loading = false;
          this.formControls.importType.enable();
        },
        error => {
          this._errorHandler(error);
        }
      );
  }

  private _errorHandler(error: any): void {
    this._es.errorHandler(error);
    this.loading = false;
  }

}
