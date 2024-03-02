import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { DashboardComponent } from './pages/home/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'home', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
