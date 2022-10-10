import { ProductDetailsDto } from "./product-details-dto";

export interface CategoryDto {
  id: number;
  name: string;
  description: string;
  products?: ProductDetailsDto[]
}
