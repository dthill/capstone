import { ProductDetailsDto } from "src/app/dto/product-details-dto";

export class LoadProductDetailsAction {
  static readonly type = '[ProductDetails] Load product details';
  constructor(public productId: number) { }
}

export class UpdateProductDetailsAction {
  static readonly type = '[ProductDetails] Update product details';
  constructor(public product: ProductDetailsDto) { }
}
