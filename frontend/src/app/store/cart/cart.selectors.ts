import { Selector } from "@ngxs/store"
import { CategoryDto } from "src/app/dto/categpry-dto"
import { ProductDetailsDto } from "src/app/dto/product-details-dto"
import { PurchaseDto } from "src/app/dto/purchase-dto"
import { CartState, CartStateModel } from "./cart.state"

export class CartSelectors {
  @Selector([CartState])
  public static loading(state: CartStateModel): boolean {
    return state.loading
  }

  @Selector([CartState])
  public static cart(state: CartStateModel): PurchaseDto {
    return state.cart
  }
}
