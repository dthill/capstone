import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { PurchaseDto } from 'src/app/dto/purchase-dto';
import { ApiService } from 'src/app/services/api.service';
import { LoadPurchaseAction, LoadPurchasesAction } from './purchases.actions';

export class PurchasesStateModel {
  purchase!: PurchaseDto | {};
  purchases!: PurchaseDto[];
}

const defaults = {
  purchase: {},
  purchases: []
};

@State<PurchasesStateModel>({
  name: 'purchases',
  defaults
})
@Injectable()
export class PurchasesState {
  constructor(private apiService: ApiService) { }

  @Action(LoadPurchaseAction)
  loadPurchase(ctx: StateContext<PurchasesStateModel>, { purchaseId }: LoadPurchaseAction) {
    return this.apiService.getPurchaseDetails(purchaseId).pipe(tap((response) => {
      ctx.patchState({ purchase: response })
    }))
  }

  @Action(LoadPurchasesAction)
  loadPurchases(ctx: StateContext<PurchasesStateModel>) {
    return this.apiService.getPurchases().pipe(tap((response) => {
      ctx.patchState({ purchases: response })
    }))
  }
}
