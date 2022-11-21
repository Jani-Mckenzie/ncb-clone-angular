import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthModuleGuard } from './shared/guards/auth-module.guard';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },


  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
    ]
  },


  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivateChild: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
