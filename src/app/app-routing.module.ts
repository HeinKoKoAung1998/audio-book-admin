import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'login',component: LoginComponent},

  {path:'forgot-password',component: ForgotPasswordComponent},

  {path: '',redirectTo: '/login',pathMatch:'full'},

  {path: 'admin',loadChildren:()=>import('./admin/admin.module').then((m)=>m.AdminModule),canActivate: [authGuard]}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
