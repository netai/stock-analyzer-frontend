import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this._authService.isLoggedIn() && this._authService.isAdmin()) {
        return true;
      } else {
        this._authService.setRedirectUrl(state.url);
        this._router.navigateByUrl('/login');
        return false;
      }
  }
}