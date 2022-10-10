import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AddToCartAction } from './add-to-cart.actions';

export class AddToCartStateModel {
  loading!: boolean;
}

const defaults: AddToCartStateModel = {
  loading: false
};

@State<AddToCartStateModel>({
  name: 'addToCart',
  defaults
})
@Injectable()
export class AddToCartState {

  constructor(private apiService: ApiService) { }

  @Action(AddToCartAction)
  add(ctx: StateContext<AddToCartStateModel>, { product }: AddToCartAction) {
    ctx.patchState({ loading: true })

    return this.apiService.addToCart(product.id).pipe(tap(response => {
      ctx.setState(defaults)
    }))
  }
}
