import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { CategoryDto } from 'src/app/dto/categpry-dto';
import { ProductDetailsDto } from 'src/app/dto/product-details-dto';
import { ApiService } from 'src/app/services/api.service';
import { LoadSearchProductsAction } from './products.actions';

export class ProductsStateModel {
  products!: ProductDetailsDto[];
  categories!: CategoryDto[];
  loading!: boolean;
}

const defaults: ProductsStateModel = {
  products: [],
  categories: [],
  loading: false
};

@State<ProductsStateModel>({
  name: 'products',
  defaults
})
@Injectable()
export class ProductsState {

  constructor(private apiService: ApiService) { }

  @Action(LoadSearchProductsAction)
  add(ctx: StateContext<ProductsStateModel>, { productSearch }: LoadSearchProductsAction) {
    ctx.patchState({ loading: true })
    return this.apiService.searchAllProducts(productSearch).pipe(tap(response => {
      ctx.patchState({ loading: false, products: response.products, categories: response.possibleCategories })
    }))
  }
}
