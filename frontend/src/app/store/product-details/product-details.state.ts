import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { ProductDetailsDto } from 'src/app/dto/product-details-dto';
import { ApiService } from 'src/app/services/api.service';
import { LoadProductDetailsAction, UpdateProductDetailsAction } from './product-details.actions';

export class ProductDetailsStateModel {
  product!: ProductDetailsDto;
  loading!: boolean;
  error!: boolean;
}

const defaults: ProductDetailsStateModel = {
  product: {
    id: 0,
    name: '',
    description: '',
    price: 0,
    enabled: true,
    categoryIds: [],
    possibleCategories: [],
  },
  loading: false,
  error: false
};

@State<ProductDetailsStateModel>({
  name: 'productDetails',
  defaults
})
@Injectable()
export class ProductDetailsState {

  constructor(private apiService: ApiService) { }

  @Action(LoadProductDetailsAction)
  load(ctx: StateContext<ProductDetailsStateModel>, { productId }: LoadProductDetailsAction) {
    ctx.patchState({ loading: true })
    return this.apiService.getProductDetails(productId).pipe(tap(response => {
      ctx.patchState({ loading: false, error: false, product: response as any })
    }))
  }

  @Action(UpdateProductDetailsAction)
  update(ctx: StateContext<ProductDetailsStateModel>, { product }: UpdateProductDetailsAction) {
    ctx.patchState({ loading: true })
    return this.apiService.updateProduct(product).pipe(tap(response => {
      ctx.patchState(defaults)
    }))
  }
}
