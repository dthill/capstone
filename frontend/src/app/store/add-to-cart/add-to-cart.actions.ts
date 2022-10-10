import { ProductDetailsDto } from "src/app/dto/product-details-dto";

export class AddToCartAction {
  static readonly type = '[AddToCart] Add item';
  constructor(public product: ProductDetailsDto) { }
}
