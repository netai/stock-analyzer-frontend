import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.less']
})

export class LoginComponent implements OnInit {

  authForm: FormGroup;
  isSubmitted = false;
  messages: any[] = [];
  loading: boolean = true;
  get formControls() { return this.authForm.controls; }

  constructor(
    private _as: AuthService,
    private _router: Router,
    private _fb: FormBuilder,
    private _ss: ServerService
  ) { }

  ngOnInit() {
    this.messages = [];
    let userId = localStorage.getItem('USER_ID');
    if (userId !== null) {
      this._ss.getUserDetail(userId)
        .subscribe(
          authData => {
            this._as.authenticate({
              token: localStorage.getItem('AUTH_TOKEN'),
              user: authData.data.user
            });
            let redirectUrl = this._as.getRedirectUrl() || '/analyzer';
            this._router.navigateByUrl(redirectUrl);
          },
          error => {
            if (error.status === 401 || error.status === 500) {
              this.messages.push(error.error.message);
            } else {
              console.log(error);
            }
            this.loading = false;
          }
        );
    } else {
      this.loading = false;
    }

    this.authForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.isSubmitted = true;
    this.messages = [];
    if (this.authForm.valid) {
      this.loading = true;
      this._ss.loginUser(this.authForm.value)
        .subscribe(
          authData => {
            this._as.authenticate(authData.data);
            let redirectUrl = this._as.getRedirectUrl() || '/analyzer';
            this._router.navigateByUrl(redirectUrl);
          },
          error => {
            if (error.status === 401 || error.status === 500) {
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
