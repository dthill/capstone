import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { CategoryDto } from 'src/app/dto/categpry-dto';
import { ApiService } from 'src/app/services/api.service';
import { LoadProductDetailsAction, UpdateProductDetailsAction } from '../product-details/product-details.actions';
import { ProductDetailsStateModel } from '../product-details/product-details.state';
import { LoadCategoryDetailsAction, UpdateCategoryDetailsAction } from './category-details.actions';

export class CategoryDetailsStateModel {
  category!: CategoryDto;
  loading!: boolean;
  error!: boolean;
}

const defaults: CategoryDetailsStateModel = {
  category: {
    id: 0,
    name: '',
    description: '',
  },
  loading: false,
  error: false
};

@State<CategoryDetailsStateModel>({
  name: 'categoryDetails',
  defaults
})
@Injectable()
export class CategoryDetailsState {

  constructor(private apiService: ApiService) { }

  @Action(LoadCategoryDetailsAction)
  load(ctx: StateContext<CategoryDetailsStateModel>, { categoryId }: LoadCategoryDetailsAction) {
    ctx.patchState({ loading: true })
    return this.apiService.getCategoryDetails(categoryId).pipe(tap(response => {
      ctx.patchState({ loading: false, error: false, category: response as any })
    }))
  }

  @Action(UpdateCategoryDetailsAction)
  update(ctx: StateContext<CategoryDetailsStateModel>, { category }: UpdateCategoryDetailsAction) {
    ctx.patchState({ loading: true })
    return this.apiService.updateCategory(category).pipe(tap(response => {
      ctx.patchState(defaults)
    }))
  }
}
