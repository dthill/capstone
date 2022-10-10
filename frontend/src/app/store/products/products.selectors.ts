import { Selector } from "@ngxs/store"
import { CategoryDto } from "src/app/dto/categpry-dto"
import { ProductDetailsDto } from "src/app/dto/product-details-dto"
import { ProductsState, ProductsStateModel } from "./products.state"

export class ProductsSelectors {
  @Selector([ProductsState])
  public static products(state: ProductsStateModel): ProductDetailsDto[] {
    return state.products
  }

  @Selector([ProductsState])
  public static categories(state: ProductsStateModel): CategoryDto[] {
    return state.categories
  }
}
