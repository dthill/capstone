import { Selector } from "@ngxs/store"
import { CategoryDto } from "src/app/dto/categpry-dto"
import { ProductDetailsDto } from "src/app/dto/product-details-dto"
import { PurchaseDto } from "src/app/dto/purchase-dto"
import { displayPrice } from "src/app/utilities/price.utilities"
import { PurchasesState, PurchasesStateModel } from "./purchases.state"

export class PurchasesSelectors {
  @Selector([PurchasesState])
  public static purchase(state: PurchasesStateModel): PurchaseDto | {} {
    return state.purchase
  }

  @Selector([PurchasesState])
  public static categories(state: PurchasesStateModel): PurchaseDto[] {
    return state.purchases
  }

  @Selector([PurchasesState])
  public static total(state: PurchasesStateModel): string {
    return displayPrice(
      (state.purchase as any)
        .products
        ?.reduce((accumulator: number, product: ProductDetailsDto) => accumulator += product.price, 0))
  }
}
