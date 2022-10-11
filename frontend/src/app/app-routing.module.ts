import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConstants, routeParams } from './constants/route.constants';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: routeConstants.checkout, loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: routeConstants.cart, loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule) },
  { path: `${routeConstants.products}/:${routeParams.productId}`, loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsModule) },
  { path: routeConstants.products, loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
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
