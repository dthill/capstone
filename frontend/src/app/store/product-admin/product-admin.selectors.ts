import { Selector } from "@ngxs/store";
import { CategoryDto } from "src/app/dto/categpry-dto";
import { ProductAdminState, ProductAdminStateModel } from "./product-admin.state";

export class ProductAdminSelectors {
  @Selector([ProductAdminState])
  public static products(state: ProductAdminStateModel): any[] {
    return state.products
  }

  @Selector([ProductAdminState])
  public static possibleCategories(state: ProductAdminStateModel): CategoryDto[] {
    return state.possibleCategories
  }

  @Selector([ProductAdminState])
  public static loading(state: ProductAdminStateModel): boolean {
    return state.loading
  }

  @Selector([ProductAdminState])
  public static error(state: ProductAdminStateModel): boolean {
    return state.error
  }
}
