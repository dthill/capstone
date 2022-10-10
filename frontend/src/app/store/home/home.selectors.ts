import { Selector } from "@ngxs/store"
import { CategoryDto } from "src/app/dto/categpry-dto"
import { ProductDetailsDto } from "src/app/dto/product-details-dto"
import { HomeState, HomeStateModel } from "./home.state"

export class HomeSelectors {
  @Selector([HomeState])
  public static topProducts(state: HomeStateModel): ProductDetailsDto[] {
    return state.topProducts
  }

  @Selector([HomeState])
  public static categories(state: HomeStateModel): CategoryDto[] {
    return state.categories
  }
}
