import { CategoryDto } from "./categpry-dto";

export interface SaveProductDto {
  name: string;
  description: string;
  price: number;
  enabled: boolean;
  categoryIds: number[];
  imageUrl?: string;
}
