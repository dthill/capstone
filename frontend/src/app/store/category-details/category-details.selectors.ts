import { Selector } from "@ngxs/store"
import { CategoryDto } from "src/app/dto/categpry-dto"
import { CategoryAdminStateModel } from "../category-admin/category-admin.state"
import { CategoryDetailsState, CategoryDetailsStateModel } from "./category-details.state"

export class CategoryDetailsSelectors {
  @Selector([CategoryDetailsState])
  public static category(state: CategoryDetailsStateModel): CategoryDto {
    return state.category
  }

  @Selector([CategoryDetailsState])
  public static loading(state: CategoryDetailsStateModel): boolean {
    return state.loading
  }

  @Selector([CategoryDetailsState])
  public static error(state: CategoryDetailsStateModel): boolean {
    return state.error
  }
}
