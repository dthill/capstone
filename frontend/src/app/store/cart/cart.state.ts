import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { catchError, EMPTY, tap } from 'rxjs';
import { PurchaseDto } from 'src/app/dto/purchase-dto';
import { ApiService } from 'src/app/services/api.service';
import { AddToCartAction, ClearCartStateAction, DeleteFromCartAction, LoadCartAction, PaymentAction } from './cart.actions';

export class CartStateModel {
  loading!: boolean;
  cart!: PurchaseDto;
  error!: boolean;
}

const defaults: CartStateModel = {
  loading: false,
  error: false,
  cart: {
    id: 0,
    products: [],
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

  @Action(PaymentAction)
  pay(ctx: StateContext<CartStateModel>, { payment }: PaymentAction) {
    ctx.patchState({ loading: true, error: false })
    return this.apiService.pay(payment).pipe(
      catchError(reponse => {
        console.error(reponse)
        ctx.patchState({ error: true })
        return EMPTY
      }),
      tap(() => {
        ctx.patchState({ loading: false })
      }))
  }

  @Action(DeleteFromCartAction)
  deleteFromCart(ctx: StateContext<CartStateModel>, { productId }: DeleteFromCartAction) {
    ctx.patchState({ loading: true })
    return this.apiService.deleteFromCart(productId).pipe(tap(response => {
      ctx.patchState({ loading: false, cart: response })
    }))
  }

  @Action(ClearCartStateAction)
  clear(ctx: StateContext<CartStateModel>,) {
    ctx.setState(defaults)
  }
}
