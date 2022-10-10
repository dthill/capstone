import { Selector } from "@ngxs/store"
import { CategoryAdminState, CategoryAdminStateModel } from "./category-admin.state"

export class CategoryAdminSelectors {
  @Selector([CategoryAdminState])
  public static categories(state: CategoryAdminStateModel): any[] {
    return state.categories
  }

  @Selector([CategoryAdminState])
  public static loading(state: CategoryAdminStateModel): boolean {
    return state.loading
  }

  @Selector([CategoryAdminState])
  public static error(state: CategoryAdminStateModel): boolean {
    return state.error
  }
}
