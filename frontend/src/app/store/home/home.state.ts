import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { CategoryDto } from 'src/app/dto/categpry-dto';
import { ProductDetailsDto } from 'src/app/dto/product-details-dto';
import { ApiService } from 'src/app/services/api.service';
import { LoadHomeAction } from './home.actions';

export class HomeStateModel {
  topProducts!: ProductDetailsDto[];
  categories!: CategoryDto[];
}

const defaults: HomeStateModel = {
  topProducts: [],
  categories: []
};

@State<HomeStateModel>({
  name: 'home',
  defaults
})
@Injectable()
export class HomeState {

  constructor(private apiService: ApiService) { }

  @Action(LoadHomeAction)
  load(ctx: StateContext<HomeStateModel>) {
    return this.apiService.getHome().pipe(tap(response => {
      ctx.patchState({ topProducts: response.products, categories: response.possibleCategories })
    }))
  }
}
