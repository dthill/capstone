import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { UserState } from './user/user.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { LoadAllProductsAction } from './product-admin/product-admin.actions';
import { ProductAdminState } from './product-admin/product-admin.state';
import { ProductDetailsState } from './product-details/product-details.state';
import { CategoryAdminState } from './category-admin/category-admin.state';
import { CategoryDetailsState } from './category-details/category-details.state';
import { HomeState } from './home/home.state';
import { ProductsState } from './products/products.state';
import { CartState } from './cart/cart.state';
import { PurchasesState } from './purchases/purchases.state';

const states = [
  UserState,
  ProductAdminState,
  ProductDetailsState,
  CategoryAdminState,
  CategoryDetailsState,
  HomeState,
  ProductsState,
  CartState,
  PurchasesState
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot(states, {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ]
})
export class StoreModuleModule { }
