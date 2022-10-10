import { CategoryDto } from "./categpry-dto";

export interface ProductDetailsDto {
  id: number;
  name: string;
  description: string;
  price: number;
  enabled: boolean;
  categoryIds: number[];
  possibleCategories?: CategoryDto[];
  imageUrl?: string;
}
