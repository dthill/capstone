import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { PurchaseDto } from 'src/app/dto/purchase-dto';
import { ApiService } from 'src/app/services/api.service';
import { AddToCartAction, LoadCartAction } from './cart.actions';

export class CartStateModel {
  loading!: boolean;
  cart!: PurchaseDto;
}

const defaults: CartStateModel = {
  loading: false,
  cart: {
    id: 0,
    products: [],
    buyer: {
      isAdmin: false,
      email: '',
      password: ''
    },
    createdOn: '',
  }
};

@State<CartStateModel>({
  name: 'cart',
  defaults
})
@Injectable()
export class CartState {

  constructor(private apiService: ApiService) { }

  @Action(AddToCartAction)
  add(ctx: StateContext<CartStateModel>, { product }: AddToCartAction) {
    ctx.patchState({ loading: true })

    return this.apiService.addToCart(product.id).pipe(tap(response => {
      ctx.patchState({ loading: false })
    }))
  }

  @Action(LoadCartAction)
  loadCartAction(ctx: StateContext<CartStateModel>) {
    ctx.patchState({ loading: true })
    return this.apiService.getCart().pipe(tap(response => {
      ctx.patchState({ loading: false, cart: response })
    }))
  }
}
