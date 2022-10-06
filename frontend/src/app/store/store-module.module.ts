import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { UserState } from './user/user.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { LoadAllProductsAction } from './product-admin/product-admin.actions';
import { ProductAdminState } from './product-admin/product-admin.state';

const states = [UserState, ProductAdminState]


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
