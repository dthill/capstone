import { SelectorContext } from "@angular/compiler";
import { Selector } from "@ngxs/store";
import { ProductDetailsDto } from "src/app/dto/product-details-dto";
import { ProductDetailsState, ProductDetailsStateModel } from "./product-details.state";

export class ProductDetailsSelectors {
  @Selector([ProductDetailsState])
  public static productDetails(state: ProductDetailsStateModel): ProductDetailsDto {
    return state.product
  }

  @Selector([ProductDetailsState])
  public static loading(state: ProductDetailsStateModel): boolean {
    return state.loading
  }

  @Selector([ProductDetailsState])
  public static error(state: ProductDetailsStateModel): boolean {
    return state.error
  }
}
