import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent, LoginComponent, SignupComponent } from './components'
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      heading: 'Signup'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      heading: 'Login'
    }
  },
  {
    path: 'analyzer',
    canActivate: [AuthGuard],
    data: {
      heading: 'Portal',
      moduleName: 'wps'
    },
    loadChildren: () => import('./analyzer/analyzer.module').then(m => m.AnalyzerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
      {preloadingStrategy: PreloadAllModules, useHash: true}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
