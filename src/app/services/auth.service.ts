import { Injectable } from '@angular/core';
import { AuthModel, AuthUserModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _authData: AuthModel;
  private _redirectUrl: string = '';
  private _loggedIn: boolean = false;

  constructor() { }

  public authenticate(authData: AuthModel) {
    this._authData = authData;
    this._loggedIn = true;
    localStorage.setItem('AUTH_TOKEN', authData.token);
    localStorage.setItem('USER_ID', authData.user.public_id);
  }

  public getAuthData(): AuthModel {
    return this._authData;
  }

  public getToken(): string {
    return this._authData.token;
  }

  public getUserData(): AuthUserModel {
    return this._authData.user;
  }

  public isLoggedIn(): boolean {
    return this._loggedIn;
  }

  public logout(): void {
    this._loggedIn = false;
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('USER_ID');
  }

  public setRedirectUrl(url: string): void {
    this._redirectUrl = url;
  }

  public getRedirectUrl(): string {
    var url = this._redirectUrl;
    this._redirectUrl = '';
    return url;
  }

}