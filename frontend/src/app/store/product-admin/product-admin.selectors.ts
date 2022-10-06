import { SelectorContext } from "@angular/compiler";
import { Selector } from "@ngxs/store";
import { ProductAdminState, ProductAdminStateModel } from "./product-admin.state";

export class ProductAdminSelectors {
  @Selector([ProductAdminState])
  public static products(state: ProductAdminStateModel): any[] {
    return state.products
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
