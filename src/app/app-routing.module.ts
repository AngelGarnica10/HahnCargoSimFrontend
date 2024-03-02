import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { DashboardComponent } from './pages/home/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { UnauthGuard } from './guards/unauth/unauth.guard';

const routes: Routes = [
  { path: '', component: SigninComponent, canActivate: [UnauthGuard] },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
