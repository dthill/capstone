import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConstants, routeParams } from 'src/app/constants/route.constants';
import { AdminComponent } from './admin.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: `${routeConstants.productAdmin}/:${routeParams.productId}`, component: EditProductComponent },
  { path: routeConstants.productAdmin, component: ProductComponent },
  { path: '', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
