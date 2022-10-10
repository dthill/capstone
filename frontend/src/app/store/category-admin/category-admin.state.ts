import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { CategoryDto } from 'src/app/dto/categpry-dto';
import { ApiService } from 'src/app/services/api.service';
import { AddCategoryAction, DeleteCategoryAction, LoadAllCategoriesAction } from './category-admin.actions';

export class CategoryAdminStateModel {
  categories!: CategoryDto[];
  loading!: boolean;
  error!: boolean;
}

const defaults = {
  categories: [],
  loading: false,
  error: false,
};

@State<CategoryAdminStateModel>({
  name: 'categoryAdmin',
  defaults
})
@Injectable()
export class CategoryAdminState {

  constructor(private apiService: ApiService) { }

  @Action(LoadAllCategoriesAction)
  loadAllCategories(ctx: StateContext<CategoryAdminStateModel>,
  ) {
    ctx.patchState({ loading: true })
    return this.apiService.getAllCategories().pipe(tap(response => {
      ctx.patchState({ loading: false, error: false, categories: response as any })
    }))
  }

  @Action(AddCategoryAction)
  addCategory(ctx: StateContext<CategoryAdminStateModel>, { category }: AddCategoryAction
  ) {
    ctx.patchState({ loading: true })
    return this.apiService.addCategory(category).pipe(tap(response => {
      ctx.patchState({ loading: false, error: false, categories: response as any })
    }))
  }

  @Action(DeleteCategoryAction)
  deleteCategory(ctx: StateContext<CategoryAdminStateModel>, { category }: DeleteCategoryAction
  ) {
    ctx.patchState({ loading: true })
    return this.apiService.deleteCategory(category.id).pipe(tap(response => {
      ctx.patchState({ loading: false, error: false, categories: response as any })
    }))
  }

}
