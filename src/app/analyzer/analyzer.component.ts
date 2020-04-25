import { Component } from '@angular/core';
import { AuthService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analyzer',
  templateUrl: 'analyzer.component.html',
  styleUrls: ['analyzer.component.less']
})

export class AnalyzerComponent {
    constructor(private _as: AuthService, private _router: Router){}

    public logout(): void {
      this._as.logout();
      this._router.navigateByUrl('/');
    }
}
