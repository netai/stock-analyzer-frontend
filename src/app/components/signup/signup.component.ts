import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.less']
})

export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  isSubmitted = false;
  messages: any[] = [];
  loading: boolean = true;
  isSignupSuccess: boolean = false;
  get formControls() { return this.signupForm.controls; }

  constructor(
    private _fb: FormBuilder,
    private _ss: ServerService
  ) {}

  ngOnInit() {
    this.loading = false;
    this.signupForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', Validators.required]
    }, {
      validator: this._aditionalValidators
    });
  }

  private _aditionalValidators(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('cpassword').value) {
      return { invalid: true };
    }
  }

  public signup(): void {
    this.isSubmitted = true;
    this.messages = [];
    if (this.signupForm.valid) {
      this.loading = true;
      this._ss.signupUser(this.signupForm.value)
        .subscribe(
          signupData => {
            if(signupData.status === 'success') {
              this.isSignupSuccess = true;
            } else {
              this.messages.push(signupData.message);
            }
            this.loading = false;
          },
          error => {
            if (error.status === 401 || error.status === 500 || error.status === 409) {
              this.messages.push(error.error.message);
            } else {
              console.log(error);
            }
            this.loading = false;
          }
        );
    }
  }

}
