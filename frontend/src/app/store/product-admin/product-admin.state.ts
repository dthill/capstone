import { Xtb } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { CategoryDto } from 'src/app/dto/categpry-dto';
import { ProductAdminDto } from 'src/app/dto/product-admin-dto';
import { ProductDetailsDto } from 'src/app/dto/product-details-dto';
import { ApiService } from 'src/app/services/api.service';
import { AddProductAction, DeleteProductAction, LoadAllProductsAction } from './product-admin.actions';

export class ProductAdminStateModel {
  products!: ProductDetailsDto[];
  possibleCategories!: CategoryDto[];
  loading!: boolean;
  error!: boolean;
}

const defaults = {
  products: [],
  possibleCategories: [],
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
      tap(({ products, possibleCategories }) => {
        ctx.patchState({ products, possibleCategories, loading: false, error: false })
      }))
  }

  @Action(AddProductAction)
  saveProduct(ctx: StateContext<ProductAdminStateModel>, { product }: AddProductAction) {
    ctx.patchState({ loading: true })
    return this.apiService.addProduct(product).pipe(
      tap(response => {
        ctx.patchState({ products: response as any, loading: false, error: false })
      }))
  }

  @Action(DeleteProductAction)
  deleteProduct(ctx: StateContext<ProductAdminStateModel>, { product }: DeleteProductAction) {
    return this.apiService.deleteProduct(product.id).pipe(tap(response => {
      ctx.patchState({ loading: false, error: false, products: response as any })
    }))
  }
}
