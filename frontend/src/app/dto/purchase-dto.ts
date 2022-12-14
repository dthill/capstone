import { ProductDetailsDto } from "./product-details-dto";
import { UserDto } from "./user-dto";

export interface PurchaseDto {
  id: number;
  products: ProductDetailsDto[];
  createdOn: string;
  purchasedOn?: string;
  creditCardNumber?: string;
  address?: string;
}
