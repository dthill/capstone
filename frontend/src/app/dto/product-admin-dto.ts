import { CategoryDto } from "./categpry-dto";
import { ProductDetailsDto } from "./product-details-dto";

export interface ProductAdminDto {
  products: ProductDetailsDto[];
  possibleCategories: CategoryDto[]
}
