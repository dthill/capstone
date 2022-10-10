import { Selector } from "@ngxs/store"
import { CategoryDto } from "src/app/dto/categpry-dto"
import { ProductDetailsDto } from "src/app/dto/product-details-dto"
import { AddToCartState, AddToCartStateModel } from "./add-to-cart.state"

export class AddToCartSelectors {
  @Selector([AddToCartState])
  public static loading(state: AddToCartStateModel): boolean {
    return state.loading
  }
}
