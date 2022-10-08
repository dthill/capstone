import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConstants } from './constants/route.constants';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: routeConstants.register, loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: routeConstants.login, loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  {
    path: routeConstants.admin,
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  { path: routeConstants.home, loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
