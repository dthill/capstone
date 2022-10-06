import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LoadAllProductsAction } from './product-admin.actions';

export class ProductAdminStateModel {
  products!: any[];
  loading!: boolean;
  error!: boolean;
}

const defaults = {
  products: [],
  loading: false,
  error: false
};

@State<ProductAdminStateModel>({
  name: 'productAdmin',
  defaults
})
@Injectable()
export class ProductAdminState {

  constructor(private apiService: ApiService) { }

  @Action(LoadAllProductsAction)
  loadAll(ctx: StateContext<ProductAdminStateModel>) {
    ctx.patchState({ loading: true })
    return this.apiService.getAllProducts().pipe(
      tap(response => {
        ctx.patchState({ products: response as any, loading: false, error: false })
      }))
  }
}
